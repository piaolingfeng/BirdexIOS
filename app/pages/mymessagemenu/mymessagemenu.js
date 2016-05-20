var React = require('react');
var EventBus = require('eventbusjs');

var MMM = React.createClass({
    
    componentDidMount:function() {
        $("#optionsRadios1").attr("checked","checked");
        $("#optionsRadios3").attr("checked","checked");
    },
    
    render: function() {
        
        return (
            
            <div style={{position:"absolute",top:0,width:"100%",height:"100%",background:"#F1F0F0"}}>
                <div style={{marginTop:30,marginLeft:20}}>
                    <span style={{fontSize:16}}>提示消息</span>
                </div>
                
                <div style={{marginTop:10,width:"100%",background:"#FFFFFF",paddingTop:20,paddingBottom:20}}>
                    <label className="checkbox-inline" style={{width:"35%"}}>
                        <input onClick={this.check1} type="radio" name="optionsRadiosinline" id="optionsRadios1" value="option1" /> 
                        <span style={{fontSize:16,color:"#666666",marginLeft:10}}>系统提示音</span>
                    </label>
                    <label className="checkbox-inline">
                        <input onClick={this.check2} type="radio" name="optionsRadiosinline" id="optionsRadios2" value="option2"/> 
                        <span style={{fontSize:16,color:"#666666",marginLeft:10}}>不提示，只在消息中显示</span>
                    </label>
                </div>
                
                <div style={{marginTop:30,marginLeft:20}}>
                    <span style={{fontSize:16}}>消息接收时间</span>
                </div>
                
                <div style={{marginTop:10,width:"100%",background:"#FFFFFF",paddingTop:20,paddingBottom:20}}>
                    <label className="checkbox-inline" style={{width:"35%"}}>
                        <input onClick={this.check1} type="radio" name="optionsRadiosinline1" id="optionsRadios3" value="option1" /> 
                        <span style={{fontSize:16,color:"#666666",marginLeft:10}}>全天接收</span>
                    </label>
                    <label className="checkbox-inline">
                        <input onClick={this.check2} type="radio" name="optionsRadiosinline1" id="optionsRadios4" value="option2"/> 
                        <span style={{fontSize:16,color:"#666666",marginLeft:10}}>休息时间免接收</span>
                        
                    </label>
                    <br/>
                    <span style={{fontSize:14,color:"#666666",marginLeft:"49%"}}>21:00-09:00(次日)</span>
                </div>
            </div>
            
        );
        
    }
    
});

module.exports = MMM;