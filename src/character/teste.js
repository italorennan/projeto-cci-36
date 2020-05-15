function createCube() {
    // Teste: cubo
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    var cube = new THREE.Mesh(geometry, material);

    return cube;
}