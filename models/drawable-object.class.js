class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 215;
    height = 150;
    width = 100;
    percentage;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

 
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

   
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    
    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Coins || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    } 

  
    setPercentageCollectables(percentage) {
        this.percentage = percentage; 
        let path = this.images[this.resolveImageIndexCollectables()];
        this.img = this.imageCache[path]; 
    }

    
    setPercentageHealth(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }


    resolveImageIndexCollectables() {
        if(this.percentage == 0) {
            return 0;
        } else if(this.percentage <= 2) {
            return 1;
        } else if(this.percentage <= 4) {
            return 2;
        } else if(this.percentage <= 6) {
            return 3;
        } else if(this.percentage <= 8) {
            return 4;
        } else {
            return 5;
        }
    }

    resolveImageIndexHealth() {
        if(this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}