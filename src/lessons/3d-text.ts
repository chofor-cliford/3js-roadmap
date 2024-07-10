import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/Addons.js";

export const threeDText = () => {
  // Debug
//   const gui = new GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  // Axes helper
  //   const axesHelper = new THREE.AxesHelper();
  //   scene.add(axesHelper);

  // Font
  const loader = new FontLoader();

  loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Talking, Chofor", {
      font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 3,
    });
    //   textGeometry.computeBoundingBox();
    //     textGeometry.translate(
    //         -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
    //         -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //         -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    //     );

    textGeometry.center();

    // Matcap texture, these are reference pictures applied to the material accordingly.

    console.time("donuts");
    const textMaterial = new THREE.MeshMatcapMaterial();
    textMaterial.matcap = matcapTexture1;
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);

    const donutMaterial = new THREE.MeshMatcapMaterial();
    donutMaterial.matcap = matcapTexture2;
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

    for (let i = 0; i < 100; i++) {
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);
      scene.add(donut);

      // This is a random number between -0.5 and 0.5
      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random();
      donut.scale.set(scale, scale, scale);
    }

    console.timeEnd("donuts");
  });

  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader();
  const matcapTexture1 = textureLoader.load("/assets/matcaps/7.png");
  matcapTexture1.colorSpace = THREE.SRGBColorSpace;
  const matcapTexture2 = textureLoader.load("/assets/matcaps/1.png");
  matcapTexture2.colorSpace = THREE.SRGBColorSpace;

  /**
   * Sizes
   */
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

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 2;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
//   const clock = new THREE.Clock();

  const tick = () => {
    // const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
