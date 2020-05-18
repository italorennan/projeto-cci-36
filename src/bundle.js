(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const createHead = require('./createHead');
const createInferior = require('./createInferior');
const createMiddle = require('./createMiddle');
const createSuperior = require('./createSuperior');
const createSimpleArmour = require('../equipments/armour/createSimpleArmour');

class Character {
   
   constructor({gender, skinColor, hairColor, eyeColor, mouthColor, bodyColor, legColor, shoeColor}) {
      this.attributes = {
         gender,
         skinColor,
         hairColor,
         eyeColor,
         mouthColor,
         bodyColor,
         legColor,
         shoeColor
      }
      this.entity = new THREE.Group();    

      // Criação dos membros inferiores

      const inferiorLeft = createInferior(legColor, shoeColor);
      inferiorLeft.position.set(1.75, 4, 0);
      inferiorLeft.name = "inferiorLeft";

      const inferiorRight = createInferior(legColor, shoeColor);
      inferiorRight.position.set(-1.75, 4, 0);
      inferiorRight.name = "inferiorRight";

      this.inferior = new THREE.Group();
      this.inferior.add(inferiorLeft);
      this.inferior.add(inferiorRight);
      this.inferior.name = "inferior";
      this.entity.add(this.inferior);

      // Criação do meio

      this.middle = createMiddle(gender, bodyColor, legColor, hairColor);
      this.middle.position.set(0, 12, 0);
      this.middle.name = "middle";
      this.entity.add(this.middle);

      // Criação dos membros superiores

      const superiorLeft = createSuperior(skinColor, bodyColor);
      superiorLeft.position.set(4.25, 12, 0);
      superiorLeft.name = "superiorLeft";

      const superiorRight = createSuperior(skinColor, bodyColor);
      superiorRight.position.set(-4.25, 12, 0);
      superiorRight.name = "superiorRight";

      this.superior = new THREE.Group();
      this.superior.add(superiorLeft);
      this.superior.add(superiorRight);
      this.superior.name = "superior";
      this.entity.add(this.superior);

      // Criação da cabeça

      this.head = createHead(gender, skinColor, hairColor, eyeColor, mouthColor);
      this.head.position.set(0, 18, 0);
      this.head.name = "head";
      this.entity.add(this.head);

      this.forearmUp = false;
      this.armourEquiped = {
         inferior: false,
         superior: false,
         middle: false,
         helmet: false
      }
   }

   moveForearm(){
      var forearm = this.superior.getObjectByName("superiorRight").getObjectByName("forearm");
      var arm = this.superior.getObjectByName("superiorRight").getObjectByName("arm");
  
      if(this.forearmUp) {
         forearm.translateY(0.01);
         forearm.translateZ(0.01);
  
         if(forearm.position.y > arm.position.y) this.forearmUp = false;
      } else{
         forearm.translateY(-0.01);
         forearm.translateZ(-0.01);
  
         if(forearm.position.z < arm.position.z) this.forearmUp = true;
      }
      return this.forearmUp;
   }

   equipArmour(armour){
      //Removendo as partes atuais
      this.entity.remove(this.middle);
      this.middle = null;

      this.entity.remove(this.inferior);
      this.inferior = null;

      const sleeveLeft = this.superior.getObjectByName("superiorLeft").getObjectByName("sleeve");
      this.entity.remove(sleeveLeft);
      
      const sleeveRight = this.superior.getObjectByName("superiorRight").getObjectByName("sleeve");
      this.entity.remove(sleeveRight);

      this.inferior = armour.getObjectByName("inferior");
      this.middle = armour.getObjectByName("middle");
      this.superior.getObjectByName("superiorLeft").add(armour.getObjectByName("sleeveLeft"));
      this.superior.getObjectByName("superiorRight").add(armour.getObjectByName("sleeveRight"));
      
      this.entity.add(armour);
      this.armourEquiped = {
         inferior: true,
         superior: true,
         middle: true,
         helmet: true
      }
   
   }

   unequipArmour(){
      if(this.armourEquiped.inferior){
         this.entity.remove(this.inferior);
         const inferiorLeft = createInferior(this.attributes.legColor, this.attributes.shoeColor);
         inferiorLeft.position.set(1.75, 4, 0);
         inferiorLeft.name = "inferiorLeft";

         const inferiorRight = createInferior(this.attributes.legColor, this.attributes.shoeColor);
         inferiorRight.position.set(-1.75, 4, 0);
         inferiorRight.name = "inferiorRight";

         this.inferior = new THREE.Group();
         this.inferior.add(inferiorLeft);
         this.inferior.add(inferiorRight);
         this.inferior.name = "inferior";
         this.entity.add(this.inferior);
         this.armourEquiped.inferior = false;
      }

      if(this.armourEquipped.superior){
         this.entity.remove(this.superior);
         const superiorLeft = createSuperior(this.attributes.skinColor, this.attributes.bodyColor);
         superiorLeft.position.set(4.25, 12, 0);
         superiorLeft.name = "superiorLeft";

         const superiorRight = createSuperior(this.attributes.skinColor, this.attributes.bodyColor);
         superiorRight.position.set(-4.25, 12, 0);
         superiorRight.name = "superiorRight";

         this.superior = new THREE.Group();
         this.superior.add(superiorLeft);
         this.superior.add(superiorRight);
         this.superior.name = "superior";
         this.entity.add(this.superior);
         this.armourEquiped.superior = false;

      }
      
      if(this.armourEquipped.middle){
         this.entity.remove(this.inferior)
         this.middle = createMiddle(
            this.attributes.gender, 
            this.attributes.bodyColor, 
            this.attributes.legColor, 
            this.attributes.hairColor
         );
         this.middle.position.set(0, 12, 0);
         this.middle.name = "middle";
         this.entity.add(this.middle);
         this.armourEquiped.middle = false;
      }

      if(this.armourEquiped.helmet){
         this.entity.remove(this.entity.getObjectByName(helmet));
         this.armourEquiped.helmet = false;
      }

   }

   equipSimpleArmour(){
      const armourColor = "#808080";
      const otherColor = "#4f4f4f";
      const armour = createSimpleArmour(this.attributes.gender, this.attributes.hairColor, armourColor,otherColor);
      this.equipArmour(armour);
   }
   
}
module.exports = Character;
},{"../equipments/armour/createSimpleArmour":6,"./createHead":2,"./createInferior":3,"./createMiddle":4,"./createSuperior":5}],2:[function(require,module,exports){
// Criação do cabelo
function createHair(gender, hairColor) {
    var hair = new THREE.Group();
    
    // partes comuns para homem e mulher
    var hair1 = createBox(5, 0.5, 4, hairColor);
    hair1.position.set(0, 1.75, 0);
    hair.add(hair1);

    var hair2 = createBox(0.5, 0.5, 1, hairColor);
    hair2.position.set(2.25, 1.25, 1.5);
    hair.add(hair2);

    var hair3 = createBox(0.5, 0.5, 1, hairColor);
    hair3.position.set(-2.25, 1.25, 1.5);
    hair.add(hair3);

    var hair4 = createBox(5, 1.5, 3, hairColor);
    hair4.position.set(0, 0.75, -0.5);
    hair.add(hair4);

    var hair5 = createBox(5, 2, 2, hairColor);
    hair5.position.set(0, -1, -1);
    hair.add(hair5);
    
    if (gender == "F") { // personagem mulher
        var hair6 = createBox(4, 0.5, 4, hairColor);
        hair6.position.set(0, 1.25, 0);
        hair.add(hair6);

        var hair7 = createBox(2, 0.25, 4, hairColor);
        hair7.position.set(-1.5, 0.875, 0);
        hair.add(hair7);

        var hair8 = createBox(0.5, 0.25, 1, hairColor);
        hair8.position.set(2.25, 0.875, 1.5);
        hair.add(hair8);

        var hair9 = createBox(5, 2, 1, hairColor);
        hair9.position.set(0, -1, 0.5);
        hair.add(hair9);
    }

    return hair; 
}

// Criação dos olhos
function createEyes(eyeColor) {
    var eyes = new THREE.Group();

    var whiteLeft = createBox(0.5, 0.5, 1, "#ffffff");
    whiteLeft.position.set(-1.25, 0.5, 1.5);
    eyes.add(whiteLeft);

    var whiteRight = createBox(0.5, 0.5, 1, "#ffffff");
    whiteRight.position.set(1.25, 0.5, 1.5);
    eyes.add(whiteRight);

    var irisLeft = createBox(0.5, 0.5, 1, eyeColor);
    irisLeft.position.set(-0.75, 0.5, 1.5);
    eyes.add(irisLeft);

    var irisRight = createBox(0.5, 0.5, 1, eyeColor);
    irisRight.position.set(0.75, 0.5, 1.5);
    eyes.add(irisRight);

    return eyes;
}

// Criação da boca
function createMouth(mouthColor) {
    var mouth = createBox(1, 0.5, 2, mouthColor);
    mouth.position.set(0, -0.75, 1);

    return mouth;
}

// Criação do restante da cabeça
function createSkin(gender, skinColor) {
    var skin = new THREE.Group();

    // partes comuns para homem e mulher
    var skin1 = createBox(1, 0.5, 1, skinColor);
    skin1.position.set(0, 0.5, 1.5);
    skin.add(skin1);
    
    if (gender == "M") { // personagem homem
        var skin2 = createBox(4, 0.75, 1, skinColor);
        skin2.position.set(0, 1.125, 1.5);
        skin.add(skin2);

        var skin3 = createBox(3, 0.25, 1, skinColor);
        skin3.position.set(0, 0.125, 1.5);
        skin.add(skin3);

        var skin4 = createBox(5, 0.5, 2, skinColor);
        skin4.position.set(0, -0.25, 1);
        skin.add(skin4);

        var skin5 = createBox(0.5, 0.75, 1, skinColor);
        skin5.position.set(1.75, 0.375, 1.5);
        skin.add(skin5);

        var skin6 = createBox(0.5, 0.75, 1, skinColor);
        skin6.position.set(-1.75, 0.375, 1.5);
        skin.add(skin6);

        var skin7 = createBox(0.5, 1, 1, skinColor);
        skin7.position.set(2.25, 0.5, 1.5);
        skin.add(skin7);

        var skin8 = createBox(0.5, 1, 1, skinColor);
        skin8.position.set(-2.25, 0.5, 1.5);
        skin.add(skin8);

        var skin9 = createBox(2, 0.5, 2, skinColor);
        skin9.position.set(-1.5, -0.75, 1);
        skin.add(skin9);

        var skin10 = createBox(2, 0.5, 2, skinColor);
        skin10.position.set(1.5, -0.75, 1);
        skin.add(skin10);

        var skin11 = createBox(5, 1, 2, skinColor);
        skin11.position.set(0, -1.5, 1);
        skin.add(skin11);
    }

    else if (gender == "F") { // personagem mulher
        var skin2 = createBox(2.5, 0.25, 1, skinColor);
        skin2.position.set(0.75, 0.875, 1.5);
        skin.add(skin2);

        var skin3 = createBox(3, 0.75, 1, skinColor);
        skin3.position.set(0, -0.125, 1.5);
        skin.add(skin3);

        var skin4 = createBox(1, 1.25, 1, skinColor);
        skin4.position.set(2, 0.125, 1.5);
        skin.add(skin4);

        var skin5 = createBox(1, 1.25, 1, skinColor);
        skin5.position.set(-2, 0.125, 1.5);
        skin.add(skin5);

        var skin6 = createBox(2, 0.5, 1, skinColor);
        skin6.position.set(1.5, -0.75, 1.5);
        skin.add(skin6);

        var skin7 = createBox(2, 0.5, 1, skinColor);
        skin7.position.set(-1.5, -0.75, 1.5);
        skin.add(skin7);

        var skin8 = createBox(5, 1, 1, skinColor);
        skin8.position.set(0, -1.5, 1.5);
        skin.add(skin8);
    }

    return skin;
}

// Criação da cabeça = cabelo + olhos + boca + pele
function createHead(gender, skinColor, hairColor, eyeColor, mouthColor) {
    var head = new THREE.Group();

    var hair = createHair(gender, hairColor);
    hair.name = "hair";
    head.add(hair);

    var eyes = createEyes(eyeColor);
    eyes.name = "eyes";
    head.add(eyes);

    var mouth = createMouth(mouthColor);
    mouth.name = "mouth";
    head.add(mouth);

    var skin = createSkin(gender, skinColor);
    skin.name = "skin";
    head.add(skin);

    return head;
}
module.exports = createHead;
},{}],3:[function(require,module,exports){
// Criação de uma perna
function createLeg(legColor) {
    var leg = createBox(3, 6, 3, legColor);

    return leg;
}

// Criação de um pé
function createShoe(shoeColor) {
    var shoe = createBox(3, 2, 3, shoeColor);
    
    return shoe;
}

// Criação de um membro inferior = perna + pé
function createInferior(legColor, shoeColor) {
    var inferior = new THREE.Group();
    
    shoe = createShoe(shoeColor);
    shoe.position.set(0, -3, 0);
    shoe.name = "shoe";
    inferior.add(shoe);

    leg = createLeg(legColor);
    leg.position.set(0, 1, 0);
    leg.name = "leg";
    inferior.add(leg);

    return inferior;
}
module.exports = createInferior;
},{}],4:[function(require,module,exports){
// Criação do corpo
function createBody(gender, bodyColor, hairColor) {
    if (gender == "M") { // personagem homem
        var body = createBox(6.5, 6, 3, bodyColor);
    }

    else if (gender == "F") { // personagem mulher
        var body = new THREE.Group();

        var body1 = createBox(6.5, 3, 3, bodyColor);
        body1.position.set(0, -1.5, 0);
        body.add(body1);

        var body2 = createBox(5, 2, 3, bodyColor);
        body2.position.set(-0.75, 1, 0);
        body.add(body2);
        
        var body3 = createBox(4, 1, 3, bodyColor);
        body3.position.set(-1.25, 2.5, 0);
        body.add(body3);

        var body4 = createBox(0.5, 1, 3, bodyColor);
        body4.position.set(3, 0.5, 0);
        body.add(body4);

        var hair1 = createBox(1, 1, 3, hairColor);
        hair1.position.set(2.25, 0.5, 0);
        body.add(hair1);

        var hair2 = createBox(1.5, 1, 3, hairColor);
        hair2.position.set(2.5, 1.5, 0);
        body.add(hair2);

        var hair3 = createBox(2.5, 1, 3, hairColor);
        hair3.position.set(2, 2.5, 0);
        body.add(hair3);
    }

    return body;
}

// Criação da cintura
function createWaist(waistColor) {
    var waist = createBox(6.5, 2, 3, waistColor);

    return waist;
}

// Criação do meio = tronco, cintura
function createMiddle(gender, bodyColor, waistColor, hairColor) {
    var middle = new THREE.Group();

    var waist = createWaist(waistColor);
    waist.position.set(0, -3, 0);
    middle.add(waist);

    const body = createBody(gender, bodyColor, hairColor);
    body.position.set(0, 1, 0);
    middle.add(body);

    return middle;
}
module.exports = createMiddle;
},{}],5:[function(require,module,exports){
// Criação de um manga da camisa
function createSleeve(sleeveColor) {
    var sleeve = createBox(2, 2, 3, sleeveColor);

    return sleeve;
}

// Criação de um braço
function createArm(skinColor) {
    var whole = new THREE.Group();
    
    var arm = createBox(2, 3, 3, skinColor);
    arm.position.set(0, 1.5, 0);
    arm.name = "arm";
    whole.add(arm);

    var forearm = createBox(2, 3, 3, skinColor);
    forearm.position.set(0, -1.5, 0);
    forearm.name = "forearm";
    whole.add(forearm);

    return whole;
}

// Criação de um membro superior = manga + braço
function createSuperior(skinColor, sleeveColor) {
    var superior = new THREE.Group();

    var sleeve = createSleeve(sleeveColor);
    sleeve.position.set(0, 3, 0);
    sleeve.name = "sleeve";
    superior.add(sleeve);

    var whole = createArm(skinColor);
    whole.position.set(0, -1, 0);
    whole.name = "whole";
    superior.add(whole);

    return superior;
}

module.exports = createSuperior;
},{}],6:[function(require,module,exports){
const createMiddle = require('../../character/createMiddle');
const createInferior = require('../../character/createInferior');

// Criar capacete da armadura
function createSimpleHelmet(otherColor) {
    var helmet = new THREE.Group();

    var helmet1 = createBox(7, 1, 5, otherColor);
    helmet1.position.set(0, 2, 0);
    helmet.add(helmet1);

    var helmet2 = createBox(1, 4, 5, otherColor);
    helmet2.position.set(3, -0.5, 0);
    helmet.add(helmet2);

    var helmet3 = createBox(1, 4, 5, otherColor);
    helmet3.position.set(-3, -0.5, 0);
    helmet.add(helmet3);

    var helmet4 = createBox(7, 4, 1, otherColor);
    helmet4.position.set(0, -0.5, -2);
    helmet.add(helmet4);

    var helmet5 = createBox(7, 2, 1, otherColor);
    helmet5.position.set(0, 1.5, 2.5);
    helmet.add(helmet5);

    var helmet6 = createBox(1, 0.75, 1, otherColor);
    helmet6.position.set(0, 0.125, 2.5);
    helmet.add(helmet6);

    return helmet;
}


// Criar armadura simples para o personagem
function createSimpleArmour(gender, hairColor, armourColor, otherColor) {
    var armour = new THREE.Group();

   var middleArmour = createMiddle(gender, armourColor, otherColor, hairColor);
   middleArmour.position.set(0,12,0);
   middleArmour.name = "middle";
   armour.add(middleArmour);

    var inferiorLeftArmour = createInferior(armourColor, armourColor);
    inferiorLeftArmour.position.set(1.75, 4, 0);
    inferiorLeftArmour.name = "inferiorLeft";

    var inferiorRightArmour = createInferior(armourColor, armourColor);
    inferiorRightArmour.position.set(-1.75, 4, 0);
    inferiorRightArmour.name = "inferiorRight";

    const inferiorArmour = new THREE.Group();
    inferiorArmour.name = "inferior";
    inferiorArmour.add(inferiorRightArmour);
    inferiorArmour.add(inferiorLeftArmour);
    armour.add(inferiorArmour);

    var sleeveLeft = createBox(2, 2, 3, otherColor);
    sleeveLeft.position.set(0, 3, 0);
    sleeveLeft.name = "sleeveLeft";
    armour.add(sleeveLeft);

    var sleeveRight = createBox(2, 2, 3, otherColor);
    sleeveRight.position.set(0, 3, 0);
    sleeveRight.name = "sleeveRight";
    armour.add(sleeveRight);

    var helmet = createSimpleHelmet(otherColor);
    helmet.position.set(0, 18.5, -0.5);
    helmet.name = "helmet";
    armour.add(helmet);

    return armour;
}

module.exports = createSimpleArmour;

},{"../../character/createInferior":3,"../../character/createMiddle":4}],7:[function(require,module,exports){
const Character = require('./assets/character/Character.js');
let camera,scene,renderer,controls;
let sceneSubjects = {};
let count = 0;
let forearmUp = true;
let character;


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
   skinColor = "#ffe4c4";
   hairColor = "#b8860b";
   eyeColor = "#006400";
   mouthColor = "#f08080";
   bodyColor = "#00ccdd";
   legColor = "#0000ff";
   shoeColor =  "#999999";
   character =  new Character({gender, skinColor, hairColor, eyeColor, mouthColor, bodyColor, legColor, shoeColor});
   character.equipSimpleArmour();
   console.log(character);
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
      character.forearmUp = equip(character, subject);
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
},{"./assets/character/Character.js":1}]},{},[7]);
