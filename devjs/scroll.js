(function(){

    var position = function () {
      return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    };


  window.addEventListener("DOMContentLoaded", function(e){
    var scrollBtn_1 = document.getElementById("scroll-down-1");
    var scrollBtn_2 = document.getElementById("scroll-down-2");
    var scrollBtn_3 = document.getElementById("scroll-down-3");
    var scrollBtn_4 = document.getElementById("scroll-up");

    scrollBtn_1.setAttribute("data-scrollTarget", "skill");
    scrollBtn_2.setAttribute("data-scrollTarget", "introduction");
    scrollBtn_3.setAttribute("data-scrollTarget", "resume");


    var clickToscroll = function(e){
        var target = this.getAttribute("data-scrollTarget");
        var mainTop = document.getElementsByTagName("main")[0].offsetTop;

        var Top = target !== null ? document.getElementById(target).offsetTop + mainTop : 0 ;
        twCom.fn.scrollAnimate(Top, undefined, 1500, "easeOut");
    };

    scrollBtn_1.addEventListener("click",clickToscroll);
    scrollBtn_2.addEventListener("click",clickToscroll);
    scrollBtn_3.addEventListener("click",clickToscroll);
    scrollBtn_4.addEventListener("click",clickToscroll);

    window.addEventListener("scroll", function(e){
      //  if ( this.scrollY === 0 ){ return false; }
        var header = document.getElementsByTagName("header")[0];
        var content = header.querySelector(".slide.active > .text-container");
        var scrollY = position(), elementy = content.offsetTop;
        var opacity = (elementy - scrollY) / (elementy / 100) / 100;
        var content_css = twCom.fn.cssObject(content);
        var duration = 0;

        if ( opacity >= 1 || opacity <= 0 ){
          opacity = opacity <= 0 ? 0 : 1;
          duration = 750;
        }
        content_css.setCss("-webkit-transition-duration" , duration + "ms");
        content_css.setCss("-moz-transition-duration" , duration + "ms");
        content_css.setCss("-o-transition-duration" , duration + "ms");
        content_css.setCss("transition-duration" , duration + "ms");
        content_css.setCss("opacity", opacity);
     });
  });

})();
