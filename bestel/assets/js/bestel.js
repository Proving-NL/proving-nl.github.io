$().on('load', async e => {
  const [rows] = await aim.fetch('https://dms.aliconnect.nl/api/v1/abis/bestel'+document.location.search).get();
  console.log(rows);
});
window.addEventListener( 'scroll', e => {
  if (window.scrollYdir != (window.scrollYdir = (window.scrollYdiff = (window.scrollYprev||0) - (window.scrollYprev = window.scrollY)) > 0)) {
    document.querySelector('div.search').style.top = window.scrollYdir ? null : -50 + 'px';
  };
});
