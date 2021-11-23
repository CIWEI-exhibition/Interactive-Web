
var sound = new Howl({
    src: ['total.mp3'],
    volume: 1,
    autoplay: true,
    loop: true,
    onend : () => {     //오디오가 재생된 다음 실행할 내용
        console.log('Finished!');
    }
});

sound.play();

var time = 0;

function paused(){
    sound.pause();
    time = sound.currentTime();
}

window.onload = function(){

    // 부스 쪽
    var bgSky = document.querySelector(".bgSky");
    var bgStar1 = document.querySelector(".bgStar1");
    var bgStar2 = document.querySelector(".bgStar2");
    var bgStar3 = document.querySelector(".bgStar3");
    var bgMount1 = document.querySelector(".bgMount1");
    var bgMount2 = document.querySelector(".bgMount2");
    var bgMount3 = document.querySelector(".bgMount3");
    var bgMount4 = document.querySelector(".bgMount4");
    var bgGround = document.querySelector(".bgGround");


    //스크롤 이벤트 (패럴랙스 느낌) (처음 하늘쪽)
    window.addEventListener("scroll", function(event){      //스크롤 이벤트를 걸어주고
        var scroll = this.scrollY;                          // scroll이라는 변수에 scrollY값을 넣어준다.
        
      
    })

    window.addEventListener("scroll", function(event){
        var scroll2 = this.scrollX;

        bgStar1.style.transform = "translateX("+ -scroll2/2 + "px)";
        bgStar2.style.transform = "translateX("+ -scroll2/5.5 + "px)";
        bgStar3.style.trnasform = "translateX("+ -scroll2/3.5 + "px)";

        bgMount1.style.transform = "translateX("+ -scroll2/6 + "px)";
        bgMount2.style.transform = "translateX("+ -scroll2/10 + "px)";
        bgMount3.style.transform = "translateX("+ -scroll2/2 + "px)";
        bgMount4.style.transform = "translateX("+ -scroll2/3 + "px)";
    })
}

function openPuzzle1(){
    window.open("../page1/puzzle/puzzle1.html","Study","width=300px, height=300px");
}
function openPuzzle2(){
    window.open("../page1/puzzle/puzzle2.html","Love","width=300px, height=300px");
}
function openPuzzle3(){
    window.open("../page1/puzzle/puzzle3.html","Study","width=300px, height=300px");
}
function openPuzzle4(){
    window.open("../page1/puzzle/puzzle4.html","Healing","width=300px, height=300px");
}