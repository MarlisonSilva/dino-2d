var mushs = 0;
var timing = 0;
var setedFoods = [];
var paused = true;
var foods = document.querySelectorAll('.food');
var score = 0;


function resizedScreen() {
    paused = true;
    modalPause();

}

function pause(){
    if(paused){
        paused = false;
        fallingFood();
        modalPause();

    } else {
        paused = true;
        modalPause();
    
    }

}

function restart() {
    location.reload();
}

function modalPause() {
    const modal = document.querySelector('#modal-pause-game').style;
    const modalScore = document.querySelector('#modal-score');
    const modalTitle = document.querySelector('#modal-title');

    if(!paused){
        modal.visibility = 'hidden';
    } else {
        modal.visibility = 'visible';
        modalTitle.innerHTML = 'Paused';
        modalScore.innerHTML = 'Score: ' + score;

    }

}

function fallingFood() {
    
    if (!paused){
        if (timing < 400) {
            if (mushs < 20 && (Number.isInteger(timing / 20))) {
                
                // Gerador de número de 0 a 9
                var posFood = Math.floor(Math.random() * 10);
                // Positioning foods
                console.log(posFood)
                foods[mushs].style.left = ((posFood * 10) + 'vw');
                console.log(foods[mushs].style.left)

                setedFoods = [...setedFoods, foods[mushs]];
                mushs++;
            }
    
            timing++;
        }
    
        // Falling  
        var posY  = [];
        var rowPosY = [];
        for (let i = 0; i < setedFoods.length; i++) {
            posY[i] = setedFoods[i].style.top;
            rowPosY[i] = posY[i].substring(0, posY[i].length-2);
            if(String(parseInt(rowPosY[i])) == "NaN"){
                setedFoods[i].style.top = '-100px';
    
            } else { 
                if (rowPosY[i] < ($(window).height() - 30)) {
                    setedFoods[i].style.top = parseInt(rowPosY[i])+25 + 'px';
                } else {
                    setedFoods[i].style.left = '-100px';
                }
                
            }
    
        }
    
        getCollectedFoods();
        setTimeout(fallingFood, 100);

    }
}

function getCollectedFoods() {
    const dino = document.querySelector('#dino');
    const playerBounding = dino.getBoundingClientRect();
    const scoreboard = document.querySelector('#scoreboard');
    let collectedFoods = [];
    


    for (let i = 0; i < foods.length; i++) {
        const foodBounding = foods[i].getBoundingClientRect();

        if (!(playerBounding.right < foodBounding.left ||
            playerBounding.left > foodBounding.right ||
            playerBounding.bottom < foodBounding.top ||
            playerBounding.top > foodBounding.bottom)) {
            // collectedFoods = [...collectedFoods, food];  Adiciona o elemento atual ao array de elementos sobrepostos
            foods[i].src = "assets/images/object/Mushroom_eaten.png";
            score++;
            scoreboard.innerHTML = "Score: "+score;
        }

    }

    return collectedFoods; // Retorna o array de elementos sobrepostos
}


function music() {    
    const music = document.body.querySelector('#music');
    if (music.paused) {
        music.volume = 0.2;
        music.play();
    } else {
        music.volume = 0.2;
        music.pause();
    }

}

var viewport = 'desktop';
var x = 0;
var y = 0;
var speed = 2;
var limiteScreen = 90; //0 - 100
const dino = document.body.querySelector('#dino');
var clicks = 0;

// COMPUTER

document.addEventListener('keydown', (e) => {
    if (!paused) {
        var viewportWidth = $(window).width();
        if (viewportWidth < 400) {
            speed = 5;
            limiteScreen = 70;
        } else if (viewportWidth < 800) {
            speed = 4.5;
            limiteScreen = 82;
        } else if (viewportWidth < 1200) {
            speed = 4;
            limiteScreen = 85;
        }

        if (e.code === "ArrowRight" || e.code === "KeyD" ) {
            dino.classList.remove('left');
            if (x < limiteScreen) {
                x += speed;
                dino.style.left = (x + 'vw');
            }
    
        } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
            dino.classList.add('left');
    
            if (x > 0) {
                x -= speed;
                dino.style.left = (x + 'vw');
            }
        }
    
    
        if ((e.code === "ArrowLeft" || e.code === "ArrowRight") || (e.code === "KeyA" || e.code === "KeyD")) {
            if (clicks == 0) {
                dino.src = "assets/images/dino/Run-1.png";
                clicks++;
            } else if (clicks == 1) {
                dino.src = "assets/images/dino/Run-2.png";
                clicks++;
            } else if (clicks == 2) {
                dino.src = "assets/images/dino/Run-3.png";
                clicks++;
            } else {
                dino.src = "assets/images/dino/Run-4.png";
                clicks = 0;
            }

        } else if(e.code === "Space") {
            dino.src = "assets/images/dino/Idle.png";
            pause();
        } else {
            dino.src = "assets/images/dino/Idle.png";
    
        }
    
    }
    

});


// MOBILE
document.body.querySelector('#arrow-left').onclick = function(){
    let key = "ArrowLeft";
    movement(key);
};

document.body.querySelector('#arrow-right').onclick = function(){
    let key = "ArrowRight";
    movement(key);
};

function movement(key) {
    if (key === "ArrowRight") {
        dino.classList.remove('left');
        x += 25;
        dino.style.left = (x + 'px');

    } else if (e.code === "ArrowLeft") {
        dino.classList.add('left');
        x -= 25;
        dino.style.left = (x + 'px');

    }

    if (key === "ArrowLeft" || key === "ArrowRight") {
        if (clicks == 0) {
            dino.src = "assets/images/dino/Run-1.png";

            clicks++;
        } else if (clicks == 1) {
            dino.src = "assets/images/dino/Run-2.png";

            clicks++;
        } else if (clicks == 2) {
            dino.src = "assets/images/dino/Run-3.png";

            clicks++;
        } else {
            dino.src = "assets/images/dino/Run-4.png";

            clicks = 0;
        }
    }
}