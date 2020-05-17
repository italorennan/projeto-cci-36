// Criação do cabelo
function createHair(gender, hairColor) {
    var hair = new THREE.Group();
    
    // partes comuns para homem e mulher
    var hair1 = createBox(5, 0.5, 4, hairColor);
    hair1.position.set(0, 1.75, 0);
    hair.add(hair1);

    var hair2 = createBox(0.5, 0.5, 1, hairColor);
    hair2.position.set(2.25, 1.25, 1.5);
    hair.add(hair2);

    var hair3 = createBox(0.5, 0.5, 1, hairColor);
    hair3.position.set(-2.25, 1.25, 1.5);
    hair.add(hair3);

    var hair4 = createBox(5, 1.5, 3, hairColor);
    hair4.position.set(0, 0.75, -0.5);
    hair.add(hair4);

    var hair5 = createBox(5, 2, 2, hairColor);
    hair5.position.set(0, -1, -1);
    hair.add(hair5);
    
    if (gender == "F") { // personagem mulher
        var hair6 = createBox(4, 0.5, 4, hairColor);
        hair6.position.set(0, 1.25, 0);
        hair.add(hair6);

        var hair7 = createBox(2, 0.25, 4, hairColor);
        hair7.position.set(-1.5, 0.875, 0);
        hair.add(hair7);

        var hair8 = createBox(0.5, 0.25, 1, hairColor);
        hair8.position.set(2.25, 0.875, 1.5);
        hair.add(hair8);

        var hair9 = createBox(5, 2, 1, hairColor);
        hair9.position.set(0, -1, 0.5);
        hair.add(hair9);
    }

    return hair; 
}

// Criação dos olhos
function createEyes(eyeColor) {
    var eyes = new THREE.Group();

    var whiteLeft = createBox(0.5, 0.5, 1, "#ffffff");
    whiteLeft.position.set(-1.25, 0.5, 1.5);
    eyes.add(whiteLeft);

    var whiteRight = createBox(0.5, 0.5, 1, "#ffffff");
    whiteRight.position.set(1.25, 0.5, 1.5);
    eyes.add(whiteRight);

    var irisLeft = createBox(0.5, 0.5, 1, eyeColor);
    irisLeft.position.set(-0.75, 0.5, 1.5);
    eyes.add(irisLeft);

    var irisRight = createBox(0.5, 0.5, 1, eyeColor);
    irisRight.position.set(0.75, 0.5, 1.5);
    eyes.add(irisRight);

    return eyes;
}

// Criação da boca
function createMouth(mouthColor) {
    var mouth = createBox(1, 0.5, 2, mouthColor);
    mouth.position.set(0, -0.75, 1);

    return mouth;
}

// Criação do restante da cabeça
function createSkin(gender, skinColor) {
    var skin = new THREE.Group();

    // partes comuns para homem e mulher
    var skin1 = createBox(1, 0.5, 1, skinColor);
    skin1.position.set(0, 0.5, 1.5);
    skin.add(skin1);
    
    if (gender == "M") { // personagem homem
        var skin2 = createBox(4, 0.75, 1, skinColor);
        skin2.position.set(0, 1.125, 1.5);
        skin.add(skin2);

        var skin3 = createBox(3, 0.25, 1, skinColor);
        skin3.position.set(0, 0.125, 1.5);
        skin.add(skin3);

        var skin4 = createBox(5, 0.5, 2, skinColor);
        skin4.position.set(0, -0.25, 1);
        skin.add(skin4);

        var skin5 = createBox(0.5, 0.75, 1, skinColor);
        skin5.position.set(1.75, 0.375, 1.5);
        skin.add(skin5);

        var skin6 = createBox(0.5, 0.75, 1, skinColor);
        skin6.position.set(-1.75, 0.375, 1.5);
        skin.add(skin6);

        var skin7 = createBox(0.5, 1, 1, skinColor);
        skin7.position.set(2.25, 0.5, 1.5);
        skin.add(skin7);

        var skin8 = createBox(0.5, 1, 1, skinColor);
        skin8.position.set(-2.25, 0.5, 1.5);
        skin.add(skin8);

        var skin9 = createBox(2, 0.5, 2, skinColor);
        skin9.position.set(-1.5, -0.75, 1);
        skin.add(skin9);

        var skin10 = createBox(2, 0.5, 2, skinColor);
        skin10.position.set(1.5, -0.75, 1);
        skin.add(skin10);

        var skin11 = createBox(5, 1, 2, skinColor);
        skin11.position.set(0, -1.5, 1);
        skin.add(skin11);
    }

    else if (gender == "F") { // personagem mulher
        var skin2 = createBox(2.5, 0.25, 1, skinColor);
        skin2.position.set(0.75, 0.875, 1.5);
        skin.add(skin2);

        var skin3 = createBox(3, 0.75, 1, skinColor);
        skin3.position.set(0, -0.125, 1.5);
        skin.add(skin3);

        var skin4 = createBox(1, 1.25, 1, skinColor);
        skin4.position.set(2, 0.125, 1.5);
        skin.add(skin4);

        var skin5 = createBox(1, 1.25, 1, skinColor);
        skin5.position.set(-2, 0.125, 1.5);
        skin.add(skin5);

        var skin6 = createBox(2, 0.5, 1, skinColor);
        skin6.position.set(1.5, -0.75, 1.5);
        skin.add(skin6);

        var skin7 = createBox(2, 0.5, 1, skinColor);
        skin7.position.set(-1.5, -0.75, 1.5);
        skin.add(skin7);

        var skin8 = createBox(5, 1, 1, skinColor);
        skin8.position.set(0, -1.5, 1.5);
        skin.add(skin8);
    }

    return skin;
}

// Criação da cabeça = cabelo + olhos + boca + pele
function createHead(gender, skinColor, hairColor, eyeColor, mouthColor) {
    var head = new THREE.Group();

    var hair = createHair(gender, hairColor);
    hair.name = "hair";
    head.add(hair);

    var eyes = createEyes(eyeColor);
    eyes.name = "eyes";
    head.add(eyes);

    var mouth = createMouth(mouthColor);
    mouth.name = "mouth";
    head.add(mouth);

    var skin = createSkin(gender, skinColor);
    skin.name = "skin";
    head.add(skin);

    return head;
}