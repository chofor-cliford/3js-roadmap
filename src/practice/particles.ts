import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import GUI from "lil-gui";

// Notes
// - Particles can be used to create stars, dust, smoke, fire, rain etc.
// - You create thousand of them at a reasonable frame rate.
// - Each particle is compose of one plane (two triangles) with a texture.

export const particles = () => {
  /**
   * Base
   */
  // Debug
//   const gui = new GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader();
  const particleTexture = textureLoader.load("/assets/textures/particles/2.png");

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    alphaMap: particleTexture,
    // alphaTest: 0.001, // Technique to remove the white border around the particles
    // depthTest: false, // Disable depth test to render the particles in front of each other
    blending: THREE.AdditiveBlending, // Additive blending can be used to create glowing effects, but can be performance expensive.
    depthWrite: false,
    transparent: true,
    // color: "#ff88cc",
    size: 0.08,
    vertexColors: true,
  });

  const count = 5000;
  const particlesVertices = [];
  const particlesColors = [];

  for (let i = 0; i < count * 3; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;

    particlesVertices.push(x, y, z);

    particlesColors.push(Math.random(), Math.random(), Math.random());
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(particlesVertices, 3)
  );

  particlesGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(particlesColors, 3)
  );

  // Points
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);


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
  camera.position.z = 3;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update particles
    // particles.rotation.y = elapsedTime * 0.01;
    for(let i = 0; i < count * 3; i++) {
        const i3 = i * 3;
        const x = particlesGeometry.attributes.position.array[i3];
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
