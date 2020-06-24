const Character = require('./assets/character/Character.js');
const eventHandler = require('./eventHandler');
const createBackground = require('./assets/ambient/createBackground');
const { setupUniforms, updateTime } = require('./assets/shaders/multicolorShader');
let camera, scene, renderer, controls;
let sceneSubjects = [];
let count = 0;
let character;
let texture='normal';

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
   const background = await createBackground();
   const backgroundElements = background.getBackgroundElementArray();
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
}

const setupLights = () => {
   const hlight = new THREE.AmbientLight(0xffffff,1)
   sceneSubjects.push(hlight);

   const directionalLight = new THREE.DirectionalLight(0xffffff,2);
   directionalLight.position.set(1,1,1);
   directionalLight.castShadow = true;
   sceneSubjects.push(directionalLight);

   // const light1 = new THREE.PointLight(0xc4c4c4,10);
   // light1.position.set(0,300,500)
   // sceneSubjects.push(light1);

   // const light2 = new THREE.PointLight(0xc4c4c4,10);
   // light2.position.set(500,100,0)
   // sceneSubjects.push(light2);

   // const light3 = new THREE.PointLight(0xc4c4c4,10);
   // light3.position.set(0,100,-500)
   // sceneSubjects.push(light3);

   // const light4 = new THREE.PointLight(0xc4c4c4,10);
   // light4.position.set(-500,300,0)
   // sceneSubjects.push(light4);
}

// Movimentação dos objetos
const animate = () => {
   requestAnimationFrame(animate);

   // Rotação da câmera
   camera.lookAt(0,0,0);
   camera.position.x = 50*Math.cos(0.01*count);
   camera.position.z = 50*Math.sin(0.01*count);
   camera.updateProjectionMatrix();
   controls.autoRotate=false;

   if(character.isEquipped.weaponRight == true){
      character.animateWeaponRight();
   }
   if(character.isEquipped.weaponLeft == true){
      character.animateWeaponLeft();
   }

   controls.update();

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
   console.log(scene);
   animate();
}

init();