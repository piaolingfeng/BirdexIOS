var React=require('react');
require('./css/simpletablayout.css');
var $magicLine ;
//设置选中的tab索引
var selectIndex=0;
var SimpleTabLayout=React.createClass({
    getInitialState:function(){
        return {defualtIndex:0}
    },
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
        selectIndex=this.props.defualtIndex;
    },
    componentDidMount:function(){
        $magicLine = $(".tablayout-line");
        $magicLine
        .width($(".current_tab").width())
        .css("left", $(".current_tab").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
    },
    handlerTab:function(index,ele){
        if(index!=selectIndex){
            var $el = $(ele.target);
            // var leftPos = $el.parent().position().left;
            // var newWidth = $el.parent().width();
            var leftPos = $el.position().left;
            var newWidth = $el.width();
            $magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            });
        
            this.setState({defualtIndex:index});
            if(this.props.selectTab){
               this.props.selectTab(index);
             }
            //记录新的索引值
            selectIndex=index;
        }
    },
    render:function(){
        var tabs=new Array();
        var tabwidth="100%";
        for(var i=0;i<this.props.tabsText.length;i++){
            var tabClass="item_tab";
            if(i==this.state.defualtIndex){
                tabClass+=" current_tab ";
            }
            tabs.push(<li className={tabClass} style={{
                width:100/this.props.tabsText.length+"%"
            }} onClick={this.handlerTab.bind(this,i)}>{this.props.tabsText[i]}</li>);
            //}} onClick={this.handlerTab.bind(this,i)}><a href="#">{this.props.tabsText[i]}</a></li>);
        }
        if(this.props.tabsText.length!=0){
            tabwidth=100/this.props.tabsText.length+"%";
        }
        return (<div className="nav_simple_tablayout"><ul>
        {tabs}<li className="tablayout-line" style={{
            width:tabwidth
        }}></li>
        </ul></div>);
    }
});
module.exports=SimpleTabLayout;