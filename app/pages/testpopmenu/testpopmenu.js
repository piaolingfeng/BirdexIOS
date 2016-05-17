import React from 'react';

var BPopover = require('../../components/BPopover/bpopover.js');
var birdpic = require('./bird.png');

var PopmenuPage = React.createClass({

	componentDidMount: function () {
	},

 	menuItemClick: function (index) {
		console.log("popover click item " + index);
	},

	render: function() {
		
		var mytrigger = <div style={{textAlign:"center"}}><img src={birdpic} /></div>;
		
		return (
			<div>			
				<BPopover menuItem={["aaaa", "bbbb", "cccc", "cccc", "cccc", "cccc", "cccc", "cccc", "cccc", "cccc", "cccc", "cccc", "cccc"]}
						  menuItemClick={this.menuItemClick}
				          triggerComp={mytrigger}
						  placement="bottom" />			
			</div>);		
  	}
});

module.exports = PopmenuPage;
