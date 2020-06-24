# projeto-cci-36
Projeto de CCI-36.

Estrutura de arquivos:

```js
- modules //Dependencias usadas
   |- three.js
   |- OrbitControls.js
   |- GLTFLoader.js
- assets //Modelos e suas funcionalidades
   |- ambient //Configuracoes de objetos do ambiente
   |- character //Modelos do personagem
   |- equipments //Modelos de armas e armaduras
   |- geometries //Modelos base
   |- images //Imagens usadas para as texturas
   |- shaders //Implementacao dos shaders utilizados
- index.html //Html base do projeto
- index.js //Js que carrega a aplciação principal
- eventHandler.js //Js que define os eventHandlers para interação com o usuários
- bundle.js //Js gerado pelo browserify para permitir o uso de requires dentro do código
- styles.css //Estilizacao dos itens usados no html
