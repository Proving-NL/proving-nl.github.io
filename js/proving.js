$().on('load', async e => {
  supplierproduct = await fetch('/product.json').then( response => response.json() );
  // supplierproduct = supplierproduct.filter(row => row.catalogPrice)
  supplierproduct.forEach(row => {
    row.description = row.description || row.title;
    if (row.catalogPrice) {
      row.saleDiscount = row.saleDiscount || Math.floor((row.purchaseDiscount || 0) * 0.3);
    }
    if (row.description.match(/tape/i)) row.brand = '3M';
    if (row.description.match(/folie/i)) row.brand = '3MB';
    // row.afmeting = (row.description.replace(/\s/g,'').match(/((\d+|\.|,?)(mm|m?)x(\d+|\.|,?)(mm|m))|((\d+|\.|,?)(mm|m))/)||[])[1] || '';
    row.afmeting = (( row.description.match(/((([\d|\.|,]+?)\s*?(mm|cm|m)\s*?x\s*|)?(([\d|\.|,]+?)\s*?(mm|cm|m)\s*?x\s*|)?([\d|\.|,]+?)\s*?(mm|cm|m))/i) || [] )[1] || '').replace(/\s/g,'').toLowerCase();
    row.gaten = (( row.description.match(/(\d+)\s*?(?=gaten)/i) || [] )[1] || '');
    row.korrel = (( row.description.match(/\b(P\d+)\b/i) || [] )[1] || '');
  })
  function num(value, dig = 2){
    return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: dig, maximumFractionDigits: dig }).format(value);
  }
  aim.om.catalogPrice = function (row, div) {
    if (row.catalogPrice) {
      const listprice = row.catalogPrice;
      const price = row.saleDiscount ? listprice * (100 - Number(row.saleDiscount)) / 100 : listprice;
      const fatprice = price * 1.21;
      // if (row.saleDiscount) div.class('discount');
      const attr = {
        listprice: listprice,
        fatprice: num(price * 1.21),
        discountperc: row.saleDiscount ? num(row.saleDiscount,0) : null,
        discount: row.saleDiscount ? num(listprice - price) : null,
        // price: row.saleDiscount ? row.catalogPrice * (100 - Number(row.saleDiscount)) / 100 : row.catalogPrice;
      }
      if (row.saleDiscount) {
        div.append($('div').class('discount').attr('value', row.saleDiscount));
      }
      return $('div').class('price').append(
        $('div').attr(attr).append(
          $('span').text(num(price)),
        ),
        $('input').type('number').min(0),
      )
      //   row.saleDiscount ? $('span').class('listprice').text(row.catalogPrice) : null,
      //   $('span').class('price').text(num(price)),
      //   row.saleDiscount ? $('span').class('discount').text(num(listprice - price)) : null,
      //   row.saleDiscount ? $('span').class('discountperc').text(row.saleDiscount + '%') : null,
      //   $('span').class('fatprice').text(num(fatprice)),
      // );
    }
  }

})

$(window).on('popstate', async e => {
  const searchParams = new URLSearchParams(document.location.hash ? document.location.hash.substr(1) : document.location.search);
  if (searchParams.get('$search')) {
    const search = searchParams.get('$search').split(' ')
    aim.om.listview(null, supplierproduct.filter(p => search.every(s => [p.artcode,p.title,p.description].filter(Boolean).join().toLowerCase().includes(s))));
  }
})

$(window).on('dragover', e => e.preventDefault())
$(window).on('drop', async e => {
  e.preventDefault();
  e.stopPropagation();
  const data = e.dataTransfer || e.clipboardData;
  const files = data.files;
  if (data.types.includes('Files')) {
    const config = await fetch('https://aliconnect.nl/yaml.php', {
      method: 'POST',
      body: await fetch('/config/import.yaml').then(res => res.text()),
    }).then(res => res.json());
    Array.from(files).forEach(file => {
      config.import.filter(fileConfig => fileConfig.filename === file.name).forEach(fileConfig => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async e => {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          console.log(fileConfig.tabs);
          for (let tab of fileConfig.tabs) {
            const data = {
              rows: [],
            };
            const prefixArtcode = tab.artcode || '';
            tab.colRow = tab.colRow || 1;
            const sheet = workbook.Sheets[tab.tabname];
            const toprow = [];
            var [s,colEnd,rowEnd] = sheet['!ref'].match(/:([A-Z]+)(\d+)/);
            colEnd = XLSX.utils.decode_col(colEnd);
            function rowvalue(r,c){
              var cell = sheet[XLSX.utils.encode_cell({c:c,r:r-1})];
              if (cell) return cell.v;
            }
            for (var c=0; c<=colEnd; c++) {
              toprow[c] = rowvalue(tab.colRow,c);
            }
            const cols = [];
            for (var name in tab.cols) {
              cols[toprow.indexOf(tab.cols[name])] = name;
            }
            const progressElem = $('footer>progress').max(rowEnd).value(tab.colRow);
            const infoElem = $('footer>.main');
            const rowStart = tab.colRow;
            // tab.colRow=700;
            // rowEnd=715;
            for (var r = tab.colRow+1; r<=rowEnd; r++) {
              progressElem.value(r);
              let row;
              cols.forEach((name,c) => {
                const value = rowvalue(r, c);
                if (value !== undefined) {
                  row = row || Object.assign({},tab.data);
                  row[name] = value;
                }
              });
              if (row && row.orderCode && row.description && row.catalogPrice) {
                row.orderCode = (tab.orderCode || '') + row.orderCode;
                data.rows.push(row);
              }
            };
            console.log(data);
            // return;
            const res = await fetch("/import.php?data=purchaseproduct", {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(res => res.text())
            console.log(res);
          }
        }
      })
    })
  }
});
