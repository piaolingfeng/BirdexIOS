var MsgStockWarnning = require("./msgstockwarnning.js");
var MsgIdCardError = require("./msgorderidcard.js");
var MsgAccountError = require("./msgaccounterror.js");
var MsgOrderInventory = require("./msgorderinventory.js");
var MsgOrderExamine = require("./msgorderexamine.js");
var Titlebar = require('../../components/titlebar/titlebar.js');

var ListView = require('../../components/listview/listview.js');
var React = require("react");
var gVar = require("../../main/global.js");
var timeUtil = require('../../util/timeUtil.js');
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");

var toast = require('../../util/Tips/tips.js');

var itemIdex = 0;
var title = '';
var msg_type = "";
var page_no = 1;
var MsgListData = null;

var Data = null;

var MessageDetail = React.createClass({


    componentDidMount() {
        this.getMsgList();
    },

    //获取订单所有状态
    getMsgList: function () {
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
            start_date: timeUtil.getNearMouth(),
            end_date: timeUtil.getCurrentDateFormat(),
            msg_type: msg_type,
            page_no: page_no,
        };
        console.log(params);
        $.ajax({
            data: params,
            async: true,
            url: gVar.getBASE_URL() + 'Message/all',
            dataType: 'json',
            cache: true,
            success: function (data) {
                // this.setState({ data: data });: '', status_name: '全部状态' });
                // this.dealOrderStatus();
                // console.log(data);
                this.dealMsgData(data);
                // this.setState({ data: "data" });
            }.bind(this),
            error: function (xhr, status, err) {
                // console.error(this.props.url, status, err.toString());
                toast(err.toString());
            }.bind(this)
        });
    },

    dealMsgData(data) {
        // console.log(data.data);
        if (data != null) {
            Data = data;
            if (data.error == 0) {
                // dataCount = data.data.count;//赋值
                // console.log(dataCount);
                if (page_no > 1) {
                    // console.log(data.data);
                    if (data.data.messages.length == 0 && page_no > 1) {
                        // T.showShort(MyApplication.getInstans(), "已经是最后一页");
                        toast("已经是最后一页");
                    } else {
                        // OrderAdapter.getList().addAll(orderListEntities.getData().getOrders());
                        // orderListEntities.getData().setOrders(OrderAdapter.getList());
                        // for (var i = 0; i < data.data.messages.length; i++) {
                        //     MsgListData.push(<OrderList orderEntity={data.data.orders[i]}/>);
                        // }
                        MsgListData.push(this.addMsgToList(data.data.messages));
                    }
                }
                else {
                    // var list = [];
                    // console.log(gVar.createOrderEntity());
                    // orderList = data.data.orders;
                    // for (var i = 0; i < data.data.orders.length; i++) {
                    //     list.push(<OrderList orderEntity={data.data.orders[i]}/>);
                    // }
                    
                    MsgListData = this.addMsgToList(data.data.messages);//将数据给orderlist
                }
            } else {
                // console.log(data.data);
                toast(data.data);
            }
        }
        this.setState({ data: "" });
    },

    addMsgToList(messages) {
        var list = [];
        var MSG = MsgStockWarnning;
        itemIdex = this.props.location.state.itemIdex;
        switch (itemIdex) {
            case 0:
            MSG = MsgStockWarnning;
                title = "库存预警消息"
                break;
            case 1:
            MSG = MsgIdCardError;
                title = "身份证异常订单"
                break;
            case 2:
            MSG = MsgOrderInventory;
                title = "库存异常订单"
                break;
            case 3:
            MSG = MsgOrderExamine;
                title = "审核不通过订单"
                break;
            case 4:
            MSG = MsgAccountError;
                title = "账户异常"
                break;
        }
        for (var i = 0; i < messages.length; i++) {
            list.push(<MSG messageEntity={messages[i]}/>);
        }
        return list;
    },

    getInitialState() {
        title = '';
        msg_type = "";
        page_no = 1;
        MsgListData = new Array();
        itemIdex = this.props.location.state.itemIdex;
        switch (itemIdex) {
            case 0:
                title = "库存预警消息"
                msg_type = "STOCK_WARNING";
                break;
            case 1:
                title = "身份证异常订单"
                msg_type = "ORDER_IDCARD_EXCEPTION";
                break;
            case 2:
                title = "库存异常订单"
                msg_type = "ORDER_STOCK_EXCEPTION";
                break;
            case 3:
                title = "审核不通过订单"
                msg_type = "ORDER_VERIFY_FAIL";
                break;
            case 4:
                title = "账户异常"
                msg_type = "ACCOUNT_EXCEPTION";
                break;
        }
        return null;
    },

    getItem() {
        return MsgListData;
    },

    //上拉加载
    pullUpEvent() {
        page_no++;
        this.getMsgList();
    },

    render: function () {
        if (Data == null)
            return null;
        var Count = Data.data.count;
        
        var list = <ListView getItems={this.getItem} marginTop={78} pullUpHandler={this.pullUpEvent} backGroud={gVar.Color_background}/>;
        if(MsgListData!=null && MsgListData.length==0){
            list = <div style={{width:"100%",height:"100%",textAlign:"center",fontSize:"22px",marginTop:"100px"}}>暂时没有数据哦！</div>;
        }
        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }}>
                <Titlebar save={title}/>
                <div className="titlebar_head_down">
                    <div style={{ display: "inline-block", width: "100%", padding: "8px" ,paddingBottom:"0px"}}>
                        <span style={{ float: "left", fontSize: "16px", verticalAlign: "middle" }}>显示30天内的消息记录</span>
                        <span className="messagedetail_count">共{Count}个数据</span>
                    </div>
                    {list}
                </div>
            </div>
        );
    }
});

module.exports = MessageDetail;