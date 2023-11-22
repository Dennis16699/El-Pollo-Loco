class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 215;
    height = 150;
    width = 100;
    percentage;

    /**
     * Loads an image from a given path.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Preloads an array of images for animation or state changes.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a frame around the object if it's an instance of specific classes (for debugging or visual effects).
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Coins || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Sets the image of the object based on a percentage value, typically used for collectables.
     * @param {number} percentage - The percentage to determine the image state.
     */
    setPercentageCollectables(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndexCollectables()];
        this.img = this.imageCache[path];
    }

    /**
     * Sets the image of the object based on a percentage value, typically used for health status.
     * @param {number} percentage - The percentage to determine the health image state.
     */
    setPercentageHealth(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the percentage for collectables.
     * @returns {number} Index of the image to display.
     */
    resolveImageIndexCollectables() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage <= 2) {
            return 1;
        } else if (this.percentage <= 4) {
            return 2;
        } else if (this.percentage <= 6) {
            return 3;
        } else if (this.percentage <= 8) {
            return 4;
        } else {
            return 5;
        }
    }

    /**
     * Resolves the image index based on the percentage for health.
     * @returns {number} Index of the image to display.
     */
    resolveImageIndexHealth() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}