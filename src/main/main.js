function init() {
    // Cena
    var scene = new THREE.Scene();

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.set(5, 5, 5);
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

    // Exemplo: criar objetos e adicionar à cena
    cube = createCube();
    scene.add(cube);

    // Movimentação dos objetos
    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }

    animate();
}

window.onload = init();