import * as THREE from "../../node_modules/three/build/three.module.js";
import { Texture, vechicleColors, zoom } from "../modules/modules.js";
import { Wheel } from "./wheel.js";

export function Car1() {
  const car = new THREE.Group();
  const color =
    vechicleColors[Math.floor(Math.random() * vechicleColors.length)];

  const main1 = new THREE.Mesh(
    new THREE.BoxGeometry(30 * zoom, 16 * zoom, 15 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xf291cf, flatShading: true }),
    );

  const main2 = new THREE.Mesh(
    new THREE.BoxGeometry(60 * zoom, 7 * zoom, 15 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffb5e4, flatShading: true }), // top
  );

  const main3 = new THREE.Mesh(
    new THREE.BoxGeometry(60 * zoom, 7 * zoom, 15 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffb5e4, flatShading: true }), // top
  );

  const main4 = new THREE.Mesh(
    new THREE.BoxGeometry(10 * zoom, 20 * zoom, 15 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffb5e4, flatShading: true }), // top
  );

  const main5 = new THREE.Mesh(
    new THREE.BoxGeometry(45 * zoom, 20 * zoom, 1 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // top
  );
  main1.position.x = -15 * zoom;
  main1.position.z = 12 * zoom;
  main1.castShadow = true;
  main1.receiveShadow = true;
  car.add(main1);

  main2.position.y = 11.5 * zoom;
  main2.position.z = 12 * zoom;
  main2.castShadow = true;
  main2.receiveShadow = true;
  car.add(main2);

  main3.position.y = -11.5 * zoom;
  main3.position.z = 12 * zoom;
  main3.castShadow = true;
  main3.receiveShadow = true;
  car.add(main3);

  main4.position.x = 25 * zoom;
  main4.position.z = 12 * zoom;
  main4.castShadow = true;
  main4.receiveShadow = true;
  car.add(main4);

  main5.position.z = 12 * zoom;
  main5.castShadow = true;
  main5.receiveShadow = true;
  car.add(main5);

  const lightright = new THREE.Mesh(
    new THREE.BoxGeometry(0.5 * zoom, 7 * zoom, 7 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffffffff, flatShading: true }),
  );
  lightright.position.x = -30 * zoom;
  lightright.position.y = 11 * zoom;
  lightright.position.z = 15 * zoom;
  lightright.castShadow = true;
  lightright.receiveShadow = true;
  car.add(lightright);

  const lightleft = new THREE.Mesh(
    new THREE.BoxGeometry(0.5 * zoom, 7 * zoom, 7 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffffffff, flatShading: true }),
  );
  lightleft.position.x = -30 * zoom;
  lightleft.position.y = -11 * zoom;
  lightleft.position.z = 15 * zoom;
  lightleft.castShadow = true;
  lightleft.receiveShadow = true;
  car.add(lightleft);

  const custom = new THREE.Mesh(
    new THREE.BoxGeometry(0.5 * zoom, 16 * zoom, 7 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }),
  );
  custom.position.x = -30 * zoom;
  custom.position.z = 10 * zoom;
  custom.castShadow = true;
  custom.receiveShadow = true;
  car.add(custom);

  const customback = new THREE.Mesh(
    new THREE.BoxGeometry(0.5 * zoom, 16 * zoom, 7 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }),
  );
  customback.position.x = 30 * zoom;
  customback.position.z = 10 * zoom;
  customback.castShadow = true;
  customback.receiveShadow = true;
  car.add(customback);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(6 * zoom, 24 * zoom, 6 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x6baefa, flatShading: true }), // top
  );
  cabin.position.x = 0 * zoom;
  cabin.position.z = 25.5 * zoom;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  car.add(cabin);

  const frontWheel = new Wheel();
  frontWheel.position.x = -18 * zoom;
  car.add(frontWheel);

  const backWheel = new Wheel();
  backWheel.position.x = 18 * zoom;
  car.add(backWheel);
  
  const sign = new THREE.Mesh(
    
  )

  car.castShadow = true;
  car.receiveShadow = false;

  return car;
}
