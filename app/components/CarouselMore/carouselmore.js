
var React = require('react');
require('./css/carousel.css');
var iSlider = require('islider.js');
require('./css/iSlider.css');
// require('islider.js').plugin.button.js;
var img1 = require('./images/1.jpg');
var img2 = require('./images/2.jpg');
// require('./js/iSlider.js');
// require('./js/iSlider.plugin.button.js');
// require('./js/iSlider.plugin.dot.js');

var Carousel = React.createClass({

    componentDidMount() {


        var list = [
            // picture
            {
                // content: './imgs/pic.jpg'
                content: img1
            },
            // HTML String
            {
                // content: '<div style="font-size:4em;color:white;text-align: center">HTML String</div>'
                content: img2
            },
            // element
            // {
            //     content: (function () {
            //         var dom = document.createElement('div');
            //         dom.innerHTML = 'Element';
            //         dom.style.cssText = 'font-size:3em;color:rgb(230, 230, 63);';
            //         return dom;
            //     })()
            // },
            // // fragment
            // {
            //     content: (function () {
            //         var frag = document.createDocumentFragment();
            //         var img = new Image()
            //         var dom = document.createElement('div');
            //         dom.innerHTML = 'Fragment';
            //         dom.style.cssText = 'font-size:3em;color:rgb(230, 63, 230);';
            //         frag.appendChild(dom);
            //         return frag;
            //     })()
            // },
            // // dom
            // {
            //     content: document.querySelector('#hidden-space > p')
            // },
            // // iframe
            // {
            //     content: '' +
            //     '<div style="padding-top:.2em;font-size:3em;color:rgb(230, 63, 230);position:absolute;top:0;left:0;height:100%;width:100%;z-index:1">' +
            //     '<span style="padding:.2em;background-color:black;">Iframe</span>' +
            //     '</div>' +
            //     '<iframe style="position:relative;z-index:0;height:100%;" src="http://mobile.baidu.com"></iframe>'
            // }
        ];

        var S = new iSlider({
            dom: document.getElementById('iSlider-wrapper'),
            data: list,
            isLooping: 1,
            isDebug:true,
            isOverspread: 1,
            animateTime: 800, // ms
            plugins: ['dot','button']
        });
        // var fun = this;
        // setTimeout(function() {
            
        // fun.setState({});
        // }, 2000);
    },

    render: function () {
        var w = $(document).width();
        var height = w/2.25;
        // <div id="hidden-space" style={{ display: "none" }}>
        //             <p style={{ fontSize: "3em", textAlign: "center", color: "#04f512" }}>A node in dom tree.</p>
        //         </div>
        return (
                <div id="iSlider-wrapper" style={{position:"relative",height:height}}></div>
                
        );
    }
});

module.exports = Carousel;