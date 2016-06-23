var React = require('react');
require('./css/prediction.css');
var gVar = require('../../main/global.js');
//一共四个组件组成的fragment
var PredictionList = require('./predictionlist.js');
var Status = require('../order/status.js');
var TitleBar = require('../../components/titlebar/titlebar.js');
var Search = require('../../components/search/search.js');
var ListView = require('../../components/listview/listviewindex.js');
var toast = require('../../util/Tips/tips.js');
// var EventBus = require('eventbusjs');
var predictList = new Array();

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
// var predictPosition = 0;//用来做orderlist的位置缓存
// var Data = null;//请求网络后的数据保存
var listviewInd = null;//listview的索引

var FragmentPrediciton = React.createClass({
    myScroll: "",
    dataCount: 0,
    predictPosition: 0,//用来做orderlist的位置缓
    params: {
        // requestEntity:Object,//请求网络实体
        timeList: ["不限时间", "今日", "近一周", "近一个月", "近三个月", "近一年"],
        timeStartList: ['', timeUtil.getCurrentDateFormat(),
            timeUtil.getNearWeek(), timeUtil.getNearMouth(),
            timeUtil.getNearThreeMouth(), timeUtil.getNearYear()],
    },

    propTypes: {
        todayDataName: React.PropTypes.string,
    },
    //仓库筛选回调
    warehouseFunc(index) {
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        requestEntity.warehouse_code = warehouseList[index].warehouse_code;
        requestEntity.warehouse_name = warehouseList[index].name;
        // console.log(requestEntity);
        this.getPredicitionList();
    },
    //状态筛选回调
    statusFunc(index) {
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        requestEntity.status = statusList[index].status;
        requestEntity.statusName = statusList[index].status_name;
        this.getPredicitionList();
    },
    //时间选择回调
    timeFunc(index) {
        requestEntity.page_no = '1';//状态切换时都要恢复page的页数
        var end_date = '';
        if (index != 0) {
            end_date = timeUtil.getCurrentDateFormat();
        }
        requestEntity.updated_start_date = this.params.timeStartList[index];
        requestEntity.updated_end_date = end_date;
        requestEntity.time_name = this.params.timeList[index];
        this.getPredicitionList();
    },

    //搜索回调
    SearchFunc(value) {
        requestEntity.keyword = value;
        console.log(requestEntity);
        this.getPredicitionList();
    },

    //简化预报状态
    dealPredictStatus(data) {
        statusList = data.data;
        statusList.splice(0, 0, { status: '', status_name: '全部状态' });
        var dealStatus = ["全部状态", "待审核", "待入库", "待确认", "已入库", "审核不通过"];
        // console.log(statusList);
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

    //处理预报列表的逻辑
    dealPredictList(data) {
        this.dataCount = data.data.count;//赋值
        console.log(data.data);
        if (requestEntity.page_no > 1) {
            if (data.data.storages.length == 0 && requestEntity.page_no > 1) {
                // T.showShort(MyApplication.getInstans(), "已经是最后一页");
                toast("已经是最后一页");
            } else {
                // OrderAdapter.getList().addAll(orderListEntities.getData().getOrders());
                // orderListEntities.getData().setOrders(OrderAdapter.getList());
                for (var i = 0; i < data.data.storages.length; i++) {
                    predictList.push(<PredictionList predictEntity={data.data.storages[i]}
                        cachePredictListFunc={this.cachePredictListFunc} position = {predictList.length}/>);
                }
            }
        }
        else {
            var list = [];
            // console.log(gVar.createOrderEntity());
            // orderList = data.data.orders;
            for (var i = 0; i < data.data.storages.length; i++) {
                list.push(<PredictionList predictEntity={data.data.storages[i]}
                    cachePredictListFunc={this.cachePredictListFunc} position = {i}/>);
            }
            predictList = list;//将数据给orderlist
        }
        this.setState({});
    },

    //获取预报列表：请求网络方法
    getPredicitionList: function (myScroll) {
        // console.log(requestEntity);
        var url = gVar.getBASE_URL() + 'Storage/all';
        gVar.sendRequest(requestEntity, url, this.dealPredictList);
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
                    requestEntity.updated_start_date = this.params.timeStartList[1];
                    requestEntity.updated_end_date = timeUtil.getCurrentDateFormat();;
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
                this.getPredicitionList();//请求网络的参数填充好后就请求网络
            } else {
                this.setState({});
            }
        }
    },

    //获取预报所有状态
    getPredicitionStatus: function () {
        var params = {};
        var url = gVar.getBASE_URL() + 'storage/getStorageStatusList';
        gVar.sendRequest(params, url, this.dealPredictStatus);
    },

    // 缓存RequestEntity，orderList,position
    cachePredictListFunc(position) {
        sessionStorage.setItem("PredictRequestEntity", JSON.stringify(requestEntity));
        sessionStorage.setItem("PredictPostion", position);
        // sessionStorage.setItem("orderList", JSON.stringify(orderList));
        // requestEntity =  JSON.parse(sessionStorage.getItem("PredictRequestEntity"));
        // var de = sessionStorage.getItem("PredictPostion");
        // orderList = JSON.parse(sessionStorage.getItem("orderList"));
        // console.log(requestEntity);
        // console.log(de);
        // console.log(orderList);
    },

    //通过详情页面发出一个事件,清除缓存
    // clearCachePredictListFunc() {
    //     // console.log("clearCacheOrderListFunc");直接清除的话会影响其他页面传递的属性，属性也是通过sessionStorage保存的
    //     sessionStorage.removeItem("PredictRequestEntity");
    //     sessionStorage.removeItem("PredictPostion");
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
    //     this.getPredicitionList();
    // },

    //上拉加载
    pullUpEvent(myScroll) {
        requestEntity.page_no++;
        this.getPredicitionList(myScroll);
    },

    getCoreObject(myScroll) {
        this.myScroll = myScroll;
    },

    getInitialState() {
        // console.log("FragmentPrediciton");
        // predictList = new Array();
        console.log('fragmentpredict getInitialState');
        // dataCount = 0;
        // predictList = new Array();
        // statusList = new Array(gVar.createStatusEntity());
        // // warehouseList = new Array({name:'',warehouse_code:''});
        // warehouseList = new Array(gVar.createWarehouseEntity());
        // requestEntity = gVar.createRequestEntity();//按照工厂方法创建初始实体类
        return null;
    },

    // 滚动到顶部
    scrollToTop() {
        if (this.myScroll)
            this.myScroll.scrollToElement(document.querySelector('#scroller li:nth-child(1)'), 500);
    },

    getItem: function (index) {
        return predictList;
    },
    //渲染完毕后再去调用refresh,隐藏动画,重新计算scroll item高度
    componentDidUpdate() {
        if (this.myScroll instanceof Object) {
            // console.log(this.myScroll, "scroll");
            // this.myScroll.refresh();
            this.myScroll.refresh();
        }
        // console.log(this.privateParams.listviewInd,"ddd");
        // this.privateParams.listviewInd.scrollToElement(predictPosition);
        // if (listviewInd) {
        //     // console.log(listviewInd, "ddd", (predictPosition + 1));
        //     listviewInd.scrollToElement(predictPosition + 1);
        // }
    },
    //判断是否是恢复数据,再判断入口初始化数据
    componentDidMount() {
        console.log('fragmentpredict componentDidMount');
        // if (!EventBus.hasEventListener("clearCachePredictList"))//没有注册就注册
        //     EventBus.addEventListener("clearCachePredictList", this.clearCachePredictListFunc, this);
        if (!EventBus.hasEventListener("scrollToTop"))//没有注册就注册
            EventBus.addEventListener("scrollToTop", this.scrollToTop, this);

        if (warehouseList == null || warehouseList.length == 0) {
            this.getAllWarehouse();
            // console.log("getAllWarehouse");
        }
        if (statusList == null || statusList.length == 0) {
            this.getPredicitionStatus();//获取所有状态
            // console.log("getOrderListState");
        }
        if (sessionStorage.getItem("PredictRequestEntity")) {
            requestEntity = JSON.parse(sessionStorage.getItem("PredictRequestEntity"));
            this.predictPosition = parseInt(sessionStorage.getItem("PredictPostion"));
            // orderList = JSON.parse(sessionStorage.getItem("orderList"));
            sessionStorage.removeItem("PredictRequestEntity");
            sessionStorage.removeItem("PredictPostion");
            console.log("获取本地缓存");
            // if (this.myScroll) {
            //     // console.log(listviewInd, "ddd", (this.predictPosition + 1));
            //     this.myScroll.scrollToElement(this.predictPosition + 1);
            // }
            if (listviewInd instanceof Object) {
                listviewInd.scrollToElement(this.predictPosition + 1);
            }
            // this.setState({});//恢复刷新的数据
        } else {//非返回界面，即正常人口
            // dataCount = 0;//不需要恢复状态的时候，在这里初始化变量
            requestEntity = gVar.createRequestEntity();
            predictList = new Array();
            if (!this.props.todayDataName) {
                this.getPredicitionList();
            }//否则由status回调todaySetParams来请求网络参数else {//否则由status回调todaySetParams来请求网络参数
            // var dataName = this.props.todayDataName;
            this.dealDashBorad();
        }
    },

    //卸载头部监听器跟listview的索引
    componentWillUnmount() {
        listviewInd = null;
        EventBus.removeEventListener("scrollToTop", this.scrollToTop, this);
    },

    render: function () {
        //<TitleBar title="预报管理"/>
        // console.log(statusList);
        var list = <ListView ref={function (theApp) { listviewInd = theApp; } } getItems={this.getItem} marginTop={193} pullUpHandler={this.pullUpEvent}
            backGroud={gVar.Color_background} getCoreObject={this.getCoreObject}/>;
        if (predictList != null && predictList.length == 0) {
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

module.exports = FragmentPrediciton;