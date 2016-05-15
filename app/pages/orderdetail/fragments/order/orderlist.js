var React=require("react");
require("./css/orderlist.css");
var copy = require("./images/copy.png");
var gVar = require("../../main/global.js");

var OrderList = React.createClass({
    copy:function(){
        alert();
    },
    
    logisticsTracking:function(){},
    
    contactCustomer:function() {
        
    },
    
    changeAddr:function(){
        
    },
    
    render:function(){
        return (
            <div style={{backgroundColor:gVar.Color_white,marginTop:"15px"}}>
                <div className="orderlist_head">
                    <div ref="copy"  onClick={this.copy} style={{float:"left"}}>
                        <span ref="orderName" style={{color:gVar.Color_title}}>BHdadfafds</span>
                        <img className="orderlist_img" src={copy}></img>
                    </div>
                    <div ref="time" style={{float:"right",color:gVar.Color_title}}>2015-02-23</div>
                    <div ref="status" className="orderlist_statu" style={{}}>已出库</div>
                </div>
                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                <div id="orderlist" style={{height:"50px"}}></div>
                <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                <div ref="orderError" className="orderlist_head orderlist_error">此姓名和身份证已验证过</div>
                <div >
                    <span ref="logisticsTracking" className="orderlist_btn" >物流跟踪</span>
                    <span className="orderlist_line"></span>
                    <span ref="contactCustomer " className="orderlist_btn" >联系客服</span>
                    <span className="orderlist_line"></span>
                    <span ref="changeAddr" className="orderlist_btn" >修改地址</span>
                    <div className="orderlist_clear"></div>
                </div>
            </div>
        );
    },
});

module.exports = OrderList;