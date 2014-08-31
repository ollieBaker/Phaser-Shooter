ShooterGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check ShooterGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};

ShooterGame.Boot = function (game) {
};

ShooterGame.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        //this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        this.load.image('preloaderBar', 'assets/image/preloader_bar.png');

    },

    create: function () {

        this.input.maxPointers = 1;
        // this.stage.disableVisibilityChange = true;
        //console.log(this.game.width, this.game.height)
        var defWidth = this.game.width;
        var defHeight = this.game.height;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = defWidth * 0.5;
            this.scale.minHeight = defHeight * 0.5;
            this.scale.maxWidth = defWidth;
            this.scale.maxHeight = defHeight;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {            
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//change??
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = defWidth * 0.5;
            this.scale.minHeight = defHeight * 0.5;
            this.scale.maxWidth = defWidth;
            this.scale.maxHeight = defHeight;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true); 
        }

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        ShooterGame.orientated = false;

        this.game.paused = true;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        ShooterGame.orientated = true;

        this.game.paused = false;

        document.getElementById('orientation').style.display = 'none';

    }

};