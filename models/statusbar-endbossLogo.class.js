class StatusbarHealthEndbossLogo extends DrawableObject {

    images = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

  
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        this.loadImages(this.images);        
        this.x = 488;
        this.y = 48;
        this.height = 60;
        this.width = 60;
    }
}