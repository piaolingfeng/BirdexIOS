var React = require('react');
var gVar = require("../../main/global.js");
var Titlebar = require("../../components/titlebar/titlebar.js");
var Geren = require('../../fragments/geren/geren.js');
var Mine = React.createClass({
    render: function () {
        return (
         <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }}>
            <Titlebar  title="我的" backNoneDisplay="true"/>
            <div className="titlebar_head_down" >
                <Geren />
            </div>
        </div>);
    }
});
module.exports = Mine;