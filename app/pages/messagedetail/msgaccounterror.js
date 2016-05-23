var React= require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");
var copy = require("../../fragments/order/images/copy.png");
var read_Status = require("./images/read_status.png");

var MsgAccountError = React.createClass({
    
    recharge:function(){
        alert("recharge");
    },
    
    render:function(){
        return(
            <div className="orderdetail_head">
                <div className="orderdetail_background_img">
                    <div className="messagedetail_padding">
                        <img ref="readStatus" src={read_Status} className="orderlist_img messagedetail_read_status" ></img>
                        <span >账户异常</span>
                        <span ref="creatTime" className="messagedetail_right">2014-04-22 23:00</span>
                    </div>
                    <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                    
                    <div className="messagedetail_padding ">
                        <span className="messagedetail_text_dark">亲爱的:</span>
                        <span ref="name" className="messagedetail_text_dark">ddddd</span>
                        <span className="messagedetail_text_dark">,截止到目前为止,您有</span>
                        <span ref="orderCount" className="messagedetail_text_dark">22</span>
                        <span className="messagedetail_text_dark">笔订单出库,将产生</span>
                        <span ref="free" className="messagedetail_text_dark">4099999</span>
                        <span className="messagedetail_text_dark">元运费,您的账户余额为</span>
                        <span ref="balance" className="messagedetail_text_dark">343433</span>
                        <span ref="name" className="messagedetail_text_dark">,可能造成部分订单无法正常扣取费用,为避免影响订单配送时效,请尽快充值!</span>
                    </div>
                    <div style={{display:"inline-block",width:"100%"}}>
                         <button onClick={this.recharge} ref="recharge" type="button" className="accounterror_btn" >马上充值</button>
                    </div>
                    
                </div>
                
            </div>
        );
    }
    
});

module.exports = MsgAccountError;