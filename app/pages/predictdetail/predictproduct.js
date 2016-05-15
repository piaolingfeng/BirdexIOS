require("../../fragments/order/css/orderlist.css");
require("../orderdetail/css/orderdetail.css");
require("./css/predictdetail.css");
var React = require("react");
var gVar = require("../../main/global.js");

var PredictProduct = React.createClass({
    
    confirm:function(){
         alert("confirm");
    },
    
    reConfirm:function(){
        alert("reConfirm");
    },
    
    render:function(){
        return(
           <div className="orderdetail_head">
                <div className="orderdetail_background_img">
                    <table style={{width:"100%"}}>
                        <tr>
                            <td className="orderdetail_left">商品编码:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="productCode">BH3243423</span>
                                        <span ref="upcCode" className="predictdetail_right_span">upc222</span>
                                        <span className="predictdetail_right_span">UPC:</span>
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
                            <td className="orderdetail_left">预报/入库:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="predictNum">0</span>
                                        <span >/</span>
                                        <span ref="storageNum">999</span>
                                        <span ref="errorNum" className="predictdetail_right_span">22</span>
                                        <span className="predictdetail_right_span">异常数量:</span>
                                    </div> 
                                    <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="orderdetail_left">有效期:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="validDate">23322</span>
                                    </div> 
                                    <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="orderdetail_left">备 注:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="remarks">不错不错</span>
                                    </div> 
                                    <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="orderdetail_left">状 态:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div style={{display:"inline-block",width:"100%"}} className="orderdetail_right_div_padding">
                                        <span ref="status"  style={{float:"left",paddingTop:"5px"}}>待确认</span>
                                        <button ref="confirm" onClick={this.confirm} type="button" className="predictdetail_btn">确 认</button>
                                        <button ref="reConfirm" onClick={this.reConfirm} type="button" className="predictdetail_btn" >复 核</button>
                                    </div> 
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
           </div>
        );
    }
});

module.exports = PredictProduct;