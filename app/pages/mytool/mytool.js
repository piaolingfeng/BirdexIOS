var React = require('react');
var gVar = require('../../main/global.js');
var FragmentOrder = require('../../fragments/order/fragmentorder.js');
var FragmentPredict = require('../../fragments/prediction/fragmentpredict.js');
var FragmentRecharge = require('../../fragments/zhifu/zhifu.js');
var FragmentInventory = require('../../fragments/inventory/inventory.js');
var FragmentMyOutlay = require('../../fragments/myoutlay/myoutlay.js');

var TitleBar = require('../../components/titlebar/titlebar.js');
var currentPosition = 0;//当前页面位置
var targetPosition = 0;
var toast = require('../../util/Tips/tips.js');

// var EventBus = require('eventbusjs');使用全局加载的eventbus

var MyTool = React.createClass({

    needToScroll: false,

    menuFunc: function (id) {
        // alert(id);
        targetPosition = id;
        this.setState({ data: { titleIndex: id } });
        // console.log("first"+id);
        // e.cancelBubble = true;
        // e.stopPropagation();
        // e.preventDefault();
        return;
    },

    //复制成功
    Callback_Paste() {
        toast('复制成功!');
    },

    componentDidMount() {
        if (!EventBus.hasEventListener("Callback_Paste"))//没有注册就注册
            EventBus.addEventListener("Callback_Paste", this.Callback_Paste);
    },

    componentWillUnmount(){
        EventBus.removeEventListener("Callback_Paste", this.Callback_Paste)
    },

    //点击头部时滚动到顶部
    titleCallBack() {
        if (this.needToScroll)
            EventBus.dispatch("scrollToTop");
    },

    getInitialState() {
        currentPosition = 0;
        targetPosition = 0;
        // console.log(this.props.location.state.titleIndex + "getInitialState");
        var data = {
            titleIndex: this.props.location.state.titleIndex,
            // title: gVar.mytool[this.props.location.state.titleIndex]
            todayDataName: this.props.location.state.todayDataName,
        };
        // return {data:data};
        return { data: data };
    },
    //如果 shouldComponentUpdate 返回 false，则 render() 将不会执行，直到下一次 state 改变
    shouldComponentUpdate: function (nextProps, nextState) {
        // var titleIndex = this.state.data.titleIndex;//获取索引,setState的数据未更新过来,
        // console.log(currentPosition+"shouldComponentUpdate"+targetPosition); 
        if (currentPosition == targetPosition) {
            return false;//render将不会被调用
        }
        else {
            //  = targetPosition;
            return true;
        }
    },

    render: function () {

        var titleIndex = this.state.data.titleIndex;//获取索引
        currentPosition = titleIndex;//保存当前页面位置
        // console.log(titleIndex+"render");
        var displayPage = null;//声明张开页面变量
        switch (titleIndex) {
            case 0:
                this.needToScroll = true;
                displayPage = <FragmentOrder todayDataName = {this.state.data.todayDataName}/>;
                break;
            case 1:
                this.needToScroll = true;
                displayPage = <FragmentPredict todayDataName = {this.state.data.todayDataName}/>;
                break;
            case 2:
                this.needToScroll = false;
                displayPage = <FragmentInventory todayDataName = {this.state.data.todayDataName}/>;
                break;
            case 3:
                this.needToScroll = false;
                displayPage = <FragmentMyOutlay />;
                break;
            case 4:
                this.needToScroll = false;
                displayPage = <FragmentRecharge />;
                break;
        }
        return (
            <div className="titlebar_extend_head" style={{ backgroundColor: gVar.Color_background }}>
                <TitleBar  title={gVar.mytool[titleIndex]} menu="true" menuFunc={this.menuFunc} titleCallBack={this.titleCallBack}/>
                <div className="titlebar_head_down">
                    {displayPage}
                </div>
            </div>

        );
    }
});

module.exports = MyTool;