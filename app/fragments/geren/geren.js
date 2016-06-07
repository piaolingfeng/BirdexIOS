var React = require('react');
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
/*img 图片地址
 *name 项的名字
 *type 类型：0表示组的第一个，1表示中间，2表示底部
 */
require('./css/geren.css');
var gVar = require('../../main/global.js');
var toast = require('../../util/Tips/tips.js');
var EventBus = require('eventbusjs');

var minePage = [{
    img: require('./image/myaccount.png'),
    name: "我的账户",
    type: 0,
    index: 0
}, {
        img: require('./image/message.png'),
        name: "我的消息",
        type: 2,
        index: 1
    }, {
        img: require("./image/managaccount.png"),
        name: "账号管理",
        type: 0,
        index: 2
    }, {
        img: require("./image/mydata.png"),
        name: "我的数据",
        type: 2,
        index: 3
    }, {
        img: require("./image/about.png"),
        name: "关于",
        type: 0,
        index: 4
    }, {
        img: require("./image/check.png"),
        name: "检查更新",
        type: 2,
        index: 5
    }];

var GerenItem = React.createClass({
    onItemClick: function (index, ele) {
        switch (index) {
            case 0:
                gVar.pushPage("myaccount");
                break;
            case 1:
                var params = {
                    anotherEntry: true,
                }
                gVar.pushPage({ pathname: "mymessage", state: params });
                break;
            case 2:
                gVar.pushPage("accountmanager");
                break;
            case 3:
                gVar.pushPage("todayData");
                break;
            case 4:
                gVar.pushPage("about");
                break;
            case 5://检查更新
                // gVar.pushPage("");
                // this.checkForUpdate();
                break;
        }
    },

    checkForUpdate() {
        var url = "http://app.birdex.cn/sanfangcang.html";
        gVar.sendRequest("", url, this.dealUpdate);
    },

    dealUpdate(data) {
        console.log(data);
    },

    render: function () {
        var cname;
        if (this.props.info.type == 0) {
            cname = "gerenitem_top";
        } else if (this.props.info.type == 1) {
            cname = "gerenitem_middle";
        } else {
            cname = "gerenitem_bottom";
        }
        var position = this.props.info.index;
        var item = (<div className = {cname} onClick={this.onItemClick.bind(this, position) }
            id={position}
            onTouchStart = {gVar.handleTouchStart.bind(this, position) } onTouchEnd = {gVar.handleTouchEnd.bind(this, position) }
            onTouchCancel={gVar.handleTouchEnd.bind(this, position) } >
            <img className = "img-rounded"
                style = {{
                    width: "30px",
                    height: "30px"
                }}
                src = {this.props.info.img}/>
            <lable className="geren_item_text">{this.props.info.name}</lable >
        </div>);
        return item;
    }
});

var GerenList = React.createClass({
    render: function () {
        var items = (<div > {
            minePage.map(function (itemInfo) {
                return <GerenItem info = {itemInfo} />
            })
        } </div>);
        return items;
    }
});

var Geren = React.createClass({
    componentDidMount: function () { },

    logout: function () {
        localStorage.removeItem("company_code");
        localStorage.removeItem('company_name');
        localStorage.removeItem('company_short_name');
        localStorage.removeItem('user_code');
        localStorage.removeItem('log_password');
        EventBus.dispatch("logout");//发布事件到portal里面去更新里面的index位置值
        gVar.pushPage("login");
        // console.log(global.router);
    },

    render: function () {
        return (<div style = {{
            overflow: "hidden",
            paddingBottom: "70px"
        }} >
            <GerenList / >
            
            <div style={{ margin: "20px 50px 0" }}>
                <button id="logout" onClick={this.logout} type="button" className="btn btn-default btn-block" style={{ color: "#039FFF", borderColor: gVar.Color_blue_head }}
							onTouchStart = {gVar.btnhandleTouchStart.bind(this, "logout") } onTouchEnd = {gVar.btnhandleTouchEnd.bind(this, "logout") }
							onTouchCancel={gVar.btnhandleTouchEnd.bind(this, "logout") }>
							退出账号
						</button>
					</div>
         </div>);
    }
});
module.exports = Geren;