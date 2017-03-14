(function(){

// easing 함수 주소 : http://goo.gl/5HLl8
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) {
        return c/2*t*t + b
      }
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    Math.easeInCubic = function(t, b, c, d) {
      var tc = (t/=d)*t*t;
      return b+c*(tc);
    };

    Math.inOutQuintic = function(t, b, c, d) {
      var ts = (t/=d)*t,
      tc = ts*t;
      return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
    };

  // requestAnimationFrame 이 지원안되는 브라우저에서는 setTimeout 함수를 이용함.requestAnimationFrame은 실행시 60프레임을 보장함.
    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
    })();

    // 현재 scrollTop 을 반환하는 함수
  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }
  function scrollTo(to, callback, duration) {
  // 스크롤위치를 이동시키는 함수
  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  //변수 초기화
  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 1000 / 60;
    duration = (typeof(duration) === 'undefined') ? 3000 : duration; //anmation time
  //animate 진행 requireAnimation을 통한 호출로 인한 60프레임이 보장됨
  var animateScroll = function() {
    // 애니메이션 시간누적 1프레임당 1000ms에서 60으로 나눈값이 누적됨 ( 1000 / 60 === 1초당 60프레임 )
    currentTime += increment;
    // easing 함수 호출
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // move 함수 호출
    move(val);
    // 현재 애니메이션 시간이 druation을 초과했는지 확인 현재시간이 < 애니메이션 시간보다 작으면 애니메이션 진행 초과시에는 콜백함수 호출
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof(callback) === 'function') {
        callback();
      }
    }
  };
  animateScroll();
  }

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
        scrollTo(Top, undefined, 1500);
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
