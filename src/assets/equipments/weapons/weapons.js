function RandomWeapon(scene)
{
	scene.remove(scene.getObjectByName("arma"));
	maximum=5
	minimum=0
	numeroaleatorio=randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;	
	weapon=createWeapon(numeroaleatorio)
	weapon.name = "arma";
	scene.add(weapon)	
}


function createWeapon(indice) {
	weapons=[createSword(),createAxe(),createAxe_2(),createArrow(),createBow(),createShield()];
	weapon=weapons[indice];
	weapon.name = "arma";
	return weapon
	
}