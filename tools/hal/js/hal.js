const stockpos = [];

const locs = [
  {
    pad: 12,
    racks: [
      { rack: 1, shelfs: 5 },
      { rack: 2, shelfs: 5 },
      { rack: 3, shelfs: 5 },
      { rack: 4, shelfs: 5 },
      { rack: 5, shelfs: 5 },
      { rack: 6, shelfs: 5 },
      { rack: 7, shelfs: 5 },
      { rack: 8, shelfs: 5 },
      { rack: 9, shelfs: 5 },
      { rack: 10, shelfs: 5 },
      { rack: 11, shelfs: 5 },
      { rack: 12, shelfs: 5 },
      { rack: 13, shelfs: 5 },
      { rack: 14, shelfs: 5 },
      { rack: 15, shelfs: 5 },
    ]
  },
  {
    pad: 13,
    racks: [
      { rack: 1, shelfs: 3 },
      { rack: 2, shelfs: 3 },
    ]
  },
  {
    pad: 14,
    racks: [
      { rack: 1, shelfs: 3 },
    ]
  },
  {
    pad: 15,
    racks: [
      { rack: 1, shelfs: 5 },
      { rack: 2, shelfs: 5 },
      { rack: 3, shelfs: 5 },
      { rack: 4, shelfs: 5 },
      { rack: 5, shelfs: 5 },
      { rack: 6, shelfs: 5 },
      { rack: 7, shelfs: 5 },
      { rack: 8, shelfs: 5 },
      { rack: 9, shelfs: 5 },
      { rack: 10, shelfs: 5 },
      { rack: 11, shelfs: 5 },
    ]
  },
  {
    pad: 17,
    racks: [
      { rack: 1, shelfs: 5 },
      { rack: 2, shelfs: 5 },
      { rack: 3, shelfs: 5 },
      { rack: 4, shelfs: 5 },
      { rack: 5, shelfs: 5 },
      { rack: 6, shelfs: 5 },
      { rack: 7, shelfs: 5 },
      { rack: 8, shelfs: 5 },
      { rack: 9, shelfs: 5 },
      { rack: 10, shelfs: 5 },
      { rack: 11, shelfs: 5 },
      { rack: 12, shelfs: 5 },
      { rack: 13, shelfs: 5 },
      { rack: 14, shelfs: 5 },
    ]
  },
];

function addrack(w,d,h,callback){
  for (var x=0; x<w; x++) {
    for (var z=0; z<d; z++) {
      for (var y=0; y<h; y++) {
        stockpos.push(callback(x,y,z));
      }
    }
  };
}
for (var z1=0;z1<3;z1++) {
  addrack(14,2,6,(x,y,z) => Object({
    width: 1000, height: 500, depth: 500,
    x: x * 1000 + 5000,
    y: y * 400,
    z: z * 500 + 5000 + 12000 + z1 * 2500,
  }));
}
addrack(11,1,3,(x,y,z) => Object({
  width: 1000, height: 1200, depth: 1200,
  x: x * 1000 + 300,
  y: y * 1200,
  z: 300 + 12000,
}));
addrack(1,15,3,(x,y,z) => Object({
  width: 1200, height: 1200, depth: 1000,
  x: x * 0 + 300,
  y: y * 1200,
  z: z * 1000 + 300 + 12000 + 1400,
}));
addrack(14,1,3,(x,y,z) => Object({
  width: 1000, height: 1200, depth: 1200,
  x: x * 1000 + 300,
  y: y * 1200,
  z: 30000 - 1200,
}));

