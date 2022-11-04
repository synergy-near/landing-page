
varying vec3 vPosition;
uniform vec3 color1;
uniform vec3 color2;
varying vec3 vUv;

void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

    float depth = vUv.z;
    gl_FragColor = vec4(mix(color1, color2, vUv.z), depth * 0.3 + 0.2);
}

    