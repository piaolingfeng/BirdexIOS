var MsgStockWarnning = require("./msgstockwarnning.js");
var MsgIdCardError = require("./msgorderidcard.js");
var MsgAccountError = require("./msgaccounterror.js");
var MsgOrderInventory = require("./msgorderinventory.js");
var MsgOrderExamine = require("./msgorderexamine.js");
var React = require("react");
var gVar = require("../../main/global.js");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");

var MessageDetail = React.createClass({
    
    render:function(){
        
        return(
            <div className="messagedetail_head" style={{backgroundColor:gVar.Color_background}}>
                <div style={{fontSize:"20px",padding:"8px"}}>显示30天内的消息记录</div>
            </div>
        );
    }
});

module.exports = MessageDetail;