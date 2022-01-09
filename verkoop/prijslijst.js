$().on('load', async e => {
  const cols = [
    { n: 'id', v: 'ArtikelNr', wch: 8, f:{t:'s'} },
    { n: 'artCode', v: 'ArtikelCode', wch: 20 },
    { n: 'titel', v: 'Titel', wch: 100 },
    { n: 'va', v: 'VA', wch: 3, f: { t:'n' } },
    { n: 'ppa', v: 'PPA', wch: 10, f:{t:'n', z:'.00'} },
    { n: 'ppe', v: 'PPE', wch: 10, f:{t:'n', z:'.00'} },
    { n: 'k', v: 'K', wch: 3, f:{t:'n'} },
    { n: 'lt', v: 'LT', wch: 12  },
    // // { n: 'kortK', v: 'Korting', wch: 10, f:{t:'n' } },
    // { n: 'kortingCode', v: 'KortingCode', wch: 10, f:{t:'n' } },
    // { n: 'merk', v: 'Merk', wch: 10 },
    // { n: 'leverancier', v: 'Leverancier', wch: 10 },
    // { n: 'bestelCode', v: 'Bestelcode', wch: 10 },
    // { n: 'code', v: 'Code', wch: 10 },
    // { n: 'segment', v: 'Segment', wch: 12 },
    // { n: 'categorie', v: 'Categorie', wch: 12 },
    // { n: 'barcode', v: 'EAN', wch: 10, f: { t:'s' } },



    // { n: 'klantNr', v: 'KlantNr', wch: 10, f:{t:'n'} },

    // { n: 'korting', v: 'Korting', wch: 10, f:{t:'n' } },
    // { n: 'netto', v: 'Netto', wch: 10, f:{t:'n', z:'.00'} },
    // { n: 'productCode', v: 'ProductCode', wch: 12 },
    // { n: 'netto', v: 'Netto', wch: 10, f:{t:'n', z:'.00'} },
    // { n: 'serie', v: 'Serie', wch: 10 },
    // { n: 'type', v: 'Type', wch: 10 },
    // { n: 'kleur', v: 'Kleur', wch: 10 },
    // { n: 'verhouding', v: 'Verhouding', wch: 10 },
    // { n: 'extra1', v: 'Extra1', wch: 16 },
    // { n: 'extra2', v: 'Extra2', wch: 16 },
    // { n: 'inhoud', v: 'Inh', wch: 10, f: { t:'n' } },
    // { n: 'inhoudEenheid', v: 'Eenh', wch: 10 },
    // { n: 'artGroep', v: 'Categorie', wch: 20 },
  ];

  const searchParams = new URL(document.location).searchParams;
  const customer_id = searchParams.get('customer_id');
  const [rows] = await fetch(`https://dms.aliconnect.nl/api/v1/abis/prijslijst_xls?client_id=cac652da-dcdc-455a-a0de-e32bac08ea06&customer_id=${customer_id}&select=${cols.map(col => col.n).join(',')}`).then(res => res.json());
  console.log(rows);
  rows.forEach(row => {
    // row.bruto
  });
  rows.sort((a,b)=>a.titel.localeCompare(b.titel));
  const title = 'proving-prijslijst';
  const ws_title = title.split(/\s|-/)[1];

  var wb = XLSX.utils.book_new();
  wb.Props = {
    Title: ws_title,
    Subject: ws_title,
    Author: "",
    CreatedDate: new Date(2017,12,19)
  };
  wb.SheetNames.push(ws_title);
  var ws = XLSX.utils.aoa_to_sheet([cols].concat(rows.map(row => cols.map(col => Object.assign({v: String(row[col.n] !== null ? row[col.n] : '').trim() }, col.f)))));
  ws['!cols'] = cols;
  wb.Sheets[ws_title] = ws;
  var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
  // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), ws_title + ' Proving.xlsx');
  $('a').download(`${title}-${customer_id}.xlsx`).rel('noopener').href(URL.createObjectURL(new Blob([aim.s2ab(wbout)],{type:"application/octet-stream"}))).click().remove();
});
