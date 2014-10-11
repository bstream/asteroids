ENGINE.Bullet = function(args) {

  Utils.extend(this, {

    direction: 0,
    speed: 300,
    lifespan: 2
  }, args);

  this.radius = 3;

};

ENGINE.Bullet.prototype = {

  constructor: ENGINE.Bullet,

  zIndex: 3,

  collidable: true,

  collision: function(entity) {

    if (entity.hit) {

      if (entity.team !== this.team) {
        entity.hit(this);
        this.collection.remove(this);
      }
    }
  },

  step: function(delta) {

    /* lifespan */

    if ((this.lifespan -= delta) < 0) this.collection.remove(this);

    /* movement */

    this.x += Math.cos(this.direction) * this.speed * delta;
    this.y += Math.sin(this.direction) * this.speed * delta;

    /* wrap */

    app.game.wrap(this);
  },

  blueBullet: [20, 53, 6, 6],

  redBullet: [43, 53, 6, 6],

  render: function() {

    if (this.team) {
      app.layer
        .drawRegion(app.images.spritesheet, this.redBullet, this.x - 3, this.y - 3, 1);
    } else {
      app.layer
        .drawRegion(app.images.spritesheet, this.blueBullet, this.x - 3, this.y - 3, 1);
    }
  }
};