var React = require('react');
require('./css/zhifu.css');
var toast = require('../../util/Tips/tips.js');
var zhifubao1 = require('./image/alipay48x48.png');
var paySelected = require('./image/selectreveal.png');
var radio = require('./image/radio.png');
var gVar = require('../../main/global.js');
var LoadingView = require('../../components/loadingview/loadingview.js');
var ZhiFu = React.createClass({
    privateVar: {
        selectIndex: -1,
        params: {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code')
        },
        //0为动画，1wei显示正常,2暂不能获取可充值账户
        status: 0,
        //账号集合
        account: []
    },
    componentWillUnmount: function () {
        this.privateVar.selectIndex = -1;
        this.privateVar.status = 0;
        this.privateVar.account = [];
    },
    payTouchStartHandle: function (ele) {
        $(ele.target).css("background-color", "#039FFF");
    },
    payTouchStopHandle: function (ele) {
        $(ele.target).css("background-color", "#00ACFF");
    },
    selectPayTypeHandle: function (index, ele) {
        if (this.privateVar.selectIndex != -1) {
            $('.pay_style_radio:eq(' + this.privateVar.selectIndex + ')').css("background-position", " -90px 0 ");
        }
        this.privateVar.selectIndex = index;
        $('.pay_style_radio:eq(' + index + ')').css("background-position", " -60px -30px ");
    },
    componentDidMount: function () {
        var component = this;
        this.privateVar.account = [];
        //获取账号的信息
        $.ajax({
            url: gVar.getBASE_URL() + "Wallet/get",
            type: "POST",
            data: component.privateVar.params,
            async: true,
            cache: false,
            dataType: 'json',
            success: function (val) {
                console.log(val);
                if (val.error == 0) {
                    if (val.data.wallets != null && val.data.wallets != undefined && val.data.wallets.length > 0) {
                        $.each(val.data.wallets, function (index, obj) {
                            component.privateVar.account.push({ name: obj.name, type: obj.type });
                        });
                        console.log(component.privateVar.account);
                        component.privateVar.status = 1;
                        component.setState({});
                    } else {
                        component.privateVar.status = 2;
                        toast('暂不能获取可充值账户！');
                        component.setState({});
                    }

                } else {
                    component.privateVar.status = 2;
                    toast('暂不能获取可充值账户！');
                    component.setState({});
                }
            },
            error: function (xhr, status, err) {
                component.privateVar.status = 2;
                toast('暂不能获取可充值账户！');
                component.setState({});
            }
        });
        //充值金额限制非法输入和粘贴
        $(".input_money").bind("keydown", function (event) {
            var key = event.keyCode;   //48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←
            // console.log( "   key" + key);
            //充值金额限制非法输入和粘贴
            var money = $(".input_money").val();
            // console.log("  0 key  " + money + "   " + money.indexOf("."));
            if (key == 110 || key == 190) {
                if (money.indexOf(".") == -1) {
                    return true;
                } else {
                    return false;
                }
            }
            var moneyInt = parseInt(money);
            console.log(moneyInt);
            if ((key <= 57 && key >= 48) || (key <= 105 && key >= 96) || (key == 8)) {
                if (moneyInt > 10000000 && key != 8) {
                    toast('输入金额不能超过1千万！');
                    return false;
                }
                if (money.indexOf(".") != -1) {
                    //限制输入长度
                    var len1 = money.length;
                    var position = money.indexOf(".") + 1;
                    // console.log( "1   " + len1+"  2   "+position);
                    if (len1 - position >= 2 && key != 8) {
                        //保留两位小数
                        return false;
                    }
                }
                return true;
            } else {
                toast('错误字符！');
                return false;
            }
        });
    },
    payRecharge: function () {
        if (this.privateVar.selectIndex == -1) {
            toast('没有选择充值账户！');
            return false;
        }
        //开始充值业务
    },
    render: function () {
        var innerView;
        if (this.privateVar.status == 0) {
            innerView = (<LoadingView />);
        } else if (this.privateVar.status == 1) {
            var accountView = [];
            for (var i = 0; i < this.privateVar.account.length; i++) {
                accountView.push(<div className="pay_style_item" onClick={this.selectPayTypeHandle.bind(this, i) }><span style={{
                    display: "table", margin: "auto"
                }}><span className="pay_style_radio" ></span><span style={{
                    fontSize: "16px", color: "#555555"
                }}>{this.privateVar.account[i].name}</span></span></div>);
            }
            innerView = (<div style={{ width: "100%", display: "inline-block", marginTop: "15px" }}>
                {accountView}
            </div>);
        } else if (this.privateVar.status == 2) {
            innerView = (<div>暂不能获取可充值账户！</div>);
        } else {
            innerView = (<div>暂不能获取可充值账户！</div>);
        }
        return (<div style={{
            backgroundColor: gVar.Color_background,
            height: '100%',
            overflow: "hidden"
        }}>
            {innerView}
            <div className="input_recharge_num"><span style={{
                color: "#666666", fontSize: "16px"
            }}>充值金额：</span><input className="input_money" style={{
                color: "#666666", fontSize: "16px", border: "none", width: "70%"
            }} type="text"  placeholder="输入金额"  />
            </div>
            <div className="pay_type zhifubao" style={{
                verticalAlign: "center", color: "#666666", fontSize: "16px", lineHeight: "25px"
            }}>
                <img alt="" src={zhifubao1} width={25} height={25} style={{
                    marginRight: "10px"
                }}/>
                支付宝充值
                <img  src={paySelected} width={20} height={20} alt="" style={{
                    marginRight: "10px", verticalAlign: "center", float: "right", marginTop: "3px"
                }}/>
            </div>
            <button className="pay_now" type="button" style={{
                border: "none", fontSize: "16px", display: "block", background: "#00ACFF", color: "#ffffff"
            }} onTouchStart={this.payTouchStartHandle.bind(this) } onClick={this.payRecharge} onTouchCancel={this.payTouchStopHandle.bind(this) } onTouchEnd={this.payTouchStopHandle.bind(this) }>立即支付</button>
        </div>);
    }
});
// innerView = (<div style={{ width: "100%", display: "inline-block", marginTop: "15px" }}>
//                 <div className="pay_style_item" onClick={this.selectPayTypeHandle.bind(this, 0) }><span style={{
//                     display: "table", margin: "auto"
//                 }}><span className="pay_style_radio" ></span><span style={{
//                     fontSize: "16px", color: "#555555"
//                 }}>运费账户</span></span></div>
//                 <div className="pay_style_item" onClick={this.selectPayTypeHandle.bind(this, 1) }><span style={{
//                     display: "table", margin: "auto"
//                 }}><span className="pay_style_radio" /><span style={{
//                     fontSize: "16px", color: "#555555"
//                 }}>关税账户</span></span></div>
//                 <div className="pay_style_item" onClick={this.selectPayTypeHandle.bind(this, 2) }><span style={{
//                     display: "table", margin: "auto"
//                 }}><span className="pay_style_radio" /><span style={{
//                     fontSize: "16px", color: "#555555"
//                 }}>购物账户</span></span></div>
//             </div>);
module.exports = ZhiFu;