let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let movableObject = new MovableObject();
let fullSize = false;
let loading = false;
let audioVolume = false;


/**
 * Shows a tooltip with a delay and hides it after a certain time.
 */
function showToolTip() {
    setTimeout(() => {
        let toolTip = document.getElementById('toolTip');
        toolTip.className = "show";
        setTimeout(function () { toolTip.className = toolTip.className.replace("show", ""); }, 5500);
    }, 2000);
}

/**
 * Starts the game by initializing components and hiding the start screen.
 */
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

/**
 * Initializes the game by setting up levels and elements.
 */
async function init() {
    await levels();
    await setElements();
}

/**
 * Sets up essential elements for the game, such as the canvas and the world.
 */
async function setElements() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, audioVolume);
    keyboard.lastKeyPress = new Date().getTime();
}

/**
 * Toggles the mute state of the game's soundtrack.
 */
async function mute() {
    try {
        let isPlaying = !document.getElementById("gameSoundtrack").paused;
        toggleIcon(isPlaying);
        audioVolume = toggleSoundtrack(isPlaying);
        world.audioVolume = audioVolume;
    } catch(e) {
    }
}

/**
 * Toggles the icon of the sound button based on the playing state.
 * @param {boolean} isPlaying - Indicates if the soundtrack is currently playing.
 */
function toggleIcon(isPlaying) {
    let soundIcon = document.getElementById('sound');
    soundIcon.src = isPlaying ? 'img/10_icons/mute.svg' : 'img/10_icons/volume.svg';
}

/**
 * Toggles the state of the game soundtrack between playing and paused.
 * @param {boolean} isPlaying - Indicates if the soundtrack is currently playing.
 * @returns {boolean} The new state of the soundtrack.
 */
function toggleSoundtrack(isPlaying) {
    let gameSoundtrack = document.getElementById("gameSoundtrack");
    if (isPlaying) {
        gameSoundtrack.pause();
    } else {
        gameSoundtrack.play();
    }
    return !isPlaying;
}

/**
 * Toggles between full screen and normal screen mode for the game.
 */
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

/**
 * Enters full screen mode for the specified game container.
 * @param {HTMLElement} gameContainer - The container element to display in full screen.
 */
function enterFullscreen(gameContainer) {
    if(document.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {      
        gameContainer.msRequestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {   
        gameContainer.webkitRequestFullscreen();
    }
}

/**
 * Exits full screen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
    }
}

/**
 * Displays the game controls.
 */
function showControls() {
    document.getElementById('controls').style.display = "flex";
}

/**
 * Hides the game controls.
 */
function closeControls() {
    document.getElementById('controls').style.display = "none";
}

/**
 * Event listener for keydown events to handle keyboard controls.
 */
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

/**
 * Event listener for keydown events to handle keyboard controls.
 */
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

/**
 * Binds touch events to control buttons for mobile devices.
 */
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

/**
 * Restarts the game and hides the specified element.
 * @param {string} id - The ID of the element to hide.
 */
function restartGame(id) {
    world.ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
    document.getElementById(id).style.display = "none";
}

/**
 * Navigates back to the main menu and hides the specified element.
 * @param {string} id - The ID of the element to hide.
 */
function toMainMenue(id) {
    world.ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('startScreen').style.backgroundImage = "url('img/9_intro_outro_screens/start/startscreen_1.png')";
    document.getElementById('startGameContainer').style.display = 'flex';
    document.getElementById('startGame').style.display = 'block';
    document.getElementById(id).style.display = "none";
}

/**
 * Stops the game, clears all intervals, and mutes the soundtrack.
 */
function stopGame() {
    clearAllIntervals();
    document.getElementById("gameSoundtrack").pause();
    let soundIcon = document.getElementById('sound');
    soundIcon.src = 'img/10_icons/mute.svg';
}

/**
 * Clears all intervals set in the window.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}