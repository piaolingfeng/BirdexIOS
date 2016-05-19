
var React = require('react');
var gVar = require("../../main/global.js");

import ReactPullToRefresh from 'react-pull-to-refresh';
require('../../main/css/pullrefresh.css');
require('../../main/css/genericons/genericons.css');

var LunBo = require('../../components/carousel/carousel.js');
var IMNumber = require('../../components/IMNumber/im_number.js');
var ImageButton = require('../../components/ImageButton/ImageButton.js');

var showDialog = require('../../components/BDialog/bdialog.js');

var btnImage1 = require('./image/dingdan.png');
var btnImage2 = require('./image/yubao.png');
var btnImage3 = require('./image/kucun.png');
var btnImage4 = require('./image/jinxiaocun.png');
var btnImage5 = require('./image/zhichu.png');
var btnImage6 = require('./image/zhanghu.png');
var Addbutton = require('../../components/AddButton/addbutton.js');
var MainPage = React.createClass({

	firstEnter:true,

	textpop(){
		gVar.pushPage("popmenu");
	},

	refreshData: function () {
						
						gVar.todayData.dataCount[0] = 10;
		     			gVar.todayData.dataCount[1] = 100;
		     			gVar.todayData.dataCount[2] = 0;
		     			gVar.todayData.dataCount[3] = 2;
		     			gVar.todayData.dataCount[4] = 10;
		     			gVar.todayData.dataCount[5] = 100;
		     			gVar.todayData.dataCount[6] = 10;
		     			gVar.todayData.dataCount[7] = 100;
		     			gVar.todayData.dataCount[8] = 10;
		     			gVar.todayData.dataCount[9] = 100;

		     			this.setState({});
		return;

		// $.post("http://127.0.0.1/birdapi/company/stat",
		// 		{ "app_debug": "1", "user_code":global.user_code, "company_code":global.company_code},
		// 		function(response, status, xhr){
		     		
		//      		if (status != "success")
		//      		{
		//      			alert("error");
		//      		}
		//      		else
		//      		{	
		//      			this.todayData.dataCount[0] = response.data.exception_order_count;
		//      			this.todayData.dataCount[1] = response.data.no_pass_order_count;
		//      			this.todayData.dataCount[2] = response.data.no_pass_storage_count;
		//      			this.todayData.dataCount[3] = response.data.today_checkout_order_count;
		//      			this.todayData.dataCount[4] = response.data.today_confirm_storage_count;
		//      			this.todayData.dataCount[5] = response.data.today_sign_order_count;
		//      			this.todayData.dataCount[6] = response.data.today_wait_checkout_order_count;
		//      			this.todayData.dataCount[7] = response.data.transport_order_count;
		//      			this.todayData.dataCount[8] = response.data.wait_confirm_storage_count;
		//      			this.todayData.dataCount[9] = response.data.warning_stock_count;

		//      			this.setState({});
		//      		}
		// 	   	}.bind(this), 
		// 	   	"json");

	},

	componentDidMount: function () {

		setTimeout(this.refreshData, 500);
	},
	
	handlePullDownRefresh: function (resolve, reject) { 
		
		//此处执行异步更新操作, 更新完成后调用resolve()结束动画效果
		setTimeout(function (){
			resolve();
		}, 1000);
	}, 

	render: function() {

		var el = new Array(gVar.todayData.dataTitle.length);
		var elCount = 0;

		for (var i = 0; i < gVar.todayData.dataTitle.length; i++)
		{
			var index = gVar.todayData.dataOrder[i];
			if (index != null && index != -1)
			{
				var count = gVar.todayData.dataCount[index];
				var title = gVar.todayData.dataTitle[index];

				if (this.firstEnter)
				{
					el[elCount++] = <IMNumber number={count} prompt={title} hide={true}/>;
				}
				else
				{
					el[elCount++] = <IMNumber number={count} prompt={title} />;
				}
			}
		}

		this.firstEnter = false;
		//border:"1px solid #D5D5D5"
		var dataBoard =  <div style={{width:"100%",backgroundColor:"#FFFFFF"}}>
  				<div className="flexbox-container">
  					{elCount > 0 ? el[0] : {null}}
  					<div style={{float:"left",width:"1px",height:"50px", background:"#CBCBCB"}}></div>
  					{elCount > 1 ? el[1] : <IMNumber number="" prompt="" />}
  					<div style={{float:"left",width:"1px",height:"50px", background:"#CBCBCB"}}></div>
  					{elCount > 2 ? el[2] : <IMNumber number="" prompt="" />}
  				</div>

  				{elCount > 3 ? <hr style={{width:"100%",margin:"auto", backgroundColor:"#CBCBCB", border:0, height:"1px"}}></hr>
	  				: ""}

	  			{elCount > 3 ?
	  				<div className="flexbox-container">
	  					{elCount > 3 ? el[3] : <IMNumber number="" prompt="" />}
	  					<div style={{float:"left",width:"1px",height:"50px", background:"#CBCBCB"}}></div>
	  					{elCount > 4 ? el[4] : <IMNumber number="" prompt="" />}
	  					<div style={{float:"left",width:"1px",height:"50px", background:"#CBCBCB"}}></div>
	  					{elCount > 5 ? el[5] : <IMNumber number="" prompt="" />}
	  				</div> : ""}
				<div className="flexbox-container">
					<Addbutton />
					<IMNumber number="" prompt="" />
					<IMNumber number="" prompt="" />
				</div>
  				
  			</div>;

		var dlgBody = <ul><li>aaaaaaaaaaaaaa</li><li>bbbbbbbbbbbbb</li></ul>;
		
  		return (

  		<div style={{position:"absolute",top:0,width:"100%",height:"100%",backgroundColor:"#F9F9F9",color:"#818181"}}>
  			
				<LunBo />
				<div style={{width:"95%",margin:"10px auto 10px 5%", fontSize:"13pt", color:"#7F7F7F"}}>
					数据看板
				</div>
				
				{dataBoard}

				<div style={{width:"95%",margin:"10px auto 10px 5%", fontSize:"13pt", color:"#7F7F7F"}}>
					管理工具
				</div>
				
				<div style={{width:"100%",backgroundColor:"#FFFFFF",paddingBottom:"55px"}}>
					<div className="flexbox-container">
						<ImageButton src={btnImage1} title="订单管理" index={1}/>
						<div style={{float:"left",width:"1px",height:"50px", background:"transparent"}}></div>

						<ImageButton src={btnImage2} title="预报管理" index={2}/>
						<div style={{float:"left",width:"1px",height:"50px", background:"transparent"}}></div>
						
						<ImageButton src={btnImage3} title="库存管理" index={3}/>
					</div>
					<div className="flexbox-container">
						<ImageButton src={btnImage5} title="我的支出" index={4}/>
						<div style={{float:"left",width:"1px",height:"50px", background:"transparent"}}></div>
						
						<ImageButton src={btnImage6} title="帐户充值" index={5}/>
						
					</div>
					
				</div>
			
  			<div className="flexbox-container" style={{position:"fixed", bottom:0, height:55, width:"100%", backgroundColor:"#F0F0F0", fontSize:"16pt"}}>
				<button onClick={function (){showDialog("请输入复核原因", "input", function () {}, function () {});}} style={{ borderStyle:"none", backgroundColor:"transparent", width:"25%"}}>首页</button>
				<button onClick={function (){showDialog("请输入复核原因", dlgBody, function () {}, function () {});}}  style={{ borderStyle:"none", backgroundColor:"transparent", width:"25%"}}>客服</button>
				<button style={{ borderStyle:"none", backgroundColor:"transparent", width:"25%"}}>帮助</button>
				<button style={{ borderStyle:"none", backgroundColor:"transparent", width:"25%"}} onClick={this.textpop}>我的</button>
			</div>

        </div> 
  		);
  	}
});

module.exports = MainPage;
