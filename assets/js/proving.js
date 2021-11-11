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


  aim.Elem.prototype.briefkop = function (salesorder, title){
    return this.append(
      $('div').append(
        $('img').src(`https://${salesorder.accountCompanyName.toLowerCase()}-nl.aliconnect.nl/assets/img/letter-header-${salesorder.accountCompanyName.toLowerCase()}.png`
        ),
      ),
      $('table').style('margin-bottom:15mm;').append(
        $('tr').append(
          $('td').style('width:11cm;padding-left:10mm;padding-top:25mm').append(
            $('div').text(salesorder.clientCompanyName).style('font-weight:bold;'),
            $('div').text(salesorder.clientBusinessContactName),
            $('div').text(salesorder.clientBusinessAddressStreet),
            $('div').text(salesorder.clientBusinessAddressPostalCode, salesorder.clientBusinessAddressCity),
          ),
          $('td').append(
            $('div').text(salesorder.accountCompanyName).style('font-weight:bold;'),
            $('div').text(salesorder.accountInvoiceText).style('word-wrap:pre;font-size:0.8em;'),
          ),
        )
      ),
      $('div').text(title).style('font-weight:bold;font-size:1.2em;'),
    )
  }
  function orderPage(salesorder,rows,options) {
    rows = rows.filter(row => row.orderNr === salesorder.nr);
    rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
    return $('div').briefkop(salesorder, options.title).append(
      options.remark,
      $('table').class('grid').append(
        $('thead').append(
          $('tr').append(
            $('th').align('left').text('Datum'),
            $('th').align('left').text('OrderNr'),
            $('th').align('left').text('Ref'),
            $('th').align('left').text('Transport'),
            // 'Factuur',
            $('th').align('left').text('Gewicht'),
          ),
        ),
        $('tbody').append(
          $('tr').append(
            $('td').text(new Date(salesorder.orderDateTime).toLocaleDateString()),
            $('td').text(salesorder.nr),
            $('td').text(salesorder.ref),
            // salesorder.status,
            $('td').text(['Niet ingevuld', 'Post', 'Visser', 'Route', 'Afhalen', 'Brengen'][salesorder.routeNr] || 'Onbekend'),
            // salesorder.invoiceNr,
            $('td').text(salesorder.weight),
          ),
        ),
      ),
      $('table').class('grid').append(
        $('thead').append(
          $('tr').append(
            $('th').align('left').text('Omschrijving, Code, Verpakking'),
            // $('th').align('left').text('Code'),
            $('th').align('left').text('Aantal'),
            $('th').align('left').text('Mag'),
          ),
        ),
        $('tbody').append(
          rows.map(row => $('tr').append(
            $('td').text([row.title, row.artNr, row.unit].filter(Boolean).join(', ')),
            $('td').text(row.quant),
            $('td').text(row.prodStockLocation),
            // $('td').text([row.artNr,row.title].join('; ')),
          ))
        ),
      ),
    )
  }
  async function order(orderNr) {
    const data = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'salesorder',
      id: orderNr,
    }).then(e => e.body);
    const [salesorders,rows] = data;
    const [salesorder] = salesorders;
    console.log(salesorder,rows);
    // rows = rows.filter(row => row.orderNr === salesorder.nr);


    return $('iframe').printbody().append(
      $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
      orderPage(salesorder, rows, {
        title: 'PAKBON INTERN',
        remark: salesorder.remark ? $('div').text(salesorder.remark).style('padding:2mm;border:solid 1px red;margin-top:2mm;') : null,
      }).style('page-break-before:always;'),
      orderPage(salesorder, rows, {
        title: 'PAKBON',
      }).style('page-break-before:always;'),
    );
  }

  let factuurData;
  let facturenElem;
  async function factuur(factuurNr) {
    factuurData = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'factuur',
      factuurNr: factuurNr,
    }).then(e => e.body);
    const [clientOrders,rows] = factuurData;
    rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
    const [salesorder] = clientOrders;
    const mailtext = ''; // Exta tekst op mail naar klant
    let sum = rows.reduce((s,row) => s + row.quant * row.netto, 0);

    function cur(value){
      return value ? '€ ' + Number(value).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2}) : '';
    }

    // sum = 100;
    // salesorder.clientKortingContant = 1;
    // salesorder.clientVrachtkosten = 10;

    return $('iframe').printbody().append(
      $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
    ).briefkop(salesorder, 'FACTUUR').append(
      $('table').class('grid').style('margin-bottom:2mm;').append(
        $('thead').append(
          $('tr').append(
            $('th').align('left').text('Datum'),
            $('th').align('left').text('FactuurNr'),
            $('th').align('right').text('Totaal'),
            // $('th').align('right').text('Vrachtkosten'),
            // $('th').align('right').text(`Korting contant ${salesorder.clientKortingContant || 0}%`),
            $('th').align('right').text(`BTW ${salesorder.clientBtw}%`),
            $('th').align('right').text('TE BETALEN'),
          )
        ),
        $('tbody').append(
          $('tr').append(
            $('td').text(new Date(salesorder.invoiceDateTime).toLocaleDateString()),
            $('td').text(factuurNr),
            $('td').align('right').text(cur(sum)),
            // $('td').align('right').text(cur(salesorder.clientVrachtkosten, sum += Number(salesorder.clientVrachtkosten||0))),
            // $('td').align('right').text(cur(salesorder.kortingContant = salesorder.clientKortingContant ? sum * salesorder.clientKortingContant / 100 : 0, sum -= salesorder.kortingContant)),
            $('td').align('right').text(cur(salesorder.btwbedrag = sum * salesorder.clientBtw/100)),
            $('td').align('right').text(cur(sum + salesorder.btwbedrag)),
          ),
        ),
      ),
      $('table').class('grid').append(
        $('thead').append(
          $('tr').append(
            $('th').align('left').text('Omschrijving, Code, Verpakking'),
            $('th').align('right').text('Aantal'),
            $('th').align('right').text('Excl'),
          ),
        ),
        $('tbody').append(
          ...clientOrders.map(order => [
            $('tr').append(
              $('td').style('font-style:italic;').text(`order: ${order.nr}`, order.ref ? `ref: ${order.ref}`: ''),
              $('td'),
              $('td'),
            )
          ].concat(rows.filter(row => row.orderNr === order.nr).map(row => $('tr').append(
            $('td').text([row.title, row.artNr, row.unit].filter(Boolean).join(', ')),
            $('td').align('right').text(row.quant),
            $('td').align('right').text(!row.netto ? '' : '€ ' + Number(row.netto).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2})),
          ))))
        ),
      ),
    );
  }
  async function factuurSend(data, html) {
    const [clientOrders,rows] = data;
    const [salesorder] = clientOrders;
    const invoiceNr = salesorder.invoiceNr || salesorder.invoiceNrAbis;
    const from = `invoice@${salesorder.accountCompanyName.toLowerCase()}.nl`;
    console.log(from,html);
    await $().url('https://aliconnect.nl/api/abis/data').query({
      request_type: 'sendfactuur',
    }).input({
      from: from,
      bcc: from,
      // to: salesorder.clientOtherMailAddress,
      to: 'max.van.kampen@alicon.nl',
      chapters: [
        {
          title: `${salesorder.accountCompanyName} factuur ${invoiceNr} voor ${salesorder.clientCompanyName}`,
          content: aim.markdown().render(`Geachte heer / mevrouw,

          Hierbij ontvangt ${salesorder.clientCompanyName} een factuur aangaande de door ${salesorder.accountCompanyName} geleverde goederen.

          Voor automatische verwerking van uw digitale facturen is uw factuur bijgevoegd als bijlage.
          Wij willen u graag erop attenderen dat digitale factuurbestanden gedurende zeven jaar bewaard dienen te worden.
          Meer informatie vindt u op [belastingdienst.nl](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/administratie_bijhouden/administratie_bewaren/administratie_bewaren).
          Het bewaren van (alleen) een afdruk van de digitaal ontvangen facturen op papier is niet voldoende,
          U dient uw digitale factuur ook digitaal te bewaren.

          Voor eventuele vragen kunt u zich richten tot onze financiële administratie
          via e-mail: [invoice@${salesorder.accountCompanyName}.nl](mailto:invoice@${salesorder.accountCompanyName}.nl?SUBJECT=Vraag over factuur ${invoiceNr}&BODY=Beste administratie,%0A%0AIk heb een vraag aangaande factuur ${invoiceNr}%0A%0AMijn vraag is )
          of telefonisch: ${salesorder.accountPhone}

          Met vriendelijke groet,  \nAdministratie  \n${salesorder.accountCompanyName}`),
        },
      ],
      attachements: [
        {
          content: html,
          name: `${salesorder.accountCompanyName}-factuur-${invoiceNr}-${salesorder.clientName}.pdf`.toLowerCase(),
        }
      ]
    }).post().then(e => {
      console.log(e.body);
    })
  }
  async function factureren(salesorder, id){
    const data = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'newfactuur',
      accountCompanyName: salesorder.accountCompanyName,
      ordernummers: id,
    }).then(e => e.body);
    const accountCompany = data.shift().shift();
    const invoiceNr = accountCompany.invoiceNr;
    const factuurElem = await factuur(invoiceNr);
    const [clientOrders,rows] = factuurData;
    [salesorder] = clientOrders;
    // console.log(salesorder);
    facturenElem = facturenElem || $('iframe').printbody();
    if (salesorder.clientOtherMailAddress) {
      await factuurSend(factuurData, factuurElem.elem.innerHTML);
      factuurElem.remove();
    } else {
      facturenElem.append(factuurElem.style('page-break-before:always;'))
    }
  }

  aim.config.components.schemas.salesorder.app = {
    nav(row) {
      // console.log(row);
      return [
        // $('button').text('Print').on('click', e => console.log('Printen')),
        // $('button').text('Gepakt en verzonden').on('click', e => console.log('Gepakt en verzonden')),
        $('button').class('abtn print').title('Bon printen').on('click', async e => (await order(row.nr)).print()),

        row.invoiceNrAbis || row.invoiceNr
        ? $('button').class('abtn invoice').title('Factuur printen').on('click', async e => (await factuur(row.invoiceNrAbis || row.invoiceNr)).print())
        : $('button').text('Factureren').on('click', async e => {
          await factureren(row, row.nr);
          // console.log(facturenElem);
          facturenElem.print();
          facturenElem = null;
        }),

        (row.invoiceNr = row.invoiceNrAbis || row.invoiceNr) && row.clientOtherMailAddress
        ? $('button').class('abtn mail-send').title('Factuur verzenden').on('click', async e => {
          const factuurElem = await factuur(row.invoiceNr);
          const [clientOrders,rows] = factuurData;
          [salesorder] = clientOrders;
          if (salesorder.clientOtherMailAddress) {
            await factuurSend(factuurData, factuurElem.elem.innerHTML);
            factuurElem.remove();
          }
        })
        : null,
      ]
    },
    navList() {
      return [
        $('button').text('Bonnen').append(
          $('div').append(
            $('button').text('Paklijst').on('click', async e => {
              const data = await $().url('https://aliconnect.nl/api/abis/data').post({
                request_type: 'salesorder',
                id: aim.listRows.map(row => row.nr).join(','),
              }).then(e => e.body);
              const [salesorders,rows] = data;
              const [salesorder] = salesorders;
              const artlist = rows.filter(row => row.quant).map(row => row.artId).unique().map(artId => Object({srtId: artId, rows: rows.filter(row => row.artId === artId)}));
              artlist.forEach(row => row.prodStockLocation = row.rows[0].prodStockLocation || '?');
              artlist.sort((a,b)=>a.prodStockLocation.localeCompare(b.prodStockLocation) )
              console.log(artlist);
              $('iframe').printbody().append(
                $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
                $('h1').text('Paklijst'),
                $('table').class('grid').append(
                  $('thead').append(
                    $('tr').append(
                      $('th').align('left').text('Mag'),
                      $('th').align('left').text('Omschrijving, Code, Verpakking'),
                      // $('th').align('left').text('Code'),
                      // $('th').align('left').text('Aantal'),
                      // $('th').align('left').text('Mag'),
                    ),
                  ),
                  $('tbody').append(
                    artlist.map(art => [
                      $('tr').append(
                        $('td').text(art.rows[0].prodStockLocation),
                        $('td').text([art.rows[0].title, art.rows[0].artNr, art.rows[0].unit].filter(Boolean).join(', ')),
                        // $('td'),
                      )
                    ].concat(art.rows.map(r => $('tr').append(
                      $('td'),
                      $('td').text(r.quant, '>', r.orderNr),
                    )))),
                  ),
                ),
                ...salesorders.map(salesorder => [
                  orderPage(salesorder, rows, {
                    title: 'PAKBON INTERN',
                    remark: salesorder.remark ? $('div').text(salesorder.remark).style('padding:2mm;border:solid 1px red;margin-top:2mm;') : null,
                  }).style('page-break-before:always;'),
                  orderPage(salesorder, rows, {
                    title: 'PAKBON',
                  }).style('page-break-before:always;'),
                ]),
              ).print();
            }),
            $('button').text('Factureren').on('click', async e => {
              const orders = aim.listRows;
              for (let clientName of orders.map(row => row.clientName).unique()) {
                const clientOrders = orders.filter(row => row.clientName === clientName);
                const [salesorder] = clientOrders;
                await factureren(salesorder, clientOrders.map(o => o.nr).join(','));
              }
              facturenElem.print();
              facturenElem = null;
            }),
          ),
        ),
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
      Orders: {
        Actief: e => list('salesorder',{
          $filter: `ISNULL(invoiceNrAbis,0) EQ 0 && ISNULL(invoiceNr,0) EQ 0 && payDateTime EQ NULL`,
          $order: `nr DESC`,
        }),
        Gefactureerd: e => list('salesorder',{
          $filter: `ISNULL(invoiceNrAbis,0) GT 0 || ISNULL(invoiceNr,0) GT 0`,
          $order: `nr DESC`,
        }),

      },
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

  // const searchParams = new URLSearchParams(document.location.search);
  // const factuurId = searchParams.get('fid');
  // if (factuurId) {
  //   const factuurUid = atob(factuurId);
  // }
  // console.log(factuurId, atob(factuurId));



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
