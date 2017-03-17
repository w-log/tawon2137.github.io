var pushpin = function(){
  // push-pin 대상의 main-content 라는 Element의 배열을 변수에 담는다.
  var pushZones = document.getElementsByTagName("main")[0].querySelectorAll(".main-content");
  if ( pushZones.length === 0 ){ return false; };
  /*
  main태그 상위에 위치한 헤더의 크기와 절대위치에서 top 좌표를 더해야
  현재 사용자가 스코롤링 하는 top 위치와 엘리먼트사이의 간격을 측정할수 있기떄문에 header 엘리먼트를 변수에 담음
  */
  var header = document.getElementsByTagName("header")[0];
  /*
  pushZones 변수가가진 엘리먼트 배열의 수만큼 반복문을 돌리고 내부에서는
  querySelector함수를 이용하여 pushZones[index] 하위엘리먼트에 속한 tw-navbar 라는 클래스를 가진 1개의 엘리먼트에 data attribute 를 통해서 자신의 id값을 속성으로 기입한다.
  */
  for ( var i = 0; i < pushZones.length; i++ ){
    pushZones[i].querySelector(".tw-navbar").setAttribute("data-pin" , pushZones[i].getAttribute("id"));
  }
  /*
  pushZones에 첫번쨰 인덱스 clientHeight값과 첫번쨰인덱스 엘리먼트 하위에서 tw-navbar라는 엘리먼트의 clientHeight 를 담는다.
  navbarClientHeight , zoneClientHeight 변수에 담는다. 여기서 pushZones배열에 엘리먼트 크기값은 모두 같기때문에 몇번쨰인덱스를 가져오든 상관없다.
  */
  var navbarClientHeight = pushZones[0].querySelector(".tw-navbar").clientHeight;

  /*
  브라우저가 requestAnimationFrame 함수를 지원하지않을시에 대응하는코드이다.
  */
  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
  })();

  // 현재 scrollTop 을 반환하는 함수 ie는 window.scrollY를 지원하지않기떄문에 stackoverflow를 참조하였다.
  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }

  var scrollPush = function(){
    //scrollPush라는 내부함수에서 외부함수의 값을 참조한다 ( 클로저 )
    // 함수는 수행이 끝나면 소멸되지만 클로저의 참조하는 특성으로 인해서 내부함수가 완료될떄까지 외부함스의 변수들은 소멸되지 않는다.
    var y =  position();
    //for 문 내부에서 사용할 변수들을 선언함
    var navElement, offsetTop, top, element_css, markCheck, content;
    for (var i = 0; i < pushZones.length; i++ ){
          content = pushZones[i].querySelector(".content-card");
          //pushZones 배열을 참조하여 for문을 돌리고 하위엘리먼트인 tw-navbar 라는 클래스를 가져와 변수에 담는다.
          navElement = pushZones[i].querySelector(".tw-navbar[data-pin=" + pushZones[i].getAttribute("id") +"]" );
          //header의 height크기 + i 번쨰 엘리먼트의 offsetTop 값을 더 하면 페이지내에서 i번쨰 엘리먼트 페이지내에서 절대위치가 나온다.
          offsetTop = header.clientHeight + pushZones[i].offsetTop;
          //내프레임워크에서 global 객체내에 cssObject함수를 호출하여서 엘리먼트 css정보를 담은 클로저를 변수에 반환한다.
          element_css = twCom.fn.cssObject(navElement);
          // 절대위치 offset값에서 현재스크롤 Y의 값을 빼면 현재 위치와 엘리먼트사이에 간격이나오며 그 값을 top이라는 변수에 담는다.
          top = offsetTop - y;
          markCheck = top + pushZones[i].clientHeight - navbarClientHeight;
          /*
          top을 비교한다 현재 스크롤위치가 대상엘리먼트를 지나치지않은상태의 조건문이며
          절대위치에서 현재스크롤Y값을 뻇을때 그값이 0보다 크다는건 현재 위치가 해당엘리먼트보다 위에 있다는걸 의미하며
          현재스크롤 위치가 해당엘리먼트보다 위에 있을시에는 fixed란 클래스가 존재하고있으면 지우고 push-pin이라는 클래스를 추가한다. push-pin 클래스의 추가는 css position을 relative 로 변경한다.
          */
          if ( top > 0 ){
             element_css.setCss("top", "0px" );
             twCom.fn.hasClass(navElement, "fixed") ? twCom.fn.removeClass(navElement, "fixed") : '' ;
             twCom.fn.hasClass(content, "show") ? twCom.fn.removeClass(content , "show") : '' ;
             twCom.fn.addClass(navElement,"push-pin");
           }

           /*
           top을 비교하여 top 값이 0 혹은 그보다 작을 경우에는 현재스크롤위치값이 엘리먼트에 절대위치에 있거나 그보다 아래에 있는걸 의미하고
           top + zoneClientHeight 의 값은 현재 위치가 엘리먼트 절대위치top을 지났고 대상엘리먼트의 끝은 안넘었음을 의미한다.
           한마디로 현재위치가 대상엘리먼트 안에 존재할때에 fixed는 유효하다.
           이 경우 push-pin 클래스가 있을시에 클래스를 제거하고 fixed라는 클래스를 추가한다. fixed클래스는 css position을 fixed로 변경한다.
           */
          if ( top <= 1 && markCheck > 0 ){
              element_css.setCss("top", "0px" );
              twCom.fn.addClass(content, "show");
              twCom.fn.hasClass(navElement, "push-pin") ? twCom.fn.removeClass(navElement, "push-pin") : '';
              twCom.fn.addClass(navElement,"fixed");
          }

          /*
          markCheck 값이 0보다 작아졌는지 체크한다.
          markCheck 값은  현재위치 - element의 크기
          즉 markCheck값이 0이하이면 현재위치가 대상엘리먼트의 크기를 넘었음을 의미한다.
          그리고 novheight의 크기를 뺴는이유는 navbar 내에 엘리먼트 영역이 사라질때 navbar의 포지션이 relative 전환되야하기때문에
          markCheck 값이 0이될떄 영역은 사라지고 navbar만 존재하며 그시점을 아래조건식을 통해서 설정한다..
          */
          if( markCheck <= 0 ){
            element_css.setCss("top", (pushZones[i].offsetHeight - navbarClientHeight) + "px" );
            twCom.fn.hasClass(navElement, "fixed") ? twCom.fn.removeClass(navElement, "fixed") : '';
            twCom.fn.addClass(navElement,"push-pin");
          }


      }
    };

    scrollPush();
  window.addEventListener("scroll", function(e){
    requestAnimFrame(scrollPush);
  });
};


window.addEventListener("DOMContentLoaded", function(e){
  pushpin();
});
