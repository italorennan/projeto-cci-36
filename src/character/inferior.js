// Criação de uma perna
function createLeg(legColor) {
    var leg = createBox(3, 6, 3, legColor);

    return leg;
}

// Criação de um pé
function createShoe(shoeColor) {
    var shoe = createBox(3, 2, 3, shoeColor);
    
    return shoe;
}

// Criação de um membro inferior = perna + pé
function createInferior(legColor, shoeColor) {
    var inferior = new THREE.Group();
    
    shoe = createShoe(shoeColor);
    shoe.position.set(0, -3, 0);
    shoe.name = "shoe";
    inferior.add(shoe);

    leg = createLeg(legColor);
    leg.position.set(0, 1, 0);
    leg.name = "leg";
    inferior.add(leg);

    return inferior;
}