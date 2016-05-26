var React=require('react');
var ReactList=require('react-list');
var TitleBar = require('../../components/titlebar/titlebar.js');
var gVar = require("../../main/global.js");
require('./css/willindetail.css');
var showDialog = require('../../components/BDialog/bdialog.js');
var WillInDetail=React.createClass({
    getDialogItem:function(index){
        if(index==0){
            return (<div style={{padding:"5px 5px"}}>
            <div><span>入库单号：</span>
            <span>BS54645645646</span></div>
            <div><span>当前状态：</span>
            <span>已审核</span></div>
            <div><span>目的仓库：</span>
            <span>香港</span></div>
            <div><span>物流跟踪号：</span>
            <span>GG452525645251[普通物流]</span></div>
            </div>);
        }else{
            return (<div className="willindetail_dialog_item" style={{backgroundColor:"#ffffff",marginTop:"8px",padding:"5px 5px"}}>
            <div style={{
                wordBreak:"break-all",wordWrap:"break-word",whiteSpace:"pre-wrap",color:"#4A4A4A"
            }}>雪花秀滋阴生面霜60ml养颜亮夫紧纸补水(ConcentratedGinsengRenewingCream)</div>
            <div><span>商品编码：564654564656</span><span style={{float:"right",color:"#039FFF"}}>数量：11</span></div>
            </div>);
        }
    },
    showSameOrder:function(){
        showDialog("同单号其它商品",<ReactList itemRenderer={this.getDialogItem} length="15" />,null, null);
    },
    getItem:function(index) {
        if(index==0){
            return (<div>
            <div className="willin_item">Arnott`s shapes 脆片饼干 青柠黑胡椒口味薄脆120g</div>
            <div className="willin_item">商品编码：56456465456464</div>
            </div>);
        }else{
            var items=new Array();
            for(var i=0;i<3;i++){
                items.push(<tr><td colSpan="3" style={{
                    borderTop:"1px dashed #ddd"
                }}>
                    <div className="willin_item"><div className="willin_item_left">创建时间：</div><div className="willin_item_right">2016-03-14 9:32:14</div></div>
                    <div className="willin_item"><div className="willin_item_left">入库单号：</div><div className="willin_item_right" style={{
                        color:"#039FFF"
                    }}>DS5454545454</div></div>
                    <div className="willin_item"><div className="willin_item_left">物流单号：</div><div className="willin_item_right">ASDF65456FD4F56D</div></div>
                    <div className="willin_item"><div className="willin_item_left">物流方式：</div><div className="willin_item_right">普通物流</div></div>
                    <div className="willin_item"><div className="willin_item_left">数量：</div><div className="willin_item_right">9</div></div>
                    <div className="willin_item other_commodity" onClick={this.showSameOrder.bind(this)}>同单其它商品</div>
               </td></tr>);
            }
            return (<table className="table">
            <thead><tr style={{width:"100%",backgroundColor:"#e5e5e5"}}>
            <td className="willin_item_left" style={{
                paddingRight:"0px"
            }}>待入仓库：</td>
            <td className="willin_item_right1" style={{
                paddingLeft:"0px"
            }}>美国仓</td>
            <td className="willin_item_right2" style={{
                paddingLeft:"0px",textAlign:"right"
            }}>数量：20</td>
            </tr></thead>
            <tbody style={{backgroundColor:"#eeeeee"}}>
                {items}
            </tbody>
            </table>);
        }
    },
    render:function(){
        return (<div className="titlebar_extend_head"> 
            <TitleBar  save="待入库商品详情"/>
            <div className="titlebar_head_down " style={{paddingTop:gVar.Padding_titlebar,
                paddingLeft:"5px",paddingRight:"5px"}}>
            <ReactList itemRenderer={this.getItem} length="20" />
            </div>
        </div>);
    }
});
module.exports=WillInDetail;