var React = require('react');
require('./carousel.css');
var iSlider = require('../../components/CarouselMore/js/islider.js');

var introduce1 = require('./images/introduce01.jpg');
var introduce2 = require('./images/introduce02.jpg');
var introduce3 = require('./images/introduce03.jpg');
var gVar = require('../../main/global.js');

var Introduce = React.createClass({
    
    componentDidMount() {


        var list = [
            // picture
            {
                // content: './imgs/pic.jpg'
                content: introduce1
            },
            // HTML String
            {
                // content: '<div style="font-size:4em;color:white;text-align: center">HTML String</div>'
                content: introduce2
            },
            {
                content:introduce3
            },
           
        ];

        var S = new iSlider({
            dom: document.getElementById('iSlider-wrapper'),
            data: list,
            isLooping: false,
            // isDebug:true,
            isOverspread: 1,
            animateTime: 800, // ms
            plugins: ['dot'],
            
        });
        // S.on('slideChanged', this.onslidechangedCallback);
        // S.on('slideChange', this.onslidechangedCallback)
        // S.on('slideRestore', this.onslidechangedCallback)
        S.on('slideRestore', this.onslidechangedCallback)
        // S.on('slideStart', this.onslidechangedCallback)
        
        // var fun = this;
        // setTimeout(function() {
            
        // fun.setState({});
        // }, 2000);
    },
    
    //滑动回调
    onslidechangedCallback(){
        // console.log(arguments);
        if(arguments[0]==2){
            gVar.pushPage('login');
        }
    },
    
    render(){
        // var w = $(document).width();
        // var height = w/2.25;
        
        return (
            <div style={{position:"absolute",width:"100%",height:"100%"}}>
                <div id="iSlider-wrapper" style={{position:"relative",height:"100%"}}></div>
            </div>
        );
    },
});

module.exports = Introduce;