const Character = require('./assets/character/Character.js');
const eventHandler = require('./eventHandler');
const createBackground = require('./assets/ambient/createBackground');
const { setupUniforms, updateTime } = require('./assets/shaders/multicolorShader');
const dat = require('./modules/dat.gui');
let camera, scene, renderer, controls, background;
let mouse = {x:0, y:0};
let sceneSubjects = [];
let count = 0;
let character;
let corUniforme=0xffffff;

const setupCamera = () => {
   camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
   camera.position.set(30,30,30);
   camera.lookAt(new THREE.Vector3(0,0,0));
}

const setupRenderer = () => {
   renderer = new THREE.WebGLRenderer({antialias:true});
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setClearColor("#e5e5e5");
   document.body.appendChild(renderer.domElement);
}

const setupControls = () => {
   controls = new THREE.OrbitControls( camera, renderer.domElement );

   const params = {
      color: 0xff00ff,
      speed: 0.5
   };
   var gui = new dat.GUI({ autoPlace: true });
   
   var folder1 = gui.addFolder('Cores');
   folder1.addColor( params, 'color' )
          .onChange( function() { corUniforme= params.color; } );
   folder1.open();

   var folder2 = gui.addFolder('Velocidade');
   folder2.add(params, 'speed', 0, 1)
          .onChange(function() {character.setSpeed(params.speed)});
   folder2.open();
}

const setupCharacter = () => {
   const attributes = {
      gender: "M",
      skinColor: "#ffe4c4",
      hairColor: "#b8860b",
      eyeColor: "#006400",
      mouthColor: "#f08080",
      bodyColor: "#00ccdd",
      legColor: "#0000ff",
      shoeColor:  "#999999",
      shader: 0
   }
   character =  new Character(attributes);
   return character.entity;
}

const setupSubjects = async () => {
   sceneSubjects.push(setupCharacter());
   background = await createBackground();
   backgroundElements = background.getBackgroundElementArray();
   backgroundElements.forEach( element => {
      sceneSubjects.push(element.entity);
   })
   console.log(sceneSubjects);
}

const setupScene = () => {
   scene = new THREE.Scene();
   sceneSubjects.forEach( subject => {
      if(subject != character.weapon){
         scene.add(subject);
         console.log(subject);
      }
   });
}

const setupListeners = () => {
   window.addEventListener('resize', e => eventHandler.handleResize(camera, renderer));

   document.body.addEventListener('click', event => {
      eventHandler.handleClick(event,character);
   });
   
   document.querySelector('.change-outfit').addEventListener('change', event => {
      eventHandler.handleChangeOutfit(event, character);
   });
   
   document.querySelector('.change-gender').addEventListener('change', event => {
      eventHandler.handleChangeGender(event, character);
   });

   document.body.addEventListener('keypress', event => {
      eventHandler.handleArrow(event, character);
   });

   window.addEventListener('mousedown',event =>{ 
      eventHandler.onDocMouseDown(event,scene,camera,character,corUniforme, background, mouse);
   });

   window.addEventListener('mouseup', event => {
      eventHandler.onDocMouseUp(event,background);
   })

   window.addEventListener('mousemove', event => {
      eventHandler.onMouseMove(event,mouse, background, camera);
   })

}

const setupLights = () => {
   const hlight = new THREE.AmbientLight(0xffffff,1)
   sceneSubjects.push(hlight);

   const directionalLight = new THREE.DirectionalLight(0xffffff,2);
   directionalLight.position.set(1,1,1);
   directionalLight.castShadow = true;
   sceneSubjects.push(directionalLight);

}

// Movimentação dos objetos
const animate = () => {
   requestAnimationFrame(animate);

   // Rotação da câmera
   camera.lookAt(0,0,0);
   camera.position.x = 40;
   camera.position.z = 40;
   camera.position.y = 40;

   //camera.position.x = 50*Math.cos(0.01*count);
   //camera.position.z = 50*Math.sin(0.01*count);

   camera.updateProjectionMatrix();
   controls.autoRotate = false;

   if(character.isEquipped.weaponRight === true) {
      character.animateWeaponRight();
   }
   if(character.isEquipped.weaponLeft === true) {
      character.animateWeaponLeft();
   }

   controls.update();

   character.moveCharacter();

   renderer.render(scene, camera);

   updateTime();

   count += 1;
}

async function init() {
   setupCamera();
   setupRenderer();
   setupControls();
   setupListeners();
   setupLights();
   setupUniforms();
   await setupSubjects();
   setupScene();
   window.onload = eventHandler.onLoad()
   animate();
}

init();
