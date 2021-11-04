$().on('load', async e => {
  const data = await fetch('/api/').then(res => res.json());
  $().on('load', async e => {
    const data = Object.fromEntries(Object.values(document.querySelector('data').attributes).map(a => [a.nodeName,JSON.parse(atob(a.nodeValue))]));
    const art = data.dataset.shift();
    art.length=10;
    console.log(art);
    function edit(el,row,name){
      const inp = $('input').parent($(el).text('')).value(row[name]);
      inp.elem.select();
    }
    $(document.body).append(
      $('table').append(
        art.map(row => $('tr').append(
          $('td').text(row.ArtNr),
          ['Aantal','Merk','Prodcode','Lev','Bestelcode','VerpakEenheid','VerpakAantal','Omschrijving','Bruto','Korting','Netto']
          .map(name => $('td').text(row[name]).on('click', e=>edit(e.target, row, name))),
        ))
      )
    )
  });
});
