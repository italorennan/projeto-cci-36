const createMiddle = require('../../character/createMiddle');
const createInferior = require('../../character/createInferior');
const createBox = require('../../geometries/createBox');
const {createArmourShaderBox} = require('../../shaders/multicolorShader');

// Criar capacete da armadura
function createSimpleHelmet(otherColor) {
    var helmet = new THREE.Group();

    var helmet1 = createBox(7, 1, 5, otherColor);
    helmet1.position.set(0, 2, 0);
    helmet.add(helmet1);

    var helmet2 = createBox(1, 4, 5, otherColor);
    helmet2.position.set(3, -0.5, 0);
    helmet.add(helmet2);

    var helmet3 = createBox(1, 4, 5, otherColor);
    helmet3.position.set(-3, -0.5, 0);
    helmet.add(helmet3);

    var helmet4 = createBox(7, 4, 1, otherColor);
    helmet4.position.set(0, -0.5, -2);
    helmet.add(helmet4);

    var helmet5 = createBox(7, 2, 1, otherColor);
    helmet5.position.set(0, 1.5, 2.5);
    helmet.add(helmet5);

    var helmet6 = createBox(1, 0.75, 1, otherColor);
    helmet6.position.set(0, 0.125, 2.5);
    helmet.add(helmet6);

    return helmet;
}

// Criar armadura simples para o personagem
function createSimpleArmour(gender, hairColor, armourColor, otherColor) {
    var armour = new THREE.Group();

    var middleArmour = createMiddle(gender, armourColor, otherColor, hairColor, 0);
    middleArmour.position.set(0,12,0);
    middleArmour.name = "middle";
    armour.add(middleArmour);

    var inferiorLeftArmour = createInferior(armourColor, armourColor);
    inferiorLeftArmour.position.set(1.75, 4, 0);
    inferiorLeftArmour.name = "inferiorLeft";

    var inferiorRightArmour = createInferior(armourColor, armourColor);
    inferiorRightArmour.position.set(-1.75, 4, 0);
    inferiorRightArmour.name = "inferiorRight";

    const inferiorArmour = new THREE.Group();
    inferiorArmour.name = "inferior";
    inferiorArmour.add(inferiorRightArmour);
    inferiorArmour.add(inferiorLeftArmour);
    armour.add(inferiorArmour);

    var sleeveLeft = createBox(2, 2, 3, otherColor);
    sleeveLeft.position.set(0, 3, 0);
    sleeveLeft.name = "sleeveLeft";
    armour.add(sleeveLeft);

    var sleeveRight = createBox(2, 2, 3, otherColor);
    sleeveRight.position.set(0, 3, 0);
    sleeveRight.name = "sleeveRight";
    armour.add(sleeveRight);

    var helmet = createSimpleHelmet(otherColor);
    helmet.position.set(0, 18.5, -0.5);
    helmet.name = "helmet";
    armour.add(helmet);

    return armour;
}

module.exports = createSimpleArmour;
