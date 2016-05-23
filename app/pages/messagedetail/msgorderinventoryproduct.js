var React= require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");

var MsgOrderInventoryProduct = React.createClass({
    render:function(){
        return(
            <div >
                <div className="messagedetail_padding messagedetail_top_padding">
                   <span ref="productName" className="messagedetail_text_dark">运动鞋</span>
                   
                   <div style ={{paddingTop:"6px"}}>
                        <span className="messagedetail_text_dark">商品编码:</span>
                        <span ref="productCode" className="messagedetail_margin_left messagedetail_text_dark">SN234212323</span>
                        <span ref="productNum" className="messagedetail_text_dark" style={{float:"right"}}>1</span>
                        <span className="messagedetail_text_dark" style={{float:"right"}}>x</span>
                   </div>
                    
                   <div style ={{paddingTop:"6px"}}>
                        <span ref="errormsg" className="messagedetail_text_red">eeeeeeeeeee</span>
                   </div>
               </div>
            </div>
        );
    }
});

module.exports = MsgOrderInventoryProduct;