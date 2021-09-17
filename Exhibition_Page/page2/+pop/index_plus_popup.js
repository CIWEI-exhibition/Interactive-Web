$(document).ready(function(){
    $('.trigger').on('click', function() {
        $('.modal-wrapper').toggleClass('open');
        $('.wrapper').toggleClass('blur-it');
        return false;
    });
});