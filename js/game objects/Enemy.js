ShooterGame.Enemy = function(game, delay) {

	Phaser.Sprite.call(this, game, game.world.width + 45, 0, 'main');
	//this.sprite = this.game.add.sprite(this.game.world.centerX, -60, 'main');
    this.anchor.setTo(0.5,0.5);
    this.frameName = "Enemies/enemyGreen5";
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
	this.sprite = null;
	this.Xspeed = -200;
	//this.delay = delay;

	//this.game.time.events.add(Phaser.Timer.SECOND * delay, this.reset, this);

	game.add.existing(this);

	this.exists = false;

	this.angle = 90;

};
ShooterGame.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
ShooterGame.Enemy.prototype.constructor = ShooterGame.Enemy;

	ShooterGame.Enemy.prototype.loseHealth =  function( power ) {
		this.health -= power;
		if(this.health <= 0 && this.alive == true) {

			this.body.velocity.x = 0;
			this.body.velocity.y = 0;

			var deathAnim = this.game.add.tween(this);
			deathAnim.to({alpha: 0}, 75, Phaser.Easing.Linear.None, true, 0, 4, true);
			this.alive = false;
			deathAnim.onComplete.add(this.kill, this);

			return true;
		}

		return false;
	};

	ShooterGame.Enemy.prototype.release = function () {
		this.reset(this.game.world.width + 40, 0);
		this.alpha = 1;
		this.body.velocity.x = this.Xspeed;
		this.body.velocity.y = 0;
		this.count = 0;
		this.health = 3;
	};

	ShooterGame.Enemy.prototype.update = function() {
		
		if(this.alive == false) {
			console.log('unnessary pdate')
			return;
		}

		var verticalBound  = (this.game.height - this.height) * 0.5;
		var halfHeight = this.height * 0.5;
		this.y = (verticalBound * Math.sin(this.count * 0.5 * Math.PI / 80)) + (verticalBound + halfHeight);

		this.count ++;
		if(this.x < ( -this.width * 0.5)) {
			this.kill();
		}
	};
