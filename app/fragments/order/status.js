var React = require("react");
var ReactDOM = require('react-dom');
var laydown = require("./images/laydown.png");
var gVar = require("../../main/global.js");
require("./css/orderlist.css");
var BPopover = require('../../components/BPopover/bpopover.js');

var warehouseList = new Array();
var statusList = new Array();
var timeList = new Array();
var isGetData = false;
var Status = React.createClass({

    propTypes: {
        warehouseFunc: React.PropTypes.func.isRequired,
        statusFunc: React.PropTypes.func.isRequired,
        timeFunc: React.PropTypes.func.isRequired,
        warehouseList: React.PropTypes.array.isRequired,
        statusList: React.PropTypes.array.isRequired,
        timeList: React.PropTypes.array.isRequired,
        todayDataName: React.PropTypes.string,
        todaySetParams: React.PropTypes.func,
        dataCount: React.PropTypes.any
    },

    warehoseClick(index) {
        // this.refs.warehouse.innerHTML = this.props.warehouseList[index];
        $('#warehouse').html(warehouseList[index]);
        this.props.warehouseFunc(index);
    },

    statusClick(index) {
        // this.refs.status.val = this.props.statusList[index];
        $('#status').html(statusList[index]);
        this.props.statusFunc(index);
    },

    timeClick(index) {
        // console.log(this.refs.time);
        $('#time').text(timeList[index]);
        this.props.timeFunc(index);
        //    console.log(ReactDOM.findDOMNode(this.refs.time));//="ccccc"
        // ReactDOM.findDOMNode(this.refs.triggerref).innerHTML
        //  ReactDOM.findDOMNode(this.refs.triggerref).innerHTML = "dddd";
        // this.refs.time.innerHTML = this.props.timeList[index];
    },

    getInitialState() {
        isGetData = false;
        return null;
    },

    render: function () {

        warehouseList = new Array();
        statusList = new Array();
        timeList = this.props.timeList;
        // console.log(this.props.statusList[0]);
        for (var i = 0; i < this.props.statusList.length; i++) {
            statusList[i] = this.props.statusList[i].status_name;
        }
        // console.log(statusList);
        for (var i = 0; i < this.props.warehouseList.length; i++) {
            warehouseList[i] = this.props.warehouseList[i].name;
        }

        // for(var i=0;i<this.props.timeList.length;i++){
        //     // timeList[i] = this.props.timeList[i].name;
        // }

        var dataName = this.props.todayDataName;//首页今日数据传递过来的data名字
        var statusPosition = 0;
        var timePosition = 0;
        //时间条件设置
        // console.log(dataName +dataName.indexOf("今日"));
        if (dataName != null) {//首页进来时有传值
            // console.log(dataName + ":首页进来");
            if (dataName.indexOf("今日") >= 0) {
                timePosition = 1;
            } else {
                timePosition = 0;
            }
            // console.log("timePosition"+timePosition);
            //状态设置
            for (var i = 0; i < statusList.length; i++) {
                if (dataName.indexOf(statusList[i]) >= 0) {
                    statusPosition = i;
                    break;
                }
            };
            if (statusList.length > 1 && timeList.length > 1 && warehouseList.length > 1 && !isGetData) {
                isGetData = true;
                this.props.todaySetParams(statusPosition, timePosition);
                // console.log(statusList,timeList,warehouseList,"shouye");
            }
        }
        // console.log(this.props.warehouseList);
        // 拼接函数(索引位置, 要删除元素的数量, 元素)  
        // array.splice(2, 0, "three");     
        // console.log(this.props.statusList);
        // var warehouseList = this.props.warehouseList;
        // warehouseList.splice(0, 0, "全部仓库");
        // var statusList = this.props.statusList;
        // statusList.splice(0,0,"全部状态");
        var warehose = <span  className="orderstatus">
            <span id="warehouse">{warehouseList[0]}</span>
            <img src={laydown} className="orderstatus_laydown"/>
        </span>;
        var status = <span className="orderstatus" >
            <span id="status">{statusList[statusPosition]}</span>
            <img src={laydown} className="orderstatus_laydown"/>
        </span>;
        var time = <span className="orderstatus" >
            <span id="time">{timeList[timePosition]}</span>
            <img src={laydown} className="orderstatus_laydown"/>
        </span>;

        return (
            <div >
                <div  style={{ backgroundColor: gVar.Color_white }}>
                    <BPopover menuItem={warehouseList}
                        menuItemClick={this.warehoseClick}
                        triggerComp={warehose}
                        placement="bottom" />
                    <span className="orderlist_status_line"></span>
                    <BPopover menuItem={statusList}
                        menuItemClick={this.statusClick}
                        triggerComp={status}
                        placement="bottom" />
                    <span className="orderlist_status_line"></span>
                    <BPopover menuItem={timeList}
                        menuItemClick={this.timeClick}
                        triggerComp={time}
                        placement="bottom" />
                    <div className="orderlist_clear"></div>
                </div>
                <div className="orderstatus_text" style={{ backgroundColor: gVar.Color_background }}>共{this.props.dataCount}个数据</div>
            </div>
        );
    }
});
module.exports = Status;