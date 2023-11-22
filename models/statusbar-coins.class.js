class StatusbarCoins extends DrawableObject {

    images = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    percentage = 0;

 
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