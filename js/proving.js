$().on('load', async e => {
  supplierproduct = await fetch('/product.json').then( response => response.json() );
  // supplierproduct = supplierproduct.filter(row => row.catalogPrice)
  supplierproduct.forEach(row => {
    row.description = row.description || row.title;
    if (row.catalogPrice) {
      row.saleDiscount = row.saleDiscount || Math.floor((row.purchaseDiscount || 0) * 0.3);
    }
    if (row.description.match(/tape/i)) row.brand = '3M';
    if (row.description.match(/folie/i)) row.brand = '3MB';
    // row.afmeting = (row.description.replace(/\s/g,'').match(/((\d+|\.|,?)(mm|m?)x(\d+|\.|,?)(mm|m))|((\d+|\.|,?)(mm|m))/)||[])[1] || '';
    row.afmeting = (( row.description.match(/((([\d|\.|,]+?)\s*?(mm|cm|m)\s*?x\s*|)?(([\d|\.|,]+?)\s*?(mm|cm|m)\s*?x\s*|)?([\d|\.|,]+?)\s*?(mm|cm|m))/i) || [] )[1] || '').replace(/\s/g,'').toLowerCase();
    row.gaten = (( row.description.match(/(\d+)\s*?(?=gaten)/i) || [] )[1] || '');
    row.korrel = (( row.description.match(/\b(P\d+)\b/i) || [] )[1] || '');
  })
  function num(value, dig = 2){
    return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: dig, maximumFractionDigits: dig }).format(value);
  }
  aim.om.catalogPrice = function (row, div) {
    if (row.catalogPrice) {
      const listprice = row.catalogPrice;
      const price = row.saleDiscount ? listprice * (100 - Number(row.saleDiscount)) / 100 : listprice;
      const fatprice = price * 1.21;
      // if (row.saleDiscount) div.class('discount');
      const attr = {
        listprice: listprice,
        fatprice: num(price * 1.21),
        discountperc: row.saleDiscount ? num(row.saleDiscount,0) : null,
        discount: row.saleDiscount ? num(listprice - price) : null,
        // price: row.saleDiscount ? row.catalogPrice * (100 - Number(row.saleDiscount)) / 100 : row.catalogPrice;
      }
      if (row.saleDiscount) {
        div.append($('div').class('discount').attr('value', row.saleDiscount));
      }
      return $('div').class('price').append(
        $('div').attr(attr).append(
          $('span').text(num(price)),
        ),
        $('input').type('number').min(0),
      )
      //   row.saleDiscount ? $('span').class('listprice').text(row.catalogPrice) : null,
      //   $('span').class('price').text(num(price)),
      //   row.saleDiscount ? $('span').class('discount').text(num(listprice - price)) : null,
      //   row.saleDiscount ? $('span').class('discountperc').text(row.saleDiscount + '%') : null,
      //   $('span').class('fatprice').text(num(fatprice)),
      // );
    }
  }

})

$(window).on('popstate', async e => {
  // console.log(e, document.location.href)
  const searchParams = new URLSearchParams(document.location.hash ? document.location.hash.substr(1) : document.location.search);
  // console.log(searchParams.get('$search'));
  const search = searchParams.get('$search').split(' ')
  aim.om.listview(null, supplierproduct.filter(p => search.every(s => [p.artcode,p.title,p.description].filter(Boolean).join().toLowerCase().includes(s))));
})
