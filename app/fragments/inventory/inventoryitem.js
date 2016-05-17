var React = require('react');
require('./css/inventory.css');
var InventoryInfo = React.createClass({
        render: function() {
            return ( <tr style = {
                    {
                        color: "#979797"
                    }
                } >
                <td><span>香港</span></td><td><span>3434</span></td><td><span>3434</span></td><td><span style = {
                    {
                        color: "#039FFF"
                    }
                } > 3434 </span> </td > </tr>);
            }
        });
    var InventoryItem = React.createClass({
            render: function() {
                var items = [];
                for (var i = 0; i < 3; i++) {
                    items.push( < InventoryInfo / > );
                }
                return ( <div style = {
                        {
                            marginTop: "8px",
                            backgroundColor:"#ffffff",
                            paddingTop:"10px"
                        }
                    } ><div style = {
                        {
                            padding: "0px 8px",
                            color: "#4A4A4A"
                        }
                    } > 商品编码: BX56464564656 </div> <div style = { {
                    padding: "0px 8px",
                    color: "#979797"
                }
            } > hello,weisuohuang </div> <table className = "table inventory_item_info"
            style = {
                {
                    width: "100%"
                }
            } >
            <thead style = {
                {
                    color: "#979797"
                }
            } >
            <tr >
            <th > <span > 所在仓库 </span> </th > <th > <span > 可用 </span></th > <th > <span > 占用 </span> </th > <th > <span > 实际 </span> </th > </tr> </thead > <tbody > {
                items
            } </tbody></table > </div>);
        }
    });
module.exports = InventoryItem;