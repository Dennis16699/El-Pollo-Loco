class ChickenSmall extends MovableObject {
    y = 355;
    height = 60;
    width = 70;
    chickenDieSound = new Audio('audio/Chicken.mp3');
    animationInterval;

    // Arrays of image paths for walking and dead animations
    imagesWalking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    imagesDead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    offset =  {
        top: 0,
        left: 0,
        right: 0, 
        bottom: 0
    };

    /**
     * Constructs a new ChickenSmall instance, loads images for various states, and sets up movement and animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.x = 450 + Math.random() * 5100;
        this.speed = 3 + Math.random() * 1.5;
        this.audioVolume;
        this.animate();
        this.checkDeadChicken();    
    }

    /**
     * Handles the animation loop for the small chicken.
     */
    animate() {
        this.animationInterval = 
        setInterval(() => {
            this.animations()
        }, 100);
    }

    /**
     * Manages animations based on the chicken's state (walking or dead).
     */
    animations() {
        if(this.speed == 0) {
            this.playAnimation(this.imagesDead);
            if(this.audioVolume == true){
                this.chickenDieSound.play();
            }
            setTimeout(() => {
                this.x = 0;
                this.y = -100;
                }, 1500);
        } else {
            this.moveLeft();
            this.playAnimation(this.imagesWalking);
        }
    }

    /**
     * Checks if the chicken is dead and clears the animation interval if so.
     */
    checkDeadChicken() {
        setInterval(() => {
            if(this.speed == 0) {
                clearInterval(this.animationInterval);
            } 
        }, 100);
    }
}