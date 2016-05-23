require("../../fragments/order/css/orderlist.css");
require("../orderdetail/css/orderdetail.css");
require("./css/predictdetail.css");
var React = require("react");
var gVar = require("../../main/global.js");
var TitleBar = require('../../components/titlebar/titlebar.js');
var PredictProduct = require('./predictproduct.js')

var PredictDetail = React.createClass({
    
    render:function(){
      return(
         <div className="titlebar_extend_head" style={{backgroundColor:gVar.Color_background}} >
            <TitleBar  save="预报详情"/>
            <div className="orderdetail_head titlebar_head_down" style={{paddingTop:gVar.Padding_titlebar}}>
                <div className="orderdetail_background_img">
                    <table style={{width:"100%"}}>
                        <tr>
                            <td className="orderdetail_left">当前状态:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="predictStatus">已出库</span>
                                        <span ref="confirmPredict" className="orderdetail_status orderdetail_right_blue_color">批量确认预报</span>
                                    </div> 
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="orderdetail_left">目的仓库:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="targetWarehouse">美国俄勒冈</span>
                                    </div> 
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="orderdetail_left">所在仓库:</td>
                            <td className="orderdetail_right">
                                <div className="orderdetail_right_div_padding">
                                    <span ref="warehouse">美国俄勒冈</span>
                                </div> 
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="orderdetail_left">物流号:</td>
                            <td className="orderdetail_right">
                                <div className="orderdetail_right_div_padding">
                                    <span ref="LogisticsNum">BL3422333423</span>
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
                        
                        <tr>
                            <td className="orderdetail_left">更新时间:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="updateTime">2015-08-12 12:00</span>
                                    </div> 
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="orderdetail_left">创建时间:</td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="creatTime">2015-08-12 12:00</span>
                                    </div> 
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <PredictProduct />
                <PredictProduct />
            </div>
         </div>
      );
    }
    
});

module.exports = PredictDetail;