class StatusbarHealth extends DrawableObject {

    /**
     * Array of image paths for different states of the player's health status bar.
     * @type {string[]}
     */
    images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    /**
     * Constructs a new StatusbarHealth instance, loads the health bar images, and initializes its position and size.
     */
    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 20;
        this.y = 0;
        this.height = 60;
        this.width = 200;
        this.setPercentageHealth(100);
    }
}