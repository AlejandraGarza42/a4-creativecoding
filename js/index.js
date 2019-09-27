//based on an example found here: https://codepen.io/programking/pen/MyOQpO
const THREE = require('three');
const dat = require('dat.gui');
const OrbitControls = require('three-orbitcontrols');
const GLTFLoader = require('three-gltf-loader');

//need to declare these variables globally 
//creating a scene 
var scene, camera, renderer, controls;
var light;
//the cube
//var geometry, material;
//the 3d model 
var manager, loader, mesh;
//gui stuff 
var options, gui;
//things on menu
var cam, velocity, box;
//color
var API = {
    color: 0xffffff,
    exposure: 1.0
};

window.onload  = function(){
    //Creating a Scene 
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        44, window.innerWidth / window.innerHeight, 
        0.25, 20);
    camera.position.z = 0;
    camera.position.x = 0;
    camera.position.y = 12;
    //camera.lookAt(scene.position);
    //camera.updateMatrixWorld();

    //rendering 
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); //added 
    document.body.appendChild(renderer.domElement);
    
    //tone mapping 
    //renderer.toneMapping = new THREE.LinearToneMapping;
    //renderer.toneMappingExposure = API.exposure;
    renderer.gammaOutput = true;

    //controls 
    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.enableZoom = false;
    
    //light
    light = new THREE.PointLight(0xff0000, 1, 100);
    light.position.set(50,50,50);
    scene.add(light);
    //the cube 
    /*
    geometry = new THREE.BoxGeometry(5,5,5,5,5,5);
    material = new THREE.MeshBasicMaterial(
        {opacity: 0.1,
        blending: THREE.NormalBlending,
        depthTest: true});
    */
    //cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);
    
    //the 3d model 
    manager = new THREE.LoadingManager(render);
    loader = new GLTFLoader();
  
    loader.load('/3dModel/scene.gltf', (gltf) => {
        mesh = gltf.scene;
        scene.add(gltf.scene);
        console.log("should be loaded");
        gltf.scene.scale.set(5,5,5);

    })
   
      //loader = new THREE.TextureLoader(manager);
    //mesh = new THREE.Mesh();
    /*
    new GLTFLoader(manager).load('../3dModel/scene.gltf', function (gltf){
        mesh = gltf.scene;

        mesh.material = new THREE.MeshStandardMaterial({
            color: API.color
        });
    })*/
    //scene.add(mesh);
    //options for menu
    options = {
        velx: 0,
        vely: 0,
        camera: {
          speed: 0.0001
        },
        stop: function() {
          this.velx = 0;
          this.vely = 0;
        },
        reset: function() {
          this.velx = 0.1;
          this.vely = 0.1;
          camera.position.z = 75;
          camera.position.x = 0;
          camera.position.y = 0;
          mesh.scale.x = 1;
          mesh.scale.y = 1;
          mesh.scale.z = 1;
          mesh.material.wireframe = true;
        }
      };
      
    //setting up gui
    gui = new dat.GUI();

    //setting up menu
    cam = gui.addFolder('Camera');
    cam.add(options.camera, 'speed', 0, 0.0010).listen();
    cam.add(camera.position, 'y', 0, 100).listen();
    cam.open();

    velocity = gui.addFolder('Velocity');
    velocity.add(options, 'velx', -0.2, 0.2).name('X').listen();
    velocity.add(options, 'vely', -0.2, 0.2).name('Y').listen();
    velocity.open();

    //box = gui.addFolder('Mesh');
//     box.add(mesh.scale, 'x', 0, 3).name('Width').listen();
//     box.add(mesh.scale, 'y', 0, 3).name('Height').listen();
//     box.add(mesh.scale, 'z', 0, 3).name('Length').listen();
//    box.add(mesh.material, 'wireframe').listen();
  // box.open();

    gui.add(options, 'stop');
    gui.add(options, 'reset');

    /*
    gui.addColor(API, 'color')
        .listen()
        .onChange(function() {
            mesh.material.color.set(API.color);
            render();
        });
    */
    //gui
    //animation 
    render();
}

//cube animation
var render = function() {
    /*
    requestAnimationFrame(render);
  
    var timer = Date.now() * options.camera.speed;
    camera.position.x = Math.cos(timer) * 100;
    camera.position.z = Math.sin(timer) * 100;
    camera.lookAt(scene.position); 
    camera.updateMatrixWorld();
  */
    //cube.rotation.x += options.velx;
    //cube.rotation.y += options.vely;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  
  };

  