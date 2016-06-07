var React= require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");

var MsgOrderInventoryProduct = React.createClass({
   
   propTypes:{
       product:React.PropTypes.object.isRequired, 
    },
   
    render:function(){
        
        var product = this.props.product;
        if(product==null)
            return null;
        // console.log(product);
        return(
            <div >
                <div className="messagedetail_top_padding">
                   <span ref="productName" className="messagedetail_text_dark">{product.name}</span>
                   
                   <div>
                        <span className="messagedetail_text_dark">商品编码:</span>
                        <span ref="productCode" className="messagedetail_margin_left messagedetail_text_dark">{product.external_no}</span>
                        <span ref="productNum" className="messagedetail_text_dark" style={{float:"right"}}>{product.nums}</span>
                        <span className="messagedetail_text_dark" style={{float:"right"}}>x</span>
                   </div>
                    
                   <div >
                        <span ref="errormsg" className="messagedetail_text_red">{product.error}</span>
                   </div>
               </div>
            </div>
        );
    }
});

module.exports = MsgOrderInventoryProduct;