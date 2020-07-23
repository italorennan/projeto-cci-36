const {createWeapon} = require('./assets/equipments/weapons/weapons');
let texture='normal';
const {changecolorgroup} = require('./assets/geometries/functions');


const handleClick = (event,character) => {
   console.log(character);
   event.preventDefault();
   switch(event.target.className){
      case "axe-button":
		 console.log(texture)
         character.equipWeaponRight(createWeapon("axe",texture));
         break;
      case "sword-button":
         character.equipWeaponRight(createWeapon("sword",texture));
         break;
      case "axe2-button":
         character.equipWeaponRight(createWeapon("axe2",texture));
         break;
      case "bow-button":
         character.equipWeaponRight(createWeapon("bow",texture));
         break;
      case "arrow-button":
         character.equipWeaponLeft(createWeapon("arrow",texture));
         break;
      case "shield-button":
         character.equipWeaponLeft(createWeapon("shield",texture));
         break;
      case "armor-equip-button":
		 character.equipSimpleArmour(texture);
         break;
      case "armor-unequip-button":
         character.unequipArmour();
         break;
      case "weapon-unequip-button":
         character.unequipWeaponRight();
         character.unequipWeaponLeft();
         break;
	case "normal":
         texture='normal';
		 character.unequipWeaponRight();
         character.unequipWeaponLeft();
         character.unequipArmour();
         break;
	case "stone":
         texture='stone';
		 character.unequipWeaponRight();
         character.unequipWeaponLeft();
         character.unequipArmour();
         break;
	case "wood":
         texture='wood';
		 character.unequipWeaponRight();
         character.unequipWeaponLeft();
         character.unequipArmour();
         break;
	case 'rainbow':
         texture='rainbow';
		 character.unequipWeaponRight();
         character.unequipWeaponLeft();
         character.unequipArmour();
         break;
	case 'silver':
         texture='silver';
		 character.unequipWeaponRight();
         character.unequipWeaponLeft();
         character.unequipArmour();
         break;
	case 'gold':
         texture='gold';
		 character.unequipWeaponRight();
         character.unequipWeaponLeft();
         character.unequipArmour();
         break;
	case 'diamond':
         texture='diamond';
		 character.unequipWeaponRight();
         character.unequipWeaponLeft();
         character.unequipArmour();
         break;
   }
}

const handleResize = (camera, renderer) => {
   camera.aspect = window.innerWidth/window.innerHeight;
   renderer.setSize(window.innerWidth,window.innerHeight);
   camera.updateProjectionMatrix();
}

const onDocMouseDown = (event,scene,camera,character,cor_uniforme) => {
   var xDoMouse = event.clientX;
   var yDoMouse = event.clientY;

   xDoMouse = (xDoMouse / window.innerWidth) * 2 - 1;
   yDoMouse = -(yDoMouse / window.innerHeight) * 2 + 1;

   var vectorClick = new THREE.Vector3(xDoMouse, yDoMouse, 1);

   // Converte de coordenadas de tela normalizada (-1 a +1) para coordenadas de mundo
   vectorClick = vectorClick.unproject(camera);

   // Raycasting: traça um raio de um ponto a outro, verificando se colide com algum objeto
   var raycaster = new THREE.Raycaster(camera.position, vectorClick.sub(camera.position).normalize());
   
   // Chamar a função que "testa" se o raio colidiu com algum objeto
   personagem=scene.children;
   personagem=personagem[2];

   inferior=personagem.getObjectByName("inferior");
   middle=personagem.getObjectByName("middle");

   // Checando se bate nos sapatos
   console.log("Personagem");
   console.log(personagem.children);
   var intersects = raycaster.intersectObjects([inferior.children[0].children[0],inferior.children[1].children[0]],false);
   
   // Se o vetor não for vazio, houve interseção do raio com algum objeto
   if(intersects.length > 0) {
      //PEGAR SÓ O SAPATO
      console.log("SAPATO");
      inferior.children[0].children[0].material.color.setHex(cor_uniforme);
      inferior.children[1].children[0].material.color.setHex(cor_uniforme);
   }

   // Checando se bate nas pernas
   var intersects = raycaster.intersectObjects([inferior.children[0].children[1],inferior.children[1].children[1],middle.children[0]],false);
   
   // Se o vetor não for vazio, houve interseção do raio com algum objeto
   if(intersects.length > 0) {
      //PEGAR SÓ AS PERNAS
      console.log("PERNAS")
      inferior.children[0].children[1].material.color.setHex(cor_uniforme);
      inferior.children[1].children[1].material.color.setHex(cor_uniforme);
      middle.children[0].material.color.setHex(cor_uniforme);
   }

   //Checando se bate no middle
   superior = personagem.getObjectByName("superior");
   if (superior != undefined) {
      var intersects = raycaster.intersectObjects([middle.children[1],superior.children[0].children[0],superior.children[1].children[0]],true);
      
      //se o vetor não for vazio, houve interseção do raio com algum objeto
      if (intersects.length > 0) {
         //PEGAR SÓ A CAMISA
         console.log("MIDDLE");
         middle.children[1].material.color.setHex(cor_uniforme);
         superior.children[0].children[0].material.color.setHex(cor_uniforme);
         superior.children[1].children[0].material.color.setHex(cor_uniforme);
      }
   }

   capacete = personagem.getObjectByName("helmet");
   if (capacete != undefined) {
      var intersects = raycaster.intersectObjects(capacete.children,true);
      
      // Se o vetor não for vazio, houve interseção do raio com algum objeto
      if (intersects.length > 0) {
         //PEGAR SÓ AS CAPACETE
         console.log("CAPACETE");
         changecolorgroup(capacete,cor_uniforme);
      }
   }

}

const handleChangeOutfit = (event, character) => {
   switch (event.target.value) {
      case "standard": character.changeOutfit(0); break;
      case "multicolored": character.changeOutfit(1); break;
      case "redgreen": character.changeOutfit(2); break;
      case "bluepink": character.changeOutfit(3); break;
      default: break;
   }
}

const handleChangeGender = (event, character) => {
   if (event.target.value === "male") character.changeGender("M");
   else if (event.target.value === "female") character.changeGender("F");
}

const handleArrow = (event, character) => {
   event.preventDefault();
   const keyName = event.key;

   switch (keyName) {
      case 's': character.setDirection(0); break;
      case 'd': character.setDirection(1); break;
      case 'w': character.setDirection(2); break;
      case 'a': character.setDirection(3); break;
      default: break;
   }
}

module.exports = {
   handleClick,
   handleResize,
   handleChangeOutfit,
   onDocMouseDown,
   handleChangeGender,
   handleArrow
}
