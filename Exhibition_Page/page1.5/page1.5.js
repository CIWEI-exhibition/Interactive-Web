var bg, bgFirst, bgSecond, bgStar, bgShootingStar, bgMoon;
var Building, Train, Pillars, Fadeout;
var Subway, SubwayHandle, SubwaySeat;

window.onload = function(){

    //이미지들 연결
    bg = document.getElementById("bg");
    bgFirst = document.getElementById("bg-1");
    bgSecond = document.getElementById("bg-2");
    bgStar = document.getElementById("bg-3(star)");
    bgShootingStar = document.getElementById("bg-shooting");
    bgMoon = document.getElementById("bg-moon"); //배경 중 유일하게 움직이지 않도록

    Building = document.getElementById("building");
    Train = document.getElementById("train");
    Pillars = document.getElementById("pillars");
    Fadeout = document.getElementById("fade-out");

    Subway = document.getElementById("subway");
    SubwayHandle = document.getElementById("subway-handle");
    SubwaySeat = document.getElementById("subway-seat");

    
    window.addEventListener("scroll", function(event){      //스크롤 이벤트를 걸어주고
        var scroll = this.scrollX;                          // scroll이라는 변수에 scrollY값을 넣어준다.
        
        bgMoon.style.transform = "translateX("+ scroll/1 + "px)";

        bgShootingStar.style.transform = "translateX("+ -scroll/0.1 + "px)";    // 별똥별이 오-->왼으로 움직이는 것처럼 보이게 함.
        bgStar.style.transform = "translateX("+ -scroll/10 + "px)";
        bgFirst.style.transform = "translateX("+ -scroll/8 + "px)";
        bgSecond.style.transform = "translateX("+ -scroll/6 + "px)";
        Pillars.style.transform = "translateX("+ -scroll/0.5 + "px)";
    })

}