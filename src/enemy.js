const Util = require('./util');

const WIDTH = 16;
const HEIGHT = 24;

// Creating array for enemy sprite
let enemySprites = [];

for (let i = 0; i < 16; i++) {
  enemySprites.push([WIDTH * i, 0, WIDTH, HEIGHT]);
}


class Enemy {
  constructor(options) {
    this.prevPos = options.prevPos;
    this.position = options.game.randomPosition(this.prevPos);
    this.speed = options.speed;
    this.game = options.game;
    this.ctx = options.ctx;
    this.enemies = options.enemies;
    this.isWrappable = true;

    // Setting frames for sprite animation
    this.frames = 0;

    // Setting enemy image
    this.enemy = new Image();

    // Preventing browser(s) from smoothing out/blurring lines
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    this.enemy.src = '../dist/assets/spritesheets/enemy.png';
    this.enemy.alt = 'Akuma enemy';
  }

  // Gets enemy sprite
  getSprite(sprites) {
    if (this.frames < 10) {
      this.frames += 1;
      return sprites[0];
    } else if (this.frames < 20) {
      this.frames += 1;
      return sprites[1];
    } else if (this.frames < 30) {
      this.frames += 1;
      return sprites[2];
    } else if (this.frames < 40) {
      this.frames += 1;
      return sprites[3];
    } else {
      this.frames = 0;
      return sprites[3];
    }
  }

  // Moving an enemy
  move() {
    this.position[0] -= this.speed;
    if (this.game.isOutOfBounds(this.position, 'enemy')) this.remove();
   }

  // Hitbox for a mini devil
  hitbox() {
    return {
      minX: this.position[0] + 3,
      minY: this.position[1] + 3,
      width: WIDTH - 8,
      height: HEIGHT - 12
    };
  }

  // Checks if an enemy collieded with a fireball
  collidedWith(otherObject) {
    const posX = this.hitbox().minX;
    const posY = this.hitbox().minY;

    const collided = (posX < otherObject.hitbox().minX + otherObject.hitbox().width &&
      posX + this.hitbox().width > otherObject.hitbox().minX &&
      posY < otherObject.hitbox().minY + otherObject.hitbox().height &&
      posY + this.hitbox().height > otherObject.hitbox().minY);

    if (collided) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }

  // Removing an enemy
  remove() {
    this.game.remove(this);
  };

  // Drawing a mini devil
  draw(ctx) {
    const sprite = this.getSprite(enemySprites);

    ctx.drawImage(
      this.enemy,
      sprite[0],
      sprite[1],
      sprite[2],
      sprite[3],
      this.position[0],
      this.position[1],
      sprite[2],
      sprite[3]
    );
  }

  // Draws and updates enemy movement
  update(ctx) {
    this.move();
    this.draw(ctx);
  }
}

module.exports = Enemy;