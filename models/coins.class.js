class Coins extends MovableObject {
    x = 50;
    y = 50;
    height = 120;
    width = 120;

    // Array of image paths for coin animation
    imagesCoin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset =  {
        top: 50,
        left: 50,
        right: 50, 
        bottom: 50
    }

    /**
     * Constructs a new Coins instance, loads coin images, and sets up its initial position and animation.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.imagesCoin);
        this.x = 450 + Math.random() * 5000;
        this.y = 120 + Math.random() * 130;
        this.animate();
    }

    /**
     * Handles the animation of the coin, cycling through its images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesCoin);
        }, 200);
    }
}