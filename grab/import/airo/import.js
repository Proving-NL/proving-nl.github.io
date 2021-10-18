href = document.location.href;
origin = document.location.origin;
allimages = [];
allref = [href];
request_url = 'http://localhost/sites/airo/import/airo/import.php';
api_url = 'https://proving.aliconnect.nl/api/System';
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
function getall() {
  console.log(href);
  data = {
    href : href,
    link: [href],
  };
  item = {
    IsPublic: 1,
    files: [],
    // ProductVariant: [],
    // ProductSimular: [],
    // ProductFaq: [],
  };

  //
  //
  // for (var i=0,el,c=document.body.getElementsByTagName('A');el=c[i];i++){
  //   if (el.href.includes(origin) && !el.href.includes('#') && !allref.includes(el.href)) {
  //     data.link.push(el.href);
  //     allref.push(el.href);
  //   }
  // };
  [...document.body.getElementsByClassName('w55')].forEach(function(el){
    [...el.getElementsByTagName('H1')].forEach(function(el){
      item.ProductTitle = el.innerText;
    });
    [...el.getElementsByTagName('P')].forEach(function(el){
      item.Description = el.innerText;
    });
    [...el.getElementsByTagName('IMG')].forEach(function(el){
      var scr = el.src;
      item.files.push(getdata({ url:scr, title:el.title, alt:el.alt  }));
    });
  });

  items = [];
  [...document.body.getElementsByClassName('w40')].forEach(function(el){
    [...el.getElementsByTagName('A')].forEach(function(el){
      item.files.push(getdata({ url:el.href, title:el.title, alt:el.innerText  }));
    });
    [...el.getElementsByTagName('P')].forEach(function(el){
      var s=el.innerText.replace(/-/g,'–');
      if (s.includes('–')) {
        console.log(el.innerText.split("\n"));
        s.split("\n").forEach(function(line) {
          if (!line.includes('–')) return;
          var variant = Object.assign({},item);
          variant.OrderCode = line.split('–').shift().trim();
          variant.Model = line.split('–').pop().trim();
          items.push(variant);
        })
      }
      // item.p.push({innerText:el.innerText});
    });
  });

  setTimeout(function(event){
    items.forEach(function(item) {
      console.log(item);
      var xhr = new XMLHttpRequest();
      xhr.open('post', api_url + '?OrderCode=' + item.OrderCode, true);
      xhr.onload = function(event) {
        console.debug('API', event.target.responseText);
        try {
          response = JSON.parse(event.target.responseText);
        }
        catch (err) {
          console.error('ERR', event.target.responseText);
          return;
        }
        console.log('UPLOAD', response);
      }
      xhr.send(JSON.stringify(item,null,2));
    });
  },2000);
  // return;
  setTimeout(function(event){
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open('post', request_url, true);
    xhr.onload = function(event) {
      console.log('DATA FROM PHP', event.target.responseText);
      // return;
      if (event.target.responseText) document.location.href = event.target.responseText;
    }
    xhr.send(JSON.stringify(data,null,2));
  },5000);
}
setTimeout(getall,2000);
