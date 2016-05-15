var ic_setting = require("./images/ic_setting.png");
var menu = require("./images/menu.png");
var React = require('react');
var back_chevron = require("./images/back_chevron.png");
var gVar = require("../../main/global.js");
require("./css/titlebar.css");

var Titlebar = React.createClass({
    
    componentDidMount:function(){
        
    },
    
    back:function () {
        alert("back");
        return;
    },
    
    menu:function(){
        // this.ref.menu.src = ic_setting;
        // this.refs.save.style.visibility="visible";
        // this.refs.menu.content="dfdfsafdfdsfd";
        // $("#menu").content.text =  "dfadfdsafd";
        $('#menu').popover('slow');
        // this.setState();
        // alert("menu");
        return; 
    },
    
    render:function(){
        var bg_color = gVar.Color_blue_head;
        var title = "title";
        // if(this.props.bgColor != null||this.props.bgColor != ""){
        //     // bg_color = this.propTypes.bg_color;    
        //     bg_color = gVar.Color_gray_head;
        // }
        return (
        <div style={{
            width:"100%",
            position:"relative",
            backgroundColor:bg_color,
            display:"inline-block",
            textAlign:"center",
            verticalAlign:"middle",
        }}>
            
            <img className="titlebar_img" src={back_chevron}  onClick={this.back} style={{padding:gVar.Padding_head}}/>
            <div className="titlebar_right" >
                <span className="titlebar_save" ref="save" style={{color:gVar.Color_white,fontSize:gVar.FontSize_title_head,padding:gVar.Padding_text_head,margin:"auto"}}>save</span>
                <img id ="menu"  className="titlebar_menu" data-container="body"
                 data-toggle="popover" data-placement="bottom" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                ref="menu" src={menu} onClick={this.menu} style={{padding:gVar.Padding_head}}/>
                
            </div>
            <div ref="title" style={{width:"50%",left:'0',top:"0",padding:gVar.Padding_text_head,margin:"auto",
            color:gVar.Color_white,fontSize:gVar.FontSize_title_head}}>title</div>
            
        </div>);
        
    },
    
});

module.exports = Titlebar;