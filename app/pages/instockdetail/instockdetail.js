var React = require('react');
var ReactList = require('react-list');
require('./css/instockdetail.css');
var TitleBar = require('../../components/titlebar/titlebar.js');
var gVar = require("../../main/global.js");
var toast = require('../../util/Tips/tips.js');
var LoadingView = require('../../components/loadingview/loadingview.js');
//胡伟
//由于使用dialog方式弹出页面，导致reactlist不能在PC浏览器上不能正常滑动，但在移动端是可以正常滑动
var InStockDetail = React.createClass({
    privateVar: {
        params: {
            // app_debug: 1,
            // company_code: localStorage.getItem("company_code"),
            // user_code: localStorage.getItem('user_code'),
            product_code: ""
        },
        //1正在加载，2加载数据完毕，3加载失败
        status: 1,
        //仓库产品信息
        productEntity: null,
        //产品信息
        productDetailEntity: null
    },
    componentWillUnmount: function () {
        this.privateVar.status = 1;
        this.privateVar.productEntity = null;
        this.privateVar.productDetailEntity = null;
        this.privateVar.params.product_code = "";
    },
    componentDidMount: function () {
        console.log(this.props.location.state);
        this.privateVar.productEntity = this.props.location.state.data;
        this.privateVar.params.product_code = this.privateVar.productEntity.product_code;
        // console.log('----'+this.privateVar.params.product_code);
        var url = gVar.getBASE_URL() + "Product/get";
        gVar.sendRequest(this.privateVar.params, url, this.dealDataSource, true, this.errorCallback);

        // $.ajax({
        //     data: this.privateVar.params,
        //     url: gVar.getBASE_URL() + 'Product/get',
        //     dataType: 'json',
        //     cache: false,
        //     success: function (val) {
        //         console.log(val);
        //         if (val.error == 0) {
        //             this.privateVar.productDetailEntity = val.data;
        //             this.privateVar.status = 2;
        //             this.setState({});
        //         } else {
        //             this.privateVar.status = 3;
        //             toast('数据加载失败！');
        //             this.setState({});
        //         }
        //     }.bind(this),
        //     error: function (xhr, status, err) {
        //         this.privateVar.status = 3;
        //         toast('数据加载失败！');
        //         this.setState({});
        //     }.bind(this)
        // });
    },

    dealDataSource(val) {
        this.privateVar.productDetailEntity = val.data;
        this.privateVar.status = 2;
        this.setState({});
    },

    errorCallback(){
        this.privateVar.status = 3;
        this.setState({});
    },

    getItem: function (index) {
        if (index == 0) {
            var avail = 0;
            // var occupancy = 0;
            // var actual = 0;
            $.each(this.privateVar.productEntity.stock, function (index1, obj1) {
                if (obj1.detail != null && obj1.detail != undefined) {
                    $.each(obj1.detail, function (index2, obj2) {
                        //可用库存 =  仓库实际数量 + 允许超售库存量 - 订单占用库存量
                        avail += parseInt(obj2.stock) + parseInt(obj2.overdraft_stock) - parseInt(obj2.block_stock);
                        // occupancy += parseInt(obj2.block_stock);
                        // actual += parseInt(obj2.stock);
                    });
                }
            });
            return (<div>
                <div className="instock_item_info"><div className="instock_item_title">商品名称：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.name}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">UPC码：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.upc}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">商品编码：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.external_no}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">海关备案编号：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.customs_record_id}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">重量kg：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.weight + this.privateVar.productDetailEntity.weight_unit}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">长*款*高cm：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.product_length + "*" + this.privateVar.productDetailEntity.width + "*" + this.privateVar.productDetailEntity.height}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">申请价值：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.price + this.privateVar.productDetailEntity.price_unit}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">商品成分：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.ingredients}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">商品描述：</div><div className="instock_item_txt">{this.privateVar.productDetailEntity.detail}</div></div>
                <div className="instock_item_info"><div className="instock_item_title">可用库存总数：</div><div className="instock_item_txt">{avail}</div></div>
            </div>);
        } else {
            if (index <= 1) {
                return (<div></div>);
            }
            var itemObj = this.privateVar.productEntity.stock[index - 1];
            //仓库名
            var name = itemObj.warehouse_name;
            var availableCount = 0;
            var occupancyCount = 0;
            var incount = 0;
            var outcount = 0;
            var overdraftcount = 0;
            var diffcount = 0;
            var damagecount = 0;
            var actualcount = 0;
            if (itemObj.warehouse_name == null || itemObj.warehouse_name == undefined || itemObj.warehouse_name == '') {
                name = '缺失仓库名';
            }
            if (itemObj.detail != null && itemObj.detail != undefined) {
                $.each(itemObj.detail, function (index, obj) {
                    //可用
                    availableCount += parseInt(obj.stock) + parseInt(obj.overdraft_stock) - parseInt(obj.block_stock);
                    //占用
                    occupancyCount += parseInt(obj.block_stock);
                    //实际
                    actualcount += parseInt(obj.stock);
                    //入库
                    incount += parseInt(obj.in_stock);
                    //出库
                    outcount += parseInt(obj.out_stock);
                    //超售
                    // overdraftcount+=parseInt(obj.overdraft_stock);
                    //差异=盘亏-盘盈
                    diffcount += (parseInt(obj.shortage_stock) - parseInt(obj.overage_stock));
                    //
                    damagecount += parseInt(obj.damage_stock);
                });
            }
            return (<div className="table-responsive instock_list_item">
                <table className="table">
                    <thead>
                        <tr>
                            <td colSpan="2">
                                {name}
                            </td>
                            <td style={{
                                width: "30%",
                                textAlign: "right",
                                paddingRight: "0px"
                            }}>可用库存：</td><td style={{
                                width: "20%",
                                paddingLeft: "0px"
                            }}>{availableCount}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style={{
                            width: "30%",
                            textAlign: "right",
                            paddingRight: "0px"
                        }}>总入库数量：</td><td style={{
                            width: "20%",
                            paddingLeft: "0px"
                        }}>{incount}</td><td style={{
                            width: "30%",
                            textAlign: "right",
                            paddingRight: "0px"
                        }}>总出库数量：</td><td style={{
                            width: "20%",
                            paddingLeft: "0px"
                        }}>{outcount}</td></tr>
                        <tr><td style={{
                            width: "30%",
                            textAlign: "right",
                            paddingRight: "0px"
                        }}>差异：</td><td style={{
                            width: "20%",
                            paddingLeft: "0px"
                        }}>{diffcount}</td><td style={{
                            width: "30%",
                            textAlign: "right",
                            paddingRight: "0px"
                        }}>损耗：</td><td style={{
                            width: "20%",
                            paddingLeft: "0px"
                        }}>{damagecount}</td></tr>
                        <tr><td style={{
                            width: "30%",
                            textAlign: "right",
                            paddingRight: "0px"
                        }}>实际数量：</td><td style={{
                            width: "20%",
                            paddingLeft: "0px"
                        }}>{actualcount}</td><td style={{
                            width: "30%",
                            textAlign: "right",
                            paddingRight: "0px"
                        }}>订单占用：</td><td style={{
                            width: "20%",
                            paddingLeft: "0px"
                        }}>{occupancyCount}</td></tr>
                    </tbody>
                </table>
            </div>);
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
        return (<div className="titlebar_extend_head" >
            <TitleBar  save="在库商品详情"/>
            <div className="titlebar_head_down orderdetail_head" style={{ paddingTop: gVar.Padding_titlebar }}>
                {innerView}
            </div>
        </div>);
    }
});
module.exports = InStockDetail;