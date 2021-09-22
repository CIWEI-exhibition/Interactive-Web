class GameScene extends Phaser.Scene{       //phaser에서 scene이라는 class가 있는 것을 상속받아서, 우리는 GameScene에다가 넣는다.
    preload(){      //게임 로직 작성 전, 준비를 하는 곳(이미지, 사운드, 데이터, json 등)
        this.load.setPath('../assets/images');     //홈 path 설정
        //배경
        this.load.image('bg_3', 'Bg/bg-3.png');     //앞: 키값(이름)
        this.load.image('bg_2', 'Bg/bg-2.png');
        this.load.image('bg_1', 'Bg/bg-1.png');
        this.load.image('bg_0', 'Bg/bgReflect.png');

        //장애물(아이템)
        this.load.image('book1', 'Items/Item1.png');
        this.load.image('book2', 'Items/Item2.png');
        this.load.image('book3', 'Items/Item3.png');

        //데코
        this.load.image('decoBubble1', 'Deco/decoBubble1.png');
        this.load.image('decoBubble2', 'Deco.decoBubble2.png');
        this.load.image('decoFish', 'Deco/decoFish.png');
        this.load.image('decoJelly', 'Deco/decoJelly.png');

        //플레이어(스프라이트)
        this.load.spritesheet('player', 'Sprite/Sprite.png', {frameWidth: 99, frameHeight: 165});       //폭과 넓이만큼 이미지를 잘라서 여러장으로 저장한다.
    }
 
    create(){       //이미지 로딩된 후의 함수
        this.bg_3 = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, 'bg_3')      //앞에 지나간 애들은 잘려서 다시 뒤로 붙음-->흐르는 효과
            .setOrigin(0, 0);
        this.bg_2 = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, 'bg_2')
            .setOrigin(0, 0);
        this.bg_1 = this.add.tileSprite(0, HEIGHT-1080, WIDTH, 1920, 'bg_1')
            .setOrigin(0, 0);
        this.bg_0 = this.add.tileSprite(0, HEIGHT-213, WIDTH, 1920, 'bg_0')
            .setOrigin(0, 0);

        //animation
        this.anims.create({     //anims.create라는 함수를 이용해서
            key: 'run',         //run이라는 애니메이션을 만든다.
            //run 이라는 애니메이션은 /frame이 player이미지를 이용하고,/ 시작은 0 끝은 2(3장이니까)
            frames: this.anims.generateFrameNames('player', {start: 0, end: 2}),
            frameRate: 15,   //사진 세장이 바뀌는 속도
            repeat: -1      //이걸 선언 안하면 가만히 있음. 이걸 선언해야 반복적으로 애니메이션을 보여준다.
        });     //따라서 앞으로 run이라는 애니메이션를 호출하면, 선언한 프레임 세장이 반복적으로 애니메이션 된다.

        //player
        this.player = this.physics.add.sprite(300, HEIGHT-280);      //50의 위치에, 화면 높이 제일 위에서 100정도 -된 곳에 스프라이트 생성(이미지는 없는 상태)
        this.player.body.setSize(60, 300);       //충돌 영역 지정
        this.player.play('run');        //애니메이션 삽입 --> 스프라이트 등장

        //book
        this.delay = 3000;      //ms. 3초마다
        this.timer = this.time.addEvent({delay: this.delay,
            callback: this.onTimerEvent, callbackScope: this, loop: true });

        //입력받기
        this.input.on('pointerdown', function(pointer){     //pointerdown: 눌렸을때(마우스 클릭, 터치), 뒤에 function 호출
            if(this.player.y < HEIGHT-100)        //더블점프 방지(현 위치이면 실행 안하고 빠져나간다)
                return;     
            this.tweens.add({           //점프 애니메이션
                targets: this.player,
                y: this.player.y-50,    //점프 높이
                duration: 500,          //점프 지속시간
                yoyo: true,             //원상태로 돌리는것까지 구현
            });
        }.bind(this));
    }

    onTimerEvent(){
        this.addBook();
    }

    addBook(){
        this.book1Group = this.physics.add.group();      //장애물 여러개 나오니까 group 사용.
        var randomX = Phaser.Math.Between(600, 1850);       //장애물 나타나는 간격(두 숫자 사이 랜덤하게 나온다.)
        var book1 = this.physics.add.sprite(WIDTH+randomX+100, HEIGHT-220,'book1').setScale(1.0);
        book1.body.setSize(150, 50);      //충돌 영역 조절
        this.book1Group.add(book1);     //여러개의 book1을 book1Group에 담는다.

        //book animation
        this.tweens.add({       //여러 애니메이션들 있나봄
            targets: book1,     //타겟: book1
            x: 0,       //변화(화면 끝에서 생성된 것을, x: 0의 위치까지 이동시킨다.)
            duration: 2000,     //2초동안 변화가능❤❤❤
            onComplete: function(tween, targets){       //완료되면 호출되는 함수. 제거한다.
                book1.destroy();
            }.bind(this)
        })
        //addBook(장애물)과 player(플레이어)가 겹치면, hitBookPlayer 함수를 호출한다.
        this.physics.add.overlap(this.book1Group, this.player, this.hitBookPlayer, null, this); 
    }

    hitBookPlayer(){        //둘이 부딪혔을때
        alert("Game Over"); 
        this.scene.restart();
    }

    update(){       //매 프레임마다 호출되는 함수
        this.bg_3.tilePositionX += 2;
        this.bg_2.tilePositionX += 3;
        this.bg_1.tilePositionX += 5;
        this.bg_0.tilePositionX += 6;
    }
}