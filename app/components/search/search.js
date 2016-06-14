var React = require('react');
var scan_code = require("./images/scan_code.png");
var ic_search = require('./images/ic_search.png');
var gVar = require("../../main/global.js");
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
        global.Callback_Scann = function (data) {
            $("#search").val(data);//通过html引入eventbus后参数获取方式与require模块的形式有不同之处
            if (this.props.SearchFunc) {
                this.props.SearchFunc(data);
            }
        };
        return;
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