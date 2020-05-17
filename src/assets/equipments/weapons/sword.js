function createSword() {
    var diagonalprincipal= new THREE.Group();
    //Diagonal Principal
    for (var i=0; i<16; i++)
    {
    m = criarcubo(0.1,0.1,0.1,0,0,0)
    m.material.color.setHex(0x00ff00);
    m.position.x=0.05+i/10;
    m.position.y=0.05+i/10;
    m.position.z=0;
    diagonalprincipal.add(m);
    }

    //Criar as Duas Diagonais Adjacentes
    var diagonalabaixo= new THREE.Group();		
    
    //Clonar Trocando o Material
    diagonalabaixo = diagonalprincipal.clone();
    diagonalabaixo.traverse((node) => {if (node.isMesh) {node.material = node.material.clone();}}); 			//Para poder mudar a Cor
    diagonalabaixo.position.x=diagonalabaixo.position.x+0.1
    diagonalabaixo.position.y=diagonalabaixo.position.y
    tamanho=diagonalabaixo.children.length
    diagonalabaixo.remove(diagonalabaixo.children[tamanho-1])

    var diagonalacima= new THREE.Group();					
    diagonalacima = diagonalprincipal.clone();
    diagonalacima.traverse((node) => {if (node.isMesh) {node.material = node.material.clone();}});

    diagonalacima.position.x=diagonalacima.position.x
    diagonalacima.position.y=diagonalacima.position.y+0.1
    tamanho=diagonalacima.children.length
    diagonalacima.remove(diagonalacima.children[tamanho-1])
    //-------------------------------------------//		
                
                
    //Criando contorno			
    var contorno= new THREE.Group();
    for (var i=0; i<10; i++)
    {
        m = criarcubo(0.1,0.1,0.1,0,0,0);
        m.position.x=0.45+i/10;
        m.position.y=0.65+i/10;
        m.position.z=0;
        contorno.add(m);
    }
    
    contorno2=new THREE.Group();
    contorno2=contorno.clone()
    contorno2.position.x=contorno2.position.x+0.2
    contorno2.position.y=contorno2.position.y-0.2
    //------------------------------------------------//
    
    var braco= new THREE.Group();
    
    for (var i=0; i<8; i++)
    {
        m = criarcubo(0.1,0.1,0.1,0,0,0);
        m.position.x=0.25+i/10;
        m.position.y=0.95-i/10;
        m.position.z=0;
        braco.add(m);
    }
    
    //2 Cubinhos Faltando
    //scene.add(criarcubo(0.1,0.1,0.1,0.25,0.05,0))
    //scene.add(criarcubo(0.1,0.1,0.1,0.05,0.25,0))
    
    

    //Mudando as Cores
    for (var i=0; i<8; i++)
    {
        m = criarcubo(0.1,0.1,0.1,0,0,0);
        m.position.x=0.25+i/10;
        m.position.y=0.95-i/10;
        m.position.z=0;
        braco.add(m);
    }



    //Mudando as Cores
    changecolorgroup(diagonalprincipal,0x000000)
    changecolorgroup(diagonalacima,0xff0000)
    changecolorgroup(diagonalabaixo,0xff0000)
    changecolorgroup(braco,0x00ff00)
    
    var espada= new THREE.Group();
    espada.add(diagonalprincipal)
    espada.add(diagonalacima)
    espada.add(diagonalabaixo)
    espada.add(contorno)
    espada.add(contorno2)
    espada.add(braco)
    
    espada.position.x=1
    
    espada.rotation.z=45*Math.PI/180

    return espada;
}