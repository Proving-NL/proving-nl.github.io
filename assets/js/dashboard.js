$().on('load', e => {
  let keybuffer = null;
  let setstatus;
  let to;
  let ordernr = '';
  let statusrows = [];
  const elem = $('div').parent($(document.body));
  async function load(){
    clearTimeout(to);
    [statusrows] = await aim.fetch('https://dms.aliconnect.nl/api/v1/abis/dashboard').get();
    set();
    to = setTimeout(e => load(), 10000);
  }
  load();
  function valcells(name){
    const row = data.find(r=>r.status===name) || {};
    return [
      $('th').text(name),
      $('td').text(row.aantal||''),
    ]
  }
  function set(value) {
    elem.text('').append(
      $('div').text(new Date().toLocaleTimeString().substr(0,5), setstatus = value || setstatus, ordernr),
      $('table').append(
        statusrows.map(row => $('tr').append(
          $('td').text(row.Status),
          $('td').text(row.aantal),
        )),
      ),
    )
  };
  set('Gepakt');
  query = 'GepaktDatumTijd = GETDATE()';
  $(window).on('keyup', async e => {
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
          set('Gepakt');
          query = 'GepaktDatumTijd = GETDATE()';
        } else if (keybuffer === '0902') {
          set('Verzonden');
          query = 'VerstuurdDatumTijd = GETDATE()';
        } else if (keybuffer === '0903') {
          set('Geleverd');
          query = 'LeverDatumTijd = GETDATE()';
        } else if (keybuffer === '0904') {
          set('On Hold');
          query = 'OnHoldDatumTijd = GETDATE()';
        } else if (keybuffer === '0905') {
        } else {
          console.log('PAKBON', keybuffer, setstatus);
          ordernr = keybuffer;
          const [[row]] = await aim.fetch('https://dms.aliconnect.nl/api/v1/abis/getbon').query({
            id: ordernr,
            // set: query,
          }).get();
          console.log(row);
          $('body>div>div').text(new Date().toLocaleTimeString().substr(0,5), setstatus, ordernr, 'Status', row.Status);
          if (
            (setstatus==='Gepakt1' && (!row.PrintDatumTijd || row.GepaktDatumTijd))
            || (setstatus==='Verzonden1' && (!row.GepaktDatumTijd || row.VerstuurdDatumTijd))
            || (setstatus==='Geleverd1' && (!row.VerstuurdDatumTijd || row.LeverDatumTijd))
          ) {
            $(document.body).style('background:red;');
          } else {
            $(document.body).style('background:green;');
            await aim.fetch('https://dms.aliconnect.nl/api/v1/abis/setbon').query({
              id: ordernr,
              set: query,
            }).get();
            setTimeout(e => $(document.body).style(''),5000);
          }
          // console.log('done', ordernr);
          // load();
        }
        keybuffer = null;
      } else {
        keybuffer += e.key
      }
    }
  });

});
