const { __esModule } = require("../../modules/three");

const loader = new GLTFLoader();

module.exports.loadModule = (url) => {
   return new Promise((resolve,reject)=> {
      loader.load(url, data => resolve(data), null, reject);
   })
}