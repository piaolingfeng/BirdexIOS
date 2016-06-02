var React = require('react');
var gVar = require('../../main/global.js');
require('./css/inventory.css');
var WillinItem = React.createClass({
    propTypes: {
        //当前行的数据
        itemObj: React.PropTypes.object
    },
    itemOnClick: function () {
        gVar.pushPage({ pathname: "willindetail", state: this.props.itemObj},true);
        // gVar.pushPage("willindetail");
    },
    render: function () {
        var eles = [];
        var allcount=0;
        if (this.props.itemObj.stock != null && this.props.itemObj.stock != undefined) {
            $.each(this.props.itemObj.stock, function (index1, obj1) {
                if (obj1.detail != null && obj1.detail != undefined) {
                    var count = 0;
                    var name = '仓库名缺失';
                    if (obj1.warehouse_name != null && obj1.warehouse_name != undefined) {
                        name = obj1.warehouse_name;
                    }
                    $.each(obj1.detail, function (index2, obj2) {
                        count+=parseInt(obj2.stock);
                        allcount+=parseInt(obj2.stock);
                    });
                    eles.push(<span style={{
                        fontSize: "14px"
                    }}><span style={{
                        color: "#979797"
                    }}>{name}: </span><span style={{
                        color: "#039FFF"
                    }}>{count}</span></span>);
                }
            });
        }
        // for (var i = 0; i < 5; i++) {
        //     eles.push(<span style={{
        //         fontSize: "14px"
        //     }}><span style={{
        //         color: "#979797"
        //     }}>美国仓库: </span><span style={{
        //         color: "#039FFF"
        //     }}>150</span></span>);
        // }

        return (<div style = {
            {
                marginTop: "8px",
                backgroundColor: "#ffffff",
                paddingTop: "5px"
            }
        } onClick={this.itemOnClick.bind(this) } ><table className="table" style={{
            width: "100%",
            marginBottom: "0px"
        }}>
                <tbody>
                    <tr><td colSpan="2" style={{
                        fontSize: "16px",
                        borderTopWidth: "0px"
                    }}>商品编码: {this.props.itemObj.upc}</td></tr>
                    <tr><td className="wrapline" style={{
                        width: "70%",
                        fontSize: "16px"
                    }}>{this.props.itemObj.name}</td><td style={{
                        width: "25%",
                        textAlign: "center"
                    }}
                        ><span style={{
                            color: "#979797",
                            fontSize: "14px"
                        }}>待入库数</span><br/><span style={{
                            color: "#039FFF",
                            fontSize: "18px"
                        }}>{allcount}</span></td></tr>
                    <tr><td colSpan="2">{eles}</td></tr>
                </tbody>
            </table></div>);
    }
});
module.exports = WillinItem;