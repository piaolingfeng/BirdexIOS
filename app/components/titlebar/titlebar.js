var ic_setting = require("./images/ic_setting.png");
var menu = require("./images/menu.png");
var React = require('react');
var back_chevron = require("./images/back_chevron.png");
var gVar = require("../../main/global.js");
require("./css/titlebar.css");
var BPopover = require('../BPopover/bpopover.js');
var refresh = require('./images/refresh.png');
//props.title,传标题名字进来
//props.save,副标题,只传副标题时,默认标题颜色为灰色,
//props.bgColor 传标题背景色.
//props.menu,传值时表示显示，true时为menu,false表示为设置
//props.setting 传值时表示显示
//titlebar 是浮动的div,所以titlebar的外层div需要设置paddingtop的属性让元素往下移动：50px;
//参考page下面的todaydata的使用方式
// menuFunc={this.menuFunc},menuFunc是menu回调,不传默认跳转mytool页面
//backNoneDisplay 默认不传,若传false则代表不显示title的返回
//refreshFunc reflesh回调，默认隐藏
//saveFunc保存按钮回调方法
//backCallBack 返回时可以做回调
//titleCallBack 点击头部触发回调方法
var birdpic = require('../../pages/testpopmenu/bird.png');
var Titlebar = React.createClass({

    propTypes: {
        menuFunc: React.PropTypes.func,
        backNoneDisplay: React.PropTypes.any,
        refreshFunc: React.PropTypes.func,
        saveFunc: React.PropTypes.func,
        backCallBack: React.PropTypes.func,
        titleCallBack: React.PropTypes.func,
    },

    componentDidMount: function () {

    },

    back: function (e) {
        // alert("back");
        e.stopPropagation();
        if (this.props.backCallBack) {//返回时可以做回调
            this.props.backCallBack();
        }
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


    menuItemClick: function (index,e) {
        console.log(arguments);
        e.stopPropagation();
        var e = arguments[1];
        if (!this.props.menuFunc) {
            var param = { titleIndex: index };
            gVar.pushPage({ pathname: "mytool", state: param });
            // global.router.histroy.push({ pathname: "mytool", state: { title:"ddddd" } }); 
        }
        else
            this.props.menuFunc(index);
        // return;
    },

    settingClick(e) {
        // alert("set");
        e.stopPropagation();
        gVar.pushPage("mymessagemenu");
    },

    refreshClick(e) {
        e.stopPropagation();
        this.props.refreshFunc();
    },

    save(e) {
        e.stopPropagation();
        this.props.saveFunc();
    },

    TitlebarClick() {
        this.props.titleCallBack();
    },

    render: function () {
        var bg_color = gVar.Color_blue_head;

        var title = this.props.title;
        var save = this.props.save;
        if (save != null && this.props.bgColor == null) {//默认不传头部颜色的情况下
            bg_color = gVar.Color_gray_head;
        }
        if (this.props.bgColor != null) {
            bg_color = this.props.bgColor;
        }
        var menuImg_display = "none";
        var settingImg_display = "none";
        var backImg_display = "block";//默认显示
        if (this.props.menu) {
            menuImg_display = "block";
        }
        if (this.props.setting) {
            settingImg_display = "block";
        }
        if (this.props.backNoneDisplay) {
            backImg_display = "none";
        };
        var mytrigger = <img className="titlebar_menu" ref="menu" src={menu}
            style={{ padding: gVar.Padding_head, display: menuImg_display }} onClick={function name(e) {
                // console.log("onclick"+arguments)
                e.stopPropagation();//避免冒泡
            }}/>;
        // var mytrigger = <div style={{textAlign:"center"}}><img src={birdpic} /></div>;
        var refreshDisplay = "none";
        if (this.props.refreshFunc) {
            refreshDisplay = 'block'
        }
        return (
            <div className="titlebar_head" style={{backgroundColor: bg_color}}>
                <div onClick={this.TitlebarClick} style={{backgroundColor: bg_color,marginTop:"13px"}}>

                    <img className="titlebar_img" src={back_chevron}  onClick={this.back} style={{ padding: gVar.Padding_head, display: backImg_display, paddingRight: "24px" }}/>
                    <div className="titlebar_right" >
                        <span className="titlebar_save" ref="save" style={{ color: gVar.Color_white, fontSize: gVar.FontSize_title_head, padding: gVar.Padding_text_head, margin: "auto", fontWeight: "bold" }} onClick={this.save}>{save}</span>
                        <img className="titlebar_menu" ref="menu" src={ic_setting}
                            style={{ padding: gVar.Padding_head, display: settingImg_display }} onClick={this.settingClick}/>
                        <img className="titlebar_menu" src={refresh}
                            style={{ padding: gVar.Padding_head, display: refreshDisplay }} onClick={this.refreshClick}/>
                        <BPopover menuItem={gVar.mytool}
                            menuItemClick={this.menuItemClick}
                            triggerComp={mytrigger}
                            placement="bottom" />
                    </div>

                    <div ref="title" style={{
                        width: "50%", padding: gVar.Padding_text_head, margin: "auto",
                        color: gVar.Color_white, fontSize: gVar.FontSize_title_head, fontWeight: "bold"
                    }}>{title}</div>

                </div>
            </div>
        );

    },

});

module.exports = Titlebar;