
var React = require('react');
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

require('./big.png');

var SideBar = require("../../components/sidebar/sidebar.js");

var OSSMain = React.createClass({


	componentDidMount: function () {
	},

	render: function() {
        return (
            <div> 
                <div style={{width:"15%", float:"left"}}>

                    <SideBar 
                        itempath={["ossmain/qiyekehuguanli", "ossmain/gerenkehuguanli",
                                    "ossmain/shichangguanli", "ossmain/caiwuguanli", "ossmain/dingdanguanli"]}

                        itemname={["企业客户管理", "个人客户管理", "市场管理", "财务管理", "订单管理"]}

                    />

                </div>
                <div style={{width:"85%", height:"500pt", float:"left"}}>

                    {this.props.children}

                </div>

                <div style={{clear:"both"}}> </div>
                                
            </div>
            );
  	}
});

module.exports = OSSMain;
