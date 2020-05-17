let camera,scene,renderer;
let sceneSubjects = {}
let count = 0;

const setupCamera = () => {
   camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
   camera.position.set(20,40,20);
   camera.lookAt(new THREE.Vector3(0,0,0));
}

const setupRenderer = () => {
   renderer = new THREE.WebGLRenderer({antialia:true});
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setClearColor("#e5e5e5");
   document.body.appendChild(renderer.domElement);
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
   return createCharacter(gender, skincolor, haircolor, eyecolor, mouthcolor, bodycolor, legcolor, shoecolor);

}

const setupSubjects = () => {
   sceneSubjects.axes = new THREE.AxesHelper(10);
   sceneSubjects.sword = createSword();  
   sceneSubjects.character = setupCharacter();
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
}

// Movimentação dos objetos
const animate = () => {
   requestAnimationFrame(animate);

   // Rotação da câmera
   var cameraX = 30 * Math.cos(0.01 * count);
   var cameraZ = 30 * Math.sin(0.01 * count);
   camera.position.set(cameraX, 25, cameraZ);
   camera.lookAt(0,0,0);
   camera.updateProjectionMatrix

   renderer.render(scene, camera);

   count += 1;
}
function init() {
   setupCamera();
   setupRenderer();
   setupListeners();
   setupSubjects();
   setupScene(sceneSubjects);
   animate();
}

init();