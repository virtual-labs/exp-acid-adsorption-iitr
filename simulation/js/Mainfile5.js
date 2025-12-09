// Access the data attribute and retrieve the PHP variable
var data1 = document.getElementById('data1');
var var1 = data1.getAttribute('data-php-variable');//Normality of Burette(NaOH)
var data2 = document.getElementById('data2');
var var2 = data2.getAttribute('data-php-variable');//Volume of needed to added from burette
var data3 = document.getElementById('data3');
var var3 = data3.getAttribute('data-php-variable');//Normality of liquid in flask
var data4 = document.getElementById('data4');
var var4 = data4.getAttribute('data-php-variable');//Volume of liquid in flask

let normality_titrant;// normality of the soln in flask (N)-----------------N1
let volume_titrant; // Volume of soln added from burette determines the colour changed when vadded is equal to it(in mL)-------------------------V1
let vadded = 0; // Volume of liquid added from burette increases with burette open(in mL)
let normality_titrate = 1;//normality of titrate in burette(in N) Between 0-2N for this simulation-----------------------------N2
let volume_titrate = 8;//volume of titrate present in the flask with indicator(in ml)  Between 1-15ml for this Simulation--------V2

let equivalencePointVolume; // The volume of silver nitrate at the equivalence point (to be calculated)
let titrationFinished = false; // A flag to indicate if the titration is finished

let size; // For setting the size of the window

let shakingRotation = 0;//Variable to set shaking initially 
let shakingRotationSpeed = 0.15;//Shaking speed
let flaskTouched = false;// Setting initially value of flask touched to false
let bureteTouched = false;//Setting initially value of burette touched to false
let liquidLevel;//variable for level of liquid in the burette
let buretteLiquidColor;//for changing the colour of liquid in burette
let liquidDropInterval = 500; // Time interval between each liquid drop
let buretesize = 10;    //For making the effect of changing the size of burette on touching
let buretemainsize = 10;//For making the burette size again to the original size

let flaskheight;//
let flaskwidth;
let flaskX;//
let flaskY;
let cropHeight;//varible to be decreased to create the illusion of increasing liquid level

let croppedImg;//Variable that stores the croped image to deside the image to display for the illusion of increase in water level
let gifImage;//For storing the gif image as variable
let bureteImg, flaskImg, bottomImg, backgroundImage, flaskImgbk;

let changetint;//Varible storing the tint value the colour of liquid in burette
let aftercolour;//variable to change the colour ater titrating
let change;//For changing the speed of flow of burette as well as the increase the water level in flask

//Setting the initial position of touch to burette and flask of radius 1.5 and 3 respectively
let buretetouchX = 10 * size;
let buretetouchY = 12.5 * size;
let flasktouchX = 9 * size;
let flasktouchY = 18.3 * size;

let ex2one = false;//JSD only for just developer use
let exone = false;//JSD only for just developer use

let darkness = 140;
  ; //It is used to determine the darkness of liquid if titrant is kept adding
let canvasLocation;

let onerun = true;
let canvas;
let turnslideractive = true;//Making the true for slider in start to execute the if function only once 

let container;
let waterlevel;
let showppt=0;
let variation ;
let variation2 ;
let size_vary ;
let size_vary2 ;
let number=0;


let waterheight;
let ppt=true;
let old=var3;
let nxtx,nxty,nxtw,nxth;
let shownext = false;
let blinking = true;
let blinkInterval = 200;





function preload() {
  bureteImg = loadImage('burette51.png', loaded);
  flaskImgbk = loadImage('backflask.png', loaded);
  flaskImg = loadImage('frontflask5.png', loaded);
  bottomImg = loadImage('water.png', loaded);
//   gifImage = createImg('bubbler1.gif', loaded);
nextimg = loadImage('Forward.png');
  backgroundImage = loadImage('bg.png', loaded);
  // anothercolorImg=loadImage('conical flask.png')


}

// Function to check if all images are loaded before running the sketch
let loadedImages = 0;
function loaded() {
  loadedImages++;
  if (loadedImages === 5) {
    console.log('loaded success');
  }
}

