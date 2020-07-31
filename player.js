class Player {
  constructor(x, y){
    this.pos = createVector(x, y);
    this.speed = 0;
    this.w = 25;
    this.h = 25;

  }

  getCenter() {
    return createVector(this.pos.x + this.w/2, this.pos.y + this.h/2);
}

  setSpeed(speed) {
    this.speed = speed;
  }
  show() {
    fill(255);
    //rect(this.pos.x, this.pos.y, 50, 50);
    image(playerImage, this.pos.x, this.pos.y);
  }

  isHit() {
    let hit = false;

    for(let index = 0; index < alienBullets.length; index++) {
      if (this.getCenter().dist(alienBullets[index].pos) < 18) {
        hit = true;
      }
    }

    return hit;
  }



  update() {
    if (this.speed > 0 && this.pos.x > width - 50) {
      this.speed = 0;
    }

    if (this.speed < 0 && this.pos.x < 0) {
      this.speed = 0;
    }
    this.pos.x += this.speed;

  }
}
