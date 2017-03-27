(function() {
    "use strict";
    //정규표현식 객체를 가지고있는 객체 변수
    var regExpObj = {
        "mail": /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        "number": /^[0-9]+$/i,
        "kor": /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]+$/i,
        "phoneNumber": /^[0-9]{2,3}-[0-9]{3,4}-[0-9]|[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/
    };

    function TextField() {
        // input field 생성자 타입이 없는 dom문서내에 input을 모두 검색함
        if (this instanceof TextField) {
            this.Elements = document.querySelectorAll("input:not([type]),input[type=text],input[type=password],input[type=email],input[type=url],input[type=time],input[type=date],input[type=datetime],input[type=datetime-local],input[type=tel],input[type=number],input[type=search]");
            // init 함수 호출
            this.Init();
        } else {
            return new TextField();
        }
    }


    function validation(element) {
        var textValue = element.value || null;
        var regType = element.getAttribute("data-regexp");
        var command = false;
        if (textValue && regType) {
            command = regExpObj[regType].test(textValue);
        }
        return command;
    }

    TextField.prototype.Init = function() {
        // 검색한 문서내의 DOM 갯수에 focus와 blur이벤트를 등록함
        var text_fields = this.Elements;
        for (var i = 0; i < text_fields.length; i++) {
            text_fields[i].addEventListener("focus", this.field_focus);
            text_fields[i].addEventListener("blur", this.field_blur);
        }
    };

    TextField.prototype.field_focus = function() {
        // focus이벤트가 발생될떄 active 라는 클래스를 추가
        var self = this;
        twCom.fn.addClass(this, "active");
    };
    TextField.prototype.field_blur = function() {
        var self = this;
        // focusout 이벤트가 발생될떄 엘리먼트에 validate 라는 클래스가 있는지 검색함
        var validate = twCom.fn.hasClass(self, "validate");
        var search = false;
        // validate라는 클래스가 input에 존재하면 validation 함수를 통해서 유효성 검사를 수행하고 리턴하는 값을을 search 변수에 치환함.
        if (validate) {
            search = validation(self);
        }

        // 엘리먼트에 값이 있으면 dirty라는 클래스를 추가 없으면 제거
        if (self.value.length > 0) {
            twCom.fn.addClass(self, "dirty");
        } else {
            twCom.fn.hasClass(self, "valid") ? twCom.fn.removeClass(self, "valid") : '';
            twCom.fn.hasClass(self, "invalid") ? twCom.fn.removeClass(self, "invalid") : '';
            twCom.fn.hasClass(self, "dirty") ? twCom.fn.removeClass(self, "dirty") : '';
        }

        // dirty 라는 클래스가 엘리먼트에 존재할떄 (값이 있을때) search로 받은 유효성검사값이 true면은 valid클래스추가 유효성검사가 false일때는 invalid 속성추가
        // valid 클래스는 유효성검사가 true, invalid = false;
        if (twCom.fn.hasClass(self, "dirty") && search) {
            twCom.fn.hasClass(self, "invalid") ? twCom.fn.removeClass(self, "invalid") : '';
            twCom.fn.addClass(self, "valid");
        } else if (validate && twCom.fn.hasClass(self, "dirty")) {
            twCom.fn.hasClass(self, "valid") ? twCom.fn.removeClass(self, "valid") : '';
            twCom.fn.addClass(self, "invalid");
        }

        // focus아웃 이벤트시에 active클래스 제거
        twCom.fn.removeClass(self, "active");
    };




    function SelectBox() {
        if (this instanceof SelectBox) {
            this.selects = document.querySelectorAll("select:not(.browser-default)");
            this.Elements = document.getElementsByClassName("tw-select-box");
            this.selectInit();
            this.selectSet();
        } else {
            return new SelectBox();
        }
    }



    SelectBox.prototype.selectInit = function() {
        var select_Ele_list = this.selects;
        var self = this;
        for (var i = 0; i < select_Ele_list.length; i++) {
            var select_box = document.createElement("div");
            var input = document.createElement("input");
            var select_ul = document.createElement("ul");
            var down_caret = document.createElement("i");
            var label = document.createElement("label");


            for (var j = 0; j < select_Ele_list[i].options.length; j++) {
                var select_option = select_Ele_list[i].options[j];
                var li = document.createElement("li");

                self.optionExtend(li, select_option, input);
                select_ul.appendChild(li);
            }

            self.attrExtends(input, select_Ele_list[i]);
            select_box.className = "tw-select-box tw-input-field";
            select_ul.className = "tw-dropdown select-dropdown";

            label.className = "input-field-label fixed";
            label.innerText = select_Ele_list[i].getAttribute("data-labelText") || "Select box";
            input.setAttribute("readonly", "true");
            down_caret.className = "fa fa-caret-down select-caret-down";

            select_box.appendChild(down_caret);
            select_box.appendChild(input);
            select_box.appendChild(label);
            select_box.appendChild(select_ul);
            select_Ele_list[i].outerHTML = select_box.outerHTML;
        }
    };


    SelectBox.prototype.optionExtend = function(litag, Option, input) {
        var self = this;
        var span = document.createElement("span");
        var value = Option.getAttribute("value") || "";

        litag.setAttribute("value", value);
        span.innerText = Option.innerText;
        if (Option.selected) {
            twCom.fn.addClass(litag, "selected");
            input.setAttribute("value", litag.getAttribute("value"));
        }

        if (Option.disabled) {
            twCom.fn.addClass(litag, "disabled");
        }

        litag.appendChild(span);
    };

    SelectBox.prototype.attrExtends = function(childEle, parentEle) {
        childEle.id = parentEle.id;
        childEle.className = parentEle.className + " select-input";
        childEle.name = parentEle.name;
    };
    SelectBox.prototype.selectSet = function() {
        var Elements = this.Elements;
        var self = this;

        for (var i = 0; i < Elements.length; i++) {
            var select_input = Elements[i].getElementsByClassName("select-input")[0];
            var select_dropdown = Elements[i].getElementsByClassName("select-dropdown")[0];
            Elements[i].addEventListener("focusin", self.selectOpen);
            Elements[i].addEventListener("focusout", self.selectClose);

            if ("ontouchstart" in window) {
                select_dropdown.addEventListener("touchstart", self.seleted);
            }
            select_dropdown.addEventListener("mousedown", self.seleted);
        }
    };

    var selectOption = {
        duration: 100,
        closeOption: {
            opacity: 0,
            scaleY: 0.7,
            display: "none",
        },
        openOption: {
            opacity: 1,
            scaleY: 1,
            display: "block",
        }
    };

    SelectBox.prototype.selectOpen = function(e) {
        var select_element = this;
        var select_dropdown = select_element.getElementsByClassName("select-dropdown")[0];
        var select_column = select_dropdown.getElementsByTagName("li");
        var column_css = twCom.fn.cssObject(select_column[0]);
        var dropdown_css = twCom.fn.cssObject(select_dropdown);
        var regExp = new RegExp("px|rem");
        var unit = regExp.exec(column_css.getCss("min-height"));
        var height = column_css.getCss("min-height").replace(regExp, "") * select_column.length;

        var htmlCss, htmlElement, scrollBottom, elOffset;
        var dropdown_style = {
            top: 0
        };
        var transOrigin = "0px 0px";


        if (unit[0] === "rem") {
            htmlElement = document.getElementsByTagName("html")[0];
            htmlCss = twCom.fn.cssObject(htmlElement);
            height = Number(height) * htmlCss.getCss("fontSize").replace(regExp, "");
        }

        if (height > 500) height = 500;
        elOffset = select_element.getBoundingClientRect();

        scrollBottom = (document.documentElement.clientHeight - document.body.getBoundingClientRect().top) -
            (this.offsetTop - this.getBoundingClientRect().height / 2);

        if (scrollBottom <= height) {

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

        TweenLite.to(select_dropdown, (selectOption.duration / 1000), selectOption.openOption);
    };

    SelectBox.prototype.selectClose = function(e) {
        var select_element = this;
        var select_dropdown = select_element.getElementsByClassName("select-dropdown")[0];
        var select_options = select_dropdown.getElementsByTagName("li");

        TweenLite.to(select_dropdown, (selectOption.duration / 1000), selectOption.closeOption);
    };




    SelectBox.prototype.seleted = function(e) {
        var targetEle = e.target || e.srcElement;
        var self = this;
        var select_dropdown = self;
        var select_box = self.parentElement;
        var select_input = select_box.getElementsByTagName("input")[0];

        if (twCom.fn.hasClass(targetEle, "disabled") || twCom.fn.hasClass(targetEle.parentElement, "disabled")) {
            return false;
        }


        var selectedElement = self.getElementsByClassName("selected")[0];

        if (selectedElement) {
            twCom.fn.removeClass(selectedElement, "selected");
        }

        var value = targetEle.getAttribute("value") || targetEle.parentElement.getAttribute("value") || "";
        select_input.setAttribute("value", value);
        twCom.fn.addClass(targetEle, "selected");


        TweenLite.to(select_dropdown, (selectOption.duration / 1000), selectOption.closeOption);
    };



    window.addEventListener("DOMContentLoaded", function() {
        twCom.form = {
            textField: TextField(),
            select: SelectBox()
        };
    });
})();
