function init() {
    // Cena
    var scene = new THREE.Scene();

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.set(20, 40, 20);
    camera.lookAt(scene.position);

    // Renderer
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0xeeeeee, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Adicionar eixos
    // Auxilia visualização, deixar comentado no fim
    var axes = new THREE.AxesHelper(10);
    scene.add(axes);

    // Atributos do personagem
    gender = "F";
    skinColor = "#ffe4c4";
    hairColor = "#b8860b";
    eyeColor = "#006400";
    mouthColor = "#f08080";
    bodyColor = "#00ccdd";
    legColor = "#0000ff";
    shoeColor =  "#999999";
    character = createCharacter(gender, skinColor, hairColor, eyeColor, mouthColor, bodyColor, legColor, shoeColor);
    //scene.add(character);

  //  sword = createSword();
//    scene.add(sword);
//	axe=createAxe();
//	scene.add(axe)
//	axe_2=createAxe_2();
//	scene.add(axe_2)
	//arrow=createArrow();
	//scene.add(arrow)
//	bow=createBow();
//	scene.add(bow)
	shield=createShield();
	scene.add(shield)

    var count = 0;
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	
    
		
    // Movimentação dos objetos
    function animate() {
        requestAnimationFrame(animate);

        // Rotação da câmera
		var cameraX = 30 * Math.cos(0.1 * count);
        var cameraZ = 30 * Math.sin(0.1 * count);
       // camera.position.set(cameraX, 25, cameraZ);
		camera.lookAt(0,0,0);
		camera.position.x = cameraX;
		camera.position.z = cameraZ;
		
		controls.autoRotate=true;
		
		controls.update();
		
		

        renderer.render(scene, camera);

        count += 1;
    }

    animate();
}

window.onload = init();