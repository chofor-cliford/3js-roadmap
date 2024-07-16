/* eslint-disable @typescript-eslint/no-unused-vars */
import * as THREE from "three";
import { Timer } from "three/addons/misc/Timer.js";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const galaxy = () => {
  // Debug
  const gui = new dat.GUI({ width: 340 });

  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  // Galaxy
  const parameters: {
    count: number;
    size: number;
    radius: number;
    branches: number;
    spin: number;
    randomness: number;
    randomnessPower: number;
    insideColor: string;
    outsideColor: string;
  } = {
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.8,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  };

  let geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> | null =
    null;
  let material: THREE.PointsMaterial | null = null;
  let points: THREE.Object3D<THREE.Object3DEventMap> | null = null;

  const generateGalaxy = () => {
    // If there are points in the scene, remove them
    if (points !== null) {
      geometry?.dispose();
      material?.dispose();
      scene.remove(points);
    }

    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    // Fill the geometry with random positions
    for (let i = 0; i < parameters.count * 3; i++) {
      const i3 = i * 3;

      // Position
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = 0 + randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      // Colors
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Material
    material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    // Points
    points = new THREE.Points(geometry, material);
    scene.add(points);
  };

  generateGalaxy();
  // Debug
  gui
    .add(parameters, "count")
    .min(100)
    .max(1000000)
    .step(100)
    .onFinishChange(generateGalaxy);
  gui
    .add(parameters, "size")
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .onFinishChange(generateGalaxy);
  gui
    .add(parameters, "radius")
    .min(0.01)
    .max(20)
    .step(0.01)
    .onFinishChange(generateGalaxy);
  gui
    .add(parameters, "branches")
    .min(2)
    .max(20)
    .step(1)
    .onFinishChange(generateGalaxy);
  gui
    .add(parameters, "spin")
    .min(-5)
    .max(5)
    .step(0.01)
    .onFinishChange(generateGalaxy);
  gui
    .add(parameters, "randomness")
    .min(0)
    .max(2)
    .step(0.001)
    .onFinishChange(generateGalaxy);
  gui
    .add(parameters, "randomnessPower")
    .min(1)
    .max(10)
    .step(0.001)
    .onFinishChange(generateGalaxy);
  gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
  gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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
};
