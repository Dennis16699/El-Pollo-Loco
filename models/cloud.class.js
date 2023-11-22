class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;


    /**
     * Constructs a new Cloud instance, loads the cloud image, and sets up its initial position.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png'); // Loads the cloud image
        this.x = Math.random() * 500; // Sets a random horizontal position for the cloud
        this.animate(); // Starts the cloud animation
    }

    /**
     * Handles the movement of the cloud across the screen.
     */
    animate() {
        this.moveLeft(); // Moves the cloud to the left
    }
}