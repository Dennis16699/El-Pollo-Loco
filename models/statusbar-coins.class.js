class StatusbarCoins extends DrawableObject {

    /**
     * Array of image paths for different states of the coin status bar.
     * @type {string[]}
     */
    images = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    percentage = 0;

 
    /**
     * Constructs a new StatusbarCoins instance, loads the status bar images, and initializes its position and size.
     */
    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 20;
        this.y = 40;
        this.height = 60;
        this.width = 200;
        this.setPercentageCollectables(0);
    }
}