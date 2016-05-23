var React = require('react');
var gVar = require('../../main/global.js');
var Status = require('./status.js');
var TitleBar = require('../../components/titlebar/titlebar.js');
var Search = require('../../components/search/search.js');
var OrderList =require('./orderlist.js');
var ListView = require('../../components/listview/listview.js');

var list = new Array();
var FragmentOrder = React.createClass({
    
    getItem:function(index){
        console.log(1);
        for(var i=0;i<10;i++){
            list.push(<OrderList />);
        }
       return list;
    },
    
    render:function(){
        return(
            <div style={{backgroundColor:gVar.Color_background}}>
               <Search />
               <Status />
               <div >
                    <ListView getItems={this.getItem} marginTop={180}/>
               </div>
            </div>
        );
    }
    
});

module.exports = FragmentOrder;