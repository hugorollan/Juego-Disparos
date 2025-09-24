/**
 * Boss class - Final boss enemy with enhanced abilities
 * Extends Opponent to add boss-specific behavior (double speed, different appearance)
 */
class Boss extends Opponent {
    /**
     * Constructor for Boss
     * @param {Game} game - Reference to the game instance
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    constructor(game, x, y) {
        super(game, x, y);
        this.speed = 4; // Double the speed of regular opponent
        this.color = '#ff00ff'; // Magenta color for fallback rendering
        this.myImage = 'assets/jefe.svg';
        this.myImageDead = 'assets/jefe_muerto.svg';
        this.image.src = this.myImage;
        this.width = 60; // Slightly larger than regular opponent
        this.height = 60;
    }

    /**
     * Update boss movement and shooting (enhanced behavior)
     */
    update() {
        super.update();
        
        if (!this.dead) {
            // Boss shoots more frequently than regular opponents
            if (Math.random() < 0.05) { // 5% chance per frame (vs 2% for regular opponent)
                const shot = this.shoot();
                if (shot) {
                    this.game.opponentShots.push(shot);
                }
            }
        }
    }
}