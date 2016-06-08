var React=require('react');
require('./css/tablayout.css');
var $magicLine ;
//设置选中的tab索引
var selectIndex=0;
//胡伟，用在支出，iscroll做的
var TabLayout=React.createClass({
    propTypes:{
        //回调的方法获取item
        selectTab:React.PropTypes.func,
        //tab的文本
        tabsText:React.PropTypes.array,
        //tab的宽度
        tabsWidth:React.PropTypes.array,
        //默认选中的
        defualtIndex:React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            tabsText:[],
            tabsWidth:[],
            defualtIndex:0
        };
    },
    componentWillMount:function(){
        //设置默认选中的
        selectIndex=this.props.defualtIndex;
    },
    componentDidMount: function () {
        //对滑动的初始化
        listview(window, document); 
        var myScroll = new iScroll('wrapper_tablayout', { eventPassthrough: true, scrollX: false, scrollY: false, preventDefault: false ,hScrollbar: false,
         	vScrollbar: false,bounce:false});
        $magicLine = $(".tablayout-line");
        // $magicLine
        // .width($(".current_tab").width())
        // .css("left", $(".current_tab").position().left)
        // .data("origLeft", $magicLine.position().left)
        // .data("origWidth", $magicLine.width());
    },
    tabSelectChange:function(index,isCheck,ele){
        if(index<this.props.tabsWidth.length){
            var $el = $(ele.target);
            $("li").removeClass("current_tablayout");
            $el.addClass(" current_tablayout ");
            // var leftPos = $el.parent().position().left;
            // var newWidth = $el.parent().width();
            var leftPos = 0;
            for(var i=0;i<index;i++){
                leftPos+=this.props.tabsWidth[i];
            }
            var newWidth =this.props.tabsWidth[index];
            $magicLine.stop().animate({
                left: leftPos+"px",
                width: newWidth+"px"
            });
        
            this.setState({defualtIndex:index});
            //对选中的进行处理
            if(this.props.selectTab){
               this.props.selectTab(index);
             }
            //记录新的索引值
            selectIndex=index;
        }
        // //对选中的进行处理
        // if(this.props.selectTab){
        //     this.props.selectTab(index,isCheck);
        // }
    },
    render:function() {
        //tab宽度设置
        var tlwidth=0;
        var list=new Array();
        for(var i=0;i<this.props.tabsText.length;i++){
            var tabClass=" item_tablayout ";
            if(i==this.props.defualtIndex){
                tabClass+=" current_tablayout ";
            }
            var tabwidth=0;
            if(i<this.props.tabsWidth.length){
                tabwidth=this.props.tabsWidth[i];
            }
            tlwidth+=tabwidth;
            list.push(<li className={tabClass} onClick={this.tabSelectChange.bind(this,i,true)} style={{
                width:tabwidth,fontSize:"14px"
            }}>{this.props.tabsText[i]}</li>);
        }
        return (<div id="wrapper_tablayout">
            <div id="scroller_tablayout" style={{
            width:tlwidth
        }}><ul>{
                list
            }<li  className="tablayout-line" style={{
            width:"60px",bottom:"2px",left:"0",height:"2px",backgroundColor:"#fe4902",
            position:"absolute"
        }} /></ul></div>
        </div>);
    }
});
module.exports=TabLayout;