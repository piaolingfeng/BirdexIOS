var React=require('react');
require('./css/tablayout.css');
var TabLayout=React.createClass({
    propTypes:{
        //回调的方法获取item
        selectTab:React.PropTypes.func,
        //tab的文本
        tabsText:React.PropTypes.array,
        //tab的宽度
        tabsWidth:React.PropTypes.array
    },
    getDefaultProps: function() {
        return {
            tabsText:[],
            tabsWidth:[]
        };
    },
    componentDidMount: function () {
        //对滑动的初始化
        listview(window, document); 
        var myScroll = new iScroll('wrapper_tablayout', { eventPassthrough: true, scrollX: false, scrollY: false, preventDefault: false ,hScrollbar: false,
         	vScrollbar: false,bounce:false});
    },
    tabSelectChange:function(index,isCheck){
        //对选中的进行处理
        if(this.props.selectTab){
            this.props.selectTab(index,isCheck);
        }
    },
    render:function() {
        //tab宽度设置
        var tlwidth=0;
        var list=new Array();
        for(var i=0;i<this.props.tabsText.length;i++){
            var tabwidth=0;
            if(i<this.props.tabsWidth.length){
                tabwidth=this.props.tabsWidth[i];
            }
            tlwidth+=tabwidth;
            list.push(<li onClick={this.tabSelectChange.bind(this,i,true)} style={{
                width:tabwidth
            }}><a href="#">{this.props.tabsText[i]}</a></li>);
        }
        return (<div id="wrapper_tablayout">
            <div id="scroller_tablayout" style={{
            width:tlwidth
        }}><ul>{
                list
            }</ul></div>
        </div>);
    }
});
module.exports=TabLayout;