var React = require('react');
var scan_code = require("./images/scan_code.png");
var ic_search = require('./images/ic_search.png');
var gVar = require("../../main/global.js");
// var EventBus = require('eventbusjs');
var CallIOS = require('../../util/CallIOS.js');
require("./css/search.css");
var Search = React.createClass({

    keyDown(event) {
        // console.log("dddd")
        // console.log(event.keyCode);
        // alert(event.keyCode);
        if (event.keyCode == 13) {//搜索
            // console.log(this.refs.exampleInputAmount.value);//input是value
            this.props.SearchFunc(this.refs.exampleInputAmount.value);
        }
    },

    propTypes: {
        SearchFunc: React.PropTypes.func.isRequired,
        defaultText: React.PropTypes.string,
    },

    openScan: function () {
        // alert("open camera!");
        CallIOS.open_scann();
        return;
    },

    componentDidMount() {
        if (!EventBus.hasEventListener("Callback_Scann"))//没有注册就注册
            EventBus.addEventListener("Callback_Scann", this.Callback_Scann, this);
    },

    componentWillUnmount() {
        EventBus.removeEventListener("Callback_Scann", this.Callback_Scann, this)
    },

    Callback_Scann(event, data) {
        // console.log(data, "Search");
       $("#search").val(data);//通过html引入eventbus后参数获取方式与require模块的形式有不同之处
        if (this.props.SearchFunc) {
           this.props.SearchFunc(data);
        }
    },

   

    render: function () {
        var funThis = this;
        $(document).ready(function () {
            $("#search").val(funThis.props.defaultText);
        });
        return (
            <div  style={{ backgroundColor: gVar.Color_background, padding: "10px" }}>
                <div className="input-group">
                    <div className="input-group-addon search_div" ></div>
                    <input id="search" type="text" className="form-control search_input" ref="exampleInputAmount" placeholder="请输入关键字..."
                        onKeyDown={this.keyDown} />
                    <div className="input-group-addon search_scan" onClick={this.openScan}></div>
                </div>
            </div>
        );

    }
});

module.exports = Search;