function createSword() {
    var diagonalprincipal= new THREE.Group();
    //Diagonal Principal
	
	medida=1
    for (var i=0; i<16; i++)
    {
    m = criarcubo(medida,medida,medida,0,0,0)
    m.material.color.setHex(0x00ff00);
    m.position.x=0.5*medida+i*medida;
    m.position.y=0.5*medida+i*medida;
    m.position.z=0;
    diagonalprincipal.add(m);
    }

    //Criar as Duas Diagonais Adjacentes
    var diagonalabaixo= new THREE.Group();		
    
    //Clonar Trocando o Material
    diagonalabaixo = diagonalprincipal.clone();
    diagonalabaixo.traverse((node) => {if (node.isMesh) {node.material = node.material.clone();}}); 			//Para poder mudar a Cor
    diagonalabaixo.position.x=diagonalabaixo.position.x+medida
    diagonalabaixo.position.y=diagonalabaixo.position.y
    tamanho=diagonalabaixo.children.length
    diagonalabaixo.remove(diagonalabaixo.children[tamanho-1])

    var diagonalacima= new THREE.Group();					
    diagonalacima = diagonalprincipal.clone();
    diagonalacima.traverse((node) => {if (node.isMesh) {node.material = node.material.clone();}});

    diagonalacima.position.x=diagonalacima.position.x
    diagonalacima.position.y=diagonalacima.position.y+medida
    tamanho=diagonalacima.children.length
    diagonalacima.remove(diagonalacima.children[tamanho-1])
    //-------------------------------------------//		
                
                
    //Criando contorno			
    var contorno= new THREE.Group();
    for (var i=0; i<10; i++)
    {
        m = criarcubo(medida,medida,medida,0,0,0);
        m.position.x=4.5*medida+i*medida;
        m.position.y=6.5*medida+i*medida;
        m.position.z=0;
        contorno.add(m);
    }
    
    contorno2=new THREE.Group();
    contorno2=contorno.clone()
    contorno2.position.x=contorno2.position.x+2*medida
    contorno2.position.y=contorno2.position.y-2*medida
    //------------------------------------------------//
    
    var braco= new THREE.Group();
    
    for (var i=0; i<8; i++)
    {
        m = criarcubo(medida,medida,medida,0,0,0);
        m.position.x=2.5*medida+i*medida;
        m.position.y=9.5*medida-i*medida;
        m.position.z=0;
        braco.add(m);
    }
    
    //2 Cubinhos Faltando
    //scene.add(criarcubo(medida,medida,medida,0.25,0.05,0))
    //scene.add(criarcubo(medida,medida,medida,0.05,0.25,0))
    
    

    //Mudando as Cores
    for (var i=0; i<8; i++)
    {
        m = criarcubo(medida,medida,medida,0,0,0);
        m.position.x=2.5*medida+i*medida;
        m.position.y=9.5*medida-i*medida;
        m.position.z=0;
        braco.add(m);
    }

    //Mudando as Cores
    changecolorgroup(diagonalprincipal,0x800000)
    changecolorgroup(diagonalacima,0xff0000)
    changecolorgroup(diagonalabaixo,0xff0000)
    changecolorgroup(contorno,0xff8c00)
    changecolorgroup(contorno2,0xff8c00)
    changecolorgroup(braco,0x000000)
    
    var espada= new THREE.Group();
    espada.add(diagonalprincipal)
    espada.add(diagonalacima)
    espada.add(diagonalabaixo)
    espada.add(contorno)
    espada.add(contorno2)
    espada.add(braco)
    
    espada.position.x=10*medida
    
    espada.rotation.z=45*Math.PI/180
	
    espada.scale.set(0.6,0.6,0.6)
    espada.rotateX(Math.PI/20);
    espada.name = "sword";
    return espada;
}

// Posicionar a espada e rotacionar junto com o movimento do antebraço
function equipSword(character, sword, forearmUp) {
	var superiorRight = character.getObjectByName("superiorRight");
	var forearm = superiorRight.getObjectByName("forearm");

	var forearmPosition = new THREE.Vector3(0, 0, 0);
    forearmPosition.add(forearm.position).add(superiorRight.position).add(character.position);

	var x = forearmPosition.x;
	var y = forearmPosition.y - forearm.geometry.parameters.height / 2;
	var z = forearmPosition.z + (forearm.geometry.parameters.depth + sword.children[0].children[0].geometry.parameters.depth) / 2;

    sword.position.set(x, y, z);
    
    if(forearmUp) sword.rotateX(Math.PI/600);
    else sword.rotateX(-Math.PI/600);
}