var React = require('react');
var EventBus = require('eventbusjs');

require('./css/accountmanager.css');

var TitleBar = require('../../components/titlebar/titlebar.js');

var upImg = require('./image/up.png');
var downImg = require('./image/down.png');

var toast = require('../../util/Tips/tips.js');

var gVar = require('../../main/global.js');


var companyBaseData = [
    {
        name:"签约公司名称：",
        value:"",
        type:0,
        width:100 
    },
    {
        name:"公司简称：",
        value:"",
        type:0,
        width:100 
    },
    {
        name:"总部所在地：",
        value:"",
        type:0,
        width:100 
    }
    ,
    {
        name:"详细地址：",
        value:"",
        type:1,
        width:100 
    }
];

var zhuyingitemData = [
    {
        name:"主营市场：",
        value:"",
        type:0,
        width:120
    },
    {
        name:"订单平均客单价：",
        value:"",
        type:1,
        width:120
    }
];

var yewuModel = [
    {
        name:"业务模式：",
        value:"",
        type:0,
        width:75
    },
    {
        name:"清关服务：",
        value:"",
        type:1,
        width:75
    }
];

var contactsData = [
    {
        name1:"商务总负责人：",
        name2:"",
        phone:"",
        email:"",
        type:0
    },
    {
        name1:"财务对接人：",
        name2:"",
        phone:"",
        email:"",
        type:1
    },
    {
        name1:"IT对接人：",
        name2:"",
        phone:"",
        email:"",
        type:1
    }
];

var excpeitonEmail = "";

var AmItem = React.createClass({
    render:function(){
        return (
            <div>
                <tr>
                    <td style={{fontSize:13,color:"#979797",textAlign:"right",width:this.props.info.width,paddingBottom:10}}>{this.props.info.name}</td>
                    <td style={{fontSize:13,color:"#979797",textAlign:"left",paddingBottom:this.props.info.type==0?"10px":"0px"}}>{this.props.info.value}</td>
                </tr>
            </div>
        );
    }
});

