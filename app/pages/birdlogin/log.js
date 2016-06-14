
var React = require('react');
// var EventBus = require('eventbusjs');
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

var gVar = require('../../main/global.js');

require('./css/login.css');

var headimg = require('./image/head.png');
var footerimg = require('./image/footer.png');
var toast = require('../../util/Tips/tips.js');
var LW = React.createClass({

	render: function () {
		return (
			<div style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}>


				<form role="form" style={{ width: "80%", margin: "20px auto" }} >
					<div className="form-group">
						<input type="text" className="form-control" id="name" placeholder="输入帐号"/>

					</div>

					<div className="form-group">
						<input type="password" className="form-control" id="password"
							placeholder="输入密码"/>
					</div>

					<div className="checkbox">
						<label>
							<input id="remember" type="checkbox" />记住密码
						</label>
					</div>
					<div style={{ margin: "50px 50px 0 50px" }}>
						<button id="login" onClick={this.login} type="button" className="btn btn-default btn-block" style={{ color: "#039FFF", borderColor: gVar.Color_blue_head }}
							onTouchStart = {gVar.btnhandleTouchStart.bind(this, "login") } onTouchEnd = {gVar.btnhandleTouchEnd.bind(this, "login") }
							onTouchCancel={gVar.btnhandleTouchEnd.bind(this, "login") }>
							登录
						</button>
					</div>
				</form>

			</div>);
	}
});

module.exports = LW;
