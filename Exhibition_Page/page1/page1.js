$("#id").on('mousewheel',function(e){

    var wheelDelta = e.originalEvent.wheelDelta;

    if(wheelDelta > 0){

        console.log("up");

        $(this).scrollLeft(-wheelDelta + $(this).scrollLeft());

    }else{

    console.log("down");

        $(this).scrollLeft(-wheelDelta + $(this).scrollLeft());

    }

});