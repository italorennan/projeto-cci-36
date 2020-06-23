const createBox = require('../geometries/createBox');
const {createMulticolorBox} = require('../shaders/multicolorShader');
const createRedgreenBox = require('../shaders/redgreenShader');
const createBluepinkBox = require('../shaders/bluepinkShader');

// Criação do corpo
function createBody(gender, bodyColor, hairColor, shader) {
    switch (shader) {
        case 1: drawBox = createMulticolorBox; break;
        case 2: drawBox = createRedgreenBox; break;
        case 3: drawBox = createBluepinkBox; break;
        case 0: default: drawBox = createBox; break;
    }

    if (gender == "M") { // personagem homem
        switch (shader) {
            case 3: case 2: param = {min: {value: new THREE.Vector2(2.0, 0.0)},
                                     scale: {value: new THREE.Vector2(6.5, 6.0)},
                                     size: {value: new THREE.Vector2(10.5, 6.0)}};
                            break;
            case 1: case 0: default: param = bodyColor;
        }
        var body = drawBox(6.5, 6, 3, param);
    }

    else if (gender == "F") { // personagem mulher
        var body = new THREE.Group();

        if (shader !== 2 && shader !== 3) param = bodyColor;

        if (shader === 2 || shader === 3)
            param = {
                min: {value: new THREE.Vector2(2.0, 0.0)},
                scale: {value: new THREE.Vector2(6.5, 3.0)},
                size: {value: new THREE.Vector2(10.5, 6.0)}
            };
        var body1 = drawBox(6.5, 3, 3, param);
        body1.position.set(0, -1.5, 0);
        body.add(body1);

        if (shader === 2 || shader === 3)
            param = {
                min: {value: new THREE.Vector2(2.0, 3.0)},
                scale: {value: new THREE.Vector2(5.0, 2.0)},
                size: {value: new THREE.Vector2(10.5, 6.0)}
            };
        var body2 = drawBox(5, 2, 3, param);
        body2.position.set(-0.75, 1, 0);
        body.add(body2);
        
        if (shader === 2 || shader === 3)
            param = {
                min: {value: new THREE.Vector2(2.0, 5.0)},
                scale: {value: new THREE.Vector2(4.0, 1.0)},
                size: {value: new THREE.Vector2(10.5, 6.0)}
            };
        var body3 = drawBox(4, 1, 3, param);
        body3.position.set(-1.25, 2.5, 0);
        body.add(body3);

        if (shader === 2 || shader === 3)
            param = {
                min: {value: new THREE.Vector2(7.75, 3.0)},
                scale: {value: new THREE.Vector2(0.5, 1.0)},
                size: {value: new THREE.Vector2(10.5, 6.0)}
            };
        var body4 = drawBox(0.5, 1, 3, param);
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
function createMiddle(gender, bodyColor, waistColor, hairColor, shader) {
    var middle = new THREE.Group();

    var waist = createWaist(waistColor);
    waist.position.set(0, -3, 0);
    middle.add(waist);

    const body = createBody(gender, bodyColor, hairColor, shader);
    body.position.set(0, 1, 0);
    middle.add(body);

    return middle;
}

module.exports = createMiddle;