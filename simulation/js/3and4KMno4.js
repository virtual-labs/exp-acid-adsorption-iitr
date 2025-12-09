let canvasWidth = 800;
let canvasHeight = 600;
let image1, image2, bgImg;
let shownext = false;
let process1 = 0, process2 = -1, process3 = -1, process4 = -1, process5=-1;

let startPoint, endPoint, endPoint2; // Starting and two ending points
let currentPoint; // Current position of the image

let startPoint_3, endPoint_3, endPoint2_3, endPoint_3_, endPoint2_3_; // Starting and two ending points
let currentPoint_3;

let img2x, img2y, img2w, img2h, img3x, img3yimg3w, img3h, nxth, nxtw, nxtx, nxty;
let canvos,x,y;


let steps = 100;
let currentStep = 0;
let animationInProgress = 3;
let showrect = false, rectHeight = 50;
let increase, dropAdded = false;
let drops = [];

let gif;
let blinking = true;
let blinkInterval = 200;


class Drop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.radius = 2.5;
    this.active = true;
  }

  update() {
    if (this.active) {
      this.y += this.speed;

      // Check if the drop has reached the specified y-coordinate
      if (this.y > 460) {
        this.active = false; // Set drop as inactive
      }
    }
  }

  display() {
    if (this.active) {
      noStroke();
      fill(255, 255,0,200);
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2+2);
    }
  }
}

function preload() {
  // Load your images
  image1 = loadImage('PotasiumChromate.png');
  img = loadImage('Cap.png');
  bgImg = loadImage('bg3.png');
  image3 = loadImage('droper.png');
  frontflask = loadImage('frontflask.png');
  liquid = loadImage('Halfwater.png');
  nextimg = loadImage('Forward.png');
  gif1 = createImg('gif1.gif');
  gif2 = createImg('gif1.gif');
  gif3 = createImg('gif1.gif');
  gif4 = createImg('gif1.gif');
  
  gif1.size(80,80);
  gif2.size(80,80);
  gif3.size(80,80);
  gif4.size(80,80);
 
  
  gif1.hide(); // Hide the original GIF initially
  gif2.hide();
  gif3.hide();
  gif4.hide();
}

function setup() {
  
   canvos=createCanvas(canvasWidth, canvasHeight);
  canvos.parent("#container");
  gif1.parent("#container");
  gif2.parent("#container");
  gif3.parent("#container");
  gif4.parent("#container");

  img2x = 560; img2y = 222; img2w = 55; img2h = 65;
  img3x = 150; img3y = 155, img3w = 55; img3h = 160;
  nxtx = 740; nxty = 540; nxtw = 50; nxth = 50;
  //  x=canvos.position().x;
  //  y=canvos.position().y;
  //  console.log(x,y);

  //image(gif, 558, 178);
  gif1.show();

  //gif.position(600, 260);


  // createDuplicate(gif, 178, 230);
  // gif.hide();
  // createDuplicate(gif, 600, 210);
  // createDuplicate(gif, 465, 160);

  // Set starting point
  startPoint = createVector(img2x, img2y);
  // Set initial position to the starting point
  currentPoint = startPoint.copy();
  // Set initial destination point
  endPoint2 = currentPoint.copy();



  startPoint_3 = createVector(img3x, img3y);
  currentPoint_3 = startPoint_3.copy();
  endPoint2_3 = currentPoint_3.copy();
  //endPoint2_3 = endPoint2_3.copy();



}

