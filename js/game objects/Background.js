ShooterGame.Background = function(game) {
	this.game = game;
	this.tileSprite = null;
};

ShooterGame.Background.prototype = {
	create: function() {
		this.tileSprite = this.game.add.tileSprite(0, 0, 1136, 640, 'main', 'Backgrounds/darkPurple');

	},

	update: function() {
		this.tileSprite.tilePosition.x -= 6;
	}
};