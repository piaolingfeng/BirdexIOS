
var React = require('react');
var gVar = require('../../main/global.js');
require("./imagebutton.css");
var ImageButton = React.createClass({
	  
	pageChange: function(index){
		if(index==3){
			gVar.pushPage("inventory");
		}else if(index==4){
			gVar.pushPage("myoutlay");
		}else if(index==5){
			gVar.pushPage("recharge");
		}else
			gVar.pushPage("mytool");
		// const nextLocation = global.router.history.createLocation({ pathname: "mytool", state: { title:"ddddd" } });
		// global.router.history.push(nextLocation)
		// // global.router.history.push({ pathname: "mytool", state: { title:"ddddd" } }); 
		// console.log(global.router);
		return;
	},  
	  
  	// onClickHandle:function(index) {
	// 	  gVar.pushPage("inventory");
	// },
  	render: function() {
		  
		var index = this.props.index;
		if(!index)
			index=0; 
		  
  		return (
  			<div onClick={this.pageChange.bind(this,index)} style={{
  							width:"30%",
  							float:"left",
  							margin:"auto",
  							textAlign:"center",
  							padding:"10px"
  						}}>
	   			<div style={{
							width:"100%",
							height:"50%",
							textAlign:"center",
							fontSize:"14pt"
				   		   }} >
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