function draw() {
     x=canvos.position().x;
   y=canvos.position().y;
     gif1.position(x+600, y+260);
  gif2.position(x+178, y+230);
  gif3.position(x+600, y+210);
  gif4.position(x+465, y+160);
  // Set background to image3
  background(bgImg);
  for (let drop of drops) {
    drop.update();
    drop.display();
  }
  // Display images

  //image(image2, img2x, img2y, img2w, img2h);
  push();
  if (dropAdded) {
    tint(255, 255, 0);
  }
  image(liquid, 400, 453, 120, 20);
  pop();
  image(frontflask, 400, 320, 120, 160);
  //console.log("MouseX: " + mouseX + ", MouseY: " + mouseY);

  if (shownext == true) {
      // Check if it's time to blink
  if (millis() % (2 * blinkInterval) < blinkInterval) {
    // Display the image
    image(nextimg, nxtx, nxty, nxtw, nxth);
  }
    
  }


  if (showrect == true) {
    //console.log('process3')

    // Increase the rectangle's height in the y-axis3
    noStroke();
    rect(currentPoint_3.x + 22, currentPoint_3.y + 150, 5, -rectHeight);
    fill(255, 255, 0, 150)

    // Increment the rectangle's height3
    if (rectHeight != 70 & increase == true) {
      rectHeight += 1;
    }
    if (rectHeight != 0 & increase == false) {
      rectHeight -= 1;
    }

  }





  //For droper animation 1
  if (process2 == 1 & process3 == -1) {
    // Calculate step values for x and y
    let step3X = (endPoint_3.x - startPoint_3.x) / steps;
    let step3Y = (endPoint_3.y - startPoint_3.y) / steps;

    // Update currentPoint using manual interpolation
    currentPoint_3.x += step3X;
    currentPoint_3.y += step3Y;

    // Draw the image at the current position
    image(image3, currentPoint_3.x, currentPoint_3.y, img3w, img3h);

    // Increment the step counter
    currentStep++;

    // Check if animation is complete
    if (currentStep >= steps) {
      process2 = 2;
      currentStep = 0;
    }
  }

  else if (process2 == 2 & process3 == -1) {
    let step3X = (endPoint2_3.x - endPoint_3.x) / steps;
    let step3Y = (endPoint2_3.y - endPoint_3.y) / steps;

    // Update currentPoint using manual interpolation
    currentPoint_3.x += step3X;
    currentPoint_3.y += step3Y;

    // Draw the image at the current position
    image(image3, currentPoint_3.x, currentPoint_3.y, img3w, img3h);
    // Increment the step counter
    currentStep++;
    // Check if animation is complete
    if (currentStep >= steps) {
      process2 = 3;
      img3x = currentPoint_3.x;
      img3y = currentPoint_3.y;
      currentStep = 0;
      process3 = 0;
      //console
      gif3.show();

    }
  }

  else if (process3 == 1 & process2 == 3) {
    // console.log('process3')

    // Calculate step values for x and y
    let step3X = (endPoint_3_.x - endPoint2_3.x) / steps;
    let step3Y = (endPoint_3_.y - endPoint2_3.y) / steps;

    // Update currentPoint using manual interpolation
    currentPoint_3.x += step3X;
    currentPoint_3.y += step3Y;

    // Draw the image at the current position
    image(image3, currentPoint_3.x, currentPoint_3.y, img3w, img3h);

    // Increment the step counter
    currentStep++;

    // Check if animation is complete
    if (currentStep >= steps) {
      process3 = 2;
      currentStep = 0;
    }
  }

  else if (process3 == 2 & process2 == 3) {
    let step3X = (endPoint2_3_.x - endPoint_3_.x) / steps;
    let step3Y = (endPoint2_3_.y - endPoint_3_.y) / steps;

    // Update currentPoint using manual interpolation
    currentPoint_3.x += step3X;
    currentPoint_3.y += step3Y;


    // Draw the image at the current position
    image(image3, currentPoint_3.x, currentPoint_3.y, img3w, img3h);

    // Increment the step counter
    currentStep++;
    // Check if animation is complete
    if (currentStep >= steps) {
      //image(image3, currentPoint_3.x, currentPoint_3.y, img3w, img3h);

      process3 = 3;
      img3x = currentPoint_3.x;
      img3y = currentPoint_3.y;
      currentStep = 0;
      process4 = 0;
      //console
      gif4.show();

    }

  }
  else {
    if (process3 > 0) {
      image(image3, endPoint2_3_.x, endPoint2_3_.y, img3w, img3h);
    }
    else {
      // Draw the image at the final position when not animating
      image(image3, endPoint2_3.x, endPoint2_3.y, img3w, img3h);
    }

  }


  //To show KMnO4 container
  image(image1, 540, 280, 100, 160);
  //For Cap animation
  if (process1 == 1) {
    // Calculate step values for x and y
    let stepX = (endPoint.x - startPoint.x) / steps;
    let stepY = (endPoint.y - startPoint.y) / steps;

    // Update currentPoint using manual interpolation
    currentPoint.x += stepX;
    currentPoint.y += stepY;

    // Draw the image at the current position
    image(img, currentPoint.x, currentPoint.y, img2w, img2h);

    // Increment the step counter
    currentStep++;

    // Check if animation is complete
    if (currentStep >= steps) {
      process1 = 2;
      currentStep = 0;
    }
  }

  else if (process1 == 2) {
    let stepX = (endPoint2.x - endPoint.x) / steps;
    let stepY = (endPoint2.y - endPoint.y) / steps;

    // Update currentPoint using manual interpolation
    currentPoint.x += stepX;
    currentPoint.y += stepY;

    // Draw the image at the current position
    image(img, currentPoint.x, currentPoint.y, img2w, img2h);

    // Increment the step counter
    currentStep++;
    // Check if animation is complete
    if (currentStep >= steps) {
      process1 = 3;
      currentStep = 0;

      process2 = 0;
      gif2.show();

    }
  }

  else {
    // Draw the image at the final position when not animating
    image(img, endPoint2.x, endPoint2.y, img2w, img2h);

  }





}

