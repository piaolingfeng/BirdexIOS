
var React = require('react');

require('./css/iSlider.css');
var iSlider= require('./js/iSlider.js');

var img1 = require('./images/1.jpg');
var img2 = require('./images/2.jpg');

//require('./js/iSlider.plugin.button.js');
//require('./js/dotplugin.js');

var Carousel = React.createClass({

    componentDidMount() {
        // localStorage.clear();
        var list = [
            {
                content: img1
            },

            {
                content: img2
            },
        ];
        var S = new iSlider({
            dom: document.getElementById('iSlider-wrapper'),
            data: list,
            isLooping: 1,
            // isDebug:true,
            isOverspread: 1,
            animateTime: 800, // ms
            plugins: ['dot']
        });
        
        var w = $(window).width();
        var height = parseInt(w/2.25);
        var otp=parseInt(height*0.8);
        $(".islider-dot-wrap").css({"textAlign":"center","position":"absolute","top":otp})
        $(".islider-dot").css("min-height","0px");
        $(".islider-outer").css("height",height);
    },

    render: function () {

        // <div id="hidden-space" style={{ display: "none" }}>
        //             <p style={{ fontSize: "3em", textAlign: "center", color: "#04f512" }}>A node in dom tree.</p>
        //         </div>
        return (
                <div id="iSlider-wrapper" style={{position:"relative"}}></div>
                
        );
    }
});

module.exports = Carousel;