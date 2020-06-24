const {createWeapon} = require('./assets/equipments/weapons/weapons');

const handleClick = (event,character) => {
   console.log(character);
   event.preventDefault();
   switch(event.target.className){
      case "axe-button":
         character.equipWeaponRight(createWeapon("axe"));
         break;
      case "sword-button":
         character.equipWeaponRight(createWeapon("sword"));
         break;
      case "axe2-button":
         character.equipWeaponRight(createWeapon("axe2"));
         break;
      case "bow-button":
         character.equipWeaponRight(createWeapon("bow"));
         break;
      case "arrow-button":
         character.equipWeaponLeft(createWeapon("arrow"));
         break;
      case "shield-button":
         character.equipWeaponLeft(createWeapon("shield"));
         break;
      case "armor-equip-button":
		 character.equipSimpleArmour();
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

module.exports = {
   handleClick,
   handleResize,
   handleChangeOutfit,
   handleChangeGender
}