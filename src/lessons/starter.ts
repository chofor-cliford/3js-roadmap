import * as THREE from "three";
import { Timer } from "three/addons/misc/Timer.js";
// import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

// Textures
// const textureLoader = new THREE.TextureLoader();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Fixes the bug with getElapsedTime() method
const timer = new Timer();

const tick = () => {
  // Timer

  timer.update();
  // const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
