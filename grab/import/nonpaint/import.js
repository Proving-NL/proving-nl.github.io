basepath = "http://proving-nl.localhost/grab/import/nonpaint";

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
        fetch(basepath + "/import.php?data=img&filename=" + url.pathname, {
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
  const main = document.querySelector('.ty-product-block');
  if (main) {
    const page = {
      product: main.innerHTML,
      img: [],
    }
    for (var img of main.querySelectorAll('img')) {
      console.log(img.src);
      page.img.push(img.src);
      await saveImage(img.src);
    }
    var pathname = new URL(document.location.href).pathname;
    console.log(pathname, page);
    var res = await fetch(basepath + "/import.php?data=page&pathname=" + pathname, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(page),
    })
    .then( res => res.text())
    console.log('READY', res);
  }
  let list = await fetch(basepath + '/list.json').then( response => response.json() );
  list[document.location.pathname] = true;
  for (var a of document.querySelectorAll('a')) {
    // console.log(a.href);
    const url = new URL(a.href, document.location);
    if (url.origin === document.location.origin) {
      var href = new URL(a.href, document.location).pathname;
      list[href] = list[href] || false;
    }
  }
  list = Object.fromEntries(Object.entries(list).sort((a,b) => a[0].localeCompare(b[0])));
  const next = Array.from(Object.entries(list)).find(([key,value]) => !value);
  list[next[0]] = true;
  await fetch(basepath + "/import.php?data=list", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(list, null, 2) // body data type must match "Content-Type" header
  })
  .then( async response => {
    console.log(list);
  } )
  console.log('READY', document.location.origin + next[0]);
  document.location.href = next[0];
}

window.addEventListener('load', e => {
  console.log('LOADED');
  setTimeout(getall,2000);
})
