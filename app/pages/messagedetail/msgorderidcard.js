var React= require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");
var copy = require("../../fragments/order/images/copy.png");
var read_Status = require("./images/read_status.png");
var MsgOrderIdCard = React.createClass({
    render:function(){
        return(
            <div className="orderdetail_head">
                <div className="orderdetail_background_img">
                    <div className="messagedetail_padding">
                        <img ref="readStatus" src={read_Status} className="orderlist_img messagedetail_read_status" ></img>
                        <span >身份证异常订单</span>
                        <span ref="creatTime" className="messagedetail_right">2014-04-22 23:00</span>
                    </div>
                    <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                     <div className="messagedetail_padding">
                        <span >订单号:</span>
                        <span ref="orderCode" className="messagedetail_margin_left">BH1231123213</span>
                    </div>
                    
                    <table >
                     <tr className="messagedetail_padding messagedetail_top_padding" style={{display:"-webkit-inline-box"}}>
                        <td style={{width:"21%"}}>收件地址:</td>
                        <td ref="address">谢世同,189234353534,广东省深圳市南山区科技中三路国人大厦</td>
                    </tr>
                    </table>
                    <div className="messagedetail_padding messagedetail_top_padding">
                        <span ref="error" className="messagedetail_text_dark messagedetail_text_red" >预报缺少身份证，不能合箱</span>
                        <span ref="reSendIdCard" className="messagedetail_right orderdetail_right_blue_color">重新上传身份证</span>
                    </div>
                </div>
                
            </div>
        );
    }
});

module.exports = MsgOrderIdCard;