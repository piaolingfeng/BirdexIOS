var React = require('react');
var EventBus = require('eventbusjs');
var add_btn = require("./images/add.png");
var gVar = require('../../main/global.js');

var Addbutton = React.createClass({
    
    propTypes:{
        position:React.PropTypes.number
    },
    
    
    
    render: function () {
        var position = this.props.position; 
        // console.log(position)
        var lineDisplay = "block";
        if(position!=null){
            var i = (position+1)%3;
            if(i == 0){
               lineDisplay="none"; 
            }
        }
        return (
            <div style={{
                width: "33.3%",
                float: "left",
                textAlign: "center",
                boxSizing: "border-box"
            }} onClick={this.changepage}
            id={position}
            onTouchStart = {gVar.handleTouchStart.bind(this,position)} onTouchEnd = {gVar.handleTouchEnd.bind(this,position)} 
			onTouchCancel={gVar.handleTouchEnd.bind(this,position)} >
                <div style={{ float: "right", width: "0.5px", height: "69.5px", background: "#CBCBCB",display:lineDisplay }}></div>
                <img src={add_btn} style={{ height: "14px",padding: "25px",}}/>
            </div>
        );
    },

    changepage: function () {
        // EventBus.dispatch("changePage", null, "todayData");
        gVar.pushPage("todayData");
        return;
    }
});

module.exports = Addbutton;