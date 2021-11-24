window.onload = function(){
    var sound = new Howl({
        src: ['underwater.mp3'],
        volume: 1,
        autoplay: true,
        loop: true,
        onend : () => {     //오디오가 재생된 다음 실행할 내용
            console.log('Finished!');
        }
    });

    sound.play();
}