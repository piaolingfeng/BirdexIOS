require("../../fragments/order/css/orderlist.css");
require("../orderdetail/css/orderdetail.css");
require("./css/predictdetail.css");
var React = require("react");
var gVar = require("../../main/global.js");
var TitleBar = require('../../components/titlebar/titlebar.js');
var PredictProduct = require('./predictproduct.js')
var toast = require('../../util/Tips/tips.js');
var EventBus = require('eventbusjs');
var ListView = require('../../components/listview/listviewindex.js');


// var Data = null;
// var ListView = require('../../components/listview/listview.js');

var PredictDetail = React.createClass({

    Data: null,
    myScroll: null,
    componentDidMount: function () {
        this.getPredictDetail();
    },

    componentWillUnmount() {
        EventBus.dispatch("clearCachePredictList");//清除页面详情
    },

    //获取预报详情
    getPredictDetail: function () {
        var params = {
            storage_code: this.props.location.state.storage_code,
        };
        var url = gVar.getBASE_URL() + 'Storage/get';
        gVar.sendRequest(params, url, this.dealPredicitDetail);
    },

    //处理预报详情
    dealPredicitDetail(data) {
        this.Data = data;
        this.setState({});
    },

    //product_code 确认入库的商品，不传表示确认所有的待确认入库的商品
    setConfirmStorage: function () {
        var params = {
            storage_code: this.Data.data.storage_code,
        };
        var url = gVar.getBASE_URL() + 'storage/confirm';
        gVar.sendRequest(params, url, this.dealConfirmStorage);
    },

    //确认预报后的入库处理
    dealConfirmStorage: function (data) {
        if (data.error == 0) {
            // alert(data.data);
            //  $('#confirm').css({"display":"none"});
            // alert("确认成功");
            toast("确认成功");
            var products = this.Data.data.products;
            for (var i = 0; i < products.length; i++) {
                this.Data.data.products[i].status_name = "已入库";
                // console.log(Data.data.products[i].status_name,i);
            }
            // product.status_name="已入库"
        }
        this.setState({});
    },

    componentDidUpdate() {
        if (this.myScroll != null)
            this.myScroll.refresh();
    },

    getItem() {
        var list = [];
        if (this.Data != null && this.Data.data != null) {

            var detailData = this.Data.data;
            // var products = new Array();
            var detailHead = <div className="orderdetail_head titlebar_head_down" style={{ paddingTop: gVar.Padding_titlebar }}>
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
                            <div style={{ display: errorDisplay, padding: "6px", color: "red" }}>{detailData.verify_fail_detail}</div>
                        </tr>
                    </table>
                </div>

            </div>
            list.push(detailHead);
            if (detailData.products != null) {
                for (var i = 0; i < detailData.products.length; i++) {
                    // console.log(detailData.products[i]);
                    list.push(<PredictProduct product = {detailData.products[i]}/>);
                };
            }
            // console.log(detailData);
            var errorDisplay = "block";
            if (detailData.verify_fail_detail == null || detailData.verify_fail_detail == "") {
                errorDisplay = 'none';
            }
        }
        return list;
    },

    getCoreObject(myScroll) {
        //  console.log(myScroll);
        this.myScroll = myScroll;
    },

    render: function () {
        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }} >
                <TitleBar  save="预报详情"/>
                <ListView  getItems={this.getItem} marginTop={0} pullUpHandler={this.pullUpEvent}
                    showUpload={false} showDownload={false}
                    backGroud={gVar.Color_background} getCoreObject={this.getCoreObject}/>
            </div>
        );
    }

});

module.exports = PredictDetail;