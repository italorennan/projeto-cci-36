const createHead = require('./createHead');
const createInferior = require('./createInferior');
const createMiddle = require('./createMiddle');
const createSuperior = require('./createSuperior');

class Character {
   
   constructor(gender, skinColor, hairColor, eyeColor, mouthColor, bodyColor, legColor, shoeColor) {
      this.entity = new THREE.Group();    

      // Criação dos membros inferiores

      this.inferiorLeft = createInferior(legColor, shoeColor);
      this.inferiorLeft.position.set(1.75, 4, 0);
      this.inferiorLeft.name = "inferiorLeft";

      this.inferiorRight = createInferior(legColor, shoeColor);
      this.inferiorRight.position.set(-1.75, 4, 0);
      this.inferiorRight.name = "inferiorRight";

      this.inferior = new THREE.Group();
      this.inferior.add(inferiorLeft);
      this.inferior.add(inferiorRight);
      this.inferior.name = "inferior";
      this.character.add(inferior);

      // Criação do meio

      this.middle = createMiddle(gender, bodyColor, legColor, hairColor);
      this.middle.position.set(0, 12, 0);
      this.middle.name = "middle";
      this.character.add(middle);

      // Criação dos membros superiores

      this.superiorLeft = createSuperior(skinColor, bodyColor);
      this.superiorLeft.position.set(4.25, 12, 0);
      this.superiorLeft.name = "superiorLeft";

      this.superiorRight = createSuperior(skinColor, bodyColor);
      this.superiorRight.position.set(-4.25, 12, 0);
      this.superiorRight.name = "superiorRight";

      this.superior = new THREE.Group();
      this.superior.add(superiorLeft);
      this.superior.add(superiorRight);
      this.superior.name = "superior";
      this.character.add(superior);

      // Criação da cabeça

      this.head = createHead(gender, skinColor, hairColor, eyeColor, mouthColor);
      this.head.position.set(0, 18, 0);
      this.head.name = "head";
      this.character.add(head);

      this.forearmUp = false;

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
   }   
}
module.exports = Character;