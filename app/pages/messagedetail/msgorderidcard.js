var React = require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");
var copy = require("../../fragments/order/images/copy.png");
var read_Status = require("./images/read_status.png");
var MsgOrderIdCard = React.createClass({

    propTypes: {
        messageEntity: React.PropTypes.object.isRequired,
    },

    onItemClick: function (order_code) {
        var param = { order_code: order_code }
        gVar.pushPage({ pathname: 'orderdetail', state: param });
    },

    render: function () {

        var entity = this.props.messageEntity;
        console.log(entity);
        //0表示未读，1表示已读
        var read = "none";
        if (entity.read_status == "1") {
            read = 'none';
        } else {
            read = 'block';
        }


        return (
            <div className="orderdetail_head" onClick={this.onItemClick.bind(this, entity.msg_content.order_code) }>
                <div className="orderdetail_background_img">
                    <div className="messagedetail_padding">
                        <img  src={read_Status} className="orderlist_img messagedetail_read_status" style={{ display: read }}></img>
                        <span >身份证异常订单</span>
                        <span className="messagedetail_right">{entity.created_date}</span>
                    </div>
                    <hr style={{ height: "1px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                    <div className="messagedetail_padding">
                        <span >订单号: </span>
                        <span  className="messagedetail_margin_left">{entity.msg_content.order_oms_no}</span>
                    </div>

                    <table >
                        <tr className="messagedetail_padding messagedetail_top_padding" style={{ display: "-webkit-inline-box", paddingBottom: "0px" }}>
                            <td style={{ width: "21%" }}>收件地址: </td>
                            <td >{entity.msg_content.receiver_name}, {entity.msg_content.receiver_mobile},
                                {entity.msg_content.receiver_province}{entity.msg_content.receiver_city}
                                {entity.msg_content.receiver_area}{entity.msg_content.receiver_address}</td>
                        </tr>
                    </table>
                    <div className="messagedetail_padding messagedetail_top_padding">
                        <span className="messagedetail_text_dark messagedetail_text_red" style={{ lineHeight: "28px" }}>{entity.msg_content.verify_fail_detail}</span>
                        <span className="messagedetail_right orderdetail_right_blue_color" style={{ lineHeight: "28px" }}>重新上传身份证</span>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = MsgOrderIdCard;