import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// cursor
// These are pixel values, we need to convert them to a range between -1 and 1
export const fullScreenAndResize = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

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

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("dblclick", () => {
    const fullscreenElement =
      document.fullscreenElement

    if (!fullscreenElement) {
        canvas.requestFullscreen();
    } else{
      document.exitFullscreen();
    }
  });

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.z = 3;
  scene.add(camera);

  // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.update();

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

 const tick = () => {
   // Render
   renderer.render(scene, camera);

   // Call tick again on the next frame
   window.requestAnimationFrame(tick);
 };

 tick();
};
