if( typeof window.twCom === "undefined"){
    window.twCom = {};
}


(function(){
    "use strict";
      function Global (){

      }

      Global.prototype.addClass = function(Ele , ClassName) {
          if(Ele.classList && typeof ClassName === "string"){
              Ele.classList.add(ClassName);
          }else if (typeof Ele.className !== "undefined" && typeof ClassName === "string" ){
              Ele.className += " " + ClassName;
          }else{
              throw new Error("addClass의 인자는 (Element객체,'넣을클래스명') 으로 정의해야합니다.");
          }
      };


      Global.prototype.removeClass = function(Ele, ClassName) {
            if(Ele.classList && typeof ClassName === "string"){
                Ele.classList.remove(ClassName);
            }else if (Ele.className && typeof ClassName === "string" ){
                Ele.className = Ele.className.replace(new RegExp("(^|\\b)("+ClassName.split(' ').join("|")+")(\\b|$)","gi")," ");
            }else{
                throw new Error("removeClass의 인자는 (Element객체,'넣을클래스명 [구분자 공백]') 으로 정의해야합니다.");
            }
      };


      Global.prototype.hasClass = function(Ele , ClassName) {
          if(Ele.classList && typeof ClassName === "string"){
              return Ele.classList.contains(ClassName);
          }else if (Ele.className && typeof ClassName === "string" ){
              return new RegExp("(^|)" + ClassName + "(|$)","gi").test(Ele.className);
          }else{
              throw new Error("hasClass의 인자는 (Element객체,'넣을클래스명') 으로 정의해야합니다.");
          }
      };



      Global.prototype.extends = function(obj1 , obj2 , command) {
        var newObj = {};
        for(var prop in obj1){
          if(obj1.hasOwnProperty(prop)){
              newObj[prop] = obj1[prop];
          }
        }
        for(var ob in obj2){
            if(newObj.hasOwnProperty(ob)){
                newObj[ob] = obj2[ob];
            }
        }
        return newObj;
      };

      Global.prototype.cssObject = function(element){
          var Ele = element;
          var css = Ele.currentStyle || window.getComputedStyle(Ele);
          return {
            getCss : function(prop){
              if( typeof prop === "string" ){
                return css[prop];
              } else {
                throw new Error("Css propertyName은 String 으로 정의해주세요.");
              }
            },
            setCss : function(prop , value){
              if( typeof prop === "string" ){
                Ele.style[prop] = value;
              } else {
                throw new Error("Css propertyName은 String 으로 정의해주세요.");
              }
            },
            cssEach : function(cssobj){
              if( typeof cssobj !== "object" ){return false;}

                for (var key in cssobj){
                  if(cssobj.hasOwnProperty(key)){
                      Ele.style[key] = cssobj[key];
                  }
                }

            }
          };
      };

      Global.prototype.convertStyle = function (obj) {
          var style = '';

          for (var a in obj) {
              if (obj.hasOwnProperty(a)) {
                  style += (a + ':' + obj[a] + ';');
              }
          }

          return style;
      };


    twCom.fn = new Global();
})();
