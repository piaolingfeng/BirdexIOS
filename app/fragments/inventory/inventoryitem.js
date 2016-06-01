var React = require('react');
var ReactList = require('react-list');
var gVar = require('../../main/global.js');
var toast = require('../../util/Tips/tips.js');
require('./css/inventory.css');
var showDialog = require('../../components/BDialog/bdialog.js');
var InventoryInfo = React.createClass({
    privateVar:{
        //自定义数组存储
        detailList:[]
    },
    propTypes:{
        //当前行的数据
        itemObj:React.PropTypes.object
    },
    getDialogItem: function (index) {
        var position=parseInt(index);
        var dataItem=this.privateVar.detailList[position];
        console.log(dataItem);
        return (<div className="instockdetail_dialog_item">
            <div><span>批次号：{dataItem.TrackingNo==null?'无':dataItem.TrackingNo}</span><span style={{ float: "right", color: "#039FFF" }}>数量：{parseInt(dataItem.Quantity)}</span></div>
            <div><span>有效期：{dataItem.Expire==null?'无':dataItem.Expire}</span></div>
        </div>);
    },
    showRecord: function (ele) {
        var component=this;
        component.privateVar.detailList=[];
        //仓库的详细数据
        if(this.props.itemObj.detail!=null&&this.props.itemObj.detail!=undefined){
            $.each(this.props.itemObj.detail,function(index1,obj1){
                console.log(obj1.stock_detail);
                if(obj1.stock_detail!=null&&obj1.stock_detail!=undefined){
                    Array.prototype.push.apply(component.privateVar.detailList,obj1.stock_detail);
                }
            });
        }
        if(this.privateVar.detailList.length==0){
            toast('没有可用数据显示!');
        }else{
            showDialog("",<ReactList itemRenderer={this.getDialogItem} length={this.privateVar.detailList.length} />, null, null);
        }
        if (ele.stopPropagation) { //W3C阻止冒泡方法  
            ele.stopPropagation();
        } else {
            ele.cancelBubble = true; //IE阻止冒泡方法  
        }
    },
    render: function () {
        // console.log(this.props.itemObj);
        // console.log(this.props.itemObj.detail[0]);
        var avail=0;
        var occupancy=0;
        var actual=0;
        if(this.props.itemObj.detail!=null&&this.props.itemObj.detail!=undefined){
            $.each(this.props.itemObj.detail,function(index,obj){
            //可用库存 =  仓库实际数量 + 允许超售库存量 - 订单占用库存量
                avail+=parseInt(obj.stock)+parseInt(obj.overdraft_stock)-parseInt(obj.block_stock);
                occupancy+=parseInt(obj.block_stock);
                actual+=parseInt(obj.stock);
            });
        }
        return (<tr style = {
            {
                color: "#979797"
            }
        } >
            <td><span>{this.props.itemObj.warehouse_name==''?'仓库名缺失':this.props.itemObj.warehouse_name}</span></td><td><span>{avail}</span></td><td><span>{occupancy}</span></td><td onClick={this.showRecord.bind(this) }><span style = {
                {
                    color: "#039FFF"
                }
            } > {actual} </span> </td > </tr>);
    }
});
var InventoryItem = React.createClass({
    propTypes:{
        //item对应的obj对象
        itemObj: React.PropTypes.object,
    },
    getDefaultProps:function(){
        return {itemObj:null};
    },
    itemOnClick: function () {
        
         gVar.pushPage({ pathname: "instockdetail", state: this.props.itemObj},true);
        // gVar.pushPage("instockdetail",true);
    },
    render: function () {
        var items = [];
        // for (var i = 0; i < 3; i++) {
        //     items.push(<InventoryInfo / >);
        // }
        $.each(this.props.itemObj.stock,function(index,obj){
            items.push(<InventoryInfo itemObj={obj} / >);
        });
        // for(var i=0;i<this.props.itemObj.stock.length;i++){
        //     // console.log(this.props.itemObj.stock[i]);
        //     items.push(<InventoryInfo itemObj={this.props.itemObj.stock[i]} / >);
        // }
        return (<div style = {
            {
                marginTop: "8px",
                backgroundColor: "#ffffff",
                paddingTop: "10px"
            }
        } onClick={this.itemOnClick.bind(this) }><div style = {
            {
                padding: "0px 8px",
                color: "#4A4A4A"
            }
        } > 商品编码:{this.props.itemObj.upc} </div> <div style = { {
            padding: "0px 8px",
            color: "#979797"
        }
        } >{this.props.itemObj.name} </div> <table className = "table inventory_item_info"
            style = {
                {
                    width: "100%",
                    marginBottom: "0px"
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