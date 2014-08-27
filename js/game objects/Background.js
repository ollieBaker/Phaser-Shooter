ShooterGame.Background = function(game) {
	this.game = game;
	this.tileSprite = null;
};

ShooterGame.Background.prototype = {
	create: function() {
		this.tileSprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'main', 'Backgrounds/darkPurple');

	},

	update: function() {
		this.tileSprite.tilePosition.x -= 6;
	}
};