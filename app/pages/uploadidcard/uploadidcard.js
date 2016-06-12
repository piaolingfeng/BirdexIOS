var React = require('react');

require('./uploadidcard.css');

var camera = require('./image/camera.png');

var TitleBar = require('../../components/titlebar/titlebar.js');

var gVar = require('../../main/global.js');

var toast = require('../../util/Tips/tips.js');

var showDialog = require('../../components/BDialog/bdialog.js');

var CallIOS = require('../../util/CallIOS.js');

var waitDailog = require('../../components/Spin/BSpin.js');

var UploadIdcard = React.createClass({


    init: function name(params) {
        var param = {
            // app_debug: 1,
            // company_code: localStorage.getItem("company_code"),
            // user_code: localStorage.getItem('user_code'),
            order_code: this.props.location.state.order_code
        };
        // console.log(param);
        var url = gVar.getBASE_URL() + 'Order/get';
        gVar.sendRequest(param, url, this.initSuccess);

    },

    componentDidMount() {
        // 初始化数据
        this.init();
        if (!EventBus.hasEventListener("Callback_Identify"))//没有注册就注册
            EventBus.addEventListener("Callback_Identify", this.Callback_Identify, this);
        if (!EventBus.hasEventListener("Callback_uploadDown"))//没有注册就注册
            EventBus.addEventListener("Callback_uploadDown", this.Callback_uploadDown, this);
    },

    componentWillUnmount() {
        EventBus.removeEventListener("Callback_Identify", this.Callback_Identify, this);
        EventBus.removeEventListener("Callback_uploadDown", this.Callback_uploadDown, this);
    },

    //获取照片后回调显示在页面上
    Callback_Identify(e, data, id) {
        // console.log("recive  data");
        $("#" + id).attr("src", data);
    },
    //上传完身份证后的回调。
    Callback_uploadDown(e, data1, data2, error) {
        //结束等待动画
        waitDailog.hideLoading();
        console.log(data1, data2,error);
        
        if (Boolean(error)) {
            var url = gVar.getBASE_URL() + 'Order/edit';
            var par = {
                order_code: this.props.location.state.order_code,
                receiver_id_card: $('#idcard').val(),
                receiver_id_card_img: data1,
                receiver_id_card_img_back: data2,
                need_verify_id_card: "0"
            }
            gVar.sendRequest(par, url, this.uploadSuc);
        } else {
            toast("上传失败");
        }
    },

    uploadSuc() {
        toast("上传成功！");
    },

    initSuccess: function (data) {
        // console.log(data);
        if (0 == data.error) {
            $('#idcard').val(data.data.receiver_id_card);
        }
    },

    photo(id) {
        CallIOS.openCamera(id);
        showDialog("", "", null, null, false);
    },

    album(id) {
        CallIOS.openPhoto(id);
        showDialog("", "", null, null, false);
    },

    changeIcon(id) {
        var dlgBody = <div>
            <div style={{ fontSize: 16, padding: "10px", color: gVar.Color_title }} onClick={this.photo.bind(this, id) }>拍照</div>
            <div style={{ fontSize: 16, padding: "10px", color: gVar.Color_title }} onClick={this.album.bind(this, id) }>从手机相册获取</div>
        </div>;
        showDialog("", dlgBody);
    },

    // 点击确定，执行上传
    submit() {
        // if (document.getElementById('Id1').src && document.getElementById('Id2').src) {
        //     var url = "http://192.168.1.207:8090/upload/IDCard";
        //     $.ajax({
        //         url: url,
        //         dataType: 'json',
        //         data: document.getElementById('Id1').src,
        //         type: 'POST',
        //         success: function (data) {
        //             console.log(data);
        //             alert("success");
        //         },
        //         error: function (data) {
        //             console.log(data);
        //             alert("error");
        //         }
        //     });
        // } else {
        //     toast("请将资料补充完整");
        // }
        if (document.getElementById('Id1').src && document.getElementById('Id2').src && $('#idcard').val() != null) {
            waitDailog.showLoading();//等待框
            CallIOS.uploadId();
        } else {
            toast("请将资料补充完整");
        }

    },

    render: function name(params) {

        // <button type="button" className="btn btn-default" style={{ width: "50%", background: "white", display: "block", margin: "0 auto", marginTop: "20px", borderColor: "#8D8C8E" }}>取   消</button>
        return (
            <div className="titlebar_extend_head">
                <TitleBar  save="上传身份证" bgColor={gVar.Color_blue_head} />
                <div className="titlebar_head_down uploadidcard-main">

                    <input id="idcard" type="text" className="uploadidcard-input" placeholder="输入身份证号："></input>

                    <div className="uploadidcard-imgdiv"  onClick={this.changeIcon.bind(this, "Id1") }>
                        <img id="Id1" className="img-rounded uploadidcard-img" ></img>
                    </div>
                    <div className="uploadidcard-imgdiv"  style={{ marginLeft: "7%" }}  onClick={this.changeIcon.bind(this, "Id2") }>
                        <img id="Id2" className="img-rounded uploadidcard-img" ></img>
                    </div>
                    <div className="uploadidcard-textdiv">
                        身份证-正面照片
                    </div>
                    <div className="uploadidcard-textdiv" style={{ marginLeft: "7%" }}>
                        身份证-背面照片
                    </div>

                    <button id="confirm" onClick={this.submit} type="button" className="btn btn-default btn-block" style={{ width: "50%", margin: "0 auto", marginTop: "100px", color: gVar.Color_blue_head, borderColor: gVar.Color_blue_head }}
                        onTouchStart = {gVar.btnhandleTouchStart.bind(this, "confirm") } onTouchEnd = {gVar.btnhandleTouchEnd.bind(this, "confirm") }
                        onTouchCancel={gVar.btnhandleTouchEnd.bind(this, "confirm") }>确认上传</button>
                </div>
            </div>
        );
    }

});

module.exports = UploadIdcard;