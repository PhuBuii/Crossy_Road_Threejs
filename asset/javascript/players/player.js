import * as THREE from "../../node_modules/three/build/three.module.js";
import { zoom } from "../modules/modules.js";

const chickenSize = 15;
const eggSize = 15;
export function Egg() {
  const egg = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(eggSize * zoom, eggSize * zoom, 20 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
  );
  body.position.z = 10 * zoom;
  body.castShadow = true;
  body.receiveShadow = true;
  egg.add(body);

  return egg;
}

export function Chicken() {
  const chicken = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(chickenSize * zoom, chickenSize * zoom, 20 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffff00, flatShading: true })
  );
  body.position.z = 10 * zoom;
  body.castShadow = true;
  body.receiveShadow = true;
  chicken.add(body);

  const mouth = new THREE.Mesh(
    new THREE.BoxGeometry(5 * zoom, 5 * zoom, 3 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x998100, flatShading: true })
  );
  mouth.position.x = 1 * zoom;
  mouth.position.z = 9 * zoom;
  mouth.position.y = 9 * zoom;
  chicken.add(mouth);

  const left_eye = new THREE.Mesh(
    new THREE.BoxGeometry(2 * zoom, 2 * zoom, 2 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );
  left_eye.position.x = -4 * zoom;
  left_eye.position.y = 7 * zoom;
  left_eye.position.z = 15 * zoom;
  chicken.add(left_eye);

  const right_eye = new THREE.Mesh(
    new THREE.BoxGeometry(2 * zoom, 2 * zoom, 2 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );
  right_eye.position.x = 3 * zoom;
  right_eye.position.y = 7 * zoom;
  right_eye.position.z = 15 * zoom;
  chicken.add(right_eye);

  const rowel = new THREE.Mesh(
    new THREE.BoxGeometry(2 * zoom, 4 * zoom, 2 * zoom),
    new THREE.MeshLambertMaterial({ color: 0xf0619a, flatShading: true })
  );
  rowel.position.z = 21 * zoom;
  rowel.castShadow = true;
  rowel.receiveShadow = false;
  chicken.add(rowel);

  const wings = new THREE.Mesh(
    new THREE.BoxGeometry(18 * zoom, 2 * zoom, 6 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffff00, flatShading: true })
  );
  wings.position.z = 8 * zoom;

  chicken.add(wings);

  return chicken;
}
export function Crash_Chicken() {
  const chicken = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(chickenSize * zoom, chickenSize * zoom, 5 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffff00, flatShading: true })
  );
  body.position.z = 10 * zoom;
  body.castShadow = true;
  body.receiveShadow = true;
  chicken.add(body);

  const mouth = new THREE.Mesh(
    new THREE.BoxGeometry(5 * zoom, 5 * zoom, 3 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x998100, flatShading: true })
  );
  mouth.position.x = 1 * zoom;
  mouth.position.z = 9 * zoom;
  mouth.position.y = 9 * zoom;
  chicken.add(mouth);

  const left_eye = new THREE.Mesh(
    new THREE.BoxGeometry(2 * zoom, 2 * zoom, 2 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );
  left_eye.position.x = -4 * zoom;
  left_eye.position.y = 7 * zoom;
  left_eye.position.z = 15 * zoom;
  chicken.add(left_eye);

  const right_eye = new THREE.Mesh(
    new THREE.BoxGeometry(2 * zoom, 2 * zoom, 2 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );
  right_eye.position.x = 3 * zoom;
  right_eye.position.y = 7 * zoom;
  right_eye.position.z = 15 * zoom;
  chicken.add(right_eye);

  const rowel = new THREE.Mesh(
    new THREE.BoxGeometry(2 * zoom, 4 * zoom, 2 * zoom),
    new THREE.MeshLambertMaterial({ color: 0xf0619a, flatShading: true })
  );
  rowel.position.z = 15 * zoom;
  rowel.castShadow = true;
  rowel.receiveShadow = false;
  chicken.add(rowel);

  const wings = new THREE.Mesh(
    new THREE.BoxGeometry(18 * zoom, 2 * zoom, 3 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xffff00, flatShading: true })
  );
  wings.position.z = 8 * zoom;

  chicken.add(wings);
  chicken.position.z = -2 * zoom;

  return chicken;
}
