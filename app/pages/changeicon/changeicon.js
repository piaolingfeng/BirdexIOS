var React = require('react');

var gVar = require("../../main/global.js");
var TitleBar = require('../../components/titlebar/titlebar.js');

var head = require('../myaccount/image/head.png');

var showDialog = require('../../components/BDialog/bdialog.js');

var CI = React.createClass({
    
    save(){
        
    },
    
    componentDidMount(){
         $('#logo').attr("src",this.props.location.state.url);
    },
    
    error:function name(params) {
        $('#logo').attr("src",head);
    },
    
    photo(){
        alert("phote");  
        showDialog("", "",null,null,false);
    },
    
    album(){
        alert("album");  
        showDialog("", "",null,null,false);
    },
    
    changeIcon(){
        var dlgBody = <div><div style={{fontSize:16,marginBottom:"10px"}} onClick={this.photo}>拍照</div><div style={{fontSize:16,marginBottom:"10px"}} onClick={this.album}>从手机相册获取</div></div>;
        showDialog("", dlgBody);
    },
    
    render:function() {
        return (<div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_white }}>
            <TitleBar  title="修改头像" save="保存" bgColor={gVar.Color_blue_head} saveFunc={this.save}/>
            <div className="titlebar_head_down">
                <img id="logo" style={{width: "100%",marginTop:"70px"}} onError={this.error} onClick={this.changeIcon} />
            </div>
        </div>);
    }
    
});

module.exports = CI;