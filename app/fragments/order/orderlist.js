var React = require("react");
require("./css/orderlist.css");
var copy = require("./images/copy.png");
var gVar = require("../../main/global.js");
var OrderProduct = require('./orderproduct.js');

var OrderList = React.createClass({

    propTypes: {
        orderEntity: React.PropTypes.object.isRequired,
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
        e.stopPropagation();
        gVar.pushPage({ pathname: "logistics", state: "" });
    },

    contactCustomer: function (e) {
        e.stopPropagation();

    },

    changeAddr: function (e) {
        // console.log(e+"ddd");
        e.stopPropagation();
        gVar.pushPage({ pathname: "changeaddress", state: "" });
    },



    render: function () {
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
        if(orderEntity.verify_fail_detail != null && orderEntity.verify_fail_detail != ''){
            orderErrorDisplay = 'block';
        }
        return (
            <div style={{ backgroundColor: gVar.Color_white, marginTop: "10px" }} onClick={this.changeToDetail}>
                <div className="orderlist_head">
                    <div ref="copy"  onClick={this.copy} style={{ float: "left" }}>
                        <span id="orderName" style={{ color: gVar.Color_title }}>{orderEntity.order_oms_no}</span>
                        <img className="orderlist_img" src={copy}></img>
                    </div>
                    <div ref="time" style={{ float: "right", color: gVar.Color_title }}>{orderEntity.created_time}</div>
                    <div ref="status" className="orderlist_statu">{orderEntity.status_name}</div>
                </div>
                <hr style={{ height: "1px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>

                {productList}

                <div ref="orderError" className="orderlist_head orderlist_error" style={{display:orderErrorDisplay}}>{orderEntity.verify_fail_detail}</div>
                <div className="flexbox-container" style={{ backgroundColor: "#FAFAFA" }}>
                    <span ref="logisticsTracking" className="orderlist_btn" >物流跟踪</span>
                    <span className="orderlist_line"></span>
                    <span ref="contactCustomer " className="orderlist_btn" >联系客服</span>
                    <span ref="changeAddr_line"className="orderlist_line"></span>
                    <span ref="changeAddr" className="orderlist_btn" >修改地址</span>
                    <div className="orderlist_clear"></div>
                </div>
            </div>
        );
    },
});

module.exports = OrderList;