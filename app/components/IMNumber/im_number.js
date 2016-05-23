
var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('./im_number.css');
var gVar = require('../../main/global.js');

var IMNumber = React.createClass({
  	
	numberOnclick(){
		console.log(this.props.prompt);
		var toolPageIndex = "";
		if(this.props.prompt.indexOf('预报')>=0){
			toolPageIndex = 1;
		}else{
			if(this.props.prompt == '库存预警'){
				toolPageIndex = 2;
			}else{
				toolPageIndex = 0;
			}
		}
		var param = {
			todayDataName:this.props.prompt,
			titleIndex:toolPageIndex,
		};
		gVar.pushPage({pathname:"mytool",state:param});
	},  
	  
  	render: function() {

  		return (
  			<div className="im_number_head" onClick={this.numberOnclick}>
  				
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
