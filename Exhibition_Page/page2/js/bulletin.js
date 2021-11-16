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

//blur
wrapper = document.getElementById("wrapper");
submit = document.getElementById("submit");

submit.addEventListener("click", function(e) {
    e.preventDefault;
    
    // -> removing the class
    wrapper.classList.remove("blur");
    
    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    wrapper.offsetWidth = wrapper.offsetWidth;
    
    // -> and re-adding the class
    wrapper.classList.add("blur");
}, false);
//blur 끝