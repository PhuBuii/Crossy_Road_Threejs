import * as THREE from "../node_modules/three/build/three.module.js";
import { Texture, vechicleColors, zoom } from "./modules.js";
import { Wheel } from "./wheel.js";

const busFrontTexture = new Texture(45, 70, [{ x: 10, y: 5, w: 30, h: 60 }]);
const busBackTexture = new Texture(75, 70, [{ x: 10, y: 5, w: 30, h: 60 }]);
const busRightSideTexture = new Texture(115, 40, [
  { x: 10, y: 20, w: 20, h: 20 },
  { x: 40, y: 20, w: 20, h: 20 },
  { x: 70, y: 20, w: 20, h: 20 },
]);
const busLeftSideTexture = new Texture(115, 40, [
  { x: 10, y: 0, w: 20, h: 20 },
  { x: 40, y: 0, w: 20, h: 20 },
  { x: 70, y: 0, w: 20, h: 20 },
]);

export function Bus() {
  const bus = new THREE.Group();
  const color =
    vechicleColors[Math.floor(Math.random() * vechicleColors.length)];
  const main = new THREE.Mesh(
    new THREE.BoxGeometry(80 * zoom, 30 * zoom, 30 * zoom),
    [
      new THREE.MeshPhongMaterial({
        color: color,
        flatShading: true,
        map: busBackTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: color,
        flatShading: true,
        map: busFrontTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: color,
        flatShading: true,
        map: busRightSideTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: color,
        flatShading: true,
        map: busLeftSideTexture,
      }),
      new THREE.MeshPhongMaterial({ color: color, flatShading: true }), // top
      new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // bottom
    ]
  );
  main.position.z = 12 * zoom;
  main.castShadow = true;
  main.receiveShadow = true;
  const frontWheel = new Wheel();
  frontWheel.position.x = -18 * zoom;
  frontWheel.position.z = -1 * zoom;
  bus.add(frontWheel);

  const backWheel = new Wheel();
  backWheel.position.x = 18 * zoom;
  backWheel.position.z = -1 * zoom;
  bus.add(backWheel);

  bus.castShadow = true;
  bus.receiveShadow = false;

  bus.add(main);
  return bus;
}
