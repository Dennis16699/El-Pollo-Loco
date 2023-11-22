class StatusbarHealthEndbossLogo extends DrawableObject {

    /**
     * Array containing the path of the image for the endboss health logo.
     * @type {string[]}
     */
    images = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    /**
     * Constructs a new StatusbarHealthEndbossLogo instance, loads the logo image, and initializes its position and size.
     */
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        this.loadImages(this.images);        
        this.x = 488;
        this.y = 48;
        this.height = 60;
        this.width = 60;
    }
}