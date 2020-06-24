// Criação de uma box genérica
var materials={};
function createBox(x, y, z, boxColor) {
    var geometry = new THREE.BoxGeometry(x, y, z);

	texture_wood = new THREE.TextureLoader().load(__dirname+'/../img/wood.png');
	texture_stone= new THREE.TextureLoader().load(__dirname+'/../img/stone.png');
	texture_rainbow = new THREE.TextureLoader().load(__dirname+'/../img/rainbow.png');		
	texture_gold= new THREE.TextureLoader().load(__dirname+'/../img/gold.png');	
	texture_silver = new THREE.TextureLoader().load(__dirname+'/../img/silver.png');
	texture_diamond = new THREE.TextureLoader().load(__dirname+'/../img/diamond.png');
	

	materials['normal']=new THREE.MeshBasicMaterial({color: boxColor});
	materials['wood']=new THREE.MeshStandardMaterial({map: texture_wood, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['stone']=new THREE.MeshStandardMaterial({map: texture_stone, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['rainbow']=new THREE.MeshStandardMaterial({map: texture_rainbow, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['gold']=new THREE.MeshStandardMaterial({map: texture_gold, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['silver']=new THREE.MeshStandardMaterial({map: texture_silver, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['diamond']=new THREE.MeshStandardMaterial({map: texture_diamond, roughness: 0, metalness:0.4, fog:true, skinning:true});
	
	var box = new THREE.Mesh(geometry, materials['normal']);
	return box;
}

module.exports = createBox;