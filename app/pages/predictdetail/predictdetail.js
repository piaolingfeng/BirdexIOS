require("../../fragments/order/css/orderlist.css");
require("../orderdetail/css/orderdetail.css");
require("./css/predictdetail.css");
var React = require("react");
var gVar = require("../../main/global.js");
var TitleBar = require('../../components/titlebar/titlebar.js');
var PredictProduct = require('./predictproduct.js')
var toast = require('../../util/Tips/tips.js');
var Data = null;
// var ListView = require('../../components/listview/listview.js');

var PredictDetail = React.createClass({

    componentDidMount: function () {
        this.getPredictDetail();
    },

    //获取预报详情
    getPredictDetail: function () {
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
            storage_code: this.props.location.state.storage_code,
        };
        $.ajax({
            data: params,
            async: true,
            url: gVar.getBASE_URL() + 'Storage/get',
            dataType: 'json',
            cache: true,
            success: function (data) {
                // this.setState({ data: data });
                // console.log(data);
                // this.setState({ data: "data" });
                this.dealPredicitDetail(data);
            }.bind(this),
            error: function (xhr, status, err) {
                // console.error(this.props.url, status, err.toString());
                toast(err.toString());
            }.bind(this)
        });
    },

    //处理预报详情
    dealPredicitDetail(data) {
        // console.log(data);
        if (data != null) {
            if (data.error == 0) {
                Data = data;
            } else {
                // console.log(data.data);
                toast(data.data);
            }
        }
        this.setState({ data: "" });
    },

    //product_code 确认入库的商品，不传表示确认所有的待确认入库的商品
    setConfirmStorage: function () {
        // console.log("dddddd");
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
            storage_code: Data.data.storage_code,
            // product_code:product_code,
        };
        $.ajax({
            data: params,
            async: true,
            url: gVar.getBASE_URL() + 'storage/confirm',
            dataType: 'json',
            cache: true,
            success: function (data) {
                // this.setState({ data: data });
                // console.log(data);
                // this.setState({ data: "data" });
                this.dealConfirmStorage(data);

            }.bind(this),
            error: function (xhr, status, err) {
                // console.error(this.props.url, status, err.toString());
                toast(err.toString());
            }.bind(this)
        });
    },

    //确认预报后的入库处理
    dealConfirmStorage: function (data) {
        if (data != null) {
            if (data.error == 0) {
                // alert(data.data);
                //  $('#confirm').css({"display":"none"});
                // alert("确认成功");
                toast("确认成功");
                var products = Data.data.products;
                for (var i = 0; i < products.length; i++) {
                    Data.data.products[i].status_name = "已入库";
                    // console.log(Data.data.products[i].status_name,i);
                }
                // product.status_name="已入库"
            } else {
                // alert(data.data);
                toast(data.data);
                // var products = Data.data.products;
                // for (var i = 0; i < products.length; i++) {
                //     Data.data.products[i].status_name = "已入库";
                    // console.log(Data.data.products[i].status_name,i);
                // }
                // console.log(data);
                //  product.status_name="待复核"
                // product.review_remark="323243";
            }
        }
        this.setState({ data: "" });
    },

    //初始化
    getInitialState() {
        Data = null;
        return null;
    },

    render: function () {
        if (!Data || !Data.data)
            return null;
        var detailData = Data.data;
        var products = new Array();
        if (detailData.products != null) {
            for (var i = 0; i < detailData.products.length; i++) {
                // console.log(detailData.products[i]);
                products.push(<PredictProduct product = {detailData.products[i]}/>);
            };
        }
        // console.log(detailData);
        var errorDisplay = "block";
        if(detailData.verify_fail_detail == null || detailData.verify_fail_detail == ""){
            errorDisplay = 'none';
        }
        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }} >
                <TitleBar  save="预报详情"/>
                <div className="orderdetail_head titlebar_head_down" style={{ paddingTop: gVar.Padding_titlebar }}>
                    <div className="orderdetail_background_img">
                        <table style={{ width: "100%" }}>
                            <tr>
                                <td className="orderdetail_left">当前状态: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span ref="predictStatus">{detailData.status_name}</span>
                                            <span onClick={this.setConfirmStorage} className="orderdetail_status orderdetail_right_blue_color">批量确认预报</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">目的仓库: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span ref="targetWarehouse">{detailData.warehouse_name}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">所在仓库: </td>
                                <td className="orderdetail_right">
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="warehouse">{detailData.old_warehouse_name}</span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">物流号: </td>
                                <td className="orderdetail_right">
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="LogisticsNum">{detailData.track_no}</span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">备 注: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span ref="remarks">{detailData.remark}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">更新时间: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span ref="updateTime">{detailData.updated_time}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="orderdetail_left">创建时间: </td>
                                <td className="orderdetail_right">
                                    <div>
                                        <div className="orderdetail_right_div_padding">
                                            <span ref="creatTime">{detailData.created_time}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <div style={{display:errorDisplay,padding:"6px",color:"red"}}>{detailData.verify_fail_detail}</div>
                            </tr>
                        </table>
                    </div>
                    {products}

                </div>
            </div>
        );
    }

});

module.exports = PredictDetail;