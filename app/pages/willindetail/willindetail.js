var React = require('react');
var ReactList = require('react-list');
var TitleBar = require('../../components/titlebar/titlebar.js');
var gVar = require("../../main/global.js");
require('./css/willindetail.css');
var showDialog = require('../../components/BDialog/bdialog.js');
var toast = require('../../util/Tips/tips.js');
var LoadingView = require('../../components/loadingview/loadingview.js');
//胡伟
//由于使用dialog方式弹出页面，导致reactlist不能在PC浏览器上不能正常滑动，但在移动端是可以正常滑动
var WillInDetail = React.createClass({
    privateVar: {
        //1正在加载，2加载数据完毕，3加载失败
        status: 1,
        //仓库产品信息
        productEntity: null,
        //同单号商品请求
        params1: {
            // app_debug: 1,
            // company_code: localStorage.getItem("company_code"),
            // user_code: localStorage.getItem('user_code'),
            storage_code: ""
        },
        sameOrderEntity: null
    },
    componentWillUnmount: function () {
        this.privateVar.status = 1;
        this.privateVar.productEntity = null;
        this.privateVar.params1.storage_code = "";
        this.privateVar.sameOrderEntity = null;
    },
    componentDidMount: function () {
        this.privateVar.productEntity = this.props.location.state;
        this.privateVar.status = 2;
        this.setState({});
    },
    getDialogItem: function (index) {
        // console.log("  ---"+index);
        if (index == 0) {
            return (<div style={{ padding: "5px 5px" }}>
                <div><span>入库单号：</span>
                    <span>{this.privateVar.sameOrderEntity.storage_no}</span></div>
                <div><span>当前状态：</span>
                    <span>{this.privateVar.sameOrderEntity.status_name}</span></div>
                <div><span>目的仓库：</span>
                    <span>{this.privateVar.sameOrderEntity.warehouse_name}</span></div>
                <div><span>物流跟踪号：</span>
                    <span>{this.privateVar.sameOrderEntity.track_no}[{this.privateVar.sameOrderEntity.track_type_name}]</span></div>
            </div>);
        } else {
            if (index <= 1) {
                return (<div></div>);
            }
            var itemobj = this.privateVar.sameOrderEntity.products[index - 1];
            return (<div className="willindetail_dialog_item" style={{ backgroundColor: "#ffffff", marginTop: "8px", padding: "5px 5px" }}>
                <div style={{
                    wordBreak: "break-all", wordWrap: "break-word", whiteSpace: "pre-wrap", color: "#4A4A4A"
                }}>{itemobj.name == "" ? "商品名缺失" : itemobj.name}</div>
                <div><span>商品编码：{itemobj.external_no}</span><span style={{ float: "right", color: "#039FFF" }}>数量：{itemobj.nums}</span></div>
            </div>);
        }
    },
    showSameOrder: function (code, ele) {
        var component = this;
        //查看同单号商品
        this.privateVar.params1.storage_code = code;
        // console.log("val-----");
        // console.log(this.privateVar.params1);
        var url = gVar.getBASE_URL() + 'Storage/get';
        gVar.sendRequest(this.privateVar.params1, url, this.dealshowSameOrder)
        // $.ajax({
        //     data: this.privateVar.params1,
        //     url: gVar.getBASE_URL() + 'Storage/get',
        //     dataType: 'json',
        //     cache: false,
        //     success: function (val) {
        //         console.log(val);
        //         if (val.error == 0) {
        //             component.privateVar.sameOrderEntity=val.data;
        //             var count=0;
        //             if(component.privateVar.sameOrderEntity.products!=null&&component.privateVar.sameOrderEntity.products!=undefined){
        //                 count=component.privateVar.sameOrderEntity.products.length;
        //             }
        //            showDialog("同单号其它商品", <ReactList itemRenderer={this.getDialogItem} length={count+1} />, null, null);
        //         } else {
        //             toast('加载数据失败！');
        //         }
        //     }.bind(this),
        //     error: function (xhr, status, err) {
        //         toast('加载数据失败！');
        //     }
        // });
    },

    dealshowSameOrder(data) {
        var component = this;
        component.privateVar.sameOrderEntity = data.data;
        var count = 0;
        if (component.privateVar.sameOrderEntity.products != null && component.privateVar.sameOrderEntity.products != undefined) {
            count = component.privateVar.sameOrderEntity.products.length;
        }
        showDialog("同单号其它商品", <div style={{height:"40vh",overflow:"scroll"}}><ReactList itemRenderer={this.getDialogItem} length={count + 1} /></div>, null, null);
    },

    getItem: function (index) {
        var component = this;
        if (index == 0) {
            var name = this.privateVar.productEntity.name;
            if (this.privateVar.productEntity.name == null || this.privateVar.productEntity.name == undefined || this.privateVar.productEntity.name == '') {
                name = '缺失商品名';
            }
            return (<div>
                <div className="willin_item" style={{color:"#4A4A4A"}}>{name}</div>
                <div className="willin_item" style={{color:"#4A4A4A"}}>商品编码：{this.privateVar.productEntity.external_no}</div>
            </div>);
        } else {
            if (index < 1) {
                return (<div></div>);
            }
            var itemObj = this.privateVar.productEntity.stock[index - 1];
            var items = new Array();
            var count = 0;
            if (itemObj.detail != null && itemObj.detail != undefined) {
                $.each(itemObj.detail, function (index, obj) {
                    if (obj.storages != null && obj.storages != undefined) {
                        $.each(obj.storages, function (key, value) {
                            items.push(<tr><td colSpan="3" style={{
                                borderTop: "1px dashed #ddd"
                            }}>
                                <div className="willin_item"><div className="willin_item_left">创建时间：</div><div className="willin_item_right">{value.created_time}</div></div>
                                <div className="willin_item"><div className="willin_item_left">入库单号：</div><div className="willin_item_right" style={{
                                    color: "#039FFF"
                                }}>{value.storage_no}</div></div>
                                <div className="willin_item"><div className="willin_item_left">物流单号：</div><div className="willin_item_right">{value.track_no}</div></div>
                                <div className="willin_item"><div className="willin_item_left">物流方式：</div><div className="willin_item_right">{value.track_type_name}</div></div>
                                <div className="willin_item"><div className="willin_item_left">数量：</div><div className="willin_item_right">{value.nums}</div></div>
                                <div className="willin_item other_commodity" onClick={component.showSameOrder.bind(this, value.storage_code) }>同单其它商品</div>
                            </td></tr>);
                        });
                    }
                    count += parseInt(obj.stock);
                });
            }

            // for (var i = 0; i < 3; i++) {
            //     items.push(<tr><td colSpan="3" style={{
            //         borderTop: "1px dashed #ddd"
            //     }}>
            //         <div className="willin_item"><div className="willin_item_left">创建时间：</div><div className="willin_item_right">2016-03-14 9: 32: 14</div></div>
            //         <div className="willin_item"><div className="willin_item_left">入库单号：</div><div className="willin_item_right" style={{
            //             color: "#039FFF"
            //         }}>DS5454545454</div></div>
            //         <div className="willin_item"><div className="willin_item_left">物流单号：</div><div className="willin_item_right">ASDF65456FD4F56D</div></div>
            //         <div className="willin_item"><div className="willin_item_left">物流方式：</div><div className="willin_item_right">普通物流</div></div>
            //         <div className="willin_item"><div className="willin_item_left">数量：</div><div className="willin_item_right">9</div></div>
            //         <div className="willin_item other_commodity" onClick={this.showSameOrder.bind(this) }>同单其它商品</div>
            //     </td></tr>);
            // }
            return (<table className="table">
                <thead><tr style={{ width: "100%", backgroundColor: "#e5e5e5" }}>
                    <td className="willin_item_left" style={{
                        paddingRight: "0px",
                        color:"#4A4A4A"
                    }}>待入仓库：</td>
                    <td className="willin_item_right1" style={{
                        paddingLeft: "0px",
                        color:"#4A4A4A"
                    }}>{itemObj.warehouse_name}</td>
                    <td className="willin_item_right2" style={{
                        paddingLeft: "0px", textAlign: "right",
                        color:"#4A4A4A"
                    }}>数量：{count}</td>
                </tr></thead>
                <tbody style={{ backgroundColor: "#eeeeee" }}>
                    {items}
                </tbody>
            </table>);
        }
    },
    render: function () {
        var innerView;
        if (this.privateVar.status == 1) {
            innerView = (<LoadingView />);
        } else if (this.privateVar.status == 2) {
            //<ReactList itemRenderer={this.getItem} length="20" />
            var size = 0;
            if (this.privateVar.productEntity.stock != null && this.privateVar.productEntity.stock != undefined) {
                size = this.privateVar.productEntity.stock.length;
            }
            innerView = (<ReactList itemRenderer={this.getItem} length={size + 1} />);
        } else if (this.privateVar.status == 3) {
            innerView = (<div style={{ textAlign: "center", marginTop: "25px", fontSize: "16px" }}>数据加载失败!</div>);
        }
        return (<div className="titlebar_extend_head">
            <TitleBar  save="待入库商品详情"/>
            <div className="titlebar_head_down " style={{
                paddingTop: gVar.Padding_titlebar,
                paddingLeft: "5px", paddingRight: "5px"
            }}>
                {innerView}
            </div>
        </div>);
    }
});
module.exports = WillInDetail;