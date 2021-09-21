// window.onload = function($){
//     document.getElementById('monitor').onclick = function(){
//         $(".modal-wrapper").toggleClass("open");
//         $(".wrapper").toggleClass("blur-it");
//         return false;
//     };
// };

$(function(){
    $("#modal-open").click(function(){        
        $("#popup").css('display','flex').hide().fadeIn();
        $(".wrapper").toggleClass("blur-it");
    });
    $("#close").click(function(){
        modalClose();
    });
    function modalClose(){
      $("#popup").fadeOut();
    }
  });