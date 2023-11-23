class Character extends MovableObject {
    height = 230;
    y = 135;
    speed = 20;
    world;
    walkingSound = new Audio('audio/Walking.mp3');
    hurtSound = new Audio('audio/Hurt.mp3');
    deathSound = new Audio('audio/Dead.mp3');
    movementAnimate;
    idleActions;
    movemetActions;

    offset =  {
        top: 10,
        left: 20,
        right: 20, 
        bottom: 10
    };

    // Arrays of image paths for different character animations
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDIE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Constructs a new Character instance, loads images for various states, and sets up gravity and animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDIE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();   
        this.stopInterval(); 
    }

    /**
     * Handles the animation loop for the character.
     */
    animate() {
        this.movemetActions = setInterval(() => {this.movement()}, 40);
        this.idleActions = setInterval(() => {this.checkForAction()}, 1000);
        
        this.movementAnimate =
        setInterval(() => {
            this.walkingSound.pause();
            if(this.isDead()) {
                this.characterDeadActions();
            } else if(this.isHurt()) {
                this.characterHurtActions();
            } else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            } else {
                if(this.world.keyboard.right || this.world.keyboard.left) {
                    this.playAnimation(this.IMAGES_WALKING);}
            }
        }, 80);
    }

    /**
     * Executes actions when the character is dead.
     */
    characterDeadActions() {
        if(this.world.audioVolume == true){
            this.deathSound.play();
        }
        this.playAnimation(this.IMAGES_DEAD);
        stopGame();
        setTimeout(() => {
            this.walkingSound.pause();
            document.getElementById('gameOverScreen').style.display = "flex";
        }, 1000);
    }

    /**
     * Executes actions when the character is hurt.
     */
    characterHurtActions() {
        if(this.world.audioVolume == true){
            this.hurtSound.play();
        }
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Stops the animation intervals when the character is dead.
     */
    stopInterval() {
        setInterval(() => {
            if(this.isDead()) {
                clearInterval(this.movementAnimate, this.idleActions, this.idleActions);
            }
        }, 80);
    }

    /**
     * Handles character movement based on keyboard inputs.
     */
    movement() {
        if(this.world.keyboard.right && this.x < this.world.level.levelEndX) {
            this.characterMoveRight();
        }
        if(this.world.keyboard.left && this.x > - 500) {
            this.characterMoveLeft();
        }
        if(this.world.keyboard.up && !this.isAboveGround()) {
            this.jump();
        }
        this.world.cameraX = -this.x + 100;
    }

    /**
     * Moves the character to the right.
     */
    characterMoveRight() {
        this.moveRight();
        this.otherDirection = false;
        if(!this.isAboveGround() && this.audioVolume == true){
            this.walkingSound.play();
        }
    }

    /**
     * Moves the character to the left.
     */
    characterMoveLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if(!this.isAboveGround() && this.audioVolume == true){
            this.walkingSound.play();
        }
    }

    /**
     * Checks the last key press to determine if the character should perform idle or long idle actions.
     */
    checkForAction() {
        let currentTime = new Date().getTime();
        if((currentTime - this.world.keyboard.lastKeyPress) > 100 && (currentTime - this.world.keyboard.lastKeyPress) < 3000) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if((currentTime - this.world.keyboard.lastKeyPress) > 3000) {
            this.playAnimation(this.IMAGES_LONG_IDIE);
        }
    };
}