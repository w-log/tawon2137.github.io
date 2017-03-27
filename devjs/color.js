(function(){


  var red = {
    "basic": "#F44336",
    "l-5": "#FFEBEE",
    "l-4": "#FFCDD2",
    "l-3": "#EF9A9A",
    "l-2": "#E57373",
    "l-1": "#EF5350",
    "d-1": "#E53935",
    "d-2": "#D32F2F",
    "d-3": "#C62828",
    "d-4": "#B71C1C",
    "a-1": "#FF8A80",
    "a-2": "#FF5252",
    "a-3": "#FF1744",
    "a-4": "#D50000"
   };
  var pink = {
    "basic": "#e91e63",
    "l-5": "#fce4ec",
    "l-4": "#f8bbd0",
    "l-3": "#f48fb1",
    "l-2": "#f06292",
    "l-1": "#ec407a",
    "d-1": "#d81b60",
    "d-2": "#c2185b",
    "d-3": "#ad1457",
    "d-4": "#880e4f",
    "a-1": "#ff80ab",
    "a-2": "#ff4081",
    "a-3": "#f50057",
    "a-4": "#c51162"
  };
  var purple = {
    "basic": "#9c27b0",
    "l-5": "#f3e5f5",
    "l-4": "#e1bee7",
    "l-3": "#ce93d8",
    "l-2": "#ba68c8",
    "l-1": "#ab47bc",
    "d-1": "#8e24aa",
    "d-2": "#7b1fa2",
    "d-3": "#6a1b9a",
    "d-4": "#4a148c",
    "a-1": "#ea80fc",
    "a-2": "#e040fb",
    "a-3": "#d500f9",
    "a-4": "#aa00ff"
  };

  var deepPurple = {
    "basic": "#673ab7",
    "l-5": "#ede7f6",
    "l-4": "#d1c4e9",
    "l-3": "#b39ddb",
    "l-2": "#9575cd",
    "l-1": "#7e57c2",
    "d-1": "#5e35b1",
    "d-2": "#512da8",
    "d-3": "#4527a0",
    "d-4": "#311b92",
    "a-1": "#b388ff",
    "a-2": "#7c4dff",
    "a-3": "#651fff",
    "a-4": "#6200ea"
  };

  var indigo = {
    "basic": "#3f51b5",
    "l-5": "#e8eaf6",
    "l-4": "#c5cae9",
    "l-3": "#9fa8da",
    "l-2": "#7986cb",
    "l-1": "#5c6bc0",
    "d-1": "#3949ab",
    "d-2": "#303f9f",
    "d-3": "#283593",
    "d-4": "#1a237e",
    "a-1": "#8c9eff",
    "a-2": "#536dfe",
    "a-3": "#3d5afe",
    "a-4": "#304ffe"
  };
  var blue = {
    "basic": "#2196F3",
    "l-5": "#E3F2FD",
    "l-4": "#BBDEFB",
    "l-3": "#90CAF9",
    "l-2": "#64B5F6",
    "l-1": "#42A5F5",
    "d-1": "#1E88E5",
    "d-2": "#1976D2",
    "d-3": "#1565C0",
    "d-4": "#0D47A1",
    "a-1": "#82B1FF",
    "a-2": "#448AFF",
    "a-3": "#2979FF",
    "a-4": "#2962FF"
  };
  var lightBlue = {
    "basic": "#03a9f4",
    "l-5": "#e1f5fe",
    "l-4": "#b3e5fc",
    "l-3": "#81d4fa",
    "l-2": "#4fc3f7",
    "l-1": "#29b6f6",
    "d-1": "#039be5",
    "d-2": "#0288d1",
    "d-3": "#0277bd",
    "d-4": "#01579b",
    "a-1": "#80d8ff",
    "a-2": "#40c4ff",
    "a-3": "#00b0ff",
    "a-4": "#0091ea"
  };
  var cyan = {
   "basic": "#00bcd4",
   "l-5": "#e0f7fa",
   "l-4": "#b2ebf2",
   "l-3": "#80deea",
   "l-2": "#4dd0e1",
   "l-1": "#26c6da",
   "d-1": "#00acc1",
   "d-2": "#0097a7",
   "d-3": "#00838f",
   "d-4": "#006064",
   "a-1": "#84ffff",
   "a-2": "#18ffff",
   "a-3": "#00e5ff",
   "a-4": "#00b8d4"
 };
  var teal = {
     "basic": "#009688",
     "l-5": "#e0f2f1",
     "l-4": "#b2dfdb",
     "l-3": "#80cbc4",
     "l-2": "#4db6ac",
     "l-1": "#26a69a",
     "d-1": "#00897b",
     "d-2": "#00796b",
     "d-3": "#00695c",
     "d-4": "#004d40",
     "a-1": "#a7ffeb",
     "a-2": "#64ffda",
     "a-3": "#1de9b6",
     "a-4": "#00bfa5"
   };
  var green = {
    "basic": "#4CAF50",
    "l-5": "#E8F5E9",
    "l-4": "#C8E6C9",
    "l-3": "#A5D6A7",
    "l-2": "#81C784",
    "l-1": "#66BB6A",
    "d-1": "#43A047",
    "d-2": "#388E3C",
    "d-3": "#2E7D32",
    "d-4": "#1B5E20",
    "a-1": "#B9F6CA",
    "a-2": "#69F0AE",
    "a-3": "#00E676",
    "a-4": "#00C853"
  };
  var lightGreen = {
   "basic": "#8bc34a",
   "l-5": "#f1f8e9",
   "l-4": "#dcedc8",
   "l-3": "#c5e1a5",
   "l-2": "#aed581",
   "l-1": "#9ccc65",
   "d-1": "#7cb342",
   "d-2": "#689f38",
   "d-3": "#558b2f",
   "d-4": "#33691e",
   "a-1": "#ccff90",
   "a-2": "#b2ff59",
   "a-3": "#76ff03",
   "a-4": "#64dd17"
  };
  var lime = {
    "basic": "#cddc39",
    "l-5": "#f9fbe7",
    "l-4": "#f0f4c3",
    "l-3": "#e6ee9c",
    "l-2": "#dce775",
    "l-1": "#d4e157",
    "d-1": "#c0ca33",
    "d-2": "#afb42b",
    "d-3": "#9e9d24",
    "d-4": "#827717",
    "a-1": "#f4ff81",
    "a-2": "#eeff41",
    "a-3": "#c6ff00",
    "a-4": "#aeea00"
  };
  var yellow = {
    "basic":"#ffeb3b",
    "l-5":"#fffde7",
    "l-4":"#fff9c4",
    "l-3":"#fff59d",
    "l-2":"#fff176",
    "l-1":"#ffee58",
    "d-1":"#fdd835",
    "d-2":"#fbc02d",
    "d-3":"#f9a825",
    "d-4":"#f57f17",
    "a-1":"#ffff8d",
    "a-2":"#ffff00",
    "a-3":"#ffea00",
    "a-4":"#ffd600"
  };
  var amber = {
    "basic":"#ffc107",
    "l-5":"#fff8e1",
    "l-4":"#ffecb3",
    "l-3":"#ffe082",
    "l-2":"#ffd54f",
    "l-1":"#ffca28",
    "d-1":"#ffb300",
    "d-2":"#ffa000",
    "d-3":"#ff8f00",
    "d-4":"#ff6f00",
    "a-1":"#ffe57f",
    "a-2":"#ffd740",
    "a-3":"#ffc400",
    "a-4":"#ffab00"
  };
  var orange = {
   "basic": "#ff9800",
   "l-5": "#fff3e0",
   "l-4": "#ffe0b2",
   "l-3": "#ffcc80",
   "l-2": "#ffb74d",
   "l-1": "#ffa726",
   "d-1": "#fb8c00",
   "d-2": "#f57c00",
   "d-3": "#ef6c00",
   "d-4": "#e65100",
   "a-1": "#ffd180",
   "a-2": "#ffab40",
   "a-3": "#ff9100",
   "a-4": "#ff6d00"
  };
  var deepOrange = {
    "basic": "#ff5722",
    "l-5": "#fbe9e7",
    "l-4": "#ffccbc",
    "l-3": "#ffab91",
    "l-2": "#ff8a65",
    "l-1": "#ff7043",
    "d-1": "#f4511e",
    "d-2": "#e64a19",
    "d-3": "#d84315",
    "d-4": "#bf360c",
    "a-1": "#ff9e80",
    "a-2": "#ff6e40",
    "a-3": "#ff3d00",
    "a-4": "#dd2c00"
  };
  var brown = {
    "basic": "#795548",
    "l-5": "#efebe9",
    "l-4": "#d7ccc8",
    "l-3": "#bcaaa4",
    "l-2": "#a1887f",
    "l-1": "#8d6e63",
    "d-1": "#6d4c41",
    "d-2": "#5d4037",
    "d-3": "#4e342e",
    "d-4": "#3e2723"
  };
  var blueGrey = {
    "basic": "#607d8b",
    "l-5": "#eceff1",
    "l-4": "#cfd8dc",
    "l-3": "#b0bec5",
    "l-2": "#90a4ae",
    "l-1": "#78909c",
    "d-1": "#546e7a",
    "d-2": "#455a64",
    "d-3": "#37474f",
    "d-4": "#263238"
  };
  var grey = {
    "basic": "#9e9e9e",
    "l-5": "#fafafa",
    "l-4": "#f5f5f5",
    "l-3": "#eeeeee",
    "l-2": "#e0e0e0",
    "l-1": "#bdbdbd",
    "d-1": "#757575",
    "d-2": "#616161",
    "d-3": "#424242",
    "d-4": "#212121"
  };
  var shadow = {
    "black": "#000000",
    "white": "#FFFFFF",
    "transparent": "투명"
  };
  var colorList = {
      "red" : red,
      "pink" : pink,
      "purple" : purple,
      "deep-purple" : deepPurple,
      "indigo" : indigo,
      "blue" : blue,
      "light-blue" : lightBlue,
      "cyan" : cyan,
      "teal" : teal,
      "green" : green,
      "light-green" : lightGreen,
      "lime" : lime,
      "yellow" : yellow,
      "amber" : amber,
      "orange" : orange,
      "deep-orange" : deepOrange,
      "brown" : brown,
      "blue-grey" : blueGrey,
      "grey" : grey,
      "shadow" : shadow
  };
  function setColor(container, colorObj){

  }

  window.addEventListener("DOMContentLoaded", function(){
    var container1 = document.getElementsByClassName("color-container")[0];
    var container2 = document.getElementsByClassName("color-container")[1];
    var setColor = function(colorObj, propertyName){
      var colorPattern = document.createElement("div");
      colorPattern.className = "color-pattern col s12 m6 l4";
      var colorElement,colorName;
        for (var prop in colorObj) {
            if(colorObj.hasOwnProperty(prop)){
              colorName = prop === "basic" ? propertyName : propertyName + "-" + prop;
              colorElement = document.createElement("div");
              colorElement.className = colorName === propertyName ? colorName + " basic": colorName;
              colorElement.innerHTML = "<span style='float:left;'>" + colorName+"</span>" + "<span style='float:right;'>" + colorObj[prop] + "</span>";
              colorPattern.appendChild(colorElement);
            }
          }
          if( propertyName === "grey" ){
            container2.appendChild(colorPattern);
          }else{
            container1.appendChild(colorPattern);
          }
    };

    var setShadow = function(colorObj, propertyName){
      var container = document.getElementsByClassName("color-container")[1];
      var colorPattern = document.createElement("div");
      colorPattern.className = "color-pattern col s12 m6 l4";
      var colorElement,colorName;
        for (var prop in colorObj) {
            if(colorObj.hasOwnProperty(prop)){
              colorName = prop;
              colorElement = document.createElement("div");
              colorElement.className = colorName;
              colorElement.innerText = colorName + " " + colorObj[prop];
              colorPattern.appendChild(colorElement);
            }
          }
          container2.appendChild(colorPattern);
    };
    for (var prop in colorList) {
        if(colorList.hasOwnProperty(prop)){
          if( prop === "shadow"){
            setShadow(colorList[prop], prop);
          } else {
            setColor(colorList[prop], prop);
          }
        }
      }
  });


})();
