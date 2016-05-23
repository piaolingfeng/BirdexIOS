var React=require("react");
require("./css/orderlist.css");
var gVar=require("../../main/global.js");

var OrderProduct=React.createClass({
    render:function(){
        return(
            <div style={{backgroundColor:gVar.Color_white}}>
               <div className="orderlist_head">
                    <div>
                        <span>商品编码:</span>
                        <span ref="productCode" style={{marginLeft:"5px"}}>343432143 </span>
                        <span ref="productError" className="orderproduct_error">dfdfdf</span>
                    </div>
                    <div className="orderproduct_product_name">
                        <span ref="productName">纸尿片</span>
                        <span ref="productCount" className="orderproduct_count">10</span>
                        <span className="orderproduct_count" style={{marginRight:"0"}}>x</span>
                    </div>
                </div>
                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
            </div>
        );
    }
    
});

module.exports=OrderProduct;