// var EventBus = require('eventbusjs')
// var toast = require('./Tips/tips.js');
//粘贴回调
// console.log(EventBus, "dddddd");
function Callback_Paste(data) {
    // toast('复制成功!');
    if (EventBus) {
        // alert("dddd");
        EventBus.dispatch("Callback_Paste");
    }
    // if (global) { alert("aaa"); }
};
//二维码回调
function Callback_Scann(data) {
    // alert("ccc");
    if (EventBus) {
        // console.log(data);
        EventBus.dispatch("Callback_Scann",null,data);
    }
};
//身份证验证
function Callback_Identify(data) {
    // alert("ddd");
    if (EventBus) {
        // console.log(data);
        EventBus.dispatch("Callback_Identify",null,data);
    }
};

// //身份证验证
// function Callback_PhoneCall(data) {
//     alert("ddd");
// };
