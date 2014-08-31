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

    this.device;

    this.player;
    this.enemies;
    this.enemyBullets;
    this.weapon;
    this.background;

    this.highScore = 0;
    this.score = 0;
    this.scoreText;
    this.highScoreText;

    this.lives;
    this.bombs;
    this.enemyTimer = null;
    this.emitter;

    this.resultText;
    this.resultMenu;
    this.resultBtn;

    this.sfx;
    this.music;

    this.shakeWorld;

    this.lastTapTime = 0;
};



ShooterGame.Game.prototype = {

	create: function () {

        console.log("game");

        this.lastTapTime = this.game.input.activePointer.previousTapTime;

        this.device  = new Phaser.Device();

        this.sfx = this.game.add.audio('sfx');

        var sfxData = JSON.parse(this.game.cache.getText('sfxData'));
        for (var sprite in sfxData.spritemap) {
            var start = sfxData.spritemap[sprite].start;
            var end = sfxData.spritemap[sprite].end;
            this.sfx.addMarker(sprite, start, end - start);
            // console.log(sprite, start, end - start);
        }        
        this.music = this.game.add.audio('bgMusic');

        this.background = new ShooterGame.Background(this.game);
        this.background.create();

        this.scoreText = this.game.add.text(16, 16, 'Score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
        this.highScoreText = this.game.add.text(192, 16, 'High Score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });

        this.lives = this.game.add.group();
        this.game.add.text(this.game.world.width - 110, 16, 'Lives : ', { font: '20px Arial', fill: '#fff' });

        for (var i = 0; i < 3; i++) {
            var ship = this.lives.create(this.game.world.width - 100 + (40 * i), 60, 'main');
            ship.frameName = 'UI/playerLife1_red';
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.7;
        }

        this.bombs = this.game.add.group();
        this.game.add.text(this.game.world.width - 310, 16, 'Bombs : ', { font: '20px Arial', fill: '#fff' });
        for (var i = 0; i < 3; i++) {
            var bomb = this.bombs.create(this.game.world.width - 300 + (40 * i), 60, 'main');
            bomb.frameName = 'Power-ups/bolt_gold';
            bomb.anchor.setTo(0.5, 0.5);
            bomb.angle = 0;
            bomb.alpha = 0.7;
        }

        this.enemyBullets = this.game.add.group();
        this.enemyBullets.createMultiple(100, 'main', 0, false);

        this.player = new ShooterGame.Player(this.game);

        var numEnemies = 10 ;
        this.enemies = this.game.add.group();
        for (var i = 0; i < numEnemies; i++) {
            this.enemies.add(new ShooterGame.Enemy(this.game, this.player, this.enemyBullets) );
            this.enemies.add(new ShooterGame.Ufo(this.game, this.player, this.enemyBullets) );
            this.enemies.add(new ShooterGame.Asteroid(this.game, this.player));
        };

        this.weapon = new ShooterGame.Weapon(this.game, this.player, this.sfx);
        this.weapon.create();

        this.player.create();

        this.emitter = this.game.add.emitter(0, 0, 100);
        this.emitter.makeParticles('main', 'Effects/star2');
        this.emitter.gravity = 0;
        this.emitter.minParticleSpeed = new Phaser.Point(-200, -200);
        this.emitter.maxParticleSpeed = new Phaser.Point(200, 200);
        this.emitter.setAlpha(1, 0, 3000);

        this.resultText = this.game.make.text(this.game.width*0.5, this.game.height * 0.4, this.score, { font: "28px Arial", fill: "#ffffff", align: "center" });
        this.resultText.anchor.setTo(0.5, 0.5);

        this.resultMenu = this.game.make.sprite(this.game.width*0.5, this.game.height * 0.4, 'menuBg');
        this.resultMenu.anchor.setTo(0.5, 0.5);

        this.resultBtn = this.game.make.button(this.game.width*0.5, this.game.height * 0.5, 'restartBtn', this.startGame, this);
        this.resultBtn.anchor.setTo(0.5, 0.5);

        var prevHighScore = null;
        if(prevHighScore = localStorage.getItem('highScore'))  {
            this.highScore = prevHighScore;
            this.highScoreText.text = 'High Score: '+ this.highScore;
        }

       

        // this.startGame();
        this.game.time.events.add(2000, this.startGame, this);

	},  

    startGame: function() {

        this.music.play("", 0, 1, true);
        
        if(!this.player.sprite.alive) {
            this.player.sprite.reset(this.game.input.activePointer.x, this.game.input.activePointer.y);
            this.player.sprite.alpha = 1;

              for (var i = 0; i < 3; i++) {
                var ship = this.lives.getAt(i);
                ship.reset(this.game.world.width - 100 + (40 * i), 60);
             
             }
        }

        this.score = 0;
        this.scoreText.text = 'Score: ' + this.score;
        this.weapon.start();
        this.enemyTimer = this.game.time.events.loop(600, this.releaseEnemy, this);

        if(this.resultText){
            this.game.world.remove(this.resultText);
        }
        if(this.resultMenu) {
            this.game.world.remove(this.resultMenu);
        }
        if(this.resultBtn) {
            this.game.world.remove(this.resultBtn);
        }
    },

    releaseEnemy: function() {
        var e = this.enemies.getFirstExists(false);
        // console.log('next enemy', e);
        if(e) {
            e.release();
        }
        
    },

	update: function () {
        this.player.update();
        this.weapon.update();
        this.background.update();

        //check for enemy / weapon / player collisions
        this.game.physics.arcade.overlap(this.weapon.bullets, this.enemies, this.onBulletEnemyCollision, null, this);
        this.game.physics.arcade.overlap(this.enemyBullets, this.player.sprite, this.onBulletPlayerCollision, null, this);
        this.game.physics.arcade.overlap(this.player.sprite, this.enemies, this.onPlayerEnemyCollision, null, this);

        this.enemyBullets.forEachAlive(this.checkEnemyBulletBounds, this);

        var bTime = this.game.input.activePointer.previousTapTime - this.lastTapTime;
        this.lastTapTime = this.game.input.activePointer.previousTapTime;
        
        if( (bTime < 200 && bTime > 0)) {
            this.dropBomb();
        }

        if (this.shakeWorld > 0) {
            this.doShake();
        }
	},

    dropBomb: function() {
        var bomb = this.bombs.getFirstAlive();

        if (bomb) {
            bomb.kill();
            this.shakeWorld = 20;
            this.enemies.forEachAlive( function(enemy) {
                if(enemy.inCamera == true && enemy.x > 20) {
                    this.killEnemy(enemy);
                }
            }, this);
        }
    },

    doShake: function () {
        // console.log('shake');
        var rand1 = this.game.rnd.integerInRange(-10,10);
        var rand2 = this.game.rnd.integerInRange(-10,10);
        this.game.world.setBounds(rand1, rand2, this.game.width + rand1, this.game.height + rand2);
        this.shakeWorld--;
        if (this.shakeWorld == 0) {
            this.game.world.setBounds(0, 0, this.game.width, this.game.height); // normalize after shake?
        }    
    },

    checkEnemyBulletBounds: function(bullet) {
        if(bullet.x < 10 || bullet.y < 10 || bullet.y > this.game.height +10) {
            bullet.kill();
        }
    }, 

    onBulletEnemyCollision: function (bullet, enemy) {
        if ( enemy.loseHealth(this.weapon.strength) ) {
            this.addScore();
            this.emitter.x = enemy.x;
            this.emitter.y = enemy.y;
            this.emitter.start(true, 2000, null, 10);
            this.sfx.play('Explosion01');
        }

        bullet.kill();
    },

    killEnemy: function(enemy) {
        enemy.loseHealth(99);
        this.addScore();
        this.emitter.x = enemy.x;
        this.emitter.y = enemy.y;
        this.emitter.start(true, 2000, null, 10);
        this.sfx.play('Explosion01');

        var explosion = enemy.game.add.sprite(enemy.x, enemy.y, 'main');
        explosion.frameName = 'Effects/star3';
        explosion.anchor.setTo(0.5, 0.5);
        enemy.game.add.tween(explosion).to({alpha:0}, 500, Phaser.Easing.Linear.None, true);
        var exTween = enemy.game.add.tween(explosion.scale).to({x:15, y:15}, 500, Phaser.Easing.Linear.None, true);
        exTween.onComplete.add(function(){
            explosion.destroy();
        }, this);
    },

    onPlayerEnemyCollision: function (player, enemy) {
        if(this.player.invincible == false) {
            this.player.loseLife();

            this.emitter.x = enemy.x;
            this.emitter.y = enemy.y;
            this.emitter.start(true, 2000, null, 10);

            enemy.clean();

            this.loseLife();

            this.sfx.play('Explosion01');
        }
    },

    onBulletPlayerCollision: function(player, bullet) {
        if(this.player.invincible == false) {
            this.player.loseLife();
            this.loseLife();

            bullet.kill();
        }
    },

    loseLife: function () {
        var live = this.lives.getFirstAlive();

        if (live) {
            live.kill();
            this.sfx.play('Hurt01');
            this.shakeWorld = 20;
        } else {
            this.endGame();
        }
    },

    addScore: function () {
        this.score += 100;
        this.scoreText.text = 'Score: ' + this.score;
    },

    endGame: function () {
        this.emitter.x = this.player.sprite.x;
        this.emitter.y = this.player.sprite.y;
        this.emitter.start(true, 2000, null, 50);

        this.game.time.events.remove(this.enemyTimer);
        this.player.sprite.kill();
        this.weapon.kill();
        this.enemies.callAll('clean');
        this.enemyBullets.callAll('kill');

        this.game.world.add(this.resultMenu);

        this.game.world.add(this.resultText);
        this.resultText.text = this.score;

        this.game.world.add(this.resultBtn);

        if(this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreText.text = 'High Score: '+ this.highScore;   

            localStorage.setItem('highScore', this.highScore);
        }
        
        this.sfx.play('Gameover01');

        this.music.stop();

        this.shakeWorld = 40;
    },

	quitGame: function (pointer) {
        
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},

    render: function () {
        /*if(this.device.desktop == true) {
        
            this.game.debug.body(this.player.sprite);

            /*this.enemies.forEachAlive( function (enemy) {
                 this.game.debug.body(enemy);
            }, this);*/

            /*this.weapon.bullets.forEachAlive( function (bullet) {
                this.game.debug.body(bullet);
            }, this);
        }*/
    }

};

   