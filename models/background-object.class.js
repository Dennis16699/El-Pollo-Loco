class BackgroundObject extends MovableObject {

    width = 720;
    height = 550;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}