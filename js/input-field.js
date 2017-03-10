(function () {
    "use strict";


      function TextField() {
          // input field 생성자
          if ( this instanceof TextField ){
            this.Elements = document.querySelectorAll("input:not([type]),input[type=text],input[type=password],input[type=email],input[type=url],input[type=time],input[type=date],input[type=datetime],input[type=datetime-local],input[type=tel],input[type=number],input[type=search]");
            this.Init();

          }else{
             return new TextField();
          }
      }




      TextField.prototype.Init = function(){
          var text_fields = this.Elements;
          for (var i = 0; i < text_fields.length; i++) {
            text_fields[i].addEventListener("focus", this.field_focus);
            text_fields[i].addEventListener("blur", this.field_blur);
          }
      };
      TextField.prototype.field_focus = function(){
        twCom.fn.addClass(this , "active");
      };
      TextField.prototype.field_blur = function(){
        twCom.fn.removeClass(this,"active");
        //중첩 3항 연산자 text_field안에 value가 존재하면 valid라는 class 를 추가하고 value가 존재하지않으면 valid 클래스를 제거해야함
        //즉 text_field 내에 입력값이 존재하면 valid 라는 class를 추가하고 없으면 field 내에 valid 라는 클래스를 찾아서 있으면 제거함
        (this.value.length > 0 ? twCom.fn.addClass(this,"valid") : ( twCom.fn.hasClass(this,"valid") ? twCom.fn.removeClass(this,"valid") : "" ));

      };




      function SelectBox(){
        if ( this instanceof SelectBox ){
          this.selects = document.querySelectorAll("select:not(.browser-default)");
          this.Elements = document.getElementsByClassName("tw-select-box");
          this.selectInit();
          this.selectSet();
        } else {
           return new SelectBox();
        }
      }



      SelectBox.prototype.selectInit = function(){
          var select_Ele_list = this.selects;
          var self = this;
          for (var i = 0; i < select_Ele_list.length; i++) {
              var select_box = document.createElement("div");
              var input = document.createElement("input");
              var input_line = document.createElement("hr");
              var select_ul = document.createElement("ul");
              var down_caret = document.createElement("i");


                for (var j = 0; j < select_Ele_list[i].options.length; j++) {
                    var select_option =  select_Ele_list[i].options[j];
                    var li = document.createElement("li");

                    self.optionExtend(li , select_option , input);
                    select_ul.appendChild(li);
                }

              self.attrExtends(input , select_Ele_list[i]);
              select_box.className = "tw-select-box tw-input-field";
              select_ul.className = "tw-dropdown select-dropdown";
              input_line.className = "bottomline";
              input.setAttribute("readonly","true");
              down_caret.className = "fa fa-caret-down select-caret-down";

              select_box.appendChild(down_caret);
              select_box.appendChild(input);
              select_box.appendChild(input_line);
              select_box.appendChild(select_ul);
              select_Ele_list[i].outerHTML = select_box.outerHTML;
          }
      };


      SelectBox.prototype.optionExtend = function(litag,  Option, input){
          var self = this;
          var span = document.createElement("span");
          var value = Option.getAttribute("value") || Option.innerText;

           litag.setAttribute("value", value);
           span.innerText = Option.innerText;

           if ( Option.selected ){
             twCom.fn.addClass(litag , "selected");
             input.setAttribute("value",litag.getAttribute("value"));
           }

           if ( Option.disabled ){
             twCom.fn.addClass(litag ,  "disabled");
           }

           litag.appendChild(span);
      };

      SelectBox.prototype.attrExtends = function(childEle, parentEle){
          childEle.id = parentEle.id;
          childEle.className = parentEle.className + " select-input";
          childEle.name = parentEle.name;
      };
      SelectBox.prototype.selectSet = function(){
        var Elements = this.Elements;
        var self = this;

        for(var i = 0; i < Elements.length; i++){
            var select_input = Elements[i].getElementsByClassName("select-input")[0];
            var select_dropdown = Elements[i].getElementsByClassName("select-dropdown")[0];
            Elements[i].addEventListener("focusin", self.selectOpen);
            Elements[i].addEventListener("focusout", self.selectClose);

            if ( "ontouchstart" in window ){
              select_dropdown.addEventListener("touchstart", self.seleted);
            }
            select_dropdown.addEventListener("mousedown", self.seleted);
         }
      };

      var selectOption = {
          duration : 200,
          closeOption : {
            opacity : 0,
            scaleY : 0.7,
            display : "none",
          },
          openOption : {
            opacity : 1,
            scaleY : 1,
            display : "block",
          }
      };

      SelectBox.prototype.selectOpen = function(e){
         var select_element = this;
         var select_dropdown = select_element.getElementsByClassName("select-dropdown")[0];
         var select_column = select_dropdown.getElementsByTagName("li");
         var column_css = twCom.fn.cssObject(select_column[0]);
         var dropdown_css = twCom.fn.cssObject(select_dropdown);
         var regExp = new RegExp("px|rem");
         var unit = regExp.exec(column_css.getCss("min-height"));
         var height= column_css.getCss("min-height").replace(regExp, "") * select_column.length;

         var htmlCss, htmlElement, scrollBottom, elOffset;
         var dropdown_style = {top : 0};
         var transOrigin = "0px 0px";


         if( unit[0] === "rem" ){
             htmlElement = document.getElementsByTagName("html")[0];
             htmlCss = twCom.fn.cssObject(htmlElement);
             height = Number(height) * htmlCss.getCss("fontSize").replace(regExp , "");
         }

         if ( height > 500 ) height = 500 ;
         elOffset = select_element.getBoundingClientRect();

         scrollBottom = (document.documentElement.clientHeight - document.body.getBoundingClientRect().top)
                          - (this.offsetTop - this.getBoundingClientRect().height / 2);

          if ( scrollBottom <= height ){

              dropdown_style.top = height - elOffset.height;
              transOrigin = "100% 100%";

          }

          dropdown_style.top = "-" + dropdown_style.top + "px";
          dropdown_style["-webkit-transform-origin"] = transOrigin;
          dropdown_style["-moz-transform-origin"] = transOrigin;
          dropdown_style["-o-transform-origin"] = transOrigin;
          dropdown_style["transform-origin"] = transOrigin;
          dropdown_style["-webkit-transform-origin"] = transOrigin;


          dropdown_css.cssEach(dropdown_style);

          TweenLite.to( select_dropdown, (selectOption.duration / 1000), selectOption.openOption);
      };

      SelectBox.prototype.selectClose = function(e){
         var select_element = this;
         var select_dropdown = select_element.getElementsByClassName("select-dropdown")[0];
         var select_options = select_dropdown.getElementsByTagName("li");

         TweenLite.to( select_dropdown, (selectOption.duration / 1000), selectOption.closeOption);
      };




      SelectBox.prototype.seleted = function(e){
        var targetEle = e.target || e.srcElement;
        var self = this;
        var select_dropdown = self;
        var select_box = self.parentElement;
        var select_input = select_box.getElementsByTagName("input")[0];

        if(twCom.fn.hasClass(targetEle,"disabled") || twCom.fn.hasClass(targetEle.parentElement,"disabled")){
             return false;
        }


        var selectedElement = self.getElementsByClassName("selected")[0];

        if( selectedElement ){
          twCom.fn.removeClass(selectedElement, "selected");
        }

        var value = targetEle.getAttribute("value") ||  targetEle.parentElement.getAttribute("value");
        select_input.setAttribute("value", value);
        twCom.fn.addClass(targetEle, "selected");


        TweenLite.to( select_dropdown, (selectOption.duration / 1000), selectOption.closeOption);
      };



      window.addEventListener("DOMContentLoaded",function(){
          twCom.form = {textField : TextField() , select : SelectBox()};
      });
})();
