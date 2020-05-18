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
      var forearm = this.superiorRight.getObjectByName("forearm");
      var arm = this.superiorRight.getObjectByName("arm");
  
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