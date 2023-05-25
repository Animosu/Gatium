import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';


// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);

// Agregar OrbitControls para la interacción
const controls = new OrbitControls(camera, renderer.domElement);

// Textura de imagen para la pirámide
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('gato.jpg');

const faceMaterials = [
  new THREE.MeshBasicMaterial({ map: texture }), // Cara 0
  new THREE.MeshBasicMaterial({ map: texture }), // Cara 1
  new THREE.MeshBasicMaterial({ map: texture }), // Cara 2
  new THREE.MeshBasicMaterial({ map: texture }), // Cara 3
  new THREE.MeshBasicMaterial({ map: texture }), // Cara 4
  new THREE.MeshBasicMaterial({ map: texture }), // Cara 5
];

const geometry = new THREE.BoxGeometry(20, 20, 20); // la tryhardee para que sea una piramide pero F

const piramide = new THREE.Mesh(geometry, faceMaterials);

scene.add(piramide);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// piramide wajaja
piramide.rotation.x = Math.PI / 2; 
piramide.position.z = -20; 

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('otrogato.png');
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('universo.jpg');
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  // Rotación continua en el eje Y
  piramide.rotation.z += 0.05;
  piramide.rotation.y += 0.05;


  renderer.render(scene, camera);
}

animate();
