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
   weapon=createWeapon(numeroaleatorio)
   console.log(weapon.name);
   return weapon;

}

function createWeapon(indice) {
	weapons=[createSword(),createAxe(),createAxe2(),createArrow(),createBow(),createShield()];
	weapon=weapons[indice];
	return weapon
	
}

module.exports = {
   createWeapon,
   randomWeapon
}