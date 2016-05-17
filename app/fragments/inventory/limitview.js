var React=require('react');
var triangle_down=require('../../main/image/triangle_down.png');
var triangle_up=require('../../main/image/triangle_up.png');
var laydown=require('../../main/image/laydown.png');
var LimitView=React.createClass({
    getInitialState:function() {
        return {item1select:false};
    },
    propTypes:{
        //设置左侧点击 参数flag表示点击元素
        ItemClick:React.PropTypes.func
    },
    itemClickHandle:function(index){
        if(index==0){
            
        }else if(index==1){
            this.setState({item1select:!this.state.item1select});
        }
        if(this.propTypes.ItemClick){
            this.propTypes.ItemClick(index);
        }
    },
    render:function(){
        return (<div style={{
            height:"35px",
            lineHeight:"35px",
            padding:"0px 10px",
            borderBottom:"1px solid #ddd"
        }}>
        <div style={{
            float:"left"
        }} onClick={this.itemClickHandle.bind(this,0)}><span>全部仓库</span><img src={laydown}/></div>
        <div style={{
            float:"right"
        }} onClick={this.itemClickHandle.bind(this,1)}><span>可用数量</span><img src={this.state.item1select?triangle_down:triangle_up}/></div>
        </div>);
    }
});
module.exports=LimitView;