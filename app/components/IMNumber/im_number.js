
var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('./im_number.css');
var gVar = require('../../main/global.js');

var IMNumber = React.createClass({

	propTypes: {
        position: React.PropTypes.number
    },

	numberOnclick() {
		console.log(this.props.prompt);
		var toolPageIndex = "";
		if (this.props.prompt.indexOf('预报') >= 0) {
			toolPageIndex = 1;
		} else {
			if (this.props.prompt == '库存预警') {
				toolPageIndex = 2;
			} else {
				toolPageIndex = 0;
			}
		}
		var param = {
			todayDataName: this.props.prompt,
			titleIndex: toolPageIndex,
		};
		gVar.pushPage({ pathname: "mytool", state: param });
	},

	render: function () {
		var position = this.props.position;
        var lineDisplay = "block";
		// alert(position);
        if (position != null) {
            var i = (position  + 1 ) % 3;
            if (i == 0) {
				lineDisplay = "none";
            }
        }
		return (
			<div className="im_number_head" onClick={this.numberOnclick}>
				<div style={{ float: "right", width: "0.5px", height: "70px", background: "#CBCBCB", display: lineDisplay }}></div>
                <div  style={{paddingBottom:"10px",paddingTop:"10px"}}>

					<div className="imnumber im_number_text" key={global.uniqueKey++} style={{
						color: (this.props.hide ? "white" : "red"),
						fontSize: "13pt",
						marginTop: "5pt"
					}}>
						{this.props.number}
					</div>

					<div className="im_number_text" style={{ fontSize: "10pt" }}>
						{this.props.prompt}
					</div>
				</div>
			</div>

		);
	}
});

module.exports = IMNumber;
