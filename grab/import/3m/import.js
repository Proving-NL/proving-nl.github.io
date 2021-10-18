href = document.location.href;
origin = document.location.origin;
allimages = [];
allref = [href];
request_url = 'http://localhost/sites/airo/import/colad/import.php';
api_url = 'https://proving.aliconnect.nl/api/System';
basepath = "http://proving-nl.localhost/grab/import/3m";

function getdata(obj){
  var xhr = new XMLHttpRequest();
  console.log(obj.url);
  xhr.open('GET', (xhr.obj = obj).url);
  xhr.responseType = 'blob';
  xhr.onload = function(e){
    var reader = new FileReader();
    reader.obj = this.obj;
    reader.onload = function(e) {
      this.obj.data = e.target.result;
    }
    reader.readAsDataURL(this.response);
  };
  xhr.send();
  return obj;
}

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
        fetch(basepath + "/grab.php?filename=" + url.pathname, {
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

async function getall() {
  const list = await fetch(basepath + '/list.json').then( response => response.json() );
  list[document.location.href.split(/#/)[0]] = true;
  for (var a of document.querySelectorAll('a')) {
    // console.log(a.href);
    const url = new URL(a.href, document.location);
    if (a.href.match(/www.3mnederland.nl\/3M\/nl_NL\/p/)) {
      var href = a.href.split(/#/)[0];
      list[href] = list[href] || false;
    }
  }
  await fetch(basepath + "/list.php", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(list) // body data type must match "Content-Type" header
  })
  .then( async response => {
    console.log(list);
  } )

  // return;
  function gethtml(selector){
    var elem = document.querySelector(selector);
    if (elem) return elem.innerHTML.trim().replace(/\n/g, '').replace(/ class=".*?"/gs,'');

  }
  const next = Array.from(Object.entries(list)).find(([key,value]) => !value);
  if (gethtml('.MMM--contentDetailContain-bd')) {
    const page = {
      ID: gethtml('.MMM--contentDetailContain-bd').match(/3M ID&nbsp;(\d+)/),
      title: gethtml('h1'),
      contentDetailContain: gethtml('.MMM--contentDetailContain-bd'),
      mrktgContentBlock: gethtml('.mrktgContentBlock'),
      productSpecs: gethtml('.productSpecs'),
      tabContentContainer: gethtml('.tabContentContainer'),
      productDocs: gethtml('.productDocs'),
      img: [],
    }
    if (document.querySelector('.MMM--content_media_large')) {
      for (var img of document.querySelector('.MMM--content_media_large').querySelectorAll('img')) {
        console.log(img.src);
        page.img.push(img.src);
        await saveImage(img.src);
      }
    }
    var pathname = new URL(document.location.href).pathname;
    console.log(pathname, page);
    var res = await fetch(basepath + "/page.php?pathname=" + pathname, {
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
  console.log('READY', next[0]);
  document.location.href = next[0];
  // setTimeout(() => {
  // }, 2000);
}

window.addEventListener('load', e => {
  console.log('LOADED');
  setTimeout(getall,2000);
})
