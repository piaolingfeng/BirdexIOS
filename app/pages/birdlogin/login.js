
var React = require('react');
var EventBus = require('eventbusjs');
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

var gVar = require('../../main/global.js');

require('./css/login.css');

var headimg = require('./image/head.png');
var footerimg = require('./image/footer.png');
var toast = require('../../util/Tips/tips.js');
var LW = React.createClass({

	login: function () {
		// alert("login");
		// showLoading[0]();
		// console.log(showLoading)
		var param = {
			account: $('#name').val(),
			password: $('#password').val(),
			device_type: "IOS",
			device_info: navigator.userAgent,
		};

		var url = gVar.getBASE_URL() + 'Public/login'
		gVar.sendRequest(param, url, this.loginSuccess);
		return;
	},


	loginSuccess: function (data) {
		// 存储返回的data
		console.log(data);
		// console.log(data);
		if (data.error == 0) {
			toast("登录成功");
			if ($("#remember").is(':checked')) {//判断是否存储账户密码
				var name = $("#name").val();
				var password = $("#password").val();
				// console.log(name,password);
				localStorage.setItem("log_password", password);
				localStorage.setItem("log_name", name);
			}
			if (data.data) {
				try {
					localStorage.setItem("company_code", data.data.company_code);
					localStorage.setItem('company_name', data.data.company_name);
					localStorage.setItem('company_short_name', data.data.company_short_name);
					localStorage.setItem('user_code', data.data.user_code);
					localStorage.setItem('USER-TOKEN', data.data.user_token);
					console.log(data);
				} catch (e) {
					// alert(e);
					console.log(e);
					alert("您处于无痕浏览，无法为您保存");
				}
				gVar.pushPage("portal");
			}
		} else {
			toast(data.data);
		}
	},

	componentDidMount() {
		if (localStorage.getItem("log_name")) {
			$("#name").val(localStorage.getItem("log_name"));
		}
		if (localStorage.getItem("log_password")) {
			$("#password").val(localStorage.getItem("log_password"));
		}
	},

	render: function () {
		return (
			<div style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}>

				<div>
					<img src={headimg} style={{ width: "100%" }} />
				</div>

				<form role="form" style={{ width: "80%", margin: "20px auto" }} >
					<div className="form-group">
						<input type="text" className="form-control" id="name"
							placeholder="输入帐号"/>

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
						<button id="login" onClick={this.login} type="button" className="btn btn-default btn-block" style={{ color: "#039FFF",borderColor:gVar.Color_blue_head }}
							onTouchStart = {gVar.btnhandleTouchStart.bind(this, "login") } onTouchEnd = {gVar.btnhandleTouchEnd.bind(this, "login") }
							onTouchCancel={gVar.btnhandleTouchEnd.bind(this, "login") }>
							登录
						</button>
					</div>
				</form>

				<div style={{ position: "absolute", bottom: 10, width: "80%", left: "10%", height: "40" }}>
					<img src={footerimg} style={{ width: "100%" }}/>
					<button style={{ position: "absolute", bottom: 0, left: 10, color: "#999", borderStyle: "none", backgroundColor: "transparent" }}>用户注册</button>
					<button style={{ position: "absolute", bottom: 0, right: 10, color: "#999", borderStyle: "none", backgroundColor: "transparent" }}>忘记密码</button>
				</div>
			</div>);
	}
});

module.exports = LW;
