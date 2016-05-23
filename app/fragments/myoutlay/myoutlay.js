var React=require('react');
var ReactList=require('react-list');
// var ListView=require('../../components/listview/listview.js');

require('./css/pickdate.css');
require('./css/myoutlay.css');
//日历选择器 http://www.lrxin.com/archives-792.html
require('./js/mobiscroll_002.js');
require('./js/mobiscroll_004.js');
require('./css/mobiscroll_002.css');
require('./css/mobiscroll.css');
require('./js/mobiscroll.js');
require('./js/mobiscroll_003.js');
require('./js/mobiscroll_005.js');
require('./css/mobiscroll_003.css');




//tablayout
var TabLayout=require('../../components/tablayout/tablayout.js');

var PickDate=React.createClass({
    componentDidMount:function(){
        $(function () {
			var currYear = (new Date()).getFullYear();	
			var opt={};
			opt.date = {preset : 'date'};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
		        display: 'modal', //显示方式 
		        mode: 'Clickpick', //日期选择模式
				dateFormat: 'yyyy-mm-dd',
				lang: 'zh',
				showNow: true,
				nowText: "今天",
		        startYear: currYear - 10, //开始年份
		        endYear: currYear + 10 //结束年份
			};

		  	$(".pickdate_start").mobiscroll($.extend(opt['date'], opt['default']));
              $(".pickdate_end").mobiscroll($.extend(opt['date'], opt['default']));
        });
    },
    render:function(){
        //<div className="pickdate_start">开始日期</div><div className="pickdate_end">结束日期</div>
        return (<div className="pickdate content">
            <input value="开始日期" className="pickdate_start" readonly="readonly"  type="button" />
            <input value="结束日期" className="pickdate_end" readonly="readonly"  type="button" />
            <div className="pickdate_sure">交易时间</div>
        </div>);
    }
});

var MyOutlay=React.createClass({
    selectTab:function(index){
        
    },
    getItem:function(){
        return <div></div>;
    },
    renderItem:function(index, key){
        return <div className="myoutlay_list_item" key={key} style={{borderBottom:"1px solid #cccccc"}}><div style={{marginTop:"5px"}}><span style={{}}>ZD5454164565656</span><span style={{float:"right",color:"#03A9F4"}}>-20.3</span></div>
        <div style={{marginTop:"5px",marginBottom:"5px",fontSize:"12px"}}>BH564646消费付款:DFG56465456465564</div></div>;
    },
    render:function() {
        //<TabLayout selectTab={this.selectTab} tabsText={["所有","运费支出","仓租","关税","充值记录","其他"]} tabsWidth={[60,80,60,60,80,60]}/>
        //<ListView  marginTop={117} getItems={this.getItem}/>
        return (<div>
        <TabLayout selectTab={this.selectTab} tabsText={["所有","运费支出","仓租","关税","充值记录","其他"]} tabsWidth={[60,80,60,60,80,60]}/>
        <PickDate />
        <div style={{margin:"0px 10px"}}>
        <div className="myoutlay_list_head0"><span className="myoutlay_list_head1">订单号</span><span className="myoutlay_list_head2">支出金额</span></div>
        <ReactList itemRenderer={this.renderItem} length="30" />
        </div>
        </div>);
    }
});
module.exports=MyOutlay;