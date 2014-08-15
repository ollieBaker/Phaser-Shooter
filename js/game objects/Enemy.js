ShooterGame.Enemy = function(game) {

	Phaser.Sprite.call(this, game, game.world.centerX, -60, 'main');
	//this.sprite = this.game.add.sprite(this.game.world.centerX, -60, 'main');
    this.anchor.setTo(0.5,0.5);
    this.frameName = "Enemies/enemyGreen5";
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
	this.sprite = null;
	this.Yspeed = 2;
	this.Xspeed = 0.04;
	this.count = 0;
	this.health = 5;

	game.add.existing(this);

};
ShooterGame.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
ShooterGame.Enemy.prototype.constructor = ShooterGame.Enemy;

	ShooterGame.Enemy.prototype.loseHealth =  function( power ) {
		this.health -= power;
		if(this.health <= 0) {
			//die
			console.log('enemy dead');
			this.reset();
		}
	};

	ShooterGame.Enemy.prototype.reset = function () {
		this.y = -60;
		this.health = 5;
	};

	ShooterGame.Enemy.prototype.update = function() {

		this.x = this.game.world.width*0.5 + ( Math.sin(this.count) * (this.game.world.width * 0.5) );		
		this.y += this.Yspeed;
		this.count += this.Xspeed;

		if(this.y > this.game.height + this.height * 0.5) {
			this.reset();
		}
	};
