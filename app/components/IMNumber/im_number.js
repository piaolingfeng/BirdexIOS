
var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var IMNumber = React.createClass({
  	
  	render: function() {

  		return (
  			<div style={{
  							width:"30%",
  							float:"left",
  							margin:"auto",
  							textAlign:"center",
  							padding:"10px"
  						}}>

  				
	          		<div className="imnumber" key={global.uniqueKey ++} style={{

		   							width:"100%",
		   							height:"50%",
		   							textAlign:"center",
		   							color:(this.props.hide? "white" : "red"),
		   							fontSize:"12pt",
		   							marginTop:"5pt"
		   					   }}>
		   				{this.props.number}
		   			</div>

	   			
	   			<div style={{

	   							width:"100%",
	   							height:"50%",
	   							textAlign:"center",
	   							fontSize:"12pt"
	   					   }}>
	   				{this.props.prompt}
	   			</div>
	   		</div> 

		);
  }
});

module.exports = IMNumber;
