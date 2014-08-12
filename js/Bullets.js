ShooterGame.Bullets = function(game, player) {
	this.game = game;
	this.player = player;
	this.group = null;
};

ShooterGame.Bullets.prototype = {
	preload: function() {

	},

	create: function() {
		this.group = this.game.add.group();
        this.group.createMultiple(100, 'main', 0, false);

        this.game.time.events.loop(200, this.fire, this);
	},

	fire: function () {
        var bullet = this.group.getFirstExists(false);
        if(bullet) {
	       	bullet.frameName = "Lasers/laserBlue06";
	       	bullet.anchor.set(0.5, 0.5);
	        bullet.exists = true;
	        bullet.reset(this.player.sprite.x, this.player.sprite.y - 15);
	        this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
	        bullet.body.allowRotation = false;
	        bullet.body.velocity.y = -400;
	    }
    },

	update: function() {
		this.group.forEachAlive(this.checkBounds, this);
	},

	checkBounds: function (bullet) {
        if(bullet.y < -10) {
            bullet.kill();
        }
    }
	
};