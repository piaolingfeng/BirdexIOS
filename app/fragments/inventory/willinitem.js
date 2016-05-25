var React=require('react');
var gVar = require('../../main/global.js');
var WillinItem=React.createClass({
    itemOnClick:function(){
        gVar.pushPage("willindetail");
    },
    render:function () {
        var eles=[];
        for(var i=0;i<5;i++){
            eles.push(<span style={{
                fontSize:"14px"
            }}><span style={{
                color: "#979797"
            }}>美国仓库:</span><span style={{
            color:"#039FFF"
        }}>150</span></span>);
        }
        return (<div style = {
                        {
                            marginTop: "8px",
                            backgroundColor:"#ffffff",
                            paddingTop:"5px"
                        }
                    } onClick={this.itemOnClick.bind(this)} ><table className="table" style={{
            width:"100%",
            marginBottom:"0px"
        }}>
        <tbody>
        <tr><td colSpan="2" style={{
            fontSize:"16px",
            borderTopWidth:"0px"
        }}>商品编码:BX44645645645645646</td></tr>
        <tr><td style={{
            width:"70%",
            fontSize:"16px"
        }}>华为P9</td><td style={{
            width:"25%",
            textAlign:"center"
        }}
        ><span style={{
            color: "#979797",
            fontSize:"14px"
        }}>待入库数</span><br/><span style={{
            color:"#039FFF",
            fontSize:"18px"
        }}>123</span></td></tr>
        <tr><td colSpan="2">{eles}</td></tr>
        </tbody>
        </table></div>);
    }
    });
module.exports=WillinItem;