class Coins extends MovableObject {
    x = 50;
    y = 50;
    height = 120;
    width = 120;

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

    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.imagesCoin);
        this.x = 450 + Math.random() * 5000;
        this.y = 120 + Math.random() * 130;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesCoin);
        }, 200);
    }
}