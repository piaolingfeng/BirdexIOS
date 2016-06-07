var React = require("react");
require("./css/orderlist.css");
var copy = require("./images/copy.png");
var gVar = require("../../main/global.js");
var OrderProduct = require('./orderproduct.js');
var toast = require('../../util/Tips/tips.js');
var OrderList = React.createClass({

    propTypes: {
        orderEntity: React.PropTypes.object.isRequired,//详情实体
        position: React.PropTypes.number.isRequired,//位置
        cacheOrderListFunc: React.PropTypes.func.isRequired,//回调用于缓存RequestEntity，orderList,position
    },

    copy: function (e) {
        // alert();
        e.stopPropagation();
        var text = $('#orderName').html();
        // var clipboardswfdata=new ZeroClipboard.Client();
        // clipboardswfdata.setHandCursor(true);

        // // clipboardswfdata = document.getElementById('test_text').value;
        // var text = $('#orderName').html();
        // // console.log(text);
        // clip.setText(text);
        //alert(clipboardswfdata);
    },


    changeToDetail() {
        this.props.cacheOrderListFunc(this.props.position);
        var param = { order_code: this.props.orderEntity.order_code }
        gVar.pushPage({ pathname: 'orderdetail', state: param });
    },

    componentDidMount() {
        var name = this.props.orderEntity.status_name;
        // console.log(name);
        if (name == "等待出库" || name == "准备出库" || name == "待下架"
            || name == "下架中" || name == "审核不通过"
            || name == "身份证异常") {
            // holder.tv_change_address.setVisibility(View.VISIBLE);
            // holder.tv_right_line.setVisibility(View.VISIBLE);
            this.refs.changeAddr_line.style.display = "block";
            this.refs.changeAddr.style.display = "block";
        } else {
            this.refs.changeAddr_line.style.display = "none";
            this.refs.changeAddr.style.display = "none";
        }
    },

    logisticsTracking: function (e) {
        var param = {
            order_code: this.props.orderEntity.order_code,
            Status_name: this.props.orderEntity.status_name,
            Receiver_mobile: this.props.orderEntity.receiver_mobile,
        }
        e.stopPropagation();
        gVar.pushPage({ pathname: "logistics", state: param });
    },

    contactCustomer: function (e) {
        e.stopPropagation();
        toast("敬请期待");
    },

    changeAddr: function (e) {
        var param = { order_code: this.props.orderEntity.order_code }
        // console.log(e+"ddd");
        e.stopPropagation();
        gVar.pushPage({ pathname: "changeaddress", state: param });
    },

    //按钮
    btnhandleTouchStart(id) {
        $("#" + id + this.props.position).css("background-color", gVar.Color_touch);
    },

    btnhandleTouchEnd(id) {
        $("#" + id + this.props.position).css("background-color", "#FAFAFA");
    },

    render: function () {
        // console.log(this.props.orderEntity);
        var productList = [];
        var product = this.props.orderEntity.products;
        for (var i = 0; i < product.length; i++) {
            productList.push(<OrderProduct productEntity={product[i]}/>)
        };
        // for(var i=0; i <3;i++){
        //     product.push(<OrderProduct />);
        // }
        var orderEntity = this.props.orderEntity;
        var orderErrorDisplay = "none";
        if (orderEntity.verify_fail_detail != null && orderEntity.verify_fail_detail != '') {
            orderErrorDisplay = 'block';
        }
        return (
            <div style={{ backgroundColor: gVar.Color_white, marginTop: "10px" }} onClick={this.changeToDetail}>
                <div className="orderlist_head">
                    <div  onClick={this.copy} style={{ float: "left" }}>
                        <span id="orderName" style={{ color: gVar.Color_title, fontSize: "13px" }}>{orderEntity.order_oms_no}</span>
                        <img className="orderlist_img" src={copy}></img>
                    </div>
                    <div style={{ float: "right", color: gVar.Color_title, fontSize: "13px" }}>{orderEntity.created_time}</div>
                    <div className="orderlist_statu" style={{ fontSize: "13px" }}>{orderEntity.status_name}</div>
                </div>
                <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>

                {productList}

                <div className="orderlist_head orderlist_error" style={{ display: orderErrorDisplay }}>{orderEntity.verify_fail_detail}</div>
                <div className="flexbox-container" style={{ backgroundColor: "#FAFAFA" }}>
                    <span id={"logisticsTracking"+this.props.position} className="orderlist_btn" onClick={this.logisticsTracking}
                        onTouchStart = {this.btnhandleTouchStart.bind(this, "logisticsTracking") } onTouchEnd = {this.btnhandleTouchEnd.bind(this, "logisticsTracking") }
                        onTouchCancel={this.btnhandleTouchEnd.bind(this, "logisticsTracking") }>物流跟踪</span>
                    <span className="orderlist_line"></span>
                    <span id={"contactCustomer"+this.props.position} className="orderlist_btn" onClick={this.contactCustomer}
                        onTouchStart = {this.btnhandleTouchStart.bind(this, "contactCustomer") } onTouchEnd = {this.btnhandleTouchEnd.bind(this, "contactCustomer") }
                        onTouchCancel={this.btnhandleTouchEnd.bind(this, "contactCustomer") }>联系客服</span>
                    <span ref="changeAddr_line"className="orderlist_line"></span>
                    <span id = {"changeAddr"+this.props.position} ref="changeAddr" className="orderlist_btn" onClick={this.changeAddr}
                        onTouchStart = {this.btnhandleTouchStart.bind(this, "changeAddr") } onTouchEnd = {this.btnhandleTouchEnd.bind(this, "changeAddr") }
                        onTouchCancel={this.btnhandleTouchEnd.bind(this, "changeAddr") }>修改地址</span>
                    <div className="orderlist_clear"></div>
                </div>
            </div>
        );
    },
});

module.exports = OrderList;