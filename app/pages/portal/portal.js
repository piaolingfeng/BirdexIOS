
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

	//如果 shouldComponentUpdate 返回 false，则 render() 将不会执行，直到下一次 state 改变
    shouldComponentUpdate: function (nextProps, nextState) {
        // var titleIndex = this.state.data.titleIndex;//获取索引,setState的数据未更新过来,
        // console.log(currentPosition+"shouldComponentUpdate"+targetPosition); 
        if (currentPosition == targetPosition) {
			console.log(false);
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
				break;
			case 2:
				displayPage = <FragmentMyMessage />
				break;
			case 3:
				displayPage = <FragmentMine />
				break;
		}

		return (
			// function (){showDialog("请输入复核原因", "input", function () {}, function () {})};
			<div className="titlebar_extend_head">
				{displayPage}
				<div  style={{ position: "fixed", bottom: 0, height: 55, width: "100%", backgroundColor: "#F0F0F0", fontSize: "16pt" }}>
					<hr style={{ height: "1px", width: "100%", margin: "auto", backgroundColor: gVar.Color_single_line, border: 0 }}></hr>
					<div className="flexbox-container" style={{height:55,zIndex:"1000"}}>
						<button className="portal_btn" onClick={this.tabBarClick.bind(this, 1) }>首页</button>
						<button className="portal_btn" onClick={this.tabBarClick.bind(this, 2) }>消息</button>
						<button className="portal_btn"  onClick={this.tabBarClick.bind(this, 3) }>我的</button>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = MainPage;
