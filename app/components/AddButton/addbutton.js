var React = require('react');
var EventBus = require('eventbusjs');

var add_btn = require("./images/add.png");

var Addbutton = React.createClass({
    render:function(){
        return (
            <div style={{
  							width:"30%",
                            height:"80px",
  							float:"left",
  							margin:"auto",
  							textAlign:"center",
  							padding:"10px",
  						}} onClick={this.changepage}>
	   			<img src={add_btn} />

	   			
	   		</div> 
        );
    },
    
    changepage:function () {
        EventBus.dispatch("changePage", null, "todayData");
        return;
    }
});

module.exports = Addbutton;