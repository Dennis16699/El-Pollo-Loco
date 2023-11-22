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

    /**
    * Constructs a new World instance, setting up the game canvas, keyboard input, and audio control.
    * @param {HTMLCanvasElement} canvas - The game canvas element.
    * @param {Keyboard} keyboard - The keyboard input handler.
    * @param {boolean} audioVolume - Initial state of audio volume (on/off).
    */
    constructor(canvas, keyboard, audioVolume) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.audioVolume = audioVolume;
        this.draw();
        this.setWorld();
        this.run();
    };

    /**
    * Sets up the world context for the main character.
    */
    setWorld() {
        this.character.world = this;
    }

    /**
    * Starts the game loop, setting up intervals for collision checking, object interactions, and other periodic tasks.
    */
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

    /**
    * Checks for collisions between the player character and enemy characters.
    * Updates health and coin counts based on collisions.
    */
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

    /**
    * Checks for collisions when the player character lands on top of enemies.
    * Stops the enemy's movement if the player character lands from above.
    */
    checkCollisionsEnemyTop() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.speed > 0 && this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !this.character.isHurt() && this.character.speedY < 0) {
                    enemy.speed = 0;
                }
            }
        });
    }

    /**
    * Checks for collisions between the player character and the endboss.
    * Updates health, handles pushback effect, and adjusts coin count based on collisions.
    */
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

    /**
    * Checks for collisions between thrown bottles and enemy objects.
    * Stops the enemy's movement upon collision and sets the bottle hit flag.
    */
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

    /**
    * Checks for collisions between thrown bottles and the endboss.
    * Triggers damage to the endboss and updates its health status bar.
    * Sets the bottle hit flag upon collision.
    */
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

    /**
    * Checks for collisions between the character and coin objects.
    * Updates the character's collected coins count and plays a sound effect upon collecting.
    */
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

    /**
    * Checks for collisions between the character and bottle objects.
    * Updates the character's collected bottles count and plays a sound effect upon collecting.
    */
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

    /**
    * Checks if the character is near the endboss based on their positions.
    * Activates certain game mechanics when near the endboss.
    */
    checkNearEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.x > 3850) {
                endboss.nearEndboss = true;
            }
        });
    }

    /**
    * Manages the action of throwing objects based on keyboard input and character's inventory.
    * Determines the direction of the throw and updates the inventory count.
    */
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

    /**
    * Handles the logic for throwing a bottle in a specific direction.
    * Adjusts the position and trajectory of the thrown bottle.
    */
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
   
    /**
    * Handles the logic for throwing a bottle in a specific direction.
    * Adjusts the position and trajectory of the thrown bottle.
    */
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

    /**
    * Updates the audio volume setting for enemies, the endboss, and throwable objects.
    * Toggles audio on or off based on the game's audio volume setting.
    */
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

    /**
    * Main drawing function for the game world.
    * Clears the canvas and redraws all game objects in their current states.
    */
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

    /**
    * Adds background objects like clouds and collectibles to the canvas for rendering.
    */
    addBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
    * Adds status bars (health, coins, bottles) to the canvas for rendering.
    * Includes the endboss health status bar if the character is in proximity to the endboss.
    */
    addStatusbars() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        if (this.proximity) {
            this.addToMap(this.statusbarHealthEndboss);
            this.addToMap(this.statusbarHealthEndbossLogo);
        }
    }

    /**
    * Checks the proximity of the character to the endboss and updates the game state accordingly.
    */
    checkProximity() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isNearEndboss(endboss)) {
                this.proximity = true;
            } else {
                this.proximity = false;
            }
        });
    }

    /**
    * Adds movable objects like the character, enemies, and endboss to the canvas for rendering.
    */
    addMovableObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObject);
    }

    /**
    * Helper function to add a collection of objects to the canvas for rendering.
    * @param {MovableObject[]} objects - Array of movable objects to be added.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * Adds a single movable object to the canvas for rendering.
    * Flips the image if the object is facing the other direction.
    * @param {MovableObject} mo - The movable object to be added.
    */
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