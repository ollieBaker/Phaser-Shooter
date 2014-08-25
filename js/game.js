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


    this.player;
    this.enemies;
    this.weapon;
    this.background;

    this.score = 0;
    this.scoreText;

    this.lives;
};



ShooterGame.Game.prototype = {

	create: function () {

        console.log("game");

        this.background = new ShooterGame.Background(this.game);
        this.background.create();

        this.scoreText = this.game.add.text(16, 16, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });

        this.lives = this.game.add.group();
        this.game.add.text(this.game.world.width - 110, 16, 'Lives : ', { font: '20px Arial', fill: '#fff' });

        for (var i = 0; i < 3; i++) {
            var ship = this.lives.create(this.game.world.width - 100 + (40 * i), 60, 'main');
            ship.frameName = 'UI/playerLife1_red';
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.4;
        }

        var numEnemies = 10 ;
        this.enemies = this.game.add.group();
        for (var i = 0; i < numEnemies; i++) {
            this.enemies.add(new ShooterGame.Enemy(this.game, i) );
        };

        this.player = new ShooterGame.Player(this.game);

        this.weapon = new ShooterGame.Weapon(this.game, this.player);
        this.weapon.create();

        this.player.create();
	},  

	update: function () {
        this.player.update();
        this.weapon.update();
        this.background.update();

        //check for enemy / weapon / player collisions
        this.game.physics.arcade.overlap(this.weapon.bullets, this.enemies, this.onBulletEnemyCollision, null, this);
        this.game.physics.arcade.overlap(this.player.sprite, this.enemies, this.onPlayerEnemyCollision, null, this);

	}, 

    onBulletEnemyCollision: function (bullet, enemy) {
        if ( enemy.loseHealth(this.weapon.strength) ) {
            this.addScore();
        }
        bullet.kill();
    },

    onPlayerEnemyCollision: function (player, enemy) {
        enemy.reset();
        this.loseLife();
    },

    loseLife: function () {
        var live = this.lives.getFirstAlive();

        if (live) {
            live.kill();
        } else {
            this.player.sprite.kill();
            this.weapon.kill();
            this.enemies.callAll('kill');
        }
    },

    addScore: function () {
        this.score += 100;
        this.scoreText.text = 'score: ' + this.score;
    },

	quitGame: function (pointer) {
        
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},

    render: function () {
        this.game.debug.body(this.player.sprite);

        this.weapon.bullets.forEachAlive( function (bullet) {
            this.game.debug.body(bullet);
        }, this);
    }

};

   