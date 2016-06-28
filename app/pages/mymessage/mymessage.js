var React = require('react');

var warning = require('./image/warning.png');
var arrow = require('./image/arrow.png');
var idcard = require('./image/idcard.png');
var repertory = require('./image/repertory.png');
var check = require('./image/check.png');
var account = require('./image/account.png');
var Titlebar = require('../../components/titlebar/titlebar.js');
var gVar = require("../../main/global.js");

var toast = require('../../util/Tips/tips.js');

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


function getCount(count) {
    var result = "";
    if (count > 0) {
        if (count < 100) {
            result = count;
        } else {
            result = "99+"
        }
    }
    return result;
};


var MM = React.createClass({

    componentDidMount: function name(params) {
        this.init();
    },

    init: function name(params) {
        var param = {
            // app_debug: 1,
            // company_code: localStorage.getItem("company_code"),
            // user_code: localStorage.getItem('user_code')
		};
		console.log(param);
        var url = gVar.getBASE_URL() + 'Message/stat';
		gVar.sendRequest(param, url, this.initSuccess,false,this.errorCallback);
        return;
    },

    errorCallback(){
        toast("获取数据失败!");
    },

    initSuccess: function (data) {
        console.log(data);
        if (0 == data.error) {
            var arr = data.data;
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.msg_type == "ORDER_STOCK_EXCEPTION") {
                    // 订单库存异常
                    var count = getCount(item.count);
                    $('#repertory_exception').html(count);
                }
                if (item.msg_type == "ORDER_VERIFY_FAIL") {
                    // 订单审核不通过
                    var count = getCount(item.count);
                    $('#ORDER_VERIFY_FAIL').html(count);
                }
                if (item.msg_type == "ORDER_IDCARD_EXCEPTION") {
                    // 订单身份证异常
                    var count = getCount(item.count);
                    $('#ORDER_IDCARD_EXCEPTION').html(count);
                }
                if (item.msg_type == "ACCOUNT_EXCEPTION") {
                    // 账号异常
                    var count = getCount(item.count);
                    $('#ACCOUNT_EXCEPTION').html(count);
                }
                if (item.msg_type == "STOCK_WARNING") {
                    // 库存告警
                    var count = getCount(item.count);
                    $('#STOCK_WARNING').html(count);
                }
            }
        }
    },


    messageMenu: function () {
        gVar.pushPage("mymessagemenu");
    },

    onItemClick: function (index) {
        var params = {
            itemIdex: index
        };
        gVar.pushPage({ pathname: "messagedetail", state: params });
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

            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }}>
                {/**推送尚未实现,所以暂时把setting设为false */}
                <Titlebar title="我的消息" backNoneDisplay={backNoneDisplay} setting={false} />
                <div className="titlebar_head_down" >
                    <div className="mymessage_item" onClick={this.onItemClick.bind(this, 0) }
                        id={0}
                        onTouchStart = {gVar.handleTouchStart.bind(this, 0) } onTouchEnd = {gVar.handleTouchEnd.bind(this, 0) }
                        onTouchCancel={gVar.handleTouchEnd.bind(this, 0) }>
                        <img src={warning} className="mymessage_img"/>
                        <span className="mymessage_item_text">库存预警消息</span>
                        <span id="STOCK_WARNING" className="badge mymessage_badge" ></span>
                    </div>

                    <div className="mymessage_item" onClick={this.onItemClick.bind(this, 1) }
                        id={1}
                        onTouchStart = {gVar.handleTouchStart.bind(this, 1) } onTouchEnd = {gVar.handleTouchEnd.bind(this, 1) }
                        onTouchCancel={gVar.handleTouchEnd.bind(this, 1) }>
                        <img src={idcard} className="mymessage_img"/>
                        <span className="mymessage_item_text">身份证异常订单</span>
                        <span id="ORDER_IDCARD_EXCEPTION" className="badge mymessage_badge" ></span>
                    </div>
                    <div className="mymessage_item" onClick={this.onItemClick.bind(this, 2) } style={{ marginTop: "1px" }}
                        id={2}
                        onTouchStart = {gVar.handleTouchStart.bind(this, 2) } onTouchEnd = {gVar.handleTouchEnd.bind(this, 2) }
                        onTouchCancel={gVar.handleTouchEnd.bind(this, 2) }>
                        <img src={repertory} className="mymessage_img"/>
                        <span className="mymessage_item_text">库存异常订单</span>
                        <span id="repertory_exception" className="badge mymessage_badge" ></span>
                    </div>
                    <div className="mymessage_item" onClick={this.onItemClick.bind(this, 3) } style={{ marginTop: "1px" }}
                        id={3}
                        onTouchStart = {gVar.handleTouchStart.bind(this, 3) } onTouchEnd = {gVar.handleTouchEnd.bind(this, 3) }
                        onTouchCancel={gVar.handleTouchEnd.bind(this, 3) }>
                        <img src={check} className="mymessage_img"/>
                        <span className="mymessage_item_text">审核不通过订单</span>
                        <span id="ORDER_VERIFY_FAIL" className="badge mymessage_badge" ></span>
                    </div>
                    <div id="accoutException" className="mymessage_item" onClick={this.onItemClick.bind(this, 4) }
                        id={4}
                        onTouchStart = {gVar.handleTouchStart.bind(this, 4) } onTouchEnd = {gVar.handleTouchEnd.bind(this, 4) }
                        onTouchCancel={gVar.handleTouchEnd.bind(this, 4) }>
                        <img src={account} className="mymessage_img"/>
                        <span className="mymessage_item_text">账户异常</span>
                        <span id="ACCOUNT_EXCEPTION" className="badge mymessage_badge" ></span>
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