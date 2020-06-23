const createBox = require('../geometries/createBox');
const {createMulticolorBox} = require('../shaders/multicolorShader');
const createRedgreenBox = require('../shaders/redgreenShader');

// Criação de um manga da camisa
function createSleeve(sleeveColor, shader, side) {
    switch (shader) {
        case 2: drawBox = createRedgreenBox;
                switch (side) {
                    case "right": param = {min: {value: new THREE.Vector2(0.0, 4.0)},
                                           scale: {value: new THREE.Vector2(2.0, 2.0)},
                                           size: {value: new THREE.Vector2(10.5, 6.0)}};
                                  break;
                    case "left": param = {min: {value: new THREE.Vector2(8.5, 4.0)},
                                          scale: {value: new THREE.Vector2(2.0, 2.0)},
                                          size: {value: new THREE.Vector2(10.5, 6.0)}};
                                 break;
                    default: break;
                }
                break;
        case 1: drawBox = createMulticolorBox; param = sleeveColor; break;
        case 0: default: drawBox = createBox; param = sleeveColor; break;
    }

    var sleeve = drawBox(2, 2, 3, param);

    return sleeve;
}

// Criação de um braço
function createArm(skinColor) {
    var whole = new THREE.Group();
    
    var arm = createBox(2, 3, 3, skinColor);
    arm.position.set(0, 1.5, 0);
    arm.name = "arm";
    whole.add(arm);

    var forearm = createBox(2, 3, 3, skinColor);
    forearm.position.set(0, -1.5, 0);
    forearm.name = "forearm";
    whole.add(forearm);

    return whole;
}

// Criação de um membro superior = manga + braço
function createSuperior(skinColor, sleeveColor, shader, side) {
    var superior = new THREE.Group();

    var sleeve = createSleeve(sleeveColor, shader, side);
    sleeve.position.set(0, 3, 0);
    sleeve.name = "sleeve";
    superior.add(sleeve);

    var whole = createArm(skinColor);
    whole.position.set(0, -1, 0);
    whole.name = "whole";
    superior.add(whole);

    return superior;
}

module.exports = createSuperior;