var React = require('react');

var gVar = require("../../main/global.js");
var TitleBar = require('../../components/titlebar/titlebar.js');

var head = require('../myaccount/image/head.png');

var CallIOS = require('../../util/CallIOS.js');
var toast = require('../../util/Tips/tips.js');

var showDialog = require('../../components/BDialog/bdialog.js');

var waitDailog = require('../../components/Spin/BSpin.js');


var CI = React.createClass({


    save() {
        waitDailog.showLoading();//等待框
        CallIOS.uploadHead();//上传头像
    },

    //上传完头像后的回调。
    Callback_uploadDown(e, data1, data2, error) {
        //结束等待动画
        waitDailog.hideLoading();
        console.log(data1, data2, error);
        if (Boolean(error)) {
            var url = gVar.getBASE_URL() + 'Company/edit';
            var par = {
                // order_code: this.props.location.state.order_code,
                company_code:localStorage.getItem("company_code"),
                logo:data1,
            }
            gVar.sendRequest(par, url, this.uploadSuc,true,this.errorCallback);
        } else {
            toast("上传失败");
        }
    },

    errorCallback(){
        toast("保存头像失败!");
    },

    uploadSuc() {
        toast("上传成功！");
        gVar.popPage();
    },

    componentDidMount() {
        if (!EventBus.hasEventListener("Callback_Identify"))//没有注册就注册
            EventBus.addEventListener("Callback_Identify", this.Callback_Identify, this);
        if (!EventBus.hasEventListener("Callback_uploadDown"))//没有注册就注册
            EventBus.addEventListener("Callback_uploadDown", this.Callback_uploadDown, this);
        $('#logo').attr("src", this.props.location.state.url);
    },

    componentWillUnmount() {
        EventBus.removeEventListener("Callback_Identify", this.Callback_Identify, this);
        EventBus.removeEventListener("Callback_uploadDown", this.Callback_uploadDown, this);
    },

    //获取照片后回调显示在页面上
    Callback_Identify(e, data, id) {
        // console.log("recive  data");
        $("#logo").attr("src", data);
    },

    error: function name(params) {
        $('#logo').attr("src", head);
    },

    photo() {
        CallIOS.openCamera("logo");
        showDialog("", "", null, null, false);
    },

    album() {
        CallIOS.openPhoto("logo");
        showDialog("", "", null, null, false);
    },

    changeIcon() {
        var dlgBody = <div>
            <div style={{ fontSize: 16, padding: "10px", color: gVar.Color_title }} onClick={this.photo }>拍照</div>
            <div style={{ fontSize: 16, padding: "10px", color: gVar.Color_title }} onClick={this.album }>从手机相册获取</div>
        </div>;
        showDialog("", dlgBody);
    },

    render: function () {
        return (<div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_white }}>
            <TitleBar  title="修改头像" save="保存" bgColor={gVar.Color_blue_head} saveFunc={this.save}/>
            <div className="titlebar_head_down">
                <img id="logo" style={{ width: "100%", marginTop: "70px" }} onError={this.error} onClick={this.changeIcon} />
            </div>
        </div>);
    }

});

module.exports = CI;