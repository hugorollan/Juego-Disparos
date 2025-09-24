/**
 * Shot class - Projectiles fired by characters
 * Extends Entity to add shot-specific behavior
 */
class Shot extends Entity {
    /**
     * Constructor for Shot
     * @param {Game} game - Reference to the game instance
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {Character} shooter - The character who fired this shot
     */
    constructor(game, x, y, shooter) {
        super(game, x, y);
        this.shooter = shooter;
        this.width = 5;
        this.height = 10;
        this.speed = 7;
        
        // Set direction based on who shot it
        if (shooter instanceof Player) {
            this.dy = -this.speed; // Player shots go up
            this.color = '#ffffff'; // White color for fallback rendering
            this.image.src = 'assets/shot1.svg';
        } else {
            this.dy = this.speed; // Opponent shots go down
            this.color = '#ff8800'; // Orange color for fallback rendering
            this.image.src = 'assets/shot2.svg';
        }
    }

    /**
     * Update shot position
     */
    update() {
        this.y += this.dy;
    }

    /**
     * Check if shot is off screen
     * @return {boolean} True if shot is off screen
     */
    isOffScreen() {
        return this.y < 0 || this.y > this.game.canvas.height;
    }
}