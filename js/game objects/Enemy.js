ShooterGame.Enemy = function(game, delay) {

	Phaser.Sprite.call(this, game, 0, -60, 'main');
	//this.sprite = this.game.add.sprite(this.game.world.centerX, -60, 'main');
    this.anchor.setTo(0.5,0.5);
    this.frameName = "Enemies/enemyGreen5";
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
	this.sprite = null;
	this.Yspeed = 200;
	this.Xspeed = 0.045;
	this.delay = delay;

	this.isAlive = false;

	this.game.time.events.add(Phaser.Timer.SECOND * delay, this.reset, this);

	game.add.existing(this);

};
ShooterGame.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
ShooterGame.Enemy.prototype.constructor = ShooterGame.Enemy;

	ShooterGame.Enemy.prototype.loseHealth =  function( power ) {
		this.health -= power;
		if(this.health <= 0) {
			this.reset();
		}
	};

	ShooterGame.Enemy.prototype.reset = function () {
		this.isAlive = true;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.x = this.width * 0.5;
		this.y = -120;
		this.count = 0;
		this.health = 2;
	};

	ShooterGame.Enemy.prototype.update = function() {
		
		if(!this.isAlive) {
			return;
		}

		this.body.velocity.x = (Math.sin(this.count) * (this.game.world.width + this.width)) * ((1/60) / this.game.time.physicsElapsed);
		//console.log( (1/60) / this.game.time.physicsElapsed, this.game.time.physicsElapsed);	
		this.body.velocity.y = this.Yspeed;
		this.count += this.Xspeed;
		if(this.y > this.game.height + this.height * 0.5) {
			this.reset();
		}

		/*
			rotation =  Math.sin(_count) * 5;
			_count += _countIncrement;
		*/
	};
