let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.03;

window.onload = function(){
    // progressBar = document.getElementsByClassName("bar")[0];

    //이미지들 연결
    var blur = document.querySelector(".blur_wrapper");
    
    window.addEventListener('resize', stageResize, false);
    // window.addEventListener('mousemove', mouseMove, false);
    window.addEventListener('scroll', scrollFunc, false);

    stageResize();
    // loop();

}

function scrollFunc(e){
    var scrollTop = document.documentElement.scrollTop;

    let per = Math.ceil(scrollTop / (_documentHum - _windowNum) * 100);
    console.log(per);

    if(per == -142){
        
    }
    
    // progressBar.style.height = per + "%";   //세로 진행 바 위해

}

function stageResize() {        //per를 위한 함수 (document랑 window height값)
    _documentHum = document.body.offsetHeight;
    _windowNum = window.outerHeight;
}

wrapper = document.getElementById("wrapper");
submit = document.getElementById("submit");
error1 = document.getElementById("error1");
error2 = document.getElementById("error2");
error3 = document.getElementById("error3");
error4 = document.getElementById("error4");
error5 = document.getElementById("error5");
error6 = document.getElementById("error6");
error7 = document.getElementById("error7");
error8 = document.getElementById("error8");
error9 = document.getElementById("error9");


submit.addEventListener("click", function(e) {
    e.preventDefault;

    //assignment pop-up
    error1.style.display = "block";
    error1.style.animationPlayState = "running";
    error2.style.display = "block";
    error2.style.animationPlayState = "running";
    error3.style.display = "block";
    error3.style.animationPlayState = "running";
    error4.style.display = "block";
    error4.style.animationPlayState = "running";
    error5.style.display = "block";
    error5.style.animationPlayState = "running";
    error6.style.display = "block";
    error6.style.animationPlayState = "running";
    error7.style.display = "block";
    error7.style.animationPlayState = "running";
    error8.style.display = "block";
    error8.style.animationPlayState = "running";
    error9.style.display = "block";
    error9.style.animationPlayState = "running";

    //blur
    // -> removing the class
    wrapper.classList.remove("blur");
    
    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    wrapper.offsetWidth = wrapper.offsetWidth;
    
    // -> and re-adding the class
    wrapper.classList.add("blur");    

    setTimeout(wave, 9000);

}, false);
//blur 끝

var waveBox = document.querySelector(".box");

function wave(){
    // stripe.classList.add('animate');
    waveBox.style.display = "flex";
}