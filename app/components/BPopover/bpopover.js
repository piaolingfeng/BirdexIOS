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
    
    menuClick: function (idx) {
        //console.log("menu click ");        
        //console.log(arguments);
        ReactDOM.findDOMNode(this.refs.triggerref).click();
        this.props.menuItemClick(idx);
    },

      
    render: function() {
        
        var count = this.props.menuItem.length;
        var el = new Array();
        for (var i = 0; i < count; i++) {
            el[i] = <div className="popitem" onClick={this.menuClick.bind(this, i)} >{this.props.menuItem[i]}</div>
        }
        
        var pop = <Popover id="oAIHFEFUH">{el}</Popover>;
        //return <img src={menupic} id="aabbcc"alt="aaaaa" />;
        
        var comp = React.cloneElement(this.props.triggerComp, {ref:"triggerref"});
        
        return (<OverlayTrigger trigger="click" placement={this.props.placement} rootClose={true} overlay={pop}>
                    {comp}
                </OverlayTrigger>);
            
    }
});

module.exports = BPopover;