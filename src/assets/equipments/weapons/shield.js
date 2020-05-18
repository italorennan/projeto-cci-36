function createShield()
{
	var asa= new THREE.Group();
	//Diagonal Principal
	var escudo = new THREE.Group();
	
	colunas=[5,9,11,13,13,15,15,15,15,13,13,11,9,5];
	for (var i=0; i<colunas.length; i++)
	{	
		escudo.add(criarcubo(0.1,0.1*colunas[i],0.1,-0.65+0.1*i,0,0));
	}
	
	changecolorgroup(escudo,0x000000)
	escudo.children[3].material.color.setHex(0x4682b4);
	escudo.children[5].material.color.setHex(0x4682b4);
	escudo.children[8].material.color.setHex(0x4682b4);			
	escudo.children[10].material.color.setHex(0x4682b4);

	escudo.scale.set(5,5,5);
	escudo.name = "shield";
	return escudo;
}

// Posicionar o escudo no centro do antebraço direito do personagem
function equipShield(character, shield) {
	var superiorRight = character.getObjectByName("superiorRight");
	var forearm = superiorRight.getObjectByName("forearm");

	var forearmPosition = new THREE.Vector3(0, 0, 0);
	forearmPosition.add(forearm.position).add(superiorRight.position).add(character.position);

	var x = forearmPosition.x;
	var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
	var z = forearmPosition.z + (forearm.geometry.parameters.depth + shield.children[0].geometry.parameters.depth) / 2;

	shield.position.set(x, y, z);
}