function setup() {
  number=0;


  //container= document.querySelector('#canvascontainer');
  //container.clientHeight=;
  container = select('#canvasContainer');

  //this if is used to set size according to phone full width and full height in pc
  if(windowWidth<500){
    size=(container.width-10)/22;
  }
  else{size = (container.height - 10) / 24;}
  nxtx = 17 * size; nxty = 21 * size; nxtw = 50; nxth = 50;
  console.log('size:',size);
  canvas = createCanvas(20 * size, 24 * size);
  canvas.parent("#canvasContainer");
  //size=canvas.width/20;
  //


  console.log(canvas.width, size);
  //backgroundGradient(color(200, 200, 200), color(245, 245, 245)); // Call the function to create the gradient
  background(backgroundImage);

  slider1 = select('#speed_change');
  // slider2 = select('#Normality_titrate');
  // slider3 = select('#Volume_titrate');
  
  normality_titrate=var1;
  // var n_titrate= 
  volume_titrate=var2;

  slider1.removeAttribute('disabled'); // Enable the slider1
  // slider2.removeAttribute('disabled'); // Enable the slider2
  // slider3.removeAttribute('disabled'); // Enable the slider3

  // To call all sliders 
  // normality_titrate = slider2.value() / 2;
  // volume_titrate = slider3.value();

  buretteLiquidColor = color(255,255,255, 100);//setting the colour of burette liquid
  liquidLevel = 8 * size;
  flaskheight = 5 * size / 1.1;
  flaskwidth = 3.9 * size / 1.1;
  flaskX = width / 2 - .7 * size;
  flaskY = height / 2 + 5.3 * size;
  cropHeight = flaskheight - volume_titrate * 0.0675 * size;//Setting crop height according to the volume of titrate present
  buretetouchX = 11 * size;
  buretetouchY = 13 * size;
  flasktouchX = 10.5 * size;
  flasktouchY = 19.5 * size;

  changetint = color(255, 255, 255, 200);//Defining the net at starting
  aftercolour = color(252, 89, 190	, darkness);//Defining the net colour after titration
  
  //gifImage.hide();

  let startButton = document.getElementById("Start");
  startButton.addEventListener("click", start);
  let resetButton = document.getElementById("Reset");
  resetButton.addEventListener("click", setup);
  let shakeButton = document.getElementById("Shake");
  shakeButton.addEventListener("click", shake);
  // Add this code at the end of your p5.js script

  

  document.getElementById("runsetup").addEventListener("click", function () {
    console.log("setup executed");
    setTimeout(setup, 100);
  });


  vadded = 0;
  aftercolour = color(228, 88, 114, darkness);//Defining the net colour after titration

  //pieceHeight = height / numPieces;


  canvasLocation = canvas.position();
  console.log("Canvas location:", canvasLocation);



}

