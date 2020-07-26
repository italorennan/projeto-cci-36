const Background = require('./Background');
const BackgroundElement = require('./BackgroundElement');

const createBackground =  async () => {
   
   const background = new Background();
   const ground = new BackgroundElement({modelName: "ground_grass", isGround: true});
   const tree = new BackgroundElement({modelName: "tree_default"});
   const stone = new BackgroundElement({modelName: "stone_largeD"});
   const mushroomRed = new BackgroundElement({modelName: "mushroom_redGroup"});
   const pathTile1 = new BackgroundElement({modelName: "ground_pathTile", isGroundPatch: true});
   const pathTile2 = new BackgroundElement({modelName: "ground_pathTile", isGroundPatch: true });
   const logStack = new BackgroundElement({modelName:"log_stackLarge"});
   const rockTallA = new BackgroundElement({modelName: "rock_tallA"});
   const rockTallB = new BackgroundElement({modelName: "rock_tallB"});
   const lake = new BackgroundElement({modelName:"ground_riverTile", isGroundPatch: true});

   await mushroomRed.loadElement();
   await ground.loadElement();
   await tree.loadElement();
   await stone.loadElement();
   await pathTile1.loadElement();
   await pathTile2.loadElement();
   await logStack.loadElement();
   await rockTallA.loadElement();
   await rockTallB.loadElement();
   await lake.loadElement();
   
   ground.setPosition({x:0,y:0,z:-150})
   tree.setPosition({x:-15,y:0,z:-30});
   stone.setPosition({x:18,y:0,z:-15});
   pathTile1.setPosition({x:-7.5,y:0.5, z:-12});
   pathTile2.setPosition({x:18,y:0.5, z:-34.5});
   mushroomRed.setPosition({x:10.5,y:0,z:10.5});
   logStack.setPosition({x:-22.5,y:0,z:0});
   rockTallA.setPosition({x:-3,y:0,z:-67.5});
   rockTallB.setPosition({x:-60, y:0, z:-15})
   lake.setPosition({x:30,y:0.5,z:15})

   pathTile2.setRotation({x:0, y:75, z:0});
   rockTallB.setRotation({x:0, y:Math.PI/2, z:0});

   tree.setScale({x:25,y:25,z:25});
   ground.setScale({x:100000,y:1,z:10000});
   stone.setScale({x:20,y:20,z:20});
   mushroomRed.setScale({x:20, y:20, z:20});
   pathTile1.setScale({x:5, y:5, z:5});
   pathTile2.setScale({x:8, y:5, z:10});
   logStack.setScale({x:25,y:25,z:25});
   rockTallA.setScale({x:75, y:30, z:50});
   rockTallB.setScale({x:90, y:30, z:35});
   lake.setScale({x:20,y:1,z:20});

   background.addBackgroundElement(ground);
   background.addBackgroundElement(tree);
   background.addBackgroundElement(stone);
   background.addBackgroundElement(pathTile1);
   background.addBackgroundElement(pathTile2);
   background.addBackgroundElement(mushroomRed);
   background.addBackgroundElement(logStack);
   background.addBackgroundElement(rockTallA);
   background.addBackgroundElement(rockTallB);
   background.addBackgroundElement(lake);

   return background;
}


module.exports = createBackground;