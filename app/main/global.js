var React = require('react');

var gVar = {
    
    userName: "bird",
    
    //今日数据描述信息
	todayData: {
		dataTitle:["今日订单数", "今日已出库", "今日等待出库",
					"今日已取消订单","审核不通过订单","今日已签收"
                    ,"库存异常订单","今日已入库预报单","待确认预报单"
                    ,"审核不通过预报单","库存预警","身份证异常订单"],
 		dataCount:["?","?","?"
                  ,"?","?","?"
                  ,"?","?","?"
                  ,"?","?","?"], //保存每个类别的数值
 		dataOrder:[3,0,1,2], //控制显示的顺序, -1表示对应的项不
	},
    mytool:["订单管理","预报管理","库存管理","我的支出","账户充值"],
    //公共颜色
    Color_blue_head:"#13A7DF",
    Color_gray_head:"#666666",
    Color_white:"#ffffff",
    Color_background:"#f5f4f4",
    Color_touch:"#FAFAFA",
    Color_single_line:"#D7D7D7",
    Color_text:"#9b9b9b",
    Color_title:"#666666",
    //公共字体
    FontSize_title_head:"17px",
    FontSize_order_text:"16px",
    //padding
    Padding_head:"14px",
    Padding_text_head:"12px",
    Padding_titlebar:"50px",
    //切换到新页面
    pushPage: function (pathname) {
        gVar.pageTranType="pagepush";
        global.router.history.push(pathname);
    },
    
    //页面回退
    popPage: function () {
        gVar.pageTranType="pagepop";
        global.router.history.goBack();
    },
    
    //当前页面切换动画类型名,程序运行时会动态更改, 以实现前进后退
    pageTranType: "pagepush", //or "pagepop"
    
    
};

module.exports = gVar;

