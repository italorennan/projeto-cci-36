// Shader 2: redgreen
const redgreenShader = {
    vertexShader: [
        "varying vec2 color;",
        "uniform vec2 min;",
        "uniform vec2 scale;",
        "uniform vec2 size;",

        "void main() {",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
            "color.x = (scale.x * uv.x + min.x)/size.x;",
            "color.y = (scale.y * uv.y + min.y)/size.y;",
        "}"
    ].join( "\n" ),

    fragmentShader: [
        "varying vec2 color;",

        "void main() {",
            "gl_FragColor = vec4(color.x, color.y, 0.0, 1.0);",
        "}"
    ].join( "\n" )
};

function createRedgreenBox(x, y, z, param) {
    var material = new THREE.ShaderMaterial( {
        uniforms: param,
        vertexShader: redgreenShader.vertexShader,
        fragmentShader: redgreenShader.fragmentShader
    } );

    var geometry = new THREE.BoxGeometry(x, y, z);

    var box = new THREE.Mesh(geometry, material);

    return box;
}

module.exports = createRedgreenBox;