import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const geometry = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  // Object
  const geometry = new THREE.BufferGeometry();

  const radius = 1;
  const height = 2;
  const radialSegments = 20;

  const positionsArray = [];
  const indicesArray = [];

  // Generate vertices and indices for the cone
  for (let i = 0; i < radialSegments; i++) {
    const theta = (i / radialSegments) * Math.PI * 2;
    const nextTheta = ((i + 1) / radialSegments) * Math.PI * 2;

    // Base vertices
    const x0 = radius * Math.cos(theta);
    const y0 = 0;
    const z0 = radius * Math.sin(theta);

    const x1 = radius * Math.cos(nextTheta);
    const y1 = 0;
    const z1 = radius * Math.sin(nextTheta);

    // Apex vertex
    const x2 = 0;
    const y2 = height;
    const z2 = 0;

    // Push vertices
    positionsArray.push(x0, y0, z0, x1, y1, z1, x2, y2, z2);

    // Calculate indices
    const baseIndex = i * 3;
    indicesArray.push(baseIndex, baseIndex + 1, baseIndex + 2);
  }

  const positionsAttribute = new THREE.Float32BufferAttribute(
    positionsArray,
    3
  );
  geometry.setAttribute("position", positionsAttribute);
  geometry.setIndex(indicesArray);

  //   const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Camera
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
