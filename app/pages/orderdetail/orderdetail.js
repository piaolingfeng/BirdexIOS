var React = require("react");
require("../../fragments/order/css/orderlist.css");
require("./css/orderdetail.css")
// var EventBus = require('eventbusjs');
var gVar = require("../../main/global.js");
var phone = require("./images/phone.png");
var right = require("./images/right.png");
var error = require("./images/error.png");
var OrderDetailProduct = require("./orderdetailproduct.js");
var TitleBar = require('../../components/titlebar/titlebar.js');
var toast = require('../../util/Tips/tips.js');
// var Data = null;
var ListView = require('../../components/listview/listviewindex.js');
// var phoneCall = require('../../util/PhoneCall.js');
var CallIOS = require('../../util/CallIOS.js');
// var shouldUpdate = false;
var OrderDetail = React.createClass({
    myScroll: null,
    Data: null,
    shouldUpdate: true,
    idCheck: function () {
        // alert("idCheck");
        this.shouldUpdate = false;//不给刷新界面
        this.cacheOrderListFunc();//缓存
        var params = { order_code: this.Data.data.order_code }
        gVar.pushPage({ pathname: "uploadIdcard", state: params });
    },

    phoneCall: function () {
        // alert("phoneCall");
        //调用原生界面拨打电话
        CallIOS.phoneCall(this.Data.data.receiver_mobile);
    },

    changeAddr: function () {
        // console.log(global.router);
        this.shouldUpdate = false;//不给刷新界面
        this.cacheOrderListFunc();//缓存
        var params = { order_code: this.Data.data.order_code }
        gVar.pushPage({ pathname: "changeaddress", state: params });
    },

    setAddr(e, params) {
        $("#address").html(params);
    },

    componentDidMount: function () {
        if (!EventBus.hasEventListener("changeAddr"))//没有注册就注册
            EventBus.addEventListener("changeAddr", this.setAddr, this);
        // shouldUpdate = false;//初始化为false,取完网络数据后在shouldupdata方法里面设置为true
        if (sessionStorage.getItem("OrderDetailData")) {
            this.Data = JSON.parse(sessionStorage.getItem("OrderDetailData"));
            sessionStorage.removeItem("OrderDetailData");
            // console.log("1111");
            this.setState({});
        } else {
            this.getOrderDetail();
        }
    },

    // 缓存RequestEntity，orderList,position
    cacheOrderListFunc() {
        sessionStorage.setItem("OrderDetailData", JSON.stringify(this.Data));
        // sessionStorage.setItem("OrderPostion", position);
    },

    //获取订单详情
    getOrderDetail: function () {
        var params = {
            order_code: this.props.location.state.order_code,
        };
        var url = gVar.getBASE_URL() + 'Order/get';
        gVar.sendRequest(params, url, this.dealOrderDetail);

    },
    //处理详情列表
    dealOrderDetail(data) {
        this.Data = data;
        this.setState({});
    },

    //返回时的回调
    backCallBack() {
        // EventBus.dispatch("clearCacheOrderList");//清除页面详情
        EventBus.removeEventListener("changeAddr", this.setAddr, this);
        this.shouldUpdate = false;
    },

    componentDidUpdate() {
        if (!this.Data || !this.Data.data)
            return null;
        var detailData = this.Data.data;
        var func = this;
        if (detailData.verify_id_card_result == '30') {//30表示验证不通过
            $('#checkImg').attr("src", error);
            $('#idNumCheck').html('身份证异常');
            $('#idNumCheck').css({ color: "red" })
            $('#idCheck').click(function () {
                func.idCheck();
            });
        } else {
            if (detailData.verify_id_card_result == '20') {//20表示身份证验证
                // console.log(detailData.verify_id_card_result);
                $('#idNumCheck').css({ color: "#13A7DF" });
                //    $('#idCheck').attr('onClick',this.idCheck);
                $('#checkImg').attr("src", right);
            } else {
                $('#idNumCheck').html("待验证");
                $('#idNumCheck').css({ color: "#13A7DF" });
                $('#checkImg').css({ display: "none" });
                //  $('#idCheck').attr('onClick',this.idCheck);
                //  $("#idCheck").click(function(){
                //     alert("idcheck");
                // });
                // $('#idCheck').removeAttr("onClick");
            }
        }
        if (detailData.status_name == "等待出库" || detailData.status_name == "准备出库" ||
            detailData.status_name == "待下架" || detailData.status_name == "下架中" || detailData.status_name == "审核不通过"
            || detailData.status_name == "身份证异常") {
            // console.log("changeaddr");
            $('#changeAddr').click(function () {
                func.changeAddr();
            });
        } else {
            $("#changeAddr").css("color","#9b9b9b");
            toast("当前状态不能修改地址哦!");
        }
        if (this.myScroll != null)
            this.myScroll.refresh();
    },

    shouldComponentUpdate() {//出发setState之后才会调用，也就是网络请求后
        // if (shouldUpdate == false) {
        //     // shouldUpdate = true;
        //     return true;
        // }
        // return false;
        return this.shouldUpdate;
    },

    getItem() {
        var list = [];
        if (this.Data != null && this.Data.data != null) {

            var detailData = this.Data.data;
            var detailHead =
                <div className="titlebar_head_down orderdetail_head" style={{ paddingTop: gVar.Padding_titlebar }}>
                    <div className="orderdetail_background_img">
                        <table style={{ width: "100%" }}>
                            <tr>
                                <td className="orderdetail_left">订单号: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span >{detailData.order_no}</span>
                                            <span  className="orderdetail_status">{detailData.status_name}</span>
                                        </div>
                                        <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">客户单号: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span >{detailData.order_oms_no}</span>
                                        </div>
                                        <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">发货仓库: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span >{detailData.warehouse_name}</span>
                                            <span  className="orderdetail_status">{detailData.service_type_name}</span>
                                        </div>
                                        <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">备 注: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span >{detailData.remark}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className="orderdetail_background_img">
                        <table style={{ width: "100%" }}>
                            <tr>
                                <td className="orderdetail_left">重 量: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span >{detailData.weight}KG</span>
                                        </div>
                                        <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">费 用: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span >¥{detailData.price}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>;

            list.push(detailHead);
            if (detailData.products != null) {
                for (var i = 0; i < detailData.products.length; i++) {
                    list.push(<OrderDetailProduct product = {detailData.products[i]}/>);
                };
            }
            var detailLast =
                <div className="orderdetail_head">
                    <div className="orderdetail_background_img">
                        <table style={{ width: "100%" }}>
                            <tr>
                                <td className="orderdetail_left">收件人: </td>
                                <td className="orderdetail_right">
                                    <div >
                                        <div onClick={this.phoneCall} className="orderdetail_right_div_padding" style={{ float: "left" }}>
                                            <span >{detailData.receiver_name}</span>
                                            <span  className="orderdetail_marginleft_id">{detailData.receiver_mobile}</span>
                                            <img src={phone} className="orderdetail_img orderdetail_marginleft_id"/>
                                        </div>
                                        <span id="changeAddr" className="orderdetail_status orderdetail_right_blue_color orderdetail_right_div_padding">修改地址</span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left"></td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div id = "address" className="orderdetail_address">{detailData.receiver_province +
                                            detailData.receiver_city + detailData.receiver_area + detailData.receiver_address}</div>
                                        <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">身份证号: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span >{detailData.receiver_id_card}</span>
                                            <div id="idCheck" className="orderdetail_status">
                                                <img id="checkImg" src={right} className="orderdetail_img"/>
                                                <span id="idNumCheck" className="orderdetail_status orderdetail_right_blue_color orderdetail_marginleft_id">身份证验证</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            list.push(detailLast);
        }
        return list;
    },

    getCoreObject(myScroll) {
        //  console.log(myScroll);
        this.myScroll = myScroll;
    },

    render: function () {

        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }} >
                <TitleBar  save="订单详情" backCallBack={this.backCallBack}/>

                <ListView  getItems={this.getItem} marginTop={0} pullUpHandler={this.pullUpEvent}
                    showUpload={false} showDownload={false}
                    backGroud={gVar.Color_background} getCoreObject={this.getCoreObject}/>

            </div>
        );
    }
});

module.exports = OrderDetail;