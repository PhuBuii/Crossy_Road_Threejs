import * as THREE from "../node_modules/three/build/three.module.js";
import {pickRandom, vehicleColors, Create_Wheel, Wheel} from "./modules.js"


//Create Car window
function getCarFrontTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    color = "#" + color.toString(16);    
    context.fillStyle = color;
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#FFFFFF";
    context.fillRect(4,4,56,14);

    context.fillStyle = "#666666";
    context.fillRect(7, 7, 50, 8);

    return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    color = "#" + color.toString(16);    
    
    context.fillStyle = color;
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#FFFFFF";
    context.fillRect(32, 5, 72, 16);
    
    context.fillStyle = "#666666";
    context.fillRect(38, 8, 56, 10);

    return new THREE.CanvasTexture(canvas);
}

//Truck
export function Truck() {

    const car_color = pickRandom(vehicleColors);

    const carFrontTexture = getCarFrontTexture(car_color);
    carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    carFrontTexture.rotation = Math.PI / 2;    

    const carRightSideTexture = getCarSideTexture(car_color);
    carRightSideTexture.flipY = false;
    const carLeftSideTexture = getCarSideTexture(car_color);
    carLeftSideTexture.flipY = true;

    const car = new THREE.Group();

    const backWheel = Create_Wheel(-18, 11, 6);
    car.add(backWheel);

    const frontWheel = Create_Wheel(18, 11, 6);
    car.add(frontWheel);

    const plane = new THREE.Mesh(
        new THREE.BoxBufferGeometry(75, 30, 8),
        new THREE.MeshLambertMaterial({ color: "#808080" })
    );
    plane.position.z = 10;
    car.add(plane);
       

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(22, 24, 20),              
        // new THREE.MeshLambertMaterial({ color: car_color })    
        [
            new THREE.MeshLambertMaterial({ map: carFrontTexture }),
            new THREE.MeshLambertMaterial({ color: car_color }),
            new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
            new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
            new THREE.MeshLambertMaterial({ color: car_color }),
            new THREE.MeshLambertMaterial({ color: car_color }),
        ]   
    );    
    cabin.position.z = 20;
    cabin.position.x = 25;    
    car.add(cabin);

    const box = new THREE.Mesh(
        new THREE.BoxBufferGeometry(50, 28, 35),
        new THREE.MeshLambertMaterial({ color: "#FFFFFF" })        
    );
    box.position.z = 25;
    box.position.x = -10;
    car.add(box);
   

    return car;
}