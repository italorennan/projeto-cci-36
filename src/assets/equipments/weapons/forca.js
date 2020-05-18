function createFork() {
    var diagonalprincipal= new THREE.Group();
    //Diagonal Principalz
	
	
    for (var i=0; i<16; i++)
    {
    m = criarcubo(0.1,0.1,0.1,0,0,0)
    m.material.color.setHex(0x00ff00);
    m.position.x=0.5*0.1+i*0.1;
    m.position.y=0.5*0.1+i*0.1;
    m.position.z=0;
    diagonalprincipal.add(m);
    }

	var diagonalabaixo= new THREE.Group();
	diagonalabaixo.rotation.x=diagonalprincipal.clone()

    //Criar as Duas Diagonais Adjacentes
  
    var espada= new THREE.Group();
    //espada.add(diagonalprincipal)
    espada.add(diagonalabaixo)
    
   
	espada.scale.set(0.6,0.6,0.6)
    return espada;
}