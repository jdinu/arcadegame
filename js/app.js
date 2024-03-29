// Enemies our player must avoid
// Enemy class in the prototype format
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // initial x and  y pos
    this.x = x;    
    this.y = y + 55; // center of the block
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;// block width
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // If enemy is not passed boundary move forward     
    // Incerement x by speed * dt
    if (this.x < this.boundary){
        this.x += this.speed * dt;
    }      
    else{
         // Reset pos to start
        this.x = this.resetPos;
    }
     
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player Class in the ES6 format
class Player{
    constructor(){        
        this.sprite = 'images/char-boy.png';
        this.step =101;//block width
        this.jump =83; // block height
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.winner = false;
    }
    // Draw the player 
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Direct the player movement
    handleInput(input){
        switch(input){
            case 'left':
                if (this.x > 0){
                    this.x -= this.step;                   
                }
                break;
            case 'up':
                if (this.y > this.jump){
                    this.y -= this.jump;
                }
                break;                
            case 'right':
                 if(this.x < this.step*4){
                    this.x += this.step;
                 }                
                break;
            case 'down':
                 if(this.y < this.jump*4){
                    this.y += this.jump;
                 }              
                break;
            }
        }
// Update the player and enemy positions 
        update(){
            //check collision here
            for(let enemy of allEnemies){
                if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x 
                && enemy.x < this.x + this.step/2)){
                    this.reset();
                }
                // Winning condition
                if(this.y ===55){
                    this.winner = true;
                }
                               
            }
        }

        // Reset the Player
        reset(){
            // set the players initial starting position co-ordinates
            this.x = this.startX;
            this.y = this.startY;
        }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const bug1 = new Enemy(-101,0,200);
const bug2 = new Enemy(-101,83,300);
const bug3 = new Enemy((-101*2.5),83,300);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3);
console.log(allEnemies);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