var AmItemList = React.createClass({
    render:function(){
        
        var items = this.props.info.map(function(iteminfo){
            return <AmItem info={iteminfo}/>
        });
        
        return (
            <div>
                <table className="" style={{width:"100%",textAlign:"center",margin:"0 auto"}}>
                    <tbody>
        
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
});

var Contacts = React.createClass({
    render: function(){
        return (
            <div style={{borderBottom:"1px #ddd solid",paddingTop:this.props.info.type==1?10:0}}>
                <div style={{paddingBottom:5}}>
                    <span style={{fontSize:13,color:"#979797",marginLeft:5}}>{this.props.info.name1}</span>
                    <span style={{fontSize:13,color:"#979797"}}>{this.props.info.name2}</span>
                </div>
                <div style={{paddingBottom:7}}>
                    <div style={{display:"inline-block",width:"50%"}}>
                        <span style={{fontSize:13,color:"#979797",marginLeft:5}}>手机号：</span>
                        <span style={{fontSize:13,color:"#979797"}}>{this.props.info.phone}</span>
                    </div>
                    <div style={{display:"inline-block",width:"50%"}}>
                        <span style={{fontSize:13,color:"#979797"}}>邮箱：</span>
                        <span style={{fontSize:13,color:"#979797"}}>{this.props.info.email}</span>
                    </div>
                </div>
            </div>
        );
    }    
});

var ContactsList = React.createClass({
    render:function(){
        
        var items = this.props.info.map(function(item){
            return <Contacts info={item}/>;
        });
        
        return (
            <div>
                {items}
                <div style={{paddingTop:10}}>
                    
                    <span style={{fontSize:13,color:"#979797",display:"inline-block",width:"50%",paddingLeft:5}}>异常件通知</span>
                    <div style={{display:"inline-block",width:"50%"}}>
                        <span style={{fontSize:13,color:"#979797"}}>邮箱：</span>
                        <span style={{fontSize:13,color:"#979797"}}>{excpeitonEmail}</span>
                    </div>
                </div>
            </div>
        );
    }
});


var AM = React.createClass({
    
    componentDidMount:function(){
        $('#collapseOne').collapse({
            toggle: false
        }),
        $('#collapseTwo').collapse({
            toggle: false
        }),
        $('#collapseThree').collapse({
            toggle: false
        }),
        $('#collapseFour').collapse({
            toggle: false
        })
        
        this.init();
    },
    
    init:function name(params) {
        var param = {
            // app_debug: 1,
            // company_code: localStorage.getItem("company_code"),
            // user_code: localStorage.getItem('user_code')
		};
		// console.log(param)
        var url = gVar.getBASE_URL() + 'Company/get'
        gVar.sendRequest(param,url,this.initSuccess);
		// $.ajax({
        //     data: param,
        //     url: gVar.getBASE_URL() + 'Company/get',
        //     dataType: 'json',
        //     cache: false,
		// 	// beforeSend: function(xhr){xhr.setRequestHeader('DEVICE-TOKEN','DEVICE-TOKEN');},//这里设置header
		// 	// xhrFields: {
		// 	// 	withCredentials: true
		// 	// },
        //     success: function (data) {
        //         // this.setState({ data: data });
		// 		// alert("success");
		// 		this.initSuccess(data);
        //     }.bind(this),
        //     error: function (xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
		// 		toast(err);
        //     }.bind(this)
        // });

		return;
    },
    
    initSuccess:function (data) {
        console.log(data);
        if(0==data.error){
            
            var marketsName = "";
            var marketsNameArr = data.data.markets_name;
            console.log(marketsNameArr);
            for(var i=0;i<marketsNameArr.length;i++){
                var name = marketsNameArr[i].name;
                if(i>0){
                    marketsName += ",";
                }
                marketsName += name;
            }
            
            var busName = "";
            var busNameArr = data.data.business_models_name;
            console.log(busNameArr);
            for(var i=0;i<busNameArr.length;i++){
                var name = busNameArr[i].name;
                if(i>0){
                    busName += ",";
                }
                busName += name;
            }
            
            var qgName = "";
            var qgNameArr = data.data.qg_models_name;
            console.log(qgNameArr);
            for(var i=0;i<qgNameArr.length;i++){
                var name = qgNameArr[i].name;
                if(i>0){
                    qgName += ",";
                }
                qgName += name;
            }
            
            companyBaseData = [
                {
                    name:"签约公司名称：",
                    value:data.data.company_name,
                    type:0,
                    width:100 
                },
                {
                    name:"公司简称：",
                    value:data.data.company_short_name,
                    type:0,
                    width:100 
                },
                {
                    name:"总部所在地：",
                    value:data.data.province + data.data.city + data.data.area,
                    type:0,
                    width:100 
                }
                ,
                {
                    name:"详细地址：",
                    value:data.data.address,
                    type:1,
                    width:100 
                }
            ];
            
            zhuyingitemData = [
                {
                    name:"主营市场：",
                    value:marketsName,
                    type:0,
                    width:120
                },
                {
                    name:"订单平均客单价：",
                    value:data.data.order_avg_price,
                    type:1,
                    width:120
                }
            ];
            
            var contacts = data.data.contacts;
            
            // 商务负责人
            var swName = "";
            var swPhone = "";
            var swEmail = "";
            // 出入库负责人
            var oiName = "";
            var oiPhone = "";
            var oiEmail = "";
            // 财务对接人
            var cwName = "";
            var cwPhone = "";
            var cwEmail = "";
            // IT对接人
            var itName = "";
            var itPhone = "";
            var itEmail = "";
            // 异常件通知
            excpeitonEmail = data.data.notice_email;
            
            for(var i=0;i<contacts.length;i++){
                var contact = contacts[i];
                if(contact.contact_type == "10"){
                    swName = contact.name;
                    swPhone = contact.phone;
                    swEmail = contact.email;
                }
                if(contact.contact_type == "20"){
                    oiName = contact.name;
                    oiPhone = contact.phone;
                    oiEmail = contact.email;
                }
                if(contact.contact_type == "30"){
                    cwName = contact.name;
                    cwPhone = contact.phone;
                    cwEmail = contact.email;
                }
                if(contact.contact_type == "40"){
                    itName = contact.name;
                    itPhone = contact.phone;
                    itEmail = contact.email;
                }
            }
            
            contactsData = [
                {
                    name1:"商务总负责人：",
                    name2:swName,
                    phone:swPhone,
                    email:swEmail,
                    type:0
                },
                {
                    name1:"出入库负责人：",
                    name2:oiName,
                    phone:oiPhone,
                    email:oiEmail,
                    type:1
                },
                {
                    name1:"财务对接人：",
                    name2:cwName,
                    phone:cwPhone,
                    email:cwEmail,
                    type:1
                },
                {
                    name1:"IT对接人：",
                    name2:itName,
                    phone:itPhone,
                    email:itEmail,
                    type:1
                }
            ];
            
            yewuModel = [
                {
                    name:"业务模式：",
                    value:busName,
                    type:0,
                    width:75
                },
                {
                    name:"清关服务：",
                    value:qgName,
                    type:1,
                    width:75
                }
            ];
            
            this.setState({});
        }
    },
    
    divclick:function(mes){
        var base = document.getElementById("base");
        var main = document.getElementById("main");
        var contacts = document.getElementById("contacts");
        var model = document.getElementById("model");
        if(mes == "base"){
            base.click;
            var baseimg = document.getElementById("baseimg");
            if(baseimg.src == upImg){
                baseimg.src = downImg;
            } else {
                baseimg.src = upImg;
            }
        }
        if(mes == "main"){
            main.click;
            var mainimg = document.getElementById("mainimg");
            if(mainimg.src == upImg){
                mainimg.src = downImg;
            } else {
                mainimg.src = upImg;
            }
        }
        if(mes == "contacts"){
            contacts.click;
            var contactsimg = document.getElementById("contactsimg");
            if(contactsimg.src == upImg){
                contactsimg.src = downImg;
            } else {
                contactsimg.src = upImg;
            }
        }
        if(mes == "model"){
            model.click;
            var modelimg = document.getElementById("modelimg");
            if(modelimg.src == upImg){
                modelimg.src = downImg;
            } else {
                modelimg.src = upImg;
            }
        }
    },
    
    render:function() {
        return (
            <div className="am-maindiv">
                <TitleBar  title="账户管理" />
                
                <div className="panel-group" id="accordion">
                    <div className="panel panel-default" style={{marginTop:80}}>
                        <div onClick={this.divclick.bind(this,"base")} className="panel-heading" style={{backgroundColor:"#FFFFFF"}} data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseOne">
                            <h4 className="panel-title" style={{fontSize:16,display:"inline-block"}}>
                                <a id="base" data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseOne">
                                    企业基本信息
                                </a>
                            </h4>
                            
                            <img id="baseimg" src={downImg} style={{float:"right",width:"20px"}}></img>
                        </div>
                        <div id="collapseOne" className="panel-collapse collapse in">
                            <div className="panel-body">
                                <AmItemList info={companyBaseData}/>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div onClick={this.divclick.bind(this,"main")} className="panel-heading" style={{backgroundColor:"#FFFFFF"}} data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseTwo">
                            <h4 className="panel-title" style={{fontSize:16,display:"inline-block"}}>
                                <a id="main" data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseTwo">
                                    企业主营信息
                                </a>
                            </h4>
                            
                            <img id="mainimg" src={upImg} style={{float:"right",width:"20px"}}></img>
                        </div>
                        <div id="collapseTwo" className="panel-collapse collapse">
                            <div className="panel-body">
                                <AmItemList info={zhuyingitemData}/>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div onClick={this.divclick.bind(this,"contacts")} className="panel-heading" style={{backgroundColor:"#FFFFFF"}} data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseThree">
                            <h4 className="panel-title" style={{fontSize:16,display:"inline-block"}}>
                                <a id="contacts" data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseThree">
                                    联系人信息
                                </a>
                            </h4>
                            
                            <img id="contactsimg" src={upImg} style={{float:"right",width:"20px"}}></img>
                        </div>
                        <div id="collapseThree" className="panel-collapse collapse">
                            <div className="panel-body">
                                <ContactsList info={contactsData} />
                            </div>
                        </div>
                    </div>
                    <div onClick={this.divclick.bind(this,"model")} className="panel panel-default">
                        <div className="panel-heading" style={{backgroundColor:"#FFFFFF"}} data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseFour">
                            <h4 className="panel-title" style={{fontSize:16,display:"inline-block"}}>
                                <a id="model" data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseFour">
                                    业务模式
                                </a>
                            </h4>
                            
                            <img id="modelimg" src={upImg} style={{float:"right",width:"20px"}}></img>
                        </div>
                        <div id="collapseFour" className="panel-collapse collapse">
                            <div className="panel-body">
                                <AmItemList info={yewuModel}/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
    
});

module.exports = AM;
