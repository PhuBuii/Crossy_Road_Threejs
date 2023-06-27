import * as THREE from "../../node_modules/three/build/three.module.js";
import { Texture, vechicleColors, zoom } from "../modules/modules.js";
import { Wheel } from "./wheel.js";

const uitFrontTexture = new Texture(45, 70, [{ x: 10, y: 5, w: 30, h: 60 }]);
const uitBackTexture = new Texture(75, 70, [{ x: 10, y: 5, w: 30, h: 60 }]);
const uitRightSideTexture = new Texture(115, 40, [
  { x: 10, y: 20, w: 20, h: 20 },
  { x: 40, y: 20, w: 20, h: 20 },
  { x: 70, y: 20, w: 20, h: 20 },
]);
const uitLeftSideTexture = new Texture(115, 40, [
  { x: 10, y: 0, w: 20, h: 20 },
  { x: 40, y: 0, w: 20, h: 20 },
  { x: 70, y: 0, w: 20, h: 20 },
]);

export function UIT() {
  const uit = new THREE.Group();
  const color =
    vechicleColors[Math.floor(Math.random() * vechicleColors.length)];
  const textureLoader = new THREE.TextureLoader();
  const texture_left = textureLoader.load("../../../asset/logoUIT.png");
  const texture_right = textureLoader.load( "../../../asset/logoUIT2.png");
  const main = new THREE.Mesh(
    new THREE.BoxGeometry(80 * zoom, 30 * zoom, 30 * zoom),
    [
        //new THREE.MeshPhongMaterial({ color: 0xff0000, flatShading: true }), // back
        new THREE.MeshPhongMaterial({color: color, flatShading: true, map: uitBackTexture,}),
        new THREE.MeshPhongMaterial({ color: color, flatShading: true, map: uitFrontTexture, }), // front
        new THREE.MeshPhongMaterial({ color: color, map: texture_right, flatShading: true }), //right
        new THREE.MeshPhongMaterial({ color: color, map: texture_left, flatShading: true }), //left
        new THREE.MeshPhongMaterial({ color: color, flatShading: true}), // top
        new THREE.MeshPhongMaterial({ color: color, flatShading: true }), // bottom
      ]
  );
  main.position.z = 20 * zoom;
  main.castShadow = true;
  main.receiveShadow = true;
  const frontWheel = new Wheel();
  frontWheel.position.x = -20 * zoom;
  uit.add(frontWheel);

  const backWheel = new Wheel();
  backWheel.position.x = 20 * zoom;
  uit.add(backWheel);

  uit.castShadow = true;
  uit.receiveShadow = false;
  //top uit
  const topuit = new THREE.Mesh(
    new THREE.BoxGeometry(60 * zoom, 20 * zoom, 3 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true })
  );
  topuit.position.z = 30 * zoom;

  uit.add(main);
  uit.add(topuit);
  return uit;
}
