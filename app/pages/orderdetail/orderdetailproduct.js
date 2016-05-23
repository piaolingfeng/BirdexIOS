var React=require("react");
require("../../fragments/order/css/orderlist.css");
require("./css/orderdetail.css")
var gVar = require("../../main/global.js");

var OrderDetailProduct=React.createClass({
    render:function(){
        return(
            <div>
                <div className="orderdetail_background_img">
                <table style={{width:"100%"}}>
                    <tr>
                        <td className="orderdetail_left">UPC码:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="upcCode">223243423</span>
                                </div> 
                                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                            </div>
                        </td>
                    </tr>
                     
                      <tr>
                        <td className="orderdetail_left">商品编码:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="productCode">SN3243423</span>
                                </div> 
                                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                            </div>
                        </td>
                    </tr>
                    
                     <tr>
                        <td className="orderdetail_left">商品名称:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="productName">运动鞋</span>
                                </div> 
                                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td className="orderdetail_left">数 量:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="warehouse">2</span>
                                </div> 
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            </div>
        );
    },
});

module.exports = OrderDetailProduct;