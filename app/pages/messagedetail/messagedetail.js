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


var MsgListData = null;

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
            console.log("获取本地缓存",this.ontop);
            // this.setState({});
            if (listviewInd instanceof Object) {
                listviewInd.scrollToElement(this.position + 1);
            }
            // $("#scroller").css("transform","translate(0px,"+this.ontop+")" );
        } else {
            MsgListData = new Array();
            this.getMsgList();
        }
    },

    //获取订单所有状态
    getMsgList: function (myScroll) {
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
            start_date: timeUtil.getNearMouth(),
            end_date: timeUtil.getCurrentDateFormat(),
            msg_type: this.msg_type,
            page_no: this.page_no,
        };
        // console.log(params);
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
            }.bind(this),
            complete: function (XMLHttpRequest, textStatus) {
                //调用本次ajax请求时传递的options参数 
                if (myScroll != null) {
                    myScroll.refresh();
                }
            }.bind(this),
            timeout: 5000,
        });
    },

    dealMsgData(data) {
        // console.log(data.data);
        if (data != null) {
            Data = data;
            if (data.error == 0) {
                // dataCount = data.data.count;//赋值
                // console.log(dataCount);
                if (this.page_no > 1) {
                    // console.log(data.data);
                    if (data.data.messages.length == 0 && this.page_no > 1) {
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

    render: function () {
        if (Data == null)
            return null;
        var Count = Data.data.count;

        var list = <ListView ref={function (theApp) { listviewInd = theApp; } } getItems={this.getItem}
            marginTop={78} pullUpHandler={this.pullUpEvent} backGroud={gVar.Color_background} getCoreObject={this.getCoreObject}/>;
        if (MsgListData != null && MsgListData.length == 0) {
            list = <div style={{ width: "100%", height: "100%", textAlign: "center", fontSize: "22px", marginTop: "100px" }}>暂时没有数据哦！</div>;
        }
        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }}>
                <Titlebar save={this.title}/>
                <div className="titlebar_head_down">
                    <div style={{ display: "inline-block", width: "100%", padding: "8px", paddingBottom: "0px" }}>
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