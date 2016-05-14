import React from 'react'
import ReactList from 'react-list';
// import SwipeViews from 'react-swipe-views';
require('./css/inventory.css');
var InventoryItem=require('./inventoryitem.js');
var WillinItem=require('./willinitem.js');

var ListView=require('../../components/listview/listview.js');
var listitem=new Array();
var Inventory = React.createClass({
  renderItem:function(index){
      if(listitem.length>0){
        if(listitem.length>=(index+1)){
          //数组已经含有
          return (<WillinItem />);
        }else{
          //数组不含有需要进行网络请求
          return (<WillinItem />);
        }
      }else{
        return (<WillinItem />);
      }
    },
  render:function(){
    return <ListView getItems={this.renderItem}/>;
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
      //           <SwipeViews>
      //   <div title="Tab 1" style={{
      //       backgroundColor:"#00000"
      //   }}>
      //     Page 1
      //   </div>
      //   <div title="Tab 2">
      //     Page 2
      //   </div>
      //   <div title="Tab 3">
      //     Page 3
      //   </div>
      //   <div title="Tab 4">
      //     Page 4
      //   </div>
      //   <div title="Tab 5">
      //     Page 5
      //   </div>
      // </SwipeViews>