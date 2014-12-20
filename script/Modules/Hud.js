app.game.hud = {

  render: function(delta) {

    var player = app.game.players[0];

    this.renderText(8, 16 + 6, 'HEALTH ', '#fff');
    this.renderBar(60, 16, 80, 6, player.hp / player.maxHp, '#08f');
    this.renderText(8, 28 + 6, 'ARMOR  ', '#fff');
    this.renderBar(60, 28, 80, 6, player.armor / player.maxArmor, '#fff');
    this.renderText(9, 40 + 6, 'B-DMG  ', '#fff');
    this.renderBar(60, 40, 60, 6, player.bulletDamage / player.maxBulletDamage, '#fff');
    this.renderText(9, 52 + 6, 'B-SPEED', '#fff');
    this.renderBar(60, 52, 60, 6, player.bulletSpeed / player.maxBulletSpeed, '#fff');

    this.renderScore(app.width - 16, 30, player.score, '#fff');

    if (!player.hp) {
      clearInterval(app.game.spawnInterval);
      app.restartEnabled = true;
      this.renderEnd(player.score);
    }
  },

  renderBar: function(x, y, width, height, progress, color) {
    app.layer
    	.fillStyle('#000')
    	.fillRect(x, y, width, height);
    app.layer
    	.fillStyle(color)
    	.fillRect(x, y, width * progress, height);
  },

  renderScore: function(x, y, score, color) {
  	app.layer
  		.fillStyle(color)
    	.font('14px Arial')
    	.textAlign('right')
    	.fillText('Score: ' + score, x, y);
  },

  renderText: function(x, y, text, color) {
    app.layer
      .fillStyle(color)
      .font('10px Arial')
      .textAlign('left')
      .fillText(text, x, y);
  },

  renderEnd: function(score) {
    app.layer
      .fillStyle('#fff')
      .fillRect(app.center.x - 200, app.center.y - 75, 400, 150);
    app.layer
      .fillStyle('#000')
      .fillRect(app.center.x - 190, app.center.y - 65, 380, 130);
    app.layer
      .fillStyle('#fff')
      .font('18px Arial')
      .textAlign('left')
      .fillText('Game Over', app.center.x - 40, app.center.y - 50);
    app.layer
      .fillStyle('#fff')
      .font('18px Arial')
      .textAlign('left')
      .fillText('Your final score was: ' + score, app.center.x - 180, app.center.y - 10);
    app.layer
      .fillStyle('#fff')
      .font('18px Arial')
      .textAlign('left')
      .fillText(' - Press R to restart! - ', app.center.x - 85, app.center.y + 60);
  }

};