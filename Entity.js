/**
 * Entity class - Base class for all game elements
 * Represents any element that can be drawn on the game canvas
 */
class Entity {
    /**
     * Constructor for Entity
     * @param {Game} game - Reference to the game instance
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
    }

    /**
     * Draw the entity on the canvas
     */
    render() {
        // Only draw if image is loaded
        if (this.image.complete && this.image.naturalHeight !== 0) {
            this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Draw a colored rectangle as fallback
            this.game.ctx.fillStyle = this.color || '#ffffff';
            this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.game.ctx.strokeStyle = '#000000';
            this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Update entity position and state
     */
    update() {
        // Base implementation - to be overridden by subclasses
    }

    /**
     * Check if this entity collides with another entity
     * @param {Entity} entity - The entity to check collision with
     * @return {boolean} True if collision detected
     */
    hasCollision(entity) {
        return (
            this.x < entity.x + entity.width &&
            this.x + this.width > entity.x &&
            this.y < entity.y + entity.height &&
            this.y + this.height > entity.y
        );
    }
}