function draw() {
//   gifImage.hide();
  frameRate(30);

  canvas;
  change = slider1.value() / 5;
  background(backgroundImage);
  
  //Display the liquid stream coming out of burette nossle
  if (liquidLevel >= 1 && bureteTouched == true) {
    noStroke();
    fill(buretteLiquidColor);
    rect(width / 2 + .95 * size, 12.8 * size, change * size * .2 * random(.8, 1.1), random(8.7, 8.8) * size);
  }

  waterlevel = cropHeight;
if (ppt){
drawppt();
if (showppt==true){

  drawppt();
  
}else{
  showppt++;
}}

  flaskImg.resize(flaskwidth+6, flaskheight);
  flaskImgbk.resize(flaskwidth, flaskheight);
  bottomImg.resize(flaskwidth, flaskheight);

  
   waterheight=(flaskheight-cropHeight)*.7;



  //Creating the liquid inside the burette
  noStroke();
  fill(buretteLiquidColor);

  rect(width / 2 + .7 * size, 12.7 * size, size * 0.65, -liquidLevel*1.35);
  push();

  image(bureteImg, width / 2 - 6.2 * size, .7 * size, 9.88 * size / 1, buretesize * 2.3 * size / 1);
  noStroke();
  pop();
  if (flaskTouched) {
    noStroke();
    fill(buretteLiquidColor);

    funflasktouched();
  } else {


    //JSD just for developer

    // if (!ex2one) {
    //   console.log(flaskImg.width, flaskImg.height, bottomImg.width, bottomImg.height, croppedImg.width, croppedImg.height);
    //   ex2one = true;
     
    // }
    ///Here is a code to display the liquid level inside the flask   and this is behind image   
    image(flaskImgbk, flaskX, flaskY, flaskwidth, flaskheight);
    image(flaskImg, flaskX, flaskY, flaskwidth, flaskheight);
// Remove the outline


   
    


    push();
    tint(changetint);
    if (waterheight < flaskheight) {
      let c = bottomImg.get(0, flaskheight - waterheight, flaskwidth, flaskheight);
      image(c, flaskX, flaskY+flaskheight - waterheight);
    } else {
      // If waterheight exceeds flaskheight, draw the entire image without cropping
      image(bottomImg, flaskX, flaskY+flaskheight - waterheight);
    }
    //croppedImg.copy(bottomImg,flaskX, cropY, flaskwidth, cropHeight, 0, 0, flaskwidth, flaskheight);

    pop();
 
    // This is front image to diplay water level
    //image(croppedImg, flaskX, flaskY, flaskwidth, waterlevel);

  }
  //JSD
  //fill(buretteLiquidColor);
  //rect(width / 2 - size * 0.7,  liquidLevel, size * .4, liquidLevel);

  /*stroke(0); // Set the dot color to black
  strokeWeight(10); // Set the dot size
  point(width/2, 18.5*size)
  */
//





  let valueDisplayElement = document.getElementById("valueDisplay");
  valueDisplayElement.innerText = floor(vadded * 100) / 100 + ' ml';
  // let OldDisplayElement = document.getElementById("OldDisplay");
  // OldDisplayElement.innerText = floor(old * 100) / 100 + ' ml';


  if (onerun) {
    setup();
    onerun = !onerun;
  }
  if (shownext == true) {
    // Check if it's time to blink
    if (millis() % (2 * blinkInterval) < blinkInterval) {
      // Display the image
      image(nextimg, nxtx, nxty, nxtw, nxth);
    }

  }

}

function mousePressed() {
  //Condition to check weather burette is touched or not

  let dis_burete = dist(mouseX, mouseY, buretetouchX, buretetouchY);
  if (dis_burete <= 1.5 * size) {
    start();
    // changeArrowStyleToPointer();
  }
  //Condition to check weather flask is touched or not
  let dis_flask = dist(mouseX, mouseY, flasktouchX, flasktouchY);
  if (dis_flask <= 2.3 * size) {
    flaskTouched = !flaskTouched;
    //console.log(flaskTouched);

  }
  if (mouseX > nxtx - nxtw / 4 && mouseX < nxtx + nxtw && mouseY > nxty - nxth / 4 && mouseY < nxty + nxth&&vadded >= volume_titrant) {
    nextpressed();
  }
}

function mouseReleased() {
  // Code to execute when the mouse button is released
  // Add your logic or actions here...
  // flaskTouched = false;
  buretesize = buretemainsize;

}
function changeArrowStyleToPointer() {
  nextButton.style.cursor = 'pointer';
}

//This function keeps track of all the imcrement in flask as well as decrease in burette
function addLiquidDrop() {
  let runonce = true;
  if (liquidLevel >= 1 && bureteTouched == true) {
    liquidLevel -=  change*size/5;

    cropHeight -= 2.0 * change;
    number+=change;

    exone = false;
    ex2one = false;
    console.log(liquidLevel);
    vadded += 1 * change;
    console.log("vadded=", vadded);



    //chnaging colour of liquid on reaching the desired volume and runonce so that it needs to run only once        
    if (vadded >= volume_titrant && runonce) {
      console.log("change colour");
      changetint = aftercolour;
      shownext=true;
      runonce = false;

    }
    if (darkness <= 255 && runonce == false) {
      darkness += 10;

    }

  }
}

