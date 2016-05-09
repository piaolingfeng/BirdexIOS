
var React = require('react');

var pic1 = require('./image/1.jpg');
var pic2 = require('./image/2.jpg');
var pic3 = require('./image/3.png');


var LunBo = React.createClass({
  	
  	render: function() {
  		return (
  		<div id="myCarousel" className="carousel slide">
	   	
	   	<ol className="carousel-indicators">
	    	<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
	      	<li data-target="#myCarousel" data-slide-to="1"></li>
	      	<li data-target="#myCarousel" data-slide-to="2"></li>
	   	</ol>

	   	<div className="carousel-inner">
	      <div className="item active">
	         <img src={pic1} alt="First slide" />
	      </div>
	      <div className="item">
	         <img src={pic2} alt="Second slide" />
	      </div>
	      <div className="item">
	         <img src={pic3} alt="Third slide" />
	      </div>
	   	</div>

	   	<a className="carousel-control left" href="#myCarousel" 
	      data-slide="prev">&lsaquo;</a>
	   	<a className="carousel-control right" href="#myCarousel" 
	      data-slide="next">&rsaquo;</a>
		</div> 

		);
  }
});

module.exports = LunBo;
