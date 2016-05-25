import React from 'react'
require('./css/inventory.css');
var InventoryItem=require('./inventoryitem.js');
var WillinItem=require('./willinitem.js');

var ListView=require('../../components/listview/listview.js');

//简单的tab设置
var SimpleTabLayout=require('../../components/tablayout/simpletablayout.js');
//查询限制条件
var LimitView=require('./limitview.js');
//搜索条件
var Search = require('../../components/search/search.js');
// var listitem=[];
// var inventoryIndex=0;
var Inventory = React.createClass({
  privateProps:{
    listitem:[]
  },
  componentDidMount:function(){
    if(this.props.todayDataName){
      // inventoryIndex=2;
      this.setState({inventoryIndex:2});
    }
  },
  getInitialState:function() {
    this.privateProps.listitem=[];
    return {
      inventoryIndex:0,
      //对状态修改进行数据切换
      flag:true
    };
  },
  renderItem:function(){
    // var listitem=new Array();
    if(this.state.inventoryIndex==0){
      this.privateProps.listitem.push(<InventoryItem />);
      this.privateProps.listitem.push(<InventoryItem />);
      this.privateProps.listitem.push(<InventoryItem />);
    }else if(this.state.inventoryIndex==1){
      this.privateProps.listitem.push(<WillinItem />);
      this.privateProps.listitem.push(<WillinItem />);
      this.privateProps.listitem.push(<WillinItem />);
    }else{
      this.privateProps.listitem.push(<InventoryItem />);
      this.privateProps.listitem.push(<InventoryItem />);
      this.privateProps.listitem.push(<InventoryItem />);
    }
    return this.privateProps.listitem;
    },
    pullUpEvent:function(){
      if(this.state.inventoryIndex==0){
      this.privateProps.listitem.push(<InventoryItem />);
      this.privateProps.listitem.push(<InventoryItem />);
      this.privateProps.listitem.push(<InventoryItem />);
    }else if(this.state.inventoryIndex==1){
      this.privateProps.listitem.push(<WillinItem />);
      this.privateProps.listitem.push(<WillinItem />);
      this.privateProps.listitem.push(<WillinItem />);
    }else{
      this.privateProps.listitem.push(<InventoryItem />);
      this.privateProps.listitem.push(<InventoryItem />);
      this.privateProps.listitem.push(<InventoryItem />);
    }
      this.setState({flag:!this.state.flag});
    },
    selectTab:function(index){
      this.privateProps.listitem=[];
      // inventoryIndex=index;
      this.setState({inventoryIndex:index});
      return ;
    },
    selectLimitItem:function(index){
      //设置选择条件的
      return;
    },
    limitClick:function(index){
      
    },
    popMenuItemClick:function(index){
      
    },
  render:function(){
    return (<div >
    <SimpleTabLayout selectTab={this.selectTab} defualtIndex={this.state.inventoryIndex} tabsText={["在库商品","待入库商品","超预警商品"]} />
    <Search />
    <LimitView limitClick={this.limitClick} popMenuItemClick={this.popMenuItemClick}/>
    <div style={{color:"#039FFF",paddingLeft:"10px",backgroundColor:"#f5f4f4",textAlign:"left",width:"100%"}}>共有57条数据</div>
    <div >
    <ListView marginTop={199} backGroud="#eeeeee" pullDownHandler={this.pullUpEvent} pullUpHandler={this.pullUpEvent}  getItems={this.renderItem} />
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