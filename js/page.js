async function search(el){
  fetch('https://aliconnect.nl/abis/data?request_type=products&search='+el.value)
  .then(response => response.json().then(data => {
    show = {
      table() {
        cols = [
          { name: 'productTitle', title: 'Titel'},
          { name: 'supplier', title: 'Leverancier'},
          { name: 'brand', title: 'brand'},
          { name: 'productGroup', title: 'productGroup'},
          { name: 'description', title: 'description'},
          { name: 'ordercode', title: 'ordercode'},
          { name: 'catalogPrice', title: 'catalogPrice'},
          { name: 'salesPrice', title: 'salesPrice'},
        ];
        $('section.doc-content').text('').append(
          $('table').class('products').append(
            $('thead').append(
              $('tr').append(
                cols.map(col => $('th').text(col.title || col.name))
              )
            ),
            $('tbody').append(
              data.map(row => $('tr').append(
                cols.map(col => $('td').text(row[col.name]))
              ))
            )
          )
        )
      },
      list(){
        $('section.doc-content').text('').append(
          $('div').class('products').append(
            data.map(row => $('div').append(
              $('div').text([row.supplier,row.brand,row.productTitle].join(' ')),
              $('div').text([row.productGroup,row.description].join(' ')),
              $('div').text([row.ordercode].join(' ')),
              $('div').class('price').append(
                $('span').attr('catalogprice', Number(row.catalogPrice).toLocaleString('nl-NL', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })),
                $('span').attr('discount', (row.discount = ((row.catalogPrice - row.salesPrice) / row.catalogPrice)*100).toLocaleString('nl-NL', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })),
                row.discount ?
                $('span').attr('salesprice', Number(row.salesPrice).toLocaleString('nl-NL', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })) : null,
              ),
            )
          )
        ))
      },
    }
    $('aside.right').text('');
    return show.list();
    return show.table();
  }))
}