const rack = {
  left: 0,
  top: 0,
  width: 100,
  depth: 50,
  shelfCount: 6,
}
var ileft,itop;
const paths = [
  ...[
    itop = 1800-500,
    itop-=50,
    itop-=200,
    itop-=50,
    itop-=200,
    itop-=50,
  ].map(itop => Object({
    left: 1800-(ileft=0), top: itop,
    racks: Array(14).fill(null).map(v=>Object({width:100,depth:50,shelfCount:6,top:0,left:ileft-=100})),
  })),

  {
    left: 1800-(ileft=0), top: itop-=250,
    racks: Array(11).fill(null).map(v=>Object({width:120,depth:100,shelfCount:1,top:0,left:ileft-=120})),
  },
  {
    left: 1800-(ileft=0), top: itop-=100,
    racks: Array(11).fill(null).map(v=>Object({width:120,depth:100,shelfCount:1,top:0,left:ileft-=120})),
  },

  {
    left: ileft=11*100,
    top: itop=1800-120,
    racks: Array(12).fill(null).map((o,i)=>Object({width:100,depth:120,shelfCount:3,top:0,left:-100*i}))
  },
  {
    left: 0,
    top: itop=1800-150-100,
    racks: Array(15).fill(null).map((o,i)=>Object({width:120,depth:100,shelfCount:3,top:-100*i,left:0}))
  },
  {
    left: 0,
    top: itop=0,
    racks: Array(14).fill(null).map((o,i)=>Object({width:100,depth:120,shelfCount:3,top:0,left:i*100}))
  },

  {
    left: 14*100, top:0,
    racks: [
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft=2*60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
    ],
  },
  {
    left: 14*100 + 450, top:0,
    racks: [
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft=2*60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
    ],
  },
  {
    left: 14*100 + 450 + 450, top:0,
    racks: [
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft=2*60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0,left:ileft+=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
      {width:60,depth:40,shelfCount:3,top:0+100,left:ileft-=60},
    ],
  },

  {
    left: 3000-120,
    top: itop=0,
    racks: Array(3).fill(null).map((o,i)=>Object({width:120,depth:100,shelfCount:3,top:i*100,left:0}))
  },

  {
    left: 3000-100,
    top: 1800-50,
    racks: Array(6).fill(null).map((o,i)=>Object({width:100,depth:50,shelfCount:6,top:0,left:-100*i})),
  },

];

aim.Elem.prototype.threejs = function(data) {
  console.log(this, data);
  (async () => {
    await aim.importScript('https://aliconnect.nl/sdk/dist/js/three/three.js');
    await aim.importScript('https://aliconnect.nl/sdk/dist/js/three/OrbitControls.js');

    let camera, scene, renderer;
    let mesh;
    const size = 30000;

    THREE.Mesh.prototype.setPosition = function(x,y,z){
      // console.log(this, this.geometry.parameters);
      this.position.x = -size/2+x+this.geometry.parameters.width/2;
      this.position.z = size/2-z-this.geometry.parameters.depth/2;
      this.position.y = y+this.geometry.parameters.height/2;
      this.material.opacity = 0.1;
      // this.up.y=0;
      return this;
    }
    THREE.Mesh.prototype.pos = function(x,y,z){
      // console.log(this, this.geometry.parameters);
      this.position.set(x,y,z);
      return this;
    }

    init();
    animate();

    // function floorplan(){}
    // floorplan.prototype = {
    //   wall(){
    //
    //   }
    // }



    function init() {



      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, size*2 );
      camera.position.z = size/2;
      camera.position.y = size/2;
      // camera.position.x = 15000;
      // camera.position.y = 15000;
      // camera.position.x = 100;

      scene = new THREE.Scene();
      holder = new THREE.Group();



      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      var floorMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
      var floorGeometry = new THREE.PlaneGeometry(size, size, 0, 0);
      var floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      holder.add(floor);


      //

      window.addEventListener( 'resize', onWindowResize );



      scene.add( holder );
      holder.position.y = -200;
      // holder.rotation.x = -Math.PI / 2;

      function hsl(h, s, l) {
        return (new THREE.Color()).setHSL(h, s, l);
      }
      function box(width, height, depth, material = {color: 0x888888}){
        return new THREE.Mesh(
          new THREE.BoxGeometry( width, height, depth ),
          new THREE.MeshPhongMaterial (material),
        )
      }
      const wandHoogte = 5000;
      const wandDikte = 300;
      const wallmat = {
        color: 0x888888,
        opacity: 0,
        transparent: true,
      }


      holder.add(
        box(wandDikte,wandHoogte,18000).setPosition(0, 0, 12000),
        box(wandDikte,wandHoogte,18000).setPosition(30000-wandDikte, 0, 12000),
        box(30000,wandHoogte,wandDikte).setPosition(0, 0, 30000),
        box(30000,1000,wandDikte).setPosition(0, 0, 12000),

        box(100,2500,6000,wallmat).setPosition(30000 - 5000, 0, 12000),
        box(5000,2500,100,wallmat).setPosition(30000 - 5000, 0, 12000 + 6000),
        box(5000,100,6000,wallmat).setPosition(30000 - 5000, 2500, 12000),
      );


      // var light = new THREE.PointLight( 0xff0000, 1, 100 );
      // light.position.set( 50, 50, 50 );
      // holder.add( light );
      //
      // var light = new THREE.PointLight(0xffffff, 0.8, 0, 20);
      // camera.add(light);

      var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
      light.position.set(0, 5000, 5000);
      holder.add(light);



      var light = new THREE.DirectionalLight(0xFFFFFF, 1);
      var light = new THREE.PointLight(0xffffff, 0.8, 0, 1000);
      light.position.set(0,5000,-5000);
      holder.add(light);
      // var light = new THREE.PointLight(0x0000ff, 0.8, 0, 1000);
      // light.position.set(0,5000,-5000);
      // holder.add(light);

      // holder.add(box(100,100,100,{color:'red'}).pos(0,5000,0));


      // var light = new THREE.PointLight(0xffffff, 0.8, 0, 20);
      // light.position.set(5000 , 5000, 5000);
      // holder.add(light);


      // const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
      // const geometry = new THREE.BoxGeometry( 200, 200, 200 );
      // const material = new THREE.MeshBasicMaterial({ color: 0x888888 });//THREE.MeshBasicMaterial( { map: texture } );
      // mesh = new THREE.Mesh( geometry, material );
      // holder.add( mesh );




      // return;

      console.log(stockpos);
      stockpos.forEach(pos => {
        const geo = new THREE.BoxGeometry( pos.width,pos.height,pos.depth );
        const edges = new THREE.EdgesGeometry( geo );
        const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x777777 } ) );
        const px = pos.x + -size/2 + geo.parameters.width/2;
        const pz = -pos.z + size/2 - geo.parameters.depth/2;
        const py = pos.y + geo.parameters.height/2;
        // this.material.opacity = 0.1;
        line.position.set(px,py,pz);
        holder.add(line);
        const material = new THREE.MeshPhongMaterial ({
          color: 'yellow',
          opacity: 0,
          transparent: true,
        });
        const mesh = pos.mesh = new THREE.Mesh(geo,material);
        mesh.position.set(px,py,pz);
        holder.add(mesh);
      })
      stockpos.forEach(pos => {
        if (Math.random()<0.05) pos.mesh.material.opacity = 0.3;
      })
    }


    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }
    function render() {
      renderer.render(scene, camera);
    }
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.zoomSpeed= 1;
    controls.addEventListener('change', render);

    function animate() {

      requestAnimationFrame( animate );

      // mesh.rotation.x += 0.005;
      // mesh.rotation.y += 0.01;

      renderer.render( scene, camera );

    }
  })();
};

