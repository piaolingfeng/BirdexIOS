var React= require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");
var copy = require("../../fragments/order/images/copy.png");
var read_Status = require("./images/read_status.png");

var MsgStockWarnning = React.createClass({
    render:function(){
        return(
            <div className="orderdetail_head">
                <div className="orderdetail_background_img">
                    <div className="messagedetail_padding">
                        <img ref="readStatus" src={read_Status} className="orderlist_img messagedetail_read_status" ></img>
                        <span >库存预警消息</span>
                        <span ref="creatTime" className="messagedetail_right">2014-04-22 23:00</span>
                    </div>
                    <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                     <div className="messagedetail_padding">
                        <span className="messagedetail_text_dark">商品编码:</span>
                        <span ref="productCode" className="messagedetail_text_dark messagedetail_margin_left">SN23432432</span>
                        <img ref="creatTime" src={copy} className="messagedetail_right orderlist_img"></img>
                    </div>
                    
                    <div className="messagedetail_padding messagedetail_top_padding">
                        <span ref="productName" className="messagedetail_text_dark">运动鞋</span>
                    </div>
                    <div className="messagedetail_padding messagedetail_top_padding">
                        <span className="messagedetail_text_red">可用库存为:</span>
                        <span ref="" className="messagedetail_text_dark messagedetail_text_red messagedetail_margin_left">12</span>
                    </div>
                    <div className="messagedetail_padding messagedetail_top_padding" style={{fontSize:"11px"}}>*为便面订单异常,请赶紧前往电脑端补充库存吧!</div>
                </div>
                
            </div>
        );
    }
});

module.exports = MsgStockWarnning;