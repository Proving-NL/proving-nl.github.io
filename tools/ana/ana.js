console.log('ja');



$().on('load', async e => {

  const ana = {
    metalak: {
      getdata() {
        main.innerHTML = document.querySelector('.ProductDetailContainer').innerHTML;

        const image = Array.from(main.querySelectorAll('img')).find(e => e.hasAttribute('artcode'));
        if (image) {
          return {
            packKeyGroup: 'Metalak',
            partKeyGroupName: image.getAttribute('artcode'),
            src: encodeURI(image.getAttribute('src').replace(/\?.*/,'')),
            options: Object.assign(
              {
                Bestelcode: main.querySelector('.spnProductDetailArtcode').innerText,
                Barcode: String(String(main.innerText.match(/Barcode:.*/)).match(/\d+/))||'',
                BigDescription: main.querySelector('.bigdescriptionhtmldetail').innerText,
                Adviesprijs: String(main.querySelector('#ctl00_ContentPlaceHolder2_rptrProductDetail_ctl00_ucProductDetail_divAdviesPrijs').innerText.match(/[\d|,|.]+/)).replace(/,/,'.'),
              },
              !main.querySelector('.SpecCatTable') ? {} : Object.fromEntries(Array.from(main.querySelector('.SpecCatTable').querySelectorAll('tr')).map(
                e=>Array.from(e.querySelectorAll('td')).map(e => e.innerText.replace(/ /,''))
              ).filter(e=>e.length===2)),
            ),
          }
        }
      }
    }
  }


  const progress = document.querySelector('progress');
  const main = document.querySelector('main');
  main.style='overflow:auto;';
  var data = await aim.req('ana.php').query({request_type:'html_rows'})
  .filter(`url like '%metalak%action=detail%'`)
  .then(res => res.json());
  if (data) {
    console.log(data);
    let [rows] = data;
    for (let row of rows) {
      let data = await aim.req('ana.php').query({request_type:'html_row',id:row.id}).then(res => res.json());
      [[row]] = data;
      main.innerHTML = row.html;
      Array.from(main.querySelectorAll('*')).forEach(e => e.removeAttribute('style'));

      var input = ana.metalak.getdata();
      console.log(input);
      [[row]] = await aim.req('ana.php').query({request_type:'data_write',id:row.id}).input(input).post().then(res => res.json());
      console.log(row);

      // return;
    }
  }

  return;



  var data = await aim.req('ana.php').then(res => res.json());
  if (data) {
    var [rows] = data;
    console.log(rows);
    progress.max = rows.length;
    for (row of rows) {
      console.log(row);
      const img = await aim.req('ana.php').query(row).then(res => res.json());
      console.log(img);
      return
      progress.value++;
      // return;
    }
  }
  // var res = await aim.req('ana.php').post().filter('s').then(res => res.json().catch(console.warn) ).catch(console.warn);
});
