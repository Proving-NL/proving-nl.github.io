$().on('load', async e => {
  const aimConfig = {
    client_id: aim.config.client_id,
    scope: 'openid profile name email',
  };
  const aimClient = new aim.PublicClientApplication(aimConfig);
  const config = await aimClient.getConfig();
  console.log(111,config);
  const aimRequest = {
    scopes: aimConfig.scope.split(' '),
  };
  const dmsConfig =  {
    servers: [{url: aim.dmsUrl}],
  };
  const authProvider = new aimClient.AuthProvider(aimClient, {
    scopes: aimRequest.scopes,
  });
  const dmsClient = aim.Client.initWithMiddleware({authProvider}, dmsConfig);
  const [kop1,kop2,artikelgroep] = await dmsClient.api('/abis/productgroepen').get();
  config.artikelgroepen = Object.fromEntries(kop1.map(kop1 => [
    kop1.title,
    Object.fromEntries(kop2.filter(kop2 => kop2.parentId === kop1.id).map(kop2 => [
      kop2.title,
      Object.fromEntries(artikelgroep.filter(ag => ag.parentId === kop2.id).map(ag => [
        ag.title,
        e => aim.list('product', {
          $filter: `artikelgroepid eq ${ag.id}`,
        }),
      ])),
    ])),
  ]));

  const url = new URL(document.location);
  const contact_id = url.searchParams.get('contact_id') || localStorage.getItem('contact_id');
  console.log('AIM', contact_id, aimClient, dmsClient, aim.config);
  if (contact_id) {
    localStorage.setItem('contact_id', contact_id);
    const [[contact],organisatieMerk] = await dmsClient.api('/abis/contact').query('contact_id', contact_id).get();
    console.log('C', contact, organisatieMerk);
    clientName = contact.klantId;

    // console.log(123,await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.text()));



    // const [rows] = [[]];//await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.json());
    // console.log(111,contact,rows);
    async function excellijst(rows,title,cols) {
      const ws_title = title.split(/\s|-/)[1];
      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: ws_title,
        Subject: ws_title,
        Author: "",
        CreatedDate: new Date(2017,12,19)
      };
      var ws = XLSX.utils.aoa_to_sheet([cols].concat(rows.map(row => cols.map(col => Object.assign({v: String(row[col.n] !== null ? row[col.n] : '').trim() }, col.f)))));
      ws['!cols'] = cols;
      wb.SheetNames.push('artikelen');
      wb.Sheets['artikelen'] = ws;
      var ws = XLSX.utils.aoa_to_sheet([
        [
          {v: 'Klant Id'},
          {v: contact.clientId},
        ],[
          {v: 'Klant Nr'},
          {v: contact.clientNr},
        ],[
          {v: 'Klant Code'},
          {v: contact.clientName},
        ],[
          {v: 'Klant Naam'},
          {v: contact.clientCompanyname},
        ],[
          {v: 'Contact Id'},
          {v: contact.contactId},
        ],[
          {v: 'Contact Nr'},
          {v: contact.contactNr},
        ],[
          {v: 'Contact Weergavenaam'},
          {v: contact.contactDisplayname},
        ],[
          {v: 'Contact Email'},
          {v: contact.contactEmail},
        ]
      ]);
      ws['!cols'] = [
        {wch: 36},
        {wch: 60},
        // {wch: 36},
        // {wch: 36},
        //
        // {wch: 36},
        // {wch: 8},
        // {wch: 36},
        // {wch: 36},
      ];
      wb.SheetNames.push('account');
      wb.Sheets['account'] = ws;
      // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), ws_title + ' Proving.xlsx');
      var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
      $('a').download(`${contact.clientName.toLowerCase()}-${title.toLowerCase()}.xlsx`).rel('noopener').href(URL.createObjectURL(new Blob([aim.s2ab(wbout)],{type:"application/octet-stream"}))).click().remove();
    }

    function printPrijslijst(rows,merk) {
      console.log(555,rows);
      const elem = $('div').parent(document.body).append(
        // $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
        `<style>
        @page {margin: 1cm 1cm 1cm 1cm;}
        html,body,table{font-family:sans-serif;margin:0;padding:0;}
        th,td{padding:3px;vertical-align:top;}
        th{text-align:left;font-size:0.8em;font-style:italic;color:gray;line-height:14px;}
        td{white-space:nowrap;}
        </style>`,
        $('table').append(
          $('thead').append(
            `<tr><td colspan=6 style='height:20mm;'>
            <span style='float:left;display:inline-block;width:50mm;height:20mm;margin-right:5mm;background:url(https://airo-nl.aliconnect.nl/assets/img/letter-header-airo.png) no-repeat'></span>
            <b>AIRO Nederland - PRIJSLIJST ${merk} ${new Date().toLocaleDateString()}</b><br>
            Prijzen in EURO excl BTW<br>
            Het Ambacht 42 - Westervoort - T: 026-312 09 47 - info@airo.nl - www.airo.nl<br>
            <b>${contact.clientCompanyname}</b>
            </td></tr>
            <tr style='font-size:8pt;'>
            <th>Art.nr.</th>
            <th width=100%>Omschrijving</th>

            <th style='text-align:right;'>VA</th>
            <th style='text-align:right;'>Bruto</th>
            <th style='text-align:right;'>Korting</th>
            <th style='text-align:right;'>Netto</th>
            </tr>`
          ),
          $('tbody').style('font-size:8pt;'),
        ),
      );
      var el1,el2,el3 = null;
      function printRow(row) {
        $('table>tbody').append(
          $('tr').append(
            $('td').text(row.artNr),
            // $('td').text(row.merk),
            // $('td').text(row.code),
            $('td').style('white-space:normal;').text(row.tekst.replace(/\n|\r/g,'')),

            // $('td').align('right').text(row.kortingCode),

            $('td').align('right').text(row.verpaktPer),
            $('td').align('right').text(aim.num(row.bruto)),
            $('td').align('right').text(`${aim.num(row.korting,0)}%`),
            $('td').align('right').text(aim.num(row.netto)),
          )
        )
      }
      for (let [h1,groep1] of Object.entries(config.artikelgroepen)){
        el1 = null;
        for (let [h2,groep2] of Object.entries(groep1)){
          el2 = null;
          for (let [h3,groep3] of Object.entries(groep2)){
            const rowsgroep = rows.filter(row => row.artGroep === h3);
            rowsgroep.forEach(row => row.printed = true);
            if (rowsgroep.length) {
              // console.log(h3,el1,el2,el3);
              el1 = el1 || $('tr').parent('table>tbody').append(
                $('td').colspan(8).text(h1).style('background:#ccc;font-size:1.2em;'),
              );
              el2 = el2 || $('tr').parent('table>tbody').append(
                $('td').colspan(8).text(h2).style('background:#ccc;font-size:1.1em;'),
              );
              $('tr').parent('table>tbody').append(
                $('td').colspan(8).text(h3).style('background:#ccc;'),
              );
              rowsgroep.forEach(printRow);
            }
            // console.log(h1,groep);
          }
        }
      }
      const rowsgroup = rows.filter(row => !row.printed);
      rowsgroup.map(row => row.artGroep).unique().forEach(h3 => {
        const rowsgroep = rows.filter(row => row.artGroep === h3);
        if (rowsgroep.length) {
          $('tr').parent('table>tbody').append(
            $('td').colspan(8).text(h3).style('background:#ccc;'),
          );
          rowsgroep.forEach(printRow);
        }
      })
      elem.print().remove();
    }

    $(document.body).style('max-width:18cm;margin:auto;font-family:arial').append(
      $('h1').text(`${contact.contactDisplayname},`),
      $('p').append(`Hierbij informeren wij u over onze prijswijzigingen welke gelden voor ${contact.clientCompanyname}. Wij hebben voor u een overzicht gemaakt gebaseerd opde rpoducten die u de afgelopen 2 jaar bij ons heeft afgenomen. Ons assortiment is echter groter. Voor vragen kunt U altijd contact opnemen met onze klant manager.`),
      $('p').append(`De lijsten bevatten verschillende kolommen welke de volgende betekenis hebben:`),
      $('ul').append(
        $('li').append(`<i>ArtNr</i>: Ons artikel nummer ....`),
        $('li').append(`<i>Merk</i>: Ons artikel nummer ....`),
        $('li').append(`<i>Code</i>: Ons artikel nummer ....`),
        $('li').append(`<i>Omschrijving</i>: Omschrijving artiokel ....., verpakt per: ....`),
        // $('li').append(`<i>KC</i> (Korting Code): Uw korting code waaran uw korting is gerelateerd.`),
        $('li').append(`<i>VA</i>: Verpak aantal, indien mogelijk dit aantal aanhouden bij een bestelling`),
        $('li').append(`<i>Bruto</i>: Catalogus of lijst verkoop prijs opgegeven door de fabrikant of leverancier`),
        $('li').append(`<i>Korting</i>: Uw korting in procenten.`),
        $('li').append(`<i>Netto</i>: Uw prijs exclusief BTW.`),
      ),
      $('p').append(
        'Het bestand ',
        $('a').href('#').text('Bestellijst.XLS').on('click', async e => {
        const [rows] = await dmsClient.api('/abis/prijslijst_xls').query({klant_id:contact.clientId}).get();
        excellijst(rows, 'Bestellijst', [
          { n: 'artNr', v: 'ArtNr', wch: 8, f:{t:'s'} },
          { n: 'aantal', v: 'Aantal', wch: 8 },
          { n: 'tekst', v: 'Omschrijving', wch: 100 },
          // { n: 'bruto', v: 'Bruto', wch: 10, f:{t:'n', z:'0.00'} },
          // { n: 'korting', v: 'Korting', wch: 10, f:{t:'n', z:'0.0'} },
          { n: 'netto', v: 'Netto', wch: 10, f:{t:'n', z:'0.00'} },
          // { n: 'artGroep', v: 'Productgroep', wch: 50 },
        ]);
      }),
        ` bevat een overzicht van reeds bij ons bestelde artikelen.
        Dit bestand kunt u gebruiken als uw bestelformulier.
        Vul in de kolom Aantal uw  gewenste bestelaantal in
        en stuur dit bestand naar <a href='verkoop@airo.nl'>verkoop@airo.nl</a>.
        Uw bestelling wordt dan automatisch verwerkt waardoor wij zo snel mogelijk aan het verwerken van uw order kunnen starten.`
      ),

      // $('li').append($('a').href('#').text('Bestellijst.xlsx').on('click', async e => {
      //   const cols = [
      //     { n: 'artNr', v: 'ArtNr', wch: 8, f:{t:'s'} },
      //     { n: 'aantal', v: 'Aantal', wch: 8 },
      //     { n: 'titel', v: 'Omschrijving', wch: 100 },
      //     { n: 'ppe', v: 'Prijs', wch: 10, f:{t:'n', z:'.00'} },
      //   ];
      //   const [rows] = await fetch(`https://dms.aliconnect.nl/api/v1/abis/prijslijst_xls?client_id=cac652da-dcdc-455a-a0de-e32bac08ea06&klant_id=${contact.klant_id}&select=${cols.map(col => col.n).join(',')}`).then(res => res.json());
      //
      //   excellijst('Bestellijst',cols,rows);
      // })),

      // $('p').append(
      //   `Klik `,
      //   $('a').href('#')
      //   .text('hier')
      //   .on('click', async e => {
      //     // console.log(await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.text()));
      //     // const [rows] = await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.json());
      //     // console.log(rows);
      //     printPrijslijst(rows);
      //   }),
      //   ` voor een totaal prijslijst voor ${contact.clientCompanyname} om uit te printen`
      // ),

      // $('p').append(
      //   `Klik `,
      //   $('a').href('#')
      //   .text('hier')
      //   .on('click', async e => {
      //     const cols = [
      //       { n: 'aantal', v: 'Aantal', wch: 8, f:{t:'s'} },
      //       { n: 'artNr', v: 'ArtNr', wch: 8, f:{t:'s'} },
      //       { n: 'merk', v: 'Merk', wch: 20 },
      //       { n: 'artGroep', v: 'Categorie', wch: 30 },
      //       { n: 'code', v: 'Code', wch: 14, f:{t:'s'} },
      //       { n: 'tekst', v: 'Omschrijving', wch: 100 },
      //       { n: 'verpaktPer', v: 'VA', wch: 8, f:{t:'s'} },
      //       // { n: 'bestelCode', v: 'Code 2', wch: 16, f:{t:'s'} },
      //       // { n: 'artGroep', v: 'Categorie', wch: 25 },
      //       // { n: 'kortingCode', v: 'KC', wch: 10 },
      //
      //       { n: 'bruto', v: 'Bruto', wch: 10, f:{t:'n', z:'#,##0.00'} },
      //       { n: 'korting', v: 'Korting', wch: 10, f:{t:'n', z:'0.0'} },
      //       { n: 'netto', v: 'Netto', wch: 10, f:{t:'n', z:'#,##0.00'} },
      //
      //
      //       // { n: 'inkBruto', v: 'Ink Bruto Oud', wch: 10, f:{t:'n', z:'#,##0.00'} },
      //       // { n: 'inkKorting', v: 'Ink Korting Oud', wch: 10, f:{t:'n', z:'0.0'} },
      //       // { n: 'inkNetto', v: 'Ink Netto Oud', wch: 10, f:{t:'n', z:'#,##0.00'} },
      //       // { n: 'inkVerkNetto', v: 'Verkoop Netto Oud', wch: 10, f:{t:'n', z:'#,##0.00'} },
      //       // { n: 'inkVerkKorting', v: 'Verkoop Korting Oud', wch: 10, f:{t:'n', z:'0.0'} },
      //       //
      //       // { n: 'levBruto', v: 'Ink Bruto', wch: 10, f:{t:'n', z:'#,##0.00'} },
      //       // { n: 'levKorting', v: 'Ink Korting', wch: 10, f:{t:'n', z:'0.0'} },
      //       // { n: 'levNetto', v: 'Ink Netto', wch: 10, f:{t:'n', z:'#,##0.00'} },
      //       // { n: 'levVerkNetto', v: 'Verkoop Netto', wch: 10, f:{t:'n', z:'#,##0.00'} },
      //       // { n: 'levVerkKorting', v: 'Verkoop Korting', wch: 10, f:{t:'n', z:'0.0'} },
      //       //
      //       // { n: 'leverancier', v: 'Leverancier', wch: 10 },
      //
      //     ];
      //     // const [rows] = await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.json());
      //     excellijst('Prijslijst',cols,rows);
      //   }),
      //   ` voor een totaal prijslijst voor ${contact.clientCompanyname} in MS-Excel formaat. Deze kan ook gebruikt worden voor het doorgeven van bestellingen. U kunt daarvoor de kolom <i>aantal</i> invullen en de excel sheet versturen aan <a href="mailto:verkoop@airo.nl">verkoop@airo.nl</a>`
      // ),

      $('ul').append(
        organisatieMerk.map(om => om.merk).unique().map(merk => $('li').text('Prijslijst', merk, '').append(
          $('a').href('#').text('printen').on('click', async e => {
            const [rows] = await dmsClient.api('/abis/prijslijstklant').query({klant_id:contact.clientId, merk:merk}).get();
            // const [rows] = await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.json());
            // console.log(rows);
            printPrijslijst(rows, merk);
          }),
          ', ',
          $('a').href('#').text('xls').on('click', async e => {
            const [rows] = await dmsClient.api('/abis/prijslijstklant').query({klant_id:contact.clientId, merk:merk}).get();
            // const [rows] = await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.json());
            // console.log(rows);
            excellijst(rows, merk, [
              { n: 'artNr', v: 'ArtNr', wch: 8, f:{t:'s'} },
              { n: 'aantal', v: 'Aantal', wch: 8 },
              { n: 'tekst', v: 'Omschrijving', wch: 100 },
              { n: 'bruto', v: 'Bruto', wch: 10, f:{t:'n', z:'0.00'} },
              { n: 'korting', v: 'Korting', wch: 10, f:{t:'n', z:'0.0'} },
              { n: 'netto', v: 'Netto', wch: 10, f:{t:'n', z:'0.00'} },
              { n: 'artGroep', v: 'Productgroep', wch: 50 },
            ]);
          }),
        ))
      ),


      // $('a').text('Prijs lijst').target('prijslijst').href(`https://dms.aliconnect.nl/api/v1/abis0/prijslijst?klant_id=${contact.klant_id}`),
    )
  }
});
