let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.03;
let scrollTop = 0;
let bg, bgWall, bgInterior, desk, deskClock, com, comMonitor2, comLogo, comChair, standLight, fgMoonlight, fgFront;

window.onload = function(){
    // progressBar = document.getElementsByClassName("bar")[0];

    //이미지들 연결
    bg = document.querySelector(".bg");

    bgWall = document.querySelector(".bgWall");
    bgInterior = document.querySelector(".bgInterior");

    desk = document.querySelector(".desk");
    deskClock = document.querySelector("deskClock");
    com = document.querySelector(".com");
    comMonitor2 = document.querySelector("comMonitor2");
    comLogo = document.querySelector(".comLogo");
    comChair = document.querySelector(".comChair");
    standLight = document.querySelector(".standLight");

    fgMoonlight = document.querySelector(".fgMoonlight");
    fgFront = document.querySelector(".fgFront");

    window.addEventListener('resize', stageResize, false);
    window.addEventListener('mousemove', mouseMove, false);
    window.addEventListener('scroll', scrollFunc, false);

    stageResize();
    loop();
}

function scrollFunc(e){
    var scrollTop = document.documentElement.scrollTop;
    // console.log(scrollTop);     스크롤값 콘솔에 찍어봄

    let per = Math.ceil(scrollTop / (_documentHum - _windowNum) * 100);
    // progressBar.style.height = per + "%";   //세로 진행 바 위해

    //패럴렉스 핵심(속도 같이 해야 하는 애들끼리 묶음!!)
    bgWall.style.transform = "translate(0," + -scrollTop * .35 +"px)"

    bgInterior.style.transform = "translate(0," + -scrollTop * .35 +"px)"

    desk.style.transform = "translate(0," + -scrollTop * .45 +"px)"
    deskClock.style.transform = "translate(0," + -scrollTop * .45 +"px)"
    com.style.transform = "translate(0," + -scrollTop * .45 +"px)"
    comMonitor2.style.transform = "translate(0," + -scrollTop * .45 +"px)"
    comLogo.style.transform = "translate(0," + -scrollTop * .45 +"px)"
    standLight.style.transform = "translate(0," + -scrollTop * .45 +"px)"

    comChair.style.transform = "translate(0," + -scrollTop * .47 +"px)"
    
    fgMoonlight.style.transform = "translate(0," + -scrollTop * .55 +"px)"
    fgFront.style.transform = "translate(0," + -scrollTop * 5.5 +"px)"

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
