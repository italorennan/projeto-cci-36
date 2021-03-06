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

function createWeapon(key,texture) {
	console.log(key)
	 switch(key){
      case 'sword':
         return createSword(texture);
      case 'axe':
         return createAxe(texture);
      case 'axe2':
         return createAxe2(texture);
      case 'arrow':
         return createArrow(texture);
      case 'bow':
         return createBow(texture);
      case 'shield':
         return createShield(texture);
	 }
}

module.exports = {
   createWeapon,
   randomWeapon
}