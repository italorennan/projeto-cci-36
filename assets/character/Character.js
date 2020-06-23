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
   
   constructor({gender, skinColor, hairColor, eyeColor, mouthColor, bodyColor, legColor, shoeColor, shader}) {
      this.attributes = {
         gender,
         skinColor,
         hairColor,
         eyeColor,
         mouthColor,
         bodyColor,
         legColor,
         shoeColor,
         shader
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

      this.middle = createMiddle(gender, bodyColor, legColor, hairColor, shader);
      this.middle.position.set(0, 12, 0);
      this.middle.name = "middle";
      this.entity.add(this.middle);

      // Criação dos membros superiores

      const superiorLeft = createSuperior(skinColor, bodyColor, shader, "left");
      superiorLeft.position.set(4.25, 12, 0);
      superiorLeft.name = "superiorLeft";

      const superiorRight = createSuperior(skinColor, bodyColor, shader, "right");
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

      this.entity.remove(this.superior);
      this.superior = null;

      this.inferior = armour.getObjectByName("inferior");
      this.middle = armour.getObjectByName("middle");

      this.superior = new THREE.Group();

      const superiorLeft = createSuperior(this.attributes.skinColor, this.attributes.bodyColor, 0, "left");
      superiorLeft.position.set(4.25, 12, 0);
      superiorLeft.name = "superiorLeft";
      const sleeveLeft = superiorLeft.getObjectByName("sleeve");
      superiorLeft.remove(sleeveLeft);

      const superiorRight = createSuperior(this.attributes.skinColor, this.attributes.bodyColor, 0, "right");
      superiorRight.position.set(-4.25, 12, 0);
      superiorRight.name = "superiorRight";
      const sleeveRight = superiorRight.getObjectByName("sleeve");
      superiorRight.remove(sleeveRight);

      superiorLeft.add(armour.getObjectByName("sleeveLeft"));
      superiorRight.add(armour.getObjectByName("sleeveRight"));

      this.superior.add(superiorLeft);
      this.superior.add(superiorRight);

      this.entity.add(this.superior);
      this.entity.add(armour.getObjectByName("helmet"));
      this.entity.add(armour.getObjectByName("inferior"));
      this.entity.add(armour.getObjectByName("middle"));
      this.isEquipped = {
         ...this.isEquipped,
         inferior: true,
         superior: true,
         middle: true,
         helmet: true,
      }
   }

   unequipArmour(){
      if(this.isEquipped.inferior){
         this.entity.remove(this.inferior);
         this.entity.parent.remove(this.inferior);
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

      if(this.isEquipped.superior){
         this.entity.remove(this.superior);
         const superiorLeft = createSuperior(this.attributes.skinColor, this.attributes.bodyColor, this.attributes.shader, "left");
         superiorLeft.position.set(4.25, 12, 0);
         superiorLeft.name = "superiorLeft";

         const superiorRight = createSuperior(this.attributes.skinColor, this.attributes.bodyColor, this.attributes.shader, "right");
         superiorRight.position.set(-4.25, 12, 0);
         superiorRight.name = "superiorRight";

         this.superior = new THREE.Group();
         this.superior.add(superiorLeft);
         this.superior.add(superiorRight);
         this.superior.name = "superior";
         this.entity.add(this.superior);
         this.isEquipped.superior = false;

      }
      
      if(this.isEquipped.middle){
         this.entity.remove(this.middle)
         this.middle = createMiddle(
            this.attributes.gender, 
            this.attributes.bodyColor, 
            this.attributes.legColor, 
            this.attributes.hairColor,
            this.attributes.shader
         );
         this.middle.position.set(0, 12, 0);
         this.middle.name = "middle";
         this.entity.add(this.middle);
         this.isEquipped.middle = false;
      }

      if(this.isEquipped.helmet){
         console.log(this.entity.getObjectByName("helmet"));
         this.entity.remove(this.entity.getObjectByName("helmet"));
         console.log(this.entity.getObjectByName("helmet"))
         this.isEquipped.helmet = false;
      }

   }

   equipSimpleArmour(){
      const armourColor = "#808080";
      const otherColor = "#4f4f4f";
      const armour = createSimpleArmor(this.attributes.gender, this.attributes.hairColor, armourColor, otherColor);
      this.equipArmor(armour);
   }

   equipWeaponRight(weapon){
      if(this.isEquipped.weaponRight && this.weaponRight.name == weapon.name)
         return;
      this.forearmUp = true;
      this.superior.getObjectByName("superiorRight").getObjectByName("forearm").position.set(0,-1.5,0);

      if(this.isEquipped.weaponRight){
         this.unequipWeaponRight();
      }

      this.weaponRight = weapon;
      this.isEquipped.weaponRight = true;
      this.entity.parent.add(weapon);
   }

   unequipWeaponRight(){
      this.entity.parent.remove(this.weaponRight);
      this.weaponRight = null;
      this.isEquipped.weaponRight = false;
   }

   equipWeaponLeft(weapon){
      if(this.isEquipped.weaponLeft)
         this.unequipWeaponLeft();
      this.weaponLeft = weapon;
      this.isEquipped.weaponLeft = true;
      this.entity.parent.add(weapon);
   }

   unequipWeaponLeft(){
      this.entity.parent.remove(this.weaponLeft);
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

   changeOutfit(shader) {
      this.attributes.shader = shader;

      //Removendo as partes atuais

      this.entity.remove(this.middle);
      this.middle = null;

      this.entity.remove(this.superior);
      this.superior = null;

      // Criação do meio

      this.middle = createMiddle(this.attributes.gender, this.attributes.bodyColor, this.attributes.legColor, this.attributes.hairColor, shader);
      this.middle.position.set(0, 12, 0);
      this.middle.name = "middle";
      this.entity.add(this.middle);

      // Criação dos membros superiores

      const superiorLeft = createSuperior(this.attributes.skinColor, this.attributes.bodyColor, shader, "left");
      superiorLeft.position.set(4.25, 12, 0);
      superiorLeft.name = "superiorLeft";

      const superiorRight = createSuperior(this.attributes.skinColor, this.attributes.bodyColor, shader, "right");
      superiorRight.position.set(-4.25, 12, 0);
      superiorRight.name = "superiorRight";

      this.superior = new THREE.Group();
      this.superior.add(superiorLeft);
      this.superior.add(superiorRight);
      this.superior.name = "superior";
      this.entity.add(this.superior);
   }
   
   changeGender(gender) {
      this.attributes.gender = gender;

      this.entity.remove(this.middle);
      this.middle = null;

      this.entity.remove(this.head);
      this.head = null;

      // Criação do meio

      this.middle = createMiddle(gender, this.attributes.bodyColor, this.attributes.legColor, this.attributes.hairColor, this.attributes.shader);
      this.middle.position.set(0, 12, 0);
      this.middle.name = "middle";
      this.entity.add(this.middle);

      // Criação da cabeça

      this.head = createHead(gender, this.attributes.skinColor, this.attributes.hairColor, this.attributes.eyeColor, this.attributes.mouthColor);
      this.head.position.set(0, 18, 0);
      this.head.name = "head";
      this.entity.add(this.head);
   }
}
module.exports = Character;