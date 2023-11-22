let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let movableObject = new MovableObject();
let fullSize = false;
let loading = false;
let audioVolume = false;


function showToolTip() {
    setTimeout(() => {
        let toolTip = document.getElementById('toolTip');
        toolTip.className = "show";
        setTimeout(function () { toolTip.className = toolTip.className.replace("show", ""); }, 5500);
    }, 2000);
}


async function startGame() {
    document.getElementById('loader-wrapper').style.display = 'flex';
    document.getElementById('startGame').style.display = 'none';
    if(!loading) {
        loading = true;
        await init();
        loading = false;
        setTimeout(() => {
            document.getElementById('startScreen').style.backgroundImage = 'none';
            document.getElementById('startGameContainer').style.display = 'none';
            document.getElementById('loader-wrapper').style.display = 'none';
            document.getElementById('toolTip').style.visibility = "hidden";
        }, 1000);
    }
}


async function init() {
    await levels();
    await setElements();
}


async function setElements() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, audioVolume);
    keyboard.lastKeyPress = new Date().getTime();
}


async function mute() {
    try {
        let isPlaying = !document.getElementById("gameSoundtrack").paused;
        toggleIcon(isPlaying);
        audioVolume = toggleSoundtrack(isPlaying);
        world.audioVolume = audioVolume;
    } catch(e) {
    }
}

function toggleIcon(isPlaying) {
    let soundIcon = document.getElementById('sound');
    soundIcon.src = isPlaying ? 'img/10_icons/mute.svg' : 'img/10_icons/volume.svg';
}

function toggleSoundtrack(isPlaying) {
    let gameSoundtrack = document.getElementById("gameSoundtrack");
    if (isPlaying) {
        gameSoundtrack.pause();
    } else {
        gameSoundtrack.play();
    }
    return !isPlaying;
}


function fullScreen() {
    let gameContainer = document.getElementById('gameContainer');
    let canvas = document.getElementById('canvas');

    if(fullSize == false) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        enterFullscreen(gameContainer);
        fullSize = true;
    } else {
        canvas.style.width = '720px';
        canvas.style.height = '480px';
        exitFullscreen();
        fullSize = false;
    }
}


function enterFullscreen(gameContainer) {
    if(document.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {      
        gameContainer.msRequestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {   
        gameContainer.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
    }
}


function showControls() {
    document.getElementById('controls').style.display = "flex";
}


function closeControls() {
    document.getElementById('controls').style.display = "none";
}


window.addEventListener('keydown', (event) => {
    if(event.keyCode == 37 || event.keyCode == 65) {
        keyboard.left = true;
    }

    if(event.keyCode == 39 || event.keyCode == 68) {
        keyboard.right = true;
    }

    if(event.keyCode == 38 || event.keyCode == 87) {
        keyboard.up = true;
    }

    if(event.keyCode == 40 || event.keyCode == 83) {
        keyboard.down = true;
    }

    if(event.keyCode == 32 || event.keyCode == 69) {
        keyboard.throw = true;
    }
});


window.addEventListener('keyup', (event) => {
    if(event.keyCode == 37 || event.keyCode == 65) {
        keyboard.left = false;
        keyboard.lastKeyPress = new Date().getTime();
    }

    if(event.keyCode == 39 || event.keyCode == 68) {
        keyboard.right = false;
        keyboard.lastKeyPress = new Date().getTime();
    }

    if(event.keyCode == 38 || event.keyCode == 87) {
        keyboard.up = false;
        keyboard.lastKeyPress = new Date().getTime();
    }

    if(event.keyCode == 40 || event.keyCode == 83) {
        keyboard.down = false;
        keyboard.lastKeyPress = new Date().getTime();
    }

    if(event.keyCode == 32 || event.keyCode == 69) {
        keyboard.throw = false;
        keyboard.lastKeyPress = new Date().getTime();
    }
});


function bindBtsPressEvents() {
    let walkLeft = document.getElementById('walkLeft');
    let walkRight = document.getElementById('walkRight');
    let jump = document.getElementById('jump');
    let throwBottle = document.getElementById('throwBottle');

    walkLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    });

    walkLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
        keyboard.lastKeyPress = new Date().getTime();
    });

    walkRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    });

    walkRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
        keyboard.lastKeyPress = new Date().getTime();
    });

    jump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.up = true;
    });

    jump.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.up = false;
        keyboard.lastKeyPress = new Date().getTime();
    });

    throwBottle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.throw = true;
    });

    throwBottle.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.throw = false;
        keyboard.lastKeyPress = new Date().getTime();
    });
}


function restartGame(id) {
    world.ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
    document.getElementById(id).style.display = "none";
}


function toMainMenue(id) {
    world.ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('startScreen').style.backgroundImage = "url('img/9_intro_outro_screens/start/startscreen_1.png')";
    document.getElementById('startGameContainer').style.display = 'flex';
    document.getElementById('startGame').style.display = 'block';
    document.getElementById(id).style.display = "none";
}


function stopGame() {
    clearAllIntervals();
    document.getElementById("gameSoundtrack").pause();
    let soundIcon = document.getElementById('sound');
    soundIcon.src = 'img/10_icons/mute.svg';
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}