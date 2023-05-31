import * as THREE from "../../node_modules/three/build/three.module.js";
import { Texture, 
  vechicleColors, 
  zoom, 
  DrawAmbulancePattern, 
  DrawAmbulanceBack, 
  DrawRedLine, 
  AmbulanceFront} from "../modules/modules.js";
import { Wheel } from "./wheel.js";


export function Ambulance() {
  const ambulance = new THREE.Group();
  const color = 0xffffff;

  const cargo = new THREE.Mesh(
    new THREE.BoxGeometry(60 * zoom, 30 * zoom, 37 * zoom),
    [
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, map: new DrawAmbulanceBack() }),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, map: new DrawAmbulancePattern() }),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, map: new DrawAmbulancePattern(false) }),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),      
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),      
    ]
    
  );
  cargo.position.x = 15 * zoom;
  cargo.position.z = 24 * zoom;
  cargo.castShadow = true;
  cargo.receiveShadow = true;

  // Access the mesh's geometry's UVs
  const uvs = cargo.geometry.attributes.uv;

  //Loop through the UV coordinates and flip the V coordinate (vertical flipping)
  for (let i = 0; i < 8; i++) {
    const u = uvs.getX(i);
    const v = uvs.getY(i);

    uvs.setXY(i, 1 - v, u);
  }

  ambulance.add(cargo);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(23 * zoom, 29.5 * zoom, 18 * zoom),
    [
      new THREE.MeshPhongMaterial({ color, flatShading: true }), 
      new THREE.MeshPhongMaterial({ color, flatShading: true, map: new AmbulanceFront()}), 
      new THREE.MeshPhongMaterial({ color, flatShading: true, map: new DrawRedLine() }), 
      new THREE.MeshPhongMaterial({ color, flatShading: true, map: new DrawRedLine(true) }), 
      new THREE.MeshPhongMaterial({ color, flatShading: true }), 
      new THREE.MeshPhongMaterial({ color, flatShading: true }), 
    ]
    
  );
  cabin.position.x = -24 * zoom;
  cabin.position.z = 15 * zoom;
  cabin.castShadow = true;
  cabin.receiveShadow = true;

  // Access the mesh's geometry's UVs
  const uvs_cabin = cabin.geometry.attributes.uv;

  //Loop through the UV coordinates and flip the V coordinate (vertical flipping)
  for (let i = 8; i < 17; i++) {
    const u = uvs_cabin.getX(i);
    const v = uvs_cabin.getY(i);

    uvs_cabin.setXY(i, 1 - v, u);
  }


  ambulance.add(cabin);
  
  const windshield = new THREE.Mesh(
    new THREE.BoxGeometry(30 * zoom, 29 * zoom, 20 * zoom),
    [
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, map: new Texture(100, 30, [{x: 18, y:4, w:75, h:25}])}),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, map: new Texture(100, 30, [{x: 18, y:4, w:75, h:21}])}),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, map: new Texture(100, 30, [{x: 13, y:3, w:50, h:25}])}),
    ]
    
  )
  windshield.rotation.y = -10;  
  windshield.position.x = -17.5 * zoom;
  windshield.position.z = 25 * zoom;
  windshield.castShadow = true;
  windshield.receiveShadow = true;
  ambulance.add(windshield)
  
  const ambulanceLight = new THREE.Mesh(
    new THREE.BoxGeometry(4 * zoom, 14 * zoom, 3 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xee0000, flatShading: true }),              
  );
  ambulanceLight.position.z = 45 * zoom; 
  ambulanceLight.position.x = -9 * zoom; 

  const lightPart = new THREE.Mesh(
    new THREE.BoxGeometry(4.5 * zoom, 5 * zoom, 3.5 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xaaaaaa, flatShading: true }),    
  )
  ambulanceLight.add(lightPart);
  ambulance.add(ambulanceLight);

  const frontWheel = new Wheel();
  frontWheel.position.x = -22 * zoom;
  ambulance.add(frontWheel);


  const backWheel = new Wheel();
  backWheel.position.x = 30 * zoom;
  ambulance.add(backWheel);

  return ambulance;
}
