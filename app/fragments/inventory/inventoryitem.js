var React = require('react');
var ReactList=require('react-list');
var gVar = require('../../main/global.js');
require('./css/inventory.css');
var showDialog = require('../../components/BDialog/bdialog.js');
var InventoryInfo = React.createClass({
    getDialogItem:function(index){
        return (<div className="instockdetail_dialog_item">
            <div><span>批次号：6546456</span><span style={{float:"right",color:"#039FFF"}}>数量：1010</span></div>
            <div><span>有效期：2016-12-12 11:30:00</span></div>
        </div>);
    },
    showRecord:function(ele){ 
        showDialog("",<ReactList itemRenderer={this.getDialogItem} length="6" />,null, null);    
        if(ele.stopPropagation) { //W3C阻止冒泡方法  
         ele.stopPropagation();  
        } else {
        ele.cancelBubble = true; //IE阻止冒泡方法  
        }
    },
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
                } onClick={this.showRecord.bind(this)}> 3434 </span> </td > </tr>);
            }
        });
    var InventoryItem = React.createClass({
            itemOnClick:function(){
                gVar.pushPage("instockdetail");
            },
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
                    } onClick={this.itemOnClick.bind(this)}><div style = {
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
                    width: "100%",
                    marginBottom:"0px"
                }
            } >
            <thead>
            <tr >
            <td > <span > 所在仓库 </span> </td > <td > <span > 可用 </span></td > <td > <span > 占用 </span> </td > <td > <span > 实际 </span> </td> </tr> </thead > <tbody > {
                items
            } </tbody></table > </div>);
        }
    });
module.exports = InventoryItem;