//Random function
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  function Wheel(y, z) {
    const wheel = new THREE.Group();
    const tire = new THREE.Mesh(
      new THREE.BoxBufferGeometry(12, 10, 12),
      new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    tire.position.z = z;
    tire.position.y = y;
    wheel.add(tire);
  
    const center = new THREE.Mesh(
      new THREE.BoxBufferGeometry(5, 11, 5),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    center.position.z = z;
    center.position.y = y;
    wheel.add(center);
    return wheel;
  }
  //Wheel
  function Create_Wheel(x, y, z) {
    const wheel = new THREE.Group();
  
    const left_wheel = Wheel(y, z);
    wheel.add(left_wheel);
  
    const right_wheel = Wheel(-y, z);
    wheel.add(right_wheel);
  
    wheel.position.x = x;
  
    return wheel;
  }
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
function Car() {
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
  function Bus() {
    const bus = new THREE.Group();
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
  

function animate() {
    requestAnimationFrame(animate);
  
    playerCar.rotation.z -= 0.01;
  
    renderer.render(scene, camera);
  }