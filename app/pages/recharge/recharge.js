var React=require('react');
var ZhiFu=require('../../fragments/zhifu/zhifu.js');
//胡伟
var Recharge=React.createClass({
    render:function(){
        return (<div style={{backgroundColor:"#eeeeee",
                width:"100%",height:"100%"
            }}>
           <ZhiFu />
        </div>);
    }
});
module.exports=Recharge;