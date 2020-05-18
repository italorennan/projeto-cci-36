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

    var middleArmour = createMiddle(gender, armourColor, otherColor, hairColor);
    middleArmour.position.set(0,12,0);
    middleArmour.name = "middleArmour";
    armour.add(middleArmour);

    var inferiorLeftArmour = createInferior(armourColor, armourColor);
    inferiorLeftArmour.position.set(1.75, 4, 0);
    inferiorLeftArmour.name = "inferiorLeftArmour";
    armour.add(inferiorLeftArmour);

    var inferiorRightArmour = createInferior(armourColor, armourColor);
    inferiorRightArmour.position.set(-1.75, 4, 0);
    inferiorRightArmour.name = "inferiorRightArmour";
    armour.add(inferiorRightArmour);

    var sleeveLeft = createSleeve(otherColor);
    sleeveLeft.position.set(4.25, 15, 0);
    sleeveLeft.name = "sleeveLeftArmour";
    armour.add(sleeveLeft);

    var sleeveRight = createSleeve(otherColor);
    sleeveRight.position.set(-4.25, 15, 0);
    sleeveRight.name = "sleeveRightArmour";
    armour.add(sleeveRight);

    var helmet = createSimpleHelmet(otherColor);
    helmet.position.set(0, 18.5, -0.5);
    helmet.name = "helmet";
    armour.add(helmet);

    return armour;
}

// Equipar armadura simples para o personagem
function equipSimpleArmour(character, gender, hairColor) {
    var armourColor = "#808080";
    var otherColor = "#4f4f4f";
    
    // Retirar partes atuais
    var middle = character.getObjectByName("middle");
    character.remove(middle);

    var inferior = character.getObjectByName("inferior");
    character.remove(inferior);
    
    var superiorLeft = character.getObjectByName("superiorLeft");
    var sleeveLeft = superiorLeft.getObjectByName("sleeve");
    superiorLeft.remove(sleeveLeft);

    var superiorRight = character.getObjectByName("superiorRight");
    var sleeveRight = superiorRight.getObjectByName("sleeve");
    superiorRight.remove(sleeveRight);

    // Adicionar armadura
    var armour = createSimpleArmour(gender, hairColor, armourColor, otherColor);
    armour.name = "simpleArmour";
    character.add(armour);
}