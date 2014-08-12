ShooterGame.Player = function (game) {
	this.game = game;
    this.sprite = null;
};

ShooterGame.Player.prototype = {
	preload: function() {

	},

	create: function() {
		this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'main');
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.frameName = "playerShip2_red";
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.allowRotation = false;		
	},

	update: function() {
		this.game.physics.arcade.moveToPointer(this.sprite, 400);

       if (this.game.input.activePointer.circle.contains(this.sprite.x, this.sprite.y)) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }

        if(this.game.input.activePointer.x > (this.sprite.x + 25)) {
            this.sprite.angle = 6;
        } else if(this.game.input.activePointer.x < (this.sprite.x - 25)) {
            this.sprite.angle = -6;
        }
        else {
            this.sprite.angle = 0;
        }
	} 
};