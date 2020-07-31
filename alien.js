class Alien {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.speed = 1 + (level / 10)
    this.lives = random(2) + 1;
    this.w = 25;
    this.h = 25;
    this.skalSlettes = false;
    this.color = createVector(random(255), random(255), random(255));

  }

  hit() {
    this.lives --;
  }

  isDead() {
    return this.lives < 1;
  }

  getCenter() {
    return createVector(this.pos.x + this.w/2, this.pos.y + this.h/2);
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  turning() {
    this.speed *= -1;
    this.pos.y += 25;
  }

  haveCollided() {
    if (this.speed > 0 && this.pos.x > width - this.w) {
      return true;
    }

    if (this.speed < 0 && this.pos.x < 0) {
      return true;
    }
    return false;
  }

  show() {
    fill(255, 0, 0);
    //rect(this.pos.x, this.pos.y, this.w, this.h);
    tint(this.color.x, this.color.y, this.color.z);
    image(alienImage, this.pos.x, this.pos.y);
    noTint();
  }

  update() {
    if (random(12000) < 5 + (level*4)) {
      alienBullets.push(new Bullet(this.pos.x, this.pos.y, -4))
    }

    this.pos.x += this.speed;

  }
}
