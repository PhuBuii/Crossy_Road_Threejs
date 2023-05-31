import * as THREE from "../../node_modules/three/build/three.module.js";
import { Texture, vechicleColors, zoom, DrawTaxiSign, DrawTaxiPattern } from "../modules/modules.js";
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


export function Taxi() {
  const car = new THREE.Group();
  const color = 0xf2e446;

  const main = new THREE.Mesh(
    new THREE.BoxGeometry(60 * zoom, 30 * zoom, 15 * zoom),[
      new THREE.MeshPhongMaterial({ color, flatShading: true }),
      new THREE.MeshPhongMaterial({ color, flatShading: true }),
      new THREE.MeshPhongMaterial({ color, flatShading: true, map: new DrawTaxiPattern()}),
      new THREE.MeshPhongMaterial({ color, flatShading: true, map: new DrawTaxiPattern()}),
      new THREE.MeshPhongMaterial({ color, flatShading: true }),
      new THREE.MeshPhongMaterial({ color, flatShading: true }),
    ]
    
  );
  main.position.z = 12 * zoom;
  main.castShadow = true;
  main.receiveShadow = true;
  car.add(main);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(33 * zoom, 24 * zoom, 12 * zoom),
    [
      new THREE.MeshPhongMaterial({
        color: 0xe6db63,
        flatShading: true,
        map: carBackTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xe6db63,
        flatShading: true,
        map: carFrontTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xe6db63,
        flatShading: true,
        map: carRightSideTexture,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xe6db63,
        flatShading: true,
        map: carLeftSideTexture,
      }),
      new THREE.MeshPhongMaterial({ color: 0xe6db63, flatShading: true }), // top
      new THREE.MeshPhongMaterial({ color: 0xe6db63, flatShading: true }), // bottom
    ]
  );

  

  cabin.position.x = 6 * zoom;
  cabin.position.z = 25.5 * zoom;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  car.add(cabin);
  
  const sign = new THREE.Mesh( new THREE.BoxGeometry(3 * zoom, 10 * zoom, 5 * zoom),
    [
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
        map: new DrawTaxiSign(),
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
        map: new DrawTaxiSign(false),
      }),           
      new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), 
      new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), 
      new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), 
      new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), 
    ]
  );

  sign.position.x = 6 * zoom;
  sign.position.z = 35 * zoom
  sign.castShadow = true;
  sign.receiveShadow = true;

  // Access the mesh's geometry's UVs
  const uvs = sign.geometry.attributes.uv;

  // Loop through the UV coordinates and flip the V coordinate (vertical flipping)
  for (let i = 0; i < uvs.count; i++) {
    const u = uvs.getX(i);
    const v = uvs.getY(i);

    uvs.setXY(i, 1 - v, u);
  }

  // Update the UV attribute buffer
  uvs.needsUpdate = true;

  car.add(sign);

  const frontWheel = new Wheel();
  frontWheel.position.x = -18 * zoom;
  car.add(frontWheel);

  const backWheel = new Wheel();
  backWheel.position.x = 18 * zoom;
  car.add(backWheel);

  car.castShadow = true;
  car.receiveShadow = false;

  return car;
}
