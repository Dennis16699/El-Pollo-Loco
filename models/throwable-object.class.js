class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 30;
    level = level1;
    otherDirection;
    bottleBurst = new Audio('audio/BottleBurst.mp3');
    intervalIds = [];
    checkForHitInterval;
    throwInterval;

    // Arrays of image paths for different animations
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset =  {
        top: 10,
        left: 20,
        right: 20, 
        bottom: 10
    };

    /**
     * Constructs a new ThrowableObject instance, loads images for various states, and initializes its position, size, and throwing direction.
     * @param {number} x - The horizontal position where the object is thrown from.
     * @param {number} y - The vertical position where the object is thrown from.
     * @param {boolean} direction - The direction in which the object is thrown.
     */
    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = direction;
        this.height = 80;
        this.width = 60;
        this.bottleHit = false;
        this.speedY = 28;
        this.acceleration = 3;
        this.animate();
        this.stopInterval();
    }

    /**
     * Handles the animation and mechanics of the throwable object.
     */
    animate() {
        this.bottleBurst.pause();
        this.throw();

        this.checkForHitInterval =
        setInterval(() => {
            if(this.bottleHit == true || this.y > 345) {
                if(this.audioVolume == true) {
                    this.bottleBurst.play();
                }
                this.playAnimation(this.IMAGES_SPLASH);
                this.bottleBurst = false;
                this.speedY = 0;
                this.acceleration = 0;
                setTimeout(() => {
                    this.x = 0;
                    this.y = -100;
                }, 150);
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 80);
    }

    /**
     * Initiates the throwing action applying gravity and forward momentum.
     */
    throw() {
        this.applyGravity();

        this.throwInterval = 
        setInterval(() => {
            this.throwAcceleration();
        }, 40);
    }   

    /**
     * Adjusts the horizontal position based on the throwing direction.
     */
    throwAcceleration() {
            if(this.otherDirection == true) {
                this.x -= 12;
            } else {
                this.x += 12;
            }
    }

    /**
     * Stops the animation and mechanics intervals when certain conditions are met.
     */
    stopInterval() {
        setInterval(() => {
            if(this.bottleHit == true || this.y > 345) {
                clearInterval(this.checkForHitInterval)
                clearInterval(this.throwInterval);
            };
        }, 80)
    }
    
}