
var React = require('react');

var pic1 = require('./image/1.jpg');
var pic2 = require('./image/2.jpg');
// var pic3 = require('./image/3.png');
var Carousel = require('react-bootstrap').Carousel;

var LunBo = React.createClass({

	render: function () {
		// data-interval 控制轮播时间，默认5秒
		return (
			<div id="carousel-example-generic" className="carousel slide" data-ride="carousel" data-interval="4000">
				<ol className="carousel-indicators">
					<li data-target="#carousel-example-generic" data-slide-to="0" className="active" style={{ height: "5px", width: "5px", marginBottom: "1px" }}></li>
					<li data-target="#carousel-example-generic" data-slide-to="1" style={{ height: "5px", width: "5px", marginBottom: "1px", marginLeft: "2px" }}></li>
				</ol>

				<div className="carousel-inner" >
					<div className="item active">
						<img src={pic1} alt="First slide" />
					</div>
					<div className="item">
						<img src={pic2} alt="Second slide" />
					</div>
				</div>

				<a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
					<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
					<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
		);
	},

	// render: function () {
	// 	return (
	// 		<div id="myCarousel" className="carousel slide">

	// 			<ol className="carousel-indicators">
	// 				<li data-target="#myCarousel" data-slide-to="0" className="active" style={{ height: "5px", width: "5px", marginBottom: "1px" }}></li>
	// 				<li data-target="#myCarousel" data-slide-to="1" style={{ height: "5px", width: "5px", marginBottom: "1px", marginLeft: "2px" }}></li>
	// 			</ol>

	// 			<div className="carousel-inner">
	// 				<div className="item active">
	// 					<img src={pic1} alt="First slide" />
	// 				</div>
	// 				<div className="item">
	// 					<img src={pic2} alt="Second slide" />
	// 				</div>
	// 			</div>

	// 			<a className="carousel-control left" href="#myCarousel"
	// 				data-slide="prev">&lsaquo; </a>
	// 			<a className="carousel-control right" href="#myCarousel"
	// 				data-slide="next">&rsaquo; </a>
	// 		</div>

	// 	);
	// }
	// render: function () {
	// 	return (
	// 		<div>
	// 			<ol className="carousel-indicators">
	// 				<li data-target="#myCarousel" data-slide-to="0" className="active" style={{ height: "5px", width: "5px", marginBottom: "1px" }}></li>
	// 				<li data-target="#myCarousel" data-slide-to="1" style={{ height: "5px", width: "5px", marginBottom: "1px", marginLeft: "2px" }}></li>
	// 			</ol>
	// 			<Carousel>

	// 				<Carousel.Item>
	// 					<img  alt="900x500" src={pic1}/>
	// 					<Carousel.Caption>
	// 					</Carousel.Caption>
	// 				</Carousel.Item>
	// 				<Carousel.Item>
	// 					<img  alt="900x500" src={pic2}/>
	// 					<Carousel.Caption>
	// 					</Carousel.Caption>
	// 				</Carousel.Item>

	// 			</Carousel>
	// 		</div>
	// 	);
	// },
});

module.exports = LunBo;
