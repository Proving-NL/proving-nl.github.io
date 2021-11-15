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
  if (!aim.config.whitelist.includes(aim.config.client.ip)) return;

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
      $('table').style('margin-bottom:15mm;width:100%;').append(
        $('tr').append(
          $('td').style('padding-left:10mm;padding-top:25mm;').append(
            $('div').text(salesorder.clientCompanyName).style('font-weight:bold;'),
            $('div').text(salesorder.clientBusinessContactName),
            $('div').text(salesorder.clientBusinessAddressStreet),
            $('div').text(salesorder.clientBusinessAddressPostalCode, salesorder.clientBusinessAddressCity),
          ),
          $('td').style('width:65mm;').append(
            $('div').text(salesorder.accountCompanyName).style('font-weight:bold;'),
            $('div').text(salesorder.accountInvoiceText).style('word-wrap:pre;font-size:0.8em;'),
          ),
        )
      ),
      $('div').text(title).style('font-weight:bold;font-size:1.2em;'),
    )
  }
  let factuurData;
  let facturenElem;
  function num(value, dig = 2){
    return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: dig, maximumFractionDigits: dig }).format(value);
  }
  function cur(value){
    return value ? '€ ' + Number(value).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2}) : '';
  }
  function orderPage(salesorder,rows,options) {
    rows = rows.filter(row => row.orderNr === salesorder.nr);
    rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
    return $('div').briefkop(salesorder, options.title).append(
      options.remark,
      options.tracking,
      $('table').class('grid').append(
        $('thead').append(
          $('tr').append(
            $('th').align('left').text('Datum'),
            $('th').align('left').text('OrderNr'),
            $('th').align('left').text('Ref'),
            $('th').align('left').text('Transport'),
            $('th').align('left').text('Gewicht'),
          ),
        ),
        $('tbody').append(
          $('tr').append(
            $('td').text(new Date(salesorder.orderDateTime).toLocaleDateString()),
            $('td').text(salesorder.nr),
            $('td').text(salesorder.ref),
            $('td').text(['Niet ingevuld', 'Post', 'Visser', 'Route', 'Afhalen', 'Brengen'][salesorder.routeNr] || 'Onbekend'),
            $('td').text(salesorder.weight),
          ),
        ),
      ),
      $('table').class('grid').append(
        $('thead').append(
          $('tr').append(
            $('th').align('left').text('Code'),
            $('th').align('left').text('Verpakking'),
            $('th').align('left').text('Omschrijving'),
            $('th').align('left').text('Aantal'),
            options.showPrice ? $('th').align('left').text('Prijs') : null,
            $('th').align('left').text('Mag'),
          ),
        ),
        $('tbody').append(
          rows.map(row => $('tr').append(
            $('td').text(row.artNr),
            $('td').text(row.unit),
            $('td').text(row.title),
            $('td').text(row.quant),
            options.showPrice
            ? $('td').align('right').text(!row.netto ? '' : '€ ' + Number(row.netto).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2}))
            : null,
            $('td').text(row.prodStockLocation),
          ))
        ),
      ),
    )
  }
  async function order(orderNr) {
    const data = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'paklijst',
      id: orderNr,
      set: 'printDateTime = GETDATE()'
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
        tracking: $('table').class('grid').style('table-layout:fixed;').append(
          $('thead').append(
            $('tr').append(
              $('th').align('left').text('Gepakt'),
              $('th').align('left').text('Verzonden'),
              $('th').align('left').text('Geleverd'),
              $('th').align('left').text('Gefactureerd'),
            ),
          ),
          $('tbody').append(
            $('tr').style('height:30px;').append(
              $('td'),
              $('td'),
              $('td'),
              $('td'),
            ),
          ),
        ),

      }).style('page-break-before:always;'),
      orderPage(salesorder, rows, {
        title: 'PAKBON',
      }).style('page-break-before:always;'),
    );
  }
  async function offertebon(orderNr) {
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
        title: 'OFFERTE BON',
        showPrice: true,
      }),
    );
  }
  async function factuur(factuurNr) {
    factuurData = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'factuur',
      factuurNr: factuurNr,
    }).then(e => e.body);
    console.log(factuurNr,factuurData);
    const [clientInvoices,clientOrders,rows] = factuurData;
    const [invoice] = clientInvoices;
    const [salesorder] = clientOrders;

    rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
    const mailtext = ''; // Exta tekst op mail naar klant

    // let sum = rows.reduce((s,row) => s + row.quant * row.netto, 0);


    // sum = 100;
    // salesorder.clientKortingContant = 1;
    // salesorder.clientVrachtkosten = 10;

    salesorder.clientKortingContant = isNaN(salesorder.clientKortingContant) ? 0 : Number(salesorder.clientKortingContant);

    const els = {};
    let totaal = 0;
    let betaald = 0;

    // const elem = $('iframe').printbody().append(
    //   $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
    // ).append(


    const elem = $('div').append(
      $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
      $('div').briefkop(salesorder, 'FACTUUR '+factuurNr).append(
        $('table').class('grid').style('margin-bottom:2mm;').append(
          $('thead').append(
            els.trh = $('tr').append(
              $('th').align('left').text('Datum'),
              $('th').align('left').text('FactuurNr'),
              $('th').align('left').text('DebNr'),
            )
          ),
          $('tbody').append(
            els.trb = $('tr').append(
              $('td').text(new Date(salesorder.invoiceDateTime || salesorder.abisInvoiceDateTime).toLocaleDateString()),
              $('td').text(factuurNr),
              $('td').text(invoice.clientDebNr),
            ),
          ),
        ),
        $('table').class('grid').append(
          $('thead').append(
            $('tr').append(
              $('th').align('left').text('Code'),
              $('th').align('left').text('Verpakking'),
              $('th').align('left').style('width:100%;').text('Omschrijving'),
              $('th').align('right').text('Aantal'),
              $('th').align('right').text('Prijs'),
              $('th').align('right').text('Excl'),
            ),
          ),
          $('tbody').append(
            ...clientOrders.map(salesorder => [
              $('tr').append(
                $('th'),
                $('th'),
                $('th').align('left').text(`Order: ${salesorder.nr}`, salesorder.ref ? `ref: ${salesorder.ref}`: ''),
                $('th'),
                $('th'),
                $('th'),
              )
            ].concat(
              rows.filter(row => row.orderNr === salesorder.nr).map(row => $('tr').append(
                $('td').text(row.artNr),
                $('td').text(row.unit),
                $('td').style('white-space:normal;').text(row.title),
                $('td').align('right').text(row.quant),
                $('td').align('right').text(!row.netto ? '' : cur(row.netto)),
                $('td').align('right').text(row.quant && row.netto ? cur(row.totnetto = row.quant * row.netto, totaal += row.totnetto) : ''),
              )),

              !Number(invoice.vrachtKost) ? null : $('tr').append(
                $('td'),$('td'),$('td').text('Vrachtkosten'),
                $('td').align('right').text(1),$('td').align('right').text(cur(invoice.vrachtKost, totaal += Number(invoice.vrachtKost||0))),
              ),

              !invoice.payCash ? null : $('tr').append(
                $('td'),$('td'),$('td').text(`Contant voldaan ${cur(invoice.payCash, betaald += Number(invoice.payCash))}`),$('td'),$('td')
              ),
              !invoice.payPin ? null : $('tr').append(
                $('td'),$('td'),$('td').text(`PIN voldaan ${cur(invoice.payPin, betaald += Number(invoice.payPin))}`),$('td'),$('td')
              ),
              !invoice.payBank ? null : $('tr').append(
                $('td'),$('td'),$('td').text(`Bank voldaan ${cur(invoice.payBank, betaald += Number(invoice.payBank))}`),$('td'),$('td')
              ),
            )),
            $('tr').style('height:5mm;'),

            // !salesorder.clientKortingContant ? null : $('tr').append(
            //   $('td'),$('td'),$('td').text(`Korting contant over ${cur(totaal)}`),
            //   $('td').align('right').text(`${salesorder.clientKortingContant || 0}%`),$('td').align('right').text(cur(salesorder.kortingContant = salesorder.clientKortingContant ? totaal * salesorder.clientKortingContant / 100 : 0, totaal -= salesorder.kortingContant)),
            // ),

            !invoice.kortContantProc ? null : $('tr').append(
              $('td'),$('td'),$('td').text(`Korting contant over ${cur(totaal)}`),
              $('td').align('right').text(`${invoice.kortContantProc}%`),$('td').align('right').text(cur(invoice.kortingContant = invoice.kortContantProc ? totaal * invoice.kortContantProc / 100 : 0, totaal -= invoice.kortingContant)),
            ),

          ),
        ),
      ),
      $('table').class('grid').style('position:absolute;bottom:15mm;').append(
        $('thead').append(
          els.trh = $('tr').append(
          )
        ),
        $('tbody').append(
          els.trb = $('tr').append(
          ),
        ),
      ),
    )

    console.log(invoice);

    els.trh.append($('th').align('right').text(`Excl`));
    els.trb.append($('td').align('right').text(cur(totaal)));

    els.trh.append($('th').align('right').text(`Btw ${invoice.btw}%`));
    els.trb.append($('td').align('right').text(cur(invoice.btwbedrag = totaal * invoice.btw/100, totaal += invoice.btwbedrag)));

    els.trh.append($('th').align('right').text(`Incl`));
    els.trb.append($('td').align('right').text(cur(totaal)));

    if (betaald) {
      els.trh.append($('th').align('right').text(`Voldaan`));
      els.trb.append($('td').align('right').text(cur(betaald)));
      els.trh.append($('th').align('right').text(`Te betalen`));
      els.trb.append($('td').align('right').text(cur(totaal - betaald)));
    }
    return elem;
  }
  async function factuurSend(data, html) {
    const [clientOrders,rows] = data;
    const [salesorder] = clientOrders;
    const invoiceNr = salesorder.invoiceNr || salesorder.invoiceNrAbis;
    const from = `invoice@${salesorder.accountCompanyName.toLowerCase()}.nl`;
    await $().url('https://aliconnect.nl/api/abis/data').query({
      request_type: 'sendfactuur',
    }).input({
      from: from,
      bcc: from,
      to: salesorder.clientOtherMailAddress,
      to: 'max.van.kampen@alicon.nl',
      invoiceNr: invoiceNr,
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
    // console.log(data);
    const accountCompany = data.shift().shift();
    const invoiceNr = accountCompany.invoiceNr;
    const factuurElem = await factuur(invoiceNr);
    const [clientOrders,rows] = factuurData;
    [salesorder] = clientOrders;
    // console.log(salesorder);
    facturenElem = facturenElem || $('div')//$('iframe').printbody();
    if (salesorder.clientOtherMailAddress) {
      await factuurSend(factuurData, factuurElem.elem.innerHTML);
      factuurElem.remove();
    } else {
      facturenElem.append(factuurElem.style('page-break-before:always;'))
    }
    const pageId = new URLSearchParams(document.location.search).get('id');
    document.location.href = '#?id=';
    document.location.href = '#?id='+pageId;
  }
  async function lijstPakken() {
    const data = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'paklijst',
      id: aim.listRows.map(row => row.nr).join(','),
      set: 'printDateTime = GETDATE()'
    }).then(e => e.body);
    const [salesorders,rows] = data;
    const [salesorder] = salesorders;
    // console.log(rows);
    pickrows = rows.filter(row => row.artId && ![
      'Z1000',
      // 'I1000',
    ].includes(row.artNr))
    pickrows.forEach(row => row.prodStockLocation = row.prodStockLocation || '?');
    pickrows.sort((a,b)=>a.prodStockLocation.localeCompare(b.prodStockLocation) )
    $('iframe').printbody().append(
      $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
      $('h1').text('Paklijst'),
      $('table').class('grid').append(
        $('thead').append(
          $('tr').append(
            $('th').align('left').text('Mag'),
            $('th').align('left').text('Code'),
            $('th').align('left').text('Verpakking'),
            $('th').align('left').text('Omschrijving'),
            $('th').align('left').text('Aantal'),
            $('th').align('left').text('Order'),
          ),
        ),
        $('tbody').append(
          pickrows.map(row => $('tr').append(
            $('td').text(row.prodStockLocation),
            $('td').text(row.artNr),
            $('td').text(row.unit),
            $('td').text(row.title),
            $('td').text(row.quant),
            $('td').text(row.orderNr),
          )),
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
  }
  async function lijstFactureren() {
    const orders = aim.listRows;
    for (let clientName of orders.map(row => row.clientName).unique()) {
      const clientOrders = orders.filter(row => row.clientName === clientName);
      const [salesorder] = clientOrders;
      await factureren(salesorder, clientOrders.map(o => o.nr).join(','));
    }
    if (facturenElem.elem.children) {
      facturenElem.printpdf();
    }
    facturenElem = null;
  }
  async function lijstHerinneren() {
    const rows = aim.listRows;
    for (let clientName of rows.map(row => row.clientName).unique()) {
      const clientInvoices = rows.filter(row => row.clientName === clientName);
      const [invoice] = clientInvoices;
      const invoiceNrs = clientInvoices.map(row => row.nr).unique();
      const from = `invoice@${invoice.accountCompanyName.toLowerCase()}.nl`;
      // console.log(clientName,clientOrders,invoiceNrs);
      const attachements = invoiceNrs.map(invoiceNr => Object({
        invoiceNr: invoiceNr,
      }));
      for (let attachement of attachements) {
        attachement.iframe = await factuur(attachement.invoiceNr);
      }
      // console.log(salesorder.clientOtherMailAddress, salesorder.clientCompanyName, salesorder);
      await $().url('https://aliconnect.nl/api/abis/data').query({
        request_type: 'send',
      }).input({
        from: from,
        bcc: from,
        to: invoice.clientOtherMailAddress,
        to: 'max.van.kampen@alicon.nl',
        chapters: [
          {
            title: `Betalingsherinnering voor ${invoice.clientCompanyName}`,
            content: aim.markdown().render(`Geachte heer/mevrouw,

          	Volgens onze administratie heeft ${invoice.clientCompanyName} nog een of meerdere facturen bij ons openstaan, waarvan de betalingstermijn inmiddels is verstreken.
          	Wij vragen u vriendelijk om de facturen (zie bijlagen) te controleren en aan ons te voldoen.

            Indien dit bericht uw betaling heeft gekruist dan kunt U deze e-mail als niet verzonden beschouwen.
            Mochten er redenen zijn waarom u niet kunt overgaan tot betaling
            dan verzoeken wij u om contact opnemen met onze financiële administratie
            via e-mail: [invoice@${invoice.accountCompanyName}.nl](mailto:invoice@${invoice.accountCompanyName}.nl?SUBJECT=Vraag over betalingsherinnerig&BODY=Beste administratie,%0A%0AIk heb een vraag over de betalinsherinnering.%0A%0A)
            of telefonisch: ${invoice.accountPhone}.

            Met vriendelijke groet,

            Debiteurenbeheer  \n${invoice.accountCompanyName}`),
          },
        ],
        attachements: attachements.map(row => Object({
          content: row.iframe.elem.innerHTML,
          name: `${invoice.accountCompanyName}-factuur-${row.invoiceNr}-${invoice.clientName}.pdf`.toLowerCase(),
        }))
      }).post();
    }
    document.querySelectorAll('iframe').forEach(el => el.remove());
    alert('Herinneringen verstuurd');
  }
  aim.config.components.schemas.salesorder.app = {
    nav: row => [
      $('button').class('abtn print').title('Bon printen').on('click', async e => (await order(row.nr)).print()),
      $('button').class('abtn').text('OffBon').title('Offert bon printen').on('click', async e => (await offertebon(row.nr)).print()),

      row.invoiceNrAbis || row.invoiceNr
      ? $('button').class('abtn invoice').title('Factuur printen').on('click', async e => (await factuur(row.invoiceNrAbis || row.invoiceNr)).printpdf())
      : $('button').text('Factureren').on('click', async e => {
        await factureren(row, row.nr);
        // console.log(facturenElem);
        if (facturenElem.elem.children) {
          facturenElem.print();
        }
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
    ],
    navList: () => [
      $('button').text('Bonnen').append(
        $('div').append(
          $('button').text('Paklijst').on('click', lijstPakken),
          $('button').text('Gepakt').on('click', e => $().url('https://aliconnect.nl/api/abis/data').post({
            request_type: 'paklijst',
            id: aim.listRows.map(row => row.nr).join(','),
            set: 'pickDateTime = GETDATE()'
          })),
          $('button').text('Verzonden').on('click', e => $().url('https://aliconnect.nl/api/abis/data').post({
            request_type: 'paklijst',
            id: aim.listRows.map(row => row.nr).join(','),
            set: 'sendDateTime = GETDATE()'
          })),
          $('button').text('Geleverd').on('click', e => $().url('https://aliconnect.nl/api/abis/data').post({
            request_type: 'paklijst',
            id: aim.listRows.map(row => row.nr).join(','),
            set: 'deliverDateTime = GETDATE()'
          })),
          $('button').text('Factureren').on('click', lijstFactureren),
        ),
      ),
    ]
  }
  aim.config.components.schemas.invoice.app = {
    nav: row => [
      $('button').class('abtn print').title('Print').on('click', async e => (await factuur(row.nr)).print()),
    ],
    navList: () => [
      $('button').text('Bonnen').append(
        $('div').append(
          $('button').text('Herinneren').on('click', lijstHerinneren),
        ),
      ),
    ]
  }


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
      Mandje: e => aim.list('salesorder',{
        $filter: `isOrder NE 1 && isQuote NE 1`,
        $order: `nr DESC`,
      }),
      Nieuw: e => aim.list('salesorder',{
        $filter: `isOrder EQ 1 && printDateTime EQ NULL`,
        $order: `nr DESC`,
        $search: '*',
      }),
      Actief: e => aim.list('salesorder',{
        $filter: `printDateTime NE NULL && ISNULL(invoiceNrAbis,0) EQ 0 && ISNULL(invoiceNr,0) EQ 0 && payDateTime EQ NULL`,
        $order: `nr DESC`,
        $search: '*',
      }),
      Overig: e => aim.list('salesorder',{
        $filter: `ISNULL(invoiceNr,0) GT 0`,
        $order: `nr DESC`,
      }),
      Alles: e => aim.list('salesorder',{
        $order: `nr DESC`,
        $top: 100,
        $search: '',

      }),
    },
    Facturatie: {
      Actueel: e => aim.list('invoice',{
        $filter: `betaald EQ NULL`,
        $order: `nr DESC`,
      }),
      Betaald: e => aim.list('invoice',{
        $filter: `betaald EQ 1`,
        $order: `nr DESC`,
      }),
    },
    Abis: {
      Klanten() {
        aim.list('client');
      },
      Pakbonnen() {
        aim.list('salesorder');
      },
      Pakbon_regels() {
        aim.list('salesorderrow');
      },
      Fakturen() {
        aim.list('invoice');
      },
      Producten() {
        aim.list('prod');
      },
      Artikelen() {
        aim.list('art');
      },
      Klant_artikelen() {
        aim.list('clientart');
      },
      Bedrijven() {
        aim.list('account');
      },
    },
    Orders1: {
      Actief: e => aim.list('salesorder',{
        $filter: `ISNULL(invoiceNrAbis,0) EQ 0 && ISNULL(invoiceNr,0) EQ 0`,
      }),
      Aanbieding: e => aim.list('salesorder',{
        $filter: `isQuote EQ 1 && isOrder NE 1`,
      }),
      Aanbieding2: e => aim.list('salesorder',{
        $filter: `orderstatus IN(1,2)`,
      }),
      Winkelmandje: e => aim.list('salesorder',{
        $filter: `isQuote NE 1 && isOrder NE 1`,
      }),
      Printen: e => aim.list('salesorder',{
        $filter: `printDateTime EQ NULL && isOrder EQ 1`,
      }),
      Pakken: e => aim.list('salesorder',{
        $filter: `pickDateTime EQ NULL && printDateTime NE NULL`,
      }),
      Verzenden: e => aim.list('salesorder',{
        $filter: `sendDateTime EQ NULL && pickDateTime NE NULL`,
      }),
      Verzonden: e => aim.list('salesorder',{
        $filter: `deliverDateTime EQ NULL && sendDateTime NE NULL`,
      }),
      Geleverd: e => aim.list('salesorder',{
        $filter: `invoiceNr EQ 0 && deliverDateTime NE NULL`,
      }),
      Factureren: e => aim.list('salesorder',{
        $filter: `verwerkt=1 and aanbieding <> 1 and isnull(factuurnr,0) = 0 and isnull(faktuurnr,0) = 0`,
        $filter: `isOrder EQ 1 && isQuote NE 1 && ISNULL(invoiceNrAbis,0) EQ 0 && ISNULL(invoiceNr,0) EQ 0`,
      }),
      Gefactureerd: e => aim.list('salesorder',{
        $filter: `bookDateTime EQ NULL && invoiceNr GT 0`,
      }),
      Geboekt: e => aim.list('salesorder',{
        $filter: `payDateTime EQ NULL && bookDateTime NE NULL`,
      }),
      Betaald: e => aim.list('salesorder',{
        $filter: `payDateTime NE NULL`,
      }),
      Alles: e => aim.list('salesorder'),
    },
    Sales: {
      Klanten: e => aim.list('client',{
        $filter: `archivedDateTime EQ NULL`,
      }),
      Archief: e => aim.list('client',{
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

  aim.config.import = aim.config.import || [];
  aim.config.import.push({
    filename: 'airo-openstaande-debiteuren.xlsx',
    tabs: [{
      tabname: 'Openstaande posten debiteuren',
      cols: {
        invoiceNr: 'Factuurnummer',
        totaal: 'Totaal factuurbedrag',
        saldo: 'Saldo',
      },
      callback(rows) {
        $().url('https://aliconnect.nl/api/abis/data').post({
          request_type: 'facturen_openstaand',
          invoiceNrs: rows.map(row => row.invoiceNr).join(','),
        }).then(e => console.log(e.body));
      },
    }]
  },{
    filename: 'proving-openstaande-debiteuren.xlsx',
    tabs: [{
      tabname: 'Openstaande posten debiteuren',
      cols: {
        invoiceNr: 'Factuurnummer',
        totaal: 'Totaal factuurbedrag',
        saldo: 'Saldo',
      },
      callback(rows) {
        $().url('https://aliconnect.nl/api/abis/data').post({
          request_type: 'facturen_openstaand',
          invoiceNrs: rows.map(row => row.invoiceNr).join(','),
        }).then(e => console.log(e.body));
      },
    }]
  })

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



    // const config = await fetch('https://aliconnect.nl/yaml.php', {
    //   method: 'POST',
    //   body: await fetch('config/import.yaml').then(res => res.text()),
    // }).then(res => res.json());
    // console.log(1, config, files);
    Array.from(files).forEach((file,i) => {
      // console.log(i,file);
      aim.config.import.filter(fileConfig => file.name.match(fileConfig.filename)).forEach(fileConfig => {
        console.log(fileConfig.filename, file.name);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async e => {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          console.log(fileConfig.tabs);
          for (let tab of fileConfig.tabs) {
            console.log(tab);
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
            console.log(toprow);
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
                  // console.log();
                  value = rowvalue(r, toprow.includes(name) ? toprow.indexOf(name) : toprow.indexOf(tab.cols[name]));
                }
                if (value !== undefined) {
                  row = row || Object.assign({},tab.data);
                  row[name] = value;
                }
              }
              if (row) {
                console.log(row)
                data.rows.push(row);
                // row.keyname = row.keyname || row.orderCode;
                // if (row.keyname && (row.catalogPrice || row.purchasePrice || row.partPrice)) {
                //   // if (row && row.orderCode && row.description && row.catalogPrice) {
                //   row.keyname = (tab.keyname || '') + row.keyname;
                //   row.orderCode = (tab.orderCode || '') + row.orderCode;
                //   if (tab.calc) {
                //     tab.calc.forEach(c => row[c.name] *= c.faktor)
                //   }
                //   data.rows.push(row);
                // }
              }
            };
            console.log(data);
            if (tab.callback) {
              tab.callback(data.rows);
            }
            return;
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
