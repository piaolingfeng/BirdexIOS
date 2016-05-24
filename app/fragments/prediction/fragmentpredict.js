var React = require('react');
require('./css/prediction.css');
var gVar = require('../../main/global.js');
//一共四个组件组成的fragment
var PredictionList = require('./predictionlist.js');
var Status = require('../order/status.js');
var TitleBar = require('../../components/titlebar/titlebar.js');
var Search = require('../../components/search/search.js');
var ListView = require('../../components/listview/listview.js');
var toast = require('../../util/Tips/tips.js');
var predictList = null;

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

var FragmentPrediciton = React.createClass({
    
    propTypes: {
        todayDataName: React.PropTypes.string,
    },

    warehouseFunc(index) { 
        requestEntity.page_no='1';//状态切换时都要恢复page的页数
        requestEntity.warehouse_code = warehouseList[index].warehouse_code;
        this.getPredicitionList();
    },

    statusFunc(index) {
        requestEntity.page_no='1';//状态切换时都要恢复page的页数
        requestEntity.status = statusList[index].status;
        requestEntity.statusName = statusList[index].status_name;
        this.getPredicitionList();
    },

    timeFunc(index) {
        requestEntity.page_no='1';//状态切换时都要恢复page的页数
        var end_date = '';
        if (index != 0) {
            end_date = timeUtil.getCurrentDateFormat();
        }
        requestEntity.start_date = timeStartList[index];
        requestEntity.end_date = end_date;
        this.getPredicitionList();
    },
    
    SearchFunc(value) {//搜索回调
        requestEntity.keyword = value;
        console.log(requestEntity);
        this.getPredicitionList();
    },
    
    //简化状态
    dealPredictStatus() {
        var dealStatus = ["全部状态","待审核","待入库", "待确认", "已入库","审核不通过"];
        // console.log(statusList);
        var reStatusList = new Array();
        for (var length = 0; length < dealStatus.length; length++) {
            for (var i = 0; i < statusList.length; i++) {
                var name = statusList[i].status_name;
                if (dealStatus[length] == name) {
                    reStatusList.push (statusList[i]);
                    break;
                }
            }
        }
        statusList = reStatusList;
        // console.log(statusList);
    },
    
    //处理预报列表的逻辑
    dealPredictList(data) {
        if (data != null) {
            if (data.error == 0) {
                dataCount = data.data.count;//赋值
                // console.log(dataCount);
                if (requestEntity.page_no > 1) {
                    if (data.data.storages.length == 0 && requestEntity.page_no > 1) {
                        // T.showShort(MyApplication.getInstans(), "已经是最后一页");
                        toast("已经是最后一页");
                    } else {
                        // OrderAdapter.getList().addAll(orderListEntities.getData().getOrders());
                        // orderListEntities.getData().setOrders(OrderAdapter.getList());
                        for (var i = 0; i < data.data.storages.length; i++) {
                            predictList.push(<PredictionList predictEntity={data.data.storages[i]}/>);
                        }
                    }
                }
                else {
                    var list = [];
                    // console.log(gVar.createOrderEntity());
                    // orderList = data.data.orders;
                    for (var i = 0; i < data.data.storages.length; i++) {
                        list.push(<PredictionList predictEntity={data.data.storages[i]}/>);
                    }
                    predictList = list;//将数据给orderlist
                }
            } else {
                // console.log();
                toast(data.data);
            }
        }
        this.setState({ data: "" });
    },
    
    //获取预报列表：请求网络方法
    getPredicitionList:function(){
        console.log(requestEntity);
        $.ajax({
            async: true,
            url: gVar.getBASE_URL()+'Storage/all',
            data:requestEntity,
            dataType: 'json',
            cache: false,
            success: function(data) {
                // console.log(data);
                this.dealPredictList(data);
            }.bind(this),
            error: function(xhr, status, err) {
                // console.error(this.props.url, status, err.toString());
                toast(err.toString());
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
    //获取预报所有状态
    getPredicitionStatus:function(){
         var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
        };
        $.ajax({
            data: params,
            async: true,
            url: gVar.getBASE_URL() +'storage/getStorageStatusList',
            dataType: 'json',
            cache: true,
            success: function(data) {
                statusList = data.data;
                statusList.splice(0, 0, { status: '', status_name: '全部状态' });
                this.dealPredictStatus();
                // console.log(statusList);
                this.setState({ data: "data" });
            }.bind(this),
            error: function(xhr, status, err) {
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
        this.getPredicitionList();
    },
    
    //上拉加载
    pullUpEvent(){
        requestEntity.page_no++;
        this.getPredicitionList();
    },
    
    getInitialState(){
        // console.log("FragmentPrediciton");
        // predictList = new Array();
       console.log('fragmentpredict getInitialState');
        dataCount = 0;
        predictList = new Array();
        statusList = new Array(gVar.createStatusEntity());
        // warehouseList = new Array({name:'',warehouse_code:''});
        warehouseList = new Array(gVar.createWarehouseEntity());
        requestEntity = gVar.createRequestEntity();//按照工厂方法创建初始实体类
        return null;
    },
    
    getItem:function(index){
       return predictList;
    },
    
    componentDidMount() {
        console.log('fragmentpredict componentDidMount');
        this.getAllWarehouse();
        this.getPredicitionStatus();//获取所有状态
        if (!this.props.todayDataName) {
            this.getPredicitionList();
        }//否则由status回调todaySetParams来请求网络参数
        // console.log(requestEntity);
    },
    
    
    render:function(){
        //<TitleBar title="预报管理"/>
        // console.log(statusList);
        var list = <ListView getItems={this.getItem} marginTop={180} pullUpHandler={this.pullUpEvent} backGroud={gVar.Color_background}/>;
        if(predictList!=null && predictList.length==0){
            list = <div style={{width:"100%",height:"100%",textAlign:"center",fontSize:"22px",marginTop:"100px"}}>暂时没有数据哦！</div>;
        }
        
        return(
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

module.exports = FragmentPrediciton;