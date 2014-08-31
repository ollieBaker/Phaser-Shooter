ShooterGame.Background = function(game) {
	this.game = game;
	this.tileSprite = null;
	this.starEmitter = null;
};

ShooterGame.Background.prototype = {
	create: function() {
		this.tileSprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'main', 'Backgrounds/blackSmall');

		this.starEmitter = this.game.add.emitter(this.game.world.width, this.game.world.centerY, 300);
        this.starEmitter.gravity = 0;

        this.starEmitter.height = this.game.world.height;

        this.starEmitter.makeParticles('main', 'Effects/star1');

        this.starEmitter.minParticleScale = 0.1;
        this.starEmitter.maxParticleScale = 0.5;

        this.starEmitter.setXSpeed(-400, -600);
        this.starEmitter.setYSpeed(0, 0);

        this.starEmitter.minRotation = 0;
        this.starEmitter.maxRotation = 0;

        this.starEmitter.start(false, 2500, 5, 0);
	},

	destroy: function() {
		this.tileSprite.destroy();
		this.tileSprite = null;
		this.starEmitter.destroy();
		this.starEmitter = null;
	},

	update: function() {
		this.tileSprite.tilePosition.x -= 6;
	}
};