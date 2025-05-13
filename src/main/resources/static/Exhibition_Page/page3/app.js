const config = {
    type: Phaser.AUTO,
    backgroundColor: "#246d9b",
    scene: [GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
       
    },
    pixelArt: true,
};

var game = new Phaser.Game(config);
var WIDTH = game.config.width;
var HEIGHT = game.config.height;

// game.state.add('StartPage',StartPage);
// game.state.add('GameScene',GameScene);

// game.state.start('StartPage');


