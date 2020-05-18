const {desvincularmaterial, changecolorgroup, criarcubo, espelhar} = require('../../geometries/functions');

function createAxe() {

	//Controles de Camera

	var diagonalprincipal= new THREE.Group();
	//Diagonal Principal
	for (var i=0; i<12; i++)
	{
	m = criarcubo(0.1,0.1,0.1,0,0,0)
	m.material.color.setHex(0x696969);
	m.position.x=0.15+i/10;
	m.position.y=0.05+i/10;
	m.position.z=0;
	diagonalprincipal.add(m);
	}
	
	var diagonalabaixo= new THREE.Group();
	//Diagonal Principal
	for (var i=0; i<11; i++)
	{
	m = criarcubo(0.1,0.1,0.1,0,0,0)
	m.material.color.setHex(0x000000);
	m.position.x=0.25+i/10;
	m.position.y=0.05+i/10;
	m.position.z=0;
	diagonalabaixo.add(m);
	}
	
	var lado1= new THREE.Group();
	lado1.add(criarcubo(0.1,0.1,0.1,1.05,0.75,0))
	lado1.add(criarcubo(0.1,0.1,0.1,1.15,0.85,0))
	lado1.add(criarcubo(0.1,0.1,0.1,1.25,0.95,0))
	
	lado1.children[0].material.color.setHex(0xff0000);
	lado1.children[1].material.color.setHex(0xff0000);
	lado1.children[2].material.color.setHex(0xff0000);
	
	var lado2= new THREE.Group();
	lado2.add(criarcubo(0.1,0.1,0.1,1.05,0.65,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.15,0.75,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.25,0.85,0))
	lado2.add(criarcubo(0.1,0.1,0.1,1.35,0.95,0))

	lado2.children[0].material.color.setHex(0xff00ff);
	lado2.children[1].material.color.setHex(0xff00ff);
	lado2.children[2].material.color.setHex(0xff00ff);
	lado2.children[3].material.color.setHex(0xff00ff);

	var lado3= new THREE.Group();
	lado3.add(criarcubo(0.1,0.1,0.1,1.05,0.55,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.15,0.65,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.25,0.75,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.35,0.85,0))
	lado3.add(criarcubo(0.1,0.1,0.1,1.45,0.95,0))

	lado3.children[0].material.color.setHex(0x0000ff);
	lado3.children[1].material.color.setHex(0x0000ff);
	lado3.children[2].material.color.setHex(0x0000ff);
	lado3.children[3].material.color.setHex(0x0000ff);
	lado3.children[4].material.color.setHex(0x0000ff);
	
	var lado4= new THREE.Group();

	lado4.add(criarcubo(0.1,0.1,0.1,1.05,0.45,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.15,0.55,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.25,0.65,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.35,0.75,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.45,0.85,0))
	lado4.add(criarcubo(0.1,0.1,0.1,1.55,0.95,0))
	
	lado4.children[0].material.color.setHex(0x000000);
	lado4.children[1].material.color.setHex(0x000000);
	lado4.children[2].material.color.setHex(0x000000);
	lado4.children[3].material.color.setHex(0x000000);
	lado4.children[4].material.color.setHex(0x000000);
	lado4.children[5].material.color.setHex(0x000000);
	
	var lado5= new THREE.Group();

	lado5.add(criarcubo(0.1,0.1,0.1,1.15,0.45,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.25,0.55,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.35,0.65,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.45,0.75,0))
	lado5.add(criarcubo(0.1,0.1,0.1,1.55,0.85,0))

	lado5.children[0].material.color.setHex(0xf0000f);
	lado5.children[1].material.color.setHex(0xf0000f);
	lado5.children[2].material.color.setHex(0xf0000f);
	lado5.children[3].material.color.setHex(0xf0000f);
	lado5.children[4].material.color.setHex(0xf0000f);

	var axe= new THREE.Group();
	axe.add(lado3);
	axe.add(lado1);
	axe.add(lado2);
	axe.add(lado5);
	axe.add(lado4);
	axe.add(diagonalprincipal);
	axe.add(diagonalabaixo);
	
	axe.scale.set(5,5,5);
	axe.position.set(-0.5,0,0);
	axe.rotateY(-Math.PI/20);
	axe.name = "axe";
	return axe;
}

// Posicionar o machado e rotacionar junto com o antebraço
function animateAxe(character, axe, forearmUp) {
	var superiorRight = character.getObjectByName("superiorRight");
	var forearm = superiorRight.getObjectByName("forearm");

	var forearmPosition = new THREE.Vector3(0, 0, 0);
    forearmPosition.add(forearm.position).add(superiorRight.position).add(character.position);

	var x = forearmPosition.x;
	var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
	var z = forearmPosition.z + (forearm.geometry.parameters.depth + axe.children[0].children[0].geometry.parameters.depth) / 2;

    axe.position.set(x, y, z);
    
    if(forearmUp) axe.rotateY(-9*Math.PI/1600);
    else axe.rotateY(9*Math.PI/1600);
}		

module.exports = {
   animateAxe,
   createAxe
}