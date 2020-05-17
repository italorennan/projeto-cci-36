function createShield()
{
			var asa= new THREE.Group();
			//Diagonal Principal
			var escudo = new THREE.Group();
			
			colunas=[5,9,11,13,13,15,15,15,15,13,13,11,9,5]
			for (var i=0; i<colunas.length; i++)
			{	
			escudo.add(criarcubo(0.1,0.1*colunas[i],0.1,0.2+0.1*i,0.8,0))
			}
			
			changecolorgroup(escudo,0x000000)
			escudo.children[3].material.color.setHex(0x00ff00);
			escudo.children[5].material.color.setHex(0x00ff00);
			escudo.children[8].material.color.setHex(0x00ff00);			
			escudo.children[10].material.color.setHex(0x00ff00);

			return escudo
}

		
