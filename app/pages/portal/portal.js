
var React = require('react');
var gVar = require("../../main/global.js");

import ReactPullToRefresh from 'react-pull-to-refresh';
require('../../main/css/pullrefresh.css');
require('../../main/css/genericons/genericons.css');


var showDialog = require('../../components/BDialog/bdialog.js');

var FragmentMyMessage = require('../mymessage/mymessage.js');
var FragmentIndex = require('../../fragments/index/fragmentindex.js');
var FragmentMine = require('../../fragments/mine/mine.js');
var Index = 1;
var currentPosition = 1;
var targetPosition = 1;
require('./portal.css');
var EventBus = require('eventbusjs');

var MainPage = React.createClass({

	firstEnter: true,

	tabBarClick: function (index) {
		targetPosition = index;
		console.log(index);
		Index = index;
		this.setState({});
	},



	getInitialState() {
		// currentPosition = 1;
        // targetPosition = 1;
		// Index = 1;
		return null;
	},

	componentDidMount() {
		if (!EventBus.hasEventListener("logout"))//没有注册就注册
            EventBus.addEventListener("logout", this.dealLogoutData, this);
	},

	dealLogoutData() {
		// currentPosition = 1;
		// targetPosition = 1;
		Index = 1;
		console.log("targetPosition", targetPosition);
	},

	//如果 shouldComponentUpdate 返回 false，则 render() 将不会执行，直到下一次 state 改变
    shouldComponentUpdate: function (nextProps, nextState) {
        // var titleIndex = this.state.data.titleIndex;//获取索引,setState的数据未更新过来,
        // console.log(currentPosition+"shouldComponentUpdate"+targetPosition); 
        if (currentPosition == targetPosition) {
			// console.log(false);
            return false;//render将不会被调用
        }
        else {
            //  = targetPosition;
            return true;
        }
    },

	render: function () {
		var displayPage = null;
		currentPosition = Index;
		switch (Index) {
			case 1:
				displayPage = <FragmentIndex />
				$(document).ready(function () {
					$("#index").css("color", gVar.Color_blue_head);
					$("#msg").css("color", gVar.Color_title);
					$("#mine").css("color", gVar.Color_title);
				});

				break;
			case 2:
				displayPage = <FragmentMyMessage />
				$(document).ready(function () {
					$("#index").css("color", gVar.Color_title);
					$("#msg").css("color", gVar.Color_blue_head);
					$("#mine").css("color", gVar.Color_title);
				});
				break;
			case 3:
				displayPage = <FragmentMine />
				$(document).ready(function () {
					$("#index").css("color", gVar.Color_title);
					$("#msg").css("color", gVar.Color_title);
					$("#mine").css("color", gVar.Color_blue_head);
				});
				break;
		}

		return (
			// function (){showDialog("请输入复核原因", "input", function () {}, function () {})};
			<div className="titlebar_extend_head">
				{displayPage}
				<div  style={{ position: "fixed", bottom: 0, height: 55, width: "100%", backgroundColor: "#F0F0F0", fontSize: "16pt" }}>
					<hr style={{ height: "0.5px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
					<div className="flexbox-container" style={{ height: 55, zIndex: "1000" }}>
						<button id="index" className="portal_btn" onClick={this.tabBarClick.bind(this, 1) } style={{color:gVar.Color_title}}>首页</button>
						<button id="msg" className="portal_btn" onClick={this.tabBarClick.bind(this, 2) }  style={{color:gVar.Color_title}}>消息</button>
						<button id="mine" className="portal_btn"  onClick={this.tabBarClick.bind(this, 3) } style={{color:gVar.Color_title}}>我的</button>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = MainPage;
