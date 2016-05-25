var React=require('react');
require('./css/simpletablayout.css');
var $magicLine ;
//设置选中的tab索引
// var selectIndex=0;
var SimpleTabLayout=React.createClass({
    // privateProps:{
    //     selectIndex:0
    // },
    // getInitialState:function(){
    //     return {defualtIndex:0}
    // },
    propTypes:{
        //tab的文本
        tabsText:React.PropTypes.array,
        //设置点击事件
        selectTab:React.PropTypes.func,
        //默认选中的
        defualtIndex:React.PropTypes.number
    },
    getDefaultProps:function(){
        return {tabsText:[],
            defualtIndex:0};
    },
    componentWillMount:function(){
        //设置默认选中的
        // selectIndex=this.props.defualtIndex;
        // this.privateProps.selectIndex=this.props.defualtIndex;
    },
    componentDidMount:function(){
        $magicLine = $(".simpletablayout-line");
        
         var $el = $('.nav_simple_tablayout').find('li').eq(this.props.defualtIndex);
            var leftPos = $el.position().left;
            $magicLine.stop().animate({
                left: leftPos
            });
        // $magicLine
        // .width($(".current_tab").width())
        // .css("left", $(".current_tab").position().left)
        // .data("origLeft", $magicLine.position().left)
        // .data("origWidth", $magicLine.width());
        // if(this.props.defualtIndex!=0){
        //     this.setState({defualtIndex:2});
        // }
    },
    handlerTab:function(index,ele){
        if(index!=this.props.defualtIndex){
            var $el = $(ele.target);
            // var leftPos = $el.parent().position().left;
            // var newWidth = $el.parent().width();
            var leftPos = $el.position().left;
            var newWidth = $el.width();
            $magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            });
            if(this.props.selectTab){
               this.props.selectTab(index);
             }
            this.setState({defualtIndex:index});
            //记录新的索引值
            // this.privateProps.selectIndex=index;
        }
    },
    componentDidUpdate:function(){
        // if(selectIndex!=0){
            var $el = $('.nav_simple_tablayout').find('li').eq(this.props.defualtIndex);
            var leftPos = $el.position().left;
            $magicLine.stop().animate({
                left: leftPos
            });
        // }
    },
    render:function(){
        var tabs=new Array();
        var tabwidth="100%";
        for(var i=0;i<this.props.tabsText.length;i++){
            var tabClass="item_tab";
            if(i==this.props.defualtIndex){
                tabClass+=" current_tab ";
            }
            tabs.push(<li className={tabClass} style={{
                width:100/this.props.tabsText.length+"%"
            }} onClick={this.handlerTab.bind(this,i)}>{this.props.tabsText[i]}</li>);
            //}} onClick={this.handlerTab.bind(this,i)}><a href="#">{this.props.tabsText[i]}</a></li>);
        }
        var left="0%";
        if(this.props.tabsText.length!=0){
            tabwidth=100/this.props.tabsText.length+"%";
            left=this.props.defualtIndex*100/this.props.tabsText.length+"%";
        }
        //,left:left
        return (<div className="nav_simple_tablayout"><ul>
        {tabs}<li className="simpletablayout-line" style={{
            width:tabwidth
        }}></li>
        </ul></div>);
    }
});
module.exports=SimpleTabLayout;