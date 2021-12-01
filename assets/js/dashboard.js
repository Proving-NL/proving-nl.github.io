$().on('load', e => {
  let keybuffer = null;
  let setorderdate;
  let to;
  let ordernr = '';
  let data = [];
  const table = $('table').parent($(document.body));
  (async function load(){
    clearTimeout(to);
    data = await $().url('https://aliconnect.nl/api/abis/data').post({
      request_type: 'dashboard',
    }).then(e => e.body);
    set();
    to = setTimeout(e => load(), 5000);
  })()
  function set(value) {
    setorderdate = value || setorderdate;
    const names = ['Mandje','Nieuw','Geprint','Gereed','Verzonden','Geleverd','ReadyMix'];
    const datetext = {
      pick: 'Gereed voor verzending',
      send: 'Verzonden',
      deliver: 'Geleverd',
    }
    table.text('').append(
      $('tr').append(
        $('td').text(new Date().toLocaleTimeString().substr(0,5)),
        $('td').text('Tijd'),
      ),
      $('tr').append(
        $('td').text(datetext[setorderdate]),
        $('td').text('Scanner'),
      ),
      $('tr').append(
        $('td').text(ordernr),
        $('td').text('Order'),
      ),
      names.map((name,i) => $('tr').append(
        $('td').text(data[i] ? data[i][0].aantal : null),
        $('td').text(name),
      )),
    )
  };
  set('pick');

  $(window).on('keyup', e => {
    if (keybuffer === null) {
      if (e.key === 'CapsLock') {
        keybuffer = 'CapsLock';
      }
    } else if (keybuffer === 'CapsLock') {
      if (e.key === 'CapsLock') {
        keybuffer = '';
        e.preventDefault();
      } else {
        keybuffer = null;
      }
    } else {
      e.preventDefault();
      if (e.key === 'Enter') {
        if (keybuffer === '0901') {
          set('pick');
          // console.log('Order gereed voor transport');
        } else if (keybuffer === '0902') {
          set('send');
          // console.log('Order op transport');
        } else if (keybuffer === '0903') {
          set('deliver');
          // console.log('Order geleverd');
        } else {
          console.log('PAKBON', keybuffer, setorderdate);
          ordernr = keybuffer;
          set();
          // $().url('https://aliconnect.nl/api/abis/data').post({
          //   request_type: 'paklijst',
          //   id: ordernr,
          //   set: setorderdate + 'DateTime = GETDATE()'
          // }).then(e => e.body);
        }
        keybuffer = null;
      } else {
        keybuffer += e.key
      }
    }
  });

});
