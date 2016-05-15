var React= require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");
var read_Status = require("./images/read_status.png");
var MsgOrderInventoryProduct = require("./msgorderinventoryproduct.js");

var MsgOrderInventory = React.createClass({
    render:function(){
        return(
            <div className="orderdetail_head">
                <div className="orderdetail_background_img">
                    <div className="messagedetail_padding">
                        <img ref="readStatus" src={read_Status} className="orderlist_img messagedetail_read_status" ></img>
                        <span >库存异常订单</span>
                        <span ref="creatTime" className="messagedetail_right">2014-04-22 23:00</span>
                    </div>
                    <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                     <div className="messagedetail_padding">
                        <span >订单号:</span>
                        <span ref="orderCode" className="messagedetail_margin_left">BH1231123213</span>
                    </div>
                    
                    <MsgOrderInventoryProduct />
                  
                    
                    <div className="messagedetail_padding messagedetail_top_padding" style={{fontSize:"11px"}}>*为便面订单异常,请赶紧前往电脑端补充库存吧!</div>
                </div>
                
            </div>
        );
    }
});

module.exports = MsgOrderInventory;