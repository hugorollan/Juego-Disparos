/**
 * Main game initialization file
 * Contains game constants and starts the game
 */

// Game constants
const INITIAL_LIVES = 3; // Initial number of lives for the player

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    window.game = new Game(canvas); // Make game globally accessible for testing
    
    // Start the game
    window.game.start();
    
    // Add restart functionality (press R to restart)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'r' || e.key === 'R') {
            if (!window.game.gameRunning) {
                window.game.start();
            }
        }
    });
});