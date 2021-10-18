var href = document.location.href;
allimages = {};
function getall() {
  var data = {
    ref : {},
  };
  var imgs = [];
  for (var i=0,el,c=document.body.getElementsByTagName('IMG');el=c[i];i++){
    if (!allimages[el.src]) {
      allimages[el.src]=el.src;
      imgs.push(el.src);
    }
  }
  // console.log(imgs);
  (uploadImages = function(){
    src = imgs.shift();
    if (!src) return;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", src);
    xhr.responseType = "blob";
    xhr.onload = function(e){
      if (!this.response.size) return uploadImages();
      var reader = new FileReader();
      reader.onload = function(e){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost/sites/airo/import/polyestershoppen/test.php?src='+src, true);
        xhr.onload = function(e) {
          console.log(src,e.target.responseText);
          uploadImages();
        }
        xhr.send(e.target.result);
      }
      reader.readAsDataURL(this.response);
    };
    xhr.send();
  })();


  var ref = data.ref[href] = data.ref[href] || {};
  ref.nr = Number(href.split('-').pop().split('.').shift());
  ['product-page-head','product-page-body'].forEach(function(id){
    if (document.getElementById(id)) ref[id] = document.getElementById(id).innerHTML;
  });
  for (var i=0,el,c=document.body.getElementsByTagName('H1');el=c[i];i++){
    data.ref[href].title = el.innerText;
  }
  var options = data.ref[href].options = {};
  for (var i1=0,el1,c1=document.body.getElementsByClassName('product-option-row');el1=c1[i1];i1++) {
    for (var i2=0,el2,c2=el1.getElementsByClassName('product-option-radio__radioButton');el2=c2[i2];i2++) {
      option = options[el2.value] = {};
    }
    for (var i2=0,el2,c2=el1.getElementsByClassName('product-option-radio__label');el2=c2[i2];i2++) {
      option.label = el2.innerHTML.split('<').shift().trim();
      break;
    }

    option.price = el1.children[2].innerText;
  }
  for (var i=0,el,c=document.body.getElementsByTagName('A');el=c[i];i++){
    if (el.href != href && el.href.includes(href)) data.ref[el.href]=data.ref[el.href] || {};
  }
  for (var i=0,el,c=document.body.getElementsByClassName('price');el=c[i];i++){
    ref.price = el.getAttribute('data-price');
  }
  // console.log(data);
  var xhr = new XMLHttpRequest();
  xhr.open('post', 'http://localhost/sites/airo/import/polyestershoppen/test.php', true);
  xhr.onload = function(e) {
    if (!e.target.responseText) return;
    console.log('DATA FROM PHP', e.target.responseText);
    // return;
    href = e.target.responseText;
    var xhr = new XMLHttpRequest();
    xhr.open('get', href, true);
    xhr.onload = function(e) {
      document.body.innerHTML = '<div '+e.target.responseText.split('<body').pop().split('</body').shift()+'</div>';
      setTimeout(getall,1000);
    }
    xhr.send();
  }
  xhr.send(JSON.stringify(data,null,2));

}
getall();


// for (var i=0,el,c=document.body.getElementsByTagName('IMG');el=c[i];i++){
//   console.log(el.src);
// }
// var xhr = new XMLHttpRequest();
// xhr.open('get', 'https://polyestershoppen.nl/lakken/interdeck-international-696.html', true);
// xhr.onload = function(e){
//   console.log(e.target.responseText);
// }
// xhr.send();
// xhr.send(input);
// input = new FormData();
// input.append('data', document.body.innerHTML);
// xhr.send(input);
//
//
// //console.log(document.body.innerHTML);
// var xhr = new XMLHttpRequest();
// xhr.open('post', 'http://localhost/sites/airo/shoppen/test.php', true);
// input = new FormData();
// input.append('data', document.body.innerHTML);
// xhr.send(input);
// console.log('TEST DONE');
