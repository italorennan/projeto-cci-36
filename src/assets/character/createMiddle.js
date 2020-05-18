// Criação do corpo
function createBody(gender, bodyColor, hairColor) {
    if (gender == "M") { // personagem homem
        var body = createBox(6.5, 6, 3, bodyColor);
    }

    else if (gender == "F") { // personagem mulher
        var body = new THREE.Group();

        var body1 = createBox(6.5, 3, 3, bodyColor);
        body1.position.set(0, -1.5, 0);
        body.add(body1);

        var body2 = createBox(5, 2, 3, bodyColor);
        body2.position.set(-0.75, 1, 0);
        body.add(body2);
        
        var body3 = createBox(4, 1, 3, bodyColor);
        body3.position.set(-1.25, 2.5, 0);
        body.add(body3);

        var body4 = createBox(0.5, 1, 3, bodyColor);
        body4.position.set(3, 0.5, 0);
        body.add(body4);

        var hair1 = createBox(1, 1, 3, hairColor);
        hair1.position.set(2.25, 0.5, 0);
        body.add(hair1);

        var hair2 = createBox(1.5, 1, 3, hairColor);
        hair2.position.set(2.5, 1.5, 0);
        body.add(hair2);

        var hair3 = createBox(2.5, 1, 3, hairColor);
        hair3.position.set(2, 2.5, 0);
        body.add(hair3);
    }

    return body;
}

// Criação da cintura
function createWaist(waistColor) {
    var waist = createBox(6.5, 2, 3, waistColor);

    return waist;
}

// Criação do meio = tronco, cintura
function createMiddle(gender, bodyColor, waistColor, hairColor) {
    var middle = new THREE.Group();

    var waist = createWaist(waistColor);
    waist.position.set(0, -3, 0);
    middle.add(waist);

    const body = createBody(gender, bodyColor, hairColor);
    body.position.set(0, 1, 0);
    middle.add(body);

    return middle;
}
module.exports = createMiddle;