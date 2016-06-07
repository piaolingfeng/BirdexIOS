var React = require('react');
var ReactDOM = require('react-dom');

require('react-fastclick');

var EventBus = require('eventbusjs');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import { hashHistory, browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

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
//库存s
// var LoginWindow = require('../pages/testpopmenu/testpopmenu.js');
// var LoginWindow = require('../pages/myorders/myorders.js');
// var Inventory = require('../pages/myinventory/myinventory.js');
var ChangeAddress = require('../pages/changeadress/changeaddress.js');
var LogisticsTracking = require('../pages/logistics/logistics.js');
var MyMessage = require('../pages/mymessage/mymessage.js');
var MyMessageMenu = require('../pages/mymessagemenu/mymessagemenu.js');
var MyAccount = require('../pages/myaccount/myaccount.js');
var AccountManager = require('../pages/accountmanager/accountmanager.js');
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
// var Mine=require('../pages/mine/mine.js');
//关于页面
var About=require('../pages/about/about.js');
//上传身份证
var uploadIdcard = require('../pages/uploadidcard/uploadidcard.js');
//修改头像
var changeIcon = require('../pages/changeicon/changeicon.js');
//新功能介绍
var Introduce = require('../pages/introduce/introduce.js')
//闪屏页
var Splash = require('../pages/splash/splash.js');

/* 如果str没有以/开头, 则加上/ */
function formatPathName(str)
{
    var temp = str.substr(0, 1);
    if (temp != '/')
    {
        temp = '/' + str;
    }
    else
    {
        temp = str;
    }

    return temp;
}

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
         $("body").children().click(function () {
            $("#oAIHFEFUH").hide();
        });
    },

    render: function() {
    
        var child = React.cloneElement(this.props.children, {key:formatPathName(this.props.location.pathname)});

        return (
                <ReactCSSTransitionGroup transitionName={gVar.pageTranType} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {child}
                </ReactCSSTransitionGroup>);
    }
});

var AppWrapper = React.createClass({
    render: function () {
         return <App ref={function(theApp) {global.theApp = theApp;}} pathname={this.props.location.pathname} />;
    }
});
// <Route path="mine" component={Mine} /> 
ReactDOM.render(
    <Router ref={   
                    function(r) {
                        global.router = r;
                    }
                }
            history={hashHistory}>
             
        <Route path="/" component={App}> 
            <IndexRoute component={Splash}/> 
            <Route path="splash" component={Splash} />
            <Route path="introduce" component={Introduce} /> 
            <Route path="login" component={LoginWindow} /> 
            <Route path="portal" component={Portal} />
            <Route path="popmenu" component={TestPopMenu} />
            <Route path="todayData" component={TodayData} /> 
            <Route path="mytool" component={MyTool}/>
            <Route path="predictdetail" component={Predictdetail}/>
            <Route path="orderdetail" component={OrderDetail}/>
            <Route path="messagedetail" component={MessageDetail}/>

            <Route path="instockdetail" component={InStockDetail} /> 
            <Route path="willindetail" component={WillInDetail} /> 
            <Route path="myoutlay" component={MyOutlay} /> 
            <Route path="recharge" component={Recharge} /> 
            
            <Route path="about" component={About} /> 

            <Route path="changeaddress" component={ChangeAddress}/>
            <Route path="logistics" component={LogisticsTracking}/>
            <Route path="mymessage" component={MyMessage}/>
            <Route path="mymessagemenu" component={MyMessageMenu}/>
            <Route path="myaccount" component={MyAccount}/>
            <Route path="accountmanager" component={AccountManager}/>
            <Route path="uploadIdcard" component={uploadIdcard}/>
            <Route path="changeIcon" component={changeIcon}/>
        </Route> 
    </Router>,
    
    document.getElementById('app')
);


