let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.03;

window.onload = function(){
    
    var sound = new Howl({
        src: ['room.mp3'],
        volume: 1,
        autoplay: true,
        loop: true,
        onend : () => {     //오디오가 재생된 다음 실행할 내용
            console.log('Finished!');
        }
    });

    sound.play();

    // progressBar = document.getElementsByClassName("bar")[0];

    //이미지들 연결
    var bg = document.querySelector(".bg");

    var bgWall = document.querySelector(".bgWall");
    var bgInterior = document.querySelector(".bgInterior");

    var desk = document.querySelector(".desk");
    var deskClock = document.querySelector("deskClock");
    var com = document.querySelector(".com");
    var comLogo = document.querySelector(".comLogo");
    var comChair = document.querySelector(".comChair");
    var standLight = document.querySelector(".standLight");

    var fgMoonlight = document.querySelector(".fgMoonlight");
    var fgFront = document.querySelector(".fgFront");

    var fgMonitor = document.querySelector(".fgMonitor");

    window.addEventListener('resize', stageResize, false);
    window.addEventListener('mousemove', mouseMove, false);
    window.addEventListener('scroll', scrollFunc, false);

    stageResize();
    // loop();

}

function scrollFunc(e){
    var scrollTop = document.documentElement.scrollTop;
    var scroll = this.scrollY;

    let per = Math.ceil(scrollTop / (_documentHum - _windowNum) * 100);
    console.log(per);

    if(per <= 0){
        // comLogo.style.position = "fixed";
        fgMoonlight.style.position = "fixed";
        fgFront.style.position = "fixed";
    }
    
    // progressBar.style.height = per + "%";   //세로 진행 바 위해

    //패럴렉스 핵심(속도 같이 해야 하는 애들끼리 묶음!!)
    bgWall.style.transform = "translateY("+ scroll/2 + "px)";

    bgInterior.style.transform = "translateY("+ scroll/3 + "px)";

    desk.style.transform = "translateY("+ scroll/4 + "px)";        
    deskClock.style.transform = "translateY("+ scroll/4 + "px)";
    com.style.transform = "translateY("+ scroll/4 + "px)";
    comLogo.style.transform = "translateY("+ -scroll/40 + "px)";
    standLight.style.transform = "translateY("+ scroll/4 + "px)";

    comChair.style.transform = "translateY("+ -scroll/30 + "px)";
    
    fgMoonlight.style.transform = "translateY("+ -scroll/2 + "px)";
    fgFront.style.transform = "translateY("+ scroll/10 + "px)";

    fgMonitor.style.transform = "translateY("+ scroll/4 + "px)";
    // fg.style.transform = "translate3d(0px ," + scrollTop * 1.55 +"px , 0px)";
}

function stageResize() {        //per를 위한 함수 (document랑 window height값)
    _documentHum = document.body.offsetHeight;
    _windowNum = window.outerHeight;
}

// function loop() {
//     mx += (x - mx) * speed;
//     my += (y - my) * speed;

//     bgWall.style.transform = "translate("+ mx / 30 +"px ," + -my / 30 +"px)";
//     fgMoonlight.style.transform = "translate("+ mx / 50 +"px ," + -scrollTop * .85 +"px)";
//     fg.style.transform = "translate("+ -mx / 20 +"px ," + -my / 20 +"px)";

//     window.requestAnimationFrame(loop);
// }


function mouseMove (e) {        //윈도우 width의 가운데 기준
    x = (e.clientX - window.innerHeight / 2);
    y = (e.clientY - window.innerHeight / 2);
}

function open_pop(flag){
    $('#com-light').css('display','block');
};

function close_pop(flag) {
    $('#com-light').hide();
};