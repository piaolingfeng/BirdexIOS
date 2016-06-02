var React = require('react');
var EventBus = require('eventbusjs');

var headbg = require('./image/headbg.png');
var head = require('./image/head.png');

var gVar = require("../../main/global.js");
var TitleBar = require('../../components/titlebar/titlebar.js');

var toast = require('../../util/Tips/tips.js');

// 修改头像需要用到的
var companyCode = "";

// 公司头像 url
var logo = "";


var MA = React.createClass({

    recharge: function () {
        // gVar.pushPage("recharge");
        var param = {titleIndex:4};
			gVar.pushPage({pathname:"mytool", state:param});
    },


    componentDidMount:function() {
        // 初始化数据
        this.init();
        

        // $("body").children().click(function () {
        //     $("#oAIHFEFUH").hide();
        // });



    },

    init:function name(params) {
        var param = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code')
		};
		console.log(param)
		$.ajax({
            data: param,
            url: gVar.getBASE_URL() + 'Company/get',
            dataType: 'json',
            cache: false,
			// beforeSend: function(xhr){xhr.setRequestHeader('DEVICE-TOKEN','DEVICE-TOKEN');},//这里设置header
			// xhrFields: {
			// 	withCredentials: true
			// },
            success: function (data) {
                // this.setState({ data: data });
				// alert("success");
				this.initSuccess(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
				toast(err);
            }.bind(this)
        });
        
        $.ajax({
            data: param,
            url: gVar.getBASE_URL() + 'Wallet/get',
            dataType: 'json',
            cache: false,
			// beforeSend: function(xhr){xhr.setRequestHeader('DEVICE-TOKEN','DEVICE-TOKEN');},//这里设置header
			// xhrFields: {
			// 	withCredentials: true
			// },
            success: function (data) {
                // this.setState({ data: data });
				// alert("success");
				this.initData(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
				toast(err);
            }.bind(this)
        });

		return;
    },
    
    initSuccess:function (data) {
        console.log(data);
        if(0==data.error){
            companyCode = data.data.company_code;
            logo = data.data.logo;
            $('#logo').attr("src",logo);
            // 公司名称
            var companyName = data.data.company_name;
            $('#company_name').html(companyName + "，欢迎您！");
        }
    },
    
    initData:function (data) {
        console.log(data);
        if(0==data.error){
            var credit = data.data.credit;
            if(credit !=null && credit != "undefined"){
                $('#credit').html("￥" + credit);
            }
            var left_credit = data.data.left_credit;
            if(left_credit !=null && left_credit != "undefined"){
                $('#left_credit').html("￥" + left_credit);
            }
            
            var wallets = data.data.wallets;
            if(wallets !=null && wallets != "undefined"){
                for(var i=0;i<wallets.length;i++){
                    if(wallets[i].name == "运费账户"){
                        $('#freight_balance').html("￥" + wallets[i].balance);
                    } else if(wallets[i].name == "关税账户"){
                        $('#tariff_balance').html("￥" + wallets[i].balance);
                    }
                    
                }
            }
        }
    },
    
    detail:function name(params) {
        var param = {titleIndex:3};
		gVar.pushPage({pathname:"mytool", state:param});
    },
    
    error:function name(params) {
        $('#logo').attr("src",head);
    },
    
    changeIcon:function name(params) {
        var param = {url:logo}
        // 跳转到修改头像页面
        gVar.pushPage({pathname:"changeIcon", state:param});
    },

    render: function () {
        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_white}}>
                <TitleBar  title="我的账户" menu="true" menuFunc={this.menuFunc}/>
                <div className="titlebar_head_down">
                    <div style={{ backgroundImage: 'url(' + headbg + ')', height: 250, width: "100%", textAlign: "center", marginBottom: 20 }}>
                        <img id="logo" className="img-circle" src={head} style={{ height: "100px", width: "100px", marginTop: "70px" }} onError={this.error} onClick={this.changeIcon} />
                        <div style={{ marginTop: 10 }}>
                            <span id="company_name" style={{ color: "#FFFFFF", fontSize: 17 }}>欢迎您！</span>
                        </div>
                    </div>


                    <table className="" style={{ width: "90%", textAlign: "center", margin: "0 auto", borderBottom: "1px #ddd solid" }}>

                        <thead>
                            <tr style={{ borderBottom: "1px #ddd solid" }}>
                                <th style={{ borderBottom: "1px #ddd solid", padding: "10", textAlign: "center", fontSize: 17, color: "#979797" }}>账户类型</th>
                                <th style={{ borderBottom: "1px #ddd solid", padding: "10", textAlign: "center", fontSize: 17, color: "#979797" }}>余额</th>
                                <th style={{ borderBottom: "1px #ddd solid", padding: "10", textAlign: "center", fontSize: 17, color: "#979797" }}>信用/可用</th>
                            </tr>


                        </thead>

                        <tbody>

                            <tr>
                                <td style={{ fontSize: 16, color: "#979797", padding: "10", textAlign: "center" }}>运费</td>
                                <td id="freight_balance" style={{ fontSize: 16, color: "#4c4c4c", padding: "10", textAlign: "center" }}></td>
                                <td style={{ fontSize: 16, color: "#4c4c4c", padding: "10", textAlign: "center" }}>
                                    <div>
                                        <span id="credit" style={{
                                            color: "#13A7DF"
                                        }}></span>
                                        <hr style={{ width: "90%", margin: "auto", backgroundColor: "#CBCBCB", border: 0, height: "1px" }}></hr>
                                        <span id="left_credit" style={{
                                            color: "#F5A623"
                                        }}></span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontSize: 16, color: "#979797", padding: "10", textAlign: "center" }}>关税</td>
                                <td id="tariff_balance" style={{ fontSize: 16, color: "#4c4c4c", padding: "10", textAlign: "center" }}></td>
                                <td style={{ fontSize: 16, color: "#F5A623", padding: "10", textAlign: "center" }}>
                                    ￥0
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ margin: "50px 100px 0 100px" }}>
                        <button onClick={this.recharge} type="button" className="btn btn-default btn-block" style={{ color: "#039FFF" }}>
                            充值
                        </button>
                    </div>

                    <div style={{ width: "20%", textAlign: "center", margin: "20px auto" }}>
                        <span onClick={this.detail} style={{ fontSize: 16, color: "#979797" }}>收支明细</span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MA;