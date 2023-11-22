class World {
    character = new Character();
    bottle = new ThrowableObject();
    endboss = new Endboss();
    chicken = new Chicken();
    chickenSmall = new ChickenSmall();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarHealthEndboss = new StatusbarHealthEndboss();
    statusbarHealthEndbossLogo = new StatusbarHealthEndbossLogo();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    coins = new Coins();
    bottles = new Bottles();
    throwableObject = [];
    throwObject = true;
    movableObject = new MovableObject();
    collectCoinSound = new Audio('audio/Coins.mp3');
    collectBottleSound = new Audio('audio/Bottle.mp3');
    loseCoins;
    audioVolume = false;
    proximity = false;


    constructor(canvas, keyboard, audioVolume) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.audioVolume = audioVolume;
        this.draw();
        this.setWorld();
        this.run();
    };

    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisionsEnemy();
            this.checkCollisionsEndboss();
            this.checkBottleHitEndboss();
            this.checkNearEndboss();
        }, 200);

        setInterval(() => {
            this.checkCollisionsEnemyTop();
            this.checkBottleHitEnemy();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkProximity();
            this.checkAudioEnemies();
            this.checkAudioEndoboss();
            this.checkAudioThrowableObjects();
        }, 1000 / 60);

        setInterval(() => { this.checkThrowObject(); }, 80);
    }


    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.speed > 0 && this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusbarHealth.setPercentageHealth(this.character.energy);

                if (this.character.coinsColected > 0) {
                    this.character.coinsColected--;
                    this.statusbarCoins.setPercentageCollectables(this.character.coinsColected);
                } else {
                    this.character.coinsColected = 0;
                    this.statusbarCoins.setPercentageCollectables(this.character.coinsColected);
                }
            }
        });
    }


    checkCollisionsEnemyTop() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.speed > 0 && this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !this.character.isHurt() && this.character.speedY < 0) {
                    enemy.speed = 0;
                }
            }
        });
    }


    checkCollisionsEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hitByEndboss();
                this.statusbarHealth.setPercentageHealth(this.character.energy);
                this.character.pushedBack();

                if (this.character.coinsColected > 0) {
                    this.character.coinsColected--;
                    this.statusbarCoins.setPercentageCollectables(this.character.coinsColected);
                } else {
                    this.character.coinsColected = 0;
                    this.statusbarCoins.setPercentageCollectables(this.character.coinsColected);
                }
            }
        });
    }


    checkBottleHitEnemy() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    enemy.speed = 0;
                    bottle.bottleHit = true;
                }
            })
        })
    };


    checkBottleHitEndboss() {
        this.throwableObject.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss)) {
                    endboss.endbossIsHit();
                    this.statusbarHealthEndboss.setPercentageHealth(endboss.energyEndboss);
                    bottle.bottleHit = true;
                }
            })
        })
    };


    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.colectCoins();
                this.statusbarCoins.setPercentageCollectables(this.character.coinsColected);
                if (this.audioVolume == true) {
                    this.collectCoinSound.play();
                }
                coin.x = 0;
                coin.y = -100;
            }
        });
    }


    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.colectBottles();
                this.statusbarBottles.setPercentageCollectables(this.character.bottlesColected);
                if (this.audioVolume == true) {
                    this.collectBottleSound.play();
                }
                bottle.x = 0;
                bottle.y = -100;
            }
        });
    }


    checkNearEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.x > 3850) {
                endboss.nearEndboss = true;
            }
        });
    }


    checkThrowObject() {
        if (this.keyboard.throw) {
            if (this.character.bottlesColected > 0) {
                if (this.throwObject == true) {
                    if (this.character.otherDirection == true) {
                        this.throwBottleOtherDirection();
                    } else {
                        this.throwBottleCorrectDirection();
                    }
                }
            } else {
                this.character.bottlesColected = 0;
                this.statusbarBottles.setPercentageCollectables(this.character.bottlesColected);
            }
        }
    }


    throwBottleOtherDirection() {
        this.throwObject = false;
        let bottle = new ThrowableObject(this.character.x - 60, this.character.y + 100, this.otherDirection = true);
        this.throwableObject.push(bottle);
        this.character.bottlesColected--;
        this.statusbarBottles.setPercentageCollectables(this.character.bottlesColected);
        setTimeout(() => {
            this.throwObject = true;
        }, 400);
    }


    throwBottleCorrectDirection() {
        this.throwObject = false;
        let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100, this.otherDirection = false);
        this.throwableObject.push(bottle);
        this.character.bottlesColected--;
        this.statusbarBottles.setPercentageCollectables(this.character.bottlesColected);
        setTimeout(() => {
            this.throwObject = true;
        }, 400);
    }


    checkAudioEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.audioVolume == true) {
                enemy.audioVolume = true;
            } else {
                enemy.audioVolume = false;
            }
        });
    }


    checkAudioEndoboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.audioVolume == true) {
                endboss.audioVolume = true;
            } else {
                endboss.audioVolume = false;
            }
        });
    }


    checkAudioThrowableObjects() {
        this.throwableObject.forEach((bottle) => {
            if (this.audioVolume == true) {
                bottle.audioVolume = true;
            } else {
                bottle.audioVolume = false;
            }
        });
    }

 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addBackgroundObjects();
        this.ctx.translate(-this.cameraX, 0); 
 
        this.addStatusbars();
   
        this.ctx.translate(this.cameraX, 0); 
        this.addMovableObjects();
        this.ctx.translate(-this.cameraX, 0);
        let self = this;                    
        requestAnimationFrame(function () {  
            self.draw();
        });
    };

   
    addBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }


    addStatusbars() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        if (this.proximity) {
            this.addToMap(this.statusbarHealthEndboss);
            this.addToMap(this.statusbarHealthEndbossLogo);
        }
    }

    checkProximity() {

        this.level.endboss.forEach((endboss) => {
            if (this.character.isNearEndboss(endboss)) {
                this.proximity = true;
            } else {
                this.proximity = false;
            }
        });
    }



    addMovableObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObject);
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

 
    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(this.ctx);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            mo.flipImageBack(this.ctx);
        }
    }
}