
var React = require('react');
var EventBus = require('eventbusjs');
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

var gVar = require('../../main/global.js');

require('./css/login.css');

var headimg = require('./image/head.png');
var footerimg = require('./image/footer.png');

var LW = React.createClass({

	login: function () {
		// alert("login");
		var param = {
			account: $('#name').val(),
			password: $('#password').val(),
			device_type: "IOS",
			device_info: navigator.userAgent,
		};
		console.log(param)
		$.ajax({
            data: param,
            url: gVar.getBASE_URL() + 'Public/login',
            dataType: 'json',
            cache: false,
			// beforeSend: function(xhr){xhr.setRequestHeader('DEVICE-TOKEN','DEVICE-TOKEN');},//这里设置header
			// xhrFields: {
			// 	withCredentials: true
			// },
            success: function (data) {
                // this.setState({ data: data });
				// alert("success");
				this.loginSuccess(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
				alert(err);
            }.bind(this)
        });

		return;
	},

	loginSuccess: function (data) {
		// 存储返回的data
		// console.log(data);
		if (data.data) {
			try { 
				localStorage.setItem("company_code", data.data.company_code);
				localStorage.setItem('company_name', data.data.company_name);
				localStorage.setItem('company_short_name', data.data.company_short_name);
				localStorage.setItem('user_code', data.data.user_code); 
				console.log(data);
			} catch (e) { 
				// alert(e);
				console.log(e);
				alert("您处于无痕浏览，无法为您保存"); 
			}
			gVar.pushPage("portal");
		}
		// console.log(data.data.company_code);
        // editor.putString("company_code", user.getCompany_code());
        // editor.putString("company_name", user.getCompany_name());
        // editor.putString("company_short_name", user.getCompany_short_name());
        // editor.putString("user_code", user.getUser_code());
		// alert("success");
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
							placeholder="输入帐号" value="wly5"/>

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
					<div style={{ margin: "50px 50px 0 50px" }}>
						<button onClick={this.login} type="button" className="btn btn-default btn-block" style={{ color: "#039FFF" }}>
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
