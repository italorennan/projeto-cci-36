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

function equip(character, subject) {
	const forearmUp = character.moveForearm();

	if(subject.name == "arrow") equipArrow(character.entity, subject);
	else if(subject.name == "axe") equipAxe(character.entity, subject, forearmUp);
	else if(subject.name == "axe2") equipAxe2(character.entity, subject, forearmUp);
	else if(subject.name == "bow") equipBow(character.entity, subject);
	else if(subject.name == "shield") equipShield(character.entity, subject);
	else if(subject.name == "sword") equipSword(character.entity, subject, forearmUp);

	return forearmUp;
}