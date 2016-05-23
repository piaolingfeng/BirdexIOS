var React=require('react');
var gVar = require("../../main/global.js");
var Titlebar = require("../../components/titlebar/titlebar.js"); 
var Geren=require('../../fragments/geren/geren.js');
var Mine=React.createClass({
    render:function() {
        return (<div className="titlebar_extend_head" style={{backgroundColor:gVar.Color_white}}>
                <Titlebar  title="数据看板"/>
                <div className="titlebar_head_down" style={{paddingTop:gVar.Padding_titlebar,height:"100%"}}>
                    <Geren />
                </div>
                </div>);
    }
});
module.exports=Mine;