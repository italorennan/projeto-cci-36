const loader = require('./loader');

class BackgroundElement{
   
   constructor({modelName, position, scale}){
      this.gltfPath = "./assets/ambient/models/" + modelName + ".glb";
      this.scale = scale || {x:1, y:1, z:1};
      this.position = position || {x:0, y:0, z:0};
   }

   loadElement = async () => {
      this.loadedElement = await loader.loadModule(this.gltfPath);
      this.entity = this.loadedElement.scene;
      this.mesh = this.loadedElement.scene.children[0];
   }
   
   setPosition = ({x, y, z}) => {
      this.position = {x:x, y:y, z:z};
      this.mesh.position.set(x,y,z);
   }

   setScale = ({x,y,z}) => {
      this.mesh.scale.set(x,y,z);
   }

   setRotation = ({x,y,z}) => {
      this.mesh.rotation.set(x,y,z);
   }
}

module.exports = BackgroundElement;
