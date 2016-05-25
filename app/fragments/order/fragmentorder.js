var React = require('react');
var gVar = require('../../main/global.js');
var Status = require('./status.js');
var TitleBar = require('../../components/titlebar/titlebar.js');
var Search = require('../../components/search/search.js');
var OrderList = require('./orderlist.js');
var ListView = require('../../components/listview/listview.js');
var toast = require('../../util/Tips/tips.js');
var orderList = null;

// var statusNameList = null;
var timeNameList = null;
// var warehouseNameList = null;

var statusList = null;
var warehouseList = null;
var timeUtil = require('../../util/timeUtil.js');//时间工具类
var timeList = ["不限时间", "今日", "近一周", "近一个月", "近三个月", "近一年"];
var timeStartList = ['', timeUtil.getCurrentDateFormat(),
    timeUtil.getNearWeek(), timeUtil.getNearMouth(),
    timeUtil.getNearThreeMouth(), timeUtil.getNearYear()];
var requestEntity = null;
var dataCount = 0;

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   


var FragmentOrder = React.createClass({

    propTypes: {
        todayDataName: React.PropTypes.string,
    },

    warehouseFunc(index) {
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        requestEntity.warehouse_code = warehouseList[index].warehouse_code;
        this.getOrderList();
    },

    statusFunc(index) {
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        requestEntity.status = statusList[index].status;
        requestEntity.statusName = statusList[index].status_name;
        this.getOrderList();
    },

    timeFunc(index) {
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        var end_date = '';
        if (index != 0) {
            end_date = timeUtil.getCurrentDateFormat();
        }
        if (statusList[index].status_name.indexOf("已出库") >= 0) {
            requestEntity.checkout_start_date = timeStartList[index];
            requestEntity.checkout_end_date = end_date;
        } else {
            if (statusList[index].status_name.indexOf("已签收") >= 0) {
                requestEntity.sign_start_date = timeStartList[index];
                requestEntity.sign_end_date = end_date;
            } else {
                requestEntity.start_date = timeStartList[index];
                requestEntity.end_date = end_date;
            }
        }
        this.getOrderList();
    },

    SearchFunc(value) {//搜索回调
        requestEntity.keyword = value;
        console.log(requestEntity);
        this.getOrderList();
    },
    //简化状态
    dealOrderStatus() {
        var dealStatus = ['全部状态', "待审核", "等待出库", "出库中", "已出库", "运输中",
            "已签收", "身份证异常", "库存异常", "审核不通过", "已取消"];
        var reStatusList = new Array();
        for (var length = 0; length < dealStatus.length; length++) {
            for (var i = 0; i < statusList.length; i++) {
                var name = statusList[i].status_name;
                if (dealStatus[length] == name) {
                    reStatusList.push(statusList[i]);
                    break;
                }
            }
        }
        statusList = reStatusList;
        // console.log(statusList);
    },

    //处理订单列表的逻辑
    dealOrderList(data) {
        if (data != null) {
            if (data.error == 0) {
                dataCount = data.data.count;//赋值
                // console.log(dataCount);
                if (requestEntity.page_no > 1) {
                    if (data.data.orders.length == 0 && requestEntity.page_no > 1) {
                        // T.showShort(MyApplication.getInstans(), "已经是最后一页");
                        toast("已经是最后一页");
                    } else {
                        // OrderAdapter.getList().addAll(orderListEntities.getData().getOrders());
                        // orderListEntities.getData().setOrders(OrderAdapter.getList());
                        for (var i = 0; i < data.data.orders.length; i++) {
                            orderList.push(<OrderList orderEntity={data.data.orders[i]}/>);
                        }
                    }
                }
                else {
                    var list = [];
                    console.log(gVar.createOrderEntity());
                    // orderList = data.data.orders;
                    for (var i = 0; i < data.data.orders.length; i++) {
                        list.push(<OrderList orderEntity={data.data.orders[i]}/>);
                    }
                    orderList = list;//将数据给orderlist
                }
            } else {
                // console.log(data.data);
                toast(data.data);
            }
        }
        this.setState({ data: "" });
    },

    //获取订单列表：请求网络方法
    getOrderList: function () {
        // var param =requestEntity;
        console.log(requestEntity);
        $.ajax({
            data: requestEntity,
            async: true,
            url: gVar.getBASE_URL() + 'order/all',
            dataType: 'json',
            cache: false,
            success: function (data) {
                // this.setState({ data: data })
                this.dealOrderList(data);
                // console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                toast(err.toString());
                // console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    //获取所有仓库
    getAllWarehouse: function () {
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
        };
        $.ajax({
            data: params,
            async: true,
            url: gVar.getBASE_URL() + 'Warehouse/companyAll',
            dataType: 'json',
            cache: true,
            success: function (data) {
                // this.setState({ data: data });
                warehouseList = data.data;
                warehouseList.splice(0, 0, { name: '全部仓库', warehouse_code: '' });
                // console.log(warehouseList);
                this.setState({ data: "data" });
            }.bind(this),
            error: function (xhr, status, err) {
                // console.error(this.props.url, status, err.toString());
                toast(err.toString());
            }.bind(this)
        });
    },
    //获取订单所有状态
    getOrderListState: function () {
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
        };
        $.ajax({
            data: params,
            async: true,
            url: gVar.getBASE_URL() + 'order/getOrderStatusList',
            dataType: 'json',
            cache: true,
            success: function (data) {
                // this.setState({ data: data });
                statusList = data.data;
                statusList.splice(0, 0, { status: '', status_name: '全部状态' });
                this.dealOrderStatus();
                // console.log(statusList);
                this.setState({ data: "data" });
            }.bind(this),
            error: function (xhr, status, err) {
                // console.error(this.props.url, status, err.toString());
                toast(err.toString());
            }.bind(this)
        });
    },

    //今日数据进入后的回调方法设置参数请求网络
    todaySetParams: function (statusIndex, timeindex) {
        // console.log(statusIndex,timeindex);
        var end_date = '';
        if (timeindex != 0) {
            end_date = timeUtil.getCurrentDateFormat();
        }
        // console.log(statusIndex,timeStartList);
        requestEntity.start_date = timeStartList[timeindex];
        requestEntity.end_date = end_date;
        requestEntity.status = statusList[statusIndex].status;
        //  console.log(statusList,"dd")
        this.getOrderList();
    },

    //上拉加载
    pullUpEvent() {
        requestEntity.page_no++;
        this.getOrderList();
    },

    //初始化
    getInitialState() {
        // console.log("FragmentOrder");
        console.log('fragmentorder getInitialState');
        dataCount = 0;
        orderList = new Array();
        statusList = new Array(gVar.createStatusEntity());
        // warehouseList = new Array({name:'',warehouse_code:''});
        warehouseList = new Array(gVar.createWarehouseEntity());
        requestEntity = gVar.createRequestEntity();//按照工厂方法创建初始实体类
        // var time = new Date().Format("yyyy-MM-dd");
        // console.log(time.get);
        // console.log(timeUtil.getCurrentDateFormat());
        // console.log(timeUtil.getNearWeek());
        // console.log(timeUtil.getNearMouth());
        // console.log(timeUtil.getNearThreeMouth());
        // console.log(timeUtil.getNearYear());
        return null;
    },

    getItem: function (index) {
        return orderList;
    },

    componentDidMount() {
        console.log('fragmentorder componentDidMount');
        this.getAllWarehouse();
        this.getOrderListState();//获取所有状态
        if (!this.props.todayDataName) {
            this.getOrderList();
        }//否则由status回调todaySetParams来请求网络参数
        // console.log(requestEntity);
    },

    render: function () {
        // console.log(warehouseList);
        // console.log(statusList);
        var list = <ListView getItems={this.getItem} marginTop={180} pullUpHandler={this.pullUpEvent} backGroud={gVar.Color_background}/>;
        if(orderList!=null && orderList.length==0){
            list = <div style={{width:"100%",height:"100%",textAlign:"center",fontSize:"22px",marginTop:"100px"}}>暂时没有数据哦！</div>;
        }
        return (
            <div style={{ backgroundColor: gVar.Color_background }}>
                <Search SearchFunc={this.SearchFunc}/>
                <Status warehouseFunc={this.warehouseFunc}
                    statusFunc={this.statusFunc}
                    timeFunc={this.timeFunc}
                    warehouseList={warehouseList}
                    statusList={statusList}
                    timeList={timeList}
                    todayDataName={this.props.todayDataName}
                    todaySetParams={this.todaySetParams}
                    dataCount={dataCount}/>
                <div >
                    {list}
                </div>
            </div>
        );
    }

});

module.exports = FragmentOrder;