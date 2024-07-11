import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";

export const lights = () => {
  // Debug
  const gui = new GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Lights
   */
  // This light comes from everywhere and it's the same intensity
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  ambientLight.color = new THREE.Color(0xff0000);
  ambientLight.intensity = 1;
  scene.add(ambientLight);

  // Debug
  gui.add(ambientLight, "intensity").min(0.87).max(3).step(0.001);

  // Directional Light
  // This light comes from a specific direction, it's like the sun.
  // They are parallel rays of light.
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0.25, 0.25, 0);
  scene.add(directionalLight);

  // Debug
  gui.add(directionalLight, "intensity").min(0).max(3).step(0.001);

  // Hemisphere Light
  // This light comes from the sky, from above and the second color from below.
  // It's good in stituations like the sky is blue and the grass is green.
  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5);
  scene.add(hemisphereLight);

  // Debug
  gui.add(hemisphereLight, "intensity").min(0).max(3).step(0.001);

  // Point Light
  // This light comes from a specific point, it casts shadows after a reflection of light.
  // we can control the fade distance and how fast it fades with distance and decay.
  const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
  pointLight.position.set(1, -0.5, 1);
  scene.add(pointLight);

  // Debug
  gui.add(pointLight, "intensity").min(0).max(3).step(0.001);

  // rectAreaLight
  // This light is like a rectangle that emits light.
  // Works best with meshphysicalmaterial(inherits) and meshstandardmaterial.
  const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
  rectAreaLight.position.set(-1.5, 1, 1.5);
  rectAreaLight.lookAt(new THREE.Vector3());
  scene.add(rectAreaLight);

  // Debug
  gui.add(rectAreaLight, "intensity").min(0).max(3).step(0.001);

  // Spot Light
  // This light is like a flashlight, it emits light in a cone shape. or touch on the wall.
  // We can control the angle of the cone, the penumbra, the decay, and the distance.
  const spotLight = new THREE.SpotLight(
    0x78ff00,
    2,
    10,
    Math.PI * 0.1,
    0.25,
    1
  );
  spotLight.position.set(0, 2, 3);

  spotLight.target.position.x = -1.5;
  scene.add(spotLight.target);

  scene.add(spotLight);

  // Debug
  gui.add(spotLight, "intensity").min(0).max(10).step(0.001);
  gui.add(spotLight, "distance").min(0).max(100).step(0.001);

  // Disadvantages of lights
  // 1. Performance heavy. The solution is using less heavy ambient light, directional lights and pointlight or avoid spotlight and rectarealight.

  // Baking
  // It's a process of precomputing the light and shadows in the scene.
  // This is done in 3D software like blender.
  // It's good for static objects and scenes. But cannot be used for dynamic objects.

  // Lightmap
  // It's a texture that contains the precomputed light and shadows.

  // Helpers
  const hemisphereLightHelper = new THREE.HemisphereLightHelper(
    hemisphereLight,
    0.2
  );
  scene.add(hemisphereLightHelper);

  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2
  );
  scene.add(directionalLightHelper);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
  scene.add(pointLightHelper);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
  scene.add(rectAreaLightHelper);

  /**
   * Objects
   */
  // Material
  const material = new THREE.MeshStandardMaterial();
  material.roughness = 0.4;

  // Objects
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
  );
  sphere.position.x = -1.5;

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
  );

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
  );
  torus.position.x = 1.5;

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.65;

  scene.add(sphere, cube, torus, plane);

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    cube.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    cube.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
