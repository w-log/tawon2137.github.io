/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
__webpack_require__(2);
__webpack_require__(1);
__webpack_require__(3);
__webpack_require__(5);
__webpack_require__(9);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function() {
    // easing 함수 주소 : http://goo.gl/5HLl8
    var easing = {
        linear: function(t, b, c, d) {
            t /= d;
            return b + c * (t);
        },
        easeOut: function(t, b, c, d) {
            var ts = (t /= d) * t;
            var tc = ts * t;
            return b + c * (0.9 * tc * ts + -4.35 * ts * ts + 8.6 * tc + -8.7 * ts + 4.55 * t);
        }
    };

    var requestAniFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    // scroll move funtion
    function move(amount) {
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    }

    // 현재 scrollTop 을 반환하는 함수
    function position() {
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }


    // scrollAnimation 설정함수
    function scrollAnimation(to, callback, duration, easingCommand) {
        //변수 초기화
        var start = position(),
            change = to - start,
            currentTime = 0,
            increment = 1000 / 60;
        duration = (typeof(duration) === 'undefined') ? 500 : duration; //anmation time
        //animate 진행 requireAnimation을 통한 호출로 인한 60프레임이 보장됨
        var animateScroll = function() {
            // 애니메이션 시간누적 1프레임당 1000ms에서 60으로 나눈값이 누적됨 ( 1000 / 60 === 1초당 60프레임 )
            currentTime += increment;
            // easing 함수 호출
            var val = easingCommand ? easing[easingCommand](currentTime, start, change, duration) :
                easing["easeOut"](currentTime, start, change, duration);
            // move 함수 호출
            move(val);
            // 현재 애니메이션 시간이 druation을 초과했는지 확인 현재시간이 < 애니메이션 시간보다 작으면 애니메이션 진행 초과시에는 콜백함수 호출
            if (currentTime <= duration) {
                requestAniFrame(animateScroll);
            } else {
                if (callback && typeof(callback) === 'function') {
                    callback();
                }
            }
        };
        animateScroll();
    }

    if (window.twCom) {
        window.twCom.fn.scrollAnimate = scrollAnimation;
    }

})();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

if (typeof window.twCom === "undefined") {
    window.twCom = {};
}


