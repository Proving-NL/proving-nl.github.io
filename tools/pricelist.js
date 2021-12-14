function num(value, dig = 2){
  // return value;
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: dig, maximumFractionDigits: dig }).format(value);
}
$().on('load', async e => {
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  };
  function toExcel() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Proving " + ws_title,
      Subject: ws_title,
      Author: "Proving",
      CreatedDate: new Date(2017,12,19)
    };
    wb.SheetNames.push(ws_title);
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    ws['!cols'] = ws_cols;
    wb.Sheets[ws_title] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), ws_title + ' Proving.xlsx');
    $('a')
    .download(ws_title + ' Proving.xlsx')
    .rel('noopener')
    .href(URL.createObjectURL(new Blob([s2ab(wbout)],{type:"application/octet-stream"})))
    .click()
    .remove();
  };
  const cols = {
    title: {h:'Titel', t:'s', wch:80, },
    // row.title.replace(/\r|\n/g,''),
    inkPackPrice: { t:'n', z:'.00', wch:10, },
    listPrice: {h:'Cat.Prijs' , t:'n', z:'.00', },
    discount: {h:'Kort', t:'n', z:'.0', },
    purchaseListPrice: {  },
    purchaseDiscount: {  },
    price: {calc:1, h:'Excl', t:'n', z:'.00', },
    vatPrice: { h:'Incl', calc: row => row.price * 1.21, t:'n', z:'.00' },
    partArtNr: { h:'Product Code', },
    id: { h:'Artikel NR', },
    product: { h:'Product', },
    categorie: { h:'Categorie', },
    toepassing: { h:'Toepassing', },
    partBrand: { h:'Merk', },
    partSerie: { h:'Serie', },
    partAfmeting: { h:'Afm', },
    partDiameter: { h:'Diameter', },
    partGaten: { h:'Gaten', },
    partLengte: { h:'Lengte', },
    partGrofte: { h:'Grofte', },
    partMaat: { h:'Maat', },
    partKleur: { h:'Kleur', },
    partOpening: { h:'Opening', },
    partSds: { h:'Sds', },
    partTds: { h:'Tds', },
    partCode: { h:'Code', },
    partDescription: { h:'Oms', },
    partVosPerEenh: { h:'VOS', },
    partContent: { h:'PI', },
    partContentUnit: { h:'PIPE', },

    stelling: { h:'Stel', calc: 1, t:'n',},
    vak: { h:'Vak', calc: 1, t:'n',},
    schap: { h:'Schap', calc: 1, t:'n',},

    verzending: { h:'Verzending', },
    ean: { h:'EAN', },
    supplier: { h:'Leverancier', },
    orderCode: { h:'OrderCode', },
    minVoorraad: { h:'MV', t:'n',z:'0', },
    stock: { h:'VR', t:'n',z:'0', },
    minBestelAantal: { h:'MBA', t:'n', z:'0', },
    bestelAantal: { h:'BA', t:'n',z:'0', },
    storageLocation: { },
  }

  async function artlist(title, colnames, filter, sortby){
    // ws_data = data;
    ws_title = title;
    ws_cols = colnames.filter(n => cols[n].h).map(n=>cols[n]).map(c => Object({ wch: c.wch || 8}));
    console.log(ws_cols);
    // wscols =
    //   {wch:80},
    // ];

    console.log(colnames);
    const [rows] = await $().url('https://aliconnect.nl/api/abis/data').query({
      request_type: 'artlist',
      top: 200,
      filter: filter,
      select: colnames.filter(n => cols[n] && !cols[n].calc).join(','),
    }).get().then(e => e.body);
    const productlist = [
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Hoofdbescherming', exp: /\b(Hoofdbescherming)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Lashandschoen', exp: /\b(Lashandschoen)\b/i, },

      { toepassing: 'Lassen', name: 'Lasdeken', exp: /\b(Lasdeken)\b/i, },
      { toepassing: 'Lassen', name: 'Laskap', exp: /\b(Laskap)\b/i, },
      { toepassing: 'Lassen', name: 'Lasspatdeken', exp: /\b(Lasspatdeken)\b/i, },

      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Helmschaal', exp: /\b(Helmschaal)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Helmschaalscharnierring', exp: /\b(Helmschaalscharnierring)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Beschermruit', exp: /\b(Beschermruit)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Vizierhelm', exp: /\b(Vizierhelm)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Hoofdkap', exp: /\b(Hoofdkap)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Luchtstroomdeflector', exp: /\b(Luchtstroomdeflector)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Veiligheidshelm', exp: /\b(Veiligheidshelm)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Lashelm', exp: /\b(Lashelm)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Kleding', name: 'Helm', exp: /\b(Helm)\b/i, },

      { toepassing: 'Lassen', name: 'Lasstaafjes', exp: /\b(Lasstaafjes)\b/i, },
      { toepassing: 'Lassen', name: 'Lasfilterhouder', exp: /\b(Lasfilterhouder)\b/i, },
      { toepassing: 'Lassen', name: 'Glasreiniger', exp: /\b(Glasreiniger)\b/i, },

      { toepassing: 'Lassen', productgroep: 'Bescherming', name: 'Lasrookmasker', exp: /\b(Lasrookmasker)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Bescherming', name: 'Oordoppen', exp: /\b(Oordoppen)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Bescherming', name: 'Keel- en oorbescherming', exp: /\b(Keel- en oorbescherming)\b/i, },
      { toepassing: 'Lassen', productgroep: 'Bescherming', name: 'Stofmasker', exp: /\b(Stofmasker)\b/i, },

      { toepassing: 'Plamuren', productgroep: 'Matten', name: 'Glasvezelmat', exp: /\b(glasvezelmat)\b/i, },




      { toepassing: 'Schuren', name: 'Klitteband Schuurschijf', exp: /(klitteb. schuursch.)/i },
      { toepassing: 'Schuren', name: 'Schuurblok', exp: /\b(Schuurblok|Schuurblokje)\b/i },
      { toepassing: 'Schuren', name: 'Schuurschijf', exp: /\b(schuursch\.|schuurschijf|schuurschijven)\b/i },
      { toepassing: 'Schuren', name: 'Schuurrol', exp: /\b(Schuurrol)\b/i },
      { toepassing: 'Schuren', name: 'Schuurdoek', exp: /\b(Schuurdoekje|Schuurdoek)\b/i },
      { toepassing: 'Schuren', name: 'Schuurblad', exp: /\b(Schuurbladen|Schuurblad)\b/i },
      { toepassing: 'Schuren', name: 'Schuurpad', exp: /\b(Schuurpad)\b/i },
      { toepassing: 'Schuren', name: 'Schuurkurk', exp: /\b(Schuurkurk)\b/i },
      { toepassing: 'Schuren', name: 'Schuurpapier', exp: /(Schuurpapier|Schuurpap\.)/i },
      { toepassing: 'Schuren', name: 'Schuurvel', exp: /\b(Schuurvel|Schuurvellen)/i },
      { toepassing: 'Schuren', name: 'Schuurstrook', exp: /\b(Schuurstrook|Schuurstroken)\b/i },
      { toepassing: 'Schuren', name: 'Schuurband', exp: /\b(Schuurband)\b/i },
      { toepassing: 'Schuren', name: 'Schuurvijl', exp: /\b(Schuurvijl)\b/i, },
      { toepassing: 'Schuren', productgroep: 'Machines', name: 'Arm', exp: /\b(Arm)\b/i, },
      { toepassing: 'Schuren', productgroep: 'Machines', name: 'Schuurmachine', exp: /\b(Schuurmachine)\b/i, },
      { toepassing: 'Schuren', productgroep: 'Machines', name: 'Bandschuurmachine', exp: /\b(Bandschuurmachine)\b/i, },
      { toepassing: 'Schuren', productgroep: 'Machines', name: 'Vlakschuurmachine', exp: /\b(Vlakschuurmachine)\b/i, },
      { toepassing: 'Schuren', productgroep: 'Machines', name: 'Excenterschuurmachine', exp: /\b(Excenterschuurmachine)\b/i, },

      { toepassing: 'Plamuren', productgroep: 'Gereedschap', name: 'Plamuurmes', exp: /\b(Plamuurmes)\b/i, },
      { toepassing: 'Plamuren', productgroep: 'Gereedschap', name: 'Plamuurrubber', exp: /\b(Plamuurrubber)\b/i, },
      { toepassing: 'Plamuren', productgroep: 'Gereedschap', name: 'Plamuurspatel', exp: /\b(Plamuurspatel)\b/i, },

      { toepassing: 'Plamuren', productgroep: 'Plamuur', name: 'Polyester plamuur', exp: /\b(Polyester plamuur)\b/i, },
      { toepassing: 'Plamuren', productgroep: 'Plamuur', name: 'Spuitplamuur', exp: /\b(Spuitplamuur)\b/i, },
      { toepassing: 'Plamuren', productgroep: 'Plamuur', name: 'Metaalplamuur', exp: /\b(Metaalplamuur)\b/i, },
      { toepassing: 'Plamuren', productgroep: 'Plamuur', name: 'Acrylaatplamuur', exp: /\b(Acrylaatplamuur)\b/i, },
      { toepassing: 'Plamuren', productgroep: 'Plamuur', name: 'Glasvezelplamuur', exp: /\b(Glasvezelplamuur)\b/i, },
      { toepassing: 'Plamuren', productgroep: 'Plamuur', name: 'Fijnplamuur', exp: /\b(Fijnplamuur)\b/i, },
      { toepassing: 'Plamuren', productgroep: 'Plamuur', name: 'Plamuur', exp: /\b(Plamuur)\b/i, },

      { toepassing: 'Diversen', name: 'Steunschijf', exp: /\b(Steunschijf)\b/i, },

      { toepassing: 'Diversen', productgroep: 'Matten', name: 'Neerlegmat', exp: /\b(Neerlegmat)\b/i, },
      { toepassing: 'Diversen', productgroep: 'Matten', name: 'Voetmat', exp: /\b(Voetmat|Voetmatten)\b/i, },
      { toepassing: 'Diversen', productgroep: 'Matten', name: 'Entreemat', exp: /\b(Entreematten|Entreemat)\b/i, },

      { toepassing: 'Kitten', name: 'Carrosseriekit', exp: /\b(Carrosseriekit)\b/i, },

      { toepassing: 'Diversen', name: 'Spray', exp: /\b(Spray)\b/i, },
      // { toepassing: 'Diversen', name: 'Vormbare Tape', exp: /\b(Vormbare Tape)\b/i, },
      { toepassing: 'Diversen', name: 'Epoxylijm', exp: /\b(Epoxylijm)\b/i, },

      { toepassing: 'Diversen', name: 'Veiligheidsbril', exp: /\b(Veiligheidsbril|Veiligheidsbrillen)\b/i, },

      { toepassing: 'Diversen', name: 'Coating', exp: /\b(Coating)\b/i, },
      { toepassing: 'Diversen', name: 'Stootpet', exp: /\b(Stootpet)\b/i, },
      { toepassing: 'Diversen', name: 'Haak', exp: /\b(Haak)\b/i, },
      { toepassing: 'Diversen', name: 'Lamellenborstel', exp: /\b(Lamellenborstel)\b/i, },
      { toepassing: 'Diversen', name: 'Ontbraamwiel', exp: /\b(Ontbraamwiel)\b/i, },
      { toepassing: 'Diversen', name: 'Wielspray', exp: /\b(Wielspray)\b/i, },


      { toepassing: 'Diversen', name: 'Ademslang', exp: /\b(Ademslang)\b/i, },

      { toepassing: 'Diversen', name: 'Acculader', exp: /\b(Acculader)\b/i, },
      { toepassing: 'Diversen', name: 'Acculaadstation', exp: /\b(Acculaadstation)\b/i, },
      { toepassing: 'Diversen', name: 'Batterij', exp: /\b(Batterij)\b/i, },

      { toepassing: 'Kleding', name: 'Bretels', exp: /\b(Bretels)\b/i, },

      { toepassing: 'Diversen', name: 'Afsluitdeksel', exp: /\b(Afsluitdeksel)\b/i, },

      { toepassing: 'Filter', name: 'Standaardfilter', exp: /\b(Standaardfilter)\b/i, },
      { toepassing: 'Filter', name: 'Hoofdfilter', exp: /\b(Hoofdfilter)\b/i, },
      { toepassing: 'Filter', name: 'Geurfilter', exp: /\b(Geurfilter)\b/i, },
      { toepassing: 'Filter', name: 'Gasfilter', exp: /\b(Gasfilter)\b/i, },
      { toepassing: 'Filter', name: 'Deeltjesfilter', exp: /\b(Deeltjesfilter)\b/i, },
      { toepassing: 'Filter', name: 'Voorfilter', exp: /\b(Voorfilter)\b/i, },
      { toepassing: 'Filter', name: 'Combifilter', exp: /\b(Combifilter)\b/i, },
      { toepassing: 'Filter', name: 'Gas, damp en stoffilter', exp: /(Gas(-|)(,|)(\s|)damp(-|)(\s|)en stoffilter)/i, },
      { toepassing: 'Filter', name: 'Gas en dampfilter', exp: /\b(Gas(-|)(\s|)en dampfilter)\b/i, },
      { toepassing: 'Filter', name: 'Filterzak', exp: /\b(Filterzak|Filterzakken)\b/i, },
      { toepassing: 'Filter', name: 'Vloerfilter', exp: /\b(Vloerfilter)\b/i, },
      { toepassing: 'Filter', name: 'Plafondfilter', exp: /\b(Plafondfilter)\b/i, },
      { toepassing: 'Filter', name: 'Aanzuigfilter', exp: /\b(Aanzuigfilter)\b/i, },
      { toepassing: 'Filter', name: 'Lasfilter', exp: /\b(Lasfilter)\b/i, },
      { toepassing: 'Filter', name: 'Filtersysteem', exp: /\b(Filtersysteem)\b/i, },

      { toepassing: 'Filter', name: 'Filter', exp: /\b(Filter)\b/i, },

      { toepassing: 'Slijpen', name: 'Netschijf', exp: /\b(Netschijf|Netschijven)\b/i },
      { toepassing: 'Slijpen', name: 'Netstrook', exp: /\b(Netstrook|Netstroken)\b/i },

      { toepassing: 'Slijpen', name: 'Doorslijpschijf', exp: /\b(Doorslijpschijf|Doorslijpschijven)\b/i },

      { toepassing: 'Maskeren', name: 'Maskeerpapier', exp: /\b(Maskeerpapier)\b/i, },
      { toepassing: 'Maskeren', name: 'Maskeerfolie', exp: /\b(Maskeerfolie)\b/i, },
      { toepassing: 'Maskeren', name: 'Maskeertape', exp: /\b(Maskeertape|Maskeer tape)\b/i, },
      { toepassing: 'Maskeren', name: 'Maskeerfilm', exp: /\b(Maskeerfilm)\b/i, },

      { toepassing: 'Maskeren', name: 'Montagetape', exp: /\b(Montagetape)\b/i, },



      { toepassing: 'Tapen', name: 'Dubbelzijdig tape', exp: /\b(dubbelz. tape)\b/i },
      { toepassing: 'Tapen', name: 'Afplaktape', exp: /\b(Afplaktape)\b/i },
      { toepassing: 'Tapen', name: 'Afdichtingstape', exp: /\b(Afdichtingstape)\b/i, },
      { toepassing: 'Tapen', name: 'Dozensluittape', exp: /\b(Dozensluittape)\b/i, },
      { toepassing: 'Tapen', name: 'Isolatietape', exp: /\b(isolatietape)\b/i, },
      { toepassing: 'Tapen', name: 'Anti-Sliptape', exp: /\b(Anti-Sliptape)\b/i, },
      { toepassing: 'Tapen', name: 'Schuimtape', exp: /\b(Schuimtape)\b/i, },
      { toepassing: 'Tapen', name: 'Electrical Tape', exp: /\b(Electrical Tape)\b/i, },
      { toepassing: 'Tapen', name: 'Tape', exp: /\b(Tape)\b/i, },


      { toepassing: 'Mengen', name: 'Verpakkingsemmer', exp: /\b(Verpakkingsemmer)\b/i, },
      { toepassing: 'Mengen', name: 'Filterdeksel', exp: /\b(Filterdeksel)\b/i, },

      { toepassing: 'Mengen', name: 'Bewaarbeker', exp: /\b(Bewaarbeker)\b/i, },
      { toepassing: 'Mengen', name: 'Schakelaar', exp: /\b(Schakelaar)\b/i, },
      { toepassing: 'Mengen', name: 'Dispenser', exp: /\b(Dispenser)\b/i, },
      { toepassing: 'Mengen', name: 'Deksel', exp: /\b(Deksel|Deksels)\b/i, },

      { toepassing: 'Mengen', name: 'Mengbeker', exp: /\b(Mengbeker|Mengbekers)\b/i, },
      { toepassing: 'Mengen', name: 'Bovenbeker', exp: /\b(Bovenbeker)\b/i, },
      { toepassing: 'Mengen', name: 'Onderbeker', exp: /\b(Onderbeker)\b/i, },
      { toepassing: 'Mengen', name: 'Mengset', exp: /\b(Mengset)\b/i, },
      { toepassing: 'Mengen', name: 'Mengneus', exp: /\b(Mengneus)\b/i, },
      { toepassing: 'Mengen', name: 'Mengmondstuk', exp: /\b(Mengmondstuk)\b/i, },

      { name: 'Starterset', exp: /\b(Starterset)\b/i, },

      { toepassing: 'Lakken', name: 'Primer', exp: /\b(Primer)\b/i, },


      { toepassing: 'Lakken', name: 'Lakschaaf', exp: /\b(Lakschaaf|Lakschaafje)\b/i, },
      { toepassing: 'Lakken', name: 'Verfzeef', exp: /\b(Verfzeefjes|Verfzeefje)\b/i },
      { toepassing: 'Lakken', name: 'Roerlat', exp: /\b(Roerlatten|Roerlat)\b/i, },
      { toepassing: 'Lakken', name: 'Verfborstel', exp: /\b(Verfborstel)\b/i, },

      { toepassing: 'Lakken', name: 'Kleefband', exp: /\b(kleefband)\b/i, },
      { toepassing: 'Lakken', name: 'Kleefdoek', exp: /\b(Kleefdoeken|Kleefdoek)\b/i, },

      { toepassing: 'Polieren', name: 'Poliermachine', exp: /\b(Poliermachine)\b/i, },
      { toepassing: 'Polieren', name: 'Polierpad', exp: /\b(Polierpad)\b/i, },
      { toepassing: 'Polieren', name: 'Polierspons', exp: /\b(Polierspons)\b/i, },

      { toepassing: 'Spuiten', name: 'Spuitmasker', exp: /\b(Spuitmasker)\b/i, },
      { toepassing: 'Spuiten', name: 'Spuitmond', exp: /\b(Spuitmond)\b/i, },
      { toepassing: 'Spuiten', name: 'Spuitnozzle', exp: /\b(Spuitnozzles|Spuitnozzle)\b/i, },
      { toepassing: 'Spuiten', name: 'Spuitpistool kit', exp: /\b(Spuitpistoolkit|Spuitpistolen kit|Spuitpistolenkit)\b/i, },
      { toepassing: 'Spuiten', name: 'Spuitpistool', exp: /\b(Spuitpistool)\b/i, },
      { toepassing: 'Spuiten', name: 'Wielspuithoes', exp: /\b(Wielspuithoes|Wielspuithoezen)\b/i, },
      { toepassing: 'Spuiten', name: 'Verfspuitmasker', exp: /\b(Verfspuitmasker|Verfspuitmaskers)\b/i, },
      { toepassing: 'Spuiten', name: 'Spuitjas', exp: /\b(Spuitjas)\b/i, },
      { toepassing: 'Spuiten', name: 'Spuitoverall', exp: /\b(Spuitoverall)\b/i, },
      { toepassing: 'Spuiten', name: 'Pistool', exp: /\b(Pistool|Pistole)\b/i, },
      { toepassing: 'Spuiten', name: 'Adaptor', exp: /\b(Adaptor|Adapter)\b/i, },

      { toepassing: 'Bescherming', name: 'Mondmasker', exp: /\b(Mondmasker)\b/i, },
      { toepassing: 'Bescherming', name: 'Veiligheidsbril', exp: /\b(Veiligheidsbril)\b/i, },

      { toepassing: 'Kleding', name: 'Handschoen', exp: /\b(Handschoenen|Handschoen)\b/i, },
      { toepassing: 'Kleding', name: 'Handschoen wegwerp', exp: /\b(wegwerphandschoenen|wegwerphandschoen)\b/i, },
      { toepassing: 'Kleding', name: 'Veiligheidsschoen', exp: /\b(Veiligheidsschoen)\b/i, },
      { toepassing: 'Kleding', name: 'Polo', exp: /\b(Polo)\b/i, },
      { toepassing: 'Kleding', name: 'Wegwerpoverall', exp: /\b(Wegwerpoverall)\b/i, },
      { toepassing: 'Kleding', name: 'Overall', exp: /\b(Overall)\b/i, },
      { toepassing: 'Kleding', name: 'Stofjas', exp: /\b(Stofjas)\b/i, },
      { toepassing: 'Kleding', name: 'Protectjas', exp: /\b(Protectjas|Protect jas)\b/i, },
      { toepassing: 'Kleding', name: 'Lab-, bezoekersjas', exp: /\b(Lab- \/ bezoekersjas)\b/i, },
      { toepassing: 'Kleding', name: 'Riem', exp: /\b(Riem)\b/i, },

      { toepassing: 'Reiniging', name: 'Handreiniger', exp: /\b(Handreiniger)\b/i, },

      { name: 'Reparatie', exp: /\b(Reparatieset|Reparaturset)\b/i, },
      { name: 'Reparatie', exp: /\b(Kunststofreparatiemateriaal)\b/i, },



      { toepassing: 'Kitten', name: 'Kit', exp: /\b(Kit)\b/i, },
    ];
    ws_data = rows.map(row => {
      function match(name, exp, exp2){
        const match = row.title.match(exp);
        if (match) {
          // filter[name] = { name: name, title: name, values: {}};
          // cols.push({ name: name, title: name, })
          // console.log(name)
          // console.log(row.title)
          // row.title = row.title.replace(exp,'').replace(/\s-|\(\)|-$/,'').replace(/\s\s/,' ').trim();

          // console.log(match[1]);
          row['part'+name] = (match[1] || match[0])
          .replace(/,/g, '.')
          .replace(/\.$/, '')
          .replace(exp2, '')
          .trim()
          .toLowerCase()
          .replace(/\w/, s => s.toUpperCase());
          // console.log(match)
        }
      }

      row.title = row.title.replace(/\r|\n/g,'');
      const product = productlist.find(p => row.title.match(p.exp) );
      if (product) {
        row.title = product.name + ', ' + row.title.replace(product.exp, '');
        row.product = product.name;
        row.toepassing = product.toepassing;
        row.categorie = product.categorie || row.artGroup;
      }

      match('Gaten', /(\d+)\s*?(gaten\s\d+mm|gaten|gat|gaat)/i);
      // match('Merk', /(3M)/);
      // match('Merk', /(3M)/);
      match('Serie', /Aquamax|Deltron|Hookit/i);
      match('Kleur', /\b(roos|oranje|orange|red oxyde|red|black|blue phtalo|green phtalo|bright red|chrome yellow|cold yellow|dark rose|extra fine aluminium|fine aluminium|donker antraciet|antraciet|donkergrijs|lichtgrijs|donker grijs|licht grijs|blauw|geel|groen|grijs|wit|geel|zwart|bruin|rood)\b/i);
      match('Inhoud', /([\d|\.|,]+\s*?(ml|ltr|l|gr\.|gr|kg\.|kg|paar|g)\b)/i);
      match('Maat', /(\b(mt\.:|mt:|maat:|maat)(\s+?)(\d+|[A-Z]+))/i, /mt\.:|mt:|maat:|maat|\s/);
      match('Spanning', /(\d+(V))\b/i);
      match('Vermogen', /(\d+(W))\b/i);
      match('Dichtheid', /(\d+\s*?(g\/m²))/i);
      match('Hittebestendig', /(\d+°)/);
      match('Schroefdraad', /(M\d+\s*?x[\d|,]+)/i);
      match('Dikte', /(\d+\s*?(µm|mµ|µ))/i);
      match('Diameter', /Ø((\s|)(\d[\d|\.|,]+)(\s|)(mm|))/i);
      match('Afmeting', /[^-]\b(\d+(\.\d+|,\d+|[\/|\d]+)(\s|)(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|µ|m|)(\s|)(x|)(\s|)([\d|\.|,|\/]+|)(\s|)(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|µ|m|)(\s|)(x|)(\s|)([\d|\.|,|\/]+|)(\s|)(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|µ|m)\b)/i);
      match('Gaten', /(\d+)\s*?(gaten\s\d+mm|gaten|gat|gaat)/i);
      match('Maat', /\b(M|L|S|XL|XXL|Large|Medium|Small|XLarge|XXLarge)\b/);
      match('Grofte', /(P\d+)/i);
      match('Grofte', /((grofte|korrel)\s*?\d+)/i, /grofte|korrel|\s/);
      match('RAL', /ral\s*?(\d+)/i);
      match('Aantal', /([\d|\.|,|x|\s]+?(st\.|st\b))/i);

      ['Aantal','Inhoud','Dikte','Diameter','Afmeting'].forEach(name => {
        if (row[name]) {
          options[name] = row[name] = row[name].toLowerCase().replace(/([\d|\.|\/]+)/, ' $1 ').replace(/x/, ' x ').replace(/\s\s/, ' ').replace(/µm|mµ|µ/, 'µm')
        }
      })
      if (row.storageLocation) {
        [row.stelling,row.vak,row.schap] = ((row.storageLocation||'          ').match(/../g)||[]).slice(1);
      }
      if (row.inkPackPrice) {
        row.purchaseListPrice = row.inkPackPrice;
      }
      if (row.purchaseDiscount) {
        row.discount = row.purchaseDiscount * 0.1;
      } else {
        row.listPrice = row.purchaseListPrice * 2.5;
        row.discount = 2;
      }
      row.price = row.listPrice * (100 - row.discount) / 100;
      row.vatPrice = row.price * 1.21;
      return colnames.filter(n => cols[n].h).map(n => {
        if (n==='partSds') return {
          f: `=HYPERLINK("${row.partSds}","SDS")`,
          v: 'SDS',
        }
        return Object.assign({ v:row[n] || '' }, cols[n]);
      });
    });
    const index = colnames.filter(n => cols[n].h).indexOf(sortby);
    ws_data.sort((a,b) => (a[index].v||'').localeCompare((b[index].v||'')));

    console.log(ws_data);

    ws_data.unshift(colnames.filter(n => cols[n].h).map(n => Object({v:cols[n].h})));
    console.log('updated', ws_data);
    $('.list').text('').append(
      ws_data.map(row => $('tr').append(
        row.map(
          v => $('td').align(v && v.t === 'n' ? 'right' : 'left').text(v && v.v && v.t === 'n' ? num(v.v, v.z ? String(v.z.match(/0/g)).length-1 : 2) : v.v || '')
        ),
      )),
    );
  }
  $(document.body).append(
    $('nav').append(
      $('button').text('Hazard').on('click', async e => {
        artlist(
          'Hazardlijst', [
            'id',
            'title',
            'storageLocation',
            'stelling',
            'partContent',
            'partContentUnit',
            'partVosPerEenh',
            'stock',
            'stelling',
            'partSds',
          ],
          // `partVosPerEenh>0`,
          `partSds is not null`,
          'title',
        );
      }),
      $('button').text('Prijslijst').on('click', async e => {
        artlist('Prijslijst', [
          'id',
          'title',
          'listPrice',
          'discount',
          'price',
          'vatPrice',
          // 'storageLocation',
          'inkPackPrice',
          'purchaseListPrice',
          'purchaseDiscount',
          //
          // 'ean',
          // 'verzending',
          // 'partArtNr',
          // 'partCode',
          // 'partVosPerEenh',
          // 'partBrand',
          // 'categorie',
          // 'title',
          // 'discount',
          // 'purchaseDiscount',
          // 'inkPackPrice',
          // 'purchaseListPrice',
          // 'storageLocation',
          // 'supplier',
          // 'orderCode',
          //
          // 'stelling',
          // 'vak',
          // 'schap',
          // 'minVoorraad',
          // 'minBestelAantal',
          // 'stock',
          // 'bestelAantal',
          //
          // 'partDescription',
          // 'partSerie',
          // 'partAfmeting',
          // 'partDiameter',
          // 'partGaten',
          // 'partLengte',
          // 'partGrofte',
          // 'partMaat',
          // 'partKleur',
          // 'partOpening',
          // 'partSds',
          // 'partTds'
        ], `title like '%gaten%'`, 'title');
        // ]);
      }),
      $('button').text('Inkoop').on('click', async e => {
        artlist('Inkooplijst', [
          'id',
          'title',
          'inkPackPrice',
          'purchaseListPrice',
          'purchaseDiscount',

          'supplier',
          'orderCode',

          'stock',
          'minVoorraad',
          'minBestelAantal',
          'bestelAantal',
          //
          // 'ean',
          // 'verzending',
          // 'partArtNr',
          // 'partCode',
          // 'partVosPerEenh',
          // 'partBrand',
          // 'categorie',
          // 'title',
          // 'discount',
          // 'purchaseDiscount',
          // 'inkPackPrice',
          // 'purchaseListPrice',
          // 'storageLocation',
          //
          // 'stelling',
          // 'vak',
          // 'schap',
          //
          // 'partDescription',
          // 'partSerie',
          // 'partAfmeting',
          // 'partDiameter',
          // 'partGaten',
          // 'partLengte',
          // 'partGrofte',
          // 'partMaat',
          // 'partKleur',
          // 'partOpening',
          // 'partTds'
        ], `minVoorraad > 0`, 'supplier');
        // ]);
      }),
      $('button').text('Excel').on('click', e => toExcel(ws_title, ws_data))
    ),
    $('table').class('list'),
  )
});
