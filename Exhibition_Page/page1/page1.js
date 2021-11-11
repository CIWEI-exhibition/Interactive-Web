window.onload = function(){

    var sky = document.querySelector(".sky");
    var star = document.querySelector(".star");
    var star2 = document.querySelector(".star2");
    var moon = document.querySelector(".moon");
    var shootingStar = document.querySelector(".shootingStar");

    //저절로 내려가게 하는 효과
    TweenMax.to(window, 4, {               //TweenMax적용함. 전체 window에, 2초,
        scrollTo:{
            y: ".bottom",                    //스크롤이 y의 끝
        },
        delay: 1.7,                        //1.7초 있다 내려감
        ease:Power3.easeInOut              //무슨 의미인진 모르겠으나 필요하다고 함.
    });

    //스크롤 이벤트 (패럴랙스 느낌) (처음 하늘쪽)
    window.addEventListener("scroll", function(event){      //스크롤 이벤트를 걸어주고
        var scroll = this.scrollY;                          // scroll이라는 변수에 scrollY값을 넣어준다.
        
        star.style.transform = "translateY("+ -scroll/4 + "px)";            //별이 올라가는것처럼 보이게 함. + 느리게 (별 이미지 추가하면 더 좋을듯)
        star2.style.transform = "translateY("+ -scroll/0.5 + "px)";
        moon.style.transform = "translateY("+ -scroll/10 + "px)";           //달이 천천히 올라가는 것처럼 보이게 함.
        shootingStar.style.transform = "translateX("+ -scroll/6 + "px)";    // 별똥별이 오-->왼으로 움직이는 것처럼 보이게 함.
    })

    window.addEventListener("scroll", function(event){
        var scroll2 = this.scrollX;

        bgstar.style.transform = "translateX("+ -scroll2/6 + "px)";
        bgmountain.style.transform = "translateX("+ -scroll2/3 + "px)";
    })
}