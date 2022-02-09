$().on('load', e => {
  let keybuffer = null;
  let setstatus;
  let to;
  let ordernr = '';
  let data = [[]];
  const elem = $('div').parent($(document.body));
  async function load(){
    clearTimeout(to);
    [data] = await aim.fetch('https://dms.aliconnect.nl/api/v1/abis/dashboard').get();
    console.log(111, data);
    // Object.keys(names).forEach(name=>names[name]=0);
    // data[0].forEach(r=>names[r.status] = r.aantal)
    set();
    to = setTimeout(e => load(), 5000);
  }
  load();
  function valcells(name){
    const row = data.find(r=>r.status===name) || {};
    // console.log(name,row);
    //
    return [
      $('th').text(name),
      $('td').text(row.aantal||''),
    ]
  }
  function set(value) {
    elem.text('').append(
      $('div').text(new Date().toLocaleTimeString().substr(0,5), setstatus = value || setstatus, ordernr),
      $('table').append(
        $('tr').append(
          valcells('Opdracht'),
          valcells('Ingepland'),
        ),
        $('tr').append(
          valcells('Geprint'),
          valcells('Gepakt'),
        ),
        $('tr').append(
          valcells('Verzonden'),
          valcells('On Hold'),
        ),
        $('tr').append(
          valcells('Geleverd'),
          valcells('Verzonden>2d'),
        ),
        $('tr').append(
          valcells('ReadyMix'),
        ),
      ),
    )
  };
  set('Gepakt');
  let query = 'pickDateTime = GETDATE(), onholdDateTime = NULL';
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
          query = 'pickDateTime = GETDATE(), sendDateTime = NULL, deliverDateTime = NULL, onholdDateTime = NULL';
        } else if (keybuffer === '0902') {
          set('Verzonden');
          query = 'sendDateTime = GETDATE(), deliverDateTime = NULL, onholdDateTime = NULL';
        } else if (keybuffer === '0903') {
          set('Geleverd');
          query = 'deliverDateTime = GETDATE(), onholdDateTime = NULL';
        } else if (keybuffer === '0904') {
          set('On Hold');
          query = 'onholdDateTime = GETDATE(), sendDateTime = NULL, deliverDateTime = NULL';
        } else if (keybuffer === '0905') {
        } else {
          // console.log('PAKBON', keybuffer, setorderdate);
          ordernr = keybuffer;
          await aim.fetch('https://dms.aliconnect.nl/api/v1/abis/paklijst').query({
            id: ordernr,
            set: query,
          }).get();
          load();
        }
        keybuffer = null;
      } else {
        keybuffer += e.key
      }
    }
  });

});