console.log(paths);

(async function(){
  const body = await aim.fetch('mag.yaml').then(res => res.text());
  const body
  return console.log(body);

  aim.fetch('https://dms.aliconnect.nl/api/v1/abis/yaml',{method:post,body:body});
  // $(document.body).append(
  //   $('div').threejs({}),
  // );
  // return;
  $(document.body).append(
    $('canvas').width(3000).height(1800).style('max-width:100%;max-height:100%;'),
    // $('div').style('overflow:auto;').append(
    //   $('div').style('display:inline-block;width:3000px;height:1800px;border:solid 5px gray;transform: scale(0.3);transform-origin: 0 0;'),
    // ),
  );
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");

  picklist = [
    {loc: '4.6.1'},
    {loc: '5.3.1'},
    {loc: '3.11.2'},
    {loc: '1.7.3'},
    {loc: '2.4.2'},
    {loc: '5.2.1'},
    {loc: '11.7.1'},
  ];
  picklist.forEach(p => p.rack = p.loc.split('.').slice(0,2).map(v=>v-1).join('.'));


  // ctx.scale(0.4,0.4);
  paths.forEach((path,pi) => {
    path.racks.forEach((rack,ri) => {
      const [left,top] = [path.left + rack.left, path.top + rack.top];
      const rackid = [pi,ri].join('.');
      if (picklist.some(p=>p.rack === rackid)) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(left, top, rack.width, rack.depth);
      }
      ctx.beginPath();
      ctx.rect(left, top, rack.width, rack.depth);
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText([pi+1,ri+1].join('.'), left + rack.width / 2 - 26, top + rack.depth/2 + 9);
    })
  })
  ctx.beginPath();
  ctx.rect(0, 0, 3000, 1800);
  ctx.rect(3000-600, 1800-1200, 600, 1200);
  ctx.stroke();
  return;

  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 150, 75);
  return;
  $(document.body).append(
    $('div').threejs({}),
  );
})()
