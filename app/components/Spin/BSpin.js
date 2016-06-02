var React = require('react');
var ReactDOM = require('react-dom');

var spinner = null;

//message暂时不实现
function showLoading(message) {
    var opts = {
        lines: 12 // The number of lines to draw
        , length: 6 // The length of each line
        , width: 3 // The line thickness
        , radius: 10 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#000' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: true // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    };

    var divMask = document.createElement("div");
    divMask.setAttribute("id", "pagemask1289");
    divMask.setAttribute('style', "position:absolute;left:0;top:0;width:100vw;height:100vh;");
    document.body.appendChild(divMask);

    var divBack = document.createElement("div");
    divBack.setAttribute('style', "border-radius:6px;position:absolute;left:40vw;top:45vh;width:20vw;height:10vh;");
    divMask.appendChild(divBack);

    /*var divSpin = document.createElement("div");
    divSpin.setAttribute('style', "position:absolute;left:0;top:0;width:100%;height:50%;");
    divBack.appendChild(divSpin);
    
    var divMsg = document.createElement("div");
    divMsg.setAttribute('style', "padding-top:5px;text-align:center;position:absolute;left:0;top:50%;width:100%;height:50%;");
    divMsg.innerText = "请稍候";
    divMask.appendChild(divMsg);*/

    if (spinner == null) {
        spinner = new Spinner(opts).spin(divBack);
    }
    else {
        spinner.spin(divBack);
    }

    // console.log("show spin");
}

function hideLoading() {
    if (spinner != null) {
        spinner.stop();
    }

    var div = document.getElementById("pagemask1289");
    if (div != null) {
        document.body.removeChild(div);
    }
}

module.exports = { showLoading, hideLoading };

