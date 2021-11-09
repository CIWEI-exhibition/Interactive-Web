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



    //저절로 내려가게 하는 효과
    // TweenMax.to( window, 4, {               //TweenMax적용함. 전체 window에, 2초,
    //     scrollTo:{
    //         y: ".bottom"                    //스크롤이 y의 끝   
    //     },
    //     delay: 1.7,                        //1.7초 있다 내려감
    //     ease: Power4.easeInOut               //무슨 의미인진 모르겠으나 필요하다고 함.
    // });
}

//가로 스크롤