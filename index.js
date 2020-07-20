const Character = require('./assets/character/Character.js');
const eventHandler = require('./eventHandler');
const createBackground = require('./assets/ambient/createBackground');
let camera,scene,renderer,controls;
const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let intersects = []
let sceneSubjects = [];
let count = 0;
let character;
let background, backgroundElements;


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
   controls.autoRotate=false;
}

const setupCharacter = () => {
   const attributes = {
      gender: "F",
      skinColor: "#ffe4c4",
      hairColor: "#b8860b",
      eyeColor: "#006400",
      mouthColor: "#f08080",
      bodyColor: "#00ccdd",
      legColor: "#0000ff",
      shoeColor:  "#999999"
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
      }
   });
}

const setupListeners = () => {
   window.addEventListener('resize', e => eventHandler.handleResize(camera,renderer));
   console.log(raycaster); 
   document.body.addEventListener('click', event => { eventHandler.handleClick({
      event,
      character,
      background,
      intersects
   })});
   window.addEventListener('mousemove', event => eventHandler.handleMouseMove(event,mouse));

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
   //camera.position.x = 50*Math.cos(0.01*count);
   //camera.position.z = 50*Math.sin(0.01*count);
   camera.updateMatrixWorld();
   raycaster.setFromCamera(mouse, camera);
   intersects = raycaster.intersectObjects(scene.children);
   console.log(intersects);

   if(character.isEquipped.weaponRight == true){
      character.animateWeaponRight();
   }
   if(character.isEquipped.weaponLeft == true){
      character.animateWeaponLeft();
   }

   //controls.update();

   renderer.render(scene, camera);

   count += 1;
}

async function init() {
   setupCamera();
   setupRenderer();
   setupControls();
   setupListeners();
   setupLights();
   await setupSubjects();
   setupScene();
   console.log(scene);
   animate();
}

init();