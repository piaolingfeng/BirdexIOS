var React = require('react');
var EventBus = require('eventbusjs');

require('./css/accountmanager.css');

var TitleBar = require('../../components/titlebar/titlebar.js');

var upImg = require('./image/up.png');
var downImg = require('./image/down.png');

var companyBaseData = [
    {
        name:"签约公司名称：",
        value:"wly5555",
        type:0,
        width:100 
    },
    {
        name:"公司简称：",
        value:"gegejia",
        type:0,
        width:100 
    },
    {
        name:"总部所在地：",
        value:"河北省秦皇岛市山海关区",
        type:0,
        width:100 
    }
    ,
    {
        name:"详细地址：",
        value:"广东潮州",
        type:1,
        width:100 
    }
];

var zhuyingitemData = [
    {
        name:"主营市场：",
        value:"美国",
        type:0,
        width:120
    },
    {
        name:"订单平均客单价：",
        value:"500.00",
        type:1,
        width:120
    }
];

var yewuModel = [
    {
        name:"业务模式：",
        value:"仓储",
        type:0,
        width:75
    },
    {
        name:"清关服务：",
        value:"BC直邮",
        type:1,
        width:75
    }
];

var contactsData = [
    {
        name1:"商务总负责人：",
        name2:"喂喂鱼",
        phone:"13546745477",
        email:"1645216512@qq.com",
        type:0
    },
    {
        name1:"财务对接人：",
        name2:"胡小伟",
        phone:"13546745488",
        email:"2645216512@qq.com",
        type:1
    },
    {
        name1:"IT对接人：",
        name2:"庄晓杰",
        phone:"13546745499",
        email:"3645216512@qq.com",
        type:1
    }
];



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
                    <div style={{display:"inline-block",width:"45%"}}>
                        <span style={{fontSize:13,color:"#979797",marginLeft:5}}>手机号：</span>
                        <span style={{fontSize:13,color:"#979797"}}>{this.props.info.phone}</span>
                    </div>
                    <span style={{fontSize:13,color:"#979797"}}>邮箱：</span>
                    <span style={{fontSize:13,color:"#979797"}}>{this.props.info.email}</span>
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
                    
                    <span style={{fontSize:13,color:"#979797",display:"inline-block",width:"45%",paddingLeft:5}}>异常件通知</span>
                    
                    <span style={{fontSize:13,color:"#979797"}}>邮箱：</span>
                    <span style={{fontSize:13,color:"#979797"}}>46461346461@qq.com</span>
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
