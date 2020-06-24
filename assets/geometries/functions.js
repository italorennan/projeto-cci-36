
var materials={};

function changecolorgroup(group,cor)
{

	for (var children=0;children<group.children.length;children+=1)
	{
		group.children[children].material.color.setHex(cor)
	}			
}




//function changetexture(group,texture)
//{
	//console.log(group.children.length);
	//for (var children=0;children<group.children.length;children+=1)
//	{
	//	group.children[children].material=materials[texture]
	//}			
//}
	
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
	
	
	
	materials['normal']=new THREE.MeshBasicMaterial({color:0xffff00}); // Cor
	
	texture_wood = new THREE.TextureLoader().load(__dirname+'/../img/wood.png');
	texture_stone= new THREE.TextureLoader().load(__dirname+'/../img/stone.png');
	texture_rainbow = new THREE.TextureLoader().load(__dirname+'/../img/rainbow.png');
	texture_gold= new THREE.TextureLoader().load(__dirname+'/../img/gold.png');
	texture_silver = new THREE.TextureLoader().load(__dirname+'/../img/silver.png');
	texture_diamond = new THREE.TextureLoader().load(__dirname+'/../img/diamond.png');
	
	materials['wood']=new THREE.MeshStandardMaterial({map: texture_wood, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['stone']=new THREE.MeshStandardMaterial({map: texture_stone, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['rainbow']=new THREE.MeshStandardMaterial({map: texture_rainbow, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['gold']=new THREE.MeshStandardMaterial({map: texture_gold, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['silver']=new THREE.MeshStandardMaterial({map: texture_silver, roughness: 0, metalness:0.4, fog:true, skinning:true});
	materials['diamond']=new THREE.MeshStandardMaterial({map: texture_diamond, roughness: 0, metalness:0.4, fog:true, skinning:true});

	var cube= new THREE.Mesh(geometry,materials['normal']);

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