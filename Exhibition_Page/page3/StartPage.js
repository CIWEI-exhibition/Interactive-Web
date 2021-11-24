var StartPage = {
    preload : function(){
        //game 객체에서 menu 이미지를 로드한다.
        game.load.image('StartPage', './test.png');
    },
    create : function(){
        //이미지를 표시한다.
        this.add.button(0, 0, 'StartPage', this.startGame, this);
    },
    startGame : function(){
        //Change the state to the actual game.
        this.state.start('GameScene');
    }
};