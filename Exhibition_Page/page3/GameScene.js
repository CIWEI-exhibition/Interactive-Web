class GameScene extends Phaser.Scene{
    //이미지로드
    preload(){      //이미지, 사운드, json, data 로딩
        this.load.image("bg-1", "asset/images/Bg/bg-1.png");
        this.load.image("bg-2", "asset/images/Bg/bg-2.png");
        this.load.image("bg-3", "asset/images/Bg/bg-3.png");
        this.load.image("bg-4", "asset/images/Bg/bgReflect.png");
        this.load.image("bubble1", "asset/images/Deco/decoBubble1.png");
        this.load.image("bubble2", "asset/images/Deco/decoBubble2.png");
        this.load.image("fish", "asset/images/Deco/decoFish.png");
        this.load.image("jelly", "asset/images/Deco/decoJelly.png");
        this.load.image("book3", "asset/images/Items/Item3.png");
        this.load.spritesheet("player", "asset/images/Sprite/Sprites4.png", {frameWidth: 107, frameHeight: 167});
        this.load.image("start", "asset/images/Ment/MentStart.png");
        this.load.image("tap", "asset/images/Ment/MentTap.png");
        this.load.image("over", "asset/images/Ment/MentGameover.png");
        this.load.audio("jump", "asset/sound/jump.mp3");
        this.load.audio("hit", "asset/sound/hit.mp3");
    }

    create(){       //17분
        this.bg3 = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, "bg-3").setOrigin(0, 0);
        this.bubble1 = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, "bubble1").setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, "bg-2").setOrigin(0, 0);
        this.bubble2 = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, "bubble2").setOrigin(0, 0);
        this.fish = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, "fish").setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, "bg-1").setOrigin(0, 0);
        this.jelly = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, "jelly").setOrigin(0, 0);
        this.bg4 = this.add.tileSprite(0, HEIGHT-220, WIDTH, 1920, "bg-4").setOrigin(0, 0);
        // this.scoreText = this.add.text(5, 5, 'Points: 0', { font: '24px Arial', fill: '#0095DD' });
        // this.score = 0;

        this.anims.create({     //19~20분
            key: "run",
            frames: this.anims.generateFrameNames("player", {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });

        //20분
        this.player = this.physics.add.sprite(200, HEIGHT-300);
        this.player.body.setSize(100, 300);   //충돌영역 지정
        this.player.play("run");

        //22분
        var randomX = Phaser.Math.Between(1000, 1500);    //다른 위치에서 생성됨
        this.delay = randomX;
        this.timer = this.time.addEvent({delay: this.delay,
            callback: this.onTimerEvent, callbackScope: this, loop: true });
        
        //30분
        // gameState.Sound = this.sound.add("jump");
        // this.input.keyboard.on('keydown-W', function() {
        //     console.log(gameState);
        //     gameState.square.fillColor = 0xFFFF00;
        //   });
        this.input.keyboard.on('keydown-SPACE', function(){
            this.sound.add("jump").play();
            if(this.player.y < HEIGHT-300) 
                return;
            this.tweens.add({
                targets: this.player,
                y: this.player.y-400,    //점프높이
                duration: 400,      //점프기간(ms)
                yoyo: true,
            });
        }.bind(this));
    }

    onTimerEvent(){
        this.addBook3();
    }

    addBook3(){      //23분
        this.book3Group = this.physics.add.group();
        var randomX = Phaser.Math.Between(300, 600);    //다른 위치에서 생성됨
        var book3 = this.physics.add.sprite(WIDTH+randomX-300, HEIGHT-280, "book3").setScale(1);
        book3.body.setSize(100, 150);
        this.book3Group.add(book3);

        //player와 비교하는 로직
        this.physics.add.overlap(this.book3Group, this.player, this.hitBook3Player, null, this);

        this.tweens.add({
            targets: book3,
            x: 0,
            duration: 1000,
            onComplete: function(tween, targets){
                book3.destroy();
                // this.score += 10;
                // this.scoreText.setText('Points: '+this.score);
            }.bind(this)
        })
    }

    hitBook3Player(){
        this.sound.add("hit").play();
        alert("Game Over!");
        this.scene.restart();
    }
    
    update(){
        this.bg3.tilePositionX += 3;
        this.bg2.tilePositionX += 4;
        this.bg1.tilePositionX += 5;
        this.bg4.tilePositionX += 5;
        this.bubble1.tilePositionX += 2;
        this.bubble1.tilePositionY += 0.5;
        this.bubble2.tilePositionX += 1;
        this.bubble2.tilePositionY -= 0.3;
        this.fish.tilePositionX += 6;
        this.jelly.tilePositionX += 7;
        this.jelly.tilePositionY += 0.5;
    }
}