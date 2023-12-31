class Endboss extends MovableObject {
    height = 350;
    width = 300;
    y = 80;
    animateEndboss;
    nearEndboss = false;
    attackRangeEndboss = false;
    dieEndbossSound = new Audio('audio/EndbossCicken.mp3');

    // Arrays of image paths for different Endboss animations
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = {
        top: 30,
        left: 20,
        right: 0,
        bottom: 20
    }

    firstContact = false;

    /**
     * Constructs a new Endboss instance, loads images for various states, and sets up movement and animation.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 6050;
        this.speed = 25;
        this.animate();
        this.stopInterval();
    }

    /**
     * Handles the animation loop for the Endboss.
     */
    animate() {
        this.animateEndboss =
            setInterval(() => {
                this.animations()
            }, 500);
    }

    /**
     * Manages animations based on the Endboss's state (walking, alert, attacking, hurt, or dead).
     */
    animations() {
        if (this.isDeadEndboss()) {
            this.endbossDeadActions();
        } else if (this.isHurtEndboss()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.nearEndboss && !this.isHurtEndboss()) {
            this.moveLeft();
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Executes actions when the Endboss is dead.
     */
    endbossDeadActions() {
        if (this.audioVolume == true) {
            this.dieEndbossSound.play();
        }
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            stopGame();
            document.getElementById('gameWonScreen').style.display = "flex";
        }, 1200);
    }

    /**
     * Stops the animation intervals when the Endboss is dead.
     */
    stopInterval() {
        setInterval(() => {
            if (this.isDeadEndboss()) {
                clearInterval(this.animateEndboss);
            }
        }, 500);
    }

    /**
     * Checks if the Endboss is dead.
     * @returns {boolean} True if the Endboss is dead, false otherwise.
     */
    isDeadEndboss() {
        return this.energyEndboss == 0;
    }
}