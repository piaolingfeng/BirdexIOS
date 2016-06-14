// var EventBus = require('eventbusjs')
// var toast = require('./Tips/tips.js');
//粘贴回调
// console.log(EventBus, "dddddd");
// function Callback_Paste(data) {
//     // toast('复制成功!');
//     if (EventBus) {
//         // alert(data);
//         // EventBus.dispatch("Callback_Paste");
//     }
//     // if (global) { alert("aaa"); }
// };
//二维码回调
// function Callback_Scann(data) {
//     // alert("ccc");
//     if (EventBus) {
//         // console.log(data);
//         EventBus.dispatch("Callback_Scann",null,data);
//     }
// };
//身份证验证
// function Callback_Identify(id,data) {
//     // alert("ddd");
//     if (EventBus) {
//         // console.log(data);
//         EventBus.dispatch("Callback_Identify",null,data,id);
//     }
// };
//身份证上传结束回调
// function Callback_uploadDown(data1,data2,error) {
//     // alert("ddd");
//     // alert(error);
//     if (EventBus) {
//         // console.log(data);
//         EventBus.dispatch("Callback_uploadDown",null,data1,data2,error);
//     }
// };
//通讯录回调
// function Callback_Contact(name,phoneNumber) {
//     // alert("ddd");
//     if (EventBus) {
//         // console.log(data);
//         EventBus.dispatch("Callback_Contact",null,name,phoneNumber);
//     }
// };

// global.Callback_rechargeFinish = function (status) {这种方式可直接被原生ios访问到

//     if (status == 'true')
//     {
//         toast('充值成功');
//     }
//     else
//     {
//         toast('充值失败');
//     }
// };
 function Callback_updateDeviceToken(deviceToken){
      if (EventBus) {
        // console.log(data);
        // EventBus.dispatch("Callback_updateDeviceToken",null,deviceToken);
        localStorage.setItem('DEVICE-TOKEN',deviceToken);
    }
 }
