/**
 * Opponent class - Enemy characters that the player must defeat
 * Extends Character to add opponent-specific behavior
 */
class Opponent extends Character {
    /**
     * Constructor for Opponent
     * @param {Game} game - Reference to the game instance
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    constructor(game, x, y) {
        super(game, x, y);
        this.speed = 2;
        this.direction = 1; // 1 for right, -1 for left
        this.color = '#ff0000'; // Red color for fallback rendering
        this.myImage = 'assets/malo.svg';
        this.myImageDead = 'assets/malo_muerto.svg';
        this.image.src = this.myImage;
    }

    /**
     * Handle collision with another entity (shots from player)
     * @param {Entity} entity - The entity that collided with the opponent
     */
    collide(entity) {
        if (!this.dead && entity instanceof Shot && entity.shooter === this.game.player) {
            // Opponent hit by player shot - increase score and kill opponent
            this.game.score++;
            this.color = '#ffff00'; // Yellow star color when dead
            super.collide(entity);
        }
    }

    /**
     * Update opponent movement and shooting
     */
    update() {
        super.update();
        
        if (!this.dead) {
            // Move horizontally
            this.x += this.speed * this.direction;
            
            // Bounce off walls
            if (this.x <= 0 || this.x >= this.game.canvas.width - this.width) {
                this.direction *= -1;
                this.y += 20; // Move down when bouncing
            }

            // Shoot occasionally
            if (Math.random() < 0.02) { // 2% chance per frame
                const shot = this.shoot();
                if (shot) {
                    this.game.opponentShots.push(shot);
                }
            }
        }
    }
}