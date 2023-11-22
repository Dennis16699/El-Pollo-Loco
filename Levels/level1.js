let level1;

/**
 * Initializes the levels of the game by creating instances of various game entities.
 * This includes creating multiple instances of chickens, endbosses, clouds, background objects, coins, and bottles.
 * Each entity is initialized with specific parameters and added to the level.
 */
async function levels() {
    level1 = new Level(
        // Array of Chicken and ChickenSmall instances
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall()
        ],
    
        // Array with an Endboss instance
        [
            new Endboss()     
        ],
    
        // Array with a Cloud instance
        [
            new Cloud()
        ],
    
        // Array of BackgroundObject instances, each initialized with different images and positions
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*8),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*8),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*8),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*8)
        ],
    
        // Array of Coin instances
        [   
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
        ],
    
        // Array of Bottle instances
        [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
        ]
    );
}