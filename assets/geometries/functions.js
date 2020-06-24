var materials={	
wood: new THREE.MeshStandardMaterial({map:  new THREE.TextureLoader().load(__dirname+'/../img/wood.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
stone: new THREE.MeshStandardMaterial({map:  new THREE.TextureLoader().load(__dirname+'/../img/stone.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
rainbow: new THREE.MeshStandardMaterial({map:  new THREE.TextureLoader().load(__dirname+'/../img/rainbow.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
gold: new THREE.MeshStandardMaterial({map:  new THREE.TextureLoader().load(__dirname+'/../img/gold.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
silver: new THREE.MeshStandardMaterial({map: new  THREE.TextureLoader().load(__dirname+'/../img/silver.png'), roughness: 0, metalness:0.4, fog:true, skinning:true}),
diamond: new THREE.MeshStandardMaterial({map:new   THREE.TextureLoader().load(__dirname+'/../img/diamond.png'), roughness: 0, metalness:0.4, fog:true, skinning:true})	
};



function changecolorgroup(group,cor)
{

	for (var children=0;children<group.children.length;children+=1)
	{
		group.children[children].material.color.setHex(cor)
	}			
}

	
function changetexture(group,texture)
{
	  group.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.material = materials[texture];
    }
  });

  
}
	
function criarcubo(tamanhox,tamanhoy,tamanhoz,eixox,eixoy,eixoz)
{
	// criando o cubo
	var geometry=new THREE.BoxGeometry(tamanhox,tamanhoy,tamanhoz);	// Tamanho
	var material=new THREE.MeshBasicMaterial({color:0xffff00}); // Cor
	var cube= new THREE.Mesh(geometry,material);
	cube.position.x=eixox
	cube.position.y=eixoy
	cube.position.z=eixoz
	return cube	
}


			
function desvincularmaterial(group)
{
    group.traverse((node) => {
		if (node.isMesh) 
		{
			node.material = node.material.clone();
		}});
}
		
function espelhar(group,escala)
{
	const scale = new THREE.Vector3(1, 1, 1);
	scale.x*=escala[0];
	scale.y*=escala[1];
	scale.z*=escala[2];
    group.scale.multiply(scale);
}

module.exports = {
   espelhar,
   desvincularmaterial,
   criarcubo,
   changetexture,
   changecolorgroup
}