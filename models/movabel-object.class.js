class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    energyEndboss = 100;
    coinsColected = 0;
    bottlesColected = 0;
    lastHit = 0;
    lastHitEndboss = 0;
    bottleHit;
    audioVolume = false;

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 20);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 175;
        }
    }

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks if this object is near the Endboss.
     * @param {MovableObject} mo - The Endboss object.
     * @returns {boolean} True if near Endboss, false otherwise.
     */
    isNearEndboss(mo) {
        return ((mo.x + mo.offset.left) - (this.x + this.width - this.offset.right)) < 500;
    }

    /**
     * Handles the logic when the object gets hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Handles the logic when the object gets hit by the Endboss.
     */
    hitByEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Applies a backward push to the object.
     */
    pushedBack() {
        this.x -= 250;
    }

    /**
     * Increments the count of collected coins.
     */
    colectCoins() {
        this.coinsColected += 1;
        if (this.coinsColected >= 10) {
            this.coinsColected = 10;
        }
    }

    /**
     * Increments the count of collected bottles.
     */
    colectBottles() {
        this.bottlesColected += 1;
        if (this.bottlesColected >= 10) {
            this.bottlesColected = 10;
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Handles the logic when the Endboss is hit.
     */
    endbossIsHit() {
        this.energyEndboss -= 15;
        if (this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    /**
    * Checks if the Endboss is hurt.
    */
    isHurtEndboss() {
        let timePassed = new Date().getTime() - this.lastHitEndboss;
        timePassed = timePassed / 1000;
    }

    speed() {
        return this.speed == 0;
    }

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
     * Flips the image horizontally.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    flipImage(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    /**
     * Flips the image back to its original orientation.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    flipImageBack(ctx) {
        this.x = this.x * -1;
        ctx.restore();
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
    * Cycles through a set of images to create an animation effect.
    * @param {string[]} images - An array of image paths for the animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}