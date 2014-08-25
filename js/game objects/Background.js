ShooterGame.Background = function(game) {
	this.game = game;
	this.tileSprite = null;
};

ShooterGame.Background.prototype = {
	create: function() {
		this.tileSprite = this.game.add.tileSprite(0, 0, 640, 1136, 'main', 'Backgrounds/darkPurple');

	},

	update: function() {
		this.tileSprite.tilePosition.y += 6;
	}
};