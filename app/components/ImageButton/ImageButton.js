
var React = require('react');
var gVar = require('../../main/global.js');
require("./imagebutton.css");
var ImageButton = React.createClass({
	  
	pageChange: function(){
		gVar.pushPage("mytool");
		// const nextLocation = global.router.history.createLocation({ pathname: "mytool", state: { title:"ddddd" } });
		// global.router.history.push(nextLocation)
		// // global.router.history.push({ pathname: "mytool", state: { title:"ddddd" } }); 
		// console.log(global.router);
		return;
	},  
	  
  	render: function() {
		  
  		return (
  			<div onClick={this.pageChange} style={{
  							width:"30%",
  							float:"left",
  							margin:"auto",
  							textAlign:"center",
  							padding:"10px"
  						}}>
	   			<div className="imagebutton_count" >
	   				<img src={this.props.src} style={{width:"40pt",height:"40pt"}}/>
	   			</div>
	   			<div className="imagebutton_count" style={{fontSize:"10pt",
	   							marginTop:"8pt"}}>
	   				{this.props.title}
	   			</div>
	   		</div> 
		);
  }
});

module.exports = ImageButton;
