const {createWeapon} = require('./assets/equipments/weapons/weapons'); 
let texture='normal';

const handleClick = ({event, character, background, intersects }) => {
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
      default:
         checkIntersections({character, background, intersects});
         break;
   }
}

const checkIntersections = ({character, background, intersects}) => {
   console.log(intersects);
   background.checkIntersects(intersects);
}

const handleMouseMove = (event,mouse) => {
   event.preventDefault();
   mouse.x = (event.clientX / window.innerWidth)*2 - 1;
   mouse.y = -(event.clientY / window.innerHeight)*2 + 1;
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
   handleChangeGender,
   handleMouseMove
}