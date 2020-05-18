function createArrow()
{
	
	
		
			var asa= new THREE.Group();
			//Diagonal Principal
			
			localizacao=[[0.05,0.45],[0.15,0.35],[0.15,0.15],[0.05,0.05]]
			for (var i=0; i<4; i++)
			{
			m = criarcubo(0.1,0.1,0.1,localizacao[i][0],localizacao[i][1],0)
			m.material.color.setHex(0x00ff00);
			asa.add(m);
			}
			
			var tronco=new THREE.Group()
			
			tronco.add(criarcubo(0.7,0.1,0.1,0.55,0.25,0))
			
			
			
			var pena = new THREE.Group();
			
			localizacao=[[0.95,0.45],[0.95,0.35],[0.95,0.25],[0.95,0.15],[0.95,0.05],[1.05,0.15],[1.05,0.25],[1.05,0.35],[1.15,0.25]]
			for (var i=0; i<localizacao.length; i++)
			{
			m = criarcubo(0.1,0.1,0.1,localizacao[i][0],localizacao[i][1],0)
			m.material.color.setHex(0x00ff00);
			pena.add(m);
			}
			
			var flecha = new THREE.Group();
			flecha.add(asa)
			flecha.add(tronco)
			flecha.add(pena)
			
			flecha.scale.set(5,5,5)
			flecha.position.x=5
			return flecha
	
	
}


