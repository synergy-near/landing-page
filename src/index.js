import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './model'
import gsap from 'gsap';
import tippy from 'tippy.js';

tippy('#line_user_stake', {
  content: 'User stakes RAW token in order to insure their collateral. Each $10 of insurance save $1 of collateral when global debt increases.',
  arrow: true,
  theme: 'tomato',
});

tippy('#line_user_collateral', {
  content: 'User pledge over-collateral in exogenous tokens (DAI, USDC).',
  arrow: true,
  theme: 'tomato',
});


tippy('#stake_rUSD', {
  content: 'When user withdraw their debt, up to 100% debt loss might be refunded in RAW tokens if the user has enough money in insurance stake.',
  arrow: true,
  theme: 'tomato',
});

tippy('#chainlink_rUSD', {
  content: 'All price feeds are delivered by Chainlink oracles',
  arrow: true,
  theme: 'tomato',
});

tippy('#collateral_rUSD', {
  content: 'Then they can mint 50% rUSD of the cost of their debt (200% overcollaterization).',
  arrow: true,
  theme: 'tomato',
});


tippy('#rUSD_rGAS', {
  content: 'rUSD can be arbitrary exchanged to any of the tokenized assets',
  arrow: true,
  theme: 'tomato',
});

tippy('#rUSD_shorts', {
  content: 'The protocol also provide users to take short position with 150% overcollateralization. Shorts also affect the global debt pool.',
  arrow: true,
  theme: 'tomato',
});





tippy('#shares', {
  content: '$APPLE, $TSLA',
  arrow: true,
  theme: 'tomato',
});

tippy('#cryptocurrencies', {
  content: '$BTC, $ETH',
  arrow: true,
  theme: 'tomato',
});

tippy('#indices', {
  content: 'Dow Jones, NASDAQ',
  arrow: true,
  theme: 'tomato',
});

tippy('#crypto_indices', {
  content: '$DPI, $MVI',
  arrow: true,
  theme: 'tomato',
});

tippy('#resources', {
  content: 'gold, silver, oil',
  arrow: true,
  theme: 'tomato',
});

tippy('#position', {
  content: 'ETH2x-FLI',
  arrow: true,
  theme: 'tomato',
});



/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;
camera.position.y = 1;

/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true

/*------------------------------
Helpers
------------------------------*/
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/*------------------------------
Models
------------------------------*/
const ground = new Model({
  name: 'tree',
  file: './models/ground.glb',
  scene: scene,
  type: "ground"
})

const tree = new Model({
  name: 'tree',
  file: './models/tree.glb',
  scene: scene,
  type: "tree"
})
camera.updateProjectionMatrix();

/*------------------------------
Clock
------------------------------*/
const clock = new THREE.Clock()

/*------------------------------
Loop
------------------------------*/
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (tree.isAcrive) {
    tree.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  }

  // if (ground.isAcrive) {
  //   ground.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  // }
};
animate();


/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

function onMouseMove(e) {
  const x = e.clientX
  const y = e.clientY

  gsap.to(scene.rotation, {
    y: gsap.utils.mapRange(0, window.innerWidth, .5, -.5, x),
    // x: gsap.utils.mapRange(0, window.innerWidth, .5, -.5, y)
  })
}

window.addEventListener('mousemove', onMouseMove)





