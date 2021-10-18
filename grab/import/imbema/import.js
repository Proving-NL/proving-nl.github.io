request_url = 'http://localhost/sites/airo/import/imbema/import.php';
root = 'https://www.imbema.com/catalogus/oppervlaktebehandeling'
api_url = 'https://proving.aliconnect.nl/api/System';
href = document.location.href;
origin = document.location.origin;
allimages = [];
allref = [href];
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
    files: [],
  };
  translate = {
    'KORRELGROFTE':'GrainSize',
    'MERK':'Brand',
  };
  var items=[];

  [...document.body.getElementsByTagName('A')].forEach(function(el){
    if (el.href.includes(root) && !el.href.includes('#') && !allref.includes(el.href)) {
      data.link.push(el.href);
      allref.push(el.href);
    }
  });

  [...document.body.getElementsByClassName('container_wrap_first')].forEach(function(el){
    [...el.getElementsByClassName('sku')].forEach(function(el){
      item.OrderCode = el.innerText.trim();
      item.PackageUnit = item.OrderCode.split('-')[1];
      item.OrderCode = item.OrderCode.split('-')[0];
    });
    [...el.getElementsByClassName('zoomImg')].forEach(function(el){
      item.files.push(getdata({ url:el.src, title:el.title, alt:el.alt  }));
    });


    [...el.getElementsByTagName('H1')].forEach(function(el){
      item.IsPublic = 1;
      item.ProductTitle = el.innerText.trim();
      if (match = item.ProductTitle.match(/\b(P[0-9]+)\b/)) {
        item.GrainSize = match[1];
      }

      if (match = href.match(/-o-([0-9]+)-/)) {
        item.Diameter = match[1];
      }
      else if (match = item.ProductTitle.match(/\b([0-9]+) X ([0-9]+) X ([0-9 ]+)MM\b/)) {
        item.Length = match[1].trim();
        item.Width = match[2].trim();
        item.Height = match[3].trim();
      }
      else if (match = item.ProductTitle.match(/\b([0-9 ]+)MM X ([0-9, ]+)M\b/)) {
        item.Content = match[2].trim();
        item.ContentUnit = 'meter';
        item.Width = match[1].trim();
      }
      else if (match = item.ProductTitle.match(/\b([0-9]+) X ([0-9 ]+)MM\b/)) {
        item.Width = match[1].trim();
        item.Length = match[2].trim();
      }
      if (match = href.match(/-([0-9]+)-stuks/)) {
        item.PackageQuantity = match[1].trim();
      }
      if (match = href.match(/-([0-9]+)-gaten/)) {
        item.Holes = match[1].trim();
      }
      if (match = href.match(/-([0-9]+)-ltr/)) {
        item.Content = match[1].trim();
        item.ContentUnit = 'liter';
      }
      if (match = item.ProductTitle.match(/\b([0-9,]+)LTR\b/)) {
        item.Content = match[1].trim();
        item.ContentUnit = 'liter';
      }
      item.Brand = item.ProductTitle.split(' ')[0];
      item.Model = item.ProductTitle.split(' ')[1];
    });
    [...el.getElementsByTagName('P')].forEach(function(el){
      if (el.innerText.includes(':')) {
        var arr=el.innerText.split(':'), propertyName=arr.shift().trim().replace(/ /g,'_'), Value=arr.shift().trim();
        item[translate[propertyName] || propertyName] = Value;
      }
    });
    [...el.getElementsByClassName('entry-summary')].forEach(function(el){
      if (el.getElementsByTagName('P') && el.getElementsByTagName('P')[1]) item.Description = el.getElementsByTagName('P')[1].innerText;
    });

    [...el.getElementsByClassName('woocommerce-product-attributes-item')].forEach(function(el){
      var propertyName = el.getElementsByTagName('TH')[0].innerText.trim();
      item[translate[propertyName] || propertyName] = el.getElementsByTagName('TD')[0].innerText.trim();
    });
    items.push(item);
  });
  console.log(items);
  // return;

  setTimeout(function(event){
    items.forEach(function(item) {
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
  },1000);

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
  },3000);

}
setTimeout(getall,1000);
