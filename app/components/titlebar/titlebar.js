var ic_setting = require("./images/ic_setting.png");
var menu = require("./images/menu.png");
var React = require('react');
var back_chevron = require("./images/back_chevron.png");
var gVar = require("../../main/global.js");
require("./css/titlebar.css");
var BPopover = require('../BPopover/bpopover.js');

//props.title,传标题名字进来
//props.save,副标题,只传副标题时,默认标题颜色为灰色,
//props.bGcolor 传标题背景色.
//props.menu,传值时表示显示，true时为menu,false表示为设置
//titlebar 是浮动的div,所以titlebar的外层div需要设置paddingtop的属性让元素往下移动：50px;
//参考page下面的todaydata的使用方式
// menuFunc={this.menuFunc},menuFunc是menu回调,不传默认跳转mytool页面
var birdpic = require('../../pages/testpopmenu/bird.png');
var Titlebar = React.createClass({
    
    propTypes:{
        menuFunc: React.PropTypes.func,
    },
    
    componentDidMount:function(){
        
    },
    
    back:function () {
        // alert("back");
        gVar.popPage();
        return;
    },
    
    // menu:function(){
        // this.ref.menu.src = ic_setting;
        // this.refs.save.style.visibility="visible";
        // this.refs.menu.content="dfdfsafdfdsfd";
        // $("#menu").content.text =  "dfadfdsafd";
        // this.setState();
        // alert("menu");
        
    //     return; 
    // },
    
    menuItemClick: function (index) {
		console.log("popover click item " + index);
        if(this.props.menuFunc){
            gVar.pushPage("mytool");
            // global.router.histroy.push({ pathname: "mytool", state: { title:"ddddd" } }); 
        }
        else
            this.props.menuFunc(index);
        // return;
	},
    
    render:function(){
        var bg_color = gVar.Color_blue_head;
        if(this.props.bgColor!=null){
            bg_color = this.props.bgColor;
        }
        var title = this.props.title;
        var save = this.props.save;
        if(save!=null&&this.props.bgColor==null){//默认不传头部颜色的情况下
            bg_color = gVar.Color_gray_head;
        }
        var rightImgIsdisplay = this.props.menu;
        var rightImg = null;
        var rightImg_display = "none";
        if(rightImgIsdisplay!=null){
            rightImg_display = "block"
            if(rightImgIsdisplay == "true"){
                rightImg = menu;
            }
            else
                rightImg = ic_setting;
        };
        var mytrigger = <img className="titlebar_menu" ref="menu" src={rightImg} 
                style={{padding:gVar.Padding_head,display:rightImg_display}}/>;
        // var mytrigger = <div style={{textAlign:"center"}}><img src={birdpic} /></div>;
        return (
        <div className="titlebar_head" style={{
            backgroundColor:bg_color,
        }}>
            
            <img className="titlebar_img" src={back_chevron}  onClick={this.back} style={{padding:gVar.Padding_head}}/>
            <div className="titlebar_right" >
                <span className="titlebar_save" ref="save" style={{color:gVar.Color_white,fontSize:gVar.FontSize_title_head,padding:gVar.Padding_text_head,margin:"auto",fontWeight:"bold"}}>{save}</span>
                
                <BPopover menuItem={gVar.mytool}
						  menuItemClick={this.menuItemClick}
				          triggerComp={mytrigger}
						  placement="bottom" />	
            </div>
            <div ref="title" style={{width:"50%",left:'0',top:"0",padding:gVar.Padding_text_head,margin:"auto",
            color:gVar.Color_white,fontSize:gVar.FontSize_title_head,fontWeight:"bold"}}>{title}</div>
            
        </div>);
        
    },
    
});

module.exports = Titlebar;