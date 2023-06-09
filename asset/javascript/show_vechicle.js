import * as THREE from "../node_modules/three/build/three.module.js";
// import { Coin, Grass, Road, Tree } from "./modules/objects.js";
import { Car } from "./vechicles/car.js";
import { Car1 } from "./vechicles/car1.js";
import { UIT } from "./vechicles/UIT.js";
import { Limousine } from "./vechicles/limousine.js";
import { Truck } from "./vechicles/truck.js";
import { Taxi } from "./vechicles/taxi.js";
import { Bus } from "./vechicles/bus.js";
import { Ambulance } from "./vechicles/ambulance.js";
import { IceCream } from "./vechicles/icecream.js";
import { Egg, Chicken, Crash_Chicken } from "./players/player.js";
import {Coin} from "./modules/objects.js"

const scene = new THREE.Scene();

const vechicle = new IceCream();
console.log(vechicle)
scene.add(vechicle);

const distance = 100;
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  0.1,
  10000
);

camera.rotation.x = (50 * Math.PI) / 180;
camera.rotation.y = (20 * Math.PI) / 180;
camera.rotation.z = (10 * Math.PI) / 180;

const initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
const initialCameraPositionX =
  Math.tan(camera.rotation.y) *
  Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);
camera.position.y = initialCameraPositionY;
camera.position.x = initialCameraPositionX;
camera.position.z = distance;

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
scene.add(dirLight);

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 500;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

const backLight = new THREE.DirectionalLight(0x000000, 0.4);
backLight.position.set(200, 200, 50);
backLight.castShadow = true;
scene.add(backLight);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

vechicle.rotation.z = -10;
function animate() {
  requestAnimationFrame(animate);
  vechicle.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate();