function funflasktouched() {


  let shakingRotationOffset = sin(shakingRotation) * 6;
  push();
  //image(flaskImgbk, flaskX, flaskY, flaskwidth, flaskheight);


  translate(width / 2, 14 * size + 4 * size / 2);
  rotate(radians(shakingRotationOffset));
  image(flaskImgbk, flaskX - width / 2, flaskY - 16 * size, flaskwidth, flaskheight);
  //image(flaskImg, -3.3 * size, -4 * size / 2, 7 * size, 8 * size);

  // tint(changetint);
  // image(bottomImg, flaskX - width / 2, flaskY - 16 * size, flaskwidth, flaskheight);
  // pop();
  // image(croppedImg, flaskX - width / 2, flaskY - 16 * size, flaskwidth, waterlevel);
  // pop();
  

  push();
  tint(changetint);
  if (waterheight < flaskheight) {
    let c = bottomImg.get(0, flaskheight - waterheight , flaskwidth, flaskheight);
    image(c, flaskX - width / 2, flaskY+flaskheight - waterheight-(16 * size));
  } else {
    // If waterheight exceeds flaskheight, draw the entire image without cropping
    image(bottomImg, flaskX - width / 2, flaskY+flaskheight - waterheight);
  }
  //croppedImg.copy(bottomImg,flaskX, cropY, flaskwidth, cropHeight, 0, 0, flaskwidth, flaskheight);

  pop();
  image(flaskImg, flaskX - width / 2, flaskY - 16 * size, flaskwidth, flaskheight);
  pop();
  shakingRotation += shakingRotationSpeed;
}

//This function displays the gif for making the simulation more realistic
// ... Your existing JS code ...

// function particalmov() {
//   gifImage.show();
//   let pick = random(1, 5);
//   let gifX = floor(flaskX + 1 * size + 1 * pick + canvasLocation.x);
//   let gifY = floor(cropHeight + 14.5 * size + canvasLocation.y);
//   gifImage.position(gifX, gifY);
//   if (cropHeight > 43) {
//     gifImage.style('clip', `rect(0px, ${floor(flaskwidth / 2 + 1 * pick)}px, ${floor(6* size - cropHeight)}px,0px)`);
//   }
//   else {
//     let pick = random(1, 3);
//     gifImage.style('clip', `rect(0px, ${floor(flaskwidth / 2 + 1 * pick - 10)}px, ${floor(5.5 * size - cropHeight)}px,0px)`);
//   }
// }

function start() {

  // Get the location of the canvas

  if (turnslideractive == true) {
    cropHeight = flaskheight - volume_titrate * 0.8 * size;
    turnslideractive = false;
    setup();
  }

  //
  buretesize = buretesize + 0.1;
  normality_titrant = var3;
  console.log("Normality =", normality_titrant,"");
  //Calculating the height for change colour
  volume_titrant = var4;
  console.log("Normality", normality_titrant," ",normality_titrate," ",volume_titrant," ",volume_titrate);
  bureteTouched = !bureteTouched;

  setInterval(addLiquidDrop, liquidDropInterval);
  // slider2.attribute('disabled', true);
  // slider3.attribute('disabled', true);


}
function shake() {
  flaskTouched = !flaskTouched;

}
function drawppt(){
    
  size_vary = Math.floor(random(0.2152,0.2511)*size);
  size_vary2 = Math.floor(random(0.2152,0.2511)*size);
  frameRate(30); 
  fill(170, 74, 68,255);  // Set the fill color to red
  noStroke(); 
  const upperBound = Math.floor(random(1,2)+number*1.25-5) ;



  for (let i = 0; i < upperBound*6; i++) {

    variation = Math.floor(random(-1.4349,1.4349)*size);
    variation2 = Math.floor(random(0.1793,0.3587)*size);

    ellipse(flaskX+variation+1.8*size,flaskY+variation2+3.9*size, size_vary/4, size_vary2/4);
    }
}
function nextpressed() {
  window.location.href = 'TitrationComp.php';
}


