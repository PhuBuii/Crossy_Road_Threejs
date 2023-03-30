import * as THREE from "../node_modules/three/build/three.module.js";
import {pickRandom, vehicleColors, Create_Wheel, Wheel} from "./modules.js"


//Create Car window
function getCarFrontTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = color;
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);

    return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = color;
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
}

//Car
export function Car() {
    const car = new THREE.Group();

    const car_color = pickRandom(vehicleColors);

    const backWheel = Create_Wheel(-18, 11, 6);
    car.add(backWheel);

    const frontWheel = Create_Wheel(18, 11, 6);
    car.add(frontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60, 30, 15),
        new THREE.MeshLambertMaterial({ color: car_color })
    );
    main.position.z = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture("#ffffff");
    carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    carFrontTexture.rotation = Math.PI / 2;

    const carBackTexture = getCarFrontTexture("#ffffff");
    carBackTexture.center = new THREE.Vector2(0.5, 0.5);
    carBackTexture.rotation = -Math.PI / 2;

    const carRightSideTexture = getCarSideTexture("#ffffff");
    carRightSideTexture.flipY = false;

    const carLeftSideTexture = getCarSideTexture("#ffffff");
    carLeftSideTexture.flipY = true;
    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 24, 12), [
        new THREE.MeshLambertMaterial({ map: carFrontTexture }),
        new THREE.MeshLambertMaterial({ map: carBackTexture }),
        new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
        new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
        new THREE.MeshLambertMaterial({ color: 0xffffff }),
        new THREE.MeshLambertMaterial({ color: 0xffffff }),
    ]);
    cabin.position.z = 25.5;
    cabin.position.x = -6;
    car.add(cabin);

    return car;
}