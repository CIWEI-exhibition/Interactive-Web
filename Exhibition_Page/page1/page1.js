window.onload = function(){

    var sky = document.querySelector(".sky");
    var star = document.querySelector(".star");
    var moon = document.querySelector(".moon");
    var shootingStar = document.querySelector(".shootingStar");

    //스크롤 이벤트 (패럴랙스 느낌)
    window.addEventListener("scroll", function(event){      //스크롤 이벤트를 걸어주고
        var scroll = this.scrollY;                          // scroll이라는 변수에 scrollY값을 넣어준다.
        
        star.style.transform = "translateY("+ -scroll/3 + "px)";
        moon.style.transform = "translateY("+ -scroll + "px)";
        shootingStar.style.transform = "translateX("+ -scroll/6 + "px)";
    })
}