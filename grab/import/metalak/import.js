basepath = "http://proving-nl.localhost/grab/import/metalak";

function saveImage(src) {
  const url = new URL(src, document.location);
  return new Promise((callback) => {
    fetch(src, {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    .then( response => response.blob() )
    .then( blob => {
      let reader = new FileReader();
      reader.onload = function() {
        // console.log(this.result);
        // return;
        fetch("https://proving.aliconnect.nl/import.php?data=img&filename=/ml" + url.pathname, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          // headers: {
          //   'Content-Type': 'application/json'
          //   // 'Content-Type': 'application/x-www-form-urlencoded',
          // },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: this.result//JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(async res => {
          callback();
          // console.log(await res.text());
        })
      };
      reader.readAsDataURL(blob);
      return this;
    })
    .catch(err => {
      callback();
    })
  })
}

function gethtml(selector){
  var elem = document.querySelector(selector);
  if (elem) return elem.innerHTML.trim().replace(/\n/g, '').replace(/ class=".*?"/gs,'');
}

async function getall() {
  var html = document.body.innerHTML;
  let list = await fetch(basepath + '/list.json').then( response => response.json() );
  list[document.location.href] = {pathname: pathname, url: document.location.href};
  var details = html.match(/showdetail\('(.*?)'\)/g);
  if (details) {
    // console.log(details);
    details.forEach(detail => {
      detail = document.location.origin + '/NL/a?action=detail&artcode=' + detail.replace(/.*?\('(.*?)'.*/, '$1');
      console.log(detail);
      list[detail] = list[detail] || null;
    })
  }
  // console.log(html,details);
  const main = document.querySelector('.ProductDetailContainer');
  if (main) {
    var searchParams = new URLSearchParams(document.location.search);
    var artcode = searchParams.get('artcode');

    for (var img of main.querySelectorAll('img')) {
      console.log(img.src);
      // page.img.push(img.src);
      await saveImage(img.src);
    }
    // return;

    // var html = main.innerHTML;

    console.log(artcode);
    var pathname = `${artcode}.html`;
    Array.from(document.querySelectorAll('script')).forEach(e => e.remove());
    Array.from(document.querySelectorAll('style')).forEach(e => e.remove());
    Array.from(document.querySelectorAll('*')).forEach(e => e.removeAttribute('style'));
    var res = await fetch(basepath + `/import.php?data=page&pathname=` + pathname, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: main.innerHTML,
    })
    .then( res => res.text())
    // Array.from(document.querySelectorAll('img')).forEach(e => e.remove());
    console.log('READY', res);
  }
  for (var a of document.querySelectorAll('a')) {
    const url = new URL(a.href, document.location);
    if (url.origin === document.location.origin) {
      // var href = new URL(a.href, document.location).pathname;
      console.log(a.href);
      list[a.href] = list[a.href];
    }
  }
  // for (var n in list) {
  //   if (n.match(/artcode=/)) {
  //     list[n] = null;
  //   }
  // }
  // list = Object.fromEntries(Object.entries(list).sort((a,b) => a[0].localeCompare(b[0])));
  // list[next[0]] = list[next[0]] || { url: next[0]};
  await fetch(basepath + "/import.php?data=list", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(list, null, 2) // body data type must match "Content-Type" header
  })
  const next = Array.from(Object.entries(list)).find(([key,value]) => key.match(/artcode=/) && !value);
  if (next) {
    console.log('NEXT', next[0]);
    setTimeout(() => {
      document.location.href = next[0];
    },3000);
  }
}

window.addEventListener('load', e => {
  console.log('LOADED');
  getall();
  // setTimeout(getall);
})
