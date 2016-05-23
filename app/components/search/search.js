var React = require('react');
var scan_code = require("./images/scan_code.png");
var ic_search = require('./images/ic_search.png');
var gVar = require("../../main/global.js");
require("./css/search.css");
var Search = React.createClass({
    
    openScan:function(){
      alert("open camera!");  
      return ;
    },
    
    render:function(){
        return (
            <div  style={{backgroundColor:gVar.Color_background,padding:"10px"}}>
                <div className="input-group">
                    <div className="input-group-addon search_div" ></div>
                    <input type="text" className="form-control search_input" id="exampleInputAmount" placeholder="请输入关键字..."/>
                    <div className="input-group-addon search_scan" onClick={this.openScan}></div>
                </div>
            </div>
        );
        
    }
});

module.exports = Search;