(function() {
    "use strict";

    function Global() {

    }

    Global.prototype.addClass = function(Ele, ClassName) {
        if (Ele.classList && typeof ClassName === "string") {
            Ele.classList.add(ClassName);
        } else if (typeof Ele.className !== "undefined" && typeof ClassName === "string") {
            Ele.className += " " + ClassName;
        } else {
            throw new Error("addClass의 인자는 (Element객체,'넣을클래스명') 으로 정의해야합니다.");
        }
    };


    Global.prototype.removeClass = function(Ele, ClassName) {
        if (Ele.classList && typeof ClassName === "string") {
            Ele.classList.remove(ClassName);
        } else if (Ele.className && typeof ClassName === "string") {
            Ele.className = Ele.className.replace(new RegExp("(^|\\b)(" + ClassName.split(' ').join("|") + ")(\\b|$)", "gi"), " ");
        } else {
            throw new Error("removeClass의 인자는 (Element객체,'넣을클래스명 [구분자 공백]') 으로 정의해야합니다.");
        }
    };


    Global.prototype.hasClass = function(Ele, ClassName) {
        if (Ele.classList && typeof ClassName === "string") {
            return Ele.classList.contains(ClassName);
        } else if (Ele.className && typeof ClassName === "string") {
            return new RegExp("(^|)" + ClassName + "(|$)", "gi").test(Ele.className);
        } else {
            throw new Error("hasClass의 인자는 (Element객체,'넣을클래스명') 으로 정의해야합니다.");
        }
    };



    Global.prototype.extends = function(obj1, obj2, command) {
        var newObj = {};
        for (var prop in obj1) {
            if (obj1.hasOwnProperty(prop)) {
                newObj[prop] = obj1[prop];
            }
        }
        for (var ob in obj2) {
            if (newObj.hasOwnProperty(ob)) {
                newObj[ob] = obj2[ob];
            }
        }
        return newObj;
    };

    Global.prototype.cssObject = function(element) {
        var Ele = element;
        var css = Ele.currentStyle || window.getComputedStyle(Ele);
        return {
            getCss: function(prop) {
                if (typeof prop === "string") {
                    return css[prop];
                } else {
                    throw new Error("Css propertyName은 String 으로 정의해주세요.");
                }
            },
            setCss: function(prop, value) {
                if (typeof prop === "string") {
                    Ele.style[prop] = value;
                } else {
                    throw new Error("Css propertyName은 String 으로 정의해주세요.");
                }
            },
            cssEach: function(cssobj) {
                if (typeof cssobj !== "object") {
                    return false;
                }

                for (var key in cssobj) {
                    if (cssobj.hasOwnProperty(key)) {
                        Ele.style[key] = cssobj[key];
                    }
                }

            }
        };
    };

    Global.prototype.convertStyle = function(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    };

    function getToastcontainer() {
        var toastContainer = document.getElementById("toastcontainer");
        var element = null;
        if (toastContainer === null) {
            element = document.createElement("div");
            element.setAttribute("id", "toastcontainer");
            return document.body.appendChild(element);
        } else {
            return toastContainer;
        }
    }

    function setDrag(toast, time, duration, self) {
        var mc = new Hammer(toast);

        var swipe = function(e) {

            if (e.eventType === 8) {
                return false;
            }
            var direction = e.type === "swipeleft" ? "translateX(-100%)" : "translateX(100%)";
            var cssObject = {
                "opacity": 0,
                "margin-top": "-3rem"
            };

            //스와이프 애니메이션
            cssObject["-o-transform"] = direction;
            cssObject["-webkit-transform"] = direction;
            cssObject["-ms-transform"] = direction;
            cssObject["-moz-transform"] = direction;
            cssObject["transform"] = direction;
            toast.setAttribute("style", self.convertStyle(cssObject));

            setTimeout(function() {
                toast.parentElement.removeChild(toast);
            }, duration);
        };
        mc.on("swipeleft swiperight", swipe);
    }
    Global.prototype.toast = function(message, time) {
        var self = this;

        var toastcontainer = getToastcontainer();
        time = typeof(time) === undefined ? 2000 : time;
        message = typeof(message) === undefined ? "" : message;
        var duration = 300,
            cssObject = {},
            cssObject2 = {},
            translateX;

        var toast = document.createElement("span");
        toast.setAttribute("class", "tw-toast");
        toast.innerText = message;

        toastcontainer.appendChild(toast);

        translateX = "translateX(0) translateY(0px)";
        cssObject["-o-transform"] = translateX;
        cssObject["-webkit-transform"] = translateX;
        cssObject["-ms-transform"] = translateX;
        cssObject["-moz-transform"] = translateX;
        cssObject["transform"] = translateX;
        cssObject["opacity"] = 1;
        setTimeout(function() {
            self.cssObject(toast).cssEach(cssObject);
        }, 100);

        setDrag(toast, time, duration, self);

        setTimeout(function() {
            cssObject["opacity"] = 0;
            cssObject["margin-top"] = "-3rem";
            self.cssObject(toast).cssEach(cssObject);


            setTimeout(function() {
                if (toast.parentElement !== null) {
                    toast.parentElement.removeChild(toast);
                }
            }, duration);


        }, time);
    };

    twCom.fn = new Global();
})();


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return ha}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function() {
    "use strict";


    var DefaultOption = function() {
        this.shadow_opacity = 0.6; //default 0.5 최소 0 , 최대 1
        this.startY = "150";
        this.suffix = "%";
        this.endY = "60";
        this.openCallback = function() {};
        this.closeCallback = function() {};
        this.delay = 0.50;
        this.onClose = true;

        this.openOption = {
            display: "block",
            scaleX: 1,
            opacity: 1,
            ease: Power3.easeOut,
            onComplete: this.openCallback
        };

        this.closeOption = {
            display: "none",
            scaleX: 0.7,
            opacity: 0,
            ease: Power3.easeOut,
            onComplete: this.closeCallback
        };
    };

    DefaultOption.prototype.setOption = function(newOption) {
        var myOption = this;
        for (var prop in newOption) {
            if (myOption.hasOwnProperty(prop)) {
                myOption[prop] = newOption[prop];
            }
        }
        return myOption;
    };


    function Modal(modalElement, option) {
        if (this instanceof Modal) {
            this.Element = document.getElementById(modalElement) || modalElement;
            if (this.Element === null) {
                return false;
            }
            this.Init(option);
        } else {
            return new Modal(modalElement, option);
        }
    }


    Modal.prototype.Init = function(newOption) {
        var self = this;
        var ele = this.Element;
        this.Option = new DefaultOption();
        this.Option = this.Option.setOption(newOption || {});
        // console.log(this.Option);
        var cssObject = {
          "-moz-transform" : "translateY(" + (this.Option.startY + this.Option.suffix) + ")",
          "-webkit-transform" : "translateY(" + (this.Option.startY + this.Option.suffix) + ")",
          "-o-transform" : "translateY(" + (this.Option.startY + this.Option.suffix) + ")",
          "-ms-transform" : "translateY(" + (this.Option.startY + this.Option.suffix) + ")",
          "transform" : "translateY(" + (this.Option.startY + this.Option.suffix) + ")",
        };
        ele.setAttribute("style", twCom.fn.convertStyle(cssObject));
        this.openbtnSetting();
        this.closebtnSetting();
    };




    Modal.prototype.openbtnSetting = function() {
        var id = this.Element.id;
        var buttons = document.querySelectorAll("[data-target=" + id + "]"); // querySelectorAll의 반환값은 Array임 무조건
        if (buttons.length > 0) {
            for (var index = 0; index < buttons.length; index++) {
                buttons[index].addEventListener("click", this.openModal.bind(this));
            }
        } else {
            throw new Error("Modal을 이벤트를 수행 할 component가 존재하지 않습니다.");
        }
    };

    Modal.prototype.closebtnSetting = function() {
        var buttons = this.Element.getElementsByClassName("closeModal"); // getElementsByClassName의 반환값은 Array임 무조건
        if (buttons.length > 0) {
            for (var index = 0; index < buttons.length; index++) {
                buttons[index].setAttribute("data-target", this.Element.id);
                buttons[index].addEventListener("click", this.closeModal.bind(this));
            }
        }
    };


    Modal.prototype.openModal = function(e) {
        var Ele = e.target || e.srcElement;
        var target = Ele.getAttribute("data-target") || Ele.id;
        var modal = target === this.Element.getAttribute("id") ? this : "";
        if (modal) {
            var modalElement = modal.Element;
            var shadowElement = modal.createShadow(target);
            var modalOption = modal.Option;
            modalOption.openOption.y = modalOption.endY + modalOption.suffix;
            modalOption.openOption.onComplete = modalOption.openCallback;
            TweenLite.to(shadowElement, modalOption.delay, {
                opacity: modalOption.shadow_opacity
            });
            TweenLite.to(modalElement, modalOption.delay, modalOption.openOption);
            document.body.style.overflow = "hidden";
        } else {
            throw new Error("Error Modal Open Error");
        }
    };

    Modal.prototype.closeModal = function(e) {
        var Ele = e.target || e.srcElement;
        var target = Ele.getAttribute("data-target") || Ele.id;
        var modal = target === this.Element.getAttribute("id") ? this : "";
        if (modal) {
            var modalElement = modal.Element;
            var shadowElement = modal.shadowEle;
            var modalOption = modal.Option;
            modalOption.closeOption.y = modalOption.startY + modalOption.suffix;
            modalOption.closeOption.onComplete = modalOption.closeCallback;

            TweenLite.to(shadowElement, modalOption.delay, {
                opacity: 0,
                onComplete: function() {
                    if (shadowElement) {
                        shadowElement.parentElement.removeChild(shadowElement);
                    }
                }
            });
            TweenLite.to(modalElement, modalOption.delay, modalOption.closeOption);
            document.body.style.overflow = "";
        } else {
            throw new Error("Error Modal Close Error");
        }
    };



    Modal.prototype.closeAnimation = function() {
        var shadowElement = this.shadowEle;
        var modalOption = this.Option;
        var Ele = this.Element;
    };



    Modal.prototype.setOption = function(Option) {
        if (typeof Option === "object") {
            this.Option = this.Option.setOption(Option);
        } else {
            throw new Error("setOption의 인자는 Object");
        }
    };


    Modal.prototype.createShadow = function(id) {
        var Shadowele = document.createElement("div");
        var Option = this.Option;
        Shadowele.id = "modal-shadow";
        Shadowele.setAttribute("data-target", id);
        if (Option.onClose) {
            Shadowele.addEventListener("click", this.closeModal.bind(this));
        }
        //옵션에서 준 Shadow_onclick_close  값에 따라 true면 그림자영역 클릭시 모달 close / false 이면 그림자영역 클릭이벤트를 설정하지않음.
        this.shadowEle = Shadowele;
        return document.body.appendChild(Shadowele);
    };

    window.twCom.Modal = {
        init: Modal
    };
})();

