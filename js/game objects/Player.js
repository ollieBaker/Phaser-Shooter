ShooterGame.Player = function (game) {
	this.game = game;
    this.sprite = null;
    this.lives = 3;

    this.lastPos = { x:0, y:0 };
    this.nextPos = { x:0, y:0 };

    this.moveSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'main');
    this.moveSprite.anchor.setTo(0.5,0.5);
    this.moveSprite.frameName = "playerShip2_red";
    this.moveSprite.alpha = 0.1;
};

ShooterGame.Player.prototype = {
	preload: function() {

	},

	create: function() {
		this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'main');
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.angle = 90;
        this.sprite.frameName = "playerShip2_red";
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.allowRotation = false;	
        this.sprite.body.width = this.sprite.body.width * 0.75;
        this.sprite.body.height = this.sprite.body.height * 0.75;
        this.lastPos.x = this.game.world.centerX;
        this.lastPos.y = this.game.world.centerY;	
        this.sprite.body.collideWorldBounds = true;
        this.lastPos = { x:this.game.input.activePointer.x, y:this.game.input.activePointer.y };
	},

    loseLife: function() {
        this.lives -= 1;
        if(this.lives < 0) {
            //die
            console.log('you dead...');
        }
    },

	update: function() {

		var deadzone = 5;

        //default justPressed duration is 250ms
        if( this.game.input.activePointer.justPressed(150) == false ) {

            this.lastPos = { x:this.moveSprite.x, y:this.moveSprite.y };

            var vel = this.sprite.body.velocity;
            var ap = this.game.input.activePointer;

            this.moveSprite.x = ap.x;
            this.moveSprite.y = ap.y;

            this.nextPos = { x:this.moveSprite.x, y:this.moveSprite.y };

            if(this.lastPos.x != this.nextPos.x || this.lastPos.y != this.nextPos.y) {
               // console.log("posChanged", 'x: ', this.nextPos.x - this.lastPos.x, 'y: ',  this.nextPos.y - this.lastPos.y);

                var difX = this.nextPos.x - this.lastPos.x;
                var difY = this.nextPos.y - this.lastPos.y;

                this.sprite.body.x += difX;
                this.sprite.body.y += difY;
            }
        } else {
            var ap = this.game.input.activePointer;

            this.moveSprite.x = ap.x;
            this.moveSprite.y = ap.y;
        }


        /*if(this.game.input.activePointer.x > (this.sprite.x + deadzone)) {
            //this.sprite.angle = 6;
            this.game.physics.arcade.moveToPointer(this.sprite, 800);
        } else if(this.game.input.activePointer.x < (this.sprite.x - deadzone)) {
            //this.sprite.angle = -6;
            this.game.physics.arcade.moveToPointer(this.sprite, 800);
        }
        else {
            //this.sprite.angle = 0;
        }

        if (this.game.input.activePointer.circle.contains(this.sprite.x, this.sprite.y)) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }*/
	} 
};