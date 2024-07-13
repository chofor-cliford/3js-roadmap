import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { Sky } from "three/examples/jsm/Addons.js";

export const hunterHouse = () => {
  // Notes
  // One unit in Three.js can mean anything you want. It can be 1 meter, 1 kilometer, 1 mile, 1 foot, 1 inch, etc.
  // The floor is going to be a square plane perfectly centered in the scene. zero on the y-axis is the ground level.
  // We use the meshstandardmaterial and meshphysicalmaterial for physically based rendering (PBR). It's the most realistic way to render 3D objects.
  // We also have aside from .webp, the basis format. It's good for the GPU, but bad for bandwidth. It's good for 3D models, but not for images.

  /**
   * Base
   *
   */
  // Debug
  const gui = new GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  // Textures
  const textureLoader = new THREE.TextureLoader();

  // Floor
  const floorAlphaTexture = textureLoader.load("/assets/floor/alpha.webp");
  const floorColorTexture = textureLoader.load(
    "/assets/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
  );
  const floorArmTexture = textureLoader.load(
    "/assets/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
  );
  const floorNormalTexture = textureLoader.load(
    "/assets/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
  );
  const floorDisplacementTexture = textureLoader.load(
    "/assets/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
  );

  // Walls
  const wallColorTexture = textureLoader.load(
    "/assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp"
  );
  const wallArmTexture = textureLoader.load(
    "/assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp"
  );
  const wallNormalTexture = textureLoader.load(
    "/assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp"
  );

  // Roof
  const roofColorTexture = textureLoader.load(
    "/assets/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp"
  );
  const roofArmTexture = textureLoader.load(
    "/assets/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp"
  );
  const roofNormalTexture = textureLoader.load(
    "/assets/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp"
  );

  // Bushes
  const bushColorTexture = textureLoader.load(
    "/assets/bush/leaves_forest_ground/leaves_forest_ground_diff_1k.webp"
  );
  const bushArmTexture = textureLoader.load(
    "/assets/bush/leaves_forest_ground/leaves_forest_ground_arm_1k.webp"
  );
  const bushNormalTexture = textureLoader.load(
    "/assets/bush/leaves_forest_ground/leaves_forest_ground_nor_gl_1k.webp"
  );

  // Graves
  const graveColorTexture = textureLoader.load(
    "/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp"
  );
  const graveArmTexture = textureLoader.load(
    "/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp"
  );
  const graveNormalTexture = textureLoader.load(
    "/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp"
  );

  // Door
  const doorColorTexture = textureLoader.load("/assets/door/color.webp");
  const doorAlphaTexture = textureLoader.load("/assets/door/alpha.webp");
  const doorAmbientOcclusionTexture = textureLoader.load(
    "/assets/door/ambientOcclusion.webp"
  );
  const doorHeightTexture = textureLoader.load("/assets/door/height.webp");
  const doorNormalTexture = textureLoader.load("/assets/door/normal.webp");
  const doorMetalnessTexture = textureLoader.load("/assets/door/metalness.webp");
  const doorRoughnessTexture = textureLoader.load("/assets/door/roughness.webp");

  floorColorTexture.colorSpace = THREE.SRGBColorSpace; // Always do this for color textures
  wallColorTexture.colorSpace = THREE.SRGBColorSpace; // Always do this for color textures
  roofColorTexture.colorSpace = THREE.SRGBColorSpace; // Always do this for color textures
  bushColorTexture.colorSpace = THREE.SRGBColorSpace; // Always do this for color textures
  graveColorTexture.colorSpace = THREE.SRGBColorSpace; // Always do this for color textures
  doorColorTexture.colorSpace = THREE.SRGBColorSpace; // Always do this for color textures

  // Repeat
  floorColorTexture.repeat.set(8, 8);
  floorArmTexture.repeat.set(8, 8);
  floorNormalTexture.repeat.set(8, 8);
  floorDisplacementTexture.repeat.set(8, 8);

  roofColorTexture.repeat.set(3, 1);
  roofArmTexture.repeat.set(3, 1);
  roofNormalTexture.repeat.set(3, 1);

  bushColorTexture.repeat.set(2, 1);
  bushArmTexture.repeat.set(2, 1);
  bushNormalTexture.repeat.set(2, 1);

  graveColorTexture.repeat.set(0.3, 0.4);
  graveArmTexture.repeat.set(0.3, 0.4);
  graveNormalTexture.repeat.set(0.3, 0.4);

  // Wrap
  floorColorTexture.wrapS = THREE.RepeatWrapping;
  floorColorTexture.wrapT = THREE.RepeatWrapping;
  floorArmTexture.wrapS = THREE.RepeatWrapping;
  floorArmTexture.wrapT = THREE.RepeatWrapping;
  floorNormalTexture.wrapS = THREE.RepeatWrapping;
  floorNormalTexture.wrapT = THREE.RepeatWrapping;
  floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
  floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

  roofColorTexture.wrapS = THREE.RepeatWrapping;
  roofArmTexture.wrapS = THREE.RepeatWrapping;
  roofNormalTexture.wrapS = THREE.RepeatWrapping;

  bushColorTexture.wrapS = THREE.RepeatWrapping;
  bushArmTexture.wrapS = THREE.RepeatWrapping;
  bushNormalTexture.wrapS = THREE.RepeatWrapping;

  /**
   * House
   */

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
      alphaMap: floorAlphaTexture,
      transparent: true,
      map: floorColorTexture,
      aoMap: floorArmTexture,
      roughnessMap: floorArmTexture,
      metalnessMap: floorArmTexture,
      normalMap: floorNormalTexture,
      displacementMap: floorDisplacementTexture,
      displacementScale: 0.2,
      displacementBias: -0.2,
    })
  );
  floor.rotation.x = -Math.PI * 0.5;
  scene.add(floor);

  // Debug
  gui
    .add(floor.material, "displacementScale")
    .min(0)
    .max(1)
    .step(0.001)
    .name("Displacement scale");
  gui
    .add(floor.material, "displacementBias")
    .min(-1)
    .max(1)
    .step(0.001)
    .name("Displacement bias");

  // Group -- House (Parent)
  const house = new THREE.Group();
  scene.add(house);

  // Walls
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
      map: wallColorTexture,
      aoMap: wallArmTexture,
      roughnessMap: wallArmTexture,
      metalnessMap: wallArmTexture,
      normalMap: wallNormalTexture,
    })
  );
  walls.position.y = 2.5 / 2;
  house.add(walls);

  // Roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
      map: roofColorTexture,
      aoMap: roofArmTexture,
      roughnessMap: roofArmTexture,
      metalnessMap: roofArmTexture,
      normalMap: roofNormalTexture,
    })
  );
  roof.position.y = 2.5 + 1.5 / 2;
  roof.rotation.y = Math.PI * 0.25;
  house.add(roof);

  // Door
  // When the displacement map does not move up its because of little vertices.
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      alphaMap: doorAlphaTexture,
      transparent: true,
      aoMap: doorAmbientOcclusionTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.15,
      displacementBias: -0.04,
      normalMap: doorNormalTexture,
      metalnessMap: doorMetalnessTexture,
      roughnessMap: doorRoughnessTexture,
    })
  );
  door.position.z = 2 + 0.01;
  door.position.y = 0.9;
  house.add(door);

  // Bushes
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({
    color: "#ccffcc",
    map: bushColorTexture,
    aoMap: bushArmTexture,
    roughnessMap: bushArmTexture,
    metalnessMap: bushArmTexture,
    normalMap: bushNormalTexture,
  });

  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush1.scale.set(0.5, 0.5, 0.5);
  bush1.position.set(0.8, 0.2, 2.2);
  bush1.rotation.x = -0.75;

  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush2.scale.set(0.25, 0.25, 0.25);
  bush2.position.set(1.4, 0.1, 2.1);
  bush2.rotation.x = -0.75;

  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush3.scale.set(0.4, 0.4, 0.4);
  bush3.position.set(-0.8, 0.1, 2.2);
  bush3.rotation.x = -0.75;

  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush4.scale.set(0.15, 0.15, 0.15);
  bush4.position.set(-1.0, 0.05, 2.6);
  bush4.rotation.x = -0.75;

  house.add(bush1, bush2, bush3, bush4);

  // Graves
  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveArmTexture,
    roughnessMap: graveArmTexture,
    metalnessMap: graveArmTexture,
    normalMap: graveNormalTexture,
  });

  const graves = new THREE.Group();
  scene.add(graves);

  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    // mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.x = x;
    grave.position.y = Math.random() * 0.4;
    grave.position.z = z;

    // rotation
    grave.rotation.x = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;

    // Add to graves group
    graves.add(grave);
  }

  /**
   * Lights
   */
  // Ambient light
  const ambientLight = new THREE.AmbientLight("#86cdff", 0.25);
  scene.add(ambientLight);

  // Directional light
  const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
  directionalLight.position.set(3, 2, -8);
  scene.add(directionalLight);

  // Door light
  const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
  doorLight.position.set(0, 2.2, 2.7);
  house.add(doorLight);

  // Ghost
  const ghost1 = new THREE.PointLight("#8800ff", 3, 2);
  const ghost2 = new THREE.PointLight("#ff0088", 3, 2);
  const ghost3 = new THREE.PointLight("#ff0000", 3, 2);
  scene.add(ghost1, ghost2, ghost3);

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
  camera.position.x = 4;
  camera.position.y = 2;
  camera.position.z = 5;
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

  // Render
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Cast and receive shadows
  directionalLight.castShadow = true;
  ghost1.castShadow = true;
  ghost2.castShadow = true;
  ghost3.castShadow = true;

  walls.castShadow = true;
  walls.receiveShadow = true;
  roof.castShadow = true;
  floor.receiveShadow = true;

  for (const grave of graves.children) {
    grave.castShadow = true;
    grave.receiveShadow = true;
  }

  // Optimizations of shadows.
  // This can be done by reducing the amplitude of the shadow map.
  directionalLight.shadow.mapSize.width = 256;
  directionalLight.shadow.mapSize.height = 256;
  directionalLight.shadow.camera.top = 8;
  directionalLight.shadow.camera.right = 8;
  directionalLight.shadow.camera.bottom = -8;
  directionalLight.shadow.camera.left = -8;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 20;

  ghost1.shadow.mapSize.width = 256;
  ghost1.shadow.mapSize.height = 256;
  ghost1.shadow.camera.far = 10;

  ghost2.shadow.mapSize.width = 256;
  ghost2.shadow.mapSize.height = 256;
  ghost2.shadow.camera.far = 10;

  ghost3.shadow.mapSize.width = 256;
  ghost3.shadow.mapSize.height = 256;
  ghost3.shadow.camera.far = 10;

  // Sky
  // Use uniform to update the values in your shaders
  const sky = new Sky();
  sky.scale.setScalar(100);
  scene.add(sky);
  sky.material.uniforms["turbidity"].value = 10;
  sky.material.uniforms["rayleigh"].value = 3;
  sky.material.uniforms["mieCoefficient"].value = 0.1;
  sky.material.uniforms["mieDirectionalG"].value = 0.95;
  sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

  // Fog
  scene.fog = new THREE.FogExp2("#02343f", 0.1);


  // Helpers
  // const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  // scene.add(directionalLightCameraHelper);

  // const ghost1Helper = new THREE.PointLightHelper(ghost1, 0.2);
  // const ghost2Helper = new THREE.PointLightHelper(ghost2, 0.2);
  // const ghost3Helper = new THREE.PointLightHelper(ghost3, 0.2);
  // scene.add(ghost1Helper, ghost2Helper, ghost3Helper);

  // const graveHelper = new THREE.BoxHelper(graves, 0x00ff00);
  // scene.add(graveHelper);

  // const doorLightHelper = new THREE.PointLightHelper(doorLight, 0.2);
  // scene.add(doorLightHelper);


  /**
   * Animate
   */
  // Fixes the bug with getElapsedTime() method
  const timer = new Timer();

  const tick = () => {
    // Timer

    timer.update();
    const elapsedTime = timer.getElapsed();

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y =
      Math.sin(elapsedTime) *
      Math.sin(elapsedTime * 2.34) *
      Math.sin(elapsedTime * 3.45);

    const ghost2Angle = -elapsedTime * 0.38;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y =
      Math.sin(elapsedTime) *
      Math.sin(elapsedTime * 2.34) *
      Math.tanh(elapsedTime * 3.45);

    const ghost3Angle = elapsedTime * 0.23;
    ghost3.position.x = Math.cos(ghost3Angle) * 6;
    ghost3.position.z = Math.sin(ghost3Angle) * 6;
    ghost3.position.y =
      Math.sin(elapsedTime) *
      Math.sin(elapsedTime * 2.34) *
      Math.cos(elapsedTime * 3.45);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
