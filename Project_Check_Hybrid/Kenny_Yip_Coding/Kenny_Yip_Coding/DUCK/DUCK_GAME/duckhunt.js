let ducks = [];

let duckCount = 1;

let duckImageNames = ['duck-left.gif', 'duck-right.gif'];

let duckWidth = 96;
let duckHeight = 93;

let duckVelocityX = 5;
let duckVelocityY = 5;

let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;

let score = 0;


// MOBILE RESPONSIVE SIZES
function updateGameSize() {

    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;

    // Smaller ducks on phones
    if (gameWidth < 768) {

        duckWidth = 60;
        duckHeight = 58;

        duckVelocityX = 3;
        duckVelocityY = 3;

    } else {

        duckWidth = 96;
        duckHeight = 93;

        duckVelocityX = 5;
        duckVelocityY = 5;
    }
}


window.onload = function () {

    updateGameSize();

    setTimeout(addDucks, 2000);

    setInterval(moveDucks, 1000 / 60);
}


// Resize support
window.addEventListener("resize", function () {

    updateGameSize();

});


function addDucks() {

    ducks = [];

    duckCount = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < duckCount; i++) {

        let duckImageName = duckImageNames[Math.floor(Math.random() * 2)];

        let duckImage = document.createElement("img");

        duckImage.src = duckImageName;

        duckImage.width = duckWidth;
        duckImage.height = duckHeight;

        duckImage.draggable = false;

        duckImage.style.position = "absolute";

        // Prevent image selection on mobile
        duckImage.style.userSelect = "none";
        duckImage.style.webkitUserSelect = "none";

        // TOUCH + CLICK SUPPORT
        duckImage.addEventListener("click", duckHit);
        duckImage.addEventListener("touchstart", duckHit);

        function duckHit(event) {

            event.preventDefault();

            let duckShotSound = new Audio("duck-shot.mp3");
            duckShotSound.play();

            score += 1;

            document.getElementById("score").innerHTML = score;

            if (duckImage.parentNode) {
                document.body.removeChild(duckImage);
            }

            let remainingDucks = [];

            for (let j = 0; j < ducks.length; j++) {

                if (ducks[j].image != duckImage) {
                    remainingDucks.push(ducks[j]);
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

            y: randomPosition(gameHeight - duckHeight - 120),

            velocityX: duckVelocityX,

            velocityY: duckVelocityY
        };

        duck.image.style.left = duck.x + "px";
        duck.image.style.top = duck.y + "px";


        // LEFT MOVEMENT
        if (duck.image.src.includes(duckImageNames[0])) {

            duck.velocityX = -duckVelocityX;
        }

        ducks.push(duck);
    }
}


function moveDucks() {

    for (let i = 0; i < ducks.length; i++) {

        let duck = ducks[i];

        // MOVE X
        duck.x += duck.velocityX;

        if (duck.x < 0 || duck.x + duckWidth > gameWidth) {

            duck.x -= duck.velocityX;

            duck.velocityX *= -1;

            // CHANGE IMAGE DIRECTION
            if (duck.velocityX < 0) {

                duck.image.src = duckImageNames[0];

            } else {

                duck.image.src = duckImageNames[1];
            }
        }


        // MOVE Y
        duck.y += duck.velocityY;

        if (duck.y < 0 || duck.y + duckHeight > gameHeight) {

            duck.y -= duck.velocityY;

            duck.velocityY *= -1;
        }

        duck.image.style.left = duck.x + "px";
        duck.image.style.top = duck.y + "px";
    }
}


function addDog() {

    let dogImage = document.createElement("img");

    if (duckCount == 1) {

        dogImage.src = "dog-duck1.png";

        dogImage.width = gameWidth < 768 ? 120 : 172;

    } else {

        dogImage.src = "dog-duck2.png";

        dogImage.width = gameWidth < 768 ? 150 : 224;
    }

    dogImage.height = gameWidth < 768 ? 100 : 152;

    dogImage.draggable = false;

    dogImage.style.position = "fixed";

    dogImage.style.bottom = "0px";

    dogImage.style.left = "50%";

    dogImage.style.transform = "translateX(-50%)";

    document.body.appendChild(dogImage);

    let dogScoreSound = new Audio("dog-score.mp3");

    dogScoreSound.play();

    setTimeout(function () {

        if (dogImage.parentNode) {
            document.body.removeChild(dogImage);
        }

        addDucks();

    }, 3000);
}


function randomPosition(limit) {

    return Math.floor(Math.random() * limit);
}