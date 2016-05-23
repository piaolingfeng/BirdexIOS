var React=require('react');
var triangle_down=require('../../main/image/triangle_down.png');
var triangle_up=require('../../main/image/triangle_up.png');
var laydown=require('../../main/image/laydown.png');
var BPopover = require('../../components/BPopover/bpopover.js');
var LimitView=React.createClass({
    getInitialState:function() {
        return {item1select:false};
    },
    propTypes:{
        //设置左侧点击 参数flag表示点击元素
        limitClick:React.PropTypes.func,
        popMenuItemClick:React.PropTypes.func
    },
    clickHandle:function(index,ele){
        if(index==0){
            this.setState({item1select:!this.state.item1select});
        }
        if(this.propTypes.limitClick){
            this.propTypes.limitClick(index);
        }
    },
    menuItemClick: function (index) {
        this.props.popMenuItemClick(index);
    },
    render:function(){
        var mytrigger=(<div style={{
            float:"left"
        }} ><span>全部仓库</span><img src={laydown}/></div>);
        var menuArray=["美国仓","日本仓","澳洲仓","意大利仓","南非仓","英国仓"];
        return (<div style={{
            height:"35px",
            lineHeight:"35px",
            padding:"0px 10px",
            borderBottom:"1px solid #ddd",
            backgroundColor:"#f5f4f4"
        }}>
        <BPopover menuItem={menuArray}
						  menuItemClick={this.menuItemClick}
				          triggerComp={mytrigger}
						  placement="bottom" />	
        <div style={{
            float:"right"
        }} onClick={this.clickHandle.bind(this,0)}><span>可用数量</span><img src={this.state.item1select?triangle_down:triangle_up}/></div>
        </div>);
    }
});
module.exports=LimitView;