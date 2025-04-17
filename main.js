import * as THREE from 'three';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// 🎨 Color base desde el valor de Kd del MTL (beige claro)
let kdColor = new THREE.Color(1.0, 0.92314, 0.780392);

// Arreglo para guardar todos los materiales del polo
let shirtMaterialRefs = [];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// dat.GUI con el color base
const gui = new dat.GUI();
const params = {
  color: `#${kdColor.getHexString()}`
};

const mtlLoader = new MTLLoader();
mtlLoader.setPath('models/');
mtlLoader.load('polo_shirt_men.mtl', (materials) => {
  materials.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('models/');
  objLoader.load('polo_shirt_men.obj', (object) => {
    object.traverse((child) => {
      if (
        child.isMesh &&
        child.material &&
        child.material.name
      ) {
        const matName = child.material.name.toLowerCase();

        // Identificamos partes del polo
        if (
          matName.includes('fabric') ||
          matName.includes('collar') ||
          matName.includes('pt_fabric')
        ) {
          const newMat = new THREE.MeshStandardMaterial({
            color: kdColor,
            roughness: 0.6,
            metalness: 0.1
          });
          child.material = newMat;
          shirtMaterialRefs.push(newMat);
        }
      }
    });

    // Escalar y centrar modelo
    object.scale.set(0.01, 0.01, 0.01);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);

    scene.add(object);

    // Enlazar el cambio de color a todos los materiales del polo
    gui.addColor(params, 'color').onChange((value) => {
      kdColor.set(value);
      shirtMaterialRefs.forEach(mat => mat.color.set(kdColor));
    });
  });
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
