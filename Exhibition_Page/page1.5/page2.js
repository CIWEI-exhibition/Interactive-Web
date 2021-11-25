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

    var sound = new Howl({
        src: ['subway_last.mp3'],
        volume: 1,
        autoplay: true,
        loop: true,
        onend : () => {     //오디오가 재생된 다음 실행할 내용
            console.log('Finished!');
        }
    });
    sound.play();

    var sound2 = new Howl({
        src: ['messenger_last.mp3'],
        volume: 1,
        autoplay: true,
        onend : () => {     //오디오가 재생된 다음 실행할 내용
            console.log('Finished!');
        }
    });
    function messengerSound(){
        sound2.play();
    }

    //이미지들 연결
    bg = document.getElementById("bg");
    bgFirst = document.getElementById("bg-1");
    bgSecond = document.getElementById("bg-2");
    bgStar = document.getElementById("bg-3");
    bgShadow = document.getElementById("bg-shadow");
    bgShootingStar = document.getElementById("bg-shooting");
    bgMoon = document.getElementById("bg-moon");
    bgMoonlight = document.getElementById("bg-moonlight");

    Building = document.getElementById("building");
    Train = document.getElementById("train");
    Fadeout = document.getElementById("fade-out");

    Subway = document.getElementById("subway");
    SubwayHandle = document.getElementById("subway-handle");
    SubwaySeat = document.getElementById("subway-seat");

    chat1 = document.getElementById("chat_1");
    chat2 = document.getElementById("chat_2");
    chat3 = document.getElementById("chat_3");
    chat4 = document.getElementById("chat_4");
    chat5 = document.getElementById("chat_5");
    chat6 = document.getElementById("chat_6");


    window.addEventListener("scroll", function(event){      //스크롤 이벤트를 걸어주고
        var scroll = this.scrollX;                          // scroll이라는 변수에 scrollY값을 넣어준다.

        bgShootingStar.style.transform = "translateX("+ -scroll/0.1 + "px)";    // 별똥별이 오-->왼으로 움직이는 것처럼 보이게 함.
        bgStar.style.transform = "translateX("+ -scroll/10 + "px)";
        bgFirst.style.transform = "translateX("+ -scroll/5 + "px)";
        bgSecond.style.transform = "translateX("+ -scroll/4 + "px)";
        bgShadow.style.transform = "translateX("+ -scroll/4 + "px)";
        bgMoon.style.transform = "translateX("+ scroll/2 + "px)";
        bgMoonlight.style.transform = "translateX("+ scroll/2 + "px)";

        // Pillars.style.transform = "translateX("+ -scroll/0.5 + "px)";
        Train.style.transform = "translateX("+ scroll/0.1 + "px)";
    
        window.addEventListener('resize', stageResize, false);
        window.addEventListener('mousemove', mouseMove, false);
        window.addEventListener('scroll', scrollFunc, false);
    
        stageResize();
        loop();
    })

}




function stageResize() {        //per를 위한 함수 (document랑 window height값)
    _documentHum = document.body.offsetHeight;
    _windowNum = window.outerHeight;
}

//------------------------------------------------------------------------------------------------
//전시 화면 fade out되는 코드
// $(window).on("load", function () {
//     function fade() {
//       let animation_height = $(window).innerHeight() * 0.5;
//       let ratio = Math.round((1 / animation_height) * 10000) / 10000;
//       $(".fade").each(function () {
//         let objectTop = $(this).offset().top;
//         let windowBottom = $(window).scrollTop() + $(window).innerHeight();
//         if (objectTop < windowBottom) {
//           if (objectTop < windowBottom - animation_height) {
//             $(this).css({
//               transition: "opacity 0.1s linear",
//               transition: "left 0.1s linear",
//               opacity: 1,
//               left: "0px",
//             });
//           } else {
//             $(this).css({
//               transition: "opacity 0.5s linear",
//               opacity: (windowBottom - objectTop) * ratio,
//               transition: "left 0.5s linear",
//               left: `${200 * (1 - (windowBottom - objectTop) * ratio)}px`,
//             });
//           }
//         } else {
//           $(this).css({
//             opacity: 0,
//             left: "200px",
//           });
//         }
//       });
//     }
//     $(".fade").css({
//       opacity: 0,
//       left: "200px",
//     });
//     fade();

//     $(window).scroll(function () {
//       fade();
//     });
//   });

//-------------------------------------------------------------------------
//채팅창 애니메이션
var typingBool = false; 
var typingIdx=0; 

// 타이핑될 텍스트를 가져온다 
var typingTxt = $(".typing-txt").text(); 

typingTxt=typingTxt.split(""); // 한글자씩 자른다. 

if(typingBool==false){ 
  // 타이핑이 진행되지 않았다면 
   typingBool=true;     
   var tyInt = setInterval(typing,100); // 반복동작 
} 
     
function typing(){ 
  if(typingIdx<typingTxt.length){ 
    // 타이핑될 텍스트 길이만큼 반복 
    $(".typing").append(typingTxt[typingIdx]);
    // 한글자씩 이어준다. 
    typingIdx++; 
   } else{ 
     //끝나면 반복종료 
    clearInterval(tyInt); 
   } 
}  