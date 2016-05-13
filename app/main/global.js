var React = require('react');

var gVar = {
    
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
    
    userName: "bird"
    
};

module.exports = gVar;

