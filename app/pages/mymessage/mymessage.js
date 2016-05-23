var React = require('react');
var EventBus = require('eventbusjs');

var warning = require('./image/warning.png');
var arrow = require('./image/arrow.png');
var idcard = require('./image/idcard.png');
var repertory = require('./image/repertory.png');
var check = require('./image/check.png');
var account = require('./image/account.png');

var gVar = require("../../main/global.js");

var minePage = [{
    img: require('./image/warning.png'),
    name: "库存预警消息",
    top: 50
}, {
    img: require('./image/idcard.png'),
    name: "身份证异常订单",
    top: 30
}, {
    img: require("./image/repertory.png"),
    name: "库存异常订单",
    top: 1
}, {
    img: require("./image/check.png"),
    name: "审核不通过订单",
    top: 1
}, {
    img: require("./image/account.png"),
    name: "账户异常",
    top: 30
}];

var MyMessageItem = React.createClass({
    render:function() {
       return (<div style={{marginTop:this.props.top,width:"100%",height:"6%",background:"#FFFFFF"}}>
                    <img src={warning} style={{marginLeft:40,height:"50%"}}/>
                    <span style={{position:"absolute",fontSize:18,color:"#666666",marginLeft:35,height:"50%",marginTop:"3%"}}>库存预警消息</span>
                    <img src={arrow} style={{float:"right",height:"30%",marginTop:"4%",marginRight:"20"}}/>
                </div>);
    }
});


var MyMessageList = React.createClass({
    render: function() {
        var items = (<div>{
            minePage.map(function(itemInfo) {
                return <MyMessageItem info={itemInfo}/>
            })
        }</div>);
        
        // var items = minePage.map(function(itemInfo) {
        //     return <MyMessageItem info={itemInfo}/>
        // })
        return items;
    }
});
    
    
var GerenList = React.createClass({
            render: function() {
                var items = ( <div> {
                        minePage.map(function(itemInfo) { 
                           return <MyMessageItem info = {
                                itemInfo
                            }
                            />

                        })
                    } </div>);
                    return items;
                }
            });
       
           

var MM = React.createClass({
    
    messageMenu:function() {
        
		// EventBus.dispatch("changePage", null, "mymessagemenu");
		
		// return;
        gVar.pushPage("mymessagemenu");
    },
    
    render: function() {
        return (
            
            <div style={{position:"absolute",top:0,width:"100%",height:"100%",background:"#F1F0F0"}}>
                <div style={{marginTop:50,width:"100%",background:"#FFFFFF",paddingTop:10,paddingBottom:10}}>
                    <img src={warning} style={{marginLeft:40,height:30}}/>
                    <span className="" style={{fontSize:18,color:"#666666",marginLeft:20}}>库存预警消息</span>
                    <span className="badge" style={{background:"red"}}>50</span>
                </div>
                
                <div style={{marginTop:30,width:"100%",background:"#FFFFFF",paddingTop:10,paddingBottom:10}}>
                    <img src={idcard} style={{marginLeft:40,height:30}}/>
                    <span className="" style={{fontSize:18,color:"#666666",marginLeft:20}}>身份证异常订单</span>
                    <span className="badge" style={{background:"red"}}>50</span>
                </div>
                <div style={{marginTop:1,width:"100%",background:"#FFFFFF",paddingTop:10,paddingBottom:10}}>
                    <img src={repertory} style={{marginLeft:40,height:30}}/>
                    <span className="" style={{fontSize:18,color:"#666666",marginLeft:20}}>库存异常订单</span>
                    <span className="badge" style={{background:"red"}}>50</span>
                </div>
                <div style={{marginTop:1,width:"100%",background:"#FFFFFF",paddingTop:10,paddingBottom:10}}>
                    <img src={check} style={{marginLeft:40,height:30}}/>
                    <span className="" style={{fontSize:18,color:"#666666",marginLeft:20}}>审核不通过订单</span>
                    <span className="badge" style={{background:"red"}}>50</span>
                </div>
                <div id="accoutException" onClick={this.messageMenu} style={{marginTop:30,width:"100%",background:"#FFFFFF",paddingTop:10,paddingBottom:10}}>
                    <img src={account} style={{marginLeft:40,height:30}}/>
                    <span className="" style={{fontSize:18,color:"#666666",marginLeft:20}}>账户异常</span>
                    <span className="badge" style={{background:"red"}}>50</span>
                </div>
            </div>
            // <div style={{position:"absolute",top:0,width:"100%",height:"100%",background:"#F1F0F0"}}>
            //     <MyMessageList />
            // </div>
        );
    }
});

module.exports = MM;