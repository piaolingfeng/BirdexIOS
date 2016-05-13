
var React = require('react');
var EventBus = require('eventbusjs');
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

var gVar = require('../../main/global.js');

require('./css/login.css');

var headimg = require('./image/head.png');
var footerimg = require('./image/footer.png');

var LW = React.createClass({

	login: function () {

		gVar.pushPage("portal");
		
		return;

	},

  	render: function() {
		return (
		<div style={{position:"absolute",top:0,width:"100%",height:"100%"}}>
			
			<div>
				<img src={headimg} style={{width:"100%", height:"300px"}} />
			</div>

			<form role="form" style={{width:"80%", margin:"20px auto"}} >
			   <div className="form-group">
			      <input type="text" className="form-control" id="name"  
			         placeholder="输入帐号" value="wly1234"/>
			      
			   </div>
			   
			   <div className="form-group">
			      <input type="password" className="form-control" id="password" 
			         placeholder="输入密码" value="123456"/>
			   </div>

			   <div className="checkbox">
			      <label>
			      		<input type="checkbox" />记住密码
			      </label>
			   </div>
			   <div style={{margin:"50px 50px 0 50px"}}>
			       <button onClick={this.login} type="button" className="btn btn-default btn-block" style={{color:"#039FFF"}}>
			       		登录
			       </button>
			   </div>
			</form>

            <div style={{position:"absolute", bottom:10, width:"80%", left:"10%",height:"40"}}>
				<img src={footerimg} style={{width:"100%"}}/>
				<button style={{position:"absolute", bottom:0, left:10, color:"#999", borderStyle:"none", backgroundColor:"transparent"}}>用户注册</button>
				<button style={{position:"absolute", bottom:0, right:10, color:"#999", borderStyle:"none", backgroundColor:"transparent"}}>忘记密码</button>
			</div>
		</div>);
  	}
});

module.exports = LW;
