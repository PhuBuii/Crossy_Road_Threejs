import * as THREE from "../node_modules/three/build/three.module.js";
import { Car } from "./vechicles/car.js";
import { Car1 } from "./vechicles/car1.js";
import { Limousine } from "./vechicles/limousine.js";
import { UIT } from "./vechicles/UIT.js";
import { Truck } from "./vechicles/truck.js";
import { Ambulance } from "./vechicles/ambulance.js";
import { IceCream } from "./vechicles/icecream.js";
import { Bus } from "./vechicles/bus.js";
import { Taxi } from "./vechicles/taxi.js";
import { zoom, positionWidth, boardWidth, columns } from "./modules/modules.js";
import { Chicken, Egg, Crash_Chicken } from "./players/player.js";
import { Grass, Road, Coin } from "./modules/objects.js";

let turn = 0; //0 foward 1 backward 2 left 3 right

//Còn task highscore và score after reset
//Task đổi nhân vật
//Task xoay nhân vật
const counterDOM = document.getElementById("counter");
const highscoreDOM = document.getElementById("highscore");
const endDOM = document.getElementById("end");
const checkbox = document.getElementById("checkbox1");
const controlBtns = document.getElementById("controlls");
const coinDOM = document.getElementById("coin");
let coin_counter = 0;
checkbox.addEventListener("click", (e) => {
  if (e.target.checked) {
    controlBtns.style.display = "none";
  } else {
    controlBtns.style.display = "";
  }
});

const scene = new THREE.Scene();

const distance = 500;
let highscore = 0;
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  0.1,
  10000
);

camera.rotation.x = (50 * Math.PI) / 180;
camera.rotation.y = (20 * Math.PI) / 180;
camera.rotation.z = (10 * Math.PI) / 180;

const initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
const initialCameraPositionX =
  Math.tan(camera.rotation.y) *
  Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);
camera.position.y = initialCameraPositionY;
camera.position.x = initialCameraPositionX;
camera.position.z = distance;

const chickenSize = 15;

const stepTime = 200; // Miliseconds it takes for the player to take a step forward, backward, left or right

let lanes;
let currentLane;
let currentColumn;

let previousTimestamp;
let startMoving;
let moves;
let stepStartTimestamp;

const generateLanes = () =>
  [
    -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5,
    -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20,
  ]
    .map((index) => {
      const lane = new Lane(index);
      lane.mesh.position.y = index * positionWidth * zoom;
      scene.add(lane.mesh);
      return lane;
    })
    .filter((lane) => lane.index >= 0);

const addLane = () => {
  const index = lanes.length;
  const lane = new Lane(index);
  lane.mesh.position.y = index * positionWidth * zoom;
  scene.add(lane.mesh);
  lanes.push(lane);
};

let player = new Egg();
scene.add(player);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
scene.add(hemiLight);

const initialDirLightPositionX = -100;
const initialDirLightPositionY = -100;
const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);

dirLight.position.set(initialDirLightPositionX, initialDirLightPositionY, 200);
dirLight.castShadow = true;
dirLight.target = player;
scene.add(dirLight);

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 500;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

// var helper = new THREE.CameraHelper( dirLight.shadow.camera );
// var helper = new THREE.CameraHelper( camera );
// scene.add(helper)

const backLight = new THREE.DirectionalLight(0x000000, 0.4);
backLight.position.set(200, 200, 50);
backLight.castShadow = true;
scene.add(backLight);

const laneTypes = ["bus", "car", "truck", "forest", "coin", "taxi", "ambulance", "car1", "limousine", "UIT","icecream"];
const laneSpeeds = [2, 2.5, 3];

const treeHeights = [20, 45, 60];

const initaliseValues = () => {
  lanes = generateLanes();

  currentLane = 0;
  currentColumn = Math.floor(columns / 2);

  previousTimestamp = null;

  startMoving = false;
  moves = [];
  stepStartTimestamp;

  player.position.x = 0;
  player.position.y = 0;

  camera.position.y = initialCameraPositionY;
  camera.position.x = initialCameraPositionX;

  dirLight.position.x = initialDirLightPositionX;
  dirLight.position.y = initialDirLightPositionY;
};

