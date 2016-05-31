var React = require("react");
require("../order/css/orderlist.css");
require("../../pages/orderdetail/css/orderdetail.css");
require("./css/prediction.css");
var gVar = require('../../main/global.js');

var PredictionList = React.createClass({
    
    changePageToDetail(){
        var param = {storage_code:this.props.predictEntity.storage_code}
        gVar.pushPage({pathname:'predictdetail',state:param});
    },
    
    propTypes:{
        predictEntity:React.PropTypes.object.isRequired,
    },
    
    render:function(){
        return (
            <div onClick={this.changePageToDetail}>
                <div className="predicitonlist_head"> 
                    <span ref="predictNum" className="predictionlist_predict">{this.props.predictEntity.storage_no}</span>
                    <span ref="predictTarge" className="predictionlist_place">{this.props.predictEntity.warehouse_name}</span>
                    <div ref="predictStatus" className="predictionlist_status">{this.props.predictEntity.status_name}</div>
                    <div className="orderlist_clear"></div>
                </div>
                <hr style={{width:"100%",margin:"auto", backgroundColor:"#CBCBCB", border:0, height:"0.5px"}}></hr>
            </div>
        );
    }
});

module.exports = PredictionList;