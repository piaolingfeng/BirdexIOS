var React=require("react");
require("../../fragments/order/css/orderlist.css");
require("./css/orderdetail.css")
var gVar = require("../../main/global.js");
var phone = require("./images/phone.png");
var right = require("./images/right.png");
var error = require("./images/error.png");
var OrderDetailProduct = require("./orderdetailproduct.js");

var OrderDetail = React.createClass({
    idCheck:function(){
        alert("idCheck");
    },
    
    phoneCall:function(){
        alert("phoneCall");
    },
    changeAddr:function(){
        alert("changeAddr");
    },
    
    componentDidMount:function(){
        
    },
    
   render:function(){
    
    var el = new Array();
       
    return (
        <div className="orderdetail_head">
            <div className="orderdetail_background_img">
                <table style={{width:"100%"}}>
                    <tr>
                        <td className="orderdetail_left">订单号:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="orderNum">BH3243423</span>
                                    <span ref="statusName" className="orderdetail_status">已出库</span>
                                </div> 
                                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                            </div>
                        </td>
                    </tr>
                     
                      <tr>
                        <td className="orderdetail_left">客户单号:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="customerNum">BH3243423</span>
                                </div> 
                                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                            </div>
                        </td>
                    </tr>
                    
                     <tr>
                        <td className="orderdetail_left">发货仓库:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="warehouse">美国俄勒冈</span>
                                    <span ref="serviceType" className="orderdetail_status">美国笨鸟专线</span>
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
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div className="orderdetail_background_img">
                <table style={{width:"100%"}}>
                      <tr>
                        <td className="orderdetail_left">重 量:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="weight">25</span>
                                    <span>KG</span>
                                </div> 
                                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td className="orderdetail_left">费 用:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span>¥</span>
                                    <span ref="free">79</span>
                                </div> 
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div className="orderdetail_background_img">
                <table style={{width:"100%"}}>
                    <tr>
                        <td className="orderdetail_left">订单号:</td>
                        <td className="orderdetail_right">
                                <div >
                                    <div onClick={this.phoneCall} className="orderdetail_right_div_padding" style={{float:"left"}}>
                                        <span ref="name" >刘浩</span>
                                        <span ref="phone" className="orderdetail_marginleft_id">1382222222</span>
                                        <img src={phone} className="orderdetail_img orderdetail_marginleft_id"/>
                                    </div>
                                    <span ref="changeAddr" onClick={this.changeAddr} className="orderdetail_status orderdetail_right_blue_color orderdetail_right_div_padding">修改地址</span>
                                </div> 
                        </td>
                    </tr>
                    
                    <tr>
                        <td className="orderdetail_left"></td>
                        <td className="orderdetail_right">
                            <div>
                                <div ref="address" className="orderdetail_address">广东省深圳市南山区科技中三路</div>
                                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                            </div>
                        </td>
                    </tr>
                    
                     <tr>
                        <td className="orderdetail_left">身份证号:</td>
                        <td className="orderdetail_right">
                            <div>
                                <div className="orderdetail_right_div_padding">
                                    <span ref="idNum">234324324</span>
                                    <div onClick={this.idCheck} className="orderdetail_status">
                                        <img ref="checkImg" src={right} className="orderdetail_img"/>
                                        <span ref="idNumCheck" className="orderdetail_status orderdetail_right_blue_color orderdetail_marginleft_id">身份证验证</span>
                                    </div>
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

module.exports = OrderDetail;