
var React = require('react');
var gVar = require("../../main/global.js");

import ReactPullToRefresh from 'react-pull-to-refresh';
require('../../main/css/pullrefresh.css');
require('../../main/css/genericons/genericons.css');

var LunBo = require('../../components/carousel/carousel.js');
var IMNumber = require('../../components/IMNumber/im_number.js');
var ImageButton = require('../../components/ImageButton/ImageButton.js');

var showDialog = require('../../components/BDialog/bdialog.js');

var btnImage1 = require('./image/dingdan.png');
var btnImage2 = require('./image/yubao.png');
var btnImage3 = require('./image/kucun.png');
var btnImage4 = require('./image/jinxiaocun.png');
var btnImage5 = require('./image/zhichu.png');
var btnImage6 = require('./image/zhanghu.png');
var Addbutton = require('../../components/AddButton/addbutton.js');
var ListView = require('../../components/listview/listviewindex.js');

var FragmentIndex = React.createClass({

    refreshData: function () {

        gVar.todayData.dataCount[0] = 10;
        gVar.todayData.dataCount[1] = 100;
        gVar.todayData.dataCount[2] = 0;
        gVar.todayData.dataCount[3] = 2;
        gVar.todayData.dataCount[4] = 10;
        gVar.todayData.dataCount[5] = 100;
        gVar.todayData.dataCount[6] = 10;
        gVar.todayData.dataCount[7] = 100;
        gVar.todayData.dataCount[8] = 10;
        gVar.todayData.dataCount[9] = 100;

        this.setState({});
        return;
    },



    pullDownHandler(myScroll) {
        // myScroll.refresh();
        // console.log("aaaaa");
        var func = this;
        setTimeout(function () {
            //  myScroll.refresh();
            func.getTodayData(myScroll);
        }, 5000);
    },

    //获取订单列表：请求网络方法
    getTodayData: function (myScroll) {
        var params = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
            all: 1,
        };
        $.ajax({
            data: params,
            async: true,
            url: gVar.getBASE_URL() + 'company/stat',
            dataType: 'json',
            cache: false,
            success: function (data) {
                // this.setState({ data: data })
                this.dealTodayData(data);
                // console.log(data);
                if (myScroll != null) {
                    myScroll.refresh();
                }
            }.bind(this),
            error: function (xhr, status, err) {
                toast(err.toString());
                if (myScroll != null) {
                    myScroll.refresh();
                }
                // console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    dealTodayData(data) {
        console.log(data);
        // if(data.data)
    },

    //
    getItems() {
        var list = new Array();
        list.push(<LunBo />);
        list.push(<div style={{ width: "95%", margin: "10px auto 10px 5%", fontSize: "13pt", color: "#7F7F7F" }}>
            数据看板
        </div>);
        list.push(this.getDataBoard());//数据看板
        list.push(<div style={{ width: "95%", margin: "10px auto 10px 5%", fontSize: "13pt", color: "#7F7F7F" }}>
            管理工具
        </div>);
        list.push(this.getTool());
        return list;
    },

    componentDidMount: function () {

        setTimeout(this.refreshData, 500);
    },

    handlePullDownRefresh: function (resolve, reject) {

        //此处执行异步更新操作, 更新完成后调用resolve()结束动画效果
        setTimeout(function () {
            resolve();
        }, 1000);
    },

    //数据看板
    getDataBoard() {
        var el = new Array(gVar.todayData.dataTitle.length);
        var elCount = 0;

        for (var i = 0; i < gVar.todayData.dataTitle.length; i++) {
            var index = gVar.todayData.dataOrder[i];
            if (index != null && index != -1) {
                var count = gVar.todayData.dataCount[index];
                var title = gVar.todayData.dataTitle[index];

                if (this.firstEnter) {
                    el[elCount++] = <IMNumber number={count} prompt={title} hide={true}/>;
                }
                else {
                    el[elCount++] = <IMNumber number={count} prompt={title} />;
                }
            }
        }

        this.firstEnter = false;
        //border:"1px solid #D5D5D5"
        var dataBoard = <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
            <div className="flexbox-container">
                {elCount > 0 ? el[0] : { null}}
                <div style={{ float: "left", width: "1px", height: "50px", background: "#CBCBCB" }}></div>
                {elCount > 1 ? el[1] : <IMNumber number="" prompt="" />}
                <div style={{ float: "left", width: "1px", height: "50px", background: "#CBCBCB" }}></div>
                {elCount > 2 ? el[2] : <IMNumber number="" prompt="" />}
            </div>

            {elCount > 3 ? <hr style={{ width: "100%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "1px" }}></hr>
                : ""}

            {elCount > 3 ?
                <div className="flexbox-container">
                    {elCount > 3 ? el[3] : <IMNumber number="" prompt="" />}
                    <div style={{ float: "left", width: "1px", height: "50px", background: "#CBCBCB" }}></div>
                    {elCount > 4 ? el[4] : <IMNumber number="" prompt="" />}
                    <div style={{ float: "left", width: "1px", height: "50px", background: "#CBCBCB" }}></div>
                    {elCount > 5 ? el[5] : <IMNumber number="" prompt="" />}
                </div> : ""}
            {elCount > 6 ? <hr style={{ width: "100%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "1px" }}></hr>
                : ""}

            {elCount > 6 ?
                <div className="flexbox-container">
                    {elCount > 3 ? el[6] : <IMNumber number="" prompt="" />}
                    <div style={{ float: "left", width: "1px", height: "50px", background: "#CBCBCB" }}></div>
                    {elCount > 4 ? el[7] : <IMNumber number="" prompt="" />}
                    <div style={{ float: "left", width: "1px", height: "50px", background: "#CBCBCB" }}></div>
                    {elCount > 5 ? el[8] : <IMNumber number="" prompt="" />}
                </div> : ""}

            {elCount > 6 ? <hr style={{ width: "100%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "1px" }}></hr>
                : ""}

            {elCount > 9 ?
                <div className="flexbox-container">
                    {elCount > 3 ? el[9] : <IMNumber number="" prompt="" />}
                    <div style={{ float: "left", width: "1px", height: "50px", background: "#CBCBCB" }}></div>
                    {elCount > 4 ? el[10] : <IMNumber number="" prompt="" />}
                    <div style={{ float: "left", width: "1px", height: "50px", background: "#CBCBCB" }}></div>
                    {elCount > 5 ? el[11] : <IMNumber number="" prompt="" />}
                </div> : ""}
            <div className="flexbox-container">
                <Addbutton />
                <IMNumber number="" prompt="" />
                <IMNumber number="" prompt="" />
            </div>

        </div>;
        return dataBoard;
    },

    //管理工具
    getTool() {
        var tool = <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
            <div className="flexbox-container">
                <ImageButton src={btnImage1} title="订单管理" index={0}/>

                <ImageButton src={btnImage2} title="预报管理" index={1}/>

                <ImageButton src={btnImage3} title="库存管理" index={2}/>
            </div>
            <div className="flexbox-container">
                <ImageButton src={btnImage5} title="我的支出" index={3}/>

                <ImageButton src={btnImage6} title="帐户充值" index={4}/>
                
            </div>
        </div>
        return tool;
    },

    render: function () {

        // var dlgBody = <ul><li>aaaaaaaaaaaaaa</li><li>bbbbbbbbbbbbb</li></ul>;
        // <button className="portal_btn" onClick={function (){showDialog("请输入复核原因", dlgBody, function () {}, function () {});}} >消息</button>
        return (

            <div style={{ position: "absolute", top: 0, width: "100%", height: "100%", backgroundColor: gVar.Color_background, color: "#818181" }}>


                <ListView showUpload={true} showDownload={false} marginTop={0}
                    pullDownHandler={this.pullDownHandler} getItems={this.getItems}
                    backGroud={gVar.Color_background} marginBottom={55}/>

            </div>
        );
    }

});


module.exports = FragmentIndex;