var React = require('react');
var ReactDOM = require('react-dom');
var EventBus = require('eventbusjs');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

require('./css/main.css');

/*全局变量*/
global.app = {
    xxx: "dddd"
};

// var LoginWindow = require('../pages/birdlogin/login.js');
var LoginWindow = require('../pages/todayData/todayData.js');
/*代表整个应用的组件*/    
var App = React.createClass({

    //自定义的成员变量, 动画效果需要提供一个key
    uniqueKey: 0,
  
    getInitialState: function() {
        
        return {curPage:LoginWindow};
    },
  
    changePage: function (event, pageName) {
        
        var Page;

        if (pageName == "portal") {
            Page = require('../pages/portal/portal.js');
        }
        else if (pageName == "storage") {
            Page = require('../pages/storage/storage.js');   
        }else if(pageName == "todayData"){
            // alert("todayData");
            Page = require('../pages/todayData/todayData.js'); 
        }

        this.setState({curPage:Page});
    },
  
    componentDidMount: function () {

        EventBus.addEventListener("changePage", this.changePage, this);
    },

    render: function() {
    
        var Child = this.state.curPage;
    
        this.uniqueKey = this.uniqueKey + 1;
    
        console.log("uniquekey is " + this.uniqueKey);

        return (
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    <Child key={this.uniqueKey} />
                </ReactCSSTransitionGroup>);
    }
});


ReactDOM.render(
    <App ref = {function(theApp) {
                    global.theApp = theApp;
                }} />,

    document.getElementById('app')
);


