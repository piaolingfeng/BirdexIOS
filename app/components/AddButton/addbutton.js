var React = require('react');
var EventBus = require('eventbusjs');
var add_btn = require("./images/add.png");
var gVar = require('../../main/global.js');

var Addbutton = React.createClass({
    render:function(){
        return (
            <div style={{
  							width:"30%",
  							float:"left",
  							margin:"auto",
  							textAlign:"center",
  							padding:"25px",
  						}} onClick={this.changepage}>
	   			<img src={add_btn} style={{height:"14px"}}/>

	   			
	   		</div> 
        );
    },
    
    changepage:function () {
        // EventBus.dispatch("changePage", null, "todayData");
        gVar.pushPage("todayData");
        return;
    }
});

module.exports = Addbutton;