const Character = require('./assets/character/Character.js');
let camera,scene,renderer,controls;
let sceneSubjects = {};
let count = 0;
let forearmUp = true;



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
   gender = "F";
   skincolor = "#ffe4c4";
   haircolor = "#b8860b";
   eyecolor = "#006400";
   mouthcolor = "#f08080";
   bodycolor = "#00ccdd";
   legcolor = "#0000ff";
   shoecolor =  "#999999";
   const character =  new Character({gender, skincolor, haircolor, eyecolor, mouthcolor, bodycolor, legcolor, shoecolor});

   character.equipSimpleArmour();

   return character.entity;
}

const setupSubjects = () => {
   sceneSubjects.axes = new THREE.AxesHelper(10);
   sceneSubjects.character = setupCharacter();

   sceneSubjects.sword = createSword();
   //sceneSubjects.axe = createAxe();
   //sceneSubjects.axe2 = createAxe_2();
   //sceneSubjects.arrow = createArrow();
	//sceneSubjects.bow = createBow();
   //sceneSubjects.shield = createShield();

   //sceneSubjects.weapon=createWeapon(5)
//   createWeapon(0,scene)
}

const setupScene = sceneSubjects => {
   scene = new THREE.Scene();
   Object.values(sceneSubjects).map( subject => {
      scene.add(subject);
   });
}

const setupListeners = () => {
   window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth/window.innerHeight;
      renderer.setSize(window.innerWidth,window.innerHeight);
      camera.updateProjectionMatrix();
   })
   //document.querySelector( '#ChangeWeapon').addEventListener('click', ChangeWeapon, false )

}

function ChangeWeapon() {
RandomWeapon(scene)
}

//const button = document.querySelector( '#ChangeWeapon' );
// Movimentação dos objetos
const animate = () => {
   requestAnimationFrame(animate);

   // Rotação da câmera
   var cameraX = 30 * Math.cos(0.01 * count);
   var cameraZ = 30 * Math.sin(0.01 * count);
   //camera.position.set(cameraX, 25, cameraZ);
   camera.lookAt(0,0,0);
   camera.position.x = cameraX;
   camera.position.z = cameraZ;

   controls.autoRotate=false;
   
   // Equipar a arma presente
   Object.values(sceneSubjects).map( subject => {
      forearmUp = equip(sceneSubjects.character, subject, forearmUp);
   });

   controls.update();

   renderer.render(scene, camera);

   count += 1;
}

function init() {
   setupCamera();
   setupRenderer();
   setupControls();
   setupListeners();
   setupSubjects();
   setupScene(sceneSubjects);

   animate();
}

init();