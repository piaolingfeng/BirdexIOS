import React from 'react'
import ReactList from 'react-list';
require('./css/inventory.css');
var InventoryItem=require('./inventoryitem.js');
var WillinItem=require('./willinitem.js');

var ListView=require('../../components/listview/listview.js');
//tablayout
var TabLayout=require('../../components/tablayout/tablayout.js');
//简单的tab设置
var SimpleTabLayout=require('../../components/tablayout/simpletablayout.js');
//查询限制条件
var LimitView=require('./limitview.js');
var listitem=[];
var Inventory = React.createClass({
  inventorylist:{
    
  },
  getInitialState:function() {
    return {
      inventoryIndex:0,
      //对状态修改进行数据切换
      flag:true
    };
  },
  renderItem:function(){
    // var listitem=new Array();
    if(this.state.inventoryIndex==0){
      listitem.push(<InventoryItem />);
      listitem.push(<InventoryItem />);
      listitem.push(<InventoryItem />);
    }else if(this.state.inventoryIndex==1){
      listitem.push(<WillinItem />);
      listitem.push(<WillinItem />);
      listitem.push(<WillinItem />);
    }else{
      listitem.push(<InventoryItem />);
      listitem.push(<InventoryItem />);
      listitem.push(<InventoryItem />);
    }
    return listitem;
    },
    pullUpEvent:function(){
      if(this.state.inventoryIndex==0){
      listitem.push(<InventoryItem />);
      listitem.push(<InventoryItem />);
      listitem.push(<InventoryItem />);
    }else if(this.state.inventoryIndex==1){
      listitem.push(<WillinItem />);
      listitem.push(<WillinItem />);
      listitem.push(<WillinItem />);
    }else{
      listitem.push(<InventoryItem />);
      listitem.push(<InventoryItem />);
      listitem.push(<InventoryItem />);
    }
    //   if(this.state.inventoryIndex==0){
    //     listitem.push(<InventoryItem />);
    //     listitem.push(<InventoryItem />);
    //     listitem.push(<InventoryItem />);
    //  }else if(this.state.inventoryIndex==1){
    //     listitem.push(<WillinItem />);
    //     listitem.push(<WillinItem />);
    //     listitem.push(<WillinItem />);
    //   }else{
    //     listitem.push(<InventoryItem />);
    //     listitem.push(<InventoryItem />);
    //     listitem.push(<InventoryItem />);
    //   }
      this.setState({flag:!this.state.flag});
      console.log(this.state.flag);
    },
    selectTab:function(index){
      console.log(index);
      this.setState({inventoryIndex:index});
      return ;
    },
    selectLimitItem:function(index){
      //设置选择条件的
      return;
    },
  render:function(){
    return (<div>
    <SimpleTabLayout selectTab={this.selectTab} tabsText={["在库商品","待入库商品","超预警商品"]} />
    <LimitView />
    <div>
    <ListView marginTop={77} pullDownHandler={this.pullUpEvent} pullUpHandler={this.pullUpEvent}  getItems={this.renderItem} />
    </div>
    </div>);
    // return (<div>
    // <TabLayout selectTab={this.selectTab} tabsText={["wang","hu","zhao","qian","qin","kan","liu","han"]} 
    // tabsWidth={[60,60,60,60,60,60,60,60]}/>
    // <SimpleTabLayout selectTab={this.selectTab} tabsText={["在库商品","待入库商品","超预警商品"]} />
    // <LimitView />
    // <div>
    // <ListView  marginTop={117} getItems={this.renderItem}/>
    // </div>
    // </div>);
  }
});
// var Inventory = React.createClass({
    // renderItem:function(index, key){
    //   if(index==9){
    //     return <div>12</div>
    //   }else{
    //     return (<WillinItem />);
    //   }
    // },
//             render: function() {
//                 return ( <div style={{
//                     backgroundColor:"#f5f4f4",
//                     width:"100%"
//                 }}>

//                 <ReactList itemRenderer={this.renderItem} length="10000"/>
//                 </div>);
//                 }
//             });
module.exports=Inventory;