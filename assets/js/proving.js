aim.libraries.init = () => {
  // console.log('JA');
  let clientName;

  aim.config.navleft = {
    'Shop': {
      Winkelmandje() {
        aim.list('salesorderrow',{$filter: `clientName EQ '${clientName}' and isOrder EQ 0`});
      },
      Boodschappenlijst() {
        aim.list('clientart',{$filter: `clientName EQ '${clientName}'`});
      },
      Proving(){
        aim.list('clientart',{$filter: `clientName EQ NULL`});
      },
      // Alles(){
      //   aim.list('article');
      // },
    },
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
    const transportOptions = [
      { title: 'Niet ingevuld', style: 'background-color:red;color:yellow;', },
      { title: 'Post', style: 'background-color:orange;', },
      { title: 'Visser', style: 'background-color:lightblue;', },
      { title: 'Route', style: 'background-color:lightgreen;', },
      { title: 'Afhalen', style: 'background-color:#ccc;', },
      { title: 'Brengen', style: 'background-color:green;color:white;', },
    ];

    const rijen = [
      {
        nr: 1,
        racks: [
          { nr: 1, code: 'in', shelfs: 6 },
          { nr: 2, code: 'im', shelfs: 6 },
          { nr: 3, code: 'il', shelfs: 6 },
          { nr: 4, code: 'ik', shelfs: 6 },
          { nr: 5, code: 'ij', shelfs: 6 },
          { nr: 6, code: 'ii', shelfs: 6 },
          { nr: 7, code: 'ih', shelfs: 6 },
          { nr: 8, code: 'ig', shelfs: 6 },
          { nr: 9, code: 'if', shelfs: 6 },
          { nr: 10, code: 'ie', shelfs: 6 },
          { nr: 11, code: 'id', shelfs: 6 },
          { nr: 12, code: 'ic', shelfs: 6 },
          { nr: 13, code: 'ib', shelfs: 6 },
          { nr: 14, code: 'ia', shelfs: 6 },
        ]
      },
      {
        nr: 2,
        racks: [
          { nr: 1, code: 'ja', shelfs: 6 },
          { nr: 2, code: 'jb', shelfs: 6 },
          { nr: 3, code: 'jc', shelfs: 6 },
          { nr: 4, code: 'jd', shelfs: 6 },
          { nr: 5, code: 'je', shelfs: 6 },
          { nr: 6, code: 'jf', shelfs: 6 },
          { nr: 7, code: 'jg', shelfs: 6 },
          { nr: 8, code: 'jh', shelfs: 6 },
          { nr: 9, code: 'ji', shelfs: 6 },
          { nr: 10, code: 'jj', shelfs: 6 },
          { nr: 11, code: 'jk', shelfs: 6 },
          { nr: 12, code: 'jl', shelfs: 6 },
          { nr: 13, code: 'jm', shelfs: 6 },
          { nr: 14, code: 'jn', shelfs: 6 },
        ]
      },
      {
        nr: 3,
        racks: [
          { nr: 1, code: 'kn', shelfs: 6 },
          { nr: 2, code: 'km', shelfs: 6 },
          { nr: 3, code: 'kl', shelfs: 6 },
          { nr: 4, code: 'kk', shelfs: 6 },
          { nr: 5, code: 'kj', shelfs: 6 },
          { nr: 6, code: 'ki', shelfs: 6 },
          { nr: 7, code: 'kh', shelfs: 6 },
          { nr: 8, code: 'kg', shelfs: 6 },
          { nr: 9, code: 'kf', shelfs: 6 },
          { nr: 10, code: 'ke', shelfs: 6 },
          { nr: 11, code: 'kd', shelfs: 6 },
          { nr: 12, code: 'kc', shelfs: 6 },
          { nr: 13, code: 'kb', shelfs: 6 },
          { nr: 14, code: 'ka', shelfs: 6 },
        ]
      },
      {
        nr: 4,
        racks: [
          { nr: 1, code: 'la', shelfs: 6 },
          { nr: 2, code: 'lb', shelfs: 6 },
          { nr: 3, code: 'lc', shelfs: 6 },
          { nr: 4, code: 'ld', shelfs: 6 },
          { nr: 5, code: 'le', shelfs: 6 },
          { nr: 6, code: 'lf', shelfs: 6 },
          { nr: 7, code: 'lg', shelfs: 6 },
          { nr: 8, code: 'lh', shelfs: 6 },
          { nr: 9, code: 'li', shelfs: 6 },
          { nr: 10, code: 'lj', shelfs: 6 },
          { nr: 11, code: 'lk', shelfs: 6 },
          { nr: 12, code: 'll', shelfs: 6 },
          { nr: 13, code: 'lm', shelfs: 6 },
          { nr: 14, code: 'ln', shelfs: 6 },
        ]
      },
      {
        nr: 5,
        racks: [
          { nr: 1, code: 'mn', shelfs: 6 },
          { nr: 2, code: 'mm', shelfs: 6 },
          { nr: 3, code: 'ml', shelfs: 6 },
          { nr: 4, code: 'mk', shelfs: 6 },
          { nr: 5, code: 'mj', shelfs: 6 },
          { nr: 6, code: 'mi', shelfs: 6 },
          { nr: 7, code: 'mh', shelfs: 6 },
          { nr: 8, code: 'mg', shelfs: 6 },
          { nr: 9, code: 'mf', shelfs: 6 },
          { nr: 10, code: 'me', shelfs: 6 },
          { nr: 11, code: 'md', shelfs: 6 },
          { nr: 12, code: 'mc', shelfs: 6 },
          { nr: 13, code: 'mb', shelfs: 6 },
          { nr: 14, code: 'ma', shelfs: 6 },
        ]
      },
      {
        nr: 6,
        racks: [
          { nr: 1, code: 'na', shelfs: 6 },
          { nr: 2, code: 'nb', shelfs: 6 },
          { nr: 3, code: 'nc', shelfs: 6 },
          { nr: 4, code: 'nd', shelfs: 6 },
          { nr: 5, code: 'ne', shelfs: 6 },
          { nr: 6, code: 'nf', shelfs: 6 },
          { nr: 7, code: 'ng', shelfs: 6 },
          { nr: 8, code: 'nh', shelfs: 6 },
          { nr: 9, code: 'ni', shelfs: 6 },
          { nr: 10, code: 'nj', shelfs: 6 },
          { nr: 11, code: 'nk', shelfs: 6 },
          { nr: 12, code: 'nl', shelfs: 6 },
          { nr: 13, code: 'nm', shelfs: 6 },
          { nr: 14, code: 'nn', shelfs: 6 },
        ]
      },
      {
        nr: 7,
        racks: [
          { nr: 1, code: 'oa', shelfs: 1 },
          { nr: 2, code: 'ob', shelfs: 1 },
          { nr: 3, code: 'oc', shelfs: 2 },
          { nr: 4, code: 'od', shelfs: 4 },
          { nr: 5, code: 'oe', shelfs: 5 },
          { nr: 6, code: 'of', shelfs: 5 },
          { nr: 7, code: 'og', shelfs: 5 },
          { nr: 8, code: '', shelfs: 1 },
          { nr: 9, code: '', shelfs: 1 },
          { nr: 10, code: '', shelfs: 1 },
          { nr: 11, code: '', shelfs: 1 },
        ]
      },
      {
        nr: 8,
        racks: [
          { nr: 1, code: '', shelfs: 1 },
          { nr: 2, code: '', shelfs: 1 },
          { nr: 3, code: '', shelfs: 1 },
          { nr: 4, code: '', shelfs: 1 },
          { nr: 5, code: '', shelfs: 1 },
          { nr: 6, code: '', shelfs: 1 },
          { nr: 7, code: '', shelfs: 1 },
          { nr: 8, code: '', shelfs: 1 },
          { nr: 9, code: '', shelfs: 1 },
          { nr: 10, code: '', shelfs: 1 },
          { nr: 11, code: '', shelfs: 1 },
        ]
      },
      {
        nr: 9,
        racks: [
          { nr: 1, code: 'hj', shelfs: 3 },
          { nr: 2, code: '', shelfs: 3 },
          { nr: 3, code: '', shelfs: 3 },
          { nr: 4, code: 'hi', shelfs: 3 },
          { nr: 5, code: '', shelfs: 3 },
          { nr: 6, code: '', shelfs: 3 },
          { nr: 7, code: 'hg', shelfs: 3 },
          { nr: 8, code: '', shelfs: 3 },
          { nr: 9, code: '', shelfs: 3 },
          { nr: 10, code: 'hf', shelfs: 3 },
          { nr: 11, code: '', shelfs: 3 },
          { nr: 12, code: '', shelfs: 3 },
        ]
      },
      {
        nr: 10,
        racks: [
          { nr: 1, code: 'he', shelfs: 3 },
          { nr: 2, code: '', shelfs: 3 },
          { nr: 3, code: '', shelfs: 3 },
          { nr: 4, code: 'hd', shelfs: 3 },
          { nr: 5, code: '', shelfs: 3 },
          { nr: 6, code: '', shelfs: 3 },
          { nr: 7, code: 'hc', shelfs: 3 },
          { nr: 8, code: '', shelfs: 3 },
          { nr: 9, code: '', shelfs: 3 },
          { nr: 10, code: 'hb', shelfs: 3 },
          { nr: 11, code: '', shelfs: 3 },
          { nr: 12, code: '', shelfs: 3 },
          { nr: 13, code: 'ha', shelfs: 3 },
          { nr: 14, code: '', shelfs: 3 },
          { nr: 15, code: '', shelfs: 3 },
        ]
      },
      {
        nr: 11,
        racks: [
          { nr: 1, code: 'g1', shelfs: 3 },
          { nr: 2, code: 'ga', shelfs: 3 },
          { nr: 3, code: '', shelfs: 3 },
          { nr: 4, code: '', shelfs: 3 },
          { nr: 5, code: 'g2', shelfs: 3 },
          { nr: 6, code: 'gb', shelfs: 3 },
          { nr: 7, code: '', shelfs: 3 },
          { nr: 8, code: '', shelfs: 3 },
          { nr: 9, code: 'f1', shelfs: 3 },
          { nr: 10, code: 'fa', shelfs: 3 },
          { nr: 11, code: '', shelfs: 3 },
          { nr: 12, code: 'f2', shelfs: 3 },
          { nr: 13, code: 'fb', shelfs: 3 },
          { nr: 14, code: '', shelfs: 3 },
        ]
      },
      {
        nr: 12,
        racks: [
          { nr: 1, code: 'ea', shelfs: 5 },
          { nr: 2, code: 'eb', shelfs: 3 },
          { nr: 3, code: 'ec', shelfs: 4 },
          { nr: 4, code: 'ed', shelfs: 4 },
          { nr: 5, code: 'ee', shelfs: 4 },
          { nr: 6, code: 'ef', shelfs: 4 },
          { nr: 7, code: 'eg', shelfs: 4 },
          { nr: 8, code: '', shelfs: 4 },
          { nr: 9, code: '', shelfs: 4 },
          { nr: 10, code: '', shelfs: 4 },
          { nr: 11, code: 'ej', shelfs: 6 },
          { nr: 12, code: 'eh', shelfs: 7 },
          { nr: 13, code: 'ei', shelfs: 6 },
        ]
      },
      {
        nr: 13,
        racks: [
          { nr: 1, code: 'd1', shelfs: 3 },
          { nr: 2, code: 'da', shelfs: 4 },
        ]
      },
      {
        nr: 14,
        racks: [
          { nr: 1, code: 'd2', shelfs: 3 },
          { nr: 2, code: 'db', shelfs: 4 },
        ]
      },
      {
        nr: 15,
        racks: [
          { nr: 1, code: 'ca', shelfs: 6 },
          { nr: 2, code: 'cb', shelfs: 6 },
          { nr: 3, code: 'cc', shelfs: 6 },
          { nr: 4, code: 'cd', shelfs: 6 },
          { nr: 5, code: 'ce', shelfs: 6 },
          { nr: 6, code: 'cf', shelfs: 6 },
          { nr: 7, code: 'cg', shelfs: 6 },
          { nr: 8, code: 'ch', shelfs: 6 },
          { nr: 9, code: '', shelfs: 6 },
          { nr: 10, code: '', shelfs: 4 },
        ]
      },
      {
        nr: 16,
        racks: [
          { nr: 1, code: 'b', shelfs: 3 },
          { nr: 2, code: '', shelfs: 3 },
          { nr: 3, code: '', shelfs: 3 },
        ]
      },
      {
        nr: 17,
        racks: [
          { nr: 1, code: 'ad', shelfs: 6 },
          { nr: 2, code: 'ac', shelfs: 6 },
          { nr: 3, code: 'ab', shelfs: 6 },
          { nr: 4, code: 'aa', shelfs: 5 },
          { nr: 5, code: 'af', shelfs: 6 },
          { nr: 6, code: 'ae', shelfs: 6 },
          { nr: 7, code: 'ah', shelfs: 6 },
          { nr: 8, code: 'ag', shelfs: 6 },
          { nr: 9, code: 'aj', shelfs: 6 },
          { nr: 10, code: 'ai', shelfs: 6 },
          { nr: 11, code: 'al', shelfs: 6 },
          { nr: 12, code: 'ak', shelfs: 6 },
          { nr: 13, code: 'am', shelfs: 7 },
          { nr: 14, code: 'an', shelfs: 5 },
        ]
      },
      {
        nr: 18,
        racks: [
          { nr: 1, code: '', shelfs: 1 },
          { nr: 2, code: '', shelfs: 1 },
          { nr: 3, code: '', shelfs: 1 },
          { nr: 4, code: '', shelfs: 1 },
          { nr: 5, code: '', shelfs: 1 },
          { nr: 6, code: '', shelfs: 1 },
          { nr: 7, code: '', shelfs: 1 },
          { nr: 8, code: '', shelfs: 1 },
        ]
      },
      {
        nr: 19,
        racks: [
          { nr: 1, code: '', shelfs: 1 },
          { nr: 2, code: '', shelfs: 1 },
          { nr: 3, code: '', shelfs: 1 },
          { nr: 4, code: '', shelfs: 1 },
          { nr: 5, code: '', shelfs: 1 },
          { nr: 6, code: '', shelfs: 1 },
          { nr: 7, code: '', shelfs: 1 },
          { nr: 8, code: '', shelfs: 1 },
        ]
      },
      {
        nr: 20,
        racks: [
          { nr: 1, code: '', shelfs: 1 },
          { nr: 2, code: '', shelfs: 1 },
          { nr: 3, code: '', shelfs: 1 },
          { nr: 4, code: '', shelfs: 1 },
          { nr: 5, code: '', shelfs: 1 },
          { nr: 6, code: '', shelfs: 1 },
          { nr: 7, code: '', shelfs: 1 },
          { nr: 8, code: '', shelfs: 1 },
          { nr: 9, code: '', shelfs: 1 },
          { nr: 10, code: '', shelfs: 1 },
          { nr: 11, code: '', shelfs: 1 },
          { nr: 12, code: '', shelfs: 1 },
          { nr: 13, code: '', shelfs: 1 },
          { nr: 14, code: '', shelfs: 1 },
          { nr: 15, code: '', shelfs: 1 },
          { nr: 16, code: '', shelfs: 1 },
        ]
      },
    ];

    function locCode(loc){
      return loc
      .replace(/^I/, '1.')
      .replace(/^K/, '3.')
      .replace(/^M/, '5.')

      .replace(/\.A/, '.14.')
      .replace(/\.B/, '.13.')
      .replace(/\.C/, '.12.')
      .replace(/\.D/, '.11.')
      .replace(/\.E/, '.10.')
      .replace(/\.F/, '.9.')
      .replace(/\.G/, '.8.')
      .replace(/\.H/, '.7.')
      .replace(/\.I/, '.6.')
      .replace(/\.J/, '.5.')
      .replace(/\.K/, '.4.')
      .replace(/\.L/, '.3.')
      .replace(/\.M/, '.2.')
      .replace(/\.N/, '.1.')
      // .replace(/\.O/, '.0.')

      .replace(/^J/, '2.')
      .replace(/^L/, '4.')
      .replace(/^N/, '6.')
      // .replace(/^O/, '8.')
      // .replace(/^A/, '12.')
      // .replace(/^B/, '13.')
      .replace(/\.A/, '.1.')
      .replace(/\.B/, '.2.')
      .replace(/\.C/, '.3.')
      .replace(/\.D/, '.4.')
      .replace(/\.E/, '.5.')
      .replace(/\.F/, '.6.')
      .replace(/\.G/, '.7.')
      .replace(/\.H/, '.8.')
      .replace(/\.I/, '.9.')
      .replace(/\.J/, '.10.')
      .replace(/\.K/, '.11.')
      .replace(/\.L/, '.12.')
      .replace(/\.M/, '.13.')
      .replace(/\.N/, '.14.')
      // .replace(/\.O/, '.15.')
      //
      // .replace(/^CA/, '10.1.')
      // .replace(/^CB/, '10.2.')
      // .replace(/^CC/, '10.3.')
      // .replace(/^CD/, '10.4.')
      // .replace(/^CE/, '10.5.')
      // .replace(/^CF/, '10.6.')
      // .replace(/^CG/, '10.7.')
      // .replace(/^CH/, '10.8.')
      // .replace(/^C/, '10.1.')
      //
      // .replace(/^D2/, '10.9.')
      // .replace(/^D1/, '10.10.')
      // .replace(/^DA/, '10.11.')
      // .replace(/^DB/, '10.12.')
      //
      // .replace(/^E/, '10.4.')
      // .replace(/^F2/, '10.5.')
      // .replace(/^F1/, '10.6.')
      // .replace(/^G2/, '10.7.')
      // .replace(/^G1/, '10.8.')
      // .replace(/^HA/, '11.4.')
      // .replace(/^HB/, '11.3.')
      // .replace(/^HC/, '11.2.')
      // .replace(/^HD/, '11.1.')
      // .replace(/^HE/, '1.3.')
      // .replace(/^HF/, '1.2.')
      // .replace(/^HG/, '1.1.')
      // .replace(/^HG/, '1.1.')
    }
    function rowCode(row){
      return [
        (row.prodBrand||'p').substr(0,3).toUpperCase(),
        (row.artNr||row.prodArtNr||row.orderCode||'').replace(/,/g, '.').replace(/-(\d+)$/g, '/$1'),
        Number(row.quantity) > 1 ? row.quantity : null,
        // (a.supplier||'xxx').substr(0,3).toUpperCase(),
      ].filter(Boolean).join('-').toLowerCase().replace(/\s/g,'')
    }
    function rowTitle(row){
      const quantity = row.artQuantity || row.quantity;
      return [
        row.prodBrand,
        (row.title || row.prodTitle).replace(row.prodBrand, '').trim(),
        row.prodInhoud ? row.prodInhoud + (row.prodInhoudEenheid || 'st') : null,
        quantity>1 ? '(' + row.unit + ')' : '',
        quantity>1 ? quantity + 'st': '',
      ].filter(Boolean).join(' ');
    }
    function num(value, dig = 2){
      return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: dig, maximumFractionDigits: dig }).format(value);
    }
    function cur(value){
      return value ? '€ ' + Number(value).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2}) : '';
    }
    async function order(orderNr) {
      const data = await $().url('https://aliconnect.nl/api/abis/data').post({
        request_type: 'paklijst',
        id: orderNr,
        set: 'printDateTime = GETDATE()'
      }).then(e => e.body);
      var [salesorders,rows] = data;
      const [salesorder] = salesorders;
      console.log(salesorder,rows);
      // rows = rows.filter(row => row.orderNr === salesorder.nr);
      rows.forEach(row => row.storageLocation = row.newStorageLocation ? row.newStorageLocation.match(/../g).splice(1).map(Number).join('-') : row.prodStockLocation.substr(0,3));
      rows = rows.filter(row => row.orderNr === salesorder.nr);
      rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));

      return $('div').append(
        $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
        $('div').briefkop(salesorder, 'Leverbon Intern').append(
          salesorder.remark ? $('div').text(salesorder.remark).style('padding:2mm;border:solid 1px red;margin-top:2mm;') : null,
          $('table').class('grid').style('table-layout:fixed;').append(
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
          $('table').class('grid').append(
            $('thead').append(
              $('tr').append(
                $('th').align('left').text('Orderdatum'),
                $('th').align('left').text('OrderNr'),
                $('th').align('left').text('Klantnummer'),
                $('th').align('left').text('Referentie'),
                $('th').align('left').text('Transport'),
                $('th').align('right').text('kg'),
              ),
            ),
            $('tbody').append(
              $('tr').append(
                $('td').text(new Date(salesorder.orderDateTime).toLocaleDateString()),
                $('td').text(salesorder.nr),
                $('td').text(salesorder.debNr),
                $('td').text(salesorder.ref),
                $('td')
                .text(transportOptions[salesorder.routeNr] ? transportOptions[salesorder.routeNr].title : 'Onbekend')
                .style(transportOptions[salesorder.routeNr] ? transportOptions[salesorder.routeNr].style : null),
                $('td').align('right').text(num(rows.map(row =>(row.quant||0) * (row.artWeight||0)).reduce((tot,val)=>tot += val),1)),
              ),
            ),
          ),
          $('table').class('grid').append(
            $('thead').append(
              $('tr').append(
                $('th').align('left').text('Mag'),
                $('th').align('left').text('Artikelcode'),
                $('th').align('left').text('Aantal'),
                // $('th').align('left').text('Verpakking'),
                $('th').align('left').text('Omschrijving'),
                $('th').align('right').text('kg/st'),
              ),
            ),
            $('tbody').append(
              rows.sort((a,b) => a.storageLocation.localeCompare(b.storageLocation)).map(row => $('tr').append(
                $('td').text(row.storageLocation),
                $('td').text(rowCode(row)),//.style('font-family:monospace;font-size:0.9em;'),
                $('td').text(row.quant, row.unit),
                $('td').text(row.title).style('white-space:normal;'),
                $('td').align('right').text(!row.artWeight ? null : num(row.artWeight,1)),
              ))
            ),
          ),
        ).style('page-break-before:always;'),
        $('div').briefkop(salesorder, 'Leverbon').append(
          salesorder.remark ? $('div').text(salesorder.remark).style('padding:2mm;border:solid 1px red;margin-top:2mm;') : null,
          $('table').class('grid').append(
            $('thead').append(
              $('tr').append(
                $('th').align('left').text('Orderdatum'),
                $('th').align('left').text('OrderNr'),
                $('th').align('left').text('Klantnummer'),
                $('th').align('left').text('Referentie'),
              ),
            ),
            $('tbody').append(
              $('tr').append(
                $('td').text(new Date(salesorder.orderDateTime).toLocaleDateString()),
                $('td').text(salesorder.nr),
                $('td').text(salesorder.debNr),
                $('td').text(salesorder.ref),
              ),
            ),
          ),
          $('table').class('grid').append(
            $('thead').append(
              $('tr').append(
                $('th').align('left').text('Artikelcode'),
                $('th').align('left').text('Omschrijving'),
                $('th').align('right').text('Prijs'),
                $('th').align('right').text('Aantal'),
                $('th').align('right').text('Totaal'),
              ),
            ),
            $('tbody').append(
              rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime)).map(row => $('tr').append(
                $('td').text(rowCode(row)).style('font-family:monospace;font-size:0.9em;'),
                $('td').text(rowTitle(row)).style('white-space:normal;'),
                $('td').align('right').text(!row.netto ? '' : Number(row.netto).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2})),
                $('td').align('right').text(row.quant),
                $('td').align('right').text(row.netto && row.quant ? Number(row.quant * row.netto).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2}) : null),
              )),
              $('tr').style('border-top:solid 1px;').append(
                $('td'),
                $('td').align('right').text('SUBTOTAAL'),
                $('td'),
                $('td'),
                $('td').align('right').text(num(rows.filter(row=>row.quant && row.netto).map(row =>row.quant * row.netto).reduce((tot,val)=>tot += val))),
              ),
              $('tr').append(
                $('td'),
                $('td').align('right').text('BTW specificatie 21.0%'),
                $('td'),
                $('td'),
                $('td').align('right').text(num(0.21 * rows.filter(row=>row.quant && row.netto).map(row =>row.quant * row.netto).reduce((tot,val)=>tot += val))),
              ),
              $('tr').append(
                $('td'),
                $('td').align('right').text('TOTAAL (incl. BTW)'),
                $('td'),
                $('td'),
                $('td').style('border-top:solid 1px;').align('right').text(num(1.21 * rows.filter(row=>row.quant && row.netto).map(row =>row.quant * row.netto).reduce((tot,val)=>tot += val))),
              ),
            ),
          ),
        ).style('page-break-before:always;'),
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
      if (!salesorder) return alert('FACTUUR HEEFT GEEN PAKBONNEN');

      rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
      const mailtext = ''; // Exta tekst op mail naar klant
      salesorder.clientKortingContant = isNaN(salesorder.clientKortingContant) ? 0 : Number(salesorder.clientKortingContant);
      const els = {};
      let totaal = 0;
      let betaald = 0;
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
                $('th').align('right').text('Aantal'),
                $('th').align('left').text('Verpakking'),
                $('th').align('left').style('width:100%;').text('Omschrijving'),
                $('th').align('right').text('Prijs'),
                $('th').align('right').text('Excl'),
              ),
            ),
            $('tbody').append(
              ...clientOrders.map(salesorder => [
                $('tr').append(
                  $('th'),
                  $('th'),
                  $('th'),
                  $('th').align('left').text(`Order: ${salesorder.nr}`, salesorder.ref ? `ref: ${salesorder.ref}`: ''),
                  $('th'),
                  $('th'),
                )
              ].concat(
                rows.filter(row => row.orderNr === salesorder.nr).map(row => $('tr').append(
                  $('td').text(row.artNr),
                  $('td').align('right').text(row.quant),
                  $('td').text(row.unit),
                  $('td').style('white-space:normal;').text(row.title),
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
    async function sendInvoice(elem, factuurData) {
      const [clientInvoices,clientOrders,rows] = factuurData;
      const [invoice] = clientInvoices;
      const invoiceNr = invoice.nr;
      const from = `invoice@${invoice.accountCompanyName.toLowerCase()}.nl`;
      const maildata = {
        from: from,
        bcc: from,
        to: 'max.van.kampen@alicon.nl',
        to: invoice.clientOtherMailAddress,
        invoiceNr: invoiceNr,
        chapters: [{
          title: `${invoice.accountCompanyName} factuur ${invoiceNr} voor ${invoice.clientCompanyName}`,
          content: aim.markdown().render(`
            Geachte heer / mevrouw,

            Hierbij ontvangt ${invoice.clientCompanyName} een factuur aangaande de door ${invoice.accountCompanyName} geleverde goederen.

            Voor automatische verwerking van uw digitale facturen is uw factuur bijgevoegd als bijlage.
            Wij willen u graag erop attenderen dat digitale factuurbestanden gedurende zeven jaar bewaard dienen te worden.
            Meer informatie vindt u op [belastingdienst.nl](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/administratie_bijhouden/administratie_bewaren/administratie_bewaren).
            Het bewaren van (alleen) een afdruk van de digitaal ontvangen facturen op papier is niet voldoende,
            U dient uw digitale factuur ook digitaal te bewaren.

            Voor eventuele vragen over de factuur kunt u zich richten tot onze financiële administratie
            via e-mail: [administratie@${invoice.accountCompanyName}.nl](mailto:administratie@${invoice.accountCompanyName}.nl?SUBJECT=Vraag over factuur ${invoiceNr}&BODY=Beste administratie,%0A%0ANamens ${invoice.clientCompanyName} heb ik een vraag aangaande factuur ${invoiceNr}: ... ?%0A%0AMet vriendelijke groet,%0A${invoice.clientCompanyName})
            of telefonisch: ${invoice.accountPhone}

            Indien U vragen heeft over de geleverde artikelen kunt u contact opnemen
            via e-mail: [verkoop@${invoice.accountCompanyName}.nl](mailto:verkoop@${invoice.accountCompanyName}.nl?SUBJECT=Inhoudelijke vragen over factuur ${invoiceNr}&BODY=Beste administratie,%0A%0ANamens ${invoice.clientCompanyName} heb ik een vraag aangaande factuur ${invoiceNr}: ... ?%0A%0AMet vriendelijke groet,%0A${invoice.clientCompanyName})

            Met vriendelijke groet,  \nAdministratie  \n${invoice.accountCompanyName}
            `
          ),
        }],
        attachements: [{
          content: elem.elem.innerHTML,
          name: `${invoice.accountCompanyName}-factuur-${invoiceNr}-${invoice.clientName}.pdf`.toLowerCase()
        }]
      };
      console.log(maildata);
      await $().url('https://aliconnect.nl/api/abis/data').query({
        request_type: 'sendInvoice',
      }).input(maildata).post().then(e => console.log(e.body));
      // elem.remove();
    }
    async function factureren(salesorder, id){
      const data = await $().url('https://aliconnect.nl/api/abis/data').post({
        request_type: 'createInvoice',
        accountCompanyName: salesorder.accountCompanyName,
        ordernummers: id,
      }).then(e => e.body);
      // console.log(data);
      const [bedrijven] = data;
      const [accountCompany] = bedrijven;
      const invoiceNr = accountCompany.invoiceNr;
      const factuurElem = await factuur(invoiceNr);

      const [clientInvoices,clientOrders,rows] = factuurData;
      const [invoice] = clientInvoices;
      facturenElem = facturenElem || $('div')//$('iframe').printbody();
      if (invoice.clientOtherMailAddress) {
        await sendInvoice(factuurElem, factuurData);
      } else {
        facturenElem.append(factuurElem.style('page-break-after:always;'))
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
    async function lijstFactureren(orders) {
      for (let clientName of orders.map(row => row.clientName).unique()) {
        const clientOrders = orders.filter(row => row.clientName === clientName);
        const [salesorder] = clientOrders;
        await factureren(salesorder, clientOrders.map(o => o.nr).join(','));
      }
      if (facturenElem.elem.innerText) {
        facturenElem.printpdf();
      }
      facturenElem = null;
    }
    async function lijstHerinneren() {
      const rows = aim.listRows;
      for (let clientName of rows.map(row => row.clientName).unique()) {
        const clientInvoices = rows.filter(row => row.clientName === clientName);
        const [invoice] = clientInvoices;
        clientInvoices.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
        const invoiceNrs = clientInvoices.filter(row => row.dagen>30).map(row => row.nr);
        const from = `invoice@${invoice.accountCompanyName.toLowerCase()}.nl`;
        console.log(clientInvoices);
        const attachements = invoiceNrs.map(invoiceNr => Object({
          invoiceNr: invoiceNr,
        }));
        for (let attachement of attachements) {
          attachement.iframe = await factuur(attachement.invoiceNr);
        }
        // console.log(salesorder.clientOtherMailAddress, salesorder.clientCompanyName, salesorder);
        let totVervallen = 0;
        const content = aim.markdown().render(`Geachte heer/mevrouw,

          Onderstaand treft u het overzicht openstaande posten aan. Voor één of meerdere facturen is de betalingstermijn inmiddels
          verstreken. Heeft u vragen omtrent het overzicht, is er een onopgelost probleem of mist u een factuur? Neemt u dan even
          contact met ons op. Zoniet, dan stellen wij het op prijs als u het vervallen bedrag per omgaande aan ons overmaakt.

          <table style="width:100%;">
          <thead>
          <tr><th>Factuurnr</th><th align=right>Factuurdatum</th><th align=right>Vervaldatum</th><th align=right>Bedrag</th><th align=right>Betaald</th><th align=right>Saldo</th><th align=right>Ouderdom</th><th align=right>Vervallen</th></tr>
          </thead>
          <tbody>
          ${clientInvoices.map(invoice => `<tr><td align=right>${[
            invoice.nr,
            new Date(invoice.createdDateTime).toLocaleDateString(),
            new Date(invoice.vervallenDateTime).toLocaleDateString(),
            num(invoice.totIncl),
            num(invoice.totIncl - invoice.saldo),
            num(invoice.saldo),
            invoice.dagen,
            invoice.dagen > 30 && (totVervallen += Number(invoice.saldo)) ? num(invoice.saldo) : '',
          ].join('</td><td align=right>')}</td></tr>`).join('')}
          </tbody>
          <tfoot>
          <tr><th></th><th></th><th></th><th></th><th></th><th></th><th align=right>Totaal</th><th align=right>${num(totVervallen)}</th></tr>
          </tfoot>
          </table>

          Mocht dit schrijven uw betaling kruisen dan kunt u deze herinnering als niet verzonden beschouwen.

          Deze mail is verstuurd door een geautomatiseerd proces. U kunt niet op deze mail reageren.
          Heeft u vragen dan kunt u een email sturen naar
          [administratie@${invoice.accountCompanyName}.nl](mailto:administratie@${invoice.accountCompanyName}.nl?SUBJECT=Vraag over betalingsherinnering&BODY=Beste administratie,%0A%0ANamens ${invoice.clientCompanyName} heb ik een vraag aangaande de betalingsherinnering: ... ?%0A%0AMet vriendelijke groet,%0A${invoice.clientCompanyName}).

          Met vriendelijke groet,

          ${invoice.accountCompanyName}  \nBoekhouding  \nTel: ${invoice.accountPhone}
          `
        );
        // $('.pv').text('').html(content);
        // console.log(content);
        // return;
        await $().url('https://aliconnect.nl/api/abis/data').query({
          request_type: 'send',
        }).input({
          from: from,
          bcc: from,
          to: 'max.van.kampen@alicon.nl',
          to: invoice.clientOtherMailAddress,
          chapters: [{
            title: `Betalingsherinnering voor ${invoice.clientCompanyName}`,
            content: content,
          }],
          attachements: attachements.map(row => Object({
            content: row.iframe.elem.innerHTML,
            name: `${invoice.accountCompanyName}-factuur-${row.invoiceNr}-${invoice.clientName}.pdf`.toLowerCase(),
          }))
        }).post();
      }
      document.querySelectorAll('iframe').forEach(el => el.remove());
      alert('Herinneringen verstuurd');
    }
    aim.config.components.schemas.client.app = {
      nav: row => [
        $('button').class('abtn print').title('Printen').on('click', e => {
          const elem = $('article').parent('.lv').class('cover').append(
            $('nav').append(
              $('span'),
              $('button').class('icn-close').on('click', e => elem.remove()),
            ),
            $('h1').text('Klant 1'),
          )
        }),
        $('button').class('abtn view').title('Selecteren').on('click', e => {
          $('button.account>span').text(clientName = row.name);
        }),
      ],
    }
    aim.config.components.schemas.salesorder.app = {
      nav: row => [
        $('button').class('icn-print').title('Bon printen').on('click', async e => (await order(row.nr)).print()),
        $('button').class('abtn').text('OffBon').title('Offert bon printen').on('click', async e => (await offertebon(row.nr)).print()),
        row.invoiceNr ? [
          $('button').class('abtn invoice').title('Factuur printen').on('click', async e => (await factuur(row.invoiceNr)).printpdf()),
          !row.clientOtherMailAddress ? null : $('button').class('icn-mail-send').title('Factuur verzenden').on('click', async e => await sendInvoice(await factuur(row.invoiceNr), factuurData)),
        ] : [
          $('button').text('Factureren').on('click', async e => await lijstFactureren([row])),
        ],
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
            $('button').text('Factureren').on('click', e => lijstFactureren(aim.listRows)),
          ),
        ),
      ]
    }
    aim.config.components.schemas.salesorderrow.app = {
      nav: row => [
        $('button').class('icn-print').title('Bon printen').on('click', async e => {
          const title = [row.prodBrand, row.prodTitle].join(' ');
          const extra = row.title.replace(title, '');
          $('div').append(
            $('link').href('assets/css/laklabel.css').rel('stylesheet'),
            $('div').text(title),
            $('div').style('font-weight:bold;').text([row.clientCompanyName].join(' / ')),
            $('div').style('font-weight:bold;').text([extra, row.quant + row.unit].join(' / ')),
            // $('div').text(extra),
            // $('table').append(
            //   $('tr').append(
            //     // $('th').align('left').text('Kleur:'),
            //     $('th').align('left').text('Kleur:'),
            //     $('td').colspan(3).text(extra),
            //   ),
            //   $('tr').append(
            //     // $('th').align('left').text('Kleur:'),
            //     $('th').align('left').text('Klant:'),
            //     $('td').colspan(3).text(row.clientCompanyName),
            //   ),
            //   $('tr').append(
            //     // $('th').align('left').text('Kleur:'),
            //     $('th').align('left').text('Inhoud:'),
            //     $('td').text(row.quant, row.unit),
            //     $('th').align('left').text('Datum:'),
            //     $('td').text(new Date(row.orderDateTime).toLocaleDateString()),
            //   ),
            //   $('tr').append(
            //     $('th').align('left').text('Opdrachtnr:'),
            //     $('td').text(row.id),
            //     $('th').align('left').text('Ordernr:'),
            //     $('td').text(row.orderNr),
            //   ),
            // ),
            $('div').class('small').text(`Verdunnen met acryl verdunner (4310/4320) +/- 75% tot 80%.`),
            // $('div').class('small').text(`Alleen voor professioneel gebruik. Kleur voor gebruik controleren.`),
            $('div').class('small').text([row.orderNr, row.id, new Date(row.orderDateTime).toISOString().substr(0,10).replace(/-/g,''), row.artNr].join('/').toLowerCase() ),
          ).print().remove();
        }),
      ],
      header(row){
        const elem = $('div');
        if (row.discount = row.clientDiscount || row.discount || 0) {
          row.price = row.listPrice * (100 - row.discount) / 100;
          elem.class('price discount').append(
            $('span').attr('listprice', num(row.listPrice)),
            $('span').attr('discount', num(-row.discount,1)),
          );
        }
        elem.append(
          $('span').attr('price', num(row.price)),
          $('span').attr('fatprice', num(row.price * 1.21)),
          $('span'),
          elem.input = $('input').type('number').step(1).min(0).value(row.quant).on('change', e => {
            row.quant = Number(e.target.value);
            console.log(row.quant);
          }).on('click', e => {
            e.stopPropagation();
          }),
        );
        return elem;
      }
    }
    aim.config.components.schemas.invoice.app = {
      nav: row => [
        $('button').class('abtn print').title('Print').on('click', async e => (await factuur(row.nr)).printpdf()),
        !row.clientOtherMailAddress ? null : $('button').class('icn-mail-send').title('Factuur verzenden').on('click', async e => await sendInvoice(await factuur(row.nr), factuurData)),
      ],
      navList: () => [
        $('button').text('Facturen').append(
          $('div').append(
            $('button').text('Herinneren').on('click', lijstHerinneren),
          ),
        ),
      ]
    }
    aim.config.components.schemas.clientart.app = {
      header(row){
        const elem = $('div');
        if (row.discount = row.clientDiscount || row.discount || 0) {
          row.price = row.listPrice * (100 - row.discount) / 100;
          elem.class('price discount').append(
            $('span').attr('listprice', num(row.listPrice)),
            $('span').attr('discount', num(-row.discount,1)),
          );
        }
        elem.append(
          $('span').attr('price', num(row.price)),
          $('span').attr('fatprice', num(row.price * 1.21)),
          $('span'),
          elem.input = $('input').type('number').step(1).min(0).value(row.quant).on('change', e => {
            row.quant = Number(e.target.value);
            console.log(row.quant);
          }).on('click', e => {
            e.stopPropagation();
          }),
        );
        return elem;
      }
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
    aim.config.import = aim.config.import || [];
    aim.config.import.push({
      filename: 'Openstaande posten debiteuren.xlsx',
      tabs: [{
        tabname: 'Openstaande posten debiteuren',
        cols: {
          invoiceNr: 'Factuurnummer',
          totaal: 'Totaal factuurbedrag',
          saldo: 'Saldo',
        },
        callback(rows) {
          rows.forEach(row => row.invoiceNr = row.invoiceNr.replace(/(\d+).*/, '$1'))
          $().url('https://aliconnect.nl/api/abis/data').input(rows).query({
            request_type: 'facturen_openstaand',
            // invoiceNrs: rows.map(row => row.invoiceNr).join(','),
          }).post().then(e => console.log(e.body));
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
    function clienttable(rows, cols, options = {}){
      // console.log(cols);
      return $('table').style('width:100%;').append(
        $('thead').append(
          $('tr').append(
            Object.keys(cols).map(title => $('th').text(title))
          )
        ),
        $('tbody').append(
          rows.map(row => $('tr').style(options.style ? options.style(row) : null).append(
            Object.values(cols).map(fn => fn(row)),
            // cols.map(col => $('td').text((col.calc || String)(row[col.name])).style(col.style||'')),
          ))
        )
      );
    }
    async function analyseBedrijf (naam) {
      const data = await fetch('https://aliconnect.nl/api/abis/data?request_type=report-company&name=' + naam).then(res => res.json());
      var [clients] = data;
      clients.forEach(row => {
        row.verschil = row.lastYear - row.beforeLastYear;
        row.groei = row.beforeLastYear ? (row.lastYear-row.beforeLastYear)/row.beforeLastYear*100 : 100;
        row.marge = row.lastYear - row.totInkoop;
        row.winst = row.lastYear && row.marge ? row.marge / row.lastYear * 100 : 0;
      })
      // clients = clients.filter(row => row.lastYear || row.beforeLastYear);
      function val(value, dig = 0){
        return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: dig, maximumFractionDigits: dig }).format(value);
      }
      const styleValCol = 'width:2cm;text-align:right;';
      const cols = {
        Firma: row => $('td').text(row.companyName),
        AM: row => $('td').text(row.clientManager),
        'Afgelopen periode': row => $('td').text(val(row.lastYear)).style(styleValCol),
        'Periode daarvoor': row => $('td').text(val(row.beforeLastYear)).style(styleValCol),
        // 'Verschil': row => $('td').text(val(row.verschil)).style(styleValCol+`color:${row.verschil<0 ? 'orange' : 'inherit'};`),
        'Groei': row => $('td').text(val(row.verschil)).style(styleValCol+`color:${row.groei<0 ? 'orange' : 'inherit'};`),
        '%': row => $('td').text(val(row.groei)).style(`text-align:right;`),

        'Marge': row => $('td').text(val(row.marge)).style(styleValCol+`color:${row.marge<0 ? 'orange' : 'inherit'};`),
        'Winst': row => $('td').text(val(row.winst)).style(`text-align:right;color:${
          row.winst<15 ? 'red'
          : row.winst<30 ? 'orange'
          : row.winst>50 ? 'lightgreen'
          : 'inherit'
        };`),

        // 'Inkoop': row => $('td').text(val(row.totInkoop)).style(styleValCol),
        // 'Marge': row => $('td').text(val(row.marge)).style(styleValCol),
        'Saldo': row => $('td').text(val(row.saldo)).style(styleValCol),
        'Dagen': row => $('td').text(val(row.dagen)).style(styleValCol+`color:${row.dagen>30 ? 'orange' : 'inherit'};`),
      };
      const clientManagers = clients.map(row => row.clientManager).unique().sort();
      const elem = $('div').parent(
        $('div').parent(
          $('.lv').text('').append(
            $('nav').append(
              $('span'),
              $('button').class('icn-print').on('click', e => elem.print()),
            ),
          )
        )
      );
      [
        [naam, clients],
      ]
      .concat(clientManagers.map(cm => [cm, clients.filter(row => row.clientManager === cm)]))
      .forEach(([cm,clients])=>{
        const omzet1 = clients.map(row => Number(row.lastYear||0)).reduce((s,v) => s + v);
        const omzet2 = clients.map(row => Number(row.beforeLastYear||0)).reduce((s,v) => s + v);
        const saldo = clients.map(row => Number(row.saldo||0)).reduce((s,v) => s + v);
        const inkoop = clients.map(row => Number(row.totInkoop||0)).reduce((s,v) => s + v);
        const marge = clients.map(row => Number(row.marge||0)).reduce((s,v) => s + v);
        elem.append(
          $('h1').text('Analyse', naam, 'Client Manager:', cm),
          $('ul').append(
            $('li').text( `Omzet afgelopen 365 dagen: ${val(omzet1)}`),
            $('li').text( `Omzet jaar ervoor: ${val(omzet2)}`),
            $('li').text( `Groei: ${num((omzet1-omzet2)/omzet2*100)}%`),
            $('li').text( `Inkoop: ${val(inkoop)}`),
            $('li').text( `Marge: ${val(marge)}`),
            $('li').text( `Saldo: ${val(saldo)}`),
          ),
          $('details').append(
            $('summary').text('Top Klanten omzet'),
            clienttable(clients.filter(row => row.dagen !== null).sort((a,b)=> b.lastYear - a.lastYear).slice(0,20), cols),
          ),
          $('details').append(
            $('summary').text('Klanten top dalers'),
            clienttable(clients.sort((a,b)=> a.verschil - b.verschil).slice(0,30),  cols),
          ),
          $('details').append(
            $('summary').text('Klanten top stijgers'),
            clienttable(clients.sort((a,b)=> b.verschil - a.verschil).slice(0,30),  cols),
          ),
          $('details').append(
            $('summary').text('Klanten niet actief'),
            clienttable(clients.filter(row => row.dagen > 30).sort((a,b)=> a.dagen - b.dagen),  cols),
          ),
          //   {name: 'companyName'},
          //   // {name: 'businessAddressCity'},
          //   {name: 'lastYear', title: 'Afgelopen periode', calc: val, style: 'text-align:right;'},
          //   {name: 'beforeLastYear', title: 'Periode daarvoor', calc: val, style: 'text-align:right;'},
          //   {name: 'groei', calc: val, style: 'text-align:right;'},
          //   {name: 'dagen'},
          // ], {
          //   style: row => `color:${row.groei<0 ? 'orange' : 'inherit'};`,
          // }),
          // klanten.map(row => $('details').append(
          //   $('summary').text(row.companyName, row.dagen),
          //   $('p').text(row.opmerking),
          // ))
        )
      })
    }
    aim.om.treeview({
      Sales: {
        Klanten: e => aim.list('client',{
          $filter: `archivedDateTime EQ NULL`,
          $search: ``,
        }),
        Archief: e => aim.list('client',{
          $filter: `archivedDateTime NE NULL`,
          $search: ``,
        }),
        Analyse: {
          Airo: () => analyseBedrijf('Airo'),
          Proving: () => analyseBedrijf('Proving'),
          async Voorraad() {
            const data = await fetch('https://aliconnect.nl/api/abis/data?request_type=report-voorraad').then(res => res.json());
            const [arts] = data;
            function magcode(code){
              var a = (code||'').split('');
              a[0] = ('00' + '-IJKLMNOP--ABCDEFGH'.split('').indexOf(a[0])).slice(-2);
              a[1] = ('00' + '-ABCDEFGHIJKLMNOP'.split('').indexOf(a[1])).slice(-2);
              a[2] = ('00' + a[2]).slice(-2);
              return a.join('.');
            }
            const elem = $('div').parent(
              $('div').parent(
                $('.lv').text('').append(
                  $('nav').append(
                    $('span'),
                    $('button').class('icn-print').on('click', e => elem.print()),
                  ),
                )
              )
            );
            elem.append(
              clienttable(arts, {
                Omschrijving: row => $('td').text(row.Omschrijving),
                MagLokatie: row => $('td').style('font-family:consolas;').text(row.MagLokatie, magcode(row.MagLokatie)),
                Voorraad: row => $('td').text(row.Voorraad),
              }),
            )
          },
          async Verloop() {
            const data = await fetch('https://aliconnect.nl/api/abis/data?request_type=report-verkoop-verloop').then(res => res.json());
          },
        }
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
        ReadyMix: e => aim.list('salesorderrow',{
          $filter: `prodStockLocation EQ 'k-m' && sendDateTime EQ NULL && isQuote <> 1 && isOrder = 1`,
          // $order: `nr DESC`,
          $top: `100`,
        }),
      },
      Administratie: {
        'Facturen Actueel': e => aim.list('invoice',{
          $filter: `isbetaald EQ 0`,
          $order: `nr DESC`,
        }),
        'Facturen Betaald': e => aim.list('invoice',{
          $filter: `isbetaald EQ 1`,
          $order: `nr DESC`,
        }),
        Afas: {
          'Export Facturen Airo': e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=afas_boek_export&bedrijf=airo',
          'Export Facturen Proving': e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=afas_boek_export&bedrijf=proving',
          'Import'() {
            $('input').type('file').multiple(false).accept('.xlsx').on('change', e => {
              importFiles(e.target.files);
              alert('Import gereed');
            }).click().remove()
          },
        },
        // Doorfacturatie: e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=doorfacturatie',
      },
      Magazijn: {
        Opslag() {
          $().url('https://aliconnect.nl/api/abis/data').query({
            request_type: 'storage',
          }).get().then(e => {
            const [arts] = e.body;
            // const storageLocations = arts.map(a=>a.storageLocation).unique();
            // console.log(storageLocations);
            // art.length=100;
            // arts.forEach(a=>a.storageLocation = a.storageLocation || a.prodStorageLocation || 'xxx');
            arts.forEach(a=>a.artNr = a.artNr||a.prodArtNr||a.orderCode);
            arts.forEach(a=>a.locCode = locCode(a.storageLocation || a.prodStorageLocation || ''));
            arts.sort((a,b)=>a.artNr.localeCompare(b.artNr));
            arts.sort((a,b)=>a.locCode.localeCompare(b.locCode));
            // console.log(arts);
            $(document.documentElement).class('');
            var k='';
            var to;
            const elems = {
              locatie: $('div'),
              ean: $('div'),
              artcode: $('div'),
              art: $('div').style('font-family:monospace;'),
            }
            $(document.body).text('').append(
              $('style').text('input{text-align:right;font:inherit;}'),
              $('div').style('font-size:20px;').append(
                $('input').style('font-size:20px;').type('number').on('keyup', e => {
                  if (e.code === 'Enter') {
                    const value = e.target.value;
                    e.target.value = '';
                    if (value[0]==='0' && value[1]==='0') {
                      console.log(value);
                      const loc = value.slice(-6).match(/../g).map(Number).join('.');
                      elems.locatie.text(loc);
                      var artlist = arts.filter(a => a.locCode === loc);
                    } else {
                      elems.ean.text(value);
                      var artlist = arts.filter(a => a.ean == value);
                    }
                    console.log(artlist);
                    elems.art.text('').append(
                      artlist.map((a,i) => [
                        $('div').text(a.artNr, rowCode(a), a.id),
                        // $('div').text(rowTitle(a)),
                        $('div').append(
                          a.eanElem = $('input').value(a.ean)
                          .type('number')
                          .placeholder('ean')
                          .step(1)
                          .on('change', e => {
                            $().url('https://aliconnect.nl/api/abis/data').query({
                              request_type: 'storageSave',
                            }).post({
                              id: a.id,
                              name: 'ean',
                              value: a.ean = e.target.value,
                            });
                            a.newStorageLocationElem.select().focus();
                          }),
                          a.newStorageLocationElem = $('input')
                          .style('width: 120px;')
                          .value(a.newStorageLocation)
                          .type('number')
                          .step(1)
                          .placeholder('locatie')
                          .on('change', e => {
                            $().url('https://aliconnect.nl/api/abis/data').query({
                              request_type: 'storageSave',
                            }).post({
                              id: a.id,
                              name: 'newStorageLocation',
                              value: a.newStorageLocation = e.target.value,
                            });
                            a.stockElem.select().focus();
                          }),
                          a.stockElem = $('input')
                          .style('width: 80px;')
                          .value(a.stock)
                          .type('number')
                          .placeholder('aantal')
                          .on('change', e => {
                            $().url('https://aliconnect.nl/api/abis/data').query({
                              request_type: 'storageSave',
                            }).post({
                              id: a.id,
                              name: 'stock',
                              value: a.stock = e.target.value,
                            });
                            artlist[i+1].eanElem.select().focus();
                          }),
                          a.prodInhoudElem = $('input')
                          .style('width: 80px;')
                          .value(a.prodInhoud)
                          .type('number')
                          .placeholder('inhoud')
                          .on('change', e => {
                            $().url('https://aliconnect.nl/api/abis/data').query({
                              request_type: 'storageSave',
                            }).post({
                              id: a.id,
                              name: 'prodInhoud',
                              value: a.prodInhoud = e.target.value,
                            })
                          }),
                        )
                      ]),
                    )
                  }
                }),
                elems.locatie,
                elems.ean,
                elems.artcode,
                elems.art,
              )
            );
            return;
            return;
            $(document.body).text('').style('overflow:auto;').append(
              $('table').style('font-family:consolas;').append(
                arts.map(a => $('tr').append(
                  // $('td').append($('input').value(a.storageLocation.substr(0,3))),
                  $('td').text(a.storageLocation),
                  $('td').text(locCode(a.storageLocation)),
                  $('td').text(rowCode(a)),
                  $('td').text(a.orderCode),
                  $('td').append($('input').value(a.ean)),
                  // $('td').text(a.ean),
                  $('td').append($('input').value(a.stockStart).on('keyup', e => {
                    if (e.code === 'Enter') {
                      alert(e.target.value);
                    }
                    // k=k+'['+e.code+']';
                    // k=k+e.key;
                    // clearTimeout(to);
                    // to = setTimeout(e => alert(k), 500);
                  })),
                  // $('td').text(a.stockStart),
                  // $('td').text(a.unit),
                  $('td').text(rowTitle(a)),
                ))
              )
            )
            return;

            const store = { art: [], children:{} };
            for (art of arts) {
              var a = (art.storageLocation||'?').substring(0,3).toUpperCase().split('');
              // console.log(art.storageLocation);
              var s = store;
              for (c1 of a) {
                s = s.children[c1] = s.children[c1] || { name: c1, art: [], children:{} };
              }
              s.art.push(art);
            }
            console.log(store);
            const elem = $('.lv').text('');
            function artrows(rows){
              return $('table').style('font-family:consolas;').append(
                rows.map(a => $('tr').append(
                  $('td').text(a.storageLocation || a.prodStorageLocation),
                  $('td').text(a.stockStart),
                  $('td').text([
                    (a.prodBrand||'xxx').substr(0,3).toUpperCase(),
                    a.artNr||a.prodArtNr||a.orderCode,
                    a.quantity,
                    (a.supplier||'xxx').substr(0,3).toUpperCase()
                  ].join('-').toLowerCase()),
                  $('td').text(a.unit),
                  $('td').text(
                    a.prodBrand,
                    a.prodTitle,
                    a.prodInhoud ? a.prodInhoud + (a.prodInhoudEenheid || 'st') : null,
                    a.quantity>1 ? a.quantity + 'st': '',
                  ),
                  $('td').text(a.ean),
                ))
              )
            }
            for (let [s1,o1] of Object.entries(store.children)) {
              let e1 = $('details').parent(elem).open(1).append(
                $('summary').text(s1),
                artrows(o1.art),
              )
              for (let [s2,o2] of Object.entries(o1.children)) {
                let e2 = $('details').parent(e1).open(1).append(
                  $('summary').text(s1,s2),
                  artrows(o2.art),
                )
                for (let [s3,o3] of Object.entries(o2.children)) {
                  let e3 = $('details').parent(e2).open(1).append(
                    $('summary').text(s1,s2,s3),
                    artrows(o3.art),
                  )
                }
              }
            }
          });
        },
        Locaties() {
          const codes={};
          rijen.forEach(rij => {
            rij.racks.forEach(rack => {
              Array(rack.shelfs).fill(null).forEach((shelf,shelfnr) => {
                const locbarcode = `*00${("00"+rij.nr).slice(-2)}${("00"+rack.nr).slice(-2)}${("00"+(shelfnr+1)).slice(-2)}*`;
                if (rack.code) {
                  const codeOld = rack.code + (shelfnr+1);
                  const codeNew = [rij.nr,rack.nr,shelfnr+1].join('.');
                  codes[codeOld] = codeNew;
                }
              });
            });
          });
          // return;
          $().url('https://aliconnect.nl/api/abis/data').query({
            request_type: 'storageLocaties',
          }).get().then(e => {
            const [art] = e.body;
            art.forEach(art => {
              art.storageLocation = (art.storageLocation||art.prodStorageLocation||'').toLowerCase();
              art.codeNew = codes[String(art.storageLocation).toLowerCase()];
            });
            art.sort((a,b)=>a.storageLocation.localeCompare(b.storageLocation));
            $('div')
            .parent($('.lv').text(''))
            .append(
              $('div').append(
                art.filter(art=>!art.codeNew && !['z','v'].includes(art.storageLocation)).map(
                  art=>$('li').text(art.storageLocation, art.artNr, art.prodArtNr, art.orderCode, art.prodBrand,art.prodTitle,art.prodInhoud,art.prodInhoudEenheid),
                )
              )
            ).print();
            // console.log(codes);
            console.log(art);
          });
        },
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
    });

    // console.log('010101'.match(/../g));

    //
    // const store = [];
    // aim.config.storage.old.forEach(c => {
    //   var a = String(c.name).substring(0,3).toUpperCase().split('');
    //   var s = store;
    //   for (c1 of a) {
    //     console.log(c1);
    //     if (!s.find(r=>r.name==c1)) s.push({ name: c1, nr: Number(c1), art: [], children: []});
    //     s = s.find(r=>r.name==c1).children;
    //   }
    // })
    // console.log(
    //   JSON.stringify(store, null, 2)
    //   .replace(/"children": \[\]\n/gs,'')
    //   .replace(/"/gs,'')
    //   // .replace(/\},\n|\}\n|\{\n|\[\n|\],\n|\]\n/gs,'')
    //   .replace(/\},(?=\n)|\}(?=\n)|\{(?=\n)|\],(?=\n)|\](?=\n)|\[(?=\n)|,/gs,'')
    //   .replace(/\s\sname:/gs,'- name:')
    //   .split(/\n/).filter(s => s.trim()).join('\n')
    // );

  })
  function importFiles(files){
    Array.from(files).forEach((file,i) => {
      console.log(i,file);
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
    if (data.types.includes('Files')) {
      importFiles(data.files);
      // const config = await fetch('https://aliconnect.nl/yaml.php', {
      //   method: 'POST',
      //   body: await fetch('config/import.yaml').then(res => res.text()),
      // }).then(res => res.json());
      // console.log(1, config, files);
    }
  });
}
