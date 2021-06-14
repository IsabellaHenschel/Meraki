jQuery(document).ready(function($){

    window.onscroll = function(){
        if(window.pageYOffset > 50){
            $('#header').addClass("fixar");
    } else{
        $('#header').removeClass("fixar");
    }
    };
});