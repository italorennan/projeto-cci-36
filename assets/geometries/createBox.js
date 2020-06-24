function createBox(x, y, z, boxColor) {
    var geometry = new THREE.BoxGeometry(x, y, z);
    var material = new THREE.MeshBasicMaterial({color: boxColor});
    var box = new THREE.Mesh(geometry, material);
    return box;
}

module.exports = createBox;