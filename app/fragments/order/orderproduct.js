var React = require("react");
require("./css/orderlist.css");
var gVar = require("../../main/global.js");

var OrderProduct = React.createClass({

    propTypes: {
        productEntity: React.PropTypes.object.isRequired,
    },

    render: function () {
        return (
            <div style={{ backgroundColor: gVar.Color_white }}>
                <div className="orderlist_head">
                    <div>
                        <span>商品编码: </span>
                        <span ref="productCode" style={{ marginLeft: "5px" }}>{this.props.productEntity.external_no}</span>
                        <span ref="productError" className="orderproduct_error">{this.props.productEntity.error}</span>
                    </div>
                    <div className="orderproduct_product_name">
                        <span ref="productName">{this.props.productEntity.name}</span>
                        <span ref="productCount" className="orderproduct_count">{this.props.productEntity.nums}</span>
                        <span className="orderproduct_count" style={{ marginRight: "0" }}>x</span>
                    </div>
                </div>
                <hr style={{ height: "1px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
            </div>
        );
    }

});

module.exports = OrderProduct;