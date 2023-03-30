import * as THREE from "../node_modules/three/build/three.module.js";
import {pickRandom, vehicleColors, Create_Wheel, Wheel} from "./modules.js"

//Bus window
function eachwindow(x, z) {
    const eachwindow = new THREE.Mesh(
        new THREE.BoxBufferGeometry(11, 31, 13),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    eachwindow.position.z = z;
    eachwindow.position.x = x;
    return eachwindow;
}
function BusWindow(x, z) {
    const bus_window = new THREE.Group();

    const window_1 = eachwindow(x, z);
    bus_window.add(window_1);
    const window_2 = eachwindow(x - 15, z);
    bus_window.add(window_2);
    const window_3 = eachwindow(x - 30, z);
    bus_window.add(window_3);
    return bus_window;
}
//Bus door

function BusDoor(x, z) {
    const bus_door = new THREE.Mesh(
        new THREE.BoxBufferGeometry(11, 31, 28),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    bus_door.position.x = x + 15;
    bus_door.position.z = z;
    return bus_door;
}
//Bus View
function BusFront(x, z) {
    const bus_view = new THREE.Mesh(
        new THREE.BoxBufferGeometry(50, 25, 24),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    bus_view.position.x = x - 0.5;
    bus_view.position.z = z + 4;
    return bus_view;
}
function BusBehind(x, z) {
    const bus_view = new THREE.Mesh(
        new THREE.BoxBufferGeometry(50, 25, 10),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    bus_view.position.x = x - 22;
    bus_view.position.z = z + 9;
    return bus_view;
}
//Bus Top
function BusTop(x, z) {
    const bus_top = new THREE.Group();
    const bus_top_part_1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(20, 20, 10),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    bus_top_part_1.position.x = x + 5;
    bus_top_part_1.position.z = z + 15;
    const bus_top_part_2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15, 15, 10),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    bus_top_part_2.position.x = x + 5;
    bus_top_part_2.position.z = z + 16;

    bus_top.add(bus_top_part_1);
    bus_top.add(bus_top_part_2);
    return bus_top;
}
//Bus
export function Bus() {
    const bus = new THREE.Group();
    console.log(vehicleColors);
    const bus_color = pickRandom(vehicleColors);
    const backWheel = Create_Wheel(-18, 11, 4);
    bus.add(backWheel);

    const frontWheel = Create_Wheel(18, 11, 4);
    bus.add(frontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(70, 30, 35),
        new THREE.MeshLambertMaterial({ color: bus_color })
    );
    main.position.z = 18;
    main.position.x = 9;
    bus.add(main);

    const bus_window = BusWindow(18, 25);
    bus.add(bus_window);

    const bus_door = BusDoor(20, 17);
    bus.add(bus_door);

    const bus_view = BusFront(20, 17);
    bus.add(bus_view);
    const bus_behind = BusBehind(20, 17);
    bus.add(bus_behind);
    const bus_top = BusTop(20, 17);
    bus.add(bus_top);

    return bus;
}



