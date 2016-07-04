
var React = require('react');
var gVar = require("../../main/global.js");
import ReactPullToRefresh from 'react-pull-to-refresh';
require('../../main/css/pullrefresh.css');
require('../../main/css/genericons/genericons.css');

var LunBo = require('../../components/carousel/carousel.js');
var IMNumber = require('../../components/IMNumber/im_number.js');
var ImageButton = require('../../components/ImageButton/ImageButton.js');

var Carousel = require('../../components/CarouselMore/carouselmore.js');

var showDialog = require('../../components/BDialog/bdialog.js');
var toast = require('../../util/Tips/tips.js');

var btnImage1 = require('./image/dingdan.png');
var btnImage2 = require('./image/yubao.png');
var btnImage3 = require('./image/kucun.png');
// var btnImage4 = require('./image/jinxiaocun.png');
var btnImage5 = require('./image/zhichu.png');
var btnImage6 = require('./image/zhanghu.png');
var Addbutton = require('../../components/AddButton/addbutton.js');
var ListView = require('../../components/listview/listviewindex.js');
var Data = null;//保存请求数据
var request = null;//网络请求的ajax
var firstEnter = false;
var listviewInd = null;

//增加trim方法
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};


Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

var FragmentIndex = React.createClass({

    params: {
        myScroll: null,
    },

    componentWillUnmount() {
        EventBus.removeEventListener("TodayDataSave", this.saveDisplayList, this)
        console.log("FragmentIndex componentWillUnmount");
        if (request) {
            request.abort();
        }
        this.params.myScroll = null;
        if (listviewInd) {
            listviewInd.destory();
        }
    },

    internalScroll: null,

    pullDownHandler(myScroll) {
        // myScroll.refresh();
        // console.log("aaaaa");
        // var func = this;
        // setTimeout(function () {
        //  myScroll.refresh();
        this.internalScroll = myScroll;
        this.getTodayData(myScroll);
        // }, 1000);
    },

    //获取订单列表：请求网络方法
    getTodayData: function (myScroll) {
        var params = {
            all: 1,
        };
        var url = gVar.getBASE_URL() + 'company/stat';
        gVar.sendRequest(params, url, this.dealTodayData, false);
    },

    //根据data来填充今日数据的, 如data为null, 则显示?
    prepareTodayData(data) {
        var today = gVar.todayData;
        //第一步先获取本地displaylist,
        if (firstEnter == true) {//第一次打开软件
            firstEnter = false;
            today.displayList = [];
            for (var i = 0; i < 5; i++) {
                today.IsDisplay[i] = true;
                // localStorage.setItem(today.dataTitle[i], today.IsDisplay[i]);
                today.displayList.push(today.dataTitle[i]);
            }
            // localStorage.setItem("displayList",today.displayList.toString());
            EventBus.dispatch("saveDisplayList");
        } else {
            today.displayList = this.parseString(localStorage.getItem("displayList") + "");//获取并解析列表

        }
        //对数据进行赋值
        for (var i = 0; i < today.dataJsonName.length; i++) {
            if (data == null)
            {
                   //today.dataCount[i] = '--';
            }
            else 
                today.dataCount[i] = data.data[today.dataJsonName[i]];

            if (today.displayList.indexOf(today.dataTitle[i]) >= 0) {
                today.IsDisplay[i] = true;
            } else {
                today.IsDisplay[i] = false;
            }
        }
    },

    //处理数据,将每一个是否显示由displaylist内部的成员来控制
    dealTodayData(data) {
        Data = data;
        
        this.prepareTodayData(data);

        this.setState({});
    },

    /**
    * 解析首页订单列表的字符串
    */
    parseString(sortString) {
        var parseString = new Array();
        if (sortString.indexOf(",") >= 0 || sortString.indexOf(";") >= 0) {
            var sort = sortString.split(";");
            if (sortString.indexOf(",") >= 0) {
                sort = sortString.split(",");
            }
            for (var s = 0; s < sort.length; s++) {
                parseString.push(sort[s].trim());
            }
        } else {
            if (!sortString)
                parseString.add(sortString);
        }
        return parseString;
    },


    //保存列表
    saveDisplayList() {
        localStorage.setItem("displayList", gVar.todayData.displayList.toString());
    },


    // splice(position, numberOfItemsToRemove, item)
    // 拼接函数(索引位置, 要删除元素的数量, 元素)
    //改变displayList
    indexListChange(e, params) {//params[0]json名字,1是状态：true,false
        // console.log(params)
        var list = gVar.todayData.displayList;
        var position = list.indexOf(params[0]);
        if (position >= 0) {
            if (params[1] == false) {//找不到的时同时为true才加入显示列表，否则忽略
                // list.splice(position, 1, param[0]);
                list.remove(params[0])
            }
        } else {
            if (params[1] == true) {//找不到的时同时为true才加入显示列表，否则忽略
                list.push(params[0]);
            }
        }
        EventBus.dispatch("saveDisplayList");//保存
        this.setState({});
    },

    componentDidMount: function () {
        // console.log(gVar.userName);
        if (!EventBus.hasEventListener("saveDisplayList"))//没有注册就注册
            EventBus.addEventListener("saveDisplayList", this.saveDisplayList, this);
        if (!EventBus.hasEventListener("indexListChange"))//没有注册就注册
            EventBus.addEventListener("indexListChange", this.indexListChange, this);
        var enter = localStorage.getItem("firstEnter");
        console.log("componentDidMount");
        if (!enter || enter == true) {
            firstEnter = true;
            console.log(firstEnter, "firstEnter");
            localStorage.setItem("firstEnter", false);
        }

        this.prepareTodayData(null);
        this.setState({});
        // localStorage.clear();
        // console.log(this.params.myScroll);
        // if(this.params.myScroll!=null){
        // this.params.myScroll.refresh();
        // }
        // if (Data == null) {
        this.getTodayData();
        // }else{
        // this.setState({});
        // }
        // if(this.params.myScroll!=null){
        //     this.params.myScroll.refresh();
        // }
        // listviewInd.handRefresh();
        // this.setState({});
        // setTimeout(, 1000);
    },

    //数据看板
    getDataBoard() {
        var today = gVar.todayData;
        var list = new Array();
        var elCount = 0;
        // console.log(today.displayList, "getDataBoard");
        for (var i = 0; i < today.displayList.length; i++) {
            var index = today.dataTitle.indexOf(today.displayList[i]);
            // console.log(index);
            if (index != null && index != -1) {
                var count = today.dataCount[index];
                var title = today.dataTitle[index];
                // if (this.firstEnter) {
                //     el[elCount++] = <IMNumber number={count} prompt={title} hide={true}/>;
                // }
                // else {
                list.push(<IMNumber number={count} prompt={title} position={i}/>);
                // }
            }
        }
        list.push(<Addbutton position={list.length}/>);

        this.firstEnter = false;
        elCount = list.length;
        //border:"0.5px solid #D5D5D5"
        var dataBoard = <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
            <div className="flexbox-container">
                {elCount > 0 ? list[0] : null}
                {elCount > 1 ? list[1] : null}
                {elCount > 2 ? list[2] : null}
            </div>

            {elCount > 3 ? <hr style={{ width: "100%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "0.5px" }}></hr>
                : ""}

            {elCount > 3 ?
                <div className="flexbox-container">
                    {elCount > 3 ? list[3] : null}
                    {elCount > 4 ? list[4] : null}
                    {elCount > 5 ? list[5] : null}
                </div> : ""}
            {elCount > 6 ? <hr style={{ width: "100%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "0.5px" }}></hr>
                : ""}

            {elCount > 6 ?
                <div className="flexbox-container">
                    {elCount > 6 ? list[6] : null}
                    {elCount > 7 ? list[7] : null}
                    {elCount > 8 ? list[8] : null}
                </div> : ""}

            {elCount > 9 ? <hr style={{ width: "100%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "0.5px" }}></hr>
                : ""}

            {elCount > 9 ?
                <div className="flexbox-container">
                    {elCount > 9 ? list[9] : null}
                    {elCount > 10 ? list[10] : null}
                    {elCount > 11 ? list[11] : null}
                </div> : ""}
            {elCount > 12 ? <hr style={{ width: "100%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "0.5px" }}></hr>
                : ""}
            {elCount > 12 ?
                <div className="flexbox-container">
                    {elCount > 12 ? list[12] : null}
                    {elCount > 13 ? list[13] : null}
                </div> : ""}
        </div>;
        return dataBoard;
    },

    //管理工具
    getTool() {
        var tool = <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
            <div className="flexbox-container">
                <ImageButton src={btnImage1} title="订单管理" index={0}/>

                <ImageButton src={btnImage2} title="预报管理" index={1}/>

                <ImageButton src={btnImage3} title="库存动态" index={2}/>
            </div>
            <div className="flexbox-container">
                <ImageButton src={btnImage5} title="我的支出" index={3}/>

                <ImageButton src={btnImage6} title="帐户充值" index={4}/>

            </div>
        </div>
        return tool;
    },

    //获取listview列表
    getItems() {
        // console.log("getItems");
        var list = new Array();
        // list.push(<LunBo />);
        list.push(<Carousel />)
        list.push(<div style={{ width: "95%", margin: "10px auto 10px 5%", fontSize: "13pt", color: "#7F7F7F", fontWeight: 600 }}>
            数据看板
        </div>);
        list.push(this.getDataBoard());//数据看板
        list.push(<div style={{ width: "95%", margin: "10px auto 10px 5%", fontSize: "13pt", color: "#7F7F7F", fontWeight: 600 }}>
            管理工具
        </div>);
        list.push(this.getTool());
        return list;
    },

    componentDidUpdate() {//手动调用刷新,可以解决刚开始时拖不动的情况

        // listviewInd.handRefresh();
        // if(this.params.myScroll!=null){
        // console.log(this.params.myScroll,"componentDidUpdate");
        this.params.myScroll.refresh();
        // }
        // alert("handRefresh");
    },

    getCoreObject(myScroll) {
        //  console.log(myScroll);
        this.params.myScroll = myScroll;
    },

    getInitialState() {
        console.log("getInitialState");
        return null;
    },

    render: function () {
        // if (Data == null)
        //     return null;
        // var dlgBody = <ul><li>aaaaaaaaaaaaaa</li><li>bbbbbbbbbbbbb</li></ul>;
        // <button className="portal_btn" onClick={function (){showDialog("请输入复核原因", dlgBody, function () {}, function () {});}} >消息</button>

        return (

            <div style={{ position: "absolute", top: 0, width: "100%", height: "100%", backgroundColor: gVar.Color_background, color: "#818181" }}>

                <ListView ref={function (theApp) { listviewInd = theApp; } } showUpload={true} showDownload={false} marginTop={0}
                    pullDownHandler={this.pullDownHandler} getItems={this.getItems}
                    backGroud={gVar.Color_background} marginBottom={55} getCoreObject={this.getCoreObject}/>

            </div>
        );
    }

});


module.exports = FragmentIndex;