var React=require('react');
var gVar = require('../../main/global.js');
var InventoryFragment=require('../../fragments/inventory/inventory.js');
var TitleBar = require('../../components/titlebar/titlebar.js');
var MyInventory=React.createClass({
    render:function(){
        var title = this.props.title+"";
        return (<div className="titlebar_extend_head" style={{backgroundColor:gVar.Color_white}}>
               <TitleBar  title={title} menu="true" menuFunc={this.menuFunc}/>
               <div className="titlebar_head_down">
                    <InventoryFragment />
                    
               </div>
            </div>);
    }
});
module.exports=MyInventory;