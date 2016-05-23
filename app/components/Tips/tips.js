require('./tips.css');

//提示框模块
//tipText:提示文字，提示信息文字
//showTime:1000，提示显示时间 以js毫秒为标准
//positionTop: "top"   "bottom"  默认居中显示,此参数不传 则垂直居中显示  

   function showTips(tipText,showTime,positionTop) {
        
        //添加Dom元素，提示框
        $("html body").append("<p class='tipBox'></p>");
        

        var w = $(window).width();
        var h = $(window).height();
        var tLeft = parseInt((w - $(".tipBox").width()) / 2);
        var oTop = parseInt((h - $(".tipBox").height()) / 2);
        if(positionTop=="top"){
            oTop="20%";
        }else{
            oTop="80%";
        }
        
        //提示框定位
        $(".tipBox").css({ "left": tLeft, "top": oTop })
        //提示框内容
        $(".tipBox").html(tipText);
        $(".tipBox").fadeIn(1000);
        
        //关闭tip时间
        setTimeout(a, showTime);

   function a(){
        $(".tipBox").fadeOut(1000,function(){
            $(".tipBox").remove(); 
        }); 
    }
    
    }


module.exports = showTips;
