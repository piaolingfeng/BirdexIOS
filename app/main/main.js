var React = require('react');
var ReactDOM = require('react-dom');

require('react-fastclick');

var EventBus = require('eventbusjs');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

require('./css/main.css');

var gVar = require("./global.js");

// var LoginWindow = require('../pages/birdlogin/login.js');
var TodayData = require('../pages/todayData/todayData.js');
var MessageDetail = require('../pages/messagedetail/messagedetail.js');
var OrderDetail = require('../pages/orderdetail/orderdetail.js');
var Predictdetail = require('../pages/predictdetail/predictdetail.js');
var MyTool = require('../pages/mytool/mytool.js');

var LoginWindow = require('../pages/birdlogin/login.js');
var Portal = require('../pages/portal/portal.js');
var TestPopMenu = require('../pages/testpopmenu/testpopmenu.js');
//库存
// var LoginWindow = require('../pages/testpopmenu/testpopmenu.js');
// var LoginWindow = require('../pages/myorders/myorders.js');
var Inventory = require('../pages/myinventory/myinventory.js');
// var LoginWindow = require('../fragments/geren/geren.js');
// var LoginWindow = require('../pages/storage/storage.js');
//库存详情
var InStockDetail=require('../pages/instockdetail/instockdetail.js');
//待入库详情
var WillInDetail=require('../pages/willindetail/willindetail.js');
//我的支出
var MyOutlay=require('../fragments/myoutlay/myoutlay.js');
//账户充值
var Recharge=require('../pages/recharge/recharge.js');
//我的页面
var Mine=require('../pages/mine/mine.js');
//关于页面
var About=require('../pages/about/about.js');
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
            <Route path="todayData" component={TodayData} /> 
            <Route path="mytool" component={MyTool}/>
            <Route path="predictdetail" component={Predictdetail}/>
            <Route path="orderdetail" component={OrderDetail}/>
            <Route path="messagedetail" component={MessageDetail}/>
            <Route path="inventory" component={Inventory} /> 
            <Route path="instockdetail" component={InStockDetail} /> 
            <Route path="willindetail" component={WillInDetail} /> 
            <Route path="myoutlay" component={MyOutlay} /> 
            <Route path="recharge" component={Recharge} /> 
            <Route path="mine" component={Mine} /> 
            <Route path="about" component={About} /> 
        </Route> 
    </Router>,
    
    document.getElementById('app')
);


