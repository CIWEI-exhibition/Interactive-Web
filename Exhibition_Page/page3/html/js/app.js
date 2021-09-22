// 속성 정보
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',     //게임의 배경색
    scene: [GameScene],             //실제 게임이 구현되는 곳(Scene): []안의 내용
    scale: {        //브라우저 크기를 늘이고 줄여도 Scene이 게임 화면에 꽉 차게 만들어주는 옵션
        mode: Phaser.Scale.FIT,
        width: 1920,        //게임 화면 사이즈
        height: 1080,
        autoCenter: Phaser.Scale.CENTER_BOTH        //게임이 화면 정중앙에 위치
    },
    physics: {      //충돌체크.
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    pixelArt: true,     //작은 이미지를 늘렸을때 뿌얘지는 현상 방지
};

//속성 정보를 Phaser.Game이라는 곳에 넣어준다.
const GAME = new Phaser.Game(config);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;