import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";

// Algorithm that decide on the color of the pixel is called a shader

export const materials = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
  const gui = new GUI();

  // Scene
  const scene = new THREE.Scene();

  // Textures
  const textureLoader = new THREE.TextureLoader();

  const doorColorTexture = textureLoader.load("/assets/door/color.jpg");
  //   const doorAlphaTexture = textureLoader.load("/assets/door/alpha.jpg");
  //   const doorAmbientOcclusionTexture = textureLoader.load(
  // "/assets/door/ambientOcclusion.jpg"
  //   );
  //   const doorHeightTexture = textureLoader.load("/assets/door/height.jpg");
  //   const doorNormalTexture = textureLoader.load("/assets/door/normal.jpg");
  //   const doorMetalnessTexture = textureLoader.load("/assets/door/metalness.jpg");
  //   const doorRoughnessTexture = textureLoader.load("/assets/door/roughness.jpg");
  //   const matcapTexture = textureLoader.load("/assets/texture/matcap.jpg");
  //   const matcapTexture1 = textureLoader.load("/assets/texture/matcap2.png");
  //   const matcapTexture2 = textureLoader.load("/assets/texture/matcap3.avif");
  //   const matcapTexture3 = textureLoader.load("/assets/texture/matcap4.png");

  //   const gradientTexture = textureLoader.load( "/assets/texture/checkerboard-1024x1024.png");

  const rgbLoader = new RGBELoader();
  rgbLoader.load("/assets/environment/quattro_canti_2k.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });

  doorColorTexture.colorSpace = THREE.SRGBColorSpace;
  // matcapTexture.colorSpace = THREE.SRGBColorSpace;

  // Objects
  //   const material = new THREE.MeshBasicMaterial({
  //     map: doorColorTexture,
  //     side: THREE.DoubleSide,
  //   });

  //   const material = new THREE.MeshBasicMaterial();

  //   material.side = THREE.DoubleSide;

  // material.map = doorColorTexture;
  // material.color = new THREE.Color(0xff0000);
  // material.wireframe = true;
  // material.transparent = true;
  // material.opacity = 0.5;
  // material.alphaMap = doorAlphaTexture;

  // MeshNormalMaterial
  // const material = new THREE.MeshNormalMaterial();
  // material.flatShading = true;

  // MeshMatcapMaterial
  // const material = new THREE.MeshMatcapMaterial();
  // material.matcap = matcapTexture;

  // MeshDepthMaterial
  // Good for depth of field when you are working with shaders
  // const material = new THREE.MeshDepthMaterial();

  // MeshLambertMaterial
  // This is the first material that has lighting. This is the most performant material that uses lighting
  // const material = new THREE.MeshLambertMaterial();

  // MeshPhongMaterial
  // The disadvantage of this is that it is not realistic
  // const material = new THREE.MeshPhongMaterial();
  // material.shininess = 100;
  // material.specular = new THREE.Color(0x1188ff);

  // MeshToonMaterial
  // const material = new THREE.MeshToonMaterial();
  // gradientTexture.minFilter = THREE.NearestFilter;
  // gradientTexture.magFilter = THREE.NearestFilter;
  // gradientTexture.generateMipmaps = false;
  // material.gradientMap = gradientTexture;

  // MeshStandardMaterial
  // This is the most realistic material
  //   const material = new THREE.MeshStandardMaterial();
  //   material.side = THREE.DoubleSide;
  //   material.metalness = 1;
  //   material.roughness = 1;
  //   material.map = doorColorTexture;
  //   material.aoMap = doorAmbientOcclusionTexture;
  //   material.aoMapIntensity = 1;
  // This means where it is white, it will be raised and where it is black, it will be lowered
  //   material.displacementMap = doorHeightTexture;
  //   material.displacementScale = 0.1; // This is the height of the displacement
  //   material.metalnessMap = doorMetalnessTexture;
  //   material.roughnessMap = doorRoughnessTexture;
  //   material.normalMap = doorNormalTexture;
  //   material.normalScale.set(0.5, 0.5);
  //   material.transparent = true;
  //   material.alphaMap = doorAlphaTexture;

  // MeshPhysicalMaterial
  // This extends the MeshStandardMaterial class but has acces to extra features e.g. cleacoat, sheen, iridescence, transmission.
  // This is the most realistic material and worst for performance
  const material = new THREE.MeshPhysicalMaterial();
  material.metalness = 0;
  material.roughness = 0;
  // material.map = doorColorTexture
  // material.aoMap = doorAmbientOcclusionTexture
  // material.aoMapIntensity = 1
  // material.displacementMap = doorHeightTexture
  // material.displacementScale = 0.1
  // material.metalnessMap = doorMetalnessTexture
  // material.roughnessMap = doorRoughnessTexture
  // material.normalMap = doorNormalTexture
  // material.normalScale.set(0.5, 0.5)
  // material.transparent = true
  // material.alphaMap = doorAlphaTexture

  // Adding Debug UI
  gui.add(material, "metalness").min(0).max(1).step(0.0001);
  gui.add(material, "roughness").min(0).max(1).step(0.0001);

  // Clearcaot simulates a thin layer of clearcoat on top of the material, its bad for performace, use wisely.
  //  material.clearcoat = 1;
  //  material.clearcoatRoughness = 0;
  //  gui.add(material, "clearcoat").min(0).max(1).step(0.0001);
  //  gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);

  // Sheen simulates the soft velvet-like reflection of the material.
  //   material.sheen = 1;
  //   material.sheenRoughness = 0.25;
  //   material.sheenColor.set(1, 1, 1);
  //   gui.add(material, "sheen").min(0).max(1).step(0.0001);
  //   gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
  //   gui.addColor(material, "sheenColor");

  // Iridescence simulates the rainbow-like reflection of the material.
  // material.iridescence = 1;
  // material.iridescenceIOR = 1;
  // material.iridescenceThicknessRange = [100, 800];

  // gui.add(material, "iridescence").min(0).max(1).step(0.0001);
  // gui.add(material, "iridescenceIOR").min(0).max(2.333).step(0.0001);
  // gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
  // gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);

  // Transmission simulates the light passing through the material.
  // IOR stands for index of refraction, and depends on the material, for example, glass has an IOR of 1.5, diamond has an IOR of 2.4.
  material.transmission = 1;
  material.ior = 1.5;
  material.thickness = 0.5; // This is a fixed value.

  gui.add(material, "transmission").min(0).max(1).step(0.0001);
  gui.add(material, "ior").min(0).max(10).step(0.0001);
  gui.add(material, "thickness").min(0).max(10).step(0.0001);

  // The point material is used for particles, their sizes, color, what is drawn on them, etc.
  // The raw shader material to create custom materials using GLSL code.
  // Don't forget to use debug UI to find the best values for your materials.

  // Sphere
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
  );
  sphere.position.set(-1.5, 0, 0);

  // Plane
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
  );

  // Torus
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
  );
  torus.position.set(1.5, 0, 0);

  scene.add(sphere, plane, torus);

  // Lights
  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(ambientLight);

  // const pointLight = new THREE.PointLight(0xffffff, 30);
  // pointLight.position.set(2, 3, 4);
  // scene.add(pointLight);

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

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update camera
    sphere.rotation.x = elapsedTime * 0.1;
    plane.rotation.x = elapsedTime * 0.1;
    torus.rotation.x = elapsedTime * 0.1;

    sphere.rotation.y = elapsedTime * 0.15;
    plane.rotation.y = elapsedTime * 0.15;
    torus.rotation.y = elapsedTime * 0.15;
    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
