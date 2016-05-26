var React = require('react');
var EventBus = require('eventbusjs');

var warning = require('./image/warning.png');
var arrow = require('./image/arrow.png');
var idcard = require('./image/idcard.png');
var repertory = require('./image/repertory.png');
var check = require('./image/check.png');
var account = require('./image/account.png');
var Titlebar = require('../../components/titlebar/titlebar.js');
var gVar = require("../../main/global.js");
require('./mymessage.css');
var minePage = [{
    img: require('./image/warning.png'),
    name: "库存预警消息",
    top: 50
}, {
        img: require('./image/idcard.png'),
        name: "身份证异常订单",
        top: 30
    }, {
        img: require("./image/repertory.png"),
        name: "库存异常订单",
        top: 1
    }, {
        img: require("./image/check.png"),
        name: "审核不通过订单",
        top: 1
    }, {
        img: require("./image/account.png"),
        name: "账户异常",
        top: 30
    }];

var MyMessageItem = React.createClass({

    onItemClick: function (index) {
        gVar.pushPage('messagedetail');
    },

    render: function () {
        return (
            <div style={{ marginTop: this.props.top, width: "100%", height: "6%", background: "#FFFFFF" }} onClick={this.onItemClick.bind(this, this.props.info.index) }>
                <img src={warning} style={{ marginLeft: 25, height: "50%" }}/>
                <span style={{ position: "absolute", fontSize: 18, color: "#666666", marginLeft: 35, height: "50%", marginTop: "3%" }}>库存预警消息</span>
                <img src={arrow} style={{ float: "right", height: "30%", marginTop: "4%", marginRight: "20" }}/>
            </div>);
    }
});


var MyMessageList = React.createClass({
    render: function () {
        var items = (<div>{
            minePage.map(function (itemInfo) {
                return <MyMessageItem info={itemInfo}/>
            })
        }</div>);

        // var items = minePage.map(function(itemInfo) {
        //     return <MyMessageItem info={itemInfo}/>
        // })
        return items;
    }
});


var GerenList = React.createClass({
    render: function () {
        var items = (<div> {
            minePage.map(function (itemInfo) {
                return <MyMessageItem info = {
                    itemInfo
                }
                    />

            })
        } </div>);
        return items;
    }
});



var MM = React.createClass({

    messageMenu: function () {

        // EventBus.dispatch("changePage", null, "mymessagemenu");

        // return;
        gVar.pushPage("mymessagemenu");
    },

    onItemClick: function (index) {
        var params={
            itemIdex : index
        };
        gVar.pushPage({pathname:"messagedetail",state:params});
    },

    render: function () {
        var antherEntry = null;
        var backNoneDisplay = true;
        var settingDispaly = false;
        if (this.props.location) {
            antherEntry = this.props.location.state.anotherEntry;
            if (antherEntry) {
                backNoneDisplay = false;
                settingDispaly = true;
            }
        }
        return (

            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background}}>
                <Titlebar title="我的消息" backNoneDisplay={backNoneDisplay} setting="true" />
                <div className="titlebar_head_down" >
                    <div className="mymessage_item" onClick={this.onItemClick.bind(this,0)}>
                        <img src={warning} className="mymessage_img"/>
                        <span className="mymessage_item_text">库存预警消息</span>
                        <span className="badge mymessage_badge" >50</span>
                    </div>

                    <div className="mymessage_item" onClick={this.onItemClick.bind(this,1)} >
                        <img src={idcard} className="mymessage_img"/>
                        <span className="mymessage_item_text">身份证异常订单</span>
                        <span className="badge mymessage_badge" >50</span>
                    </div>
                    <div className="mymessage_item" onClick={this.onItemClick.bind(this,2)} style={{ marginTop: "1px" }}>
                        <img src={repertory} className="mymessage_img"/>
                        <span className="mymessage_item_text">库存异常订单</span>
                        <span className="badge mymessage_badge" >50</span>
                    </div>
                    <div className="mymessage_item" onClick={this.onItemClick.bind(this,3)} style={{ marginTop: "1px" }}>
                        <img src={check} className="mymessage_img"/>
                        <span className="mymessage_item_text">审核不通过订单</span>
                        <span className="badge mymessage_badge" >50</span>
                    </div>
                    <div id="accoutException" className="mymessage_item" onClick={this.onItemClick.bind(this,4)} >
                        <img src={account} className="mymessage_img"/>
                        <span className="mymessage_item_text">账户异常</span>
                        <span className="badge mymessage_badge" >50</span>
                    </div>
                </div>
            </div>
            // <div style={{position:"absolute",top:0,width:"100%",height:"100%",background:"#F1F0F0"}}>
            //     <MyMessageList />
            // </div>
        );
    }
});

module.exports = MM;