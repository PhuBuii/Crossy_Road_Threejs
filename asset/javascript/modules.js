import * as THREE from "../node_modules/three/build/three.module.js";

//Color Vehicle
export const vehicleColors = [
    0xa52523, 0xbdb638, 0x78b14b, 0x00ffff, 0xffcc99, 0xcc99ff, 0x001100,
    0x000077, 0xff0000, 0x660033, 0x660066, 0x990066,
];

//Random function
export function pickRandom(array) {    
    return array[Math.floor(Math.random() * array.length)];
}

export function Wheel(y, z) {
    const wheel = new THREE.Group();
    const tire = new THREE.Mesh(
        new THREE.TorusGeometry(4.5, 3.5),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    tire.position.z = z;
    tire.position.y = y;
    tire.rotateX(Math.PI / 2);    
    wheel.add(tire);

    const center = new THREE.Mesh(
        new THREE.SphereGeometry(3.5),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    center.position.z = z;
    center.position.y = y;    
    wheel.add(center);
    return wheel;
}
//Wheel
export function Create_Wheel(x, y, z) {
    const wheel = new THREE.Group();

    const left_wheel = Wheel(y + 2, z);
    wheel.add(left_wheel);

    const right_wheel = Wheel(-y - 2, z);
    wheel.add(right_wheel);

    wheel.position.x = x;

    return wheel;
}
