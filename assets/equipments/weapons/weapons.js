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