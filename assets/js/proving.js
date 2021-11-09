aim.libraries.init = () => {
  // console.log('JA');
  aim.config.navleft = {
    'Mijn Proving': {
      Winkelmandje() {
      },
      Boodschappenlijst() {
      },
    },
  }
}
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

  async function printElem(elem){
    $('.pv').append($('iframe').style('visibility: hidden;'));
    iframe = document.querySelector('iframe');
    const doc = iframe.contentWindow.document;
    doc.open();
    const style = await fetch('https://proving-nl.aliconnect.nl/assets/css/print.css').then(res => res.text());
    doc.write(`<body><style>${style}</style></body>`);
    doc.close();
    // doc.contentWindow
    doc.body.append(elem.elem);
    setTimeout(e => {
      console.log(doc.body);
      iframe.focus();
      iframe.contentWindow.print();
      setTimeout(e => iframe.remove(), 500);
      // iframe.addEventListener('blur', e => iframe.remove());
    },200);

  }
  function orderPageElem(salesorder,rows,options) {
    return $('div').append(
      $('div').append(
        $('img').src(`https://${salesorder.accountCompanyName.toLowerCase()}-nl.aliconnect.nl/assets/img/letter-header-${salesorder.accountCompanyName.toLowerCase()}.png`),
      ),
      $('table').append(
        $('tr').append(
          $('td').style('width:11cm;padding-top:2cm;').append(
            $('div').text(salesorder.clientCompanyName).style('font-weight:bold;'),
            $('div').text(salesorder.clientBusinessContactName),
            $('div').text(salesorder.clientBusinessAddressStreet),
            $('div').text(salesorder.clientBusinessAddressPostalCode, salesorder.clientBusinessAddressCity),
          ),
          $('td').append(
            $('div').text(salesorder.accountCompanyName).style('font-weight:bold;'),
            $('div').text(salesorder.accountInvoiceText).style('word-wrap:pre;'),
          ),
        )
      ),
      $('div').text(options.title).style('font-weight:bold;font-size:2em;'),
      $('table').append(
        $('thead').append(
          $('tr').append([
            'OrderNr',
            'Datum',
            // 'Status',
            'Transport',
            // 'Factuur',
            'Gewicht'
          ].map(n => $('th').text(n))),
        ),
        $('tbody').append(
          $('tr').append([
            salesorder.nr,
            new Date(salesorder.orderDateTime).toLocaleDateString(),
            // salesorder.status,
            ['Niet ingevuld', 'Post', 'Visser', 'Route', 'Afhalen', 'Brengen'][salesorder.routeNr] || 'Onbekend',
            // salesorder.invoiceNr,
            salesorder.weight
          ].map(n => $('td').text(n))),
        ),
      ),
      $('table').append(
        $('thead').append(
          $('tr').append(['Aantal','Code','Artikel','Mag'].map(n => $('th').text(n))),
        ),
        $('tbody').append(
          rows.map(row => $('tr').append(
            $('td').text(row.quant),
            $('td').text(row.artNr),
            $('td').text(row.title),
            $('td').text(row.prodStockLocation),
            // $('td').text([row.artNr,row.title].join('; ')),
          ))
        ),
      ),
    )
  }
  function orderElem(salesorder,rows) {
    console.log(salesorder.nr, rows)
    rows = rows.filter(row => row.orderNr === salesorder.nr);
    return $('div').append(
      orderPageElem(salesorder, rows, {title: 'PAKBON INTERN'}).style('page-break-before:always;').append(
        // salesorder.clientOpmerking ? $('div').text(salesorder.clientOpmerking).style('padding:10px;border:solid 1px red;') : null,
        salesorder.remark ? $('div').text(salesorder.remark).style('padding:10px;border:solid 1px red;') : null,
      ),
      orderPageElem(salesorder, rows, {title: 'PAKBON'}).style('page-break-before:always;'),
    );
  }



  aim.config.components.schemas.salesorder.app = {
    nav(row) {
      console.log(row);
      return [
        $('button').text('Print').on('click', e => console.log('Printen')),
        $('button').text('Gepakt en verzonden').on('click', e => console.log('Gepakt en verzonden')),
        $('button').text('Paklijst').on('click', e => {
          // console.log(aim.listRows.map(row => row.orderNr));
          $().url('https://aliconnect.nl/api/abis/data?request_type=salesorder&id=' + aim.listRows.map(row => row.nr).join(',')).get().then(e => {
            const rows = e.body.regels;
            const artlist = rows.map(row => row.artId).unique().map(artId => Object({srtId: artId, rows: rows.filter(row => row.artId === artId)}));
            artlist.forEach(row => row.prodStockLocation = row.rows[0].prodStockLocation || '?');
            artlist.sort((a,b)=>a.prodStockLocation.localeCompare(b.prodStockLocation) )
            console.log(artlist);


            printElem($('div').append(
              $('div').append(
                $('h1').text('Paklijst'),
                $('ol').append(
                  artlist.map(art => $('li').append(
                    $('div').text(art.prodStockLocation, art.rows[0].artNr, art.rows[0].title),
                    $('ol').append(
                      art.rows.map(r => $('li').text(r.orderNr, r.quant)),
                    ),
                  )),
                )
              ),
              e.body.salesorder.map(salesorder => orderElem(salesorder, rows))
            ));
            // printElem(orderElem(salesorder.shift(), rows));
            //
            // printElem($('div').append(
            //
            //   bonElem(e.body.salesorder, e.body.regels),
            //   bonElem(e.body.salesorder, e.body.regels),
            // ));
            // console.log(e.body);
          });
          // $().url('https://aliconnect.nl/api/abis/data?request_type=paklijst&id=' + row.id).get().then(e => {
        }),
        $('button').text('Bon').on('click', e => {
          $().url('https://aliconnect.nl/api/abis/data?request_type=salesorder&id=' + row.nr).get().then(e => {
            console.log(e.body);
            // const salesorder = e.body.salesorder[0];
            // const rows = e.body.regels.filter(row => row.orderNr === salesorder.orderNr);
            // const html = 'HALLO';
            // const win = window.open('', '_blank', 'width=450, height=470, left=400, top=100, menubar=yes, toolbar=no, location=no, scrollbars=yes');
    				// win.document.open();
    				// win.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + innerHTML + "<\/body><\/html>");
    				// win.document.close();
            printElem($('div').append(
              e.body.salesorder.map(salesorder => orderElem(salesorder, e.body.regels))
            ));


            // const win = window.open('','bon');
            // console.log(iframe);
          })
          // window.open('https://aliconnect.nl/api/abis/data?request_type=salesorder&id=' + row.id, 'salesorder');
        }),
        $('button').text('Factureren').on('click', e => {
          $().url('https://aliconnect.nl/api/abis/data?request_type=salesorder&id=' + row.nr).get().then(e => {
            console.log(e.body);
          })
          // window.open('https://aliconnect.nl/api/abis/data?request_type=salesorder&id=' + row.id, 'salesorder');
        }),
      ]
    }
  }



  function num(value, dig = 2){
    return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: dig, maximumFractionDigits: dig }).format(value);
  }
  // console.log(aim.config);
  aim.cols = {
    catalogPrice(row, div) {
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
    },

  }
  //
  if (aim.config.whitelist.includes(aim.config.client.ip)) {
    function list(selector, options={}){
      console.log(selector, aim.config.components.schemas[selector]);
      const args = Array.from(arguments);
      const url = args.shift();
      options.$select = aim.config.components.schemas[selector].cols.filter(col => col.header || col.filter).map(col => col.name).join(',')
      options.$search = '';
      document.location.hash = `#?l=${aim.urlToId($().url('https://aliconnect.nl/api/'+selector).query(options).toString())}`;
    }
    aim.om.treeview({
      Shop: {
        Proving(){
          list('product',{$filter: `bedrijf EQ 'proving'`});
        },
        Alles(){
          list('article');
        },
      },
      Orders: e => list('salesorder',{
        $filter: `ISNULL(invoiceNrAbis,0) EQ 0 && ISNULL(invoiceNr,0) EQ 0 && payDateTime EQ NULL`,
      }),
      Abis: {
        Klanten() {
          list('client');
        },
        Pakbonnen() {
          list('salesorder');
        },
        Pakbon_regels() {
          list('salesorderrow');
        },
        Fakturen() {
          list('invoice');
        },
        Producten() {
          list('prod');
        },
        Artikelen() {
          list('art');
        },
        Klant_artikelen() {
          list('clientart');
        },
        Bedrijven() {
          list('account');
        },
      },
      Orders1: {
        Actief: e => list('salesorder',{
          $filter: `ISNULL(invoiceNrAbis,0) EQ 0 && ISNULL(invoiceNr,0) EQ 0`,
        }),
        Aanbieding: e => list('salesorder',{
          $filter: `isQuote EQ 1 && isOrder NE 1`,
        }),
        Aanbieding2: e => list('salesorder',{
          $filter: `orderstatus IN(1,2)`,
        }),
        Winkelmandje: e => list('salesorder',{
          $filter: `isQuote NE 1 && isOrder NE 1`,
        }),
        Printen: e => list('salesorder',{
          $filter: `printDateTime EQ NULL && isOrder EQ 1`,
        }),
        Pakken: e => list('salesorder',{
          $filter: `pickDateTime EQ NULL && printDateTime NE NULL`,
        }),
        Verzenden: e => list('salesorder',{
          $filter: `sendDateTime EQ NULL && pickDateTime NE NULL`,
        }),
        Verzonden: e => list('salesorder',{
          $filter: `deliverDateTime EQ NULL && sendDateTime NE NULL`,
        }),
        Geleverd: e => list('salesorder',{
          $filter: `invoiceNr EQ 0 && deliverDateTime NE NULL`,
        }),
        Factureren: e => list('salesorder',{
          $filter: `verwerkt=1 and aanbieding <> 1 and isnull(factuurnr,0) = 0 and isnull(faktuurnr,0) = 0`,
          $filter: `isOrder EQ 1 && isQuote NE 1 && ISNULL(invoiceNrAbis,0) EQ 0 && ISNULL(invoiceNr,0) EQ 0`,
        }),
        Gefactureerd: e => list('salesorder',{
          $filter: `bookDateTime EQ NULL && invoiceNr GT 0`,
        }),
        Geboekt: e => list('salesorder',{
          $filter: `payDateTime EQ NULL && bookDateTime NE NULL`,
        }),
        Betaald: e => list('salesorder',{
          $filter: `payDateTime NE NULL`,
        }),
        Alles: e => list('salesorder'),
      },
      Sales: {
        Klanten: e => list('client',{
          $filter: `archivedDateTime EQ NULL`,
        }),
        Archief: e => list('client',{
          $filter: `archivedDateTime NE NULL`,
        }),
        // Klanten() {
        //   // list('client',{$filter: `archiefDT EQ NULL AND companyName NOT LIKE '%vervallen%'`});
        //   list('client');
        // },
        // Klanten() {
        //   list('client',{$filter: `accountManager NE NULL AND archiefDT EQ NULL AND companyName NOT LIKE '%vervallen%'`});
        // },
        // Overig() {
        //   list('client',{$filter: `accountManager EQ NULL AND archiefDT EQ NULL AND companyName NOT LIKE '%vervallen%'`});
        // },
        // Archief() {
        //   list('client',{$filter: `archiefDT NE NULL OR companyName LIKE '%vervallen%'`});
        // },
        Analyse: {
          Klant() {
            document.location.hash = `#?l=${aim.urlToId($().url('https://proving.aliconnect.nl/report/client').toString())}`;
          },
          Voorraad() {
            document.location.hash = `#?l=${aim.urlToId($().url('https://proving.aliconnect.nl/report/voorraad').toString())}`;
          },
          Verloop() {
            document.location.hash = `#?l=${aim.urlToId($().url('https://proving.aliconnect.nl/report/verkoop_verloop').toString())}`;
          },
        }
      },
      Administratie: {
        Openstaande_debiteuren() {

        },
        Afas: {
          Export_Facturen_Airo: e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=afas_boek_export&bedrijf=airo',
          Export_Facturen_Proving: e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=afas_boek_export&bedrijf=proving',
          Import_Openstaande_Debiteuren_Airo() {
          },
          Import_Openstaande_Debiteuren_Proving() {
          },
        },
        Doorfacturatie: e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=doorfacturatie',
      },
    });
  }
  // console.log(111, aim.config);
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
    console.log(1, config, files);
    Array.from(files).forEach((file,i) => {
      console.log(i,file);
      config.import.filter(fileConfig => file.name.match(fileConfig.filename)).forEach(fileConfig => {
        console.log(fileConfig.filename, file.name);
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
            console.log(sheet);
            let [s,colEnd,rowEnd] = sheet['!ref'].match(/:([A-Z]+)(\d+)/);
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