initaliseValues();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function Tree() {
  const tree = new THREE.Group();

  const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(15 * zoom, 15 * zoom, 20 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true })
  );
  trunk.position.z = 10 * zoom;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  tree.add(trunk);

  const height = treeHeights[Math.floor(Math.random() * treeHeights.length)];

  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(30 * zoom, 30 * zoom, height * zoom),
    new THREE.MeshLambertMaterial({ color: 0x7aa21d, flatShading: true })
  );
  crown.position.z = (height / 2 + 20) * zoom;
  crown.castShadow = true;
  crown.receiveShadow = false;
  tree.add(crown);

  return tree;
}

function Lane(index) {
  this.index = index;
  this.type =
    index <= 0
      ? "field"
      : laneTypes[Math.floor(Math.random() * laneTypes.length)];

  switch (this.type) {
    case "field": {
      this.type = "field";
      this.mesh = new Grass();
      break;
    }
    case "coin": {
      this.mesh = new Grass();

      this.occupiedPositions = new Set();
      this.threes = [1].map(() => {
        const three = new Coin();
        let position;
        do {
          position = Math.floor(Math.random() * columns);
        } while (this.occupiedPositions.has(position));
        this.occupiedPositions.add(position);
        three.position.x =
          (position * positionWidth + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        this.mesh.add(three);
        three.position.z = 8 * zoom;
        return three;
      });
      break;
    }
    case "forest": {
      this.mesh = new Grass();

      this.occupiedPositions = new Set();
      this.threes = [1, 2, 3, 4].map(() => {
        const three = new Tree();
        let position;
        do {
          position = Math.floor(Math.random() * columns);
        } while (this.occupiedPositions.has(position));
        this.occupiedPositions.add(position);
        three.position.x =
          (position * positionWidth + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        this.mesh.add(three);
        return three;
      });
      break;
    }
    case "car": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1, 2, 3].map(() => {
        const vechicle = new Car();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 2);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 2 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }

    case "taxi": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1].map(() => {
        const vechicle = new Taxi();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 2);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 2 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }

    case "bus": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1, 2].map(() => {
        const vechicle = new Bus();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 3);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 3 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
    case "truck": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1, 2].map(() => {
        const vechicle = new Truck();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 3);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 3 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
    case "ambulance": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1].map(() => {
        const vechicle = new Ambulance();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 3);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 3 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
    case "car1": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1].map(() => {
        const vechicle = new Car1();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 2);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 2 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
    case "limousine": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1].map(() => {
        const vechicle = new Limousine();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 2);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 2 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
    case "UIT": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1].map(() => {
        const vechicle = new UIT();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 2);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 2 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
    case "icecream": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vechicles = [1, 2].map(() => {
        const vechicle = new IceCream();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 3);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vechicle.position.x =
          (position * positionWidth * 3 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vechicle.rotation.z = Math.PI;
        this.mesh.add(vechicle);
        return vechicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
    
  }
}

document.querySelector("#retry").addEventListener("click", () => {
  lanes.forEach((lane) => scene.remove(lane.mesh));
  initaliseValues();
  endDOM.style.visibility = "hidden";
  checkbox.style.visibility = "visible";
  controlBtns.style.visibility = "visible";
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  document.addEventListener("touchstart", handleTouchStart, { passive: false });
  document.addEventListener("touchmove", handleTouchMove, { passive: false });
  counterDOM.innerHTML = 0;
  scene.remove(player);
  player = new Chicken();
  scene.add(player);
});

document.getElementById("forward").addEventListener("click", () => {
  move("forward");
  if (turn != 0) {
    player.rotation.z = 0;
  }
  turn = 0;
});

document.getElementById("backward").addEventListener("click", () => {
  move("backward");
  if (turn != 1) {
    player.rotation.z = 3.1;
  }
  turn = 1;
});

document.getElementById("left").addEventListener("click", () => {
  move("left");
  if (turn != 2) {
    player.rotation.z = 1.55;
  }
  turn = 2;
});

document.getElementById("right").addEventListener("click", () => {
  move("right");
  if (turn != 3) {
    player.rotation.z = -1.55;
  }
  turn = 3;
});
let xStart = null;
let yStart = null;

function handleTouchStart(event) {
  xStart = event.touches[0].clientX;
  yStart = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (!xStart || !yStart) {
    return;
  }

  const xEnd = event.touches[0].clientX;
  const yEnd = event.touches[0].clientY;

  const xDiff = xEnd - xStart;
  const yDiff = yEnd - yStart;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      // Vuốt sang phải
      move("right");
      if (turn != 3) {
        player.rotation.z = -1.55;
      }
      turn = 3;
    } else {
      // Vuốt sang trái
      move("left");
      if (turn != 2) {
        player.rotation.z = 1.55;
      }
      turn = 2;
    }
  } else {
    if (yDiff > 0) {
      // Vuốt xuống
      move("backward");
      if (turn != 1) {
        player.rotation.z = 3.1;
      }
      turn = 1;
    } else {
      // Vuốt lên
      move("forward");
      if (turn != 0) {
        player.rotation.z = 0;
      }
      turn = 0;
    }
  }

  xStart = null;
  yStart = null;
}

