
var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('./im_number.css');
var IMNumber = React.createClass({
  	
  	render: function() {

  		return (
  			<div className="im_number_head">

  				
	          		<div className="imnumber im_number_text" key={global.uniqueKey ++} style={{

		   							color:(this.props.hide? "white" : "red"),
		   							fontSize:"13pt",
		   							marginTop:"5pt"
		   					   }}>
		   				{this.props.number}
		   			</div>

	   			
	   			<div className="im_number_text" style={{fontSize:"10pt"}}>
	   				{this.props.prompt}
	   			</div>
	   		</div> 

		);
  }
});

module.exports = IMNumber;
