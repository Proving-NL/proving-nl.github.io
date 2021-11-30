$().on('load', async e => {
  let keybuffer = null;
  let setorderdate = null;
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
          setorderdate = 'pickDateTime';
          console.log('Order gereed voor transport');
        } else if (keybuffer === '0902') {
          setorderdate = 'sendDateTime';
          console.log('Order op transport');
        } else if (keybuffer === '0903') {
          setorderdate = 'deliverDateTime';
          console.log('Order geleverd');
        } else {
          console.log('PAKBON', keybuffer, setorderdate);
          $().url('https://aliconnect.nl/api/abis/data').post({
            request_type: 'paklijst',
            id: keybuffer,
            set: setorderdate + ' = GETDATE()'
          }).then(e => e.body);
        }
        keybuffer = null;
      } else {
        keybuffer += e.key
      }
    }
  })
});
