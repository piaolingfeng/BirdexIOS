var React= require("react");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var gVar = require("../../main/global.js");
var read_Status = require("./images/read_status.png");
var MsgOrderInventoryProduct = require("./msgorderinventoryproduct.js");

var MsgOrderInventory = React.createClass({
    
    propTypes:{
       messageEntity:React.PropTypes.object.isRequired, 
    },
    
    onItemClick:function(order_code){
        var param = { order_code: order_code }
        gVar.pushPage({ pathname: 'orderdetail', state: param });
    },
    
    
    render:function(){
        
        var entity = this.props.messageEntity;
        console.log(entity);
        //0表示未读，1表示已读
        var read  = "none";
        if(entity.read_status=="1"){
            read = 'none';
        }else{
            read = 'block';
        }
        var productList = new Array();
        for(var i=0;i<entity.msg_content.products.length;i++){
            productList.push(<MsgOrderInventoryProduct product={entity.msg_content.products[i]}/>);
        }
        
        return(
            <div className="orderdetail_head" onClick={this.onItemClick.bind(this,entity.msg_content.order_code)}>
                <div className="orderdetail_background_img">
                    <div className="messagedetail_padding">
                        <img ref="readStatus" src={read_Status} className="orderlist_img messagedetail_read_status" style={{display:read}}></img>
                        <span >库存异常订单</span>
                        <span ref="creatTime" className="messagedetail_right">{entity.created_date}</span>
                    </div>
                    <hr style={{height:"1px",width:"100%",margin:"auto", backgroundColor:gVar.Color_single_line, border:0}}></hr>
                     <div className="messagedetail_padding">
                        <span >订单号:</span>
                        <span ref="orderCode" className="messagedetail_margin_left">{entity.msg_content.order_oms_no}</span>
                    </div>
                    
                    {productList}
                    
                    <div className="messagedetail_padding messagedetail_top_padding" style={{fontSize:"11px"}}>*为便面订单异常,请赶紧前往电脑端补充库存吧!</div>
                </div>
                
            </div>
        );
    }
});

module.exports = MsgOrderInventory;