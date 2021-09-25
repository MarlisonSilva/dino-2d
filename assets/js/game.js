var mushs = 0;
var timing = 0;
var setedFoods = [];
var paused = true;
var foods = document.querySelectorAll('.food');
var score = 0;

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
            console.log(timing)
            if (mushs < 20 && (Number.isInteger(timing / 20))) {
                
                // Gerador de número de 0 a 9
                var posFood = Math.floor(Math.random() * 10);
                // Positioning foods
                foods[mushs].style.left = ((posFood * 100 + 100) + 'px');
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
            console.log(rowPosY[i])
            if(String(parseInt(rowPosY[i])) == "NaN"){
                console.log('NaaaN')
                setedFoods[i].style.top = '-100px';
    
            } else{
                setedFoods[i].style.top = parseInt(rowPosY[i])+25 + 'px';
    
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
            foods[i].src = "assets/images/object/Bush (4).png";
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

var x = 0;
var y = 0;

const dino = document.body.querySelector('#dino');
var clicks = 0;

// COMPUTER

document.addEventListener('keydown', (e) => {
    if (!paused) {
        if (e.code === "ArrowRight") {
            dino.classList.remove('left');
            if (x < 1700) {
                x += 25;
                dino.style.left = (x + 'px');
            }
    
        } else if (e.code === "ArrowLeft") {
            dino.classList.add('left');
    
            if (x > 0) {
                x -= 25;
                dino.style.left = (x + 'px');
            }
        }
    
    
        if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
            if (clicks == 0) {
                dino.src = "assets/images/dino/Run (1).png";
                clicks++;
            } else if (clicks == 1) {
                dino.src = "assets/images/dino/Run (3).png";
                clicks++;
            } else if (clicks == 2) {
                dino.src = "assets/images/dino/Run (5).png";
                clicks++;
            } else {
                dino.src = "assets/images/dino/Run (7).png";
                clicks = 0;
            }
        } else {
            dino.src = "assets/images/dino/Idle (1).png";
    
        }
    
    }
    

});


// MOBILE

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
            dino.src = "assets/images/dino/Run (1).png";

            clicks++;
        } else if (clicks == 1) {
            dino.src = "assets/images/dino/Run (3).png";

            clicks++;
        } else if (clicks == 2) {
            dino.src = "assets/images/dino/Run (5).png";

            clicks++;
        } else {
            dino.src = "assets/images/dino/Run (7).png";

            clicks = 0;
        }
    }
}