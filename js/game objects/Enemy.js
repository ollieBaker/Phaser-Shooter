ShooterGame.Enemy = function(game, delay) {

	Phaser.Sprite.call(this, game, 0, 0, 'main');
	//this.sprite = this.game.add.sprite(this.game.world.centerX, -60, 'main');
    this.anchor.setTo(0.5,0.5);
    this.frameName = "Enemies/enemyGreen5";
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
	this.sprite = null;
	this.Yspeed = 0.04;
	this.Xspeed = -200;
	this.delay = delay;

	this.isAlive = false;

	this.game.time.events.add(Phaser.Timer.SECOND * delay, this.reset, this);

	game.add.existing(this);

	this.angle = 90;

};
ShooterGame.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
ShooterGame.Enemy.prototype.constructor = ShooterGame.Enemy;

	ShooterGame.Enemy.prototype.loseHealth =  function( power ) {
		this.health -= power;
		if(this.health <= 0 && this.isAlive == true) {

			this.body.velocity.x = 0;
			this.body.velocity.y = 0;

			var deathAnim = this.game.add.tween(this);
			deathAnim.to({alpha: 0}, 75, Phaser.Easing.Linear.None, true, 0, 4, true);
			this.isAlive = false;
			deathAnim.onComplete.add(this.reset, this);
			//this.reset();

			return true;
		}

		return false;
	};

	ShooterGame.Enemy.prototype.reset = function () {
		this.isAlive = true;
		this.alpha = 1;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.x = this.game.world.width + 40;
		this.y = this.height * 0.5;
		this.count = 0;
		this.health = 3;
	};

	ShooterGame.Enemy.prototype.update = function() {
		
		if(!this.isAlive) {
			return;
		}

		var verticalBound  = (this.game.height - this.height) * 0.5;
		var halfHeight = this.height * 0.5;
		this.y = (verticalBound * Math.sin(this.count * 0.5 * Math.PI / 80)) + (verticalBound + halfHeight);

		this.body.velocity.x = this.Xspeed;
		this.count ++;
		if(this.x < 0 - this.height * 0.5) {
			this.reset();
		}
	};
