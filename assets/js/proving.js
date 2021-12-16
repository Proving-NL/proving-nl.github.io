function gettext(selector){
  return (selector.match(/\\w+/)||[]).shift();
}
function getnumber(selector){
  return (selector.match(/\\d+/)||[]).shift()
}

$().on('load', async e => {
  console.log('JA', aim.config);
  let clientart = [];
  let clientName = [];

  async function selectClient(name){
    localStorage.setItem('clientName', clientName = name);
    $('button.account>span').text(clientName);
    [clientart] = await fetch('https://aliconnect.nl/api/abis/data?request_type=clientArt&clientName=' + clientName).then(res => res.json());
    aim.idfilter = `clientName EQ '${clientName}'`;
    // console.log('JA', clientname);

  }

  // let clientName = localStorage.getItem('clientName');
  aim.om.treeview({
    'Shop': {
      Producten: e => aim.list('product',{
        $filter: `clientName='${clientName}' && discount NE NULL`,
        $search: ``,
      }),
      Boodschappenlijst() {
        aim.list('art',{
          $filter: `id IN (SELECT artId FROM abisingen.dbo.klantartikelen WHERE klantid = '${clientName}')`,
          $search: '*',
        });
      },
      Winkelmandje() {
        aim.list('salesorderrow',{$filter: `clientName EQ '${clientName}' and isOrder EQ 0`});
      },
      // Alles(){
      //   aim.list('article');
      // },
    },
  });

  if (!aim.config.whitelist.includes(aim.config.client.ip)) return;
  await selectClient(localStorage.getItem('clientName'));
  // $('button.account>span').text(clientName);
  $('.abtn.menu>ul')
  .on('click', e => e.stopPropagation())
  .append(
    $('li').text('Handboek').html(aim.markdown().render(await fetch('/docs/index.md').then(res => res.text()))),
  )
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

  let factuurData;
  let facturenElem;
  const transportOptions = [
    { title: 'Niet ingevuld', style: 'color:red;', },
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
  const locaties=[];
  rijen.forEach(rij => {
    rij.racks.forEach(rack => {
      Array(rack.shelfs).fill(null).forEach((shelf,shelfnr) => {
        locaties.push({
          stelling: rij,
          schap: rack,
          locatieNr: `00${("00"+rij.nr).slice(-2)}${("00"+rack.nr).slice(-2)}${("00"+(shelfnr+1)).slice(-2)}`,
          locatieCodeString: rack.code + (shelfnr+1),
          locatieCode: [rij.nr,rack.nr,shelfnr+1].join('.'),
          locatieCode2: [rij.nr,rack.nr,shelfnr+1].join('-'),
        })
      });
    });
  });
  function rowCode(row){
    const quantity = row.artQuantity || row.quantity;
    return [
      // (row.prodBrand||'p').substr(0,3).toUpperCase(),
      (row.artNr||row.prodArtNr||row.orderCode||'').replace(/,/g, '.').replace(/-(\d+)$/g, '/$1'),
      Number(quantity) > 1 ? quantity : null,
      // (a.supplier||'xxx').substr(0,3).toUpperCase(),
    ].filter(Boolean).join('-').toUpperCase().replace(/\s/g,'')
  }
  function rowTitle(row){
    const quantity = row.artQuantity || row.quantity;
    return [
      row.prodBrand,
      (row.title || row.prodTitle || '').replace(row.prodBrand, '').trim(),
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
  function printElem(){
    return $('div').append(
      $('link').rel('stylesheet').href('https://proving-nl.aliconnect.nl/assets/css/print.css'),
      // $('link').rel('stylesheet').href('https://aliconnect.nl/sdk/src/css/web.css'),
    );
  }
  function briefElem(row, title, bc = ''){
    console.log(1, row.accountName);
    return $('div').class('brief').append(
      $('div').append(
        $('img').src(`https://${row.accountName.toLowerCase()}-nl.aliconnect.nl/assets/img/letter-header-${row.accountName.toLowerCase()}.png`
        ),
      ),
      $('table').style('margin-bottom:10mm;width:100%;').append(
        $('tr').append(
          $('td').style('padding-left:10mm;padding-top:25mm;').append(
            $('div').text(row.clientCompanyName).style('font-weight:bold;'),
            $('div').text(row.clientBusinessContactName),
            $('div').text(row.clientBusinessAddressStreet),
            $('div').text(row.clientBusinessAddressPostalCode, row.clientBusinessAddressCity),
          ),
          $('td').style('width:65mm;').append(
            $('div').text(row.accountCompanyName).style('font-weight:bold;'),
            $('div').text(row.accountInvoiceText).style('word-wrap:pre;font-size:0.8em;'),
          ),
        )
      ),
      $('div').append(
        $('span').text(title).style('font-weight:bold;font-size:1.2em;width:12cm;display:inline-block;'),
        $('span').class('bc').text(bc),
      ),
    );
  }
  function orderPage(salesorder, rows) {
    rows.forEach(row => row.storageLocation = row.newStorageLocation ? (row.newStorageLocation.match(/../g)||[]).splice(1).map(Number).join('-') : (row.prodStockLocation||'').substr(0,3));
    rows = rows.filter(row => row.orderNr === salesorder.nr);
    rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
    console.log(salesorder, rows);
    return printElem().append(
      briefElem(salesorder, 'PAKBON (alleen voor intern gebruik)', `*${salesorder.nr}*`).class('order').append(
        salesorder.remark ? $('div').text(salesorder.remark).style('padding:2mm;border:solid 1px red;margin-top:2mm;') : null,
        // $('div').class('barcode').text('*2345234*'),
        $('table').class('grid summary').style('table-layout:fixed;').append(
          $('thead').append(
            $('tr').append(
              // $('th').align('left').text('ID'),
              $('th').align('left').text('Aangemaakt'),
              $('th').align('left').text('Gepakt'),
              $('th').align('left').text('Verzonden'),
              $('th').align('left').text('Geleverd'),
              $('th').align('left').text('Gefactureerd'),
            ),
          ),
          $('tbody').append(
            $('tr').style('height:30px;').append(
              // $('td').append($('span').class('bc').text(2345234)),
              $('td').text(salesorder.userName),
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
              $('th').align('left').class('datum').text('Orderdatum'),
              $('th').align('left').class('datum').text('Leverdatum'),
              $('th').align('left').class('nr').text('Ordernummer'),
              $('th').align('left').class('nr').text('Debiteurnummer'),
              $('th').align('left').text('Referentie'),
              $('th').align('left').style('width:20mm').text('Transport'),
              $('th').align('right').style('width:20mm').text('KG'),
            ),
          ),
          $('tbody').append(
            $('tr').append(
              $('td').text(new Date(salesorder.orderDateTime).toLocaleDateString()),
              $('td').text(new Date(salesorder.plannedDateTime).toLocaleDateString()),
              $('td').text(salesorder.nr),
              $('td').text(salesorder.clientDebNr),
              $('td').text(salesorder.ref),
              $('td')
              .text(transportOptions[salesorder.routeNr] ? transportOptions[salesorder.routeNr].title : 'Onbekend')
              .style(transportOptions[salesorder.routeNr] ? transportOptions[salesorder.routeNr].style : null),
              $('td').align('right').text(num(rows.map(row =>(row.quant||0) * (row.artWeight||0)).reduce((tot,val)=>tot += val),1)),
            ),
          ),
        ),
        $('table').class('grid summary').append(
          $('thead').append(
            $('tr').append(
              // $('th').align('left').text('Artikelnummer'),
              $('th').align('right').style('width:16mm;').text('Aantal'),
              $('th').align('left').style('width:20mm;').text('Eenheid'),
              $('th').align('left').style('width:20mm;').text('Artikel'),
              $('th').align('left').text('Omschrijving'),
              $('th').align('right').style('width:16mm;').text('KG/st'),
              $('th').align('left').style('width:16mm;').text('Mag'),
            ),
          ),
          $('tbody').append(
            rows
            // .sort((a,b) => a.storageLocation.localeCompare(b.storageLocation))
            .map(row => $('tr').append(
              // $('td').text(Number(row.artId).pad(9)),
              $('td').align('right').text(row.quant),
              $('td').text(row.unit),
              $('td').text(rowCode(row)),//.style('font-family:monospace;font-size:0.9em;'),
              $('td').text(row.title).style('white-space:normal;'),
              $('td').align('right').text(!row.artWeight ? null : num(row.artWeight,1)),
              $('td').text(row.storageLocation),
            ))
          ),
        ),
      ).style('page-break-before:always;'),
      briefElem(salesorder, 'LEVERBON', `*${salesorder.nr}*`).append(
        $('table').class('grid').append(
          $('thead').append(
            $('tr').append(
              $('th').align('left').class('datum').text('Orderdatum'),
              $('th').align('left').class('datum').text('Leverdatum'),
              $('th').align('left').class('nr').text('Ordernummer'),
              $('th').align('left').class('nr').text('Debiteurnummer'),
              $('th').align('left').text('Referentie'),
            ),
          ),
          $('tbody').append(
            $('tr').append(
              $('td').text(new Date(salesorder.orderDateTime).toLocaleDateString()),
              $('td').text(new Date(salesorder.plannedDateTime).toLocaleDateString()),
              $('td').text(salesorder.nr),
              $('td').text(salesorder.clientDebNr),
              $('td').text(salesorder.ref),
            ),
          ),
        ),
        $('table').class('grid').append(
          $('thead').append(
            $('tr').append(
              $('th').align('right').style('width:16mm;').text('Aantal'),
              $('th').align('left').style('width:20mm;').text('Eenheid'),
              $('th').align('left').style('width:20mm;').text('Artikelcode'),
              $('th').align('left').text('Omschrijving'),
              // $('th').align('right').text('Prijs'),
              // $('th').align('right').text('Totaal'),
            ),
          ),
          $('tbody').append(
            rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime)).map(row => $('tr').append(
              $('td').align('right').text(row.quant),
              $('td').text(row.unit),
              $('td').text(rowCode(row)),
              $('td').text(rowTitle(row)).style('white-space:normal;'),
              // $('td').align('right').text(!row.netto ? '' : Number(row.netto).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2})),
              // $('td').align('right').text(row.netto && row.quant ? Number(row.quant * row.netto).toLocaleString('nl-NL', {minimumFractionDigits: 2,maximumFractionDigits: 2}) : null),
            )),
          ),
        ),
      ).style('page-break-before:always;')
    );
  }
  async function order(orderNr) {
    const data = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'paklijst',
      id: orderNr,
      set: 'printDateTime = GETDATE()'
    }).then(e => e.body);
    console.log(data);
    var [salesorders,rows] = data;
    const [salesorder] = salesorders;
    if (!rows.length) alert('Order bevat geen regels');
    // console.log(1, salesorder,rows);
    // rows = rows.filter(row => row.orderNr === salesorder.nr);

    // const artnummerFormat = new Intl.NumberFormat('nl-NL', { minimumSignificantDigits: 9 });
    return orderPage(salesorder,rows);
  }
  async function offertebon(orderNr) {
    const data = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'salesorder',
      id: orderNr,
    }).then(e => e.body);
    let [salesorders,rows] = data;
    const [salesorder] = salesorders;
    rows.forEach(row => row.storageLocation = row.newStorageLocation ? row.newStorageLocation.match(/../g).splice(1).map(Number).join('-') : (row.prodStockLocation||'').substr(0,3));
    rows = rows.filter(row => row.orderNr === salesorder.nr);
    rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
    console.log(salesorder, rows);
    return printElem().append(
      briefElem(salesorder, 'OFFERT BON').append(
        $('table').class('grid').append(
          $('thead').append(
            $('tr').append(
              $('th').align('left').text('Orderdatum'),
              $('th').align('left').text('OrderNr'),
              $('th').align('left').text('Debiteurnummer'),
              $('th').align('left').text('Referentie'),
            ),
          ),
          $('tbody').append(
            $('tr').append(
              $('td').text(new Date(salesorder.orderDateTime).toLocaleDateString()),
              $('td').text(salesorder.nr),
              $('td').text(salesorder.clientDebNr),
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
            $('tr').append(
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
              $('td').align('right').text(num(1.21 * rows.filter(row=>row.quant && row.netto).map(row =>row.quant * row.netto).reduce((tot,val)=>tot += val))),
            ),
          ),
        ),
      ),
    );
  }
  async function factuur(factuurNr) {
    factuurData = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'factuur',
      factuurNr: factuurNr,
    }).then(e => e.body);
    console.log(factuurNr,factuurData);
    const [clientInvoices, clientOrders, rows] = factuurData;
    const [invoice] = clientInvoices;
    const [salesorder] = clientOrders;
    if (!salesorder) return alert('FACTUUR HEEFT GEEN PAKBONNEN');

    rows.sort((a,b) => a.createdDateTime.localeCompare(b.createdDateTime));
    const mailtext = ''; // Exta tekst op mail naar klant
    salesorder.clientKortingContant = isNaN(salesorder.clientKortingContant) ? 0 : Number(salesorder.clientKortingContant);
    const els = {};
    let totaal = 0;
    let betaald = 0;
    const elem = printElem().append(
      briefElem(salesorder, 'FACTUUR ' + factuurNr).class('invoice').append(
        $('table').class('grid summary').style('margin-bottom:2mm;').append(
          $('thead').append(
            els.trh = $('tr').append(
              $('th').align('left').class('datum').text('Datum'),
              $('th').align('left').class('facnr').text('Factuur nummer'),
              $('th').align('left').class('debnr').text('Debiteur nummer'),
              $('th').align('left').class('btwnr').text('Debiteur BTW nummer'),
            )
          ),
          $('tbody').append(
            els.trb = $('tr').append(
              $('td').text(new Date(salesorder.invoiceDateTime || salesorder.abisInvoiceDateTime).toLocaleDateString()),
              $('td').text(factuurNr),
              $('td').text(invoice.clientDebNr),
              $('td').text(invoice.clientBtwNr),
            ),
          ),
        ),
        $('table').class('grid').append(
          $('thead').append(
            $('tr').append(
              $('th').align('right').text('Aantal'),
              $('th').align('left').text('Verpakking'),
              $('th').align('left').text('Artikel'),
              $('th').align('left').style('width:100%;').text('Omschrijving'),
              $('th').align('right').text('Prijs/St'),
              $('th').align('right').text('Totaal'),
            ),
          ),
          $('tbody').append(
            ...clientOrders.map(salesorder => [
              $('tr').append(
                $('td')
                .colspan(6)
                .align('left')
                .text(
                  `Leverbon: ${salesorder.nr}`,
                  salesorder.ref ? `uw referentie: ${salesorder.ref}`: '',
                  `Order datum: ${new Date(salesorder.orderDateTime).toLocaleDateString()}`,
                ),
              )
            ].concat(
              rows.filter(row => row.orderNr === salesorder.nr).map(row => $('tr').append(
                $('td').align('right').text(row.quant),
                $('td').text(row.unit),
                $('td').text(row.artNr),
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
            // $('tr').style('height:5mm;'),

            // !salesorder.clientKortingContant ? null : $('tr').append(
            //   $('td'),$('td'),$('td').text(`Korting contant over ${cur(totaal)}`),
            //   $('td').align('right').text(`${salesorder.clientKortingContant || 0}%`),$('td').align('right').text(cur(salesorder.kortingContant = salesorder.clientKortingContant ? totaal * salesorder.clientKortingContant / 100 : 0, totaal -= salesorder.kortingContant)),
            // ),

            // !invoice.kortContantProc ? null : $('tr').append(
            //   $('td'),$('td'),$('td').text(`Korting contant over ${cur(totaal)}`),
            //   $('td').align('right').text(`${invoice.kortContantProc}%`),$('td').align('right').text(cur(invoice.kortingContant = invoice.kortContantProc ? totaal * invoice.kortContantProc / 100 : 0, totaal -= invoice.kortingContant)),
            // ),

          ),
        ),
        $('table').class('grid summary').style('position:absolute;bottom:15mm;width:100%;').append(
          $('thead').append(
            els.trh = $('tr'),
          ),
          $('tbody').append(
            els.trb = $('tr'),
          ),
        ),
      ),
    )
    console.log(invoice);
    els.trh.append($('th'));
    els.trb.append($('td'));

    if (invoice.kortContantProc) {
      els.trh.append($('th').align('right').style('width:20mm;').text(`Subtotaal`));
      els.trb.append($('td').align('right').style('width:20mm;').text(cur(totaal)));
      els.trh.append($('th').align('right').style('width:20mm;').text(`Korting ${invoice.kortContantProc}%`));
      els.trb.append($('td').align('right').text(cur(invoice.kortingContant = invoice.kortContantProc ? totaal * invoice.kortContantProc / 100 : 0, totaal -= invoice.kortingContant)));
    }
    els.trh.append($('th').align('right').style('width:20mm;').text(`Excl`));
    els.trb.append($('td').align('right').style('width:20mm;').text(cur(totaal)));

    els.trh.append($('th').align('right').style('width:20mm;').text(`Btw ${invoice.btw}%`));
    els.trb.append($('td').align('right').text(cur(invoice.btwbedrag = totaal * invoice.btw/100, totaal += invoice.btwbedrag)));
    els.trh.append($('th').align('right').style('width:20mm;').text(`Incl`));
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
    const from = `invoice@${invoice.accountName.toLowerCase()}.nl`;
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
      accountName: salesorder.accountName,
      ordernummers: id,
    }).then(e => e.body);
    console.log(data);
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
      // ...salesorders.map(salesorder => [
      //   orderPage(salesorder, rows, {
      //     title: 'PAKBON INTERN',
      //     remark: salesorder.remark ? $('div').text(salesorder.remark).style('padding:2mm;border:solid 1px red;margin-top:2mm;') : null,
      //   }).style('page-break-before:always;'),
      //   orderPage(salesorder, rows, {
      //     title: 'PAKBON',
      //   }).style('page-break-before:always;'),
      // ]),
      ...salesorders.map(salesorder => orderPage(salesorder, rows)),
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
  function artHeader(row){
    const myart = clientart.find(a => a.artId === row.id);
    if (myart) {
      row.discount = myart.clientDiscount;
    }
    row.listPrice = Number(row.listPrice);
    row.purchaseDiscount = Number(row.purchaseDiscount);
    if (row.purchaseDiscount = Number(row.purchaseDiscount)) {
      row.purchasePrice = row.listPrice * (100 - row.purchaseDiscount) / 100;
    } else if (row.purchasePrice = Number(row.purchasePrice)) {
      row.purchaseDiscount = row.purchasePrice / row.listPrice * 100;
    }
    row.price = row.listPrice * (100 - row.discount) / 100;
    // console.log(row);
    const elem = $('div').class('price');
    if (row.discount) {
      elem.class('price discount', myart ? 'client' : '').append(
        $('span').attr('listprice', num(row.listPrice)),
        $('span').attr('discount', num(-row.discount,0)),
      );
    }
    elem.append(
      $('span').attr('price', num(row.price)),
      $('span').attr('fatprice', num(row.price * 1.21)),
      row.purchasePrice ? $('span').attr('purchaseprice', num(row.purchasePrice)) : null,
      row.purchaseDiscount ? $('span').attr('purchasediscount', num(row.purchaseDiscount)) : null,

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
  aim.config.components.schemas.company.app = {
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
        selectClient(row.name);
      }),
    ],
  }
  aim.config.components.schemas.salesorder.app = {
    nav: row => [
      $('button').class('icn-print').title('Bon printen').on('click', async e => (await order(row.nr)).print()),
      // $('button').text('TEST').on('click', async e => (await order1(row.nr)).print()),
      $('button').class('abtn').text('OffBon').title('Offert bon printen').on('click', async e => (await offertebon(row.nr))),
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
          $('button').text('Gepakt').on('click', async e => {
            await $().url('https://aliconnect.nl/api/abis/data').post({
              request_type: 'paklijst',
              id: aim.listRows.map(row => row.nr).join(','),
              set: 'pickDateTime = GETDATE()'
            });
            alert('Status gepakt');
          }),
          $('button').text('Verzonden').on('click', async e => {
            await $().url('https://aliconnect.nl/api/abis/data').post({
              request_type: 'paklijst',
              id: aim.listRows.map(row => row.nr).join(','),
              set: 'sendDateTime = GETDATE()'
            });
            alert('Status verzonden');
          }),
          $('button').text('Geleverd').on('click', async e => {
            await $().url('https://aliconnect.nl/api/abis/data').post({
              request_type: 'paklijst',
              id: aim.listRows.map(row => row.nr).join(','),
              set: 'deliverDateTime = GETDATE()'
            });
            alert('Status geleverd');
          }),
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
    },
    header: artHeader,
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
  aim.config.components.schemas.art.app = {
    header: artHeader,
  }
  aim.config.components.schemas.product.app = {
    header(row){
      const elem = $('div').class('price');
      var price;

      row.orderContent = row.orderContent == 1 ? row.partContent || 1 : row.orderContent;

      row.orderPackPrice = row.orderPackPrice || row.orderPartPrice * row.orderContent;
      row.orderDiscount = row.artikelInkKorting;
      if (!row.orderDiscount) {
        row.orderPackPrice *= 1.5;
        row.orderDiscount = 50;
      }

      row.orderPartPrice = row.orderPackPrice / row.orderContent;
      if (row.supplier) {
        var discount = row.orderDiscount;
        var style = 'color:lightgreen;font-size:1.2em';
        elem.append(
          $('div').append(
            $('span').text('€ ' + num(row.orderPackPrice)).style('text-decoration:line-through;'),
            ' (-' + num(discount).replace(/,00$|0$/g,'') + '%) € ',
            $('span').text(num(price = row.orderPackPrice*(100-discount)/100)).style(style),
            ' ',
            row.orderContent == 1 ? null : ' € ' + num(row.orderPartPrice*(100-discount)/100) + '/' + row.orderContentUnit,
            ' (€ ' + num(price * 1.21) + ' incl. btw) ',
            row.supplier,
          ),
        );
      }
      var discount = row.orderDiscount * 0.4;
      var style = 'color:lightblue;font-size:1.2em';
      elem.append(
        $('div').append(
          $('span').text('€ ' + num(row.orderPackPrice)).style('text-decoration:line-through;'),
          ' (-' + num(discount).replace(/,00$|0$/g,'') + '%) € ',
          $('span').text(num(price = row.orderPackPrice*(100-discount)/100)).style(style),
          ' ',
          row.orderContent == 1 ? null : ' € ' + num(row.orderPartPrice*(100-discount)/100) + '/' + row.orderContentUnit,
          ' (€ ' + num(price * 1.21) + ' incl. btw) ',
        ),
      );
      if (row.clientDiscount) {
        var discount = row.clientDiscount;
        var style = 'color:orange;font-size:1.2em';

        elem.append(
          $('div').append(
            $('span').text('€ ' + num(row.orderPackPrice)).style('text-decoration:line-through;'),
            ' (-' + num(discount).replace(/,00$|0$/g,'') + '%) € ',
            $('span').text(num(price = row.orderPackPrice*(100-discount)/100)).style(style),
            ' ',
            row.orderContent == 1 ? null : ' € ' + num(row.orderPartPrice*(100-discount)/100) + '/' + row.orderContentUnit,
            ' (€ ' + num(price * 1.21) + ' incl. btw) ',
            row.clientName,
          ),
        );
      }
      elem.append(
        $('div').append(
          'Verzending in: ',
          $('b').text(row.verzending).style('color:green;'),
          elem.input = $('input').type('number').step(1).min(0).value(row.quant).on('change', e => {
            row.quant = Number(e.target.value);
            console.log(row.quant);
          }).on('click', e => {
            e.stopPropagation();
          }),
        )
      );


      return elem;

      const myart = clientart.find(a => a.artId === row.id);
      if (myart) {
        row.discount = myart.clientDiscount;
      }
      row.listPrice = Number(row.listPrice);
      row.purchaseDiscount = Number(row.purchaseDiscount);
      if (row.purchaseDiscount = Number(row.purchaseDiscount)) {
        row.purchasePrice = row.listPrice * (100 - row.purchaseDiscount) / 100;
      } else if (row.purchasePrice = Number(row.purchasePrice)) {
        row.purchaseDiscount = row.purchasePrice / row.listPrice * 100;
      }
      row.price = row.listPrice * (100 - row.discount) / 100;
      // console.log(row);
      // const elem = $('div').class('price');
      if (row.discount) {
        elem.class('price discount', myart ? 'client' : '').append(
          $('span').attr('listprice', num(row.listPrice)),
          $('span').attr('discount', num(-row.discount,0)),
        );
      }
      elem.append(
        $('span').attr('price', num(row.price)),
        $('span').attr('fatprice', num(row.price * 1.21)),
        row.purchasePrice ? $('span').attr('purchaseprice', num(row.purchasePrice)) : null,
        row.purchaseDiscount ? $('span').attr('purchasediscount', num(row.purchaseDiscount)) : null,

        $('span'),
        elem.input = $('input').type('number').step(1).min(0).value(row.quant).on('change', e => {
          row.quant = Number(e.target.value);
          console.log(row.quant);
        }).on('click', e => {
          e.stopPropagation();
        }),
      );
      return elem;
    },
    header(row){
      const elem = $('div').class('price');
      var price;
      var listPrice = row.inkPackPrice || row.purchaseListPrice || row.listPrice;

      // if (row.purchaseListPrice && row.purchaseListPrice != listPrice) {
      //   elem.append(
      //     $('div').append(
      //       'inkoop bruto gewijzigd ',
      //       $('span').text('€ ' + num(row.purchaseListPrice)).style('text-decoration:line-through;'),
      //       ' € ',
      //       $('span').text(num(price = listPrice)).style('color:red;font-size:1.2em'),
      //     ),
      //   );
      // }

      if (!row.purchaseDiscount) {
        listPrice *= 2;
        row.purchaseDiscount = 60;
      }
      row.purchaseDiscount = Math.round( row.purchaseDiscount * 10 ) / 10;
      discount = Math.floor( ( row.discount || (row.purchaseDiscount / 3) ) * 10 ) / 10;

      var style = 'color:lightgreen;';
      // elem.append(
      //   $('div').style('font-size:0.8em;').append(
      //     'Inkoop € ',
      //     $('span').text(num(price = listPrice*(100-row.purchaseDiscount)/100)).style(style),
      //     ' (€ ' + num(price * 1.21) + ' incl. btw) ',
      //     // $('span').text('€ ' + num(row.purchaseListPrice)).style('text-decoration:line-through;'),
      //     ' korting ',
      //     $('span').style('color:green;').text(num(row.purchaseDiscount).replace(/,00$|0$/g,'') + '%'),
      //     row.inkPackPrice ? '' : ' (niet gekoppeld)',
      //   ),
      // );



      var style = 'color:orange;';
      if (row.clientArtDiscount) {
        discount = Math.floor( row.clientArtDiscount * 10 ) / 10;
        elem.append(
          $('div').append(
            $('span').text('€ ' + num(listPrice)).style('text-decoration:line-through;'),
            ' € ',
            $('span').text(num(price = listPrice*(100-discount)/100)).style(style+'font-size:1.2em;'),
            ' (€ ' + num(price * 1.21) + ' incl. btw) ',
            ' korting ',
            $('span').style(style).text(num(discount).replace(/,00$|0$/g,'') + '%')
            ,' (alleen voor jou)',
          ),
        );
      } else {
        var style = 'color:lightblue;';
        elem.append(
          $('div').append(
            $('span').text('€ ' + num(listPrice)).style('text-decoration:line-through;'),
            ' € ',
            $('span').text(num(price = listPrice*(100-discount)/100)).style(style+'font-size:1.2em;'),
            ' (€ ' + num(price * 1.21) + ' incl. btw) ',
            ' korting ',
            $('span').style(style).text(num(discount).replace(/,00$|0$/g,'') + '%')
          ),
        );
      }
      row.verzending = row.stock ? '0-1 dag' : '1-4 dagen';
      elem.append(
        $('div').append(
          $('span').style('font-size:0.8em;').append(
            'Verzending in: ',
            $('b').text(row.verzending).style('color:green;'),
            row.stock ? [
              ' (nog ',
              $('b').text(row.stock).style('color:green;'),
              ' beschikbaar)',
            ] : null,
          ),
          elem.input = $('input')
          .tabindex(-1)
          .type('number').step(1).min(0).value(row.quant).on('change', e => {
            row.quant = Number(e.target.value);
            console.log(row.quant);
          }).on('click', e => {
            e.stopPropagation();
          }),
        )
      );

      return elem;
    },
  }

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

  function artrow(row, filter){
    if (!row.title) return;
    filter['toepassing'] = { name: 'toepassing', title: 'Toepassing', values: {} };
    filter['productgroep'] = { name: 'productgroep', title: 'Productgroep', values: {} };
    filter['product'] = { name: 'product', title: 'Product', values: {} };
    filter['purchaseDiscount'] = { name: 'purchaseDiscount', title: 'Inkoopkorting', values: {} };

    const options = row.options = {};
    row.title = row.title.replace(/\r\n|™/g, '');

    const product = productlist.find(p => row.title.match(p.exp) );
    if (product) {
      row.title = row.title.replace(product.exp, '');
      row.product = product.name;
      row.toepassing = product.toepassing;
      row.productgroep = product.productgroep || row.artGroup;
    }

    row.listPrice = Number(row.listPrice);
    row.purchaseDiscount = Number(row.purchaseDiscount);
    if (row.purchaseDiscount = Number(row.purchaseDiscount)) {
      row.purchasePrice = row.listPrice * (100 - row.purchaseDiscount) / 100;
    } else if (row.purchasePrice = Number(row.purchasePrice)) {
      row.purchaseDiscount = row.purchasePrice / row.listPrice * 100;
    }
    row.price = row.listPrice * (100 - row.discount) / 100;

    function match(name, exp, exp2){
      const match = row.title.match(exp);
      if (match) {
        filter[name] = { name: name, title: name, values: {}};
        // cols.push({ name: name, title: name, })
        // console.log(name)
        // console.log(row.title)
        row.title = row.title.replace(exp,'').replace(/\s-|\(\)|-$/,'').replace(/\s\s/,' ').trim();
        options[name] = row[name] = match[1].replace(/,/g, '.').replace(/\.$/, '').replace(exp2, '').trim().toLowerCase().replace(/\w/, s => s.toUpperCase());
        // console.log(match)
      }
    }

    // console.log('START')
    match('Merk', /(3M)/);
    match('Merk', /(3M)/);
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

    // match('Afmeting', /(\d+?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)?\s*x\s*M\d+)/i);
    // match('Afmeting', /((\d[\d|\.|,\/]*)?(mm|)?([\s|x]*|)?([\d|\.|,\/]+|)?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m))/i);

    // match('Afmeting', /(([\d|\.|,|\/]+?)(\s*)?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)(|)\s*?(x|-|\/)\s*|)?(([\d|\.|,]+?)\s*?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)\s*?(x|-|\/)\s*|)?([\d|\.|,]+?)\s*?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m))/i);

    // match('Afmeting', /(([\d|\.|,|\/]+?)\s*?(?:x|mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m))\b/i);
    // match('Afmeting', /([\d]+\sx\s[\d]+)/i);

    // match('maat', /(\b(M|L|S|XL|XXL|Large|Medium|Small|XLarge|XXLarge)\b\s*?[\d|-]+)/);


    // if (match = row.title.match(/([\d|\.|,]+\s*x\s*[\d|\.|,]+)/i)) {
    //   row.title = row.title.replace(match[0],'');
    //   row.afmeting = match[1].replace(/\s/g,'').replace(/x/g,' x ').replace(/(\d+)/g,'$1mm').replace(/,/g, '.');
    // }
    row.title = row.title
    .replace(/^\w/, s => s.toUpperCase())
    .replace(new RegExp(row.prodBrand, 'i'), '')
    .replace(/\sPU/, '-PU')
    .replace(/--/g, '-')
    .replace(/,/g, '')
    .replace(/  /g, ' ')

    // options.omschrijving = row.description;
    // options.leverancier = row.supplierName;
    // options.bestelcode = row.orderCode;
    // row.title = row.product + Object.entries(options).map(entry => entry.join(':')).join(', ');
    row.title = [row.product, row.title].concat(Object.values(row.options)).filter(Boolean).join(', ');
  }
  function description(s){
    if (s && s !== 'NB') return s.replace(/™|®/g,'').replace(/  /g,' ').trim();
  }


  // aim.config.components.schemas.levart.app = {
  //   precompile: artrow,
  //   header: artHeader,
  // }

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
  aim.config.import.forEach(imp => {
    for (let tab of imp.tabs) {
      tab.callback = async row => {
        return await $().url('https://aliconnect.nl/api/abis/data')
        .query({request_type: 'art_ink'})
        .input(row)
        .post()
      }
    }
  });
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
  // console.log(aim.config.import);
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
  function readBinary(file){
    return new Promise((resolve,fail) => {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      // reader.onprogress = e => console.log(e);
      reader.onload = e => resolve(e.target.result);
    })
  }
  async function importFiles1(files){
    let allrows = [];
    files = Array.from(files);
    for (var file of files) {
      $('span.main').text('import:', file.name);
      if (file.name.match(/\.xls/)) {
        const result = await readBinary(file);
        const workbook = XLSX.read(result, { type: 'binary' });
        for (let sheetname of workbook.SheetNames) {
          const sheet = workbook.Sheets[sheetname];
          if (sheet['!ref']) {
            let [s,colEnd,rowEnd] = sheet['!ref'].match(/:([A-Z]+)(\d+)/);
            // console.log(sheet['!ref'], colEnd,rowEnd);
            colEnd = XLSX.utils.decode_col(colEnd);
            let maxCol = 0;
            const rows = [];
            for (var r = 1; r<=rowEnd; r++) {
              const row = [];
              for (var c=0; c<=colEnd; c++) {
                var sheetcell = sheet[XLSX.utils.encode_cell({c:c,r:r-1})];
                var cell = null;
                if (sheetcell) {
                  maxCol = Math.max(maxCol,c);
                  if (sheetcell.l) {
                    cell = {
                      v: sheetcell.l.display,
                      href: sheetcell.l.Target,
                    }
                  } else {
                    cell = {
                      v: sheetcell.v,
                    }
                  }
                }
                row.push(cell);
              }
              rows.push(row);
            }
            rows.forEach(row => row.length = maxCol + 1);
            // console.log(file.name, sheetname, maxCol, rows);
            $('span.main').text('upload:', file.name, sheetname);
            await $().url('https://aliconnect.nl/api/abis/data')
            .input(rows)
            .query({
              request_type: 'importdata',
              filename: file.name + '-' + sheetname,
            })
            .post()
            .then(console.log)
          }
        }
      }
      $('span.main').text('import done');
    }
  }
  async function importFiles(files){
    let allrows = [];
    files = Array.from(files);
    for (var file of files) {
      $('span.main').text('import:', file.name);
      console.log(file.name, aim.config.import);
      for (fileConfig of aim.config.import.filter(fileConfig => file.name.match(fileConfig.filename.toLowerCase()))) {
        const result = await readBinary(file);
        const workbook = XLSX.read(result, { type: 'binary' });
        for (let tab of fileConfig.tabs) {
          if (tab.disabled || !workbook.Sheets[tab.tabname]) continue;
          $('span.main').text('import:', file.name, tab.tabname);
          console.log(tab);
          // return;
          const data = {
            rows: [],
          };
          const prefixArtcode = tab.artcode || '';
          tab.colRow = tab.colRow || 1;
          const sheet = workbook.Sheets[tab.tabname];
          const toprow = [];
          // console.log(sheet);
          let [s,colEnd,rowEnd] = sheet['!ref'].match(/:([A-Z]+)(\d+)/);
          colEnd = XLSX.utils.decode_col(colEnd);
          function rowvalue(r,c){
            var cell = sheet[XLSX.utils.encode_cell({c:c,r:r-1})];
            if (cell) {
              if (cell.l) {
                return `(${cell.l.display})[${cell.l.Target}]`;
              }
              // console.log(c,r,cell)
              return cell.v;
            }
          }
          for (var c=0; c<=colEnd; c++) {
            toprow[c] = rowvalue(tab.colRow,c);
          }
          // console.log(toprow);
          // const progressElem = $('footer>progress').max(rowEnd).value(tab.colRow);
          // const infoElem = $('footer>.main');
          const rowStart = tab.colRow;
          for (let cols of tab.cols) {
            for (var name in cols) {
              if (typeof cols[name] !== 'function' && String(cols[name]).match(/return /)) {
                cols[name] = new Function('row', cols[name]);
              }
            }
          // console.log(tab.cols);
            for (var r = tab.colRow+1; r<=rowEnd; r++) {
              let row;
              for (var name in cols) {
                var value;
                if (Array.isArray(cols[name])) {
                  value = cols[name].map(c => rowvalue(r, XLSX.utils.decode_col(c))).join(' ');
                  // console.log(name, tab.cols[name]);
                } else if (typeof cols[name] === 'function') {
                  try {
                    value = cols[name](row) || '';
                  } catch(err) {

                  }
                } else if (toprow.includes(name)) {
                  value = rowvalue(r, toprow.indexOf(name));
                } else if (toprow.includes(cols[name])) {
                  value = rowvalue(r, toprow.indexOf(cols[name]));
                } else {
                  value = cols[name];
                }
                if (value !== undefined) {
                  (row = row || {})[name] = value;
                }
              }
              if (row) {
                // console.log(row);
                // return;
                data.rows.push(row);
                allrows.push([row, tab]);
              }
            };
          }
        }
      }
    }
    // return;
    console.log(allrows);
    allrows = allrows.filter(entry => entry[0].keyGroup && entry[0].keyName && (entry[0].packPrice || entry[0].packListPrice || entry[0].partListPrice || entry[0].partPrice));
    console.log(allrows);
    var max = allrows.length;
    var i = 0;
    const progressElem = $('footer>progress').max(max).value(i);
    for (var [row,tab] of allrows) {
      // $('span.main').text(max + ':' + i, Math.round(i/max*100) + '%', tab.tabname, row.code, row.description);
      $('span.main').text(max + ':' + i, Math.round(i/max*100) + '%', tab.tabname, row.packKeyGroup, row.packKeyName, row.partKeyGroup, row.partKeyName);
      try {
        // console.log(row);
        await tab.callback(row);
      } catch (err) {
        console.error(row);
      }
      // return;
      progressElem.value(++i);
    }
    $('span.main').text('import done');
    progressElem.value(null);
    // alert('Import gereed');
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
    partArtNr: { h:'Product ArtNr', },
    partArtCode: { h:'Product ArtCode', },
    artCode: { h:'Artikel code', },
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

    inkSds: { h:'Sds', },
    inkTds: { h:'Tds', },

    partCode: { h:'Code', },
    partDescription: { h:'Oms', },

    vosPerEenh: { h:'VOS', },

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
      top: 10000,
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
      { toepassing: 'Diversen', name: 'Bumperspray', exp: /\b(Bumperspray)\b/i, },


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
          row.title = row.title.replace(exp,'').replace(/\s-|\(\)|-$/,'').replace(/\s\s/,' ').trim();

          // console.log(match[1]);
          row['part'+name] = (match[1] || match[0])
          .replace(/,/g, '.')
          .replace(/\.$/, '')
          .replace(exp2, '')
          .trim()
          // .toLowerCase()
          .replace(/\w/, s => s.toUpperCase());
          // console.log(match)
        }
      }
      var title = row.title.replace(/\r|\n/g,'');

      row.title = row.partDescription
      .replace(/Max Meyer/,'MaxMeyer')
      .replace(/2-K/,'2K')
      .replace(/1-K/,'1K')
      .replace(/\r|\n/g,'');
      match('Gaten', /(\d+)\s*?(gaten\s\d+mm|gaten|gat|gaat)/i);
      // match('Merk', /(3M)/);
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
      match('Maat', /\b(M|L|S|XL|XXL|Large|Medium|Small|XLarge|XXLarge)\b/);
      match('Grofte', /(P\d+)/i);
      match('Grofte', /((grofte|korrel)\s*?\d+)/i, /grofte|korrel|\s/);
      match('RAL', /ral\s*?(\d+)/i);
      match('Aantal', /([\d|\.|,|x|\s]+?(st\.|st\b))/i);
      match('Kleur', /\b(roos|oranje|orange|red oxyde|red|black|blue phtalo|green phtalo|bright red|chrome yellow|cold yellow|dark rose|extra fine aluminium|fine aluminium|donker antraciet|antraciet|donkergrijs|lichtgrijs|donker grijs|licht grijs|blauw|geel|groen|grijs|wit|geel|zwart|bruin|rood)\b/i);
      match('Serie', /Aquamax|Deltron|Hookit|Abralon|Abranet/i);
      match('Brand', /3M|Mirka|MaxMeyer|Nexa|Airo|Selemix|Hamach|Color Matic/);

      ['Aantal','Inhoud','Dikte','Diameter','Afmeting'].forEach(name => {
        if (row[name]) {
          row[name] = row[name].toLowerCase().replace(/([\d|\.|\/]+)/, ' $1 ').replace(/x/, ' x ').replace(/\s\s/, ' ').replace(/µm|mµ|µ/, 'µm')
        }
      })


      const product = productlist.find(p => row.title.match(p.exp) );
      if (product) {
        row.title = row.title.replace(product.exp, '');
        row.product = product.name;
        row.toepassing = product.toepassing;
        row.categorie = product.categorie || row.artGroup;
      }

      row.title = [
        row.product,
        row.title
        .replace(row.partCode,'')
        .replace(row.partBrand,'')
        .replace(/,/g,'')
        .replace(/  /g,' ')
        .trim(),
        row.partGaten,
        row.partInhoud,
        row.partMaat,
        row.partSpanning,
        row.partVermogen,
        row.partDichtheid,
        row.partHittebestendig,
        row.partSchroefdraad,
        row.partDikte,
        row.partDiameter,
        row.partAfmeting,
        row.partMaat,
        row.partGrofte,
        row.partKleur,
        row.partRAL,
        row.partAantal,
        row.partBrand,
        row.partSerie,
        row.partCode,
      ].filter(Boolean).join(', ');

      // console.log(row);

      row.title = title;

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
        if (n==='inkSds') return {
          f: `=HYPERLINK("${row.inkSds}","SDS")`,
          v: 'SDS',
        }
        return Object.assign({ v:row[n] || '' }, cols[n]);
      });
    });
    var index = colnames.filter(n => cols[n].h).indexOf('title');
    ws_data.sort((a,b) => (a[index].v||'').localeCompare((b[index].v||'')));
    var index = colnames.filter(n => cols[n].h).indexOf(sortby);
    ws_data.sort((a,b) => (a[index].v||'').localeCompare((b[index].v||'')));

    // console.log(ws_data);

    ws_data.unshift(colnames.filter(n => cols[n].h).map(n => Object({v:cols[n].h})));
    // console.log('updated', ws_data);
    $('.pv').text('');
    $('.lv').text('').append(
      $('nav').append(
        $('button').text('excel').on('click', e => toExcel()),
      ),
      $('div').style('overflow: overlay').append(
        $('table').append(
          ws_data.map(row => $('tr').append(
            row.map(
              v => $('td').align(v && v.t === 'n' ? 'right' : 'left').text(v && v.v && v.t === 'n' ? num(v.v, v.z ? String(v.z.match(/0/g)).length-1 : 2) : v.v || '')
            ),
          )),
        )
      )
    );
  }

  aim.om.treeview({
    Inkoop: {
      Producten: e => aim.list('artink',{
        $search: ``,
      }),
    },
    CRM: {
      Organisaties: e => aim.list('company',{
        $filter: `archivedDateTime EQ NULL`,
        $search: ``,
      }),
      Archief: e => aim.list('company',{
        $filter: `archivedDateTime NE NULL`,
        $search: ``,
      }),
      "Klanten Actief Mailadressen": async e => {
        const [rows] = await aim.req('https://aliconnect.nl/api/abis/data').query({request_type: 'klanten_actief_mailadressen'}).then(res=>res.json());
        var promise = navigator.clipboard.writeText(rows.map(row=>row.email).join('; '));
      },
      "Klanten PPG Mailadressen": async e => {
        const [rows] = await aim.req('https://aliconnect.nl/api/abis/data').query({request_type: 'klanten_ppg_mailadressen'}).then(res=>res.json());
        var promise = navigator.clipboard.writeText(rows.map(row=>row.email).join('; '));
      },

      // Analyse: {
      //   Airo: () => analyseBedrijf('Airo'),
      //   Proving: () => analyseBedrijf('Proving'),
      //   async Voorraad() {
      //     const data = await fetch('https://aliconnect.nl/api/abis/data?request_type=report-voorraad').then(res => res.json());
      //     const [arts] = data;
      //     function magcode(code){
      //       var a = (code||'').split('');
      //       a[0] = ('00' + '-IJKLMNOP--ABCDEFGH'.split('').indexOf(a[0])).slice(-2);
      //       a[1] = ('00' + '-ABCDEFGHIJKLMNOP'.split('').indexOf(a[1])).slice(-2);
      //       a[2] = ('00' + a[2]).slice(-2);
      //       return a.join('.');
      //     }
      //     const elem = $('div').parent(
      //       $('div').parent(
      //         $('.lv').text('').append(
      //           $('nav').append(
      //             $('span'),
      //             $('button').class('icn-print').on('click', e => elem.print()),
      //           ),
      //         )
      //       )
      //     );
      //     elem.append(
      //       clienttable(arts, {
      //         Omschrijving: row => $('td').text(row.Omschrijving),
      //         MagLokatie: row => $('td').style('font-family:consolas;').text(row.MagLokatie, magcode(row.MagLokatie)),
      //         Voorraad: row => $('td').text(row.Voorraad),
      //       }),
      //     )
      //   },
      //   async Verloop() {
      //     const data = await fetch('https://aliconnect.nl/api/abis/data?request_type=report-verkoop-verloop').then(res => res.json());
      //   },
      // }
    },
    Orders: {
      Actief: e => aim.list('salesorder',{
        $filter: `isQuote NE 1 && isOrder NE 0 && invoiceNr EQ 0`,
        $order: `nr DESC`,
        $search: '*',
      }),
      Mandje: e => aim.list('salesorder',{
        $filter: `isOrder NE 1`,
        $order: `nr DESC`,
        $search: '*',
      }),
      Aanbieding: e => aim.list('salesorder',{
        $filter: `isQuote NE 0`,
        $order: `nr DESC`,
        $search: '*',
      }),
      // Nieuw: e => aim.list('salesorder',{
      //   $filter: `isQuote NE 1 && isOrder EQ 1 && printDateTime EQ NULL`,
      //   $order: `nr DESC`,
      //   $search: '*',
      // }),
      // Actief: e => aim.list('salesorder',{
      //   $filter: `isQuote NE 1 && printDateTime NE NULL && pickDateTime EQ NULL`,
      //   $order: `nr DESC`,
      //   $search: '*',
      // }),
      // Verzendgereed: e => aim.list('salesorder',{
      //   $filter: `isQuote NE 1 && pickDateTime NE NULL && sendDateTime EQ NULL`,
      //   $order: `nr DESC`,
      //   $search: '*',
      // }),
      // Optransport: e => aim.list('salesorder',{
      //   $filter: `isQuote NE 1 && sendDateTime NE NULL && deliverDateTime EQ NULL`,
      //   $order: `nr DESC`,
      //   $search: '*',
      // }),
      // Geleverd: e => aim.list('salesorder',{
      //   $filter: `isQuote NE 1 && deliverDateTime NE NULL && invoiceNr EQ 0`,
      //   $order: `nr DESC`,
      //   $search: '*',
      // }),
      // OnHold: e => aim.list('salesorder',{
      //   $filter: `isQuote NE 1 && onHold EQ 1`,
      //   $order: `nr DESC`,
      //   $search: '*',
      // }),
      // Overig: e => aim.list('salesorder',{
      //   $filter: `ISNULL(invoiceNr,0) GT 0`,
      //   $order: `nr DESC`,
      //   $search: ``,
      // }),
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
        $search: '*',
      }),
      'Facturen Betaald': e => aim.list('invoice',{
        $filter: `isbetaald EQ 1`,
        $order: `nr DESC`,
        $search: '',
      }),
      'Facturen Alles': e => aim.list('invoice',{
        $order: `nr DESC`,
        $search: '',
      }),
      Afas: {
        'Export Facturen Airo': e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=afas_boek_export&bedrijf=airo',
        'Export Facturen Proving': e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=afas_boek_export&bedrijf=proving',
        'Import'() {
          $('input').type('file').multiple(false).accept('.xlsx').on('change', e => importFiles(e.target.files)).click().remove()
        },
      },
      // Doorfacturatie: e => document.location.href = 'https://aliconnect.nl/api/abis/data?request_type=doorfacturatie',
    },
    Magazijn: {
      Opslag___() {
        $().url('https://aliconnect.nl/api/abis/data').query({
          request_type: 'storage',
        }).get().then(e => {
          const [arts] = e.body;
          // const storageLocations = arts.map(a=>a.storageLocation).unique();
          // console.log(storageLocations);
          // art.length=100;
          // arts.forEach(a=>a.storageLocation = a.storageLocation || a.prodStorageLocation || 'xxx');
          arts.forEach(a=>a.artNr = a.artNr||a.prodArtNr||a.orderCode);
          arts.forEach(a=>a.locCode = locCode(a.prodStorageLocation||a.storageLocation||''));
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
                  // console.log(artlist);
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
      Opslag() {
        $().url('https://aliconnect.nl/api/abis/data').query({
          request_type: 'storage',
        }).get().then(e => {
          const [arts] = e.body;
          arts.forEach(a=>a.artNr = a.artNr||a.prodArtNr||a.orderCode);
          arts.forEach(a=>a.locCode = locCode(a.prodStorageLocation||a.storageLocation||''));
          // arts.sort((a,b)=>a.artNr.localeCompare(b.artNr));
          // arts.sort((a,b)=>a.locCode.localeCompare(b.locCode));
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
              $('input').style('font-size:20px;').on('keyup', e => {
                if (e.code === 'Enter') {
                  const value = e.target.value;
                  // e.target.value = '';
                  // if (value[0]==='0' && value[1]==='0') {
                  //   console.log(value);
                  //   const loc = value.slice(-6).match(/../g).map(Number).join('.');
                  //   elems.locatie.text(loc);
                  //   var artlist = arts.filter(a => a.locCode === loc);
                  // } else {
                  //   elems.ean.text(value);
                  //   var artlist = arts.filter(a => a.ean == value);
                  // }
                  console.log(arts);
                  const avalue = value.split(' ');
                  var artlist = arts.filter(a => avalue.every(value => [
                    a.ean,
                    a.loc1,
                    a.loc,
                    a.prodTitle,
                    a.artNr,
                    a.orderCode,
                  ]
                    .some(v => v && v.toLowerCase().includes(value))
                  ));
                  console.log(artlist);
                  elems.art.text('').append(
                    artlist.map((a,i) => [
                      $('div').text([a.prodTitle, a.id, a.loc1].join(', ')),
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
                        a.locElem = $('input')
                        .style('width: 120px;')
                        .value(a.loc)
                        .type('number')
                        .step(1)
                        .placeholder('locatie')
                        .on('change', e => {
                          $().url('https://aliconnect.nl/api/abis/data').query({
                            request_type: 'storageSave',
                          }).post({
                            id: a.id,
                            name: 'loc',
                            value: a.loc = e.target.value,
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
                        a.vosElem = $('input')
                        .style('width: 80px;')
                        .value(a.vos)
                        .type('number')
                        .placeholder('VOS')
                        .on('change', e => {
                          $().url('https://aliconnect.nl/api/abis/data').query({
                            request_type: 'storageSave',
                          }).post({
                            id: a.id,
                            name: 'vos',
                            value: a.vos = e.target.value,
                          })
                        }),
                        a.vosPerEenhElem = $('input')
                        .style('width: 80px;')
                        .value(a.vosPerEenh)
                        .type('number')
                        .placeholder('VOS/Eenheid')
                        .on('change', e => {
                          $().url('https://aliconnect.nl/api/abis/data').query({
                            request_type: 'storageSave',
                          }).post({
                            id: a.id,
                            name: 'vosPerEenh',
                            value: a.vosPerEenh = e.target.value,
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
      Opslag2() {
        $().url('https://aliconnect.nl/api/abis/data').query({
          request_type: 'storage',
        }).get().then(e => {
          const [arts] = e.body;
          // const storageLocations = arts.map(a=>a.storageLocation).unique();
          // console.log(storageLocations);
          // art.length=100;
          // arts.forEach(a=>a.storageLocation = a.storageLocation || a.prodStorageLocation || 'xxx');
          arts.forEach(a=>a.artNr = a.artNr||a.prodArtNr||a.orderCode);
          arts.forEach(a=>a.locCode = locCode(a.prodStorageLocation||a.storageLocation||''));
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
      'Opruimen locaties'() {
        $().url('https://aliconnect.nl/api/abis/data').query({
          request_type: 'storage',
        }).get().then(e => {
          const [artlist] = e.body;
          console.log(artlist);

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
      async ArtikelAnalyse() {
        const [lev,levart] = await fetch('http://localhost/api/abis/data?request_type=artanalyseLevArt').then(r => r.json());
        const [art] = await fetch('http://localhost/api/abis/data?request_type=artanalyseArt&select=id,artNr,orderCode,supplier,prodBrand,prodArtNr,prodCode,prodTitle,prodInhoud,prodInhoudEenheid,unit,quantity,bruto,purchaseDiscount,newStorageLocation,stockStart,stock').then(r => r.json());
        $(document.documentElement).class('dark');
        const products = [];


        levart.forEach(row => {
          if (!row.description) return;
          const options = row.options = {};
          row.product = row.description || '';

          row.product = row.product.replace(/\r\n|™/, '');
          const product = productlist.find(p => row.product.match(p.exp) );
          if (product) {
            row.product = product.name + ' ' + row.product.replace(product.exp, '')
          }

          function match(name, exp, exp2 = /\s/){
            const match = row.product.match(exp);
            if (match) {
              row.product = row.product.replace(exp,'').replace(/\s-|\(\)|-$/,'').replace(/\s\s/,' ').trim();
              options[name] = match[1].replace(/,/g, '.').replace(/\.$/, '').replace(exp2, '').trim();
            }
          }
          match('merk', /(^3M)/i);

          match('dikte', /(\d+\s*?(µm|mµ|µ))/i);
          match('kleur', /\b(roos|oranje|orange|red oxyde|red|black|blue phtalo|green phtalo|bright red|chrome yellow|cold yellow|dark rose|extra fine aluminium|fine aluminium|donker antraciet|antraciet|donkergrijs|lichtgrijs|donker grijs|licht grijs|blauw|geel|groen|grijs|wit|geel|zwart|bruin|rood)\b/i);
          match('inhoud', /([\d|\.|,]+\s*?(ml|ltr|l|gr\.|gr|kg\.|kg|paar|g)\b)/i);
          match('maat', /(\b(mt\.:|mt:|maat:|maat)(\s+?)(\d+|[A-Z]+))/i, /mt\.:|mt:|maat:|maat|\s/);
          match('diameter', /Ø\s*?(\d+(mm|))/i);
          match('spanning', /(\d+(V))\b/i);
          match('vermogen', /(\d+(W))\b/i);
          match('dichtheid', /(\d+\s*?(g\/m²))/i);
          match('Hittebestendig', /(\d+°)/);
          match('schroefdraad', /(M\d+\s*?x[\d|,]+)/i);
          match('afmeting', /(\d+?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)?\s*x\s*M\d+)/i);
          match('afmeting', /((([\d|\.|,]+?)\s*?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)\s*?(x|-|\/)\s*|)?(([\d|\.|,]+?)\s*?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)\s*?(x|-|\/)\s*|)?([\d|\.|,]+?)\s*?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m))/i);
          match('afmeting', /([\d]+\sx\s[\d]+)/i);
          match('gaten', /(\d+)\s*?(gaten\s\d+mm|gaten|gat|gaat)/i);
          // match('maat', /(\b(M|L|S|XL|XXL|Large|Medium|Small|XLarge|XXLarge)\b\s*?[\d|-]+)/);
          match('maat', /\b(M|L|S|XL|XXL|Large|Medium|Small|XLarge|XXLarge)\b/);
          match('grofte', /(P\d+)/i);
          match('grofte', /(grofte\s*?\d+)/i, /grofte|\s/);
          match('ral', /ral\s*?(\d+)/i);
          match('aantal', /([\d|\.|,|x|\s]+?(st\.|st\b))/i);

          // if (match = row.title.match(/([\d|\.|,]+\s*x\s*[\d|\.|,]+)/i)) {
          //   row.title = row.title.replace(match[0],'');
          //   row.afmeting = match[1].replace(/\s/g,'').replace(/x/g,' x ').replace(/(\d+)/g,'$1mm').replace(/,/g, '.');
          // }
          row.product = row.product
          .replace(/^\w/, s => s.toUpperCase())
          .replace(new RegExp(row.prodBrand, 'i'), '')
          .replace(/\sPU/, '-PU')
          .replace(/--/g, '-')
          .replace(/schuursch\./, 'schuurschijf')
          .replace(/klitteb\./, 'klitteband')
          // .replace(/schuurschijven/, 'schuurschijf')
          .replace(/polyester plamuur/, 'polyesterplamuur');

          options.leverancier = row.supplierName;
          options.bestelcode = row.orderCode;
          row.productoptions = Object.entries(options).map(entry => entry.join(':')).join(', ');

          var prod = products.find(prod => prod.name === row.product);
          if (!prod) products.push(prod = {product: row.product, art: []});
          prod.art.push(row);
        })

        levart.sort((a,b) => String(a.product).localeCompare(String(b.product)) || String(a.productoptions).localeCompare(String(b.productoptions)));


        table = $('table').parent($(document.body).class('lv').style('background:black;font-family:consolas;').text(''));
        levart.forEach(art => {
          table.append(
            $('tr').append(
              $('td').text(art.id),
              $('td').text(art.product),
              $('td').text(art.productoptions),
              $('td').text(art.packageUnit),
              $('td').text(art.catalogPrice),
              $('td').text(art.purchaseDiscount),
              $('td').text(art.purchasePrice),
              // $('td').text(art.orderCode),
              // $('td').text(art.supplierName),
              $('td').text(art.description),
            )
          )
        });
        return;
        products.forEach(prod => {
          prod.art.forEach(art => {
            table.append(
              $('tr').append(
                $('td').text(prod.product),
                $('td').text(art.description),
                $('td').text(art.title),
              )
            )
          })
        });
        return;

        art.forEach(row => {
          row.artikelCode = [
            (row.prodBrand||'p').substr(0,3),
            row.prodCode||row.prodArtNr,
            row.quantity > 1 ? row.quantity : '',
          ].filter(Boolean).join('-').toUpperCase();
          row.title = row.prodTitle;

          row.title = row.title.replace(/\r\n/, '');

          var match;

          if (match = row.title.match(/([\d|\.|,]+?(ml|ltr|l))/i)) {
            row.title = row.title.replace(match[0],'');
            row.inhoud = match[1].replace(/\s/g,'').replace(/,/g, '.');
          }

          if (match = row.title.match(/(\d+?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)?\s*x\s*M\d+)/i)) {
            row.title = row.title.replace(match[0],'');
            row.afmeting = match[1].replace(/\s/g,'').replace(/x/g,' x ').replace(/,/g, '.');
          }
          if (match = row.title.match(/((([\d|\.|,]+?)\s*?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)\s*?x\s*|)?(([\d|\.|,]+?)\s*?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m|)\s*?x\s*|)?([\d|\.|,]+?)\s*?(mm\.|mm|cm|mtr\.|mtr|meter|µm|mµ|m))/i)) {
            row.title = row.title.replace(match[0],'');
            row.afmeting = match[1].replace(/\s/g,'').toLowerCase().replace(/x/g,' x ').replace(/,/g, '.');
          }
          if (match = row.title.match(/([\d|\.|,]+\s*x\s*[\d|\.|,]+)/i)) {
            row.title = row.title.replace(match[0],'');
            row.afmeting = match[1].replace(/\s/g,'').replace(/x/g,' x ').replace(/(\d+)/g,'$1mm').replace(/,/g, '.');
          }
          if (match = row.title.match(/(\d+)\s*?(gaten|gat)/i)) {
            row.title = row.title.replace(match[0],'');
            row.gaten = match[1];
          }
          if (match = row.title.match(/(mt\.: |mt: |maat: )(\d+|[A-Z]+)/i)) {
            row.title = row.title.replace(match[0],'');
            row.maat = match[2];
          }
          if (match = row.title.match(/(P\d+)/i)) {
            row.title = row.title.replace(match[0],'');
            row.korrel = match[1];
          }
          if (match = row.title.match(/(oranje|orange|red oxyde|red|black|blue phtalo|green phtalo|bright red|chrome yellow|cold yellow|dark rose|extra fine aluminium|fine aluminium|donker antraciet|antraciet|donkergrijs|lichtgrijs|donker grijs|licht grijs|blauw|geel|groen|grijs|wit|geel|zwart|bruin|rood)/i)) {
            row.title = row.title.replace(match[0],'');
            row.kleur = match[1].replace(/\s/g, '').toLowerCase();
          }
          if (match = row.title.match(/ral\s*?(\d+)/i)) {
            row.title = row.title.replace(match[0],'');
            row.ral = match[1].toUpperCase();
          }
          row.title = row.title
          .replace(/^\w/, s => s.toUpperCase())
          .replace(new RegExp(row.prodBrand, 'i'), '')
          .replace(/\sPU/, '-PU')
          .replace(/--/g, '-')
          .replace(/schuursch\./, 'schuurschijf')
          .replace(/klitteb\./, 'klitteband')
          // .replace(/schuurschijven/, 'schuurschijf')
          .replace(/polyester plamuur/, 'polyesterplamuur')
        })

        art.sort((a,b) => String(a.prodBrand).localeCompare(String(b.prodBrand)) || String(a.title).localeCompare(String(b.title)) || String(a.quantity).localeCompare(String(b.quantity), undefined, {numeric: true}));

        levart.sort((a,b) => String(a.description).localeCompare(String(b.description)));

        levart.forEach(row => {
          row.art = art.find(art => [art.orderCode,art.artNr,art.prodArtNr,art.prodCode].includes(row.orderCode)) || {};
        });
        $(document.body).class('lv').style('background:black;').text('').append(
          $('table').append(
            $('thead').append(
              $('tr').append(
                $('th').text('Nr'),
                $('th').text('Artikelnummer'),
                // $('th').text('ArtNr'),
                $('th').text('Artikelcode'),
                $('th').text('Merk'),
                $('th').text('Tekst oud'),
                $('th').text('Tekst nieuw'),

                $('th').text('Afmeting'),
                $('th').text('Gaten'),
                $('th').text('Korrel'),
                $('th').text('Maat'),
                $('th').text('Inhoud'),
                $('th').text('Kleur'),
                $('th').text('RAL'),

                $('th').text('Productaantal'),
                $('th').text('Producteenheid'),

                $('th').text('Productcode'),

                $('th').text('Verpakaantal'),
                $('th').text('Verpakeenheid'),
              )
            ),
            $('tbody').append(
              levart.map((row,i) => $('tr').append(
                $('td').text(i),
                $('td').text(row.orderCode),
                $('td').text(row.description),
                $('td').text((row.art.id||0).pad(9)),
                $('td').text(row.art.artikelCode),
                $('td').text(row.art.prodBrand),
                $('td').text(row.art.prodTitle),
                $('td').text(row.art.title),
                $('td').text(row.art.afmeting),
                $('td').text(row.art.gaten),
                $('td').text(row.art.korrel),
                $('td').text(row.art.maat),
                $('td').text(row.art.inhoud),
                $('td').text(row.art.kleur),
                $('td').text(row.art.ral),
                $('td').text(row.art.prodInhoud),
                $('td').text(row.art.prodInhoudEenheid),
                $('td').text(row.art.prodCode),
                $('td').text(row.art.quantity),
                $('td').text(row.art.unit),
                $('td').colspan(5).text([
                  `${art.prodBrand||''} ${art.title||''}`.trim(),
                  art.afmeting,
                  art.gaten,
                  art.korrel,
                  art.maat,
                  art.inhoud || `${art.prodInhoud||''}${art.prodInhoudEenheid||''}`.trim(),
                  art.kleur,
                  art.prodCode ? ''+(art.prodCode||'').trim() : '',
                  art.quantity > 1 ? `${art.quantity||1}st (${art.unit})`.trim() : '',
                ].filter(Boolean).join(', ').replace(/\r\n|\n|\r/g, ' '))
              ))
            ),
          ),
        );
        return;



        $(document.body).class('lv').style('background:black;').text('').append(
          $('table').append(
            $('thead').append(
              $('tr').append(
                $('th').text('Nr'),
                $('th').text('Artikelnummer'),
                // $('th').text('ArtNr'),
                $('th').text('Artikelcode'),
                $('th').text('Merk'),
                $('th').text('Tekst oud'),
                $('th').text('Tekst nieuw'),

                $('th').text('Afmeting'),
                $('th').text('Gaten'),
                $('th').text('Korrel'),
                $('th').text('Maat'),
                $('th').text('Inhoud'),
                $('th').text('Kleur'),
                $('th').text('RAL'),

                $('th').text('Productaantal'),
                $('th').text('Producteenheid'),

                $('th').text('Productcode'),

                $('th').text('Verpakaantal'),
                $('th').text('Verpakeenheid'),
              )
            ),

            $('tbody').append(
              art.map((art,i) => [
                $('tr').append(
                  $('td').text(i),
                  $('td').text(art.id.pad(9)),
                  $('td').text(art.artikelCode),
                  $('td').text(art.prodBrand),
                  $('td').text(art.prodTitle),
                  $('td').text(art.title),
                  $('td').text(art.afmeting),
                  $('td').text(art.gaten),
                  $('td').text(art.korrel),
                  $('td').text(art.maat),
                  $('td').text(art.inhoud),
                  $('td').text(art.kleur),
                  $('td').text(art.ral),
                  $('td').text(art.prodInhoud),
                  $('td').text(art.prodInhoudEenheid),
                  $('td').text(art.prodCode),
                  $('td').text(art.quantity),
                  $('td').text(art.unit),
                  $('td').colspan(5).text([
                    `${art.prodBrand||''} ${art.title||''}`.trim(),
                    art.afmeting,
                    art.gaten,
                    art.korrel,
                    art.maat,
                    art.inhoud || `${art.prodInhoud||''}${art.prodInhoudEenheid||''}`.trim(),
                    art.kleur,
                    art.prodCode ? ''+(art.prodCode||'').trim() : '',
                    art.quantity > 1 ? `${art.quantity||1}st (${art.unit})`.trim() : '',
                  ].filter(Boolean).join(', ').replace(/\r\n|\n|\r/g, ' '))
                ),
              ]),
            )
            // art.map((art,i) => $('tr').append(
            //   [
            //     '',
            //     '',
            //     art.prodBrand,
            //     art.prodCode,
            //     art.prodArtNr,
            //     art.quantity,
            //     art.unit
            //     art.prodTitle,
            //     art.prodInhoud,
            //     art.prodInhoudEenheid,
            //     // `${(art.prodBrand||'').substr(0,3).toLowerCase()}-${art.prodArtNr}-${art.quantity}`,
            //     // [
            //     //   `${art.prodBrand||''} ${art.prodTitle||''}`.trim(),
            //     //   `${art.prodInhoud||''} ${art.prodInhoudEenheid||''}`.trim(),
            //     //   art.prodCode ? 'PN'+(art.prodCode||'').trim() : '',
            //     //   art.quantity > 1 ? `${art.unit||'st'} ${art.quantity||1}st`.trim() : '',
            //     // ].filter(Boolean).join(', ').replace(/\r\n|\n|\r/g, ' ')
            //   ].map(v => $('td').text(v))
            // ))
          )
        );
        console.log(lev,levart,art);
      },
    },
    Abis: {
      Producten() {
        aim.list('prod');
      },
      // Klanten() {
      //   aim.list('client');
      // },
      // Pakbonnen() {
      //   aim.list('salesorder');
      // },
      // Pakbon_regels() {
      //   aim.list('salesorderrow');
      // },
      // Fakturen() {
      //   aim.list('invoice');
      // },
      // Artikelen() {
      //   aim.list('art');
      // },
      // Klant_artikelen() {
      //   aim.list('clientart');
      // },
      // Bedrijven() {
      //   aim.list('account');
      // },
    },
    Overig: {
      Hazard: e => artlist(
        'Hazardlijst', [
          'id',
          'title',
          'partDescription',
          'storageLocation',
          'stelling',
          'partContent',
          'partContentUnit',
          'vosPerEenh',
          'stock',
          'stelling',
          'inkSds',
        ],
        // `partVosPerEenh>0`,
        `inkSds is not null`,
        'title',
      ),
      Prijslijst: e => artlist('Prijslijst', [
        'id',
        'partArtNr',
        'partArtCode',
        'artCode',
        'partBrand',
        'partCode',
        'title',
        'listPrice',
        'discount',
        'price',
        'vatPrice',
        // 'storageLocation',
        'inkPackPrice',
        'purchaseListPrice',
        'purchaseDiscount',
        'supplier',
        'partDescription',
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
      ], ``, 'partArtCode'),
      Inkoop: e => artlist('Inkooplijst', [
        'id',
        'supplier',
        'orderCode',
        'title',
        'inkPackPrice',
        'purchaseListPrice',
        'purchaseDiscount',


        'stock',
        'minVoorraad',
        'minBestelAantal',
        'bestelAantal',
      ], `minVoorraad > 0`, 'supplier'),
      MagazijnScannerKaart() {
        printElem().append(
          $('div').style('font-size:3em;text-align:center;').append(
            $('div').text('Gepakt'),
            $('div').class('bc').text('*0901*').style('font-size:30mm;height:3cm;'),
            $('div').text('Verzonden'),
            $('div').class('bc').text('*0902*').style('font-size:30mm;height:3cm;'),
            $('div').text('On Hold'),
            $('div').class('bc').text('*0904*').style('font-size:30mm;height:3cm;'),
            $('div').text('Geleverd'),
            $('div').class('bc').text('*0903*').style('font-size:30mm;height:3cm;'),
            $('div').text('Factureren'),
            $('div').class('bc').text('*0905*').style('font-size:30mm;height:3cm;'),
          ),
        ).print()
      },
    },
  });
});
