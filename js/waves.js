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
