var MsgStockWarnning = require("./msgstockwarnning.js");
var MsgIdCardError = require("./msgorderidcard.js");
var MsgAccountError = require("./msgaccounterror.js");
var MsgOrderInventory = require("./msgorderinventory.js");
var MsgOrderExamine = require("./msgorderexamine.js");
var Titlebar = require('../../components/titlebar/titlebar.js');
var React = require("react");
var gVar = require("../../main/global.js");
require("./css/messagedetail.css");
require("../orderdetail/css/orderdetail.css");
var itemIdex = 0;
var MessageDetail = React.createClass({

    render: function () {
        itemIdex = this.props.location.state.itemIdex;
        var title = '';
        switch (itemIdex) {
            case 0:
                title = "库存预警消息"
                break;
            case 1:
                title = "身份证异常订单"
                break;
            case 2:
                title = "库存异常订单"
                break;
            case 3:
                title = "审核不通过订单"
                break;
            case 4:
                title = "账户异常"
                break;
        }
        return (

            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_white }}>
                <Titlebar save={title}/>
                <div className="titlebar_head_down">
                    <div style={{ fontSize: "18px", padding: "8px" }}>显示30天内的消息记录</div>
                </div>
            </div>
        );
    }
});

module.exports = MessageDetail;