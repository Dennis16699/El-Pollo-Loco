class StatusbarHealthEndboss extends DrawableObject {

    images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 100;

  
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png');
        this.loadImages(this.images);       
        this.x = 500;
        this.y = 40;
        this.height = 60;
        this.width = 200;
        this.setPercentageHealth(100);
    }
}