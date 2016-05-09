
var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

var SideBar = React.createClass({

    // The object returned by this method sets the initial value of this.state
    getInitialState: function(){
        return {selected:0};
    },

    propTypes: {
        itempath: React.PropTypes.array.isRequired,
        itemname: React.PropTypes.array.isRequired
    },

    clickItem: function (idx, event) {

        this.setState({selected:idx});
    },
  	
  	render: function() {

        var el = new Array();
        var count = 0;

        for (var i = 0; i < this.props.itempath.length; i++)
        {
            if (i == this.state.selected)
                el[i] = <li role="presentation" className="active"><Link to={this.props.itempath[i]} onClick={this.clickItem.bind(this, i)} > {this.props.itemname[i]}</Link></li>;
            else
                el[i] = <li role="presentation"><Link to={this.props.itempath[i]} onClick={this.clickItem.bind(this, i)} > {this.props.itemname[i]}</Link></li>;    
        }

  		return (

            <ul className="nav nav-pills nav-stacked">
                {el}
            </ul>
		);
  }
});

module.exports = SideBar;
