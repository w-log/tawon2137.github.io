// (function() {
//     var timer;
//     var fixed_nav;
//     var fixed_nav_css;
//     var Save_prop;
//     var scrolltop;
//     var scrollNum = 0;
//
//     var refresh = function () {
//       if(scrolltop > 0){
//         if(scrollNum === 0){
//           fixed_nav.style.opacity = "0";
//           scrollNum = 1;
//         }
//       }
//       if(scrolltop === 0){
//         if(scrollNum === 1){
//           fixed_nav.style.opacity = "0";
//           fixed_nav.style.position = "relative";
//           scrollNum = 0;
//         }
//       }
//     };
//
//     window.addEventListener('DOMContentLoaded',function (e) {
//         fixed_nav = document.querySelectorAll(".fixed-nav")[0];
//         if(fixed_nav){
//             fixed_nav_css = fixed_nav.currentStyle || window.getComputedStyle(fixed_nav);
//             window.addEventListener('scroll',function (e) {
//                 clearTimeout(timer);
//                 scrolltop = e.target.scrollingElement.scrollTop;
//                 timer = setTimeout( refresh , 150);
//             });
//             fixed_nav.addEventListener("transitionend", function(e){
//                 if(e.propertyName ==="opacity" && fixed_nav_css.opacity === "0"){
//                     scrollNum ? fixed_nav.style.position = "fixed" : fixed_nav.style.position = "relative";
//                     setTimeout(function(){
//                       fixed_nav.style.opacity = "1";
//                     })
//                 }
//             })
//       }
//     });
// })();
//fixed nav bar 임시보류
