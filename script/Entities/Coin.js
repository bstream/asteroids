ENGINE.Coin = function(args) {

  Utils.extend(
    this, 
    {
      color: "#ff0" /* default color if none is provided */
    }, 
    args);

};

ENGINE.Coin.prototype = {

  constructor: ENGINE.Coin,

  collidable: true,
  // Radius of a coin
  radius: 5,
  // How long it takes for the animation to complete in seconds
  duration: 1, 

  frame: 1,

  delta: 0,

  pickupCoinScore: 5,

  sprite: [0, 0, 10, 10],

  collision: function(object) {

    if (object instanceof ENGINE.Player) {
      // Add +5 score to the team that picks me up
      object.score += this.pickupCoinScore;
      app.playSound('coin');
      this.collection.remove(this);
    }

  },

  step: function(delta) {

  },

  render: function(delta) {

    this.delta = (this.delta + delta) % this.duration;
    this.frame = Math.floor((this.delta / this.duration) * 7);
    this.sprite[0] = 1 + 10 * this.frame;

    app.layer.drawRegion(app.images.coins, this.sprite, this.x - this.radius, this.y - this.radius);
  }

};