var React=require("react");
var laydown = require("./images/laydown.png");
var gVar= require("../../main/global.js");
require("./css/orderlist.css");
var Status=React.createClass({
    render:function(){
        return(
            <div >
                <div style={{backgroundColor:gVar.Color_white}}>
                    <span ref="logisticsTracking" className="orderstatus">全部仓库
                        <img src={laydown} className="orderstatus_laydown"/>
                    </span>
                    <span className="orderlist_status_line"></span>
                    <span ref="contactCustomer " className="orderstatus" >全部状态
                        <img src={laydown} className="orderstatus_laydown"/>
                    </span>
                    <span className="orderlist_status_line"></span>
                    <span ref="changeAddr" className="orderstatus" >不限时间
                        <img src={laydown} className="orderstatus_laydown"/>
                    </span>
                    <div className="orderlist_clear"></div>
                </div>
                <div className="orderstatus_text">共10个数据</div>
            </div>
        );
    }
});
module.exports = Status;