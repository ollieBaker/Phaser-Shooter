ShooterGame.Enemy = function(game, player, bullets) {

	Phaser.Sprite.call(this, game, -20, -20, 'main');
	this.player = player;
	this.bullets = bullets;
	//this.sprite = this.game.add.sprite(this.game.world.centerX, -60, 'main');
    this.anchor.setTo(0.5,0.5);
    this.frameName = "Enemies/enemyGreen5";
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
	this.sprite = null;
	this.Xspeed = -200;

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
			deathAnim.onComplete.add(this.clean, this);

			return true;
		}

		return false;
	};

	ShooterGame.Enemy.prototype.fire = function () {
		if(this.x > this.player.sprite.x) {
			var bullet = this.bullets.getFirstExists(false);
		        if(bullet) {
			       	bullet.frameName = "Lasers/laserRed08"; // random laser + this.game.rnd.between(1,6);
			       	bullet.scale.setTo(0.5);
			       	bullet.angle = 90;
			       	bullet.anchor.set(0.5, 0.5);
			        //bullet.exists = true;
			        bullet.reset(this.x - (this.width*0.5), this.y);
			        this.game.physics.enable(this.bullets, Phaser.Physics.ARCADE);
			        bullet.body.allowRotation = false;
			        bullet.body.width = 30;
			        bullet.body.height = 10;

			        this.game.physics.arcade.moveToObject(bullet, this.player.sprite, 200);
			        // bullet.angle = this.game.physics.arcade.angleToXY(this, this.player.sprite.x, this.player.sprite.y);
			    }
		}
	};

	ShooterGame.Enemy.prototype.release = function () {
		this.reset(this.game.world.width + (this.width * 0.5), 0);
		this.alpha = 1;
		this.body.velocity.x = this.Xspeed;
		this.body.velocity.y = 0;
		this.count = this.game.rnd.integerInRange(-60, 60);
		this.health = 1;

		this.fireTimer = this.game.time.events.loop(1500, this.fire, this);
	};

	ShooterGame.Enemy.prototype.clean = function() {
		this.game.time.events.remove(this.fireTimer);
		this.kill();
	}

	ShooterGame.Enemy.prototype.update = function() {
		
		if(this.alive == false) {
			return;
		}

		var verticalBound  = (this.game.height - this.height) * 0.5;
		var halfHeight = this.height * 0.5;
		this.y = (verticalBound * Math.sin(this.count * 0.5 * Math.PI / 80)) + (verticalBound + halfHeight);

		this.count ++;
		if(this.x < ( -this.width * 0.5)) {
			this.clean();
		}
	};
