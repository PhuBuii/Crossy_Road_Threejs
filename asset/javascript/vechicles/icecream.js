import * as THREE from "../../node_modules/three/build/three.module.js";
import { Texture, vechicleColors, zoom } from "../modules/modules.js";

const truckFrontTexture = new Texture(30, 30, [{ x: 15, y: 0, w: 10, h: 30 }]);
const truckRightSideTexture = new Texture(25, 30, [
  { x: 0, y: 15, w: 10, h: 10 },
]);
const truckLeftSideTexture = new Texture(25, 30, [
  { x: 0, y: 5, w: 10, h: 10 },
]);

export function IceCream() {
  const truck = new THREE.Group();
  
  /*const base = new THREE.Mesh(
    new THREE.BoxGeometry(100 * zoom, 25 * zoom, 5 * zoom),
    new THREE.MeshLambertMaterial({ color: 0xb4c6fc, flatShading: true })
  );
  base.position.z = 10 * zoom;
  truck.add(base);*/

  //Body
  var geoLowerBody = new THREE.BoxGeometry(100 * zoom, 35 * zoom, 15 * zoom);
  var matLowerBody = new THREE.MeshLambertMaterial({color: 0x99daff, flatShading: true});
  const lowerbody = new THREE.Mesh(geoLowerBody, matLowerBody);
  lowerbody.position.z = 10.25 * zoom;
  lowerbody.castShadow = true;
  lowerbody.receiveShadow = true;

  var geoUpperBody = new THREE.BoxGeometry(70 * zoom, 35 * zoom, 25 * zoom);
  var matUpperBody = new THREE.MeshLambertMaterial({color: 0xe3646e, flatShading: true});
  const upperbody = new THREE.Mesh(geoUpperBody, matUpperBody);
  upperbody.position.x = 15 * zoom;
  upperbody.position.z = 30.25 * zoom;
  upperbody.castShadow = true;
  upperbody.receiveShadow = true;

  truck.add(lowerbody);
  truck.add(upperbody);

  //Head
  var geoHead = new THREE.BoxGeometry(35 * zoom, 34.98 * zoom, 19.98 * zoom);
  var matHead = new THREE.MeshLambertMaterial({color: 0xfaf4b4, flatShading: true});
  const head = new THREE.Mesh(geoHead, matHead);
  head.position.x = -25 * zoom;
  head.position.z = 21 * zoom;
  head.rotation.y = -Math.PI/4;
  head.castShadow = true;
  head.receiveShadow = true;

  truck.add(head);

  //Top Iteam
  var geoLayer1 = new THREE.BoxGeometry(17.75 * zoom, 17.75 * zoom, 5 * zoom);
  var matLayer1 = new THREE.MeshLambertMaterial({color: 0xff6663, flatShading: true});
  const layer1 = new THREE.Mesh(geoLayer1, matLayer1);
  layer1.position.x = 5 * zoom;
  layer1.position.z = 45.25 * zoom;
  layer1.castShadow = true;
  layer1. receiveShadow = true;

  var geoLayer2 = new THREE.BoxGeometry(13 * zoom, 13 * zoom, 5 * zoom);
  var matLayer2 = new THREE.MeshLambertMaterial({color: 0xf7eb5e, flatShading: true});
  const layer2 = new THREE.Mesh(geoLayer2, matLayer2);
  layer2.position.x = 5 * zoom;
  layer2.position.z = 50.25 * zoom;
  layer2.castShadow = true;
  layer2. receiveShadow = true;

  var geoLayer3 = new THREE.BoxGeometry(5 * zoom, 5 * zoom, 5 * zoom);
  var matLayer3 = new THREE.MeshLambertMaterial({color: 0xe82a2a, flatShading: true});
  const layer3 = new THREE.Mesh(geoLayer3, matLayer3);
  layer3.position.x = 5 * zoom;
  layer3.position.z = 55.25 * zoom;
  layer3.castShadow = true;
  layer3. receiveShadow = true;

  truck.add(layer1);
  truck.add(layer2);
  truck.add(layer3);

  //Wheel
  var geoWheel = new THREE.BoxGeometry(12 * zoom, 40 * zoom, 12 * zoom);
  var matWheel = new THREE.MeshLambertMaterial({color: 0x011c1b, flatShading: true});

  const wheel1 = new THREE.Mesh(geoWheel, matWheel);
  wheel1.position.x = 37.75 * zoom;
  wheel1.position.z = 6 * zoom;
  wheel1.castShadow = true;
  wheel1.receiveShadow = true;

  const wheel2 = new THREE.Mesh(geoWheel, matWheel);
  wheel2.position.x = -30 * zoom;
  wheel2.position.z = 6 * zoom;
  wheel2.castShadow = true;
  wheel2.receiveShadow = true;

  truck.add(wheel1);
  truck.add(wheel2);

  /*const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(25 * zoom, 30 * zoom, 30 * zoom),
    [
      new THREE.MeshPhongMaterial({ color, flatShading: true }), // back
      new THREE.MeshPhongMaterial({
        color,
        flatShading: true,
        map: truckFrontTexture,
      }),
      new THREE.MeshPhongMaterial({
        color,
        flatShading: true,
        map: truckRightSideTexture,
      }),
      new THREE.MeshPhongMaterial({
        color,
        flatShading: true,
        map: truckLeftSideTexture,
      }),
      new THREE.MeshPhongMaterial({ color, flatShading: true }), // top
      new THREE.MeshPhongMaterial({ color, flatShading: true }), // bottom
    ]
  );
  cabin.position.x = -40 * zoom;
  cabin.position.z = 20 * zoom;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  truck.add(cabin);*/

  /*const frontWheel = new Wheel();
  frontWheel.position.x = -38 * zoom;
  truck.add(frontWheel);

  const backWheel = new Wheel();
  backWheel.position.x = 30 * zoom;
  truck.add(backWheel);*/

  return truck;
}
