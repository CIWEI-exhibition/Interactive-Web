let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.03;

window.onload = function(){
    // progressBar = document.getElementsByClassName("bar")[0];

    //이미지들 연결
    var bg = document.querySelector(".bg");

    var bgWall = document.querySelector(".bgWall");
    var bgInterior = document.querySelector(".bgInterior");

    var desk = document.querySelector(".desk");
    var deskClock = document.querySelector("deskClock");
    var com = document.querySelector(".com");
    var comMonitor2 = document.querySelector("comMonitor2");
    var comLogo = document.querySelector(".comLogo");
    var comChair = document.querySelector(".comChair");
    var standLight = document.querySelector(".standLight");

    var fgMoonlight = document.querySelector(".fgMoonlight");
    var fgFront = document.querySelector(".fgFront");

    window.addEventListener('resize', stageResize, false);
    window.addEventListener('mousemove', mouseMove, false);
    window.addEventListener('scroll', scrollFunc, false);

    stageResize();
    loop();
}

function scrollFunc(e){
    var scrollTop = document.documentElement.scrollTop;
    var scroll = this.scrollY;
    // console.log(scrollTop);     스크롤값 콘솔에 찍어봄

    // let per = Math.ceil(scrollTop / (_documentHum - _windowNum) * 100);
    // progressBar.style.height = per + "%";   //세로 진행 바 위해

    //패럴렉스 핵심(속도 같이 해야 하는 애들끼리 묶음!!)
    bgWall.style.transform = "translateY("+ -scroll/2 + "px)";

    bgInterior.style.transform = "translateY("+ -scroll/2 + "px)";

    desk.style.transform = "translateY("+ -scroll/2 + "px)";        //얘까지만 애니메이션 적용되고 뒤에 애들은 적용 안됨...왜why?
    deskClock.style.transform = "translateY("+ -scroll/2 + "px)";
    com.style.transform = "translateY("+ -scroll/2 + "px)";
    comMonitor2.style.transform = "translateY("+ -scroll/2 + "px)";
    comLogo.style.transform = "translateY("+ -scroll/2 + "px)";
    standLight.style.transform = "translateY("+ -scroll2 + "px)";

    comChair.style.transform = "translateY("+ -scroll/2 + "px)";
    
    fgMoonlight.style.transform = "translateY("+ -scroll/2 + "px)";
    fgFront.style.transform = "translateY("+ -scroll/2 + "px)";

    // bgWall.style.transform = "translateX("+ -scroll2/2 + "px)";
    // bgInterior.style.transform = "translate3d(0px ," + scrollTop * .35 +"px , 0px)";
    // com.style.transform = "translate3d(0px ," + scrollTop * .45 +"px , 0px)";

    // comLight.style.transform = "translate3d(0px ," + scrollTop * .47 +"px , 0px)";
    // comChair.style.transform = "translate3d(0px ," + scrollTop * .43 +"px , 0px)";
    // fgMoonlight.style.transform = "translate3d(0px ," + scrollTop * .55 +"px , 0px);"
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