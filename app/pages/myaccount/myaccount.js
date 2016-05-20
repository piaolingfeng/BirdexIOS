var React = require('react');
var EventBus = require('eventbusjs');

var headbg = require('./image/headbg.png');
var head = require('./image/head.png');

var gVar = require("../../main/global.js");
var TitleBar = require('../../components/titlebar/titlebar.js');

var MA = React.createClass({
    
    recharge:function() {
        gVar.pushPage("accountmanager");     
    },
    
    
    render:function () {
        return (
            <div style={{position:"absolute",top:0,width:"100%",height:"100%"}}>
                <TitleBar  title="我的账户" menu="true" menuFunc={this.menuFunc}/>
                <div style={{backgroundImage: 'url(' + headbg + ')',height:250,width:"100%",textAlign:"center",marginBottom:20}}>
				    <img className="img-circle" src={head} style={{ height:"100px",width:"100px",marginTop:"70px"}} />
                    <div style={{marginTop:10}}>
                        <span style={{color:"#FFFFFF",fontSize:17}}>XXX,欢迎您！</span>
                    </div>
			    </div>
                
                
                <table className="" style={{width:"90%",textAlign:"center",margin:"0 auto",borderBottom:"1px #ddd solid"}}>
                    
                    <thead>
                        <tr style={{borderBottom:"1px #ddd solid"}}>
                            <th style={{borderBottom:"1px #ddd solid",padding:"10",textAlign:"center",fontSize:17,color:"#979797"}}>账户类型</th>
                            <th style={{borderBottom:"1px #ddd solid",padding:"10",textAlign:"center",fontSize:17,color:"#979797"}}>余额</th>
                            <th style={{borderBottom:"1px #ddd solid",padding:"10",textAlign:"center",fontSize:17,color:"#979797"}}>信用/可用</th>
                        </tr>
                        
                        
                    </thead>
                    
                    <tbody>
                        
                        <tr>
                            <td style={{fontSize:16,color:"#979797",padding:"10",textAlign:"center"}}>运费</td>
                            <td style={{fontSize:16,color:"#4c4c4c",padding:"10",textAlign:"center"}}>￥16113.1</td>
                            <td style={{fontSize:16,color:"#4c4c4c",padding:"10",textAlign:"center"}}>
                                <div>
                                    <span style={{
                                        color:"#13A7DF"
                                    }}>￥5623</span>
                                    <hr style={{width:"90%",margin:"auto", backgroundColor:"#CBCBCB", border:0, height:"1px"}}></hr>
                                    <span style={{
                                        color:"#F5A623"
                                    }}>￥423</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontSize:16,color:"#979797",padding:"10",textAlign:"center"}}>关税</td>
                            <td style={{fontSize:16,color:"#4c4c4c",padding:"10",textAlign:"center"}}>￥23113.1</td>
                            <td style={{fontSize:16,color:"#F5A623",padding:"10",textAlign:"center"}}>
                                ￥0
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div style={{margin:"50px 100px 0 100px"}}>
			       <button onClick={this.recharge} type="button" className="btn btn-default btn-block" style={{color:"#039FFF"}}>
			       		充值
			       </button>
			   </div>
               
               <div style={{width:"20%",textAlign:"center",margin:"20px auto"}}>
                    <span style={{fontSize:16,color:"#979797"}}>收支明细</span>
               </div>
            </div>
        );
    }
});

module.exports = MA;