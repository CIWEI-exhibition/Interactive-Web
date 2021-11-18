var bg, bgFirst, bgSecond, bgStar, bgShootingStar, bgMoon, bgMoonlight;
var Building, Train, Pillars, Fadeout;
var Subway, SubwayHandle, SubwaySeat;
let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.03;
let scrollTop = 0;

window.onload = function(){

    //이미지들 연결
    bg = document.getElementById("bg");
    bgFirst = document.getElementById("bg-1");
    bgSecond = document.getElementById("bg-2");
    bgStar = document.getElementById("bg-3(star)");
    bgShootingStar = document.getElementById("bg-shooting");
    bgMoon = document.getElementById("bg-moon"); //배경 중 유일하게 움직이지 않도록
    bgMoonlight = document.getElementById("bg-moonlight");

    Building = document.getElementById("building");
    Train = document.getElementById("train");
    Pillars = document.getElementById("pillars");
    Fadeout = document.getElementById("fade-out");

    Subway = document.getElementById("subway");
    SubwayHandle = document.getElementById("subway-handle");
    SubwaySeat = document.getElementById("subway-seat");

    
    window.addEventListener("scroll", function(event){      //스크롤 이벤트를 걸어주고
        var scroll = this.scrollX;                          // scroll이라는 변수에 scrollY값을 넣어준다.

        bgShootingStar.style.transform = "translateX("+ -scroll/0.1 + "px)";    // 별똥별이 오-->왼으로 움직이는 것처럼 보이게 함.
        bgStar.style.transform = "translateX("+ -scroll/10 + "px)";
        bgFirst.style.transform = "translateX("+ -scroll/5 + "px)";
        bgSecond.style.transform = "translateX("+ -scroll/4 + "px)";
        bgMoon.style.transform = "translateX("+ scroll/2 + "px)";
        bgMoonlight.style.transform = "translateX("+ scroll/2 + "px)";

        // Pillars.style.transform = "translateX("+ -scroll/0.5 + "px)";
        Train.style.transform = "translateX("+ scroll/2 + "px)";
    
        window.addEventListener('resize', stageResize, false);
        window.addEventListener('mousemove', mouseMove, false);
        window.addEventListener('scroll', scrollFunc, false);
    
        stageResize();
        loop();
    })

    window.addEventListener("scroll", scrollRotate);

}


function scrollFunc(e){
    var scrollTop = document.documentElement.scrollTop;

//     let per = Math.ceil(scrollTop / (_documentHum - _windowNum) * 100);
//     progressBar.style.height = per + "%";   //세로 진행 바 위해

//     //패럴렉스 핵심
//     bg.style.transform = "translate3d(0px ," + scrollTop * .12 +"px, 0px)";
//     bgWall.style.transform = "translate3d(0px ," + scrollTop * .35 +"px , 0px)";
//     bgInterior.style.transform = "translate3d(0px ," + scrollTop * .35 +"px , 0px)";
//     com.style.transform = "translate3d(0px ," + scrollTop * .45 +"px , 0px)";

//     // stand1.style.transform = "translate3d(0px ," + scrollTop * .45 +"px , 0px)";
//     // stand2.style.transform = "translate3d(0px ," + scrollTop * .45 +"px , 0px)";

//     comLight.style.transform = "translate3d(0px ," + scrollTop * .47 +"px , 0px)";
//     comChair.style.transform = "translate3d(0px ," + scrollTop * .43 +"px , 0px)";
//     fgMoonlight.style.transform = "translate3d(0px ," + scrollTop * .55 +"px , 0px);"
//     fg.style.transform = "translate3d(0px ," + scrollTop * 1.55 +"px , 0px)";
}

function stageResize() {        //per를 위한 함수 (document랑 window height값)
    _documentHum = document.body.offsetHeight;
    _windowNum = window.outerHeight;
}

// function loop() {
//     mx += (x - mx) * speed;
//     my += (y - my) * speed;

//     sub.style.transform = "translate("+ mx / 30 +"px ," + -my / 30 +"px)";
//     subHandle.style.transform = "translate("+ mx / 50 +"px ," + -scrollTop * .85 +"px)";
//     subSeat.style.transform = "translate("+ -mx / 20 +"px ," + -my / 20 +"px)";

//     window.requestAnimationFrame(loop);
// }


// function mouseMove (e) {        //윈도우 width의 가운데 기준
//     x = (e.clientX - window.innerHeight / 2);
//     y = (e.clientY - window.innerHeight / 2);
// }

//------------------------------------------------------------------------------------------------
//전시 화면 fade out되는 코드
$(document).ready(function(){

    var navHeight = $(".wrapper").height(); /*wrapper의 높이*/

    $(".fade").hide(); /*스크롤 시 나타날 검은 화면 미리 숨기기*/

    $(window).scroll(function(){
        var rollIt = $(this).scrollTop() >= navHeight;
        /*scrollTop은 윈도우에서 스크롤 위치가 가장 상위에 있다는 의미
        --> 스크롤의 위치가 화면 아래일수록 scrollTop 값이 커짐 */

        if(rollIt){ 
            //윈도우 스크롤 기능의 값이 navHeight 의 높이와 같거나 크면
            $(".fade").show().css({"position":"fixed"});
        }
        else{
            $(".fade").hide();
        }
    
    });
})

//손잡이 애니메이션(버전2)
function scrollRotate(){
    let image = getElementById("subway-handle1");
    image.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
}

