class Chicken extends MovableObject {
    y = 335;
    height = 80;
    width = 90;
    chickenDieSound = new Audio('audio/Chicken.mp3');
    animationInterval;
    
    imagesWalking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    imagesDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    offset =  {
        top: 5,
        left: 0,
        right: 0, 
        bottom: 5
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.x = 450 + Math.random() * 5100;
        this.speed = 3 + Math.random() * 1.5;
        this.audioVolume;  
        this.animate();
        this.checkDeadChicken();  
    }

    animate() {
        this.animationInterval = 
        setInterval(() => {
            this.animations()
        }, 100);
    }

    animations() {
        if(this.speed == 0) {
            this.playAnimation(this.imagesDead);
            if(this.audioVolume == true) {
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

    checkDeadChicken() {
        setInterval(() => {
            if(this.speed == 0) {
                clearInterval(this.animationInterval);
            } 
        }, 100);
    }
}