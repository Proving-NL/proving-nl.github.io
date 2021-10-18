href = document.location.href;
origin = document.location.origin;
allimages = [];
allref = [href];
request_url = 'http://localhost/sites/airo/import/colad/import.php';
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
    ProductVariant: [],
    ProductSimular: [],
    ProductFaq: [],
  }

  for (var i=0,el,c=document.body.getElementsByTagName('A');el=c[i];i++){
    if (el.href.includes(origin) && !el.href.includes('#') && !allref.includes(el.href)) {
      data.link.push(el.href);
      allref.push(el.href);
    }
  };

  [...document.body.getElementsByClassName('image-slider--container')].forEach(function(el){
    [...el.getElementsByTagName('IMG')].forEach(function(el){
      var scr = (el.srcset || el.src).split(',').shift().split(' ').shift();
      item.files.push(getdata({ url:scr, title:el.title, alt:el.alt  }));
    });
  });

  [...document.body.getElementsByClassName('product--detail-main-column')].forEach(function(el){
    [...el.getElementsByClassName('entry--content')].forEach(function(el){
      item.Supplier = 'EMM';
      item.Brand = document.location.hostname.split('.')[1];
      item.IsPublic = 1;
      item.OrderCode = el.innerText.trim();
    });
    [...el.getElementsByClassName('product--title')].forEach(function(el){
      item.ProductTitle = el.innerText.trim();
    });
    [...el.getElementsByClassName('product--description')].forEach(function(el){
      item.ProductDescription = el.innerHTML.trim();
    });
    [...el.getElementsByClassName('product--advantages')].forEach(function(el){
      item.ProductAdvantages = el.innerHTML.trim();
    });
    [...el.getElementsByClassName('product--detail-video')].forEach(function(el){
      [...el.getElementsByTagName('IFRAME')].forEach(function(el){
        item.ProductDetailVideo = el.src;
      });
    });
    [...el.getElementsByClassName('product--downloads')].forEach(function(el){
      [...el.getElementsByTagName('A')].forEach(function(el){
        item.files.push(getdata({ url:el.href, title:el.title, alt:el.innerText }));
      });
    });
  });

  [...document.body.getElementsByClassName('content--hbcom_article_faqs')].forEach(function(el){
    var header=el.getElementsByClassName('collapse--header');
    var content=el.getElementsByClassName('collapse--content');
    for (var i=0,h;h=header[i];i++) {
      item.ProductFaq.push({header:h.innerText,content:content[i].innerText.trim() });
    }
  });

  [...document.body.getElementsByClassName('product--properties-table')].forEach(function(el){
    [...el.getElementsByTagName('TBODY')].forEach(function(el){
      [...el.getElementsByTagName('TR')].forEach(function(el){
        var propertyName;
        [...el.getElementsByTagName('TD')].forEach(function(el){
          if (!propertyName) return propertyName = el.innerText.replace(/ /g,'_');
          item[propertyName] = el.innerText.trim();
        });
      });
    });
  });

  [...document.body.getElementsByClassName('content--similar')].forEach(function(el){
    [...el.getElementsByClassName('product-slider--item')].forEach(function(el){
      [...el.getElementsByClassName('product--box')].forEach(function(el){
        item.ProductSimular.push({ OrderCode: el.getAttribute('data-ordernumber') });
      });
    });
  });

  items = [item];
  [...document.body.getElementsByClassName('imnxxvariantstable')].forEach(function(el){
    [...el.getElementsByTagName('TBODY')].forEach(function(el){
      [...el.getElementsByTagName('TR')].forEach(function(el){
        var Variant = {}, ordercode, variant = Object.assign({},item);
        [...el.getElementsByTagName('TD')].forEach(function(el){
          if (!ordercode) {
            ordercode = ordercode = variant.OrderCode = Variant.OrderCode = el.innerText.trim();
            data.link.push(href.split('?').shift() + '?number=' + ordercode);
          }
          else {
            Variant.Value = variant.Model = el.innerText.trim();
          }
        });
        item.ProductVariant.push(Variant);
        // items.push(variant);
      });
    });
  });
  console.log("ITEMS",items);
  // return;
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

  // item.KeyName = 'emm:' + item.OrderCode;
  return;
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
