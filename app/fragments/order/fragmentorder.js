var React = require('react');
var gVar = require('../../main/global.js');
var Status = require('./status.js');
var TitleBar = require('../../components/titlebar/titlebar.js');
var Search = require('../../components/search/search.js');
var OrderList = require('./orderlist.js');
var ListView = require('../../components/listview/listviewindex.js');
var toast = require('../../util/Tips/tips.js');

var EventBus = require('eventbusjs');
var orderList = new Array();

// var statusNameList = null;
// var timeNameList = null;
// var warehouseNameList = null;

var statusList = new Array();
var warehouseList = new Array();

var timeUtil = require('../../util/timeUtil.js');//时间工具类
// var timeList = ["不限时间", "今日", "近一周", "近一个月", "近三个月", "近一年"];
// var timeStartList = ['', timeUtil.getCurrentDateFormat(),
//     timeUtil.getNearWeek(), timeUtil.getNearMouth(),
//     timeUtil.getNearThreeMouth(), timeUtil.getNearYear()];
var requestEntity = null;//请求网络实体
// var dataCount = 0;//数据统计
// var orderPosition = 0;//用来做orderlist的位置缓存
// var Data = null;//请求网络后的数据保存
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
var listviewInd = null;
var FragmentOrder = React.createClass({
    myScroll: "",
    dataCount: 0,
    orderPosition: 0,

    params: {
        timeList: ["不限时间", "今日", "近一周", "近一个月", "近三个月", "近一年"],
        timeStartList: ['', timeUtil.getCurrentDateFormat(),
            timeUtil.getNearWeek(), timeUtil.getNearMouth(),
            timeUtil.getNearThreeMouth(), timeUtil.getNearYear()],
    },
    // privateParams:{
    //     listviewInd:"",
    // },

    propTypes: {
        todayDataName: React.PropTypes.string,
    },
    //仓库筛选回调
    warehouseFunc(index) {
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        requestEntity.warehouse_code = warehouseList[index].warehouse_code;
        requestEntity.warehouse_name = warehouseList[index].name;
        // console.log(requestEntity);
        this.getOrderList();
    },
    //状态筛选回调
    statusFunc(index) {
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        requestEntity.status = statusList[index].status;
        requestEntity.statusName = statusList[index].status_name;
        this.getOrderList();
    },
    //时间选择回调
    timeFunc(index) {
        requestEntity.time_name = this.params.timeList[index];
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        var end_date = '';
        if (index != 0) {
            end_date = timeUtil.getCurrentDateFormat();
        }
        if (requestEntity.statusName.indexOf("已出库") >= 0) {
            requestEntity.checkout_start_date = this.params.timeStartList[index];
            requestEntity.checkout_end_date = end_date;
            requestEntity.sign_start_date = "";
            requestEntity.sign_end_date = "";
            requestEntity.start_date = "";
            requestEntity.end_date = "";
        } else {
            if (requestEntity.statusName.indexOf("已签收") >= 0) {
                requestEntity.sign_start_date = this.params.timeStartList[index];
                requestEntity.sign_end_date = end_date;
                requestEntity.checkout_start_date = "";
                requestEntity.checkout_end_date = "";
                requestEntity.start_date = "";
                requestEntity.end_date = "";
            } else {
                requestEntity.start_date = this.params.timeStartList[index];
                requestEntity.end_date = end_date;
                requestEntity.checkout_start_date = "";
                requestEntity.checkout_end_date = "";
                requestEntity.sign_start_date = "";
                requestEntity.sign_end_date = "";
            }
        }
        this.getOrderList();
    },
    //搜索回调
    SearchFunc(value) {
        requestEntity.keyword = value;
        console.log(requestEntity);
        this.getOrderList();
    },
    //简化订单状态
    dealOrderStatus(data) {
        statusList = data.data;
        statusList.splice(0, 0, { status: '', status_name: '全部状态' });
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
        this.dealDashBorad();
        // console.log(statusList);
    },

    //处理订单列表的逻辑
    dealOrderList(data) {
        this.dataCount = data.data.count;//赋值
        // console.log(data.data);
        if (requestEntity.page_no > 1) {
            if (data.data.orders.length == 0 && requestEntity.page_no > 1) {
                // T.showShort(MyApplication.getInstans(), "已经是最后一页");
                toast("已经是最后一页");
                // return ;
            } else {
                // OrderAdapter.getList().addAll(orderListEntities.getData().getOrders());
                // orderListEntities.getData().setOrders(OrderAdapter.getList());
                for (var i = 0; i < data.data.orders.length; i++) {
                    orderList.push(<OrderList orderEntity={data.data.orders[i]}
                        cacheOrderListFunc={this.cacheOrderListFunc} position = {orderList.length}/>);
                }
            }
        }
        else {
            var list = [];
            // console.log(gVar.createOrderEntity());
            // orderList = data.data.orders;
            for (var i = 0; i < data.data.orders.length; i++) {
                // console.log(data.data.orders[i]);
                list.push(<OrderList orderEntity={data.data.orders[i]}
                    cacheOrderListFunc={this.cacheOrderListFunc} position = {orderList.length + i}/>);
            }
            orderList = list;//将数据给orderlist
        }
        // console.log(orderList);
        this.setState({});
    },

    //获取订单列表：请求网络方法
    getOrderList: function (myScroll) {
        // var param =requestEntity;
        console.log(requestEntity);
        var url = gVar.getBASE_URL() + 'order/all';
        gVar.sendRequest(requestEntity, url, this.dealOrderList);
    },

    //获取所有仓库
    getAllWarehouse: function () {
        var params = {};
        var url = gVar.getBASE_URL() + 'Warehouse/companyAll';
        gVar.sendRequest(params, url, this.dealWarehouse);
    },

    dealWarehouse(data) {
        warehouseList = data.data;
        warehouseList.splice(0, 0, { name: '全部仓库', warehouse_code: '' });
        this.setState({});
    },

    //处理数据看板进入时
    dealDashBorad: function () {
        if (statusList != null && statusList.length != 0) {
            if (this.props.todayDataName) {
                if (this.props.todayDataName.indexOf("今日") >= 0) {//今日时间
                    requestEntity.time_name = this.params.timeList[1];
                    requestEntity.start_date = this.params.timeStartList[1];
                    requestEntity.end_date = timeUtil.getCurrentDateFormat();;
                }
                // console.log("timePosition"+timePosition);
                //状态设置
                for (var i = 0; i < statusList.length; i++) {
                    if (this.props.todayDataName.indexOf(statusList[i].status_name) >= 0) {
                        requestEntity.status = statusList[i].status;
                        requestEntity.statusName = statusList[i].status_name;
                        break;
                    }
                }
                this.getOrderList();//请求网络的参数填充好后就请求网络
            } else {
                this.setState({});
            }
        }
    },

    //获取订单所有状态
    getOrderListState: function () {
        var params = {};
        var url = gVar.getBASE_URL() + 'order/getOrderStatusList';
        gVar.sendRequest(params, url, this.dealOrderStatus);

    },

    // 缓存RequestEntity，orderList,position
    cacheOrderListFunc(position) {
        sessionStorage.setItem("OrderRequestEntity", JSON.stringify(requestEntity));
        sessionStorage.setItem("OrderPostion", position);
        // sessionStorage.setItem("orderList", JSON.stringify(orderList));
        // requestEntity =  JSON.parse(sessionStorage.getItem("OrderRequestEntity"));
        // var de = sessionStorage.getItem("OrderPostion");
        // orderList = JSON.parse(sessionStorage.getItem("orderList"));
        console.log(position);
        // console.log(de);
        // console.log(orderList);
    },

    //通过详情页面发出一个事件,清除缓存
    // clearCacheOrderListFunc() {
    //     // console.log("clearCacheOrderListFunc");直接清除的话会影响其他页面传递的属性，属性也是通过sessionStorage保存的
    //     sessionStorage.removeItem("OrderRequestEntity");
    //     sessionStorage.removeItem("OrderPostion");
    //     // sessionStorage.clear();
    // },

    // //今日数据进入后的回调方法设置参数请求网络
    // todaySetParams: function (statusIndex, timeindex) {
    //     // console.log(statusIndex,timeindex);
    //     var end_date = '';
    //     if (timeindex != 0) {
    //         end_date = timeUtil.getCurrentDateFormat();
    //     }
    //     // console.log(statusIndex,timeStartList);
    //     requestEntity.start_date = timeStartList[timeindex];
    //     requestEntity.end_date = end_date;
    //     requestEntity.status = statusList[statusIndex].status;
    //     //  console.log(statusList,"dd")
    //     this.getOrderList();
    // },

    //上拉加载
    pullUpEvent(myScroll) {
        requestEntity.page_no++;
        this.getOrderList(myScroll);
    },

    getCoreObject(myScroll) {
        console.log('myscroll get')
        this.myScroll = myScroll;
    },

    //初始化
    getInitialState() {
        // console.log("FragmentOrder");
        console.log('fragmentorder getInitialState');
        // dataCount = 0;
        // orderList = new Array();
        // statusList = new Array();//gVar.createStatusEntity()
        // warehouseList = new Array({name:'',warehouse_code:''});
        // warehouseList = new Array();//gVar.createWarehouseEntity()
        // if (!this.props.todayDataName) {
        //     this.getOrderList();
        // }
        // requestEntity = gVar.createRequestEntity();//按照工厂方法创建初始实体类
        // var time = new Date().Format("yyyy-MM-dd");
        // console.log(time.get);
        // console.log(timeUtil.getCurrentDateFormat());
        // console.log(timeUtil.getNearWeek());
        // console.log(timeUtil.getNearMouth());
        // console.log(timeUtil.getNearThreeMouth());
        // console.log(timeUtil.getNearYear());
        return null;
    },

    //listview获取item
    getItem: function (index) {
        return orderList;
    },
    // 滚动到顶部
    scrollToTop() {
        // if (listviewInd) {
        //     listviewInd.scrollToElement(1, 500);//500ms
        // }
        if(this.myScroll)
        this.myScroll.scrollToElement(document.querySelector('#scroller li:nth-child(' + 1 + ')'),500);
    },

    componentWillUnmount() {
        listviewInd = null;
        EventBus.removeEventListener("scrollToTop", this.scrollToTop, this);
    },

    //渲染完毕后再去调用refresh,隐藏动画,重新计算scroll item高度
    componentDidUpdate() {
        if (this.myScroll instanceof Object) {
            // console.log(this.myScroll, "scroll");
            // this.myScroll.refresh();
            this.myScroll.refresh();
        }
        // listviewInd.handRefresh();
        // console.log(this.privateParams.listviewInd,"ddd");
        // this.privateParams.listviewInd.scrollToElement(orderPosition);

    },
    //判断是否是恢复数据,再判断入口初始化数据
    componentDidMount() {
        // console.log(Data,"text");
        // console.log(EventBus.hasEventListener("clearCacheOrderList"))
        if (!EventBus.hasEventListener("scrollToTop"))//没有注册就注册
            EventBus.addEventListener("scrollToTop", this.scrollToTop, this);
        // var p = EventBus.getEvents();
        // console.log(p.toString());
        // EventBus.dispatch("clearCacheOrderList");//清除页面详情
        console.log('fragmentorder componentDidMount');
        if (warehouseList == null || warehouseList.length == 0) {
            this.getAllWarehouse();
            // console.log("getAllWarehouse");
        }
        if (statusList == null || statusList.length == 0) {
            this.getOrderListState();//获取所有状态
            // console.log("getOrderListState");
        }
        if (sessionStorage.getItem("OrderRequestEntity")) {

            requestEntity = JSON.parse(sessionStorage.getItem("OrderRequestEntity"));
            this.orderPosition = parseInt(sessionStorage.getItem("OrderPostion"));
            sessionStorage.removeItem("OrderRequestEntity");
            sessionStorage.removeItem("OrderPostion");
            // orderList = JSON.parse(sessionStorage.getItem("orderList"));
            console.log("获取本地缓存", this.orderPosition);
            // if (listviewInd) {
            //     // console.log(listviewInd, "ddd", (this.orderPosition + 1));
            //     listviewInd.scrollToElement(this.orderPosition + 1);
            // }
            if (listviewInd != null) {
                listviewInd.scrollToElement(this.orderPosition + 1);
            }
            // this.setState({});//恢复刷新的数据
        } else {//非返回界面，即正常人口
            // dataCount = 0;//不需要恢复状态的时候，在这里初始化变量
            requestEntity = gVar.createRequestEntity();
            orderList = new Array();
            if (!this.props.todayDataName) {
                this.getOrderList();
            } else {//否则由status回调todaySetParams来请求网络参数
                // var dataName = this.props.todayDataName;
                this.dealDashBorad();
            }
        }
        // console.log(requestEntity);
    },

    render: function () {
        // console.log(warehouseList);
        // console.log(statusList);
        var list = <ListView ref={function (theApp) { listviewInd = theApp; } } getItems={this.getItem} marginTop={180} pullUpHandler={this.pullUpEvent}
            backGroud={gVar.Color_background} getCoreObject={this.getCoreObject}/>;
        if (orderList != null && orderList.length == 0) {
            list = <div style={{ width: "100%", height: "100%", textAlign: "center", fontSize: "22px", marginTop: "100px" }}>暂时没有数据哦！</div>;
        }
        var keyword = null;
        if (requestEntity) {
            keyword = requestEntity.keyword;
        }
        return (
            <div style={{ backgroundColor: gVar.Color_background }}>
                <Search SearchFunc={this.SearchFunc} defaultText={keyword}/>
                <Status warehouseFunc={this.warehouseFunc}
                    statusFunc={this.statusFunc}
                    timeFunc={this.timeFunc}
                    warehouseList={warehouseList}
                    statusList={statusList}
                    timeList={this.params.timeList}
                    dataCount={this.dataCount}
                    requestEntity={requestEntity}/>
                <div >
                    {list}
                </div>
            </div>
        );
    }

});

module.exports = FragmentOrder;