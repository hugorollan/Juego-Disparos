/**
 * Player class - The main character controlled by the user
 * Extends Character to add player-specific functionality
 */
class Player extends Character {
    /**
     * Constructor for Player
     * @param {Game} game - Reference to the game instance
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    constructor(game, x, y) {
        super(game, x, y);
        this.lives = INITIAL_LIVES; // Number of lives
        this.speed = 5;
        this.color = '#00ff00'; // Green color for fallback rendering
        this.myImage = 'assets/bueno.svg';
        this.myImageDead = 'assets/bueno_muerto.svg';
        this.image.src = this.myImage;
        this.respawnTimer = 0;
    }

    /**
     * Handle collision with another entity (shots from opponents)
     * @param {Entity} entity - The entity that collided with the player
     */
    collide(entity) {
        if (!this.dead && entity instanceof Shot && entity.shooter !== this) {
            this.lives--;
            
            if (this.lives > 0) {
                // Player has lives left - temporary death for 2 seconds
                super.collide(entity);
                this.respawnTimer = 40; // 2 seconds at 20 FPS
            } else {
                // No lives left - permanent death
                super.collide(entity);
                this.game.endGame();
            }
        }
    }

    /**
     * Update player state and handle respawn
     */
    update() {
        super.update();
        
        // Handle respawn after temporary death
        if (this.dead && this.lives > 0 && this.respawnTimer > 0) {
            this.respawnTimer--;
            if (this.respawnTimer <= 0) {
                // Respawn player
                this.dead = false;
                this.color = '#00ff00'; // Restore green color
                this.image.src = this.myImage;
            }
        }

        // Handle movement
        if (!this.dead) {
            this.handleMovement();
        }
    }

    /**
     * Handle player movement based on keyboard input
     */
    handleMovement() {
        if (this.game.keyPressed) {
            switch (this.game.keyPressed) {
                case 'ArrowLeft':
                    if (this.x > 0) {
                        this.x -= this.speed;
                    }
                    break;
                case 'ArrowRight':
                    if (this.x < this.game.canvas.width - this.width) {
                        this.x += this.speed;
                    }
                    break;
                case 'ArrowUp':
                    if (this.y > 0) {
                        this.y -= this.speed;
                    }
                    break;
                case 'ArrowDown':
                    if (this.y < this.game.canvas.height - this.height) {
                        this.y += this.speed;
                    }
                    break;
                case ' ': // Spacebar for shooting
                    const shot = this.shoot();
                    if (shot) {
                        this.game.playerShots.push(shot);
                    }
                    break;
            }
        }

        // Handle touch movement
        if (this.game.xDown !== null) {
            if (this.game.xDown < this.x + this.width / 2) {
                if (this.x > 0) {
                    this.x -= this.speed;
                }
            } else if (this.game.xDown > this.x + this.width / 2) {
                if (this.x < this.game.canvas.width - this.width) {
                    this.x += this.speed;
                }
            }
        }
    }
}