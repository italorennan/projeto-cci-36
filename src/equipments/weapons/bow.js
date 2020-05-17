function createBow()
{
			var diagonalprincipal= new THREE.Group();
			//Diagonal Principal
			for (var i=0; i<14; i++)
			{
			m = criarcubo(0.1,0.1,0.1,0,0,0)
			m.material.color.setHex(0x00ff00);
			m.position.x=0.15+i/10;
			m.position.y=0.05+i/10;
			m.position.z=0;
			diagonalprincipal.add(m);
			}
			
			//--------------
			
			//Contorno Externo Esquerdo
			//Contorno Externo Esquerdo Inferior
			var contornoexternoesquerdoinferior= new THREE.Group();
			//Diagonal Principal
			for (var i=0; i<10; i++)
			{
			m = criarcubo(0.1,0.1,0.1,0,0,0)
			m.material.color.setHex(0x00ff00);
			m.position.y=0.15+i/10;
			m.position.z=0;
			if(i<=3)
				m.position.x=0.05;
			else if (i<=6)
				m.position.x=0.15;
			else if(i<=8)
				m.position.x=0.25;
			else 
				m.position.x=0.35;
			contornoexternoesquerdoinferior.add(m);
			}				
			//Contorno Externo Esquerdo Superior	
			var contornoexternoesquerdosuperior=contornoexternoesquerdoinferior.clone()			
			espelhar(contornoexternoesquerdosuperior,[-1,1,1])
			contornoexternoesquerdosuperior.rotation.z=90*Math.PI/180;
			contornoexternoesquerdosuperior.position.x=1.50
			contornoexternoesquerdosuperior.position.y=1.50
			var contornoexternoesquerdo= new THREE.Group();
			contornoexternoesquerdo.add(contornoexternoesquerdoinferior)
			contornoexternoesquerdo.add(contornoexternoesquerdosuperior)



			//Contorno Externo Direito
				//Contorno Externo Direito Inferior			
			contornoexternodireitoinferior=contornoexternoesquerdoinferior.clone()
			contornoexternodireitoinferior.position.x+=0.2			
			contornoexternodireitoinferior.remove(contornoexternodireitoinferior.children[8])
			contornoexternodireitoinferior.children[8].position.y-=0.1	
			
				//Contorno Externo Direito Superior
			var contornoexternodireitosuperior=contornoexternodireitoinferior.clone()
			espelhar(contornoexternodireitosuperior,[-1,1,1])
			contornoexternodireitosuperior.rotation.z=90*Math.PI/180;
			contornoexternodireitosuperior.position.x=1.5
			contornoexternodireitosuperior.position.y=1.3
			var contornoexternodireito= new THREE.Group();			
			contornoexternodireito.add(contornoexternodireitoinferior)
			contornoexternodireito.add(contornoexternodireitosuperior)
			
			
			//miolo
				//Miolo Inferior
			var mioloinferior=contornoexternodireitoinferior.clone()
			mioloinferior.position.x=0.1
				//Miolo Superior
			miolosuperior=mioloinferior.clone()
			espelhar(miolosuperior,[-1,1,1])
			miolosuperior.rotation.z=90*Math.PI/180;
			miolosuperior.position.x=1.5		
			miolosuperior.position.y=1.4		
			
			var miolo= new THREE.Group();			
			miolo.add(mioloinferior)
			miolo.add(miolosuperior)

			//Cubos Complementaries
			var cuboscomplementares= new THREE.Group();
			cuboscomplementares.add(criarcubo(0.1,0.1,0.1,0.55,1.15,0))
			cuboscomplementares.add(criarcubo(0.1,0.1,0.1,0.45,1.05,0))
			cuboscomplementares.add(criarcubo(0.1,0.1,0.1,0.35,0.95,0))
			
			
			//Cores
			desvincularmaterial(mioloinferior)
			changecolorgroup(mioloinferior,0x000000)
			desvincularmaterial(miolosuperior)
			changecolorgroup(miolosuperior,0x0000ff)
			
			

			var arco= new THREE.Group();
			arco.add(cuboscomplementares)
			arco.add(contornoexternoesquerdo)
			arco.add(contornoexternodireito)
			arco.add(diagonalprincipal)
			arco.add(miolo)
			return arco
	
	
}



