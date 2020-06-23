// Shader 3: bluepink
const bluepinkShader = {
    vertexShader: [
        "varying vec2 color;",
        "uniform vec2 min;",
        "uniform vec2 scale;",
        "uniform vec2 size;",

        "void main() {",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
            "color.y = (scale.y * uv.y + min.y)/size.y;",
            "if (position.z > 0.0) color.x = (scale.x * uv.x + min.x)/size.x;",
            "else color.x = (min.x + scale.x - scale.x * uv.x)/size.x;",
        "}"
    ].join( "\n" ),

    fragmentShader: [
        "varying vec2 color;",

        "void main() {",
            "gl_FragColor = vec4(color.x, 0.0, color.y, 1.0);",
        "}"
    ].join( "\n" )
};

function createBluepinkBox(x, y, z, param) {
    var material = new THREE.ShaderMaterial( {
        uniforms: param,
        vertexShader: bluepinkShader.vertexShader,
        fragmentShader: bluepinkShader.fragmentShader
    } );

    var geometry = new THREE.BoxGeometry(x, y, z);

    var box = new THREE.Mesh(geometry, material);

    return box;
}

module.exports = createBluepinkBox;