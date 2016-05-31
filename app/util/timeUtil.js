
var React = require('react');

Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// dateFormat = {  
  
// default:      "ddd mmm dd yyyy HH:MM:ss",  
  
// shortDate:      "m/d/yy",  
  
// mediumDate:     "mmm d, yyyy",  
  
// longDate:       "mmmm d, yyyy",  
  
// fullDate:       "dddd, mmmm d, yyyy",  
  
// shortTime:      "h:MM TT",  
  
// mediumTime:     "h:MM:ss TT",  
  
// longTime:       "h:MM:ss TT Z",  
  
// isoDate:        "yyyy-mm-dd",  
  
// isoTime:        "HH:MM:ss",  
  
// isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",  
  
// isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"  
  
// };  

var timeUtil = {
    /*** 
     * 获得当前时间 
     */
    getCurrentDate() {
        return new Date();
    },
    
    getCurrentDateFormat(){
        return new Date().Format("yyyy-MM-dd");
    },
    getNearWeek() {
        var stop = this.getCurrentDate();
        var start = new Date(stop.setDate((stop.getDate()-7))).Format("yyyy-MM-dd");
        return start;
    },
    getNearMouth() {
        var stop = this.getCurrentDate();
        var start = new Date(stop.setMonth((stop.getMonth()-1))).Format("yyyy-MM-dd");
        return start;
    },
    getNearThreeMouth() {
        var stop = this.getCurrentDate();
        var start = new Date(stop.setMonth((stop.getMonth()-3))).Format("yyyy-MM-dd");
        return start;
    },
    getNearYear() {
        var stop = this.getCurrentDate();
        var start = new Date(stop.setYear((stop.getFullYear()-1))).Format("yyyy-MM-dd");
        return start;
    },

}

module.exports = timeUtil;