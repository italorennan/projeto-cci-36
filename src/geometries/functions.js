function changecolorgroup(group,cor)
{
	for (var children=0;children<group.children.length;children+=1)
	{
		group.children[children].material.color.setHex(cor)
	}			
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