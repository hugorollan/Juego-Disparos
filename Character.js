/**
 * Character class - Base class for all characters (entities with life)
 * Extends Entity to add life-related functionality
 */
class Character extends Entity {
    /**
     * Constructor for Character
     * @param {Game} game - Reference to the game instance
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    constructor(game, x, y) {
        super(game, x, y);
        this.dead = false;
        this.myImage = null; // Will store the original image path
        this.myImageDead = null; // Will store the dead image path
        this.shootingTimer = 0;
    }

    /**
     * Handle collision with another entity
     * @param {Entity} entity - The entity that collided with this character
     */
    collide(entity) {
        if (!this.dead) {
            this.dead = true;
            this.color = '#666666'; // Gray color when dead
            if (this.myImageDead) {
                this.image.src = this.myImageDead;
            }
        }
    }

    /**
     * Check if character can shoot
     * @return {boolean} True if character can shoot
     */
    canShoot() {
        return !this.dead && this.shootingTimer <= 0;
    }

    /**
     * Create a shot from this character
     * @return {Shot} New shot instance
     */
    shoot() {
        if (this.canShoot()) {
            this.shootingTimer = 50; // Cooldown period
            return new Shot(this.game, this.x + this.width/2, this.y, this);
        }
        return null;
    }

    /**
     * Update character state
     */
    update() {
        super.update();
        if (this.shootingTimer > 0) {
            this.shootingTimer--;
        }
    }
}