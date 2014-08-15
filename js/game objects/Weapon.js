ShooterGame.Weapon = function(game, player) {
	this.game = game;
	this.player = player;
	this.bullets = null;
	this.strength = 1;
};

ShooterGame.Weapon.prototype = {
	preload: function() {

	},

	create: function() {
		this.bullets = this.game.add.group();
        this.bullets.createMultiple(100, 'main', 0, false);

        this.game.time.events.loop(100, this.fire, this);
	},

	fire: function () {
        var bullet = this.bullets.getFirstExists(false);
        if(bullet) {
	       	bullet.frameName = "Lasers/laserBlue06"; // random laser + this.game.rnd.between(1,6);
	       	bullet.anchor.set(0.5, 0.5);
	        bullet.exists = true;
	        bullet.reset(this.player.sprite.x, this.player.sprite.y - 15);
	        this.game.physics.enable(this.bullets, Phaser.Physics.ARCADE);
	        bullet.body.allowRotation = false;
	        bullet.body.velocity.y = -400;
	    }
    },

	update: function() {
		this.bullets.forEachAlive(this.checkBounds, this);
	},

	checkBounds: function (bullet) {
        if(bullet.y < -10) {
            bullet.kill();
        }
    }
	
};