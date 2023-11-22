class Bottles extends DrawableObject {
    x = 50;
    y = 50;
    height = 86;
    width = 80;
    
    /**
     * Offset values for the object to adjust its position or collision boundaries.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset =  {
        top: 30,
        left: 30,
        right: 30, 
        bottom: 20
    }

    /**
     * Constructs a new instance of the object, loading its image and setting a random position.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = 450 + Math.random() * 5100;
        this.y = 120 + Math.random() * 130;
    }
}