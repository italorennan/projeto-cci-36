const {desvincularmaterial, changecolorgroup, changetexture,criarcubo, espelhar} = require('../../geometries/functions');



function createArrow(texture) {
  var asa = new THREE.Group();
  //Diagonal Principal

  localizacao = [
    [0.05, 0.45],
    [0.15, 0.35],
    [0.15, 0.15],
    [0.05, 0.05],
  ];
  for (var i = 0; i < 4; i++) {
    m = criarcubo(0.1, 0.1, 0.1, localizacao[i][0], localizacao[i][1], 0);
    m.material.color.setHex(0x7b68ee);
    asa.add(m);
  }

  var tronco = new THREE.Group();

  tronco.add(criarcubo(0.7, 0.1, 0.1, 0.55, 0.25, 0));
  tronco.children[0].material.color.setHex(0x4b0082);

  var pena = new THREE.Group();

  localizacao = [
    [0.95, 0.45],
    [0.95, 0.35],
    [0.95, 0.25],
    [0.95, 0.15],
    [0.95, 0.05],
    [1.05, 0.15],
    [1.05, 0.25],
    [1.05, 0.35],
    [1.15, 0.25],
  ];
  for (var i = 0; i < localizacao.length; i++) {
    m = criarcubo(0.1, 0.1, 0.1, localizacao[i][0], localizacao[i][1], 0);
    m.material.color.setHex(0x7b68ee);
    pena.add(m);
  }

  var flecha = new THREE.Group();
  flecha.add(asa);
  flecha.add(tronco);
  flecha.add(pena);

  flecha.scale.set(5, 5, 5);
  flecha.position.set(-1.25, 0, 0);
  flecha.rotateZ(-Math.PI / 2);
  flecha.name = "arrow";
  if(texture!='normal')
	{
	changetexture(flecha,texture);
	}
  return flecha;
}

// Posicionar a flecha no antebraço esquerdo
function animateArrow(character, arrow) {
  var superiorLeft = character.getObjectByName("superiorLeft");
  var forearm = superiorLeft.getObjectByName("forearm");

  var forearmPosition = new THREE.Vector3(0, 0, 0);
  forearmPosition
    .add(forearm.position)
    .add(superiorLeft.position)
    .add(character.position);

  var x = forearmPosition.x - 1.25;
  var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
  var z =
    forearmPosition.z +
    (forearm.geometry.parameters.depth +
      arrow.children[0].children[0].geometry.parameters.depth) /
      2;

  arrow.position.set(x, y, z);
}

module.exports = {
   animateArrow,
   createArrow
}