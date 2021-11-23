let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.03;
let scrollTop = 0;
let bgwater, bgbottom, bgfish1, bgfish2, bgfish3, bgjellyfish, whale2, rock_shadow, rock1, bottom,
    fish, jellyfish, whale,
    rock, bottom_room_light, bottom_room, door1, door2, door3, door4, door5_bottom, room1, room2, room3, room4, world1, star, star2;

window.onload = function(){

    var sound = new Howl({
        src: ['underwater.mp3'],
        volume: 1,
        autoplay: true,
        loop: true,
        onend : () => {     //오디오가 재생된 다음 실행할 내용
            console.log('Finished!');
        }
    });

    sound.play();

    //이미지들 연결
    bgwater = document.getElementById("bg");
    bgbottom = document.getElementById("bg-bottom");
    bgfish1 = document.getElementById("fish1");
    bgfish2 = document.getElementById("fish2");
    bgfish3 = document.getElementById("fish3");
    bgjellyfish = document.getElementById("jellyfish2");
    whale2 = document.getElementById("whale2");
    rock_shadow = document.getElementById("rock_shadow");
    rock1 = document.getElementById("rock1");
    bottom = document.getElementById("bottom");

    fish = document.getElementById("fish");
    jellyfish = document.getElementById("jellyfish");
    whale = document.getElementById("whale");
    star1 = document.getElementById("star1");
    star2 = document.getElementById("star2");

    rock = document.getElementById("rock");
    bottom_room_light = document.getElementById("bottom_room_light");
    bottom_room = document.getElementById("bottom_room");
    // door1 = document.getElementById("door1");
    // door2 = document.getElementById("door2");
    // door3 = document.getElementById("door3");
    // door4 = document.getElementById("door4");
    room1 = document.getElementById("room1");
    room2 = document.getElementById("room2");
    room3 = document.getElementById("room3");
    room4 = document.getElementById("room4");

    world1 = document.getElementById("world1");

    window.addEventListener("scroll", function(event){      //스크롤 이벤트를 걸어주고
        var scroll = this.scrollY;    
    
        //패럴렉스 핵심
        bgfish1.style.transform = "translateX("+ -scroll/8 + "px)";
        bgfish2.style.transform = "translateX("+ scroll/10 + "px)";
        bgfish3.style.transform = "translateX("+ -scroll/6 + "px)";
        bgjellyfish.style.transform = "translateX("+ scroll/10 + "px)";
        whale2.style.transform = "translateX("+ scroll/2 + "px)";
    
        fish.style.transform = "translateX("+ scroll/4 + "px)";
        jellyfish.style.transform = "translateX("+ -scroll/10 + "px)";
        whale.style.transform = "translateX("+ -scroll/6 + "px)";

        star1.style.transform = "translateY("+ -scroll/5 + "px)";
        star2.style.transform = "translateY("+ -scroll/2 + "px)";
        
        window.addEventListener('resize', stageResize, false);
        window.addEventListener('mousemove', mouseMove, false);
        window.addEventListener('scroll', scrollFunc, false);
    
        stageResize();
        loop();
    })

    function scrollFunc(e){
        var scrollTop = document.documentElement.scrollTop;
    }
    
    function stageResize() {        //per를 위한 함수 (document랑 window height값)
        _documentHum = document.body.offsetHeight;
        _windowNum = window.outerHeight;
    }
    
    function mouseMove (e) {        //윈도우 width의 가운데 기준
        x = (e.clientX - window.innerHeight / 2);
        y = (e.clientY - window.innerHeight / 2);
    }
}

function scrollFunc(e){
    var scrollTop = document.documentElement.scrollTop;
}

function stageResize() {        //per를 위한 함수 (document랑 window height값)
    _documentHum = document.body.offsetHeight;
    _windowNum = window.outerHeight;
}

// 팝업창
function open_pop1(flag){
    $('#Modal1').css('display','block');
};
function open_pop2(flag){
    $('#Modal2').css('display','block');
};
function open_pop3(flag){
    $('#Modal3').css('display','block');
};
function open_pop4(flag){
    $('#Modal4').css('display','block');
};
  
function close_pop1(flag) {
    $('#Modal1').hide();
};
function close_pop2(flag) {
    $('#Modal2').hide();
};
function close_pop3(flag) {
    $('#Modal3').hide();
};
function close_pop4(flag) {
    $('#Modal4').hide();
};

