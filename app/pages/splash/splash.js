var React = require('react');
var welcome = require('./welcome.jpg');
var gVar = require('../../main/global.js');

var CallIOS = require('../../util/CallIOS.js');

var Splash = React.createClass({

    componentDidMount() {
        setTimeout(function () {
            if (!localStorage.getItem(gVar.FIRST_ENTRY_APP)) {
                localStorage.setItem(gVar.FIRST_ENTRY_APP,true)
                gVar.pushPage("introduce");
            } else {
                if (localStorage.getItem("company_code") &&
                    localStorage.getItem('company_name') &&
                    localStorage.getItem('company_short_name') &&
                    localStorage.getItem('user_code')&&
                    localStorage.getItem("log_name")&&
                    localStorage.getItem("log_password")&&
                    localStorage.getItem("USER-TOKEN")) {
                    gVar.pushPage("portal"); 
                } else {
                    gVar.pushPage("login");
                }
            }
        }, 10);//2秒后
        setTimeout(function (params) {
            CallIOS.loadfinish();
        },1000);
    },

    render() {
// <img src={welcome} style={{width:"100%",height:"100%"}}/>
        return (
            <div style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"#ffffff",fontSize:"30px"}}>
                
            </div>
        );
    },
});

module.exports = Splash;