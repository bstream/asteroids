ENGINE.Powerup = function(args) {

  Utils.extend(
    this, 
    {
      color: "#ff0" /* default color if none is provided */
    }, 
    args);

};

ENGINE.Powerup.SHIELD = 0;
ENGINE.Powerup.BULLETSPEED = 1; 
ENGINE.Powerup.BULLETDAMAGE = 2;
ENGINE.Powerup.MEDIKIT = 3;

ENGINE.Powerups = [
  ENGINE.Powerup.SHIELD,
  ENGINE.Powerup.BULLETSPEED,
  ENGINE.Powerup.BULLETDAMAGE,
  ENGINE.Powerup.MEDIKIT
];

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
          object.armor = Math.min(object.maxArmor, object.armor + object.armorStep);
          break;
        case ENGINE.Powerup.BULLETSPEED:
          object.bulletSpeed = Math.min(object.maxBulletSpeed, object.bulletSpeed + object.bulletSpeedStep);
          object.maxCooldown = Math.max(object.absoluteMaxCooldown, object.maxCooldown - object.maxCooldownStep);
          break;
        case ENGINE.Powerup.BULLETDAMAGE:
          object.bulletDamage = Math.min(object.maxBulletDamage, object.bulletDamage + object.bulletDamageStep);
          break;
        case ENGINE.Powerup.MEDIKIT:
          object.hp = Math.min(object.maxHp, object.hp + object.hpStep);
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