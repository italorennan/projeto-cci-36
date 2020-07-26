const loader = require('./loader');

class BackgroundElement{
   
   constructor({modelName, position, scale, isGround, isGroundPatch}){
      this.gltfPath = "./assets/ambient/models/" + modelName + ".glb";
      this.scale = scale || {x:1, y:1, z:1};
      this.position = position || {x:0, y:0, z:0};
      this.isGround = isGround || false;
      this.isGroundPatch = isGroundPatch || false;
      this.isSelected = false;
      this.boundBox = null;
   }

   loadElement = async () => {
      this.loadedElement = await loader.loadModule(this.gltfPath);
      this.entity = this.loadedElement.scene;
      this.mesh = this.loadedElement.scene.children[0];
      this.boundBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      this.boundBox.setFromObject(this.mesh)
   }

   _checkCollisions = backgroundElements => {
      let checkColisions = false
      backgroundElements.forEach( element => {
         if(this.entity != element.entity && this.isGround == false && element.isGround == false && element.isGroundPatch == false)
            checkColisions = checkColisions || this.boundBox.intersectsBox(element.boundBox)
      })
      console.log(checkColisions)
      return !checkColisions
   }

   setPosition = ({x, y, z, backgroundElements}) => {
      let colisionOk = true;
      let oldPostion = this.position;
      this.position = {x:x, y:y, z:z};
      this.mesh.position.set(x,y,z);
      this.boundBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      this.boundBox.setFromObject(this.mesh)
      if(backgroundElements != undefined)
         colisionOk = this._checkCollisions(backgroundElements);
      if(!colisionOk)
         this.setPosition({...oldPostion, backgroundElements})      
   }

   setScale = ({x,y,z}) => {
      this.mesh.scale.set(x,y,z);
      this.boundBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      this.boundBox.setFromObject(this.mesh)
   }

   setRotation = ({x,y,z}) => {
      this.mesh.rotation.set(x,y,z);
      this.boundBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      this.boundBox.setFromObject(this.mesh)
   }

   setSelected = isSelected => {
      this.isSelected = isSelected;
   }   
}

module.exports = BackgroundElement;
