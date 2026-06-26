let ducks;

let duckCount = 1;

let duckImageNames = ['duck-left.gif', 'duck-right.gif'] // აქ გავჩერდი 6 : 52

let duckWidth = 96;

let duckHeight = 93;

let duckVelocityX = 5;

let duckVelocityY = 5;


let gameWidth = window.screen.width;

let gameHeight = window.screen.height * 3 / 4;

let score = 0;


window.onload = function () {

      this.setTimeout(addDucks, 2000);

      setInterval(moveDucks, 1000 / 60);  // 60 frames per second

}

function addDucks() {

      ducks = [];

      duckCount = Math.floor(Math.random()*2) + 1;  // 1 - 2

      for (let i = 0; i < duckCount; i++) {

            let duckImageName = duckImageNames[Math.floor(Math.random() * 2)]; // 0 - 1 

            // <img>

            let duckImage = document.createElement("img");

            duckImage.src = duckImageName;

            duckImage.width = duckWidth;

            duckImage.height = duckHeight;

            duckImage.draggable = false;

            duckImage.style.position = "absolute";

            duckImage.onclick = function () {

                  let duckShotSound = new Audio ("duck-shot.mp3");
                  
                  duckShotSound.play();

                  score += 1;

                  document.getElementById("score").innerHTML = score;

                  document.body.removeChild(this);

                  let remainingDucks = [];

                  for (let i = 0; i < ducks.length; i ++) {

                        if (ducks[i].image != this) {

                              remainingDucks.push(ducks[i]);

                        }

                  }

                  ducks = remainingDucks;

                  if (ducks.length == 0) {

                        addDog();

                  } 

            }

            document.body.appendChild(duckImage);

            let duck = {

                  image: duckImage,

                  x: randomPosition(gameWidth - duckWidth),

                  y: randomPosition(gameHeight - duckHeight),                  // აქ გავჩერდი 15 : 08

                  velocityX: duckVelocityX,

                  velocityY: duckVelocityY

            };

            duck.image.style.left = String(duck.x) + "px"; // x position
            duck.image.style.top = String(duck.y) + "px"; // y position

            if (duck.image.src.includes(duckImageNames[0])) {

                  duck.velocityX = -duckVelocityX;

            }

            ducks.push(duck);

      }

}



function moveDucks() {

      for (let i = 0; i < ducks.length; i++) {

            let duck = ducks[i];

            duck.x += duck.velocityX;

            if (duck.x < 0 || duck.x + duckWidth > gameWidth) {               // აქ გავჩერდი 23 : 48

                  duck.x -= duck.velocityX;

                  duck.velocityX *= -1;

                  if (duck.velocityX < 0) {

                        duck.image.src = duckImageNames[0];  // Left

                  }

                  else {

                        duck.image.src = duckImageNames[1];       // Right

                  }

            }

            duck.y += duck.velocityY;

            if (duck.y < 0 || duck.y + duckHeight > gameHeight) {

                  duck.y -= duck.velocityY;

                  duck.velocityY *= -1;

            }

            duck.image.style.left = String(duck.x) + "px";

            duck.image.style.top = String(duck.y) + "px";

      }

}



// function moveDucks() {
//       for (let i = 0; i < ducks.length; i++) {
//             let duck = ducks[i];
//             duck.x += duck.velocityX;
//             if (duck.x < 0 || duck.x + duckWidth > gameWidth) {
//                   duck.x -= duck.velocityX;
//                   // duck.velocityX *= -1;
//                   // if (duck.velocityX < 0) {
//                   //     duck.image.src = duckImageNames[0]; 
//                   // } else {
//                   //     duck.image.src = duckImageNames[1]; 
//                   // }
//             }
//             duck.y += duck.velocityY;
//             if (duck.y < 0 || duck.y + duckHeight > gameHeight) {
//                   duck.y -= duck.velocityY;
//                   // duck.velocityY *= -1;
//             }
//             duck.image.style.left = String(duck.x) + "px";
//             duck.image.style.top = String(duck.y) + "px";
//       }
// }

function addDog () {

      let dogImage = document.createElement("img");

      if (duckCount == 1) {

            dogImage.src = "dog-duck1.png";

            dogImage.width = 172;

      }

      else {

            dogImage.src = "dog-duck2.png";

            dogImage.width = 224;

      }

      dogImage.height = 152;

      dogImage.draggable = false;

      dogImage.style.position = "fixed";

      dogImage.style.bottom = "0px";

      dogImage.style.left = "50%";

      document.body.appendChild(dogImage);

      let dogScoreSound = new Audio("dog-score.mp3");

      dogScoreSound.play();

      setTimeout(function () {

            document.body.removeChild(dogImage);

            addDucks();

      }, 5000);

}

function randomPosition(limit) {

      return Math.floor(Math.random() * limit);

}






