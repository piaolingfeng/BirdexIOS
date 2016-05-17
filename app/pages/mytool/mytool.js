var React = require('react');
var gVar = require('../../main/global.js');
var FragmentOrder = require('../../fragments/order/fragmentorder.js');
var FragmentPredict = require('../../fragments/prediction/fragmentpredict.js');
var TitleBar = require('../../components/titlebar/titlebar.js');
var MyTool =React.createClass({
    
    menuFunc:function(id){
        alert(id);
        // e.cancelBubble = true;
        // e.stopPropagation();
        // e.preventDefault();
        return;
    },
    
    render:function(){
        var title = this.props.title+"";
        
        return(
            <div className="titlebar_extend_head" style={{backgroundColor:gVar.Color_white}}>
               <TitleBar  title={title} menu="true" menuFunc={this.menuFunc}/>
               <div className="titlebar_head_down">
                    <FragmentOrder />
                    
               </div>
            </div>
            
        );
    }
});

module.exports = MyTool;