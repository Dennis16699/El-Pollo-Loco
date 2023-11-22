class Bottles extends DrawableObject {
    x = 50;
    y = 50;
    height = 86;
    width = 80;
    
    offset =  {
        top: 30,
        left: 30,
        right: 30, 
        bottom: 20
    }

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = 450 + Math.random() * 5100;
        this.y = 120 + Math.random() * 130;
    }
}