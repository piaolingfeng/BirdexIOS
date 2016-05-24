var React = require('react');
require('./css/zhifu.css');
var zhifubao1 = require('./image/alipay48x48.png');
var paySelected = require('./image/selectreveal.png');
var radio = require('./image/radio.png');
var gVar = require('../../main/global.js');
var ZhiFu = React.createClass({
    defualtValues: {
        selectIndex: -1
    },
    payTouchStartHandle: function (ele) {
        $(ele.target).css("background-color", "#039FFF");
    },
    payTouchStopHandle: function (ele) {
        $(ele.target).css("background-color", "#00ACFF");
    },
    selectPayTypeHandle: function (index, ele) {
        if (this.defualtValues.selectIndex != -1) {
            $('.pay_style_radio:eq(' + this.defualtValues.selectIndex + ')').css("background-position", " -90px 0 ");
        }
        this.defualtValues.selectIndex = index;
        $('.pay_style_radio:eq(' + index + ')').css("background-position", " -60px -30px ");
    },
    render: function () {
        return (<div style={{
            backgroundColor: gVar.Color_background,
            height: '100%',
            overflow: "hidden"
        }}>
            <div style={{ width: "100%", display: "inline-block", marginTop: "15px" }}>
                <div className="pay_style_item" onClick={this.selectPayTypeHandle.bind(this, 0) }><span style={{
                    display: "table", margin: "auto"
                }}><span className="pay_style_radio" ></span><span style={{
                    fontSize: "16px", color: "#555555"
                }}>运费账户</span></span></div>
                <div className="pay_style_item" onClick={this.selectPayTypeHandle.bind(this, 1) }><span style={{
                    display: "table", margin: "auto"
                }}><span className="pay_style_radio" /><span style={{
                    fontSize: "16px", color: "#555555"
                }}>关税账户</span></span></div>
                <div className="pay_style_item" onClick={this.selectPayTypeHandle.bind(this, 2) }><span style={{
                    display: "table", margin: "auto"
                }}><span className="pay_style_radio" /><span style={{
                    fontSize: "16px", color: "#555555"
                }}>购物账户</span></span></div>
            </div>
            <div className="input_recharge_num"><span style={{
                color: "#666666", fontSize: "16px"
            }}>充值金额：</span><input style={{
                color: "#666666", fontSize: "16px", border: "none", width: "70%"
            }} type="text" placeholder="输入金额" />
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
            }} onTouchStart={this.payTouchStartHandle.bind(this) } onTouchCancel={this.payTouchStopHandle.bind(this) } onTouchEnd={this.payTouchStopHandle.bind(this) }>立即支付</button>
        </div>);
    }
});
module.exports = ZhiFu;