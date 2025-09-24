/**
 * Game class - Main game controller
 * Manages game state, entities, and game loop
 */
class Game {
    /**
     * Constructor for Game
     * @param {HTMLCanvasElement} canvas - The canvas element
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.score = 0; // Player's score
        this.keyPressed = null;
        this.xDown = null;
        this.gameRunning = false;
        
        // Game entities
        this.player = null;
        this.opponent = null;
        this.playerShots = [];
        this.opponentShots = [];
        
        // Game timer
        this.gameTimer = null;
    }

    /**
     * Start the game
     */
    start() {
        this.gameRunning = true;
        this.score = 0;
        
        // Create player at bottom center
        this.player = new Player(this, this.canvas.width/2 - 25, this.canvas.height - 60);
        
        // Create initial opponent at top
        this.opponent = new Opponent(this, this.canvas.width/2 - 25, 50);
        
        // Clear shot arrays
        this.playerShots = [];
        this.opponentShots = [];
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Start game loop (20 FPS - every 50ms)
        this.gameTimer = setInterval(() => this.update(), 50);
        
        // Update UI initially
        this.updateUI();
    }

    /**
     * Initialize event listeners for controls
     */
    initEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.keyPressed = e.key;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keyPressed = null;
        });
        
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.xDown = touch.clientX - rect.left;
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.xDown = null;
        });
    }

    /**
     * Main game update loop
     */
    update() {
        if (!this.gameRunning) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and render player
        if (this.player) {
            this.player.update();
            this.player.render();
        }
        
        // Update and render opponent
        if (this.opponent && !this.opponent.dead) {
            this.opponent.update();
            this.opponent.render();
        } else if (this.opponent && this.opponent.dead) {
            this.opponent.render();
            // Check if we need to spawn boss
            setTimeout(() => this.removeOpponent(), 1000);
        }
        
        // Update and render shots
        this.updateShots();
        
        // Check collisions
        this.checkCollisions();
        
        // Update UI
        this.updateUI();
    }

    /**
     * Update all shots
     */
    updateShots() {
        // Update player shots
        this.playerShots = this.playerShots.filter(shot => {
            shot.update();
            shot.render();
            return !shot.isOffScreen();
        });
        
        // Update opponent shots
        this.opponentShots = this.opponentShots.filter(shot => {
            shot.update();
            shot.render();
            return !shot.isOffScreen();
        });
    }

    /**
     * Check collisions between entities
     */
    checkCollisions() {
        // Check player shots vs opponent
        if (this.opponent && !this.opponent.dead) {
            this.playerShots.forEach((shot, shotIndex) => {
                if (shot.hasCollision(this.opponent)) {
                    this.opponent.collide(shot);
                    this.playerShots.splice(shotIndex, 1);
                }
            });
        }
        
        // Check opponent shots vs player
        if (this.player && !this.player.dead) {
            this.opponentShots.forEach((shot, shotIndex) => {
                if (shot.hasCollision(this.player)) {
                    this.player.collide(shot);
                    this.opponentShots.splice(shotIndex, 1);
                }
            });
        }
    }

    /**
     * Remove defeated opponent and potentially spawn boss
     */
    removeOpponent() {
        if (this.opponent && this.opponent.dead) {
            if (this.opponent instanceof Opponent && !(this.opponent instanceof Boss)) {
                // Regular opponent defeated - spawn boss
                this.opponent = new Boss(this, this.canvas.width/2 - 30, 50);
            } else if (this.opponent instanceof Boss) {
                // Boss defeated - player wins!
                this.opponent = null;
                this.endGame(true);
            }
        }
    }

    /**
     * Update UI elements (score and lives)
     */
    updateUI() {
        const scoreElement = document.getElementById('scoreli');
        const livesElement = document.getElementById('livesli');
        
        if (scoreElement) {
            scoreElement.innerHTML = `Score: ${this.score}`;
        }
        
        if (livesElement && this.player) {
            livesElement.innerHTML = `Lives: ${this.player.lives}`;
        }
    }

    /**
     * End the game
     * @param {boolean} won - Whether the player won
     */
    endGame(won = false) {
        this.gameRunning = false;
        
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Show end game image
        const endImage = new Image();
        if (won && this.player && this.player.lives > 0) {
            endImage.src = 'assets/you_win.svg';
        } else {
            endImage.src = 'assets/game_over.svg';
        }
        
        endImage.onload = () => {
            const x = (this.canvas.width - endImage.width) / 2;
            const y = (this.canvas.height - endImage.height) / 2;
            this.ctx.drawImage(endImage, x, y);
        };
    }
}