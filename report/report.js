$().on('load', async e => {
  // localStorage.clear();
  if (!localStorage.getItem('password')) {
    return $(document.body).append(
      $('form').on('submit', e => {
        e.preventDefault();
        localStorage.setItem('accountname', e.target.accountname.value);
        localStorage.setItem('password', e.target.password.value);
        location.reload();
      }).append(
        $('div').append(
          $('label').text('accountname'),$('input').name('accountname'),
        ),
        $('div').append(
          $('label').text('password'),$('input').type('password').name('password'),
        ),
        $('div').append(
          $('button').text('OK'),
        ),
      ),
    )
  }

  $().url('report.php').get().then(e => {
    $(document.body).append(
      e.body.map(name => $('button').text(name).on('click', e => {
        $().url('report.php').query('name', name).query('password', localStorage.getItem('password')).get().then(e => {
          console.log(e.body);
          const rows = e.body.rows;
          $(document.body).text('').append(
            $('table').append(
              $('thead').append(
                Object.keys(rows[0]).map(v => $('th').text(v))
              ),
              $('tbody').append(
                rows.map(row => $('tr').append(
                  Object.values(row).map(v => $('td').text(v))
                ))
              )
            )
          )
        })
      })),
    )
  });
});
