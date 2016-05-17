var React = require('react');
var ReactDOM = require('react-dom');

require('./bpopover.css');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Button = require('react-bootstrap').Button;



var BPopover = React.createClass({
  	
    propTypes: {
        triggerComp: React.PropTypes.element.isRequired,
        placement:React.PropTypes.string.isRequired,
        menuItem: React.PropTypes.array.isRequired,
        menuItemClick: React.PropTypes.func.isRequired      
    },
      
  	componentDidMount: function () {
		//$(function () { $("[data-toggle='popover']").popover(); });
    },
    
    menuClick: function (idx,a,b,event) {
        //console.log("menu click ");        
        //console.log(arguments);
        // e.preventDefault();
        //  console.log(event);
        // event.cancelBubble = true;
        // event.preventDefault();
        // ReactDOM.findDOMNode(this.refs.item_click);
        document.getElementById('item_click').onclick=null;
        // this.refs.item_click.onClick=null;
        console.log(idx);
        console.log(arguments);
        ReactDOM.findDOMNode(this.refs.triggerref).click();
        this.props.menuItemClick(idx);
    },

      
    render: function() {
        
        var count = this.props.menuItem.length;
        var el = new Array();
        for (var i = 0; i < count; i++) {
            el[i] = 
            <div>
              <div id="item_click" className="popitem" onClick={this.menuClick.bind(this, i)} >{this.props.menuItem[i]}</div>
               <hr style={{width:"100%",margin:"auto", backgroundColor:"#CBCBCB", border:0, height:"1px"}}></hr>
            </div>   
    }
        
        var pop = <Popover id="oAIHFEFUH" >{el}</Popover>;
        //return <img src={menupic} id="aabbcc"alt="aaaaa" />;
        
        var comp = React.cloneElement(this.props.triggerComp, {ref:"triggerref"});
        
        return (<OverlayTrigger style={{padding:"0px"}} trigger="click" placement={this.props.placement} rootClose={true} overlay={pop}>
                    {comp}
                </OverlayTrigger>);
            
    }
});

module.exports = BPopover;