require("../../fragments/order/css/orderlist.css");
require("../orderdetail/css/orderdetail.css");
require("./css/predictdetail.css");
var React = require("react");
var gVar = require("../../main/global.js");
var product = null;
var toast = require('../../util/Tips/tips.js');
var showDialog = require('../../components/BDialog/bdialog.js');

var PredictProduct = React.createClass({

    propTypes: {
        product: React.PropTypes.object.isRequired,
    },

    // product_code 确认入库的商品，不传表示确认所有的待确认入库的商品
    // 产品内部只有单个预报入库的功能，全部确认入库在详情页
    setConfirmStorage: function (product_code) {
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
            storage_code: this.props.product.storage_code,
            product_code: product_code,
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

    //复核弹出框
    setReviewStorage: function (product_code) {
        // alert("reConfirm");
        // var dlgBody = <ul><li>aaaaaaaaaaaaaa</li><li>bbbbbbbbbbbbb</li></ul>;
        var func = this;
        showDialog("请输入复核原因", "input", function (value) {
            console.log(value,product_code);
            func.ReviewStorageRequestNet(product_code, value);
        },"");
        // this.ReviewStorageRequestNet(product_code, "22222222");
    },

    //确认复核后请求网络
    ReviewStorageRequestNet(product_code, remark) {
        // console.log(remark);
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
            storage_code: this.props.product.storage_code,
            product_code: product_code,
            remark: remark,
        };
        $.ajax({
            data: params,
            async: true,
            url: gVar.getBASE_URL() + 'storage/review',
            dataType: 'json',
            cache: true,
            success: function (data) {
                // this.setState({ data: data });
                // this.dealConfirmStorage(data);
                // console.log(remark);
                this.dealReviewStorage(data, remark);
            }.bind(this),
            error: function (xhr, status, err) {
                // console.error(this.props.url, status, err.toString());
                toast(err.toString());
            }.bind(this)
        });
    },

    //确认复核后的处理
    dealReviewStorage: function (data, remark) {
        if (data != null) {
            if (data.error == 0) {
                //  alert("复核确认成功");
                toast("复核确认成功");
                //  $('#confirm').css({"display":"none"});
                product.status_name = "待复核"
                product.review_remark = remark;
            } else {
                toast(data.data);
                // alert(data.data);
                // console.log(data);
            }
        }
        this.setState({ data: data });
    },

    //确认预报后的入库处理
    dealConfirmStorage: function (data) {
        if (data != null) {
            if (data.error == 0) {
                // alert(data.data);
                //  $('#confirm').css({"display":"none"});
                // alert("确认成功");
                toast("确认成功");
                product.status_name = "已入库"
            } else {
                // alert(data.data);
                toast(data.data);
                // console.log(data);
                //  product.status_name="待复核"
                // product.review_remark="323243";
            }
        }
        this.setState({ data: data });
    },

    getInitialState() {
        product = this.props.product;
        return null;
    },

    render: function () {
        var statuName = product.status_name;
        var confirmDisplay = 'block';
        var reConfirmDisplay = 'block';
        var reConfirmReasonDisplay = 'none';
        // alert(statuName);
        if (statuName == "待确认" || statuName == "待复核" || statuName == "已复核") {
            if (statuName == "待复核") {
                confirmDisplay = 'block';
                reConfirmDisplay = 'none';
                reConfirmReasonDisplay = 'block';
                // $('#confirm').css({ display: "block" });
                // $('#reConfirm').css({ display: "none" });
                // $('#reConfirmReason').css({ display: "block" });
            } else {
                reConfirmReasonDisplay = 'none';
                // $('#reConfirmReason').css({ display: "none" });
            }
        } else {
            confirmDisplay = 'none';
            reConfirmDisplay = 'none';
            // $('#confirm').css({ display: "none" });
            // $('#reConfirm').css({ display: "none" });
        }
        // console.log(product);
        return (
            <div style={{ padding:"6px" }}>
                <div className="orderdetail_background_img" style={{marginTop:"0px"}}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td className="orderdetail_left">商品编码: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="productCode">{product.external_no}</span>
                                        <span ref="upcCode" className="predictdetail_right_span">{product.upc}</span>
                                        <span className="predictdetail_right_span">UPC: </span>
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
                            <td className="orderdetail_left">预报/入库: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span >{product.nums}</span>
                                        <span >/</span>
                                        <span >{product.real_nums}</span>
                                        <span  className="predictdetail_right_span">{product.damaged_nums}</span>
                                        <span className="predictdetail_right_span">异常数量: </span>
                                    </div>
                                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                </div>
                            </td>
                        </tr>

                        <tr >
                            <td className="orderdetail_left">有效期: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span >{product.expired_date}</span>
                                    </div>
                                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="orderdetail_left">备 注: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="remarks">{product.remark.msg}</span>
                                    </div>
                                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="orderdetail_left">状 态: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <div style={{ display: "inline-block", width: "100%" }} className="orderdetail_right_div_padding">
                                        <span ref="status"  style={{ float: "left" }}>{product.status_name}</span>
                                        <button style={{ display: confirmDisplay }} onClick={this.setConfirmStorage.bind(this, product.product_code) } type="button" className="predictdetail_btn">确 认</button>
                                        <button style={{ display: reConfirmDisplay }} onClick={this.setReviewStorage.bind(this, product.product_code) } type="button" className="predictdetail_btn" >复 核</button>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr style={{ display: reConfirmReasonDisplay }}>
                            <td className="orderdetail_left">复核原因: </td>
                            <td className="orderdetail_right">
                                <div>
                                    <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
                                    <div className="orderdetail_right_div_padding">
                                        <span ref="remarks">{product.review_remark}</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = PredictProduct;