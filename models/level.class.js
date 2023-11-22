class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    /**
     * The x-coordinate representing the end of the level.
     * @type {number}
     */
    levelEndX = 5850;

    /**
     * Constructs a new Level instance with specified game entities.
     * 
     * @param {MovableObject[]} enemies - Array of enemy objects in the level.
     * @param {MovableObject[]} endboss - Array containing the endboss of the level.
     * @param {MovableObject[]} clouds - Array of cloud objects in the level.
     * @param {MovableObject[]} backgroundObjects - Array of background objects in the level.
     * @param {MovableObject[]} coins - Array of coin objects in the level.
     * @param {MovableObject[]} bottles - Array of bottle objects in the level.
     */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}