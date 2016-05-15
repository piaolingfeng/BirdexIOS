var React = require("react");
require("../order/css/orderlist.css");
require("../../pages/orderdetail/css/orderdetail.css");
require("./css/prediction.css");
var PredictionList = React.createClass({
    
    render:function(){
        return (
            <div className="predicitonlist_head"> 
                <span ref="predictNum" className="predictionlist_predict">BH00000</span>
                <span ref="predictTarge" className="predictionlist_place">美国</span>
                <div ref="predictStatus" className="predictionlist_status">已出库</div>
                <div className="orderlist_clear"></div>
            </div>
        );
    }
});

module.exports = PredictionList;