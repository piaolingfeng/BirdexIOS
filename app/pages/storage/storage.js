
var React = require('react');

var NavHeader = require('../../components/NavHeader/NavHeader.js');

var StoragePage = React.createClass({

	componentDidMount: function () {

		$.post("http://127.0.0.1/birdapi/company/stat",
				{ "app_debug": "1", "user_code":global.user_code, "company_code":global.company_code},
				function(response, status, xhr){
		     		
		     		
			   	}.bind(this), 
			   	"json");
	},

	render: function() {
		return (<div>
					<NavHeader />
					<div className="container">
						<ol className="nav nav-pills nav-justified">
							<li><a href="">在库商品</a></li>
							<li><a href="">待入库商品</a></li>
						</ol>
					</div>
				</div>);
  	}
});

module.exports = StoragePage;