function mousePressed() {
  // Check if the mouse is over the Cap image
  if (mouseX > img2x - img2w / 4 && mouseX < img2x + img2w && mouseY > img2y - img2h / 4 && mouseY < img2y + img2h) {

    cappressed();
  }

  // Check if the mouse is over the Droper image
  if (mouseX > img3x - img3w / 4 && mouseX < img3x + img3w && mouseY > img3y - img3h / 4 && mouseY < img3y + img3h) {
    droperpressed();
  }

  // Check if the mouse is over the Next image
  if (mouseX > nxtx - nxtw / 4 && mouseX < nxtx + nxtw && mouseY > nxty - nxth / 4 && mouseY < nxty + nxth) {
    nextpressed();
  }
}

function cappressed() {
  gif1.hide();
  if (process1 == 0) {
    currentPoint = startPoint.copy();

    endPoint = createVector(560, 212);
    endPoint2 = createVector(357, 63);
    process1 = 1;
  }
  //process1=1;
  //process2=0;
}

function droperpressed() {
  gif2.hide();
  console.log('droper');
  if (process2 == 0) {
    currentPoint_3 = startPoint_3.copy();

    endPoint_3 = createVector(565, 100);
    endPoint2_3 = createVector(565, 190);
    process2 = 1;

  }

  if (process3 == 0) {
    gif3.hide()
    // console.log('process3');
    increase = true;
    showrect = true;

    //currentPoint_3 = startPoint_3.copy();
    endPoint_3_ = createVector(565, 100);
    endPoint2_3_ = createVector(430, 142);
    process3 = 1;

  }
  if (process4 == 0) {
    gif4.hide();
    increase = false;
    for (let i = 0; i < 4; i++) {
      let drop = new Drop(455,200+i*20);
      drops.push(drop);
    }
    //dropAdded = true;
    process5=0;
  }
  if(process5==0){
    setTimeout(showNext, 1500); // Start blinking after 1 second
    
  }

}
function showNext(){
shownext=true;
dropAdded = true;
}
function nextpressed() {
  console.log('nxt');
  window.location.href = 'Mytitration.html';


}

