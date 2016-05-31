var React = require('react');
var gVar = require('../../main/global.js');
var Titlebar = require("../../components/titlebar/titlebar.js");
var Search = require('../../components/search/search.js');
var OrderList = require("../../fragments/order/orderlist.js");
var OrderProduct = require("../../fragments/order/orderproduct.js");
var Status = require("../../fragments/order/status.js");

var Ordertail = require("../orderdetail/orderdetail.js");
var PredictionList = require("../../fragments/prediction/predictionlist.js");
var PredictDetail = require("../predictdetail/predictdetail.js");
require("../../../bower_components/titatoggle/dist/titatoggle-dist.css");


var PredictProduct = require("../predictdetail/predictproduct.js");

var MsgStockWarnning = require("../messagedetail/msgstockwarnning.js");
var MsgIdCardError = require("../messagedetail/msgorderidcard.js");
var MsgAccountError = require("../messagedetail/msgaccounterror.js");
var MsgOrderInventory = require("../messagedetail/msgorderinventory.js");
var MsgOrderExamine = require("../messagedetail/msgorderexamine.js");
var EventBus = require('eventbusjs');
require("./css/todaydata.css");

var TodayDataItem = React.createClass({

    select: function (a, e) {
        // console.log(arguments);
        // alert(e);
        //         (function(e)
        //    {
        //     var e = window.event || e;
        //     if (e.stopPropagation) e.stopPropagation();
        //     else e.cancelBubble = true; 
        //    })(event)
        // select.caller.arguments[0];
        // e.cancelBubble = true;
        // event.stopPropagation();
        e.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。
        //  var e = window.event || e;
        // if (e.stopPropagation) 
        //     e.stopPropagation();
        // else e.cancelBubble = true;

        if ($("#check" + a).is(':checked')) {
            $("#check" + a).prop("checked", false);
            // console.log(false);
            var params =[gVar.todayData.dataTitle[a],false];
            EventBus.dispatch("indexListChange",null,params);
        }
        else {
            $("#check" + a).prop("checked", true);
            var params =[gVar.todayData.dataTitle[a],true];
            // console.log(true);
            EventBus.dispatch("indexListChange",null,params);
        };
        //    if(this.refs.check.checked = true){
        //        this.refs.check.checked = false;
        //    }else{
        //        this.refs.check.checked = true;
        //    }
        // var e = window.event || e;
        // if (e.stopPropagation) e.stopPropagation();
        // else e.cancelBubble = true;
        // this.refs.check.toggle(this.checked);
        // alert(this.checked);
    },

    shouldComponentUpdate(){
        return false;
    },

    render: function () {
        var name = this.props.name;
        var id = this.props.id;
        var checked = this.props.checked;
        // console.log(checked);
        var idcheck = "check" + id;
        return (
            <div className="todaydata-item_head" onClick={this.select.bind(this, id) } >
                <span ref="name" className="todaydata_text">{name}</span>
                <div className="checkbox checkbox-slider--c" style={{ float: "right", marginTop: "15px" }}>
                    <label>
                        <input  ref="check" id={idcheck} type="checkbox" checked={checked}/><span></span>
                    </label>
                </div>
                <hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
            </div>
        );
    }
});

var TodayDataList = React.createClass({

    componentDidMount: function () {
        var dataList = gVar.todayData;
    },
    on: function () {
        $('#create-switch').wrap('<div class="switch" />').parent().bootstrapSwitch();
    },

    render: function () {
        // <Search />
        //         <Status />
        //         <OrderList />
        //         <OrderProduct />
        // <Ordertail />
        // <PredictDetail />
        // <PredictProduct />
        // <MsgIdCardError />
        // <MsgAccountError />
        // <MsgIdCardError />
        //  <MsgOrderInventory />
        //  <MsgOrderExamine />
        //<MsgStockWarnning />
        // var data1 = <div id="todaydata_div"> </div>;

        // $("#todaydata_div").ready(function(){
        //     for(var i=0;i<gVar.todayData.dataTitle.length;i++){
        //        $("#todaydata_div").append(child);
        //     };
        // });
        var arraylist = new Array();
        for (var i = 0; i < gVar.todayData.dataTitle.length; i++) {
            arraylist[i] = <TodayDataItem  name={gVar.todayData.dataTitle[i]} id={i} checked={gVar.todayData.IsDisplay[i]}/>;
        };
        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_white }}>
                <Titlebar  title="数据看板"/>
                <div className="titlebar_head_down" style={{ paddingTop: gVar.Padding_titlebar }}>
                    {arraylist}
                </div>
            </div>
        );
    }

});

module.exports = TodayDataList;