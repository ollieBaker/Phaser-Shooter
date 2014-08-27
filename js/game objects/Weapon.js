ShooterGame.Weapon = function(game, player) {
	this.game = game;
	this.player = player;
	this.bullets = null;
	this.strength = 1;
	this.fireTimer;
};

ShooterGame.Weapon.prototype = {
	preload: function() {

	},

	create: function() {
		this.bullets = this.game.add.group();
        this.bullets.createMultiple(100, 'main', 0, false);

        this.fireTimer = this.game.time.events.loop(250, this.fire, this);
	},

	fire: function () {
		if(this.player.invincible == false) {
	        var bullet = this.bullets.getFirstExists(false);
	        if(bullet) {
		       	bullet.frameName = "Lasers/laserBlue06"; // random laser + this.game.rnd.between(1,6);
		       	bullet.angle = 90;
		       	bullet.anchor.set(0.5, 0.5);
		        //bullet.exists = true;
		        bullet.reset(this.player.sprite.x - 15, this.player.sprite.y);
		        this.game.physics.enable(this.bullets, Phaser.Physics.ARCADE);
		        bullet.body.allowRotation = false;
		        bullet.body.velocity.x = 600;
		        bullet.body.width = 30;
		        bullet.body.height = 10;
		    }
		}
    },

    kill: function () {
    	this.game.time.events.remove(this.fireTimer);
    },

	update: function() {
		this.bullets.forEachAlive(this.checkBounds, this);
	},

	checkBounds: function (bullet) {
        if(bullet.x > this.game.world.width) {
            bullet.kill();
        }
    },


	
};