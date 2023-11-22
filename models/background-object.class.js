class BackgroundObject extends MovableObject {

    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 550;

    /**
     * Constructs a new BackgroundObject instance.
     * 
     * @param {string} imagePath - The path to the image file for this background object.
     * @param {number} x - The horizontal position of the background object in the game world.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x; // The horizontal position of the background object
        this.y = 480 - this.height; // The vertical position, calculated based on the object's height
    }
}