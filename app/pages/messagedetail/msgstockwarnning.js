var React = require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");
var copy = require("../../fragments/order/images/copy.png");
var read_Status = require("./images/read_status.png");
var toast = require('../../util/Tips/tips.js');


var MsgStockWarnning = React.createClass({

    propTypes: {
        messageEntity: React.PropTypes.object.isRequired,
    },

    copy:function(external_no){
        // alert("dd");
        // console.log(toast);
        toast("已复制");
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
// toast("已复制","2000");
        return (
            <div className="orderdetail_head">
                <div className="orderdetail_background_img">
                    <div className="messagedetail_padding">
                        <img src={read_Status} className="orderlist_img messagedetail_read_status"style={{ display: read }} ></img>
                        <span >库存预警消息</span>
                        <span className="messagedetail_right">{entity.created_date}</span>
                    </div>
                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                    <div onClick={this.copy.bind(this,entity.msg_content.external_no)}>
                        <span className="messagedetail_text_dark">商品编码: </span>
                        <span className="messagedetail_text_dark messagedetail_margin_left">{entity.msg_content.external_no}</span>
                        <img  src={copy} className="messagedetail_right orderlist_img" style={{lineHeight:"28px",marginTop:"3px"}}></img>
                    </div>

                    <div >
                        <span  className="messagedetail_text_dark">{entity.msg_content.name}</span>
                    </div>
                    <div >
                        <span className="messagedetail_text_red">可用库存为: </span>
                        <span className="messagedetail_text_dark messagedetail_text_red messagedetail_margin_left">{entity.msg_content.stock}</span>
                    </div>
                    <div  style={{ fontSize: "11px" }}>*为便面订单异常, 请赶紧前往电脑端补充库存吧!</div>
                </div>

            </div>
        );
    }
});

module.exports = MsgStockWarnning;