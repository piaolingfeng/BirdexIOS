var React = require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");
var copy = require("../../fragments/order/images/copy.png");
var read_Status = require("./images/read_status.png");

var MsgAccountError = React.createClass({

    propTypes: {
        messageEntity: React.PropTypes.object.isRequired,
        callback: React.PropTypes.func,
        position: React.PropTypes.number,
    },

    recharge: function () {
        // alert("recharge");
        this.props.callback(this.props.position);
        var param = { titleIndex: 4 };
        gVar.pushPage({ pathname: "mytool", state: param });
    },

    render: function () {
        var entity = this.props.messageEntity;
        // console.log(entity);
        var read = "none";
        if (entity.read_status == "1") {
            read = 'none';
        } else {
            read = 'block';
        }
        return (
            <div className="orderdetail_head">
                <div className="orderdetail_background_img">
                    <div className="messagedetail_padding">
                        <img src={read_Status} className="orderlist_img messagedetail_read_status" style={{ display: read }}></img>
                        <span >账户异常</span>
                        <span  className="messagedetail_right">{entity.created_date}</span>
                    </div>
                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>

                    <div className="messagedetail_padding ">
                        <span className="messagedetail_text_dark">亲爱的: {entity.msg_content.company_name}, 截止到目前为止, 您有
                            {entity.msg_content.order_count}笔订单出库, 将产生{entity.msg_content.cost}元运费, 您的账户余额为
                            {entity.msg_content.wallet}
                            , 可能造成部分订单无法正常扣取费用, 为避免影响订单配送时效, 请尽快充值!</span>
                    </div>
                    <div style={{ display: "inline-block", width: "100%" }}>
                        <button onClick={this.recharge} type="button" className="accounterror_btn" >马上充值</button>
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = MsgAccountError;