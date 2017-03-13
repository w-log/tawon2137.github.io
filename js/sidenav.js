(function () {
   "use strict";


     function triggerCheck(e){

       var sideNav_trigger = getSidenavtrigger(e);


       if ( sideNav_trigger !== null ){
         var trigger_type = sideNav_trigger.getAttribute("data-trigger") || "open";
           if ( "ontouchstart" in window && sideNav_trigger.getAttribute("id") === "drag-target"){
              return false;
           }else{
             sideNav[trigger_type](e, sideNav_trigger);
           }

       }
     }
     var Option = {
       width : 200,
     };

     function swipe(e, element){
       var sidenav_element = getSidenavElement(e, element);
       var shadowELement = createShadow(sidenav_element);

       var sideEle_css = twCom.fn.cssObject(sidenav_element);
       var width = sidenav_element.getAttribute("data-width") || Option.width;
       width = Number(width);
       var x = (e.center.x - width);


       if( x > 0 ){
         x = 0;
       }

       if ( x < -width ){
         x = -width;
       }
       var opacity = (10000  / width);
       opacity = opacity / (opacity * width);
       opacity = opacity * (width + x);

       shadowELement.setAttribute("style", "opacity :" + opacity + ";");

       var cssObject = {};
       var translateX = "translateX("+x+"px)";

       cssObject['width'] = width + "px";
       cssObject['-webkit-transform'] = translateX;
       cssObject['-moz-transform'] = translateX;
       cssObject['-ms-transform'] = translateX;
       cssObject['-o-transform'] = translateX;
       cssObject.transform = translateX;
       sidenav_element.setAttribute("style" , twCom.fn.convertStyle(cssObject));
     }

     function swipeEnd(e, element){
       var sidenav_element = getSidenavElement(e, element);
       var sideEle_css = twCom.fn.cssObject(sidenav_element);
       var width = sidenav_element.getAttribute("data-width") || Option.width;
       var tx =  sideEle_css.getCss("transform").split(",")[4];
       var currentX = Number(width) + Number(tx);


       if ( currentX >= (width / 2) ){
         sideNav.open(e, element);
       }else{
         sideNav.close(e, element);
       }
     }

     function tap(e, element){
       var sidenav_element = getSidenavElement(e, element);
       var sideEle_css = twCom.fn.cssObject(sidenav_element);
       var width = sidenav_element.getAttribute("data-width") || Option.width;

       var shadowElement = document.getElementById("shadow-area");
       if ( shadowElement === null ){
         sideNav.open(e, element);
       } else {
         sideNav.close(e, element);
       }
     }

    function getSidenavtrigger(e) {

        var element = e.target || e.srcElement;
        var target = null;
        while( element.parentElement !== null ) {
            if ( element.getAttribute("data-sidenav") ){
                target = element;
                break;
            }
            element = element.parentElement;
        }

        return target;
    }

    function getSidenavElement(e, element){
        var sidenav_id;
        if ( typeof e === "object" && typeof element === "object" ) {
            sidenav_id = element.getAttribute("data-sidenav");
            return document.getElementById(sidenav_id);
        }else{
            sidenav_id = e || element;
            return document.getElementById(sidenav_id);
        }
    }

    function createShadow(sidenavElement){
        var shadow_bool = Boolean(sidenavElement.getAttribute("shadow")) || true;

        if (!shadow_bool){
            return false;
        }
        var element = document.getElementById("shadow-area");
        if ( element === null ){
          var shadow_ele = document.createElement("div");
          shadow_ele.setAttribute("id", "shadow-area");
          shadow_ele.setAttribute("data-sidenav", sidenavElement.getAttribute("id"));
          shadow_ele.setAttribute("data-trigger", "close");

          return document.body.appendChild(shadow_ele);
        } else {
            return element;
        }
    }

    function getShadowElement(element){
        if ( element.getAttribute("id") === "shadow-area" ){
            return element;
        }else{
            return document.getElementById("shadow-area");
        }
    }
    function createdragTarget(element){
        if ( document.getElementById("drag-target") === null ){
            var dragTarget = document.createElement("div");
            dragTarget.setAttribute("id", "drag-target");
            dragTarget.setAttribute("data-sidenav", element.getAttribute("id"));
            dragTarget.setAttribute("data-trigger", "close");
            dragEvent(dragTarget);
            return document.body.appendChild(dragTarget);
        }else{
          return document.getElementById("drag-target");
        }
    }

    function dragEvent(drag_element){
      if( drag_element !== null ){
        var mc = new Hammer(drag_element);

        mc.on("panleft panright panend pancancel tap", function(e){
          if ( e.eventType === 8 ) { return false; }
          if ( e.pointerType !== "touch" ) { return false; }

          if( e.type === "panright" || e.type === "panleft" ){
            swipe(e, drag_element);
          }else if( e.type ==="tap" ){
            tap(e, drag_element);
          } else {
            swipeEnd(e, drag_element);
          }
        });
      }
    }
    var sideNav = {
        duration : 150,

        open : function (e, element) {
            var sidenavElement = getSidenavElement(e, element);
            var cssObject = {}, cssObject2 = {}, cssObject3 = {};
            if ( sidenavElement === null ){
                return false;
            }

            var shadowELement = createShadow(sidenavElement);
            var dragTarget = createdragTarget(sidenavElement);
            var sidenav_css = twCom.fn.cssObject(sidenavElement);
            var shadow_css = twCom.fn.cssObject(shadowELement);


            // sidenav css설정 custom attribute에서 설정한값 default = 300
            cssObject["width"] = sidenavElement.getAttribute("data-width") || Option.width;
            cssObject["width"] += "px";
            var translateX = "translateX(0px)";
            cssObject['-webkit-transform'] = translateX;
            cssObject['-moz-transform'] = translateX;
            cssObject['-ms-transform'] = translateX;
            cssObject['-o-transform'] = translateX;
            cssObject.transform = translateX;


            //animation 시간
            cssObject['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject['-moz-transition-duration']    = sideNav.duration + 'ms';
            cssObject['-o-transition-duration']      = sideNav.duration + 'ms';
            cssObject['transition-duration']         = sideNav.duration + 'ms';

            //easing
            var easing = "cubic-bezier(0.17, 0.67, 0.79, 1)";
            cssObject['-webkit-transition-timing-function'] = easing;
            cssObject['-moz-transition-timing-function']    = easing;
            cssObject['-o-transition-timing-function']      = easing;
            cssObject['transition-timing-function']         = easing;



            // 그림자영역 css 설정
            cssObject2["opacity"] = 1;

            //animation 시간
            cssObject2['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['-moz-transition-duration']    = sideNav.duration + 'ms';
            cssObject2['-o-transition-duration']      = sideNav.duration + 'ms';
            cssObject2['transition-duration']         = sideNav.duration + 'ms';

            cssObject2['-webkit-transition-timing-function'] = easing;
            cssObject2['-moz-transition-timing-function']    = easing;
            cssObject2['-o-transition-timing-function']      = easing;
            cssObject2['transition-timing-function']         = easing;

            //drag target CSS 변경
            var dragTarget_css = twCom.fn.cssObject(dragTarget);
            cssObject3 = {
                right : 0,
                width : "90%",
            };

            requestAnimationFrame(function(){
              sidenav_css.cssEach(cssObject);
              shadow_css.cssEach(cssObject2);
              dragTarget_css.cssEach(cssObject3);
              document.body.style.overflow = "hidden";
            });
        },
        close : function(e , element){

            var shadow_element = getShadowElement(element);

            if ( shadow_element === null ){
                return false;
            }

            var sidenav_element = getSidenavElement(e, shadow_element);
            var sidenav_css = twCom.fn.cssObject(sidenav_element), shadow_css = twCom.fn.cssObject(shadow_element);
            var sidenav_width = sidenav_css.getCss("width");
            var cssObject = {}, cssObject2 = {}, cssObject3 = {};


            var translateX = "translateX(" + ("-" + sidenav_width) + ")";

            cssObject['-webkit-transform'] = translateX;
            cssObject['-moz-transform'] = translateX;
            cssObject['-ms-transform'] = translateX;
            cssObject['-o-transform'] = translateX;
            cssObject.transform = translateX;



            //animation 시간
            cssObject['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject['-moz-transition-duration']    = sideNav.duration + 'ms';
            cssObject['-o-transition-duration']      = sideNav.duration + 'ms';
            cssObject['transition-duration']         = sideNav.duration + 'ms';

            //easing
            var easing = "cubic-bezier(0.17, 0.67, 0.79, 1)";
            cssObject['-webkit-transition-timing-function'] = easing;
            cssObject['-moz-transition-timing-function']    = easing;
            cssObject['-o-transition-timing-function']      = easing;
            cssObject['transition-timing-function']         = easing;


            cssObject2["opacity"] = 0;
            //animation 시간
            cssObject2['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['-moz-transition-duration']    = sideNav.duration + 'ms';
            cssObject2['-o-transition-duration']      = sideNav.duration + 'ms';
            cssObject2['transition-duration']         = sideNav.duration + 'ms';

            cssObject2['-webkit-transition-timing-function'] = easing;
            cssObject2['-moz-transition-timing-function']    = easing;
            cssObject2['-o-transition-timing-function']      = easing;
            cssObject2['transition-timing-function']         = easing;

            //drag target CSS 변경
            var dragTarget = document.getElementById("drag-target");
            var dragTarget_css = twCom.fn.cssObject(dragTarget);
            cssObject3 = {
                right : "",
                width : "",
            };

            sidenav_css.cssEach(cssObject);
            shadow_css.cssEach(cssObject2);
            dragTarget_css.cssEach(cssObject3);
            document.body.style.overflow = "";
            setTimeout(function(){
                try{
                    shadow_element.parentElement.removeChild(shadow_element);
                }catch( exception ){
                    return false;
                }
            }, sideNav.duration);


        }
    };


    window.addEventListener("DOMContentLoaded", function (e) {
        if ('ontouchstart' in window) {
            document.body.addEventListener('touchend', triggerCheck, false);
        }else{
            document.body.addEventListener('click', triggerCheck, false);
        }
        createdragTarget(document.getElementById("myside-nav"));
    });
})();
