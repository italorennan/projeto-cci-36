// Criação de um manga da camisa
function createSleeve(sleeveColor) {
    var sleeve = createBox(2, 2, 3, sleeveColor);

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
function createSuperior(skinColor, sleeveColor) {
    var superior = new THREE.Group();

    var sleeve = createSleeve(sleeveColor);
    sleeve.position.set(0, 3, 0);
    sleeve.name = "sleeve";
    superior.add(sleeve);

    var whole = createArm(skinColor);
    whole.position.set(0, -1, 0);
    whole.name = "name";
    superior.add(whole);

    return superior;
}

const moveForearm = (character, forearmUp) => {
    var superiorRight = character.getObjectByName("superiorRight");
    var forearm = superiorRight.getObjectByName("forearm");
    var arm = superiorRight.getObjectByName("arm");

    if (forearmUp) {
        forearm.translateY(0.01);
        forearm.translateZ(0.01);

        if (forearm.position.y > arm.position.y) forearmUp = false;
    }
    else {
        forearm.translateY(-0.01);
        forearm.translateZ(-0.01);

        if (forearm.position.z < arm.position.z) forearmUp = true;
    }

    return forearmUp;
}