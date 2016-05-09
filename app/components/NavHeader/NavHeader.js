
var React = require('react');

var back_chevron = require('./images/back_chevron.png');
var menu = require('./images/menu.png');


var NavHeader = React.createClass({
  	
  	render: function() {

  		return (
  			<div style={{
  							width:"100%",
  							height:"36pt",
  							backgroundColor:"#13A7DF",
  							lineHeight:"36pt",
  							overflow:"hidden",
  							textAlign:"center"
  						}}>
	   			<img src={back_chevron} style={{position:"absolute", left:"11pt", top:"11pt", width:"8.75pt",height:"14pt"}}/>
	   			<span style={{color:"white",fontSize:"16pt"}}>我的库存</span>
	   			<img src={menu} style={{position:"absolute", right:"11pt", top:"11pt", width:"14pt",height:"14pt"}}/>
	   			
	   		</div> 

		);
  }
});

module.exports = NavHeader;
