function createCharacter(gender, skinColor, hairColor, eyeColor, mouthColor, bodyColor, legColor, shoeColor) {
    var character = new THREE.Group();    

    // Criação dos membros inferiores

    var inferiorLeft = createInferior(legColor, shoeColor);
    inferiorLeft.position.set(1.75, 4, 0);
    inferiorLeft.name = "inferiorLeft";

    var inferiorRight = createInferior(legColor, shoeColor);
    inferiorRight.position.set(-1.75, 4, 0);
    inferiorRight.name = "inferiorRight";

    var inferior = new THREE.Group();
    inferior.add(inferiorLeft);
    inferior.add(inferiorRight);
    inferior.name = "inferior";
    character.add(inferior);

    // Criação do meio

    var middle = createMiddle(gender, bodyColor, legColor, hairColor);
    middle.position.set(0, 12, 0);
    middle.name = "middle";
    character.add(middle);

    // Criação dos membros superiores

    var superiorLeft = createSuperior(skinColor, bodyColor);
    superiorLeft.position.set(4.25, 12, 0);
    superiorLeft.name = "superiorLeft";

    var superiorRight = createSuperior(skinColor, bodyColor);
    superiorRight.position.set(-4.25, 12, 0);
    superiorRight.name = "superiorRight";

    var superior = new THREE.Group();
    superior.add(superiorLeft);
    superior.add(superiorRight);
    superior.name = "superior";
    character.add(superior);

    // Criação da cabeça

    var head = createHead(gender, skinColor, hairColor, eyeColor, mouthColor);
    head.position.set(0, 18, 0);
    head.name = "head";
    character.add(head);

    return character;
}