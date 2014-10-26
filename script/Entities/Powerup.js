ENGINE.Powerup = function(args) {

  Utils.extend(
    this, 
    {
      color: "#ff0" /* default color if none is provided */
    }, 
    args);

};

ENGINE.Powerup.SHIELD = 0; // TODO correct name please
ENGINE.Powerup.SPEED = 1; // TODO correct name please
ENGINE.Powerup.GREEN = 2; // TODO correct name please
ENGINE.Powerup.MEDIKIT = 3;

ENGINE.Powerup.prototype = {

  constructor: ENGINE.Powerup,

  collidable: true,
  // Radius of a powerup
  radius: 8,

  sprites: {
    0: [67, 47, 16, 16],
    1: [67, 66, 16, 16],
    2: [85, 66, 16, 16],
    3: [103, 66, 16, 16]
  },

  collision: function(object) {

    if (object instanceof ENGINE.Player) {
      // If clauses depending on powerup type. Switch case?
      switch(this.kind) {
        case ENGINE.Powerup.SHIELD:
          break;
        case ENGINE.Powerup.SPEED:
          break;
        case ENGINE.Powerup.GREEN:
          break;
        case ENGINE.Powerup.MEDIKIT:
          object.hp = (object.hp < Math.floor(object.maxHp * 0.5) ? object.hp + Math.floor(object.maxHp * 0.5) : object.maxHp);
          break;
        default:
          console.log('WARNING: Unknown Powerup kind!');
      }
      this.collection.remove(this);
    }

  },

  step: function(delta) {

  },

  render: function(delta) {
    app.layer.drawRegion(app.images.spritesheet, this.sprites[this.kind], this.x - this.radius, this.y - this.radius);
  }

};