window.addEventListener("DOMContentLoaded", function() {
    twCom.Modal["logmodal"] = twCom.Modal.init(document.getElementById("logmodal"));
    twCom.Modal["logmodal2"] = twCom.Modal.init(document.getElementById("logmodal2"));
    twCom.Modal["aboutModal"] = twCom.Modal.init(document.getElementById("aboutModal"));
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var pushpin = function() {
    // push-pin 대상의 main-content 라는 Element의 배열을 변수에 담는다.
    if ( document.getElementsByTagName("main").length === 0 ){ return false; }

    var pushZones = document.getElementsByTagName("main")[0].querySelectorAll(".main-content");
    if (pushZones.length === 0) {
          return false;
    }

    /*
    main태그 상위에 위치한 헤더의 크기와 절대위치에서 top 좌표를 더해야
    현재 사용자가 스코롤링 하는 top 위치와 엘리먼트사이의 간격을 측정할수 있기떄문에 header 엘리먼트를 변수에 담음
    */
    var header = document.getElementsByTagName("header")[0];
    /*
    pushZones 변수가가진 엘리먼트 배열의 수만큼 반복문을 돌리고 내부에서는
    querySelector함수를 이용하여 pushZones[index] 하위엘리먼트에 속한 tw-navbar 라는 클래스를 가진 1개의 엘리먼트에 data attribute 를 통해서 자신의 id값을 속성으로 기입한다.
    */
    for (var i = 0; i < pushZones.length; i++) {
        pushZones[i].querySelector(".tw-navbar").setAttribute("data-pin", pushZones[i].getAttribute("id"));
    }
    /*
    pushZones에 첫번쨰 인덱스 clientHeight값과 첫번쨰인덱스 엘리먼트 하위에서 tw-navbar라는 엘리먼트의 clientHeight 를 담는다.
    navbarClientHeight , zoneClientHeight 변수에 담는다. 여기서 pushZones배열에 엘리먼트 크기값은 모두 같기때문에 몇번쨰인덱스를 가져오든 상관없다.
    */
    var navbarClientHeight = pushZones[0].querySelector(".tw-navbar").clientHeight;

    /*
    브라우저가 requestAnimationFrame 함수를 지원하지않을시에 대응하는코드이다.
    */
    var requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    // 현재 scrollTop 을 반환하는 함수 ie는 window.scrollY를 지원하지않기떄문에 stackoverflow를 참조하였다.
    function position() {
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }

    var scrollPush = function() {
        //scrollPush라는 내부함수에서 외부함수의 값을 참조한다 ( 클로저 )
        // 함수는 수행이 끝나면 소멸되지만 클로저의 참조하는 특성으로 인해서 내부함수가 완료될떄까지 외부함스의 변수들은 소멸되지 않는다.
        var y = position();
        //for 문 내부에서 사용할 변수들을 선언함
        var navElement, offsetTop, top, element_css, markCheck, content;
        for (var i = 0; i < pushZones.length; i++) {
            content = pushZones[i].querySelector(".content-card");
            //pushZones 배열을 참조하여 for문을 돌리고 하위엘리먼트인 tw-navbar 라는 클래스를 가져와 변수에 담는다.
            navElement = pushZones[i].querySelector(".tw-navbar[data-pin=" + pushZones[i].getAttribute("id") + "]");
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
            if (top > 0) {
                element_css.setCss("top", "0px");
                twCom.fn.hasClass(navElement, "fixed") ? twCom.fn.removeClass(navElement, "fixed") : '';
                twCom.fn.hasClass(content, "show") ? twCom.fn.removeClass(content, "show") : '';
                twCom.fn.addClass(navElement, "push-pin");
            }

            /*
            top을 비교하여 top 값이 0 혹은 그보다 작을 경우에는 현재스크롤위치값이 엘리먼트에 절대위치에 있거나 그보다 아래에 있는걸 의미하고
            top + zoneClientHeight 의 값은 현재 위치가 엘리먼트 절대위치top을 지났고 대상엘리먼트의 끝은 안넘었음을 의미한다.
            한마디로 현재위치가 대상엘리먼트 안에 존재할때에 fixed는 유효하다.
            이 경우 push-pin 클래스가 있을시에 클래스를 제거하고 fixed라는 클래스를 추가한다. fixed클래스는 css position을 fixed로 변경한다.
            */
            if (top <= 1 && markCheck > 0) {
                element_css.setCss("top", "0px");
                twCom.fn.addClass(content, "show");
                twCom.fn.hasClass(navElement, "push-pin") ? twCom.fn.removeClass(navElement, "push-pin") : '';
                twCom.fn.addClass(navElement, "fixed");
            }

            /*
            markCheck 값이 0보다 작아졌는지 체크한다.
            markCheck 값은  현재위치 - element의 크기
            즉 markCheck값이 0이하이면 현재위치가 대상엘리먼트의 크기를 넘었음을 의미한다.
            그리고 novheight의 크기를 뺴는이유는 navbar 내에 엘리먼트 영역이 사라질때 navbar의 포지션이 relative 전환되야하기때문에
            markCheck 값이 0이될떄 영역은 사라지고 navbar만 존재하며 그시점을 아래조건식을 통해서 설정한다..
            */
            if (markCheck <= 0) {
                element_css.setCss("top", (pushZones[i].offsetHeight - navbarClientHeight) + "px");
                twCom.fn.hasClass(navElement, "fixed") ? twCom.fn.removeClass(navElement, "fixed") : '';
                twCom.fn.addClass(navElement, "push-pin");
            }


        }
    };

    scrollPush();
    window.addEventListener("scroll", function(e) {
        requestAnimFrame(scrollPush);
    });
};


window.addEventListener("DOMContentLoaded", function(e) {
    pushpin();
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

(function() {
    "use strict";


    function triggerCheck(e) {

        var sideNav_trigger = getSidenavtrigger(e);



        if (sideNav_trigger !== null) {
            var trigger_type = sideNav_trigger.getAttribute("data-trigger") || "open";
            if ("ontouchstart" in window && sideNav_trigger.getAttribute("id") === "drag-target") {
                return false;
            } else {
                sideNav[trigger_type](e, sideNav_trigger);
            }

        }
    }
    var Option = {
        width: 250,
    };

    function swipe(e, element) {
        var sidenav_element = getSidenavElement(e, element);
        var shadowELement = createShadow(sidenav_element);

        var sideEle_css = twCom.fn.cssObject(sidenav_element);
        var width = sideEle_css.getCss("width").split("px")[0];
        width = Number(width);
        var x = (e.center.x - width);


        if (x > 0) {
            x = 0;
        }

        if (x < -width) {
            x = -width;
        }
        var opacity = (10000 / width);
        opacity = opacity / (opacity * width);
        opacity = opacity * (width + x);

        shadowELement.setAttribute("style", "opacity :" + opacity + ";");

        var cssObject = {};
        var translateX = "translateX(" + x + "px)";

        cssObject['width'] = width + "px";
        cssObject['-webkit-transform'] = translateX;
        cssObject['-moz-transform'] = translateX;
        cssObject['-ms-transform'] = translateX;
        cssObject['-o-transform'] = translateX;
        cssObject.transform = translateX;
        sidenav_element.setAttribute("style", twCom.fn.convertStyle(cssObject));
    }

    function swipeEnd(e, element) {
        var sidenav_element = getSidenavElement(e, element);
        var sideEle_css = twCom.fn.cssObject(sidenav_element);
        var width = sideEle_css.getCss("width").split("px")[0];
        var tx = sideEle_css.getCss("transform").split(",")[4];
        var currentX = Number(width) + Number(tx);


        if (currentX >= (width / 2)) {
            sideNav.open(e, element);
        } else {
            sideNav.close(e, element);
        }
    }

    function tap(e, element) {
        var sidenav_element = getSidenavElement(e, element);
        var sideEle_css = twCom.fn.cssObject(sidenav_element);

        var shadowElement = document.getElementById("shadow-area");
        if (shadowElement === null) {
            sideNav.open(e, element);
        } else {
            sideNav.close(e, element);
        }
    }

    function getSidenavtrigger(e) {

        var element = e.target || e.srcElement;
        var target = null;
        while (element.parentElement !== null) {
            if (element.getAttribute("data-sidenav")) {
                target = element;
                break;
            }
            element = element.parentElement;
        }

        return target;
    }

    function getSidenavElement(e, element) {
        var sidenav_id;
        if (typeof e === "object" && typeof element === "object") {
            sidenav_id = element.getAttribute("data-sidenav");
            return document.getElementById(sidenav_id);
        } else {
            sidenav_id = e || element;
            return document.getElementById(sidenav_id);
        }
    }

    function createShadow(sidenavElement) {
        var shadow_bool = Boolean(sidenavElement.getAttribute("shadow")) || true;

        if (!shadow_bool) {
            return false;
        }
        var element = document.getElementById("shadow-area");
        if (element === null) {
            var shadow_ele = document.createElement("div");
            shadow_ele.setAttribute("id", "shadow-area");
            shadow_ele.setAttribute("data-sidenav", sidenavElement.getAttribute("id"));
            shadow_ele.setAttribute("data-trigger", "close");

            return document.body.appendChild(shadow_ele);
        } else {
            return element;
        }
    }

    function getShadowElement(element) {
        if (element.getAttribute("id") === "shadow-area") {
            return element;
        } else {
            return document.getElementById("shadow-area");
        }
    }

    function createdragTarget(element) {
        if (document.getElementById("drag-target") === null && element !== null) {
            var dragTarget = document.createElement("div");
            dragTarget.setAttribute("id", "drag-target");
            dragTarget.setAttribute("data-sidenav", element.getAttribute("id"));
            dragTarget.setAttribute("data-trigger", "close");
            dragEvent(dragTarget);
            return document.body.appendChild(dragTarget);
        } else {
            return document.getElementById("drag-target");
        }
    }

    function dragEvent(drag_element) {
        if (drag_element !== null) {
            var mc = new Hammer(drag_element);

            mc.on("panleft panright panend pancancel tap", function(e) {
                if (e.eventType === 8) {
                    return false;
                }
                if (e.pointerType !== "touch") {
                    return false;
                }

                if (e.type === "panright" || e.type === "panleft") {
                    swipe(e, drag_element);
                } else if (e.type === "tap") {
                    tap(e, drag_element);
                } else {
                    swipeEnd(e, drag_element);
                }
            });
        }
    }
    var sideNav = {
        duration: 300,
        easing : "cubic-bezier(0.23, 1, 0.32, 1)",
        open: function(e, element) {
            var sidenavElement = getSidenavElement(e, element);
            var cssObject = {},
                cssObject2 = {},
                cssObject3 = {};
            if (sidenavElement === null) {
                return false;
            }
            var shadowELement = createShadow(sidenavElement);
            var dragTarget = createdragTarget(sidenavElement);
            var sidenav_css = twCom.fn.cssObject(sidenavElement);
            var shadow_css = twCom.fn.cssObject(shadowELement);


            // sidenav css설정 custom attribute에서 설정한값 default = 300
            var translateX = "translateX(0px)";
            cssObject['-webkit-transform'] = translateX;
            cssObject['-moz-transform'] = translateX;
            cssObject['-ms-transform'] = translateX;
            cssObject['-o-transform'] = translateX;
            cssObject.transform = translateX;


            //animation 시간
            cssObject['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject['-moz-transition-duration'] = sideNav.duration + 'ms';
            cssObject['-o-transition-duration'] = sideNav.duration + 'ms';
            cssObject['transition-duration'] = sideNav.duration + 'ms';

            //easing
            cssObject['-webkit-transition-timing-function'] = sideNav.easing;
            cssObject['-moz-transition-timing-function'] = sideNav.easing;
            cssObject['-o-transition-timing-function'] = sideNav.easing;
            cssObject['transition-timing-function'] = sideNav.easing;



            // 그림자영역 css 설정
            cssObject2["opacity"] = 1;

            //animation 시간
            cssObject2['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['-moz-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['-o-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['transition-duration'] = sideNav.duration + 'ms';

            cssObject2['-webkit-transition-timing-function'] = sideNav.easing;
            cssObject2['-moz-transition-timing-function'] = sideNav.easing;
            cssObject2['-o-transition-timing-function'] = sideNav.easing;
            cssObject2['transition-timing-function'] = sideNav.easing;

            //drag target CSS 변경
            var dragTarget_css = twCom.fn.cssObject(dragTarget);
            cssObject3 = {
                right: 0,
                width: "90%",
            };

            requestAnimationFrame(function() {
                sidenav_css.cssEach(cssObject);
                shadow_css.cssEach(cssObject2);
                dragTarget_css.cssEach(cssObject3);
                document.body.style.overflow = "hidden";
            });
        },
        close: function(e, element) {

            var shadow_element = getShadowElement(element);

            if (shadow_element === null) {
                return false;
            }

            var sidenav_element = getSidenavElement(e, shadow_element);
            var sidenav_css = twCom.fn.cssObject(sidenav_element),
                shadow_css = twCom.fn.cssObject(shadow_element);
            var cssObject = {},
                cssObject2 = {},
                cssObject3 = {};


            var translateX = "";

            cssObject['-webkit-transform'] = translateX;
            cssObject['-moz-transform'] = translateX;
            cssObject['-ms-transform'] = translateX;
            cssObject['-o-transform'] = translateX;
            cssObject.transform = translateX;



            //animation 시간
            cssObject['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject['-moz-transition-duration'] = sideNav.duration + 'ms';
            cssObject['-o-transition-duration'] = sideNav.duration + 'ms';
            cssObject['transition-duration'] = sideNav.duration + 'ms';

            //easing
            cssObject['-webkit-transition-timing-function'] = sideNav.easing;
            cssObject['-moz-transition-timing-function'] = sideNav.easing;
            cssObject['-o-transition-timing-function'] = sideNav.easing;
            cssObject['transition-timing-function'] = sideNav.easing;


            cssObject2["opacity"] = 0;
            //animation 시간
            cssObject2['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['-moz-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['-o-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['transition-duration'] = sideNav.duration + 'ms';

            cssObject2['-webkit-transition-timing-function'] = sideNav.easing;
            cssObject2['-moz-transition-timing-function'] = sideNav.easing;
            cssObject2['-o-transition-timing-function'] = sideNav.easing;
            cssObject2['transition-timing-function'] = sideNav.easing;

            //drag target CSS 변경
            var dragTarget = document.getElementById("drag-target");
            var dragTarget_css = twCom.fn.cssObject(dragTarget);
            cssObject3 = {
                right: "",
                width: "",
            };

            sidenav_css.cssEach(cssObject);
            shadow_css.cssEach(cssObject2);
            dragTarget_css.cssEach(cssObject3);
            document.body.style.overflow = "";
            setTimeout(function() {
                try {
                    shadow_element.parentElement.removeChild(shadow_element);
                } catch (exception) {
                    return false;
                }
            }, sideNav.duration);
        }
    };

    twCom.fn.setDrag = createdragTarget;
    window.addEventListener("DOMContentLoaded", function(e) {
        if ('ontouchstart' in window) {
            document.body.addEventListener('touchend', triggerCheck, false);
        } else {
            document.body.addEventListener('click', triggerCheck, false);
        }
        twCom.fn.setDrag(document.getElementById("myside-nav"));
    });
})();


/***/ }),
/* 8 */
/***/ (function(module, exports) {

(function() {

    var Option = function(option) {
        if (typeof option === "undefined") {
            this.fullScreen = false;
        } else {
            this.fullScreen = option.fullScreen;
        }
    };

    function getSlide(element) {
        var ele = element;
        while (ele !== null) {
            if (twCom.fn.hasClass(ele, "slide")) {
                slide = ele;
                break;
            }
            ele = ele.parentElement;
        }
        return ele;
    }


    function triggerClick(e) {
        var self = this;
        if (self.currentSlide === true) {
            return false;
        }

        var _Element = self._Element;
        var indexElement = self._displayList.querySelector(".active");
        var activeObject = {
            next: indexElement.nextSibling || indexElement.parentElement.childNodes[0],
            prev: indexElement.previousSibling || indexElement.parentElement.childNodes[self._slides.length - 1]
        };
        var lastIndex = self._slides.length - 1;
        var triggerElement, eventName;
        if (e instanceof MouseEvent) {
            triggerElement = e.target || e.srcElement;
            eventName = twCom.fn.hasClass(triggerElement, "next") ? "next" : "prev";
        } else {
            eventName = e.type === "swipeleft" ? "next" : "prev";
        }

        if (eventName) {
            twCom.fn.removeClass(indexElement, "active");
            twCom.fn.addClass(activeObject[eventName], "active");
            self.setSliding(activeObject[eventName], eventName);
        } else {
            return false;
        }
    }

    /*
    옵션
    풀스크린
    실행시간
    크기
    */
    var slide = function(selector, option) {
        if (this instanceof slide) {
            this.init(selector, option);
        } else {
            return new slide(selector, option);
        }
    };

    slide.prototype.init = function(selector, option) {
        this._Element = document.querySelector(selector);
        this._slides = this._Element ? this._Element.getElementsByClassName("slide") : null;
        this.duration = 300;
        this.currentSlide = false;
        if (this._slides !== null && this._slides.length > 0) {
            this.setDisplay();
            this.setSlideImage();
            this.setSwipe();
            this.setTrigger();
        }
    };

    slide.prototype.setAutosliding = function(bool, time) {
        var self = this;
        var _Element = self._Element;
        var displayList = self._displayList;

        setInterval(function() {
            var indexElement = displayList.querySelector(".active");
            var nextElement = indexElement.nextSibling === null ? displayList.childNodes[0] : indexElement.nextSibling;
            self.displayClick({
                target: nextElement
            });
        }, time);
    };




    slide.prototype.setTrigger = function() {
        var self = this;
        var _Element = self._Element;
        var nextTrigger = _Element.getElementsByClassName("next")[0];
        var prevTrigger = _Element.getElementsByClassName("prev")[0];
        if (typeof nextTrigger === "undefined" && typeof prevTrigger === "undefined") {
            return false;
        }
        nextTrigger.addEventListener("click", triggerClick.bind(this));
        prevTrigger.addEventListener("click", triggerClick.bind(this));
    };



    slide.prototype.setSwipe = function() {
        var self = this;
        var _Element = this._Element;
        var mc = new Hammer(_Element);
        mc.on("swipeleft swiperight", triggerClick.bind(self));
    };


    slide.prototype.displayClick = function(e) {
        var self = this;
        if (self.currentSlide === true) {
            return false;
        }
        var clickElement = e.target || e.srcElement;
        var activeElement = this._displayList.querySelector(".active");
        var triggerType;
        var currentIndex = activeElement.getAttribute("data-index");
        var targetIndex = clickElement.getAttribute("data-index");
        console.log(currentIndex, targetIndex);
        // if( activeElement !== null ){
        //     twCom.fn.removeClass(activeElement, "active");
        // }
        // twCom.fn.addClass(clickElement, "active");
        // this.setSliding(clickElement);
    };


    slide.prototype.setSliding = function(element, eventName, delay) {
        var self = this;
        var slides = this._slides;
        var currentSlide = this._Element.getElementsByClassName("active")[0];
        var index = parseInt(element.getAttribute("data-index"));

        if (currentSlide === slides[index]) {
            return false;
        }

        var nextIndex = index === slides.length - 1 ? 0 : index + 1;
        var prevIndex = index === 0 ? slides.length - 1 : index - 1;
        var width = this._Element.clientWidth;
        var indexWidth, slide_css, translateX, zIndex, opacity, cssObject = {},
            duration = delay || self.duration,
            time = 0;
        var easing = "cubic-bezier(0.075, 0.82, 0.300, 1)";
        //remove  active and textContent
        twCom.fn.removeClass(currentSlide, "active");
        twCom.fn.addClass(slides[index], "active");
        for (var i = 0; i < slides.length; i++) {
            if (i === prevIndex) {
                indexWidth = -1 * width;
                time = eventName === "next" ? duration : 0;
            } else if (i === nextIndex) {
                indexWidth = 1 * width;
                time = eventName === "prev" ? duration : 0;
            } else if (i === index) {
                indexWidth = 0;
                time = duration;
            } else {
                indexWidth = (index - i) * width;
                time = 0;
            }

            zIndex = i === index ? 1 : -2;
            translateX = "translateX(" + indexWidth + "px)";
            cssObject["z-index"] = zIndex;
            cssObject["-o-transform"] = translateX;
            cssObject["-webkit-transform"] = translateX;
            cssObject["-ms-transform"] = translateX;
            cssObject["-moz-transform"] = translateX;
            cssObject["transform"] = translateX;

            //animation 시간
            cssObject['-webkit-transition-duration'] = time + "ms";
            cssObject['-moz-transition-duration'] = time + "ms";
            cssObject['-o-transition-duration'] = time + "ms";
            cssObject['transition-duration'] = time + "ms";

            slides[i].setAttribute("style", twCom.fn.convertStyle(cssObject));
            (function(i) {
                var time = i === index ? self.duration : 0;
                setTimeout(function() {
                    var textContent = slides[i].getElementsByClassName("text-container")[0];
                    var command = i === index ? "addClass" : "removeClass";

                    if (typeof textContent !== "undefined") {
                        twCom.fn[command](textContent, "show");
                    }
                }, time);
            })(i);
        }
        self.currentSlide = true;
        setTimeout(function() {
            self.currentSlide = false;
        }, self.duration);
    };

    slide.prototype.setDisplay = function() {
        var ul = document.createElement("ul");
        var i, li;
        var slides = this._slides;

        twCom.fn.addClass(ul, "displayList");
        for (i = 0; i < slides.length; i++) {
            li = document.createElement("li");
            li.setAttribute("data-index", i);
            if (i === 0) {
                twCom.fn.addClass(slides[i], "active");
                twCom.fn.addClass(li, "active");
            }
            twCom.fn.addClass(li, "display-item");
            li.addEventListener("click", this.displayClick.bind(this));
            ul.appendChild(li);
            li = null;
        }
        setTimeout(function() {
            var textContent = slides[0].getElementsByClassName("text-container")[0];
            if (typeof textContent !== "undefined") {
                twCom.fn.addClass(textContent, "show");
            }
        }, 300);
        if (slides.length === 1) {
            twCom.fn.cssObject(ul).setCss("display", "none");
        }
        this._displayList = ul;
        this._Element.appendChild(ul);
        ul = null;
    };


    slide.prototype.setSlideImage = function() {
        var slides = this._slides;
        var displayList = this._displayList;
        var width = this._Element.clientWidth;
        var duration = this.duration;
        var easing = "cubic-bezier(0.075, 0.82, 0.300, 1)"; //animation 시간
        var cssObject = {},
            cssObject2 = {};
        var index = 0;
        var nextIndex = index === slides.length - 1 ? 0 : index + 1;
        var prevIndex = index === 0 ? slides.length - 1 : index - 1;
        var indexWidth, translateX, zIndex, slide_css, property;

        property = "transform";
        cssObject['-webkit-transition-property'] = property;
        cssObject['-moz-transition-property'] = property;
        cssObject['-o-transition-property'] = property;
        cssObject['transition-property'] = property;
        //animation 시간
        cssObject['-webkit-transition-duration'] = duration + "ms";
        cssObject['-moz-transition-duration'] = duration + "ms";
        cssObject['-o-transition-duration'] = duration + "ms";
        cssObject['transition-duration'] = duration + "ms";
        //easing
        cssObject['-webkit-transition-timing-function'] = easing;
        cssObject['-moz-transition-timing-function'] = easing;
        cssObject['-o-transition-timing-function'] = easing;
        cssObject['transition-timing-function'] = easing;

        for (var i = 0; i < slides.length; i++) {

            zIndex = i === index ? 1 : -2;
            indexWidth = (i - index) * width;
            translateX = "translateX(" + indexWidth + "px)";

            cssObject['-webkit-transform'] = translateX;
            cssObject['-moz-transform'] = translateX;
            cssObject['-ms-transform'] = translateX;
            cssObject['-o-transform'] = translateX;
            cssObject['transform'] = translateX;
            cssObject['z-index'] = zIndex;
            slides[i].setAttribute("style", twCom.fn.convertStyle(cssObject));
        }
    };

    //추후 개발예정

    // for(var i = 0; i < slides.length; i++){
    //     if( i === nextIndex ){
    //       opacity = 1;
    //       zIndex = -1;
    //       indexWidth = 1 * width;
    //     }else if ( i === prevIndex ){
    //       opacity = 1;
    //       zIndex = -1;
    //       indexWidth =  width * -1;
    //     }else{
    //       opacity = i === index ? 1 : 0;
    //       zIndex = i === index ? 1 : -2;
    //       indexWidth = (i - index)  *  width;
    //     }
    //     slide_css = twCom.fn.cssObject(slides[i]);
    //     if(i === index ){
    //         translateX = "translateX(0px) translateX(0px) translateX(0px) translateZ(0px)";
    //     }else{
    //       translateX = "translateX(0px) translateX("+indexWidth+"px) translateZ(0px)";
    //     }
    //     slide_css.setCss("opacity", opacity);
    //     slide_css.setCss("-o-transform", translateX);
    //     slide_css.setCss("-webkit-transform", translateX);
    //     slide_css.setCss("-ms-transform", translateX);
    //     slide_css.setCss("-moz-transform", translateX);
    //     slide_css.setCss("transform", translateX);
    //     slide_css.setCss("z-index", zIndex);
    // }







    //
    // function(e){
    //     console.log(e);
    //     var slide = getSlide(e.target);
    //     if ( slide === null) { return false; }
    //
    //     var indexElement = slide.parentElement.querySelector(".active");
    //     var nextElement= indexElement.nextSibling;
    //     var prevElement = indexElement.previousSibling;
    //     var lastIndex = self.slideLength - 1;
    //     if ( indexElement.getAttribute("data-index") === "0" &&  prevElement === null ){
    //         prevElement = indexElement.parentElement.childNodes[self.slideLength - 1];
    //     }
    //
    //     if ( indexElement.getAttribute("data-index") === lastIndex.toString() &&  nextElement === null ){
    //         nextElement = indexElement.parentElement.childNodes[0];
    //     }
    //     if ( e.type === "swiperight" ){
    //       twCom.fn.removeClass(indexElement, "active");
    //       twCom.fn.addClass(prevElement, "active");
    //       self.setSliding(prevElement);
    //     } else if( e.type === "swipeleft" ){
    //       twCom.fn.removeClass(indexElement, "active");
    //       twCom.fn.addClass(nextElement, "active");
    //       self.setSliding(nextElement);
    //     }
    //
    //
    //
    //
    //
    // }
    //



    twCom.slide = slide;


    window.addEventListener("DOMContentLoaded", function(e) {
        twCom.slide("#topSlide");
    });
})();


/***/ }),
/* 9 */
/***/ (function(module, exports) {

(function() {
    "use strict";

    var waves_colorList = {
        "white": "wave-color-white",
        "black": "wave-color-black",
        "green": "wave-color-green",
        "yellow": "wave-color-yellow",
        "red": "wave-color-red",
        "white2": "wave-color-white2",
        "black2": "wave-color-black2",
        "green2": "wave-color-green2",
        "yellow2": "wave-color-yellow2",
        "red2": "wave-color-red2",
    };


    function offset(elem) {
        var docElem,
            box = {
                top: 0,
                left: 0
            },
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;
        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }

        return {
            top: box.top + window.pageYOffset - docElem.clientTop,
            left: box.left + window.pageXOffset - docElem.clientLeft
        };
    }




    var Effect = {
        duration: 750,

        show: function(e, ele) {  
            var element = ele || this;


            var effectElement = document.createElement("span");

            twCom.fn.addClass(effectElement, "wave");

            element.appendChild(effectElement);
            // wave color 설정
            var color = element.getAttribute("data-waveColor") || "white";

            twCom.fn.addClass(effectElement, waves_colorList[color]);

            var eleOffset = offset(element);
            var ElementX = 0;
            var ElementY = 0;
            var scaleWidth = Math.max(element.clientWidth, element.clientHeight);
            if ("changedTouches" in e) {
                ElementY = (e.changedTouches[0].pageY - eleOffset.top);
                ElementX = (e.changedTouches[0].pageX - eleOffset.left);
            } else {
                ElementY = (e.pageY - eleOffset.top);
                ElementX = (e.pageX - eleOffset.left);
            }
            var scale = 'scale(' + ((scaleWidth / 100) * 10) + ')';



            effectElement.setAttribute('data-timestamp', Date.now());



            // ripple position 설정
            var rippleStyle = {
                'top': ElementY + 'px',
                'left': ElementX + 'px',
            };

            //sale 크기
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity = '1';

            //animation 시간
            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['transition-duration'] = Effect.duration + 'ms';

            //easing
            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            effectElement.setAttribute("style", twCom.fn.convertStyle(rippleStyle));
        },

        hide: function(e) {
            var ele = this;
            //엘리먼트에서 최근 생성된 wave 이펙트 엘리먼트 찾기
            var ripple = null;
            var ripples = ele.getElementsByClassName('wave');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var time = Number(Date.now()) - ripple.getAttribute("data-timestamp");
            var removeTime = Effect.duration / 2 - time;
            if (removeTime < 0) {
                removeTime = 0;
            }

            var ripplestyle = {
                "opacity": "0",
            };

            var element_removeDelay = Effect.duration - removeTime;



            setTimeout(function() {
                ripple.style.opacity = 0;
                setTimeout(function() {
                    try {
                        ele.removeChild(ripple);
                    } catch (exception) {
                        return;
                    }
                }, element_removeDelay);
            }, removeTime);
        }
    };

    function getWavesEffectElemet(e) {
        var element = null;
        var target = e.target || e.srcElement;

        //이벤트 엘리먼트에서 waves-effect 라는 클래스를 찾아보고 없으면 자신의 부모엘리먼트를 순환하면서 찾는구조이며
        //없을시에는 element 값에 null 반환
        //있을시에는 element 변수에  waves-effect class를 가지고있는 엘리먼트를 치환하고 element 변수를 리턴시킨다.
        while (target.parentElement !== null) {
            if (twCom.fn.hasClass(target, "waves-effect")) {
                element = target;
                break;
            }
            target = target.parentElement;
        }
        return element;
    }


    function showEffect(e) {
        var element = getWavesEffectElemet(e);


        if (element !== null) {
            Effect.show(e, element);
            if ("ontouchend" in window) {
                element.addEventListener('touchend', Effect.hide);
                element.addEventListener('touchcancel', Effect.hide);
            }
            element.addEventListener('mouseup', Effect.hide);
            element.addEventListener('mouseleave', Effect.hide);
        }
    }

    window.addEventListener("DOMContentLoaded", function(e) {
        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect);
        } else {
            document.body.addEventListener('mousedown', showEffect);
        }
    });
})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);