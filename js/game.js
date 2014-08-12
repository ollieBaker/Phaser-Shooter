ShooterGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.


    var player;
    var bullets;
};



ShooterGame.Game.prototype = {

	create: function () {

        console.log("game");

        player = new ShooterGame.Player(this.game);
        player.create();

        bullets = this.game.add.group();
        bullets.createMultiple(100, 'main', 0, false);
        
        this.game.time.events.loop(200, this.fire, this);
        

	},

    fire: function () {

        var bullet = bullets.getFirstExists(false);

        if(bullet) {
            bullet.frameName = "Lasers/laserBlue06";
            bullet.anchor.set(0.5, 0.5);
            bullet.exists = true;
            bullet.reset(player.sprite.x, player.sprite.y - 15);
            this.game.physics.enable(bullets, Phaser.Physics.ARCADE);
            bullet.body.allowRotation = false;
            bullet.body.velocity.y = -400;
        }
    },

	update: function () {
        player.update();
        bullets.forEachAlive(this.checkBounds, this);

	},

    checkBounds: function (bullet) {
        if(bullet.y < -10) {
            bullet.kill();
        }
    },

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},

    render: function () {
    }

};

   