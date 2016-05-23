var React = require("react");
require("../order/css/orderlist.css");
require("../../pages/orderdetail/css/orderdetail.css");
require("./css/prediction.css");
var gVar = require('../../main/global.js');

var PredictionList = React.createClass({
    
    changePageToDetail(){
        gVar.pushPage('predictdetail');
    },
    
    render:function(){
        return (
            <div onClick={this.changePageToDetail}>
                <div className="predicitonlist_head"> 
                    <span ref="predictNum" className="predictionlist_predict">BH00000</span>
                    <span ref="predictTarge" className="predictionlist_place">美国</span>
                    <div ref="predictStatus" className="predictionlist_status">已出库</div>
                    <div className="orderlist_clear"></div>
                </div>
                <hr style={{width:"100%",margin:"auto", backgroundColor:"#CBCBCB", border:0, height:"1px"}}></hr>
            </div>
        );
    }
});

module.exports = PredictionList;