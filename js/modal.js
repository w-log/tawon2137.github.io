(function(){
    "use strict";




    var DefaultOption = function(){
      this.shadow_opacity = 0.6;  //default 0.5 최소 0 , 최대 1
      this.start_top = "60";
      this.start_top_suffix = "%";
      this.end_top = "20";
      this.end_top_suffix = "%";
      this.modalOpen = function(){};
      this.modalClose = function(){};
      this.delay = 0.50;
      this.shadow_onclick_close = true;

      this.openOption = {
        display:"block",
        top: (this.end_top+this.end_top_suffix),
        scaleX : 1,
        opacity : 1,
        ease: Power3.easeOut,
        onComplete:this.modalOpen
      };

      this.closeOption = {
        display:"none",
        top: (this.start_top + this.start_top_suffix),
        scaleX : 0.7,
        opacity : 0,
        ease: Power3.easeOut,
        onComplete:this.modalClose
      };

    };

    DefaultOption.prototype.setOption = function(newOption){
      var myOption = this;
      for( var prop in newOption ){
        if( myOption.hasOwnProperty(prop) ){
          myOption[prop] = newOption[prop];
        }
      }
      return myOption;
    };


    function Modal(modalElement){
      if( this instanceof Modal ){
        this.Element = document.getElementById(modalElement) || modalElement;
        if (this.Element === null ) { return false; }
        this.Init();
      } else {
        return new Modal(modalElement);
      }
    }


    Modal.prototype.Init = function(){
       var self = this;
       var ele = this.Element;
       var option = this.Option = new DefaultOption();
       twCom.fn.cssObject(ele).setCss("top",(option.start_top + option.start_top_suffix));
       this.OpenbtnSetting(ele.id);
       this.ClosebtnSetting();
    };




    Modal.prototype.OpenbtnSetting = function(){
      var id = this.Element.id;
      var buttons = document.querySelectorAll("[data-target="+id+"]"); // querySelectorAll의 반환값은 Array임 무조건
      if(buttons.length > 0){
          for(var index = 0; index < buttons.length; index++){
              buttons[index].addEventListener("click" , this.openModal);
          }
      }else{
          throw new Error("Modal을 이벤트를 수행 할 component가 존재하지 않습니다.");
      }
    };

    Modal.prototype.ClosebtnSetting = function(){
      var buttons = this.Element.getElementsByClassName("closeModal"); // getElementsByClassName의 반환값은 Array임 무조건

      if(buttons.length > 0){
          for(var index = 0; index < buttons.length; index++){
              buttons[index].setAttribute("data-target", this.Element.id);
              buttons[index].addEventListener("click" , this.closeModal);
          }
      }
    };


    Modal.prototype.openModal = function(){
        var Ele = this.Element || this;
        var target = Ele.getAttribute("data-target") || Ele.id;
        var modal = ( this === twCom.Modal[target] ? this : twCom.Modal[target] );

        if(modal){
          var modalElement = modal.Element;
          var shadowElement = modal.createShadow(target);
          var modalOption = modal.Option;
          TweenLite.to( shadowElement, modalOption.delay, { opacity : modalOption.shadow_opacity } );
          TweenLite.to( modalElement, modalOption.delay, modalOption.openOption);
          document.body.style.overflow = "hidden";
        }else{
          throw new Error("Error Modal Open Error");
        }
    };



    Modal.prototype.closeModal = function(e){
      var Ele = this.Element || this;
      var target = Ele.getAttribute("data-target") || Ele.id;
      var modal = ( this === twCom.Modal[target] ? this : twCom.Modal[target] );


      if(modal){
          var modalElement = modal.Element;
          var shadowElement = modal.shadowEle;
          var modalOption = modal.Option;

          TweenLite.to( shadowElement, modalOption.delay, {
            opacity : 0,
            onComplete: function(){
              if ( shadowElement ){
                 shadowElement.parentElement.removeChild(shadowElement);
              }
            }
        });
          TweenLite.to(modalElement, modalOption.delay, modalOption.closeOption);
          document.body.style.overflow = "";
      }else{
        throw new Error("Error Modal Close Error");
      }
    };



    Modal.prototype.closeAnimation = function(){
         var shadowElement = this.shadowEle;
         var modalOption = this.Option;
         var Ele = this.Element;
    };



    Modal.prototype.setOption = function(Option){
        if( typeof Option === "object"){
            this.Option = this.Option.setOption(Option);
        }else{
            throw new Error("setOption의 인자는 Object");
        }
    };


    Modal.prototype.createShadow = function(id){
        var Shadowele = document.createElement("div");
        var Option = this.Option;
        Shadowele.id = "modal-shadow";
        Shadowele.setAttribute("data-target",id);
        if( Option.shadow_onclick_close ){
            Shadowele.addEventListener("click",this.closeModal);
        }
        //옵션에서 준 Shadow_onclick_close  값에 따라 true면 그림자영역 클릭시 모달 close / false 이면 그림자영역 클릭이벤트를 설정하지않음.
        this.shadowEle = Shadowele;
        return document.body.appendChild(Shadowele);
    };

    window.twCom.Modal = { init : Modal };
})();

window.addEventListener("DOMContentLoaded",function(){
    twCom.Modal["logmodal"] = twCom.Modal.init(document.getElementById("logmodal"));
    twCom.Modal["logmodal2"] = twCom.Modal.init(document.getElementById("logmodal2"));
    twCom.Modal["aboutModal"] = twCom.Modal.init(document.getElementById("aboutModal"));
});
