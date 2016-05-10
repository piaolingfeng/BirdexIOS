import React from 'react';
import ReactList from 'react-list';

var MyOrdersPage = React.createClass({

	componentDidMount: function () {
	},

 	renderItem: function(index, key) {
		 
		var itemCode = 1000000 + index;
		 
    	return (<div key={key} style={{marginBottom:"30px"}}>
					<div className="flexbox-container" style={{width:"100%", backgroundColor:"#F0F0F0"
}}>
						
						<span>{itemCode}</span> 2016-01-01 22:10
						<div>
						商品编码: 99999999
						</div>
						<div>库存不足</div>
						<hr style={{width:"100%",margin:"auto", backgroundColor:"#CBCBCB", border:0, height:"1px"}}></hr>
						
						<button style={{ borderStyle:"none", backgroundColor:"transparent", width:"30%", float:"left"}}>物流跟踪</button>
						<div style={{float:"left",width:"1px",height:"30px", background:"#000000", marginTop:"3px"}}></div>
						<button style={{ float:"left", borderStyle:"none", backgroundColor:"transparent", width:"30%"}}>联系客服</button>
						<div style={{float:"left",width:"1px",height:"30px", background:"#000000", marginTop:"3px"}}></div>
						<button style={{ float:"left", borderStyle:"none", backgroundColor:"transparent", width:"30%"}}>改派</button>
						<hr style={{width:"100%",margin:"auto", backgroundColor:"#CBCBCB", border:0, height:"1px"}}></hr>
						
					</div>
					<div style={{clear:"both",margin:"10px"}}></div>
					{(index % 2 != 0) ? <div>ABCD</div> : (<div></div>) }
				</div>);
  	},

	render: function() {
		
		//return this.renderItem(0,0);
		
		return (<div style={{marginTop:"10px"}}>
					<div style={{overflow: 'auto', maxHeight: "400px"}}>
						<ReactList
							itemRenderer={this.renderItem}
							length="300"
						/>
					</div>
					<div style={{clear:"both"}}></div>
				</div>);
  	}
});

module.exports = MyOrdersPage;
