
var React = require('react');
var gVar = require('../../main/global.js');
var ImageButton = React.createClass({
  	onClickHandle:function(index) {
		  gVar.pushPage("inventory");
	},
  	render: function() {

  		return (
  			<div style={{
  							width:"30%",
  							float:"left",
  							margin:"auto",
  							textAlign:"center",
  							padding:"10px"
  						}} onClick={this.onClickHandle.bind(this,6)}>
	   			<div style={{
							width:"100%",
							height:"50%",
							textAlign:"center",
							fontSize:"14pt"
				   		   }} >
	   				<img src={this.props.src} style={{width:"40pt",height:"40pt"}}/>
	   			</div>
	   			<div style={{

	   							width:"100%",
	   							height:"50%",
	   							textAlign:"center",
	   							fontSize:"14pt",
	   							marginTop:"8pt"
	   					   }}>
	   				{this.props.title}
	   			</div>
	   		</div> 

		);
  }
});

module.exports = ImageButton;
