ShooterGame.Enemy = function(game) {
	this.game = game;
	this.sprite = null;
	this.Yspeed = 2;
	this.Xspeed = 0.04;
	this.count = 0;
};

ShooterGame.Enemy.prototype = {
	preload: function() {

	},

	create: function() {
		this.sprite = this.game.add.sprite(this.game.world.centerX, -60, 'main');
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.frameName = "Enemies/enemyGreen5";
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.allowRotation = false;		
	},

	update: function() {

		this.sprite.x = this.game.world.width*0.5 + ( Math.sin(this.count) * (this.game.world.width * 0.5) );		
		this.sprite.y += this.Yspeed;
		this.count += this.Xspeed;

		if(this.sprite.y > this.game.height + this.sprite.height * 0.5) {
			this.sprite.y = -60;
		}
	}
};