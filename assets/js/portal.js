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


  const url = new URL(document.location);
  const contact_id = url.searchParams.get('contact_id') || localStorage.getItem('contact_id');
  console.log('AIM', contact_id, aimClient, dmsClient, aim.config);
  if (contact_id) {
    localStorage.setItem('contact_id', contact_id);
    const [[contact]] = await dmsClient.api('/abis/contact').query('contact_id', contact_id).then(res => res.json());
    console.log('C', contact);
    clientName = contact.klantId;

    async function excellijst(title,cols,rows) {
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
          {v: 'Klant Nr'},
          {v: 'Klant Code'},
          {v: 'Klant Naam'},
          {v: 'Contact Id'},
          {v: 'Contact Nr'},
          {v: 'Contact Weergavenaam'},
          {v: 'Contact Email'},
        ],[
          {v: contact.clientId},
          {v: contact.clientNr},
          {v: contact.clientName},
          {v: contact.clientCompanyname},

          {v: contact.contactId},
          {v: contact.contactNr},
          {v: contact.contactDisplayname},
          {v: contact.contactEmail},
        ]
      ]);
      ws['!cols'] = [
        {wch: 36},
        {wch: 8},
        {wch: 36},
        {wch: 36},

        {wch: 36},
        {wch: 8},
        {wch: 36},
        {wch: 36},
      ];
      wb.SheetNames.push('account');
      wb.Sheets['account'] = ws;
      // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), ws_title + ' Proving.xlsx');
      var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
      $('a').download(`${contact.clientName.toLowerCase()}-${title.toLowerCase()}.xlsx`).rel('noopener').href(URL.createObjectURL(new Blob([aim.s2ab(wbout)],{type:"application/octet-stream"}))).click().remove();
    }

    $(document.body).append(
      $('h1').text(`Beste ${contact.weergaveNaam || contact.email},`),
      $('p').text(`Hierbij informeren wij u over onze prijswijzigingen welke gelden voor ${contact.firma}.`),
      $('p').append(
        $('button').text('Bestellijst.xlsx').on('click', async e => {
          const cols = [
            { n: 'artNr', v: 'ArtNr', wch: 8, f:{t:'s'} },
            { n: 'aantal', v: 'Aantal', wch: 8 },
            { n: 'titel', v: 'Omschrijving', wch: 100 },
            { n: 'ppe', v: 'Prijs', wch: 10, f:{t:'n', z:'.00'} },
          ];
          const [rows] = await fetch(`https://dms.aliconnect.nl/api/v1/abis/prijslijst_xls?client_id=cac652da-dcdc-455a-a0de-e32bac08ea06&klant_id=${contact.klant_id}&select=${cols.map(col => col.n).join(',')}`).then(res => res.json());

          excellijst('Bestellijst',cols,rows);
        }),
        $('button').text('Prijslijst.xlsx').on('click', async e => {
          const cols = [
            { n: 'aantal', v: 'Aantal', wch: 8, f:{t:'s'} },
            { n: 'artNr', v: 'ArtNr', wch: 8, f:{t:'s'} },
            { n: 'artGroep', v: 'Categorie', wch: 25 },
            { n: 'titel', v: 'Omschrijving', wch: 100 },
            { n: 'kortingCode', v: 'KC', wch: 10 },
            { n: 'bruto', v: 'Bruto', wch: 10, f:{t:'n', z:'.00'} },
            { n: 'korting', v: 'Korting', wch: 10, f:{t:'n'} },
            { n: 'netto', v: 'Netto', wch: 10, f:{t:'n', z:'.00'} },
          ];
          const [rows] = await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.json());
          excellijst('Prijslijst',cols,rows);
        }),
        // $('a').text('Prijs lijst').target('prijslijst').href(`https://dms.aliconnect.nl/api/v1/abis0/prijslijst?klant_id=${contact.klant_id}`),
        $('button').text('Prijslijst printen').on('click', async e => {
          const [rows] = await fetch('https://dms.aliconnect.nl/api/v1/abis/prijslijstklant?klant_id='+contact.clientId).then(res => res.json());
          console.log(rows);
          const elem = $('div').parent(document.body).append(
            // $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
            `<style>
            @page {margin: 1cm 1cm 1cm 1cm;}
            body,table{font-family:sans-serif;}
            th,td{padding:3px;vertical-align:top;}
            th{text-align:left;font-size:0.8em;font-style:italic;color:gray;line-height:14px;}
            td{white-space:nowrap;}
            </style>`,
            $('table').append(
              $('thead').append(
                `<tr><td colspan=6 style='height:20mm;'>
                <span style='float:left;display:inline-block;width:50mm;height:20mm;margin-right:5mm;background:url(https://airo-nl.aliconnect.nl/assets/img/letter-header-airo.png) no-repeat'></span>
                <b>AIRO PRIJSLIJST 2022 - Nederland Bruto</b><br>
                Prijzen in EURO excl BTW<br>
                Het Ambacht 42 - Westervoort - T: 026-312 09 47 - info@airo.nl - www.airo.nl<br>
                <b>${contact.clientCompanyname}</b>
                </td></tr>
                <tr>
                <th>Art.nr.</th>
                <th width=100%>Omschrijving</th>
                <th>KC</th>
                <th>Korting</th>
                <th style='text-align:right;'>Netto</th>
                <th>Bruto</th>
                <th style='text-align:right;'>Prijs</th>
                </tr>`
              ),
              $('tbody'),
            ),
          );
          var el1,el2,el3 = null;
          for (let [h1,groep1] of Object.entries(config.artikelgroepen)){
            el1 = null;
            for (let [h2,groep2] of Object.entries(groep1)){
              el2 = null;
              for (let [h3,groep3] of Object.entries(groep2)){
                const rowsgroep = rows.filter(row => row.artGroep === h3);
                if (rowsgroep.length) {
                  console.log(h3,el1,el2,el3);
                  el1 = el1 || $('tr').parent('table>tbody').append(
                    $('td').colspan(6).text(h1).style('background:#ccc;'),
                  );
                  el2 = el2 || $('tr').parent('table>tbody').append(
                    $('td').colspan(6).text(h2).style('background:#ccc;'),
                  );
                  $('tr').parent('table>tbody').append(
                    $('td').colspan(6).text(h3).style('background:#ccc;'),
                  );
                  $('table>tbody').append(
                    rowsgroep.map(row => $('tr').append(
                      $('td').text(row.artNr),
                      $('td').text(row.titel),
                      row.bruto != row.netto ? [
                        $('td')
                        // .style('font-size:0.8em;color:gray;')
                        .text(row.kortingCode),
                        $('td').align('right')
                        // .style('font-size:0.8em;color:gray;')
                        .text(`${aim.num(row.korting,0)}%`),
                        $('td').align('right').style('text-decoration:line-through;').text(aim.num(row.bruto)),
                        $('td').align('right').text(aim.num(row.netto)),
                        $('td').align('right').text(aim.num(row.prijs)),
                      ] : [
                        $('td'),
                        $('td'),
                        $('td'),
                        $('td').align('right').text(aim.num(row.bruto)),
                        $('td').align('right').text(aim.num(row.prijs)),
                      ],
                    ))
                  )
                }
                // console.log(h1,groep);
              }
            }
          }
          elem.print().remove();
        }),
      ),
    )
  }
});
