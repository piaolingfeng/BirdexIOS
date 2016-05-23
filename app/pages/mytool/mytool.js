var React = require('react');
var gVar = require('../../main/global.js');
var FragmentOrder = require('../../fragments/order/fragmentorder.js');
var FragmentPredict = require('../../fragments/prediction/fragmentpredict.js');
var FragmentRecharge = require('../../fragments/zhifu/zhifu.js');
var FragmentInventory = require('../../fragments/inventory/inventory.js');
// var FragmentMyOutlay = require('../../fragments/myoutlay/myoutlay.js');

var TitleBar = require('../../components/titlebar/titlebar.js');
var currentPosition =0;//当前页面位置
var targetPosition = 0;
var MyTool =React.createClass({
    
    menuFunc:function(id){
        // alert(id);
        targetPosition = id;
        this.setState({data:{titleIndex:id}});
        // console.log("first"+id);
        // e.cancelBubble = true;
        // e.stopPropagation();
        // e.preventDefault();
        return;
    },
    
    componentDidMount(){
        // console.log(FragmentOrder);
    },
    
    getInitialState(){
        currentPosition = 0; 
        targetPosition = 0;
        // console.log(this.props.location.state.titleIndex + "getInitialState");
        var data = {
            titleIndex : this.props.location.state.titleIndex,
            // title: gVar.mytool[this.props.location.state.titleIndex]
            todayDataName:this.props.location.state.todayDataName,
        };
        // return {data:data};
        return {data:data};
    },
    //如果 shouldComponentUpdate 返回 false，则 render() 将不会执行，直到下一次 state 改变
    shouldComponentUpdate:function(nextProps, nextState){
        // var titleIndex = this.state.data.titleIndex;//获取索引,setState的数据未更新过来,
        // console.log(currentPosition+"shouldComponentUpdate"+targetPosition); 
        if(currentPosition == targetPosition){
            return false;//render将不会被调用
        }
        else{
            //  = targetPosition;
            return true;
        }
    },
    
    render:function(){
        
        var titleIndex = this.state.data.titleIndex;//获取索引
        currentPosition = titleIndex;//保存当前页面位置
        // console.log(titleIndex+"render");
        var displayPage = null;//声明张开页面变量
        switch(titleIndex){
            case 0:
                displayPage = <FragmentOrder todayDataName = {this.state.data.todayDataName}/>;
                break;
             case 1:
                displayPage = <FragmentPredict todayDataName = {this.state.data.todayDataName}/>;
                break;
             case 2:
                displayPage = <FragmentInventory todayDataName = {this.state.data.todayDataName}/>;
                break;
             case 3:
                displayPage = <FragmentRecharge />;
                break;
             case 4:
                displayPage = null;
                break;
        }
        return(
            <div className="titlebar_extend_head" style={{backgroundColor:gVar.Color_white}}>
               <TitleBar  title={gVar.mytool[titleIndex]} menu="true" menuFunc={this.menuFunc}/>
               <div className="titlebar_head_down">
                    {displayPage}
               </div>
            </div>
            
        );
    }
});

module.exports = MyTool;