var React = require('react');
var EventBus = require('eventbusjs');
var Titlebar = require('../../components/titlebar/titlebar.js');
var gVar = require('../../main/global.js');
require('./mymessagemenu.css');

var MMM = React.createClass({

    componentDidMount: function () {
        $("#optionsRadios1").attr("checked", "checked");
        $("#optionsRadios3").attr("checked", "checked");
    },

    render: function () {

        return (

            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }}>
                <Titlebar save="订阅消息设置"/>
                <div className="titlebar_head_down">
                    <div style={{ marginTop: 40, marginLeft: 20 }}>
                        <span className="mymessagemenu_item_title">提示消息</span>
                    </div>

                    <div className="mymessagemenu_item">
                        <label className="checkbox-inline" style={{ width: "35%" }}>
                            <input onClick={this.check1} type="radio" name="optionsRadiosinline" id="optionsRadios1" value="option1" />
                            <span className="mymessagemenu_item_context">系统提示音</span>
                        </label>
                        <label className="checkbox-inline">
                            <input onClick={this.check2} type="radio" name="optionsRadiosinline" id="optionsRadios2" value="option2"/>
                            <span className="mymessagemenu_item_context">不提示，只在消息中显示</span>
                        </label>
                    </div>

                    <div style={{ marginTop: 30, marginLeft: 20 }}>
                        <span className="mymessagemenu_item_title">消息接收时间</span>
                    </div>

                    <div className="mymessagemenu_item">
                        <label className="checkbox-inline" style={{ width: "35%" }}>
                            <input onClick={this.check1} type="radio" name="optionsRadiosinline1" id="optionsRadios3" value="option1" />
                            <span className="mymessagemenu_item_context">全天接收</span>
                        </label>
                        <label className="checkbox-inline">
                            <input onClick={this.check2} type="radio" name="optionsRadiosinline1" id="optionsRadios4" value="option2"/>
                            <span className="mymessagemenu_item_context">休息时间免接收</span>

                        </label>
                        <br/>
                        <span style={{ fontSize: 14, color: "#666666", marginLeft: "49%" }}>21: 00-09: 00(次日) </span>
                    </div>
                </div>
            </div>

        );

    }

});

module.exports = MMM;