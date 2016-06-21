require('./css/mobiscroll.scroller.css');
require('./css/mobiscroll.scroller.android-ics.css');
require('./css/changeaddress.css');

require('./js/zepto.js');
require('./js/mobiscroll.zepto.js');
require('./js/mobiscroll.core.js');
require('./js/mobiscroll.scroller.js');
require('./js/mobiscroll.area.js');
require('./js/mobiscroll.scroller.android-ics.js');
require('./js/i18n/mobiscroll.i18n.zh.js');



var React = require('react');
// var EventBus = require('eventbusjs');//手动引入eventbus

var gVar = require('../../main/global.js');

var Picker = require('react-mobile-picker');

var headImg = require('./image/changeadresshead.png');

var TitleBar = require('../../components/titlebar/titlebar.js');

var toast = require('../../util/Tips/tips.js');

var CallIOS = require('../../util/CallIOS.js');

var provinceId = "";
var cityId = "";
var areaId = "";
var provinceName = "";
var cityName = "";
var areaName = "";

var valueGroups = {
    title: 'Mr.',
    firstName: 'Micheal',
    secondName: 'Jordan'
};

var optionGroups = {
    title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
    firstName: ['John', 'Micheal', 'Elizabeth'],
    secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
};

var CA = React.createClass({

    changeAddress: function (event, v) {
        // 获取到 地区 code  xxxx xxxx xxxx 格式   mobiscroll.scroller.js 463
        var codes = v.split(' ');
        if (codes.length > 0) {
            provinceId = codes[0];
        }
        if (codes.length > 1) {
            cityId = codes[1];
        }
        if (codes.length > 2) {
            areaId = codes[2];
        }

        if ($('#area').val() != "" && $('#area').val() != "undefined") {
            var names = $('#area').val().split(' ');
            if (names.length > 0) {
                provinceName = names[0];
            }
            if (names.length > 1) {
                cityName = names[1];
            }
            if (names.length > 2) {
                areaName = names[2];
            }
        }


        console.log(arguments);
    },

    componentDidMount: function () {
        if (!EventBus.hasEventListener("changeAddress"))
            EventBus.addEventListener("changeAddress", this.changeAddress, this);

        var valo = $("#area").attr("data-areaid");
        // 默认值  ,valueo:"10064 10043 10375"   出现定位bug 暂时无法解决
        $('#area').scroller('destroy').scroller({ preset: 'area', theme: 'android-ics light', display: 'bottom', mode: 'scroller' });

        this.init();
    },


    componentWillUnmount() {
        EventBus.removeEventListener("changeAddress", this.changeAddress, this);
    },

    Callback_Contact(name, phoneNumber) {
        // alert(name);
        // alert(phoneNumber);
        $('#consignee').val(name);
        $('#phone').val(phoneNumber);
    },

    init: function () {
        var param = {
            // app_debug: 1,
            // company_code: localStorage.getItem("company_code"),
            // user_code: localStorage.getItem('user_code'),
            order_code: this.props.location.state.order_code
        };
        // console.log(param)

        var url = gVar.getBASE_URL() + 'Order/get';
        gVar.sendRequest(param, url, this.initSuccess, true, this.errorCallback);



        return;
    },

    errorCallback() {
        toast("获取数据失败!");
    },

    initSuccess: function (data) {
        console.log(data);
        if (0 == data.error) {
            $('#consignee').val(data.data.receiver_name);
            $('#phone').val(data.data.receiver_mobile);
            $('#area').val(data.data.receiver_province + " " + data.data.receiver_city + " " + data.data.receiver_area);
            $('#detail_adress').val(data.data.receiver_address);
            provinceId = data.data.receiver_province_id;
            cityId = data.data.receiver_city_id;
            areaId = data.data.receiver_area_id;
            provinceName = data.data.receiver_province;
            cityName = data.data.receiver_city;
            areaName = data.data.receiver_area;
        }
    },

    confirm: function name(params) {
        if ($('#consignee').val() == "" || $('#consignee').val() == "undefined") {
            toast("收货人不能为空");
            return;
        }
        if ($('#phone').val() == "" || $('#phone').val() == "undefined") {
            toast("联系电话不能为空");
            return;
        }
        if ($('#detail_adress').val() == "" || $('#detail_adress').val() == "undefined") {
            toast("详细地址不能为空");
            return;
        }

        // 执行调用修改接口
        this.modOrder();
    },

    modOrder: function name(params) {
        var param = {
            // app_debug: 1,
            // company_code: localStorage.getItem("company_code"),
            // user_code: localStorage.getItem('user_code'),
            order_code: this.props.location.state.order_code,
            receiver_name: $('#consignee').val(),
            receiver_mobile: $('#phone').val(),
            receiver_province_id: provinceId,
            receiver_province: provinceName,
            receiver_city_id: cityId,
            receiver_city: cityName,
            receiver_area_id: areaId,
            receiver_area: areaName,
            receiver_address: $('#detail_adress').val()
        };
        console.log(param)

        var url = gVar.getBASE_URL() + 'Order/edit';
        gVar.sendRequest(param, url, this.modOrderSuccess, true, this.errorMod);


        return;
    },

    errorMod() {
        toast("修改失败!");
    },


    modOrderSuccess: function (data) {
        console.log(data);
        if (0 == data.error) {
            toast("修改成功");

            var adds = provinceName + cityName + areaName + $('#detail_adress').val();
            EventBus.dispatch("changeAddr", null, adds);
        } else {
            alert(data.data);
        }
    },

    imgClick() {
        CallIOS.open_Contact("");
        global.Callback_Contact = this.Callback_Contact;
    },


    render: function () {
        return (
            <div className="ca-maindiv titlebar_extend_head" >
                <TitleBar  save="修改收货地址" bgColor={gVar.Color_blue_head} />
                <div className="titlebar_head_down">
                    <table className="changeaddress-table">
                        <tr className="changeaddress-tr">
                            <td className="changeaddress-td1">收货人：</td>
                            <td className="changeaddress-td2">
                                <input isInputText="yes" id="consignee" type="text" className="changeaddress-input"></input>
                            </td>
                            <td className="changeaddress-td3" rowSpan="2">
                                <img onClick={this.imgClick} src={headImg} className="changeaddress-img"></img>
                            </td>
                        </tr>
                        <tr className="changeaddress-tr">
                            <td className="changeaddress-td1">联系电话：</td>
                            <td className="changeaddress-td2">
                                <input isInputText="yes"  id="phone" type="text" className="changeaddress-input"></input>
                            </td>
                        </tr>
                        <tr className="changeaddress-tr">
                            <td className="changeaddress-td1">所在地区：</td>
                            <td className="changeaddress-td2-1" colSpan="2">
                                <input isInputText="yes"  id="area" placeholder="请选择所在地区" data-areaid="10064 10043 10375" readonly="" className="changeaddress-input" style={{ width: "100%" }}></input>
                            </td>
                        </tr>
                        <tr className="changeaddress-tr">
                            <td className="changeaddress-td1">详细地址：</td>
                            <td className="changeaddress-td2-1" colSpan="2">
                                <input isInputText="yes"  id="detail_adress" type="text" className="changeaddress-input"  style={{ width: "100%" }}></input>
                            </td>
                        </tr>
                    </table>

                    <button id="confirm" onClick={this.confirm} type="button" className="btn btn-default btn-block" style={{ color: "#039FFF", width: "50%", margin: "0 auto", marginTop: 80, borderColor: gVar.Color_blue_head }}
                        onTouchStart = {gVar.btnhandleTouchStart.bind(this, "confirm") } onTouchEnd = {gVar.btnhandleTouchEnd.bind(this, "confirm") }
                        onTouchCancel={gVar.btnhandleTouchEnd.bind(this, "confirm") }>
                        确定
                    </button>

                </div>
            </div>
        );
    }
});

module.exports = CA;