ShooterGame.Asteroid = function(game, player) {

	Phaser.Sprite.call(this, game, -20, -20, 'main');
	this.player = player;

    this.anchor.setTo(0.5,0.5);
    this.frameName = "Meteors/meteorBrown_big"+this.game.rnd.integerInRange(1, 4);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
	this.sprite = null;
	this.Xspeed = -this.game.rnd.integerInRange(150, 250);

	game.add.existing(this);

	this.exists = false;		

	this.angle = 90;
};
ShooterGame.Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
ShooterGame.Asteroid.prototype.constructor = ShooterGame.Asteroid;

	ShooterGame.Asteroid.prototype.loseHealth =  function( power ) {

		if(this.alive == true) {
			var deathAnim = this.game.add.tween(this);
			deathAnim.to({alpha: 0}, 75, Phaser.Easing.Linear.None, true, 0, 4, true);
			this.alive = false;
			deathAnim.onComplete.add(this.clean, this);
			
			return true;
		}
		return false;

	};

	ShooterGame.Asteroid.prototype.release = function () {
		this.reset(this.game.world.width + (this.width * 0.5), this.game.rnd.integerInRange(this.height, this.game.world.height - this.height));
		this.alpha = 1;
		this.body.velocity.x = this.Xspeed;
		this.body.velocity.y = 0;
		this.count = this.game.rnd.integerInRange(-60, 60);
		this.health = 1;
	};

	ShooterGame.Asteroid.prototype.clean = function() {
		this.kill();
	}

	ShooterGame.Asteroid.prototype.update = function() {
		if(this.alive == false) {
			return;
		}
		if(this.x < ( -this.width * 0.5)) {
			this.clean();
		}
	};