document.addEventListener("touchstart", handleTouchStart, { passive: false });
document.addEventListener("touchmove", handleTouchMove, { passive: false });

let keyState = {};
const handleKeyDown = (event) => {
  keyState[event.keyCode] = false;
};
const resetGame = (event) => {
  if (event.key == "R" || event.key == "r") {
    lanes.forEach((lane) => scene.remove(lane.mesh));
    initaliseValues();
    endDOM.style.visibility = "hidden";
    checkbox.style.visibility = "visible";
    controlBtns.style.visibility = "visible";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    counterDOM.innerHTML = 0;
    scene.remove(player);
    player = new Chicken();
    scene.add(player);
  }
};
const handleKeyUp = (event) => {
  if (keyState[event.keyCode] == false) {
    if (event.keyCode == "38") {
      // up arrow
      move("forward");
      if (turn != 0) {
        player.rotation.z = 0;
      }
      turn = 0;
    } else if (event.keyCode == "40") {
      // down arrow
      move("backward");
      if (turn != 1) {
        player.rotation.z = 3.1;
      }
      turn = 1;
    } else if (event.keyCode == "37") {
      // left arrow
      move("left");
      if (turn != 2) {
        player.rotation.z = 1.55;
      }
      turn = 2;
    } else if (event.keyCode == "39") {
      // right arrow
      move("right");
      if (turn != 3) {
        player.rotation.z = -1.55;
      }
      turn = 3;
    }
  }
  keyState[event.keyCode] = true;

  event.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện
};

// Đăng ký sự kiện keydown và keyup
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function move(direction) {
  const finalPositions = moves.reduce(
    (position, move) => {
      if (move === "forward") {
        return { lane: position.lane + 1, column: position.column };
      }
      if (move === "backward") {
        return { lane: position.lane - 1, column: position.column };
      }
      if (move === "left") {
        return { lane: position.lane, column: position.column - 1 };
      }
      if (move === "right") {
        return { lane: position.lane, column: position.column + 1 };
      }
    },
    { lane: currentLane, column: currentColumn }
  );

  if (direction === "forward") {
    if (
      lanes[finalPositions.lane + 1].type === "forest" &&
      lanes[finalPositions.lane + 1].occupiedPositions.has(
        finalPositions.column
      )
    )
      return;
    if (!stepStartTimestamp) startMoving = true;
    addLane();
  } else if (direction === "backward") {
    if (finalPositions.lane === 0) return;
    if (
      lanes[finalPositions.lane - 1].type === "forest" &&
      lanes[finalPositions.lane - 1].occupiedPositions.has(
        finalPositions.column
      )
    )
      return;
    if (!stepStartTimestamp) startMoving = true;
  } else if (direction === "left") {
    if (finalPositions.column === 0) return;
    if (
      lanes[finalPositions.lane].type === "forest" &&
      lanes[finalPositions.lane].occupiedPositions.has(
        finalPositions.column - 1
      )
    )
      return;
    if (!stepStartTimestamp) startMoving = true;
  } else if (direction === "right") {
    if (finalPositions.column === columns - 1) return;
    if (
      lanes[finalPositions.lane].type === "forest" &&
      lanes[finalPositions.lane].occupiedPositions.has(
        finalPositions.column + 1
      )
    )
      return;
    if (!stepStartTimestamp) startMoving = true;
  }
  moves.push(direction);
}

function animate(timestamp) {
  requestAnimationFrame(animate);
  if (currentLane === 10) {
    const playerPosition = player.position.clone(); // Lưu trữ vị trí hiện tại của player

    scene.remove(player);

    player = new Chicken();
    player.position.copy(playerPosition); // Đặt vị trí mới cho player dựa trên vị trí đã lưu trữ

    scene.add(player);
  }

  if (highscore < currentLane) {
    highscore = currentLane;
    highscoreDOM.innerHTML = highscore;
  }
  if (!previousTimestamp) previousTimestamp = timestamp;
  const delta = timestamp - previousTimestamp;
  previousTimestamp = timestamp;

  // Animate cars and trucks moving on the lane
  lanes.forEach((lane) => {
    if (lane.type === "car" || lane.type === "truck" || lane.type === "bus" || lane.type === "taxi"  ||lane.type === "icecream" || lane.type === "ambulance" || lane.type === "car1" || lane.type === "limousine" || lane.type === "UIT") {
     const aBitBeforeTheBeginingOfLane =
        (-boardWidth * zoom) / 2 - positionWidth * 2 * zoom;
      const aBitAfterTheEndOFLane =
        (boardWidth * zoom) / 2 + positionWidth * 2 * zoom;
      lane.vechicles.forEach((vechicle) => {
        if (lane.direction) {
          vechicle.position.x =
            vechicle.position.x < aBitBeforeTheBeginingOfLane
              ? aBitAfterTheEndOFLane
              : (vechicle.position.x -= (lane.speed / 16) * delta);
        } else {
          vechicle.position.x =
            vechicle.position.x > aBitAfterTheEndOFLane
              ? aBitBeforeTheBeginingOfLane
              : (vechicle.position.x += (lane.speed / 16) * delta);
        }
      });
    }
    if (lane.type == "coin") {
      lane.threes.forEach((vechicle) => {
        vechicle.rotation.z += 0.1;
      });
    }
  });

  if (startMoving) {
    stepStartTimestamp = timestamp;
    startMoving = false;
  }

  if (stepStartTimestamp) {
    const moveDeltaTime = timestamp - stepStartTimestamp;
    const moveDeltaDistance =
      Math.min(moveDeltaTime / stepTime, 1) * positionWidth * zoom;
    const jumpDeltaDistance =
      Math.sin(Math.min(moveDeltaTime / stepTime, 1) * Math.PI) * 8 * zoom;
    switch (moves[0]) {
      case "forward": {
        const positionY =
          currentLane * positionWidth * zoom + moveDeltaDistance;
        camera.position.y = initialCameraPositionY + positionY;
        dirLight.position.y = initialDirLightPositionY + positionY;
        player.position.y = positionY; // initial player position is 0

        player.position.z = jumpDeltaDistance;
        break;
      }
      case "backward": {
        const positionY =
          currentLane * positionWidth * zoom - moveDeltaDistance;
        camera.position.y = initialCameraPositionY + positionY;
        dirLight.position.y = initialDirLightPositionY + positionY;
        player.position.y = positionY;

        player.position.z = jumpDeltaDistance;
        break;
      }
      case "left": {
        const positionX =
          (currentColumn * positionWidth + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2 -
          moveDeltaDistance;
        camera.position.x = initialCameraPositionX + positionX;
        dirLight.position.x = initialDirLightPositionX + positionX;
        player.position.x = positionX; // initial player position is 0
        player.position.z = jumpDeltaDistance;
        break;
      }
      case "right": {
        const positionX =
          (currentColumn * positionWidth + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2 +
          moveDeltaDistance;
        camera.position.x = initialCameraPositionX + positionX;
        dirLight.position.x = initialDirLightPositionX + positionX;
        player.position.x = positionX;

        player.position.z = jumpDeltaDistance;
        break;
      }
    }
    // Once a step has ended
    if (moveDeltaTime > stepTime) {
      switch (moves[0]) {
        case "forward": {
          currentLane++;
          counterDOM.innerHTML = currentLane;
          break;
        }
        case "backward": {
          currentLane--;
          counterDOM.innerHTML = currentLane;
          break;
        }
        case "left": {
          currentColumn--;
          break;
        }
        case "right": {
          currentColumn++;
          break;
        }
      }

      moves.shift();
      // If more steps are to be taken then restart counter otherwise stop stepping
      stepStartTimestamp = moves.length === 0 ? null : timestamp;
    }
  }

  // Hit test
  if (
    lanes[currentLane].type === "car" ||
    lanes[currentLane].type === "bus" ||
    lanes[currentLane].type === "truck" ||
    lanes[currentLane].type === "taxi" ||
    lanes[currentLane].type === "ambulance"||
    lanes[currentLane].type === "car1" ||
    lanes[currentLane].type === "limousine" ||
    lanes[currentLane].type === "UIT" ||
    lanes[currentLane].type === "icecream"
  ) {
    const chickenMinX = player.position.x - (chickenSize * zoom) / 2;
    const chickenMaxX = player.position.x + (chickenSize * zoom) / 2;
    const vechicleLength = { bus: 80, car: 60, truck: 105, taxi: 60, ambulance: 80, car1: 60, limousine: 70, UIT: 80, icecream: 100 } [
      lanes[currentLane].type
    ];

    lanes[currentLane].vechicles.forEach((vechicle) => {
      const carMinX = vechicle.position.x - (vechicleLength * zoom) / 2;
      const carMaxX = vechicle.position.x + (vechicleLength * zoom) / 2;
      if (chickenMaxX > carMinX && chickenMinX < carMaxX) {
        endDOM.style.visibility = "visible";
        controlBtns.style.visibility = "hidden";
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        document.removeEventListener("touchstart", handleTouchStart, {
          passive: false,
        });
        document.removeEventListener("touchmove", handleTouchMove, {
          passive: false,
        });
        document.addEventListener("keydown", resetGame);
        checkbox.style.visibility = "hidden";
        const playerPosition = player.position.clone(); // Lưu trữ vị trí hiện tại của player

        scene.remove(player);

        player = new Crash_Chicken();
        player.position.copy(playerPosition); // Đặt vị trí mới cho player dựa trên vị trí đã lưu trữ
        player.position.z = -8 * zoom;
        scene.add(player);
      }
    });} 
    else if (lanes[currentLane].type === "coin") {
    const chickenMinX = player.position.x - (chickenSize * zoom) / 2;
    const chickenMaxX = player.position.x + (chickenSize * zoom) / 2;

    lanes[currentLane].threes.forEach((coin, index) => {
      const coinMinX = coin.position.x - (5 * zoom) / 2;
      const coinMaxX = coin.position.x + (5 * zoom) / 2;

      if (chickenMaxX > coinMinX && chickenMinX < coinMaxX) {
        coin_counter += 1;
        coinDOM.innerHTML = coin_counter;        
        // Remove the coin object from the scene
        lanes[currentLane].threes.splice(index, 1);
        // scene.remove(coin);
        let parent = coin.parent;
        parent.remove(coin);
      }
    });
  }

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
