ShooterGame.MainMenu = function (game) {

	this.game = game;
	this.music = null;
	this.playButton = null;
	this.count = 0;

};

ShooterGame.MainMenu.prototype = {

	create: function () {

		console.log("main menu");

		transitionPlugin = this.game.plugins.add(Phaser.Plugin.StateTransition);

//define new properties to be tweened, duration, even ease
transitionPlugin.settings({

    //how long the animation should take
    duration: 1000,

    //ease property
    ease: Phaser.Easing.Exponential.InOut, /* default ease */

    //what property should be tweened
    properties: {
        alpha: 0,
        scale: {
            x: 1.5,
            y: 1.5
        }
    }
});

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		this.background = new ShooterGame.Background(this.game);
        this.background.create();
		

		this.playButton = this.add.button(this.game.world.centerX, this.game.world.centerY, 'main', this.startGame, this);
		this.playButton.anchor.setTo(0.5, 0.5);
		this.playButton.frameName = 'play_btn';

		this.game.add.tween(this.playButton).from({y: -this.playButton.height}, 1400, Phaser.Easing.Bounce.Out, true);

	},

	update: function () {

		//	Do some nice funky main menu effect here
		var animNum = (0.05 * Math.sin(this.count * 0.5 * Math.PI / 60)) + 1.05 ;
		this.playButton.scale.setTo( animNum );

		this.background.update();

		this.count ++;
	},

	startGame: function (pointer) {

		// Launch fullscreen for browsers that support it!
        //this.launchFullscreen(document.documentElement); // the whole page

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();
		//	And start the actual game

		var device  = new Phaser.Device();
		if(device.desktop == false) {

			this.game.scale.startFullScreen();
			this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            //wait for a 1 second to allow fullscreen change.
            this.game.time.events.add(1000, function() {
				transitionPlugin.to('Game');
            }, this);
		}
		else {
			transitionPlugin.to('Game');
		}

	},

	shutdown: function () {
		this.playButton.destroy();
		this.playButton = null;

		this.background.destroy();
		this.background = null;
	}

};