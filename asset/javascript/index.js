import * as THREE from "../node_modules/three/build/three.module.js";
import {Bus} from "./Bus.js"
import {Car} from "./Car.js"
import {Truck} from "./Truck.js"


//Scene
const scene = new THREE.Scene();


// Add a car
const playerCar = Truck();
scene.add(playerCar);

//Setup lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(100, -300, 400);
scene.add(directionalLight);

//Camera
const width = 150;
const heigth = width * (window.innerHeight / window.innerWidth);
const camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  heigth / 2,
  heigth / -2,
  0,
  1000
);
camera.position.set(200, -200, 300);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

//Render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//Add to HTML
document.body.appendChild(renderer.domElement);
//Animated;
animate();

function animate() {
  requestAnimationFrame(animate);

  playerCar.rotation.z -= 0.01;

  renderer.render(scene, camera);
}
