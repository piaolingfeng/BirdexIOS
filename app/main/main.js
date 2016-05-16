var React = require('react');
var ReactDOM = require('react-dom');

require('react-fastclick');

var EventBus = require('eventbusjs');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

require('./css/main.css');

var gVar = require("./global.js");

var LoginWindow = require('../pages/birdlogin/login.js');
var Portal = require('../pages/portal/portal.js');
var TestPopMenu = require('../pages/testpopmenu/testpopmenu.js');
//库存
// var inventory=require('../pages/inventory/inventory.js');
// var LoginWindow = require('../pages/myorders/myorders.js');
// var LoginWindow = require('../fragments/inventory/inventory.js');
// var LoginWindow = require('../fragments/geren/geren.js');
// var LoginWindow = require('../pages/storage/storage.js');
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
        }

        console.log("App changePage");

        this.setState({curPage:Page});
    },
  
    componentDidMount: function () {

        EventBus.addEventListener("changePage", this.changePage, this);
    },

    render: function() {
    
        var child = React.cloneElement(this.props.children, {key:this.props.location.pathname});

        return (
                <ReactCSSTransitionGroup transitionName={gVar.pageTranType} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {child}
                </ReactCSSTransitionGroup>);
    }
});

var AppWrapper = React.createClass({
    render: function () {
         return <App ref={function(theApp) {global.theApp = theApp;}} pathname={this.props.location.pathname} />;
    }
});

ReactDOM.render(
    <Router ref={   
                    function(r) {
                        global.router = r;
                        global.router.history.listenBefore(location => {
                            if (location.action == "PUSH")
                                gVar.pageTranType = "pagepush";
                            else if (location.action == "POP")
                                gVar.pageTranType = "pagepop";
                            else
                                gVar.pageTranType = "PUSH";
                        });
                    }
                }
            history={browserHistory}>
             
        <Route path="/" component={App}> 
            <IndexRoute component={LoginWindow}/> 
            <Route path="login" component={LoginWindow} /> 
            <Route path="portal" component={Portal} />
            <Route path="popmenu" component={TestPopMenu} />
        </Route> 
    </Router>,
    
    document.getElementById('app')
);


