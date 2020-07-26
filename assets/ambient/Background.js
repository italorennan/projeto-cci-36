class Background{

   constructor(){
      this.backgroundElementArray = [];
   }

   addBackgroundElement = backgroundElement => {
      if(Array.isArray(backgroundElement))
         this.backgroundElementArray.push([...backgroundElement]);
      else
         this.backgroundElementArray.push(backgroundElement);
   }  

   getBackgroundElementArray = () => {
      return this.backgroundElementArray;
   }

   handleMouseDown(raycaster){
      const entityArray = this.backgroundElementArray.map( element => {
         return element.entity
      })
      const intersects = raycaster.intersectObjects(entityArray,true);

      let intersectedBackgroundObject = this.backgroundElementArray.filter( element=> {
         return (
            (element.mesh == intersects[0].object || element.mesh.children.includes(intersects[0].object))&& 
            (element.isGround == false)
         );
      })

      console.log(intersectedBackgroundObject);

      if(intersectedBackgroundObject.length > 0)
         intersectedBackgroundObject[0].setSelected(true);
   }

   handleMouseMove(raycaster){

      const ground = this.backgroundElementArray.filter( element => {
         return element.isGround
      })[0];
      const groundIntersection = raycaster.intersectObjects([ground.entity],true);

      const objectPosition = groundIntersection[0].point;
      this.backgroundElementArray.forEach(element => {
         if(element.isSelected == true && element.isGround == false )
            element.setPosition({
               x:objectPosition.x,
               y:objectPosition.y,
               z:objectPosition.z, 
               backgroundElements:this.backgroundElementArray
            });
      })
   }

   handleMouseUp(){
      this.backgroundElementArray.forEach(element => {
         if(element.isSelected == true){
            element.setSelected(false);
            console.log(element);
         }
      })
   } 

}

module.exports = Background;