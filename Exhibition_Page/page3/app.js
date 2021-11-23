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

const GAME = new Phaser.Game(config);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;
