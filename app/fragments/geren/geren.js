var React = require('react');
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
/*img 图片地址
 *name 项的名字
 *type 类型：0表示组的第一个，1表示中间，2表示底部
 */
require('./css/geren.css');
var gVar = require('../../main/global.js');
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
                anotherEntry : true,
            }
            gVar.pushPage({pathname:"mymessage",state:params});
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
                break;
        }
    },
    handleTouchStart: function (ele) {
        $(ele.target).addClass("item_touch_start");
    },
    handleTouchEnd: function (ele) {
        $(ele.target).removeClass("item_touch_start");
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
        var item = (<div className = {cname} onClick={this.onItemClick.bind(this, this.props.info.index) }
            onTouchStart = {
                this.handleTouchStart.bind(this)
            }onTouchEnd = {
                this.handleTouchEnd.bind(this)
            } onTouchCancel={this.handleTouchEnd.bind(this) }>
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
    
    logout:function(){
        gVar.pushPage("login");
        // console.log(global.router);
    },
    
    render: function () {
        return (<div style = {{
            overflow: "hidden",
            paddingBottom:"70px"
        }} >
            <GerenList / >
            <input type = "button" className = "btn  btn-primary geren_exit" onClick={this.logout}
                style = {{ width: "70%", marginTop: "15px", padding: "10px" }} value = "退出账号" / >
        </div>);
    }
});
module.exports = Geren;