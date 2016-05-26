var React = require("react");
require("../../fragments/order/css/orderlist.css");
require("./css/orderdetail.css")
var gVar = require("../../main/global.js");

var OrderDetailProduct = React.createClass({

    propTypes: {
        product: React.PropTypes.object.isRequired,
    },

    render: function () {
        var product = this.props.product;
        return (
            <div>
                <div className="orderdetail_background_img">
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td className="orderdetail_left">UPC码: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="upcCode">{product.upc}</span>
                                    </div>
                                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="orderdetail_left">商品编码: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="productCode">{product.external_no}</span>
                                    </div>
                                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="orderdetail_left">商品名称: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="productName">{product.name}</span>
                                    </div>
                                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="orderdetail_left">数 量: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="warehouse">{product.nums}</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    },
});

module.exports = OrderDetailProduct;