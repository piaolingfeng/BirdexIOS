var React=require('react');
var ReactList=require('react-list');
require('./css/instockdetail.css');
var TitleBar = require('../../components/titlebar/titlebar.js');
var gVar = require("../../main/global.js");
var InStockDetail=React.createClass({
    getItem:function(index){
        if(index==0){
            return (<div>
            <div className="instock_item_info"><div className="instock_item_title">商品名称：</div><div className="instock_item_txt">杜甫江阁</div></div>
            <div className="instock_item_info"><div className="instock_item_title">UPC码：</div><div className="instock_item_txt">FD21514613613123</div></div>
            <div className="instock_item_info"><div className="instock_item_title">商品编码：</div><div className="instock_item_txt">DFD45546464</div></div>
            <div className="instock_item_info"><div className="instock_item_title">海关备案编号：</div><div className="instock_item_txt">DFGF5456456</div></div>
            <div className="instock_item_info"><div className="instock_item_title">重量kg：</div><div className="instock_item_txt">90</div></div>
            <div className="instock_item_info"><div className="instock_item_title">长*款*高cm：</div><div className="instock_item_txt">90*55*55</div></div>
            <div className="instock_item_info"><div className="instock_item_title">申请价值：</div><div className="instock_item_txt">58万美元</div></div>
            <div className="instock_item_info"><div className="instock_item_title">商品成分：</div><div className="instock_item_txt">豆腐干豆腐</div></div>
            <div className="instock_item_info"><div className="instock_item_title">商品描述：</div><div className="instock_item_txt">都发给谁发的是功夫大使馆的方式</div></div>
            <div className="instock_item_info"><div className="instock_item_title">可用库存总数：</div><div className="instock_item_txt">501</div></div>
            </div>);
        }else{
            return (<div className="table-responsive instock_list_item">
            <table className="table"> 
            <thead>
            <tr>
            <td colSpan="2">
            美国仓
            </td>
            <td style={{
                width:"30%",
                textAlign:"right",
                paddingRight:"0px"
            }}>可用库存：</td><td style={{
                width:"20%",
                paddingLeft:"0px"
            }}>455</td>
            </tr>
            </thead>
            <tbody>
                <tr><td style={{
                width:"30%",
                textAlign:"right",
                paddingRight:"0px"
            }}>总入库数量：</td><td style={{
                width:"20%",
                paddingLeft:"0px"
            }}>5800</td><td style={{
                width:"30%",
                textAlign:"right",
                paddingRight:"0px"
            }}>总出库数量：</td><td style={{
                width:"20%",
                paddingLeft:"0px"
            }}>56456</td></tr>
                <tr><td style={{
                width:"30%",
                textAlign:"right",
                paddingRight:"0px"
            }}>差异：</td><td style={{
                width:"20%",
                paddingLeft:"0px"
            }}>34</td><td style={{
                width:"30%",
                textAlign:"right",
                paddingRight:"0px"
            }}>损耗：</td><td style={{
                width:"20%",
                paddingLeft:"0px"
            }}>23</td></tr>
                <tr><td style={{
                width:"30%",
                textAlign:"right",
                paddingRight:"0px"
            }}>实际数量：</td><td style={{
                width:"20%",
                paddingLeft:"0px"
            }}>34</td><td style={{
                width:"30%",
                textAlign:"right",
                paddingRight:"0px"
            }}>订单占用：</td><td style={{
                width:"20%",
                paddingLeft:"0px"
            }}>23</td></tr>
            </tbody>
            </table>
            </div>);
        }
    },
    render:function(){
        return (<div className="titlebar_extend_head" >
            <TitleBar  save="订单详情"/>
            <div className="titlebar_head_down orderdetail_head" style={{paddingTop:gVar.Padding_titlebar}}>
            <ReactList itemRenderer={this.getItem} length="20" />
            </div>
        </div>);
    }
});
module.exports=InStockDetail;