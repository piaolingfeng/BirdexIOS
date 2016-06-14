var React = require('react');
var welcome = require('./welcome.jpg');
var gVar = require('../../main/global.js');
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
        }, 3000);//2秒后
    },

    render() {

        return (
            <div style={{position:"absolute",width:"100%",height:"100%"}}>
                <img src={welcome} style={{width:"100%",height:"100%"}}/>
            </div>
        );
    },
});

module.exports = Splash;