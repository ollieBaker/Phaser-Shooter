ShooterGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

ShooterGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');
		this.preloadBar.x = this.game.width/2  - this.preloadBar.width/2;
		this.preloadBar.y = this.game.height/2;
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
		
		/*this.load.image('titlepage', 'images/title.jpg');
		this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');*/

		this.load.atlasXML('main', 'assets/image/main@2x.png', 'assets/image/main@2x.xml');
		this.load.image('menuBg', 'assets/image/menu_bg.png');
		this.load.image('restartBtn', 'assets/image/restart_btn.png');

		/*this.load.audio('laser01', ['assets/sound/Laser01.ogg', 'assets/sound/Laser01.mp3'] );
		this.load.audio('laser02', ['assets/sound/Laser02.ogg', 'assets/sound/Laser02.mp3'] );
		this.load.audio('gameover01', ['assets/sound/Gameover01.ogg', 'assets/sound/Gameover01.mp3'] );
		this.load.audio('hurt01', ['assets/sound/Hurt01.ogg', 'assets/sound/Hurt01.mp3'] );
		this.load.audio('points01', ['assets/sound/Points01.ogg', 'assets/sound/Points01.mp3'] );
		this.load.audio('random01', ['assets/sound/Random01.ogg', 'assets/sound/Random01.mp3'] ) ;
		this.load.audio('explosion01', ['assets/sound/Explosion01.ogg', 'assets/sound/Explosion01.mp3'] );*/
		this.load.audio('bgMusic', ['assets/sound/loop3.ogg', 'assets/sound/loop3.mp3']);
		this.load.audio('sfx', ['assets/sound/sfx.ogg', 'assets/sound/sfx.mp3'] );
		this.load.text('sfxData', 'assets/sound/sfx.json');

		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

		// this.state.start('MainMenu');

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('bgMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};