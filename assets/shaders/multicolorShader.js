var uniforms;

const setupUniforms = () => {
  uniforms = {
    u_time: { type: "f", value: 1.0 }
  };
}

const updateTime = () => {
  uniforms.u_time.value += 0.05;
}

// Shader 1: multicolor
const multicolorShader = {
  vertexShader: [
      "void main() {",
           "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
      "}"
  ].join( "\n" ),

  fragmentShader: [
      "uniform float u_time;",
     
      "void main() {",
           "gl_FragColor = vec4(sin(0.1*u_time), cos(0.1*u_time), 0.5*sin(0.1*u_time) + 0.5*cos(0.1*u_time), 1.0);",
      "}"
  ].join( "\n" )
};

function createMulticolorBox(x, y, z) {
  var material = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: multicolorShader.vertexShader,
      fragmentShader: multicolorShader.fragmentShader
  } );

  var geometry = new THREE.BoxGeometry(x, y, z);

  var box = new THREE.Mesh(geometry, material);

  return box;
}

module.exports = {
  setupUniforms,
  updateTime,

  createMulticolorBox
}