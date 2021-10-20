$().on('load', async e => {
  // supplierproduct = await fetch('product.json').then( response => response.json() );
  // // supplierproduct = supplierproduct.filter(row => row.catalogPrice)
  // supplierproduct.forEach(row => {
  //   row.description = row.description || row.title;
  //   if (row.catalogPrice) {
  //     row.saleDiscount = row.saleDiscount || Math.floor((row.purchaseDiscount || 0) * 0.3);
  //   }
  //   if (row.description.match(/tape/i)) row.brand = '3M';
  //   if (row.description.match(/folie/i)) row.brand = '3MB';
  //   // row.afmeting = (row.description.replace(/\s/g,'').match(/((\d+|\.|,?)(mm|m?)x(\d+|\.|,?)(mm|m))|((\d+|\.|,?)(mm|m))/)||[])[1] || '';
  //   row.afmeting = (( row.description.match(/((([\d|\.|,]+?)\s*?(mm|cm|m)\s*?x\s*|)?(([\d|\.|,]+?)\s*?(mm|cm|m)\s*?x\s*|)?([\d|\.|,]+?)\s*?(mm|cm|m))/i) || [] )[1] || '').replace(/\s/g,'').toLowerCase();
  //   row.gaten = (( row.description.match(/(\d+)\s*?(?=gaten)/i) || [] )[1] || '');
  //   row.korrel = (( row.description.match(/\b(P\d+)\b/i) || [] )[1] || '');
  // })
  function num(value, dig = 2){
    return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: dig, maximumFractionDigits: dig }).format(value);
  }
  // console.log(aim);
  aim.catalogPrice = function (row, div) {
    if ('catalogPrice' in row) {
      // console.log(row);
      // const elem = $('div').class('price');
      const listPrice = row.catalogPrice;
      var price = listPrice;
      if (row.clientDiscount) {
        div.append($('div').class('clientDiscount'));
        var price = listPrice * (100 - row.clientDiscount) / 100;
      } else if (row.clientNetPrice) {
        div.append($('div').class('clientNetPrice'));
        var price = row.clientNetPrice;
      }
      const discount = listPrice - price;
      const discountPerc = (listPrice - price) / listPrice;
      // const price = row.saleDiscount ? listPrice * (100 - Number(row.saleDiscount)) / 100 : listPrice;
      const fatprice = price * 1.21;
      // if (row.saleDiscount) div.class('discount');
      const attr = {
        listPrice: listPrice,
        // clientNetPrice: row.clientNetPrice,
        // clientDiscount: row.clientDiscount,
        fatprice: num(fatprice),
        discountperc: discountPerc ? discountPerc : null,//row.saleDiscount ? num(row.saleDiscount,0) : null,
        discount: discount ? discount : null,//row.saleDiscount ? num(listPrice - price) : null,
        // price: row.saleDiscount ? row.catalogPrice * (100 - Number(row.saleDiscount)) / 100 : row.catalogPrice;
      }
      // if (row.saleDiscount) {
      //   div.append($('div').class('discount').attr('value', row.saleDiscount));
      // }
      return $('div').class('price').append(
        $('div').attr(attr).append(
          $('span').text(num(price)),
        ),
        $('input').type('number').min(0),
      )
      //   row.saleDiscount ? $('span').class('listPrice').text(row.catalogPrice) : null,
      //   $('span').class('price').text(num(price)),
      //   row.saleDiscount ? $('span').class('discount').text(num(listPrice - price)) : null,
      //   row.saleDiscount ? $('span').class('discountperc').text(row.saleDiscount + '%') : null,
      //   $('span').class('fatprice').text(num(fatprice)),
      // );
    }
  }
  //
})

$(window).on('popstate', async e => {
  const documentSearchParams = new URLSearchParams(document.location.search);
  const searchParams = new URLSearchParams(document.location.hash ? document.location.hash.substr(1) : document.location.search);
  if (!documentSearchParams.get('l') && !searchParams.get('l') && searchParams.get('$search')) {
    aim.search(searchParams.get('$search'));

    // aim.api('/abis/data').query({request_type: 'article',$search: searchParams.get('$search')}).get().then(response => response.json().then(data => aim.listview(data.rows)));
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
      body: await fetch('config/import.yaml').then(res => res.text()),
    }).then(res => res.json());
    Array.from(files).forEach(file => {
      console.log(file.name);
      config.import.filter(fileConfig => fileConfig.filename === file.name).forEach(fileConfig => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async e => {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          // console.log(fileConfig.tabs);
          for (let tab of fileConfig.tabs) {
            console.log(tab.tabname);
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
            // const cols = [];
            // for (var name in tab.cols) {
            //   if (Array.isArray(tab.cols[name])) {
            //     tab.cols[name].forEach(c => cols[XLSX.utils.decode_col(c)] = name);
            //   } else {
            //     cols[toprow.indexOf(tab.cols[name])] = name;
            //   }
            // }
            // console.log(tab.cols,cols);
            // return;
            const progressElem = $('footer>progress').max(rowEnd).value(tab.colRow);
            const infoElem = $('footer>.main');
            const rowStart = tab.colRow;
            // tab.colRow=700;
            // rowEnd=715;
            for (var r = tab.colRow+1; r<=rowEnd; r++) {
              progressElem.value(r);
              let row;

              for (var name in tab.cols) {
                var value;
                if (Array.isArray(tab.cols[name])) {
                  value = tab.cols[name].map(c => rowvalue(r, XLSX.utils.decode_col(c))).join(' ');
                } else {
                  value = rowvalue(r, toprow.indexOf(tab.cols[name]));
                }
                if (value !== undefined) {
                  row = row || Object.assign({},tab.data);
                  row[name] = value;
                }
              }
              if (row) {
                // console.log(row)
                row.keyname = row.keyname || row.orderCode;
                if (row.keyname && (row.catalogPrice || row.purchasePrice || row.partPrice)) {
                  // if (row && row.orderCode && row.description && row.catalogPrice) {
                  row.keyname = (tab.keyname || '') + row.keyname;
                  row.orderCode = (tab.orderCode || '') + row.orderCode;
                  if (tab.calc) {
                    tab.calc.forEach(c => row[c.name] *= c.faktor)
                  }
                  data.rows.push(row);
                }

              }
            };
            console.log(data);
            // return;
            const res = await fetch("https://proving.aliconnect.nl/import.php?data=purchaseproduct", {
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
