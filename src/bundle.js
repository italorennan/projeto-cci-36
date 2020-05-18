(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const createHead = require('./createHead');
const createInferior = require('./createInferior');
const createMiddle = require('./createMiddle');
const createSuperior = require('./createSuperior');
const createSimpleArmor = require('../equipments/armour/createSimpleArmour');
const {animateSword} = require("../equipments/weapons/sword");
const {animateAxe} = require("../equipments/weapons/axe");
const {animateAxe2} = require("../equipments/weapons/axe2");
const {animateArrow} = require("../equipments/weapons/arrow");
const {animateBow} = require("../equipments/weapons/bow");
const {animateShield} = require("../equipments/weapons/shield");

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
      this.weaponRight = null;
      this.weaponLeft = null;
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
      this.isEquipped = {
         inferior: false,
         superior: false,
         middle: false,
         helmet: false,
         weaponRight:false,
         weaponLeft:false
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

   equipArmor(armour){
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
      this.isEquipped = {
         inferior: true,
         superior: true,
         middle: true,
         helmet: true
      }
   
   }

   unequipArmor(){
      if(this.isEquipped.inferior){
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
         this.isEquipped.inferior = false;
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
         his.superior.name = "superior";
         this.entity.add(this.superior);
         this.isEquipped.superior = false;

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
         this.isEquipped.middle = false;
      }

      if(this.isEquipped.helmet){
         this.entity.remove(this.entity.getObjectByName(helmet));
         this.isEquipped.helmet = false;
      }

   }

   equipSimpleArmour(){
      const armourColor = "#808080";
      const otherColor = "#4f4f4f";
      const armour = createSimpleArmor(this.attributes.gender, this.attributes.hairColor, armourColor,otherColor);
      this.equipArmor(armour);
   }

   equipWeaponRight(weapon){
      this.weaponRight = weapon;
      this.isEquipped.weaponRight = true;
   }

   unequipWeaponRight(){
      this.weaponRight = null;
      this.isEquipped.weaponRight = false;
   }

   equipWeaponLeft(weapon){
      this.weaponLeft = weapon;
      this.isEquipped.weaponLeft = true;
   }

   unequipWeaponLeft(){
      this.weaponLeft = null;
      this.isEquipped.weaponLeft = false;
   }

   animateWeaponRight(){
      this.forearmUp = this.moveForearm();
      if(this.weaponRight.name == "arrow") animateArrow(this.entity, this.weaponRight);
      else if(this.weaponRight.name == "axe") animateAxe(this.entity, this.weaponRight, this.forearmUp);
      else if(this.weaponRight.name == "axe2") animateAxe2(this.entity, this.weaponRight, this.forearmUp);
      else if(this.weaponRight.name == "bow") animateBow(this.entity, this.weaponRight);
      else if(this.weaponRight.name == "shield") animateShield(this.entity, this.weaponRight);
      else if(this.weaponRight.name == "sword") animateSword(this.entity, this.weaponRight, this.forearmUp);

   }

   animateWeaponLeft(){
      if(this.weaponLeft.name == "arrow") animateArrow(this.entity, this.weaponLeft);
      else if(this.weaponLeft.name == "shield") animateShield(this.entity, this.weaponLeft);
   }
   
}
module.exports = Character;
},{"../equipments/armour/createSimpleArmour":6,"../equipments/weapons/arrow":7,"../equipments/weapons/axe":8,"../equipments/weapons/axe2":9,"../equipments/weapons/bow":10,"../equipments/weapons/shield":11,"../equipments/weapons/sword":12,"./createHead":2,"./createInferior":3,"./createMiddle":4,"./createSuperior":5}],2:[function(require,module,exports){
const createBox = require('../geometries/createBox');

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
},{"../geometries/createBox":14}],3:[function(require,module,exports){
const createBox = require('../geometries/createBox');

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
},{"../geometries/createBox":14}],4:[function(require,module,exports){
const createBox = require('../geometries/createBox');

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
},{"../geometries/createBox":14}],5:[function(require,module,exports){
const createBox = require('../geometries/createBox');

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
},{"../geometries/createBox":14}],6:[function(require,module,exports){
const createMiddle = require('../../character/createMiddle');
const createInferior = require('../../character/createInferior');
const createBox = require('../../geometries/createBox');
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

},{"../../character/createInferior":3,"../../character/createMiddle":4,"../../geometries/createBox":14}],7:[function(require,module,exports){
const {desvincularmaterial, changecolorgroup, criarcubo, espelhar} = require('../../geometries/functions');
function createArrow() {
  var asa = new THREE.Group();
  //Diagonal Principal

  localizacao = [
    [0.05, 0.45],
    [0.15, 0.35],
    [0.15, 0.15],
    [0.05, 0.05],
  ];
  for (var i = 0; i < 4; i++) {
    m = criarcubo(0.1, 0.1, 0.1, localizacao[i][0], localizacao[i][1], 0);
    m.material.color.setHex(0x7b68ee);
    asa.add(m);
  }

  var tronco = new THREE.Group();

  tronco.add(criarcubo(0.7, 0.1, 0.1, 0.55, 0.25, 0));
  tronco.children[0].material.color.setHex(0x4b0082);

  var pena = new THREE.Group();

  localizacao = [
    [0.95, 0.45],
    [0.95, 0.35],
    [0.95, 0.25],
    [0.95, 0.15],
    [0.95, 0.05],
    [1.05, 0.15],
    [1.05, 0.25],
    [1.05, 0.35],
    [1.15, 0.25],
  ];
  for (var i = 0; i < localizacao.length; i++) {
    m = criarcubo(0.1, 0.1, 0.1, localizacao[i][0], localizacao[i][1], 0);
    m.material.color.setHex(0x7b68ee);
    pena.add(m);
  }

  var flecha = new THREE.Group();
  flecha.add(asa);
  flecha.add(tronco);
  flecha.add(pena);

  flecha.scale.set(5, 5, 5);
  flecha.position.set(-1.25, 0, 0);
  flecha.rotateZ(-Math.PI / 2);
  flecha.name = "arrow";
  return flecha;
}

// Posicionar a flecha no antebraço esquerdo
function animateArrow(character, arrow) {
  var superiorLeft = character.getObjectByName("superiorLeft");
  var forearm = superiorLeft.getObjectByName("forearm");

  var forearmPosition = new THREE.Vector3(0, 0, 0);
  forearmPosition
    .add(forearm.position)
    .add(superiorLeft.position)
    .add(character.position);

  var x = forearmPosition.x - 1.25;
  var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
  var z =
    forearmPosition.z +
    (forearm.geometry.parameters.depth +
      arrow.children[0].children[0].geometry.parameters.depth) /
      2;

  arrow.position.set(x, y, z);
}

module.exports = {
   animateArrow,
   createArrow
}
},{"../../geometries/functions":15}],8:[function(require,module,exports){
const {desvincularmaterial, changecolorgroup, criarcubo, espelhar} = require('../../geometries/functions');

function createAxe() {

	//Controles de Camera

	var diagonalprincipal= new THREE.Group();
	//Diagonal Principal
	for (var i=0; i<12; i++)
	{
	m = criarcubo(0.1,0.1,0.1,0,0,0)
	m.material.color.setHex(0x696969);
	m.position.x=0.15+i/10;
	m.position.y=0.05+i/10;
	m.position.z=0;
	diagonalprincipal.add(m);
	}
	
	var diagonalabaixo= new THREE.Group();
	//Diagonal Principal
	for (var i=0; i<11; i++)
	{
	m = criarcubo(0.1,0.1,0.1,0,0,0)
	m.material.color.setHex(0x000000);
	m.position.x=0.25+i/10;
	m.position.y=0.05+i/10;
	m.position.z=0;
	diagonalabaixo.add(m);
	}
	
	var lado1= new THREE.Group();
	lado1.add(criarcubo(0.1,0.1,0.1,1.05,0.75,0))
	lado1.add(criarcubo(0.1,0.1,0.1,1.15,0.85,0))
	lado1.add(criarcubo(0.1,0.1,0.1,1.25,0.95,0))
	
	lado1.children[0].material.color.setHex(0xff0000);
	lado1.children[1].material.color.setHex(0xff0000);
	lado1.children[2].material.color.setHex(0xff0000);
	
	var lado2= new THREE.Group();
	lado2.add(criarcubo(0.1,0.1,0.1,1.05,0.65,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.15,0.75,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.25,0.85,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.35,0.95,0))

	lado2.children[0].material.color.setHex(0xff00ff);
	lado2.children[1].material.color.setHex(0xff00ff);
	lado2.children[2].material.color.setHex(0xff00ff);
	lado2.children[3].material.color.setHex(0xff00ff);

	var lado3= new THREE.Group();
	lado3.add(criarcubo(0.1,0.1,0.1,1.05,0.55,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.15,0.65,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.25,0.75,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.35,0.85,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.45,0.95,0))

	lado3.children[0].material.color.setHex(0x0000ff);
	lado3.children[1].material.color.setHex(0x0000ff);
	lado3.children[2].material.color.setHex(0x0000ff);
	lado3.children[3].material.color.setHex(0x0000ff);
	lado3.children[4].material.color.setHex(0x0000ff);
	
	var lado4= new THREE.Group();

	lado4.add(criarcubo(0.1,0.1,0.1,1.05,0.45,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.15,0.55,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.25,0.65,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.35,0.75,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.45,0.85,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.55,0.95,0))
	
	lado4.children[0].material.color.setHex(0x000000);
	lado4.children[1].material.color.setHex(0x000000);
	lado4.children[2].material.color.setHex(0x000000);
	lado4.children[3].material.color.setHex(0x000000);
	lado4.children[4].material.color.setHex(0x000000);
	lado4.children[5].material.color.setHex(0x000000);
	
	var lado5= new THREE.Group();

	lado5.add(criarcubo(0.1,0.1,0.1,1.15,0.45,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.25,0.55,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.35,0.65,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.45,0.75,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.55,0.85,0))

	lado5.children[0].material.color.setHex(0xf0000f);
	lado5.children[1].material.color.setHex(0xf0000f);
	lado5.children[2].material.color.setHex(0xf0000f);
	lado5.children[3].material.color.setHex(0xf0000f);
	lado5.children[4].material.color.setHex(0xf0000f);

	var axe= new THREE.Group();
	axe.add(lado3);
	axe.add(lado1);
	axe.add(lado2);
	axe.add(lado5);
	axe.add(lado4);
	axe.add(diagonalprincipal);
	axe.add(diagonalabaixo);
	
	axe.scale.set(5,5,5);
	axe.position.set(-0.5,0,0);
	axe.rotateY(-Math.PI/20);
	axe.name = "axe";
	return axe;
}

// Posicionar o machado e rotacionar junto com o antebraço
function animateAxe(character, axe, forearmUp) {
	var superiorRight = character.getObjectByName("superiorRight");
	var forearm = superiorRight.getObjectByName("forearm");

	var forearmPosition = new THREE.Vector3(0, 0, 0);
    forearmPosition.add(forearm.position).add(superiorRight.position).add(character.position);

	var x = forearmPosition.x;
	var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
	var z = forearmPosition.z + (forearm.geometry.parameters.depth + axe.children[0].children[0].geometry.parameters.depth) / 2;

    axe.position.set(x, y, z);
    
    if(forearmUp) axe.rotateY(-Math.PI/600);
    else axe.rotateY(Math.PI/600);
}		

module.exports = {
   animateAxe,
   createAxe
}
},{"../../geometries/functions":15}],9:[function(require,module,exports){
const {desvincularmaterial, changecolorgroup, criarcubo, espelhar} = require('../../geometries/functions');

function createAxe2() {

	var diagonalprincipal= new THREE.Group();
	//Diagonal Principal
	for (var i=0; i<12; i++)
	{
	m = criarcubo(0.1,0.1,0.1,0,0,0)
	m.material.color.setHex(0x696969);
	m.position.x=0.15+i/10;
	m.position.y=0.05+i/10;
	m.position.z=0;
	diagonalprincipal.add(m);
	}
	
	var diagonalabaixo= new THREE.Group();
	//Diagonal Principal
	for (var i=0; i<11; i++)
	{
	m = criarcubo(0.1,0.1,0.1,0,0,0)
	m.material.color.setHex(0x000000);
	m.position.x=0.25+i/10;
	m.position.y=0.05+i/10;
	m.position.z=0;
	diagonalabaixo.add(m);
	}
	
	
	var lado1= new THREE.Group();
	lado1.add(criarcubo(0.1,0.1,0.1,1.05,0.75,0))
	lado1.add(criarcubo(0.1,0.1,0.1,1.15,0.85,0))
	lado1.add(criarcubo(0.1,0.1,0.1,1.25,0.95,0))
	
	lado1.children[0].material.color.setHex(0xff0000);
	lado1.children[1].material.color.setHex(0xff0000);
	lado1.children[2].material.color.setHex(0xff0000);

	
	
	var lado2= new THREE.Group();
	lado2.add(criarcubo(0.1,0.1,0.1,1.05,0.65,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.15,0.75,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.25,0.85,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.35,0.95,0))

	lado2.children[0].material.color.setHex(0xff00ff);
	lado2.children[1].material.color.setHex(0xff00ff);
	lado2.children[2].material.color.setHex(0xff00ff);
	lado2.children[3].material.color.setHex(0xff00ff);

	


	var lado3= new THREE.Group();
	lado3.add(criarcubo(0.1,0.1,0.1,1.05,0.55,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.15,0.65,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.25,0.75,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.35,0.85,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.45,0.95,0))

	lado3.children[0].material.color.setHex(0x0000ff);
	lado3.children[1].material.color.setHex(0x0000ff);
	lado3.children[2].material.color.setHex(0x0000ff);
	lado3.children[3].material.color.setHex(0x0000ff);
	lado3.children[4].material.color.setHex(0x0000ff);
	

//	scene.add(criarcubo(0.1,0.1,0.1,1.45,0.75,0))
//	scene.add(criarcubo(0.1,0.1,0.1,1.45,0.85,0))
//	scene.add(criarcubo(0.1,0.1,0.1,1.45,0.95,0))
//	scene.add(criarcubo(0.1,0.1,0.1,1.55,1.05,0))
//	scene.add(criarcubo(0.1,0.1,0.1,1.65,1.15,0))
	
	
	var lado4= new THREE.Group();

	lado4.add(criarcubo(0.1,0.1,0.1,1.05,0.45,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.15,0.55,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.25,0.65,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.35,0.75,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.45,0.85,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.55,0.95,0))
	
	lado4.children[0].material.color.setHex(0x000000);
	lado4.children[1].material.color.setHex(0x000000);
	lado4.children[2].material.color.setHex(0x000000);
	lado4.children[3].material.color.setHex(0x000000);
	lado4.children[4].material.color.setHex(0x000000);
	lado4.children[5].material.color.setHex(0x000000);
	
	var lado5= new THREE.Group();

	lado5.add(criarcubo(0.1,0.1,0.1,1.15,0.45,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.25,0.55,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.35,0.65,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.45,0.75,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.55,0.85,0))


	lado5.children[0].material.color.setHex(0xf0000f);
	lado5.children[1].material.color.setHex(0xf0000f);
	lado5.children[2].material.color.setHex(0xf0000f);
	lado5.children[3].material.color.setHex(0xf0000f);
	lado5.children[4].material.color.setHex(0xf0000f);

	var junto= new THREE.Group();

	junto.add(lado1)
	junto.add(lado2)
	junto.add(lado3)
	junto.add(lado4)
	junto.add(lado5)
	junto.add(diagonalabaixo)
	var replica= new THREE.Group();
	
	replica=junto.clone()

	espelhar(replica,[1,-1,1])
	replica.rotation.z=90*Math.PI/180
	
	replica.position.x=0.1
	replica.position.y=-0.1
		
	var axe= new THREE.Group();	
	axe.add(replica)
	axe.add(junto)
	axe.add(diagonalprincipal)
	axe.add(diagonalabaixo)
	
	axe.position.set(-0.5,0,0);
	axe.rotateY(-Math.PI/20);
	axe.scale.set(5,5,5)
	axe.name = "axe2";
	return axe	
}

// Posicionar o machado e rotacionar junto com o antebraço
function animateAxe2(character, axe2, forearmUp) {
	var superiorRight = character.getObjectByName("superiorRight");
	var forearm = superiorRight.getObjectByName("forearm");

	var forearmPosition = new THREE.Vector3(0, 0, 0);
    forearmPosition.add(forearm.position).add(superiorRight.position).add(character.position);

	var x = forearmPosition.x;
	var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
	var z = forearmPosition.z + (forearm.geometry.parameters.depth + axe2.children[0].children[0].children[0].geometry.parameters.depth) / 2;

    axe2.position.set(x, y, z);
    
    if(forearmUp) axe2.rotateY(-Math.PI/600);
    else axe2.rotateY(Math.PI/600);
}	

module.exports = {
   animateAxe2,
   createAxe2
}
},{"../../geometries/functions":15}],10:[function(require,module,exports){
const {desvincularmaterial, changecolorgroup, criarcubo, espelhar} = require('../../geometries/functions');

function createBow()
{
	var diagonalprincipal= new THREE.Group();
	//Diagonal Principal
	for (var i=0; i<14; i++)
	{
	m = criarcubo(0.1,0.1,0.1,0,0,0)
	m.material.color.setHex(0x000080);
	m.position.x=0.15+i/10;
	m.position.y=0.05+i/10;
	m.position.z=0;
	diagonalprincipal.add(m);
	}
	
	//--------------
	
	//Contorno Externo Esquerdo
	//Contorno Externo Esquerdo Inferior
	var contornoexternoesquerdoinferior= new THREE.Group();
	//Diagonal Principal
	for (var i=0; i<10; i++)
	{
	m = criarcubo(0.1,0.1,0.1,0,0,0)
	m.material.color.setHex(0x000080);
	m.position.y=0.15+i/10;
	m.position.z=0;
	if(i<=3)
		m.position.x=0.05;
	else if (i<=6)
		m.position.x=0.15;
	else if(i<=8)
		m.position.x=0.25;
	else 
		m.position.x=0.35;
	contornoexternoesquerdoinferior.add(m);
	}				
	//Contorno Externo Esquerdo Superior	
	var contornoexternoesquerdosuperior=contornoexternoesquerdoinferior.clone()			
	espelhar(contornoexternoesquerdosuperior,[-1,1,1])
	contornoexternoesquerdosuperior.rotation.z=90*Math.PI/180;
	contornoexternoesquerdosuperior.position.x=1.50
	contornoexternoesquerdosuperior.position.y=1.50
	var contornoexternoesquerdo= new THREE.Group();
	contornoexternoesquerdo.add(contornoexternoesquerdoinferior)
	contornoexternoesquerdo.add(contornoexternoesquerdosuperior)

	//Contorno Externo Direito
		//Contorno Externo Direito Inferior			
	contornoexternodireitoinferior=contornoexternoesquerdoinferior.clone()
	contornoexternodireitoinferior.position.x+=0.2			
	contornoexternodireitoinferior.remove(contornoexternodireitoinferior.children[8])
	contornoexternodireitoinferior.children[8].position.y-=0.1	
	
		//Contorno Externo Direito Superior
	var contornoexternodireitosuperior=contornoexternodireitoinferior.clone()
	espelhar(contornoexternodireitosuperior,[-1,1,1])
	contornoexternodireitosuperior.rotation.z=90*Math.PI/180;
	contornoexternodireitosuperior.position.x=1.5
	contornoexternodireitosuperior.position.y=1.3
	var contornoexternodireito= new THREE.Group();			
	contornoexternodireito.add(contornoexternodireitoinferior)
	contornoexternodireito.add(contornoexternodireitosuperior)
	
	//miolo
		//Miolo Inferior
	var mioloinferior=contornoexternodireitoinferior.clone()
	mioloinferior.position.x=0.1
		//Miolo Superior
	miolosuperior=mioloinferior.clone()
	espelhar(miolosuperior,[-1,1,1])
	miolosuperior.rotation.z=90*Math.PI/180;
	miolosuperior.position.x=1.5		
	miolosuperior.position.y=1.4		
	
	var miolo= new THREE.Group();			
	miolo.add(mioloinferior)
	miolo.add(miolosuperior)

	//Cubos Complementaries
	var cuboscomplementares= new THREE.Group();
	cuboscomplementares.add(criarcubo(0.1,0.1,0.1,0.55,1.15,0))
	cuboscomplementares.add(criarcubo(0.1,0.1,0.1,0.45,1.05,0))
	cuboscomplementares.add(criarcubo(0.1,0.1,0.1,0.35,0.95,0))
	changecolorgroup(cuboscomplementares,0x4b0082);
	
	//Cores
	desvincularmaterial(mioloinferior)
	changecolorgroup(mioloinferior,0x000000)
	desvincularmaterial(miolosuperior)
	changecolorgroup(miolosuperior,0x0000ff)
	
	var arco= new THREE.Group();
	arco.add(cuboscomplementares)
	arco.add(contornoexternoesquerdo)
	arco.add(contornoexternodireito)
	arco.add(diagonalprincipal)
	arco.add(miolo)
	
	arco.scale.set(5,5,5);
	arco.position.set(0,0,0);
	arco.name = "bow";
	arco.rotateZ(Math.PI/4);
	return arco;
}

// Posicionar a flecha no antebraço direito
function animateBow(character, bow) {
	var superiorRight = character.getObjectByName("superiorRight");
	var forearm = superiorRight.getObjectByName("forearm");

	var forearmPosition = new THREE.Vector3(0, 0, 0);
    forearmPosition.add(forearm.position).add(superiorRight.position).add(character.position);

	var x = forearmPosition.x;
	var y = forearmPosition.y - forearm.geometry.parameters.height / 2 - 3.9;
	var z = forearmPosition.z + (forearm.geometry.parameters.depth + bow.children[0].children[0].geometry.parameters.depth) / 2;

    bow.position.set(x, y, z);
}

module.exports = {
   animateBow,
   createBow
}
},{"../../geometries/functions":15}],11:[function(require,module,exports){
const {desvincularmaterial, changecolorgroup, criarcubo, espelhar} = require('../../geometries/functions');

function createShield()
{
	var asa= new THREE.Group();
	//Diagonal Principal
	var escudo = new THREE.Group();
	
	colunas=[5,9,11,13,13,15,15,15,15,13,13,11,9,5];
	for (var i=0; i<colunas.length; i++)
	{	
		escudo.add(criarcubo(0.1,0.1*colunas[i],0.1,-0.65+0.1*i,0,0));
	}
	
	changecolorgroup(escudo,0x000000)
	escudo.children[3].material.color.setHex(0x4682b4);
	escudo.children[5].material.color.setHex(0x4682b4);
	escudo.children[8].material.color.setHex(0x4682b4);			
	escudo.children[10].material.color.setHex(0x4682b4);

	escudo.scale.set(5,5,5);
	escudo.name = "shield";
	return escudo;
}

// Posicionar o escudo no centro do antebraço direito do personagem
function animateShield(character, shield) {
	var superiorLeft = character.getObjectByName("superiorLeft");
	var forearm = superiorLeft.getObjectByName("forearm");

	var forearmPosition = new THREE.Vector3(0, 0, 0);
	forearmPosition.add(forearm.position).add(superiorLeft.position).add(character.position);

	var x = forearmPosition.x;
	var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
	var z = forearmPosition.z + (forearm.geometry.parameters.depth + shield.children[0].geometry.parameters.depth) / 2;

	shield.position.set(x, y, z);
}

module.exports = {
   animateShield,
   createShield
}
},{"../../geometries/functions":15}],12:[function(require,module,exports){
const {desvincularmaterial, changecolorgroup, criarcubo, espelhar} = require('../../geometries/functions');

function createSword() {
    var diagonalprincipal= new THREE.Group();
    //Diagonal Principal
	
	medida=1
    for (var i=0; i<16; i++)
    {
    m = criarcubo(medida,medida,medida,0,0,0)
    m.material.color.setHex(0x00ff00);
    m.position.x=0.5*medida+i*medida;
    m.position.y=0.5*medida+i*medida;
    m.position.z=0;
    diagonalprincipal.add(m);
    }

    //Criar as Duas Diagonais Adjacentes
    var diagonalabaixo= new THREE.Group();		
    
    //Clonar Trocando o Material
    diagonalabaixo = diagonalprincipal.clone();
    diagonalabaixo.traverse((node) => {if (node.isMesh) {node.material = node.material.clone();}}); 			//Para poder mudar a Cor
    diagonalabaixo.position.x=diagonalabaixo.position.x+medida
    diagonalabaixo.position.y=diagonalabaixo.position.y
    tamanho=diagonalabaixo.children.length
    diagonalabaixo.remove(diagonalabaixo.children[tamanho-1])

    var diagonalacima= new THREE.Group();					
    diagonalacima = diagonalprincipal.clone();
    diagonalacima.traverse((node) => {if (node.isMesh) {node.material = node.material.clone();}});

    diagonalacima.position.x=diagonalacima.position.x
    diagonalacima.position.y=diagonalacima.position.y+medida
    tamanho=diagonalacima.children.length
    diagonalacima.remove(diagonalacima.children[tamanho-1])
    //-------------------------------------------//		
                
                
    //Criando contorno			
    var contorno= new THREE.Group();
    for (var i=0; i<10; i++)
    {
        m = criarcubo(medida,medida,medida,0,0,0);
        m.position.x=4.5*medida+i*medida;
        m.position.y=6.5*medida+i*medida;
        m.position.z=0;
        contorno.add(m);
    }
    
    contorno2=new THREE.Group();
    contorno2=contorno.clone()
    contorno2.position.x=contorno2.position.x+2*medida
    contorno2.position.y=contorno2.position.y-2*medida
    //------------------------------------------------//
    
    var braco= new THREE.Group();
    
    for (var i=0; i<8; i++)
    {
        m = criarcubo(medida,medida,medida,0,0,0);
        m.position.x=2.5*medida+i*medida;
        m.position.y=9.5*medida-i*medida;
        m.position.z=0;
        braco.add(m);
    }
    
    //2 Cubinhos Faltando
    //scene.add(criarcubo(medida,medida,medida,0.25,0.05,0))
    //scene.add(criarcubo(medida,medida,medida,0.05,0.25,0))
    
    

    //Mudando as Cores
    for (var i=0; i<8; i++)
    {
        m = criarcubo(medida,medida,medida,0,0,0);
        m.position.x=2.5*medida+i*medida;
        m.position.y=9.5*medida-i*medida;
        m.position.z=0;
        braco.add(m);
    }

    //Mudando as Cores
    changecolorgroup(diagonalprincipal,0x800000)
    changecolorgroup(diagonalacima,0xff0000)
    changecolorgroup(diagonalabaixo,0xff0000)
    changecolorgroup(contorno,0xff8c00)
    changecolorgroup(contorno2,0xff8c00)
    changecolorgroup(braco,0x000000)
    
    var espada= new THREE.Group();
    espada.add(diagonalprincipal)
    espada.add(diagonalacima)
    espada.add(diagonalabaixo)
    espada.add(contorno)
    espada.add(contorno2)
    espada.add(braco)
    
    espada.position.x=10*medida
    
    espada.rotation.z=45*Math.PI/180
	
    espada.scale.set(0.6,0.6,0.6)
    espada.rotateX(Math.PI/20);
    espada.name = "sword";
    return espada;
}

// Posicionar a espada e rotacionar junto com o movimento do antebraço
function animateSword(character, sword, forearmUp) {
	var superiorRight = character.getObjectByName("superiorRight");
	var forearm = superiorRight.getObjectByName("forearm");

	var forearmPosition = new THREE.Vector3(0, 0, 0);
   forearmPosition.add(forearm.position).add(superiorRight.position).add(character.position);

	var x = forearmPosition.x;
	var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
	var z = forearmPosition.z + (forearm.geometry.parameters.depth + sword.children[0].children[0].geometry.parameters.depth) / 2;

    sword.position.set(x, y, z);
    
   if(forearmUp) sword.rotateX(Math.PI/600);
   else sword.rotateX(-Math.PI/600);
}

module.exports = {
   animateSword,
   createSword
}
},{"../../geometries/functions":15}],13:[function(require,module,exports){
const {createSword} = require("./sword");
const {createAxe} = require("./axe");
const {createAxe2} = require("./axe2");
const {createArrow} = require("./arrow");
const {createBow} = require("./bow");
const {createShield} = require("./shield");


function randomWeapon(scene)
{
   const maximum = 5;
   const minimum = 0;
   numeroaleatorio=randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
   const weapons = ["sword","axe","axe2","arrow","bow","shield"];	
   weapon=createWeapon(weapons[numeroaleatorio]);
   return weapon;

}

function createWeapon(key) {
	weapons= {
      sword: createSword(),
      axe: createAxe(),
      axe2: createAxe2(),
      arrow: createArrow(),
      bow: createBow(),
      shield: createShield()  
   }
	return weapons[key];
	
}

module.exports = {
   createWeapon,
   randomWeapon
}
},{"./arrow":7,"./axe":8,"./axe2":9,"./bow":10,"./shield":11,"./sword":12}],14:[function(require,module,exports){
// Criação de uma box genérica
function createBox(x, y, z, boxColor) {
    var geometry = new THREE.BoxGeometry(x, y, z);
    var material = new THREE.MeshBasicMaterial({color: boxColor});
    var box = new THREE.Mesh(geometry, material);

    return box;
}

module.exports = createBox
},{}],15:[function(require,module,exports){
function changecolorgroup(group,cor)
{
	for (var children=0;children<group.children.length;children+=1)
	{
		group.children[children].material.color.setHex(cor)
	}			
}
			
function criarcubo(tamanhox,tamanhoy,tamanhoz,eixox,eixoy,eixoz)
{
	// criando o cubo
	var geometry=new THREE.BoxGeometry(tamanhox,tamanhoy,tamanhoz);	// Tamanho
	var material=new THREE.MeshBasicMaterial({color:0xffff00}); // Cor
	var cube= new THREE.Mesh(geometry,material);

	cube.position.x=eixox
	cube.position.y=eixoy
	cube.position.z=eixoz
	return cube	
}
			
function desvincularmaterial(group)
{
    group.traverse((node) => {
		if (node.isMesh) 
		{
			node.material = node.material.clone();
		}});
}
		
function espelhar(group,escala)
{
	const scale = new THREE.Vector3(1, 1, 1);
	scale.x*=escala[0];
	scale.y*=escala[1];
	scale.z*=escala[2];
    group.scale.multiply(scale);
}

module.exports = {
   espelhar,
   desvincularmaterial,
   criarcubo,
   changecolorgroup
}
},{}],16:[function(require,module,exports){
const Character = require('./assets/character/Character.js');
const weapon = require('./assets/equipments/weapons/weapons');
let camera,scene,renderer,controls;
let sceneSubjects = {};
let count = 0;
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

const setupSubjects = () => {
   sceneSubjects.axesHelper = new THREE.AxesHelper(10);
   sceneSubjects.character = setupCharacter();

}

const setupScene = sceneSubjects => {
   scene = new THREE.Scene();
   Object.values(sceneSubjects).map( subject => {
      if(subject != character.weapon)
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

   if(character.isEquipped.weaponRight == true)
      character.animateWeaponRight();
   if(character.isEquipped.weaponLeft == true)
      character.animateWeaponLeft();

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
   console.log(character)
   animate();
}

init();
},{"./assets/character/Character.js":1,"./assets/equipments/weapons/weapons":13}]},{},[16]);
