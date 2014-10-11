ENGINE.Asteroid = function(args) {

  Utils.extend(this, {

    direction: 0,
    speed: 50,
    splits: 3

  }, args);

  this.sprite = [19, 13, 32, 30];

  this.width = this.sprite[2];
  this.height = this.sprite[3];
  this.radius = Math.min(this.width, this.height) / 2 | 0;

  this.scale = (this.splits + 1) / 4;
  this.hp = this.scale * 10 | 0;

};

ENGINE.Asteroid.prototype = {

  constructor: ENGINE.Asteroid,
  
  zIndex: 3,

  collidable: true,

  hit: function(data) {

    this.hp -= data.damage;

    if (this.hp <= 0) {
      app.playSound('asteroid-crush');

      this.collection.add(ENGINE.Coin,
      {
        x: this.x,
        y: this.y
      });
      
      if (data instanceof ENGINE.Bullet) {
        // Add +1 score to the team that killed me
        app.game.players[data.team].score += 1; // TODO: Extract to constant 
      }
      
      if (this.splits) {
        this.split();
      }
      
      this.collection.remove(this);
    } else {
      app.playSound('asteroid-hit');
    }
  },

  split: function() {

    for (var i = 0; i < 2; i++) {
      this.collection.add(ENGINE.Asteroid, 
      {
        x: this.x,
        y: this.y,
        splits: this.splits - 1,
        direction: Math.random() * 6
      });
    }

  },

  step: function(delta) {

    /* lifespan */

    if ((this.lifespan -= delta) < 0) {
      this.collection.remove(this);
    }

    /* movement */

    this.x += Math.cos(this.direction) * this.speed * delta;
    this.y += Math.sin(this.direction) * this.speed * delta;

    /* wrap */

    app.game.wrap(this);
  },

  render: function() {

    app.layer.save();

    app.layer.translate(this.x, this.y);
    app.layer.rotate(this.direction + Math.PI / 2);
    app.layer.scale(this.scale, this.scale);
    app.layer.drawRegion(app.images.spritesheet, this.sprite, -this.width / 2, -this.height / 2);

    app.layer.restore();

  }

};