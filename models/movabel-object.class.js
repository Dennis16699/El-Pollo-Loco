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


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 20);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 175;
        }
    }

    isColliding (mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isNearEndboss (mo) {
        return ((mo.x + mo.offset.left) - (this.x + this.width - this.offset.right)) < 500;
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else  {
            this.lastHit = new Date().getTime();
        }
    }

    hitByEndboss() {
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        } else  {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    pushedBack() {
        this.x -= 250;
    }

    colectCoins() {
        this.coinsColected += 1;
        if(this.coinsColected >= 10) {
            this.coinsColected = 10;
        }
    }

    colectBottles() {
        this.bottlesColected += 1;
        if(this.bottlesColected >= 10) {
            this.bottlesColected = 10;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 26;
    }

    endbossIsHit() {
        this.energyEndboss -= 15;
        if(this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else  {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    isHurtEndboss(){
        let timePassed = new Date().getTime() - this.lastHitEndboss;
        timePassed = timePassed / 1000; 
    }

    speed() {
        return this.speed == 0;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    flipImage(ctx){
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    flipImageBack(ctx){
        this.x = this.x * -1;
        ctx.restore();
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}