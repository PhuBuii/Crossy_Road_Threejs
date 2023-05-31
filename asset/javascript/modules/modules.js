import * as THREE from "../../node_modules/three/build/three.module.js";

export function Texture(width, height, rects) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "rgba(0,0,0,0.6)";
  rects.forEach((rect) => {
    context.fillRect(rect.x, rect.y, rect.w, rect.h);
  });
  return new THREE.CanvasTexture(canvas);
}
export const vechicleColors = [0xa52523, 0xbdb638, 0x78b14b];
export const zoom = 2;
export const positionWidth = 42;
export const columns = 17;
export const boardWidth = positionWidth * columns;

export function DrawTaxiSign(back=true){
  const canvas = document.createElement("canvas");
  canvas.height = 10;
  canvas.width = 30;
  const context = canvas.getContext("2d");

  //Rotate the canvas
  if (back){
    context.translate(canvas.width, canvas.height);
    context.rotate(Math.PI); 
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, 30, 10);

  // Draw the letter "T"
  context.font = "10px Arial";
  context.fillStyle = "white";
 // Draw the letter "T"
  context.fillText("T", 5, 8);

  // Draw the letter "A"
  context.fillText("A", 10, 8);

  // Draw the letter "X"
  context.fillText("X", 15, 8);

  // Draw the letter "I"
  context.fillText("I", 21, 8);
  return new THREE.CanvasTexture(canvas);
}

export function DrawTaxiPattern(){
  const canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.height = 30;
  canvas.width = 120;

  ctx.fillStyle = "white";
  ctx.fillRect(0,0,120,30);
  // Define the size of each square
  var squareSize = canvas.width / 16;

  for (var row = 1; row < 3; row++) {
    for (var col = 0; col < 16; col++) {
      var x = col * squareSize;
      var y = row * squareSize;

      // Alternate the color of each square
      if ((row + col) % 2 === 0) {
        ctx.fillStyle = "#FFFFFF"; // White
      } else {
        ctx.fillStyle = "#000000"; // Black
      }

      // Draw the square
      ctx.fillRect(x, y, squareSize, squareSize);
    }
  }
  return new THREE.CanvasTexture(canvas);
}


export function DrawAmbulancePattern(right=true){
  const canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.height = 400;
  canvas.width = 600;
  if (right){
    ctx.translate(canvas.width, canvas.height);
    ctx.rotate(Math.PI);
  }

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Define the center point
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2 - 30;

  // Define the size of the plus sign
  var size = 140;

  // Set the line style
  ctx.lineWidth = 50;
  ctx.strokeStyle = "red";

  // Draw the vertical line
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - size / 2);
  ctx.lineTo(centerX, centerY + size / 2);
  ctx.stroke();

  // Draw the horizontal line
  ctx.beginPath();
  ctx.moveTo(centerX - size / 2, centerY);
  ctx.lineTo(centerX + size / 2, centerY);
  ctx.stroke();

  ctx.fillStyle = "red"
  ctx.fillRect(0,300, canvas.width, canvas.height);

  return new THREE.CanvasTexture(canvas);
}

export function DrawAmbulanceBack(){
  const canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.height = 74;
  canvas.width = 60;

  ctx.fillStyle = "white";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ctx.translate(canvas.width, canvas.height);
  ctx.rotate(Math.PI);

  // Draw right back window
  ctx.beginPath();
  ctx.moveTo(7, 15); // Top-left corner
  ctx.lineTo(27, 15); // Top-right corner
  ctx.lineTo(27, 35); // Bottom-right corner
  ctx.lineTo(7, 35); // Bottom-left corner
  ctx.closePath()
  // Fill the window with color
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fill();

  // Draw window outline
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Draw left back window      
  ctx.beginPath();
  ctx.moveTo(33, 15); // Top-left corner
  ctx.lineTo(53, 15); // Top-right corner
  ctx.lineTo(53, 35); // Bottom-right corner
  ctx.lineTo(33, 35); // Bottom-left corner
  ctx.closePath();

  // Fill the window with color
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fill();


  // Draw window outline
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.stroke();


  // Define the center point
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2 + 10;

  // Define the size of the plus sign
  var size = 10;

  // Set the line style
  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";

  // Draw the vertical line
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - size / 2);
  ctx.lineTo(centerX, centerY + size / 2);
  ctx.stroke();

  // Draw the horizontal line
  ctx.beginPath();
  ctx.moveTo(centerX - size / 2, centerY);
  ctx.lineTo(centerX + size / 2, centerY);
  ctx.stroke();

  ctx.fillStyle = "red"
  ctx.fillRect(0,55, canvas.width, canvas.height);

  ctx.font = "7px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("AMBULANCE", 10, 10);
  return new THREE.CanvasTexture(canvas);
}

export function DrawRedLine(right=false){
  const canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.height = 36;
  canvas.width = 59;

  if (right){
    ctx.translate(canvas.width, canvas.height);
    ctx.rotate(Math.PI);
  }

  ctx.fillStyle = "white";
  ctx.fillRect(0,0, canvas.width, canvas.height);  
  ctx.fillStyle = "red"
  ctx.fillRect(0,0, canvas.width - 45, canvas.height);

  return new THREE.CanvasTexture(canvas);
}

export function AmbulanceFront(){
  const canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.height = 36;
  canvas.width = 59;

  ctx.fillStyle = "white";
  ctx.fillRect(0,0, canvas.width, canvas.height);

  // Define the center point
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;

  // Define the size of the plus sign
  var size = 12;

  // Set the line style
  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";

  // Draw the vertical line
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - size / 2);
  ctx.lineTo(centerX, centerY + size / 2);
  ctx.stroke();

  // Draw the horizontal line
  ctx.beginPath();
  ctx.moveTo(centerX - size / 2, centerY);
  ctx.lineTo(centerX + size / 2, centerY);
  ctx.stroke();

  
  ctx.fillStyle = "red"
  ctx.fillRect(0,0, canvas.width - 45, canvas.height);

  return new THREE.CanvasTexture(canvas);
}

