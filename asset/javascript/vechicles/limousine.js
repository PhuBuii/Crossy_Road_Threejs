import * as THREE from "../../node_modules/three/build/three.module.js";
import { Texture, vechicleColors, zoom } from "../modules/modules.js";
import { Wheel } from "./wheel.js";

const carFrontTexture = new Texture(40, 80, [{ x: 0, y: 10, w: 30, h: 60 }]);
const carBackTexture = new Texture(40, 80, [{ x: 10, y: 10, w: 30, h: 60 }]);
const carRightSideTexture = new Texture(110, 40, [
  { x: 10, y: 0, w: 50, h: 30 },
  { x: 70, y: 0, w: 30, h: 30 },
]);
const carLeftSideTexture = new Texture(110, 40, [
  { x: 10, y: 10, w: 50, h: 30 },
  { x: 70, y: 10, w: 30, h: 30 },
]);

export function Limousine() {
  const car = new THREE.Group();
  const color =
    vechicleColors[Math.floor(Math.random() * vechicleColors.length)];

  const main = new THREE.Mesh(
    new THREE.BoxGeometry(70 * zoom, 10 * zoom, 15 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x549c0c, flatShading: true })
  );
  main.position.z = 12 * zoom;
  main.castShadow = true;
  main.receiveShadow = true;
  car.add(main);

  const mainleft = new THREE.Mesh(
    new THREE.BoxGeometry(70 * zoom, 10 * zoom, 15 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x94bf69, flatShading: true })
  );
  mainleft.position.y = -10 * zoom;
  mainleft.position.z = 12 * zoom;
  mainleft.castShadow = true;
  mainleft.receiveShadow = true;
  car.add(mainleft);

  const mainright = new THREE.Mesh(
    new THREE.BoxGeometry(70 * zoom, 10 * zoom, 15 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x94bf69, flatShading: true })
  );
  mainright.position.y = 10 * zoom;
  mainright.position.z = 12 * zoom;
  mainright.castShadow = true;
  mainright.receiveShadow = true;
  car.add(mainright);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(40 * zoom, 24 * zoom, 12 * zoom),
    [
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
        map: carBackTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
        map: carFrontTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
        map: carRightSideTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
        map: carLeftSideTexture,
      }),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // top
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // bottom
    ]
  );
  cabin.position.x = 12 * zoom;
  cabin.position.z = 25.5 * zoom;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  car.add(cabin);

  const frontWheel = new Wheel();
  frontWheel.position.x = -20 * zoom;
  car.add(frontWheel);

  const backWheel = new Wheel();
  backWheel.position.x = 20 * zoom;
  car.add(backWheel);
  
  const sign = new THREE.Mesh(
    
  )

  car.castShadow = true;
  car.receiveShadow = false;

  return car;
}
