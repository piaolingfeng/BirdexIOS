var MsgStockWarnning = require("./msgstockwarnning.js");
var MsgIdCardError = require("./msgorderidcard.js");
var MsgAccountError = require("./msgaccounterror.js");
var MsgOrderInventory = require("./msgorderinventory.js");
var MsgOrderExamine = require("./msgorderexamine.js");
var Titlebar = require('../../components/titlebar/titlebar.js');

var ListView = require('../../components/listview/listviewindex.js');
var React = require("react");
var gVar = require("../../main/global.js");
var timeUtil = require('../../util/timeUtil.js');
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");

var toast = require('../../util/Tips/tips.js');


var MsgListData = new Array();

var Data = null;
var listviewInd = null;
var MessageDetail = React.createClass({

    title: "",
    msg_type: "",
    page_no: 1,
    itemIdex: 0,
    position: 0,//恢复数据时可以使用
    myScroll: null,
    // ontop:0,

    componentDidMount() {

        if (sessionStorage.getItem("msg_page_no")) {
            this.page_no = sessionStorage.getItem("msg_page_no");
            this.position = parseInt(sessionStorage.getItem("msg_position"));
            // this.ontop = (sessionStorage.getItem("msg_oTop"));
            sessionStorage.removeItem("msg_page_no");
            sessionStorage.removeItem("msg_position");
            console.log("获取本地缓存");
            // this.setState({});
            if (listviewInd instanceof Object) {
                listviewInd.scrollToElement(this.position + 1);
            }
            // $("#scroller").css("transform","translate(0px,"+this.ontop+")" );
        } else {
            // console.log("dddd");
            MsgListData = new Array();
            this.getMsgList();
        }
    },

    //获取消息列表
    getMsgList: function (myScroll) {
        var params = {
            start_date: timeUtil.getNearWeek(),
            end_date: timeUtil.getCurrentDateFormat(),
            msg_type: this.msg_type,
            page_no: this.page_no,
        };
        // console.log(params);
        var url = gVar.getBASE_URL() + 'Message/all';
        gVar.sendRequest(params, url, this.dealMsgData);
    },

    dealMsgData(data) {
        Data = data;
        if (this.page_no > 1) {
            // console.log(data.data);
            if (data.data.messages.length == 0 && this.page_no > 1) {
                // T.showShort(MyApplication.getInstans(), "已经是最后一页");
                toast("已经是最后一页");
            } else {
                MsgListData.push(this.addMsgToList(data.data.messages));
            }
        }
        else {
            MsgListData = this.addMsgToList(data.data.messages);//将数据给orderlist
        }
        this.setState({});
    },

    addMsgToList(messages) {
        var list = [];
        var MSG = MsgStockWarnning;
        this.itemIdex = this.props.location.state.itemIdex;
        switch (this.itemIdex) {
            case 0:
                MSG = MsgStockWarnning;
                this.title = "库存预警消息"
                break;
            case 1:
                MSG = MsgIdCardError;
                this.title = "身份证异常订单"
                break;
            case 2:
                MSG = MsgOrderInventory;
                this.title = "库存异常订单"
                break;
            case 3:
                MSG = MsgOrderExamine;
                this.title = "审核不通过订单"
                break;
            case 4:
                MSG = MsgAccountError;
                this.title = "账户异常"
                break;
        }
        for (var i = 0; i < messages.length; i++) {
            list.push(<MSG messageEntity={messages[i]} callback={this.onClickCallback} position={MsgListData.length + i}/>);
        }
        return list;
    },

    //listitem点击后地回调方法,缓存信息
    onClickCallback(position) {
        // title，msg_type，itemIdex不用缓存
        // page_no,position缓存，MsgListData默认就是全局变量
        // var oTop=$("#scroller").position().top;
        // sessionStorage.setItem("msg_oTop", oTop);
        // console.log(oTop)
        sessionStorage.setItem("msg_page_no", this.page_no);
        sessionStorage.setItem("msg_position", position);
    },

    getInitialState() {
        // console.log(this.title,this.msg_type,this.page_no,this.itemIdex,this.position,this.myScroll);
        this.itemIdex = this.props.location.state.itemIdex;
        switch (this.itemIdex) {
            case 0:
                this.title = "库存预警消息"
                this.msg_type = "STOCK_WARNING";
                break;
            case 1:
                this.title = "身份证异常订单"
                this.msg_type = "ORDER_IDCARD_EXCEPTION";
                break;
            case 2:
                this.title = "库存异常订单"
                this.msg_type = "ORDER_STOCK_EXCEPTION";
                break;
            case 3:
                this.title = "审核不通过订单"
                this.msg_type = "ORDER_VERIFY_FAIL";
                break;
            case 4:
                this.title = "账户异常"
                this.msg_type = "ACCOUNT_EXCEPTION";
                break;
        }
        return null;
    },

    getItem() {
        // console.log(MsgListData);
        return MsgListData;
    },

    componentDidUpdate() {
        if (this.myScroll instanceof Object) {
            // console.log(this.params.myScroll, "scroll");
            // this.params.myScroll.refresh();
            this.myScroll.refresh();
        }
    },
    //上拉加载
    pullUpEvent(myScroll) {
        this.page_no++;
        this.getMsgList(myScroll);
    },

    getCoreObject(myScroll) {
        this.myScroll = myScroll;
    },

    //clear清空消息
    clear(){
        var params = {
            msg_type: this.msg_type,
        };
        var url = gVar.getBASE_URL() + 'Message/clear';
        gVar.sendRequest(params, url, this.dealClearMsg,true,this.errorCallBack);
    },

    //清空消息处理
    dealClearMsg(data){
        MsgListData = []
        this.setState({});
    },
    
    errorCallBack(data){
        toast('清空消息失败，请稍后重试!');
    },
    
    render: function () {
        var Count = 0;
        if (Data != null){
            Count = Data.data.count;
        }
        //<span className="messagedetail_count">共{Count}个数据</span>
        var list = <ListView ref={function (theApp) { listviewInd = theApp; } } getItems={this.getItem}
            marginTop={105} pullUpHandler={this.pullUpEvent} backGroud={gVar.Color_background} getCoreObject={this.getCoreObject}/>;
        if (MsgListData != null && MsgListData.length == 0) {
            list = <div style={{ width: "100%", height: "100%", textAlign: "center", fontSize: "22px", marginTop: "100px" }}>暂时没有数据哦！</div>;
        }
        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }}>
                <Titlebar save={this.title}/>
                <div className="titlebar_head_down">
                    <div style={{ display: "inline-block", width: "100%", padding: "8px"}}>
                        <span style={{ float: "left", fontSize: "16px", verticalAlign: "middle",lineHeight:"28px" }}>显示7天内的消息记录</span>
                         <button id="clear" onClick={this.clear} type="button" className="accounterror_btn"
                            onTouchStart = {gVar.btnhandleTouchStart.bind(this, "clear") } onTouchEnd = {gVar.btnhandleTouchEnd.bind(this, "clear") }
                            onTouchCancel={gVar.btnhandleTouchEnd.bind(this, "clear") }>清空消息</button>
                            </div>
                    {list}
                </div>
            </div>
        );
    }
});

module.exports = MessageDetail;