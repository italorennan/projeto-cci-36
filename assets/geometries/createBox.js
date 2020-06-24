var materials={	
wood: new THREE.MeshStandardMaterial({map:  new THREE.TextureLoader().load(__dirname+'/../img/wood.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
stone: new THREE.MeshStandardMaterial({map:  new THREE.TextureLoader().load(__dirname+'/../img/stone.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
rainbow: new THREE.MeshStandardMaterial({map:  new THREE.TextureLoader().load(__dirname+'/../img/rainbow.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
gold: new THREE.MeshStandardMaterial({map:  new THREE.TextureLoader().load(__dirname+'/../img/gold.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
silver: new THREE.MeshStandardMaterial({map: new  THREE.TextureLoader().load(__dirname+'/../img/silver.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
diamond: new THREE.MeshStandardMaterial({map:new   THREE.TextureLoader().load(__dirname+'/../img/diamond.png'), roughness: 0, metalness:0.4, fog:true, skinning:true})	
};



function createBox(x, y, z, boxColor) {
    var geometry = new THREE.BoxGeometry(x, y, z);
    var material = new THREE.MeshBasicMaterial({color: boxColor});
    var box = new THREE.Mesh(geometry, material);
    return box;
}

module.exports = createBox;