varying vec3 vPosition;
uniform vec3 bboxMin;
uniform vec3 bboxMax;
varying vec3 vUv;

uniform float uTime;
attribute vec3 aRandom;

void main() {
  vPosition = position;
  vUv = (position - bboxMin) / (bboxMax - bboxMin);

  vec3 pos = position;
  float time = uTime * 10.;

  pos = pos * 2.0;

  pos.z += 0.0;
//   pos.x += 15.0;
  pos.y -= 3.2;

  pos.x += sin(time + aRandom.x) * 0.04;
  pos.y += sin(time + aRandom.y) * 0.04;
  pos.z += sin(time + aRandom.z) * 0.04;
 
  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

  gl_PointSize = 4.5 / -mvPosition.z;
}


