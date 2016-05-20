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
var EventBus = require('eventbusjs');

var Picker = require('react-mobile-picker');

var headImg = require('./image/changeadresshead.png');

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
    
    changeAddress:function(event, v){
        // 获取到 地区 code  xxxx xxxx xxxx 格式   mobiscroll.scroller.js 463
        alert(v);
        console.log(arguments);
    },
    
    componentDidMount:function() {
        var valo = $("#area").attr("areaid");
        // 默认值  ,valueo:"10064 10043 10375"   出现定位bug 暂时无法解决
	    $('#area').scroller('destroy').scroller({preset:'area', theme: 'android-ics light', display: 'bottom'});
    },
    
   
    render:function() {
        return (
            <div className="ca-maindiv" >
                <table className="changeaddress-table">
                    <tr className="changeaddress-tr">
                        <td className="changeaddress-td1">收货人：</td>
                        <td className="changeaddress-td2">
                            <input type="text" className="changeaddress-input"></input>
                        </td>
                        <td className="changeaddress-td3" rowSpan="2">
                            <img src={headImg} className="changeaddress-img"></img>
                        </td>
                    </tr>
                    <tr className="changeaddress-tr">
                        <td className="changeaddress-td1">联系电话：</td>
                        <td className="changeaddress-td2">
                            <input type="text" className="changeaddress-input"></input>
                        </td>
                    </tr>
                    <tr className="changeaddress-tr">
                        <td className="changeaddress-td1">所在地区：</td>
                        <td className="changeaddress-td2-1" colSpan="2">
                            <input id="area" placeholder="请选择所在地区" areaid="10064 10043 10375" readonly="" className="changeaddress-input" style={{width:"100%"}}></input>
                        </td>
                    </tr>
                    <tr className="changeaddress-tr">
                        <td className="changeaddress-td1">详细地址：</td>
                        <td className="changeaddress-td2-1" colSpan="2">
                            <input type="text" className="changeaddress-input"></input>
                        </td>
                    </tr>
                </table>
                
                <button onClick={this.recharge} type="button" className="btn btn-default btn-block" style={{color:"#039FFF",width:"50%",margin:"0 auto",marginTop:80}}>
			       		确定
			    </button>
            </div>
        );
    }
});

module.exports = CA;