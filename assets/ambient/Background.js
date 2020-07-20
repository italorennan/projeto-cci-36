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

   checkIntersects = intersects => {
      console.log(intersects);
   }
   
   getBackgroundElementArray = () => {
      return this.backgroundElementArray;
   }

}

module.exports = Background;