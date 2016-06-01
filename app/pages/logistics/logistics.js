var React = require('react');
var EventBus = require('eventbusjs');

var gVar = require('../../main/global.js');

var ReactList=require('react-list');

require('./css/logistics.css'); 

// 仓库接单
var getorder_n = require('./image/getorder_n.png');
var getorder_y = require('./image/getorder_y.png');
//订单出库
var orderout_n = require('./image/orderout_n.png');
var orderout_y = require('./image/orderout_y.png');
//航空运输
var fly_n = require('./image/fly_n.png');
var fly_y = require('./image/fly_y.png');
//清关
var clear_n = require('./image/clear_n.png');
var clear_y = require('./image/clear_y.png');
//国内运输
var transportation_n = require('./image/transportation_n.png');
var transportation_y = require('./image/transportation_y.png');
//签收
var sign_n = require('./image/sign_n.png');
var sign_y = require('./image/sign_y.png');


var point = require('./image/point.png');

var trackings = "";

var TitleBar = require('../../components/titlebar/titlebar.js');

function changeStat(stat) {
    if(stat >= 0){
        paint0();
    }
    if(stat >= 1){
        paint1();
    }
    if(stat >= 2){
        paint2();
    }
    if(stat >= 3){
        paint3();
    }
    if(stat >= 4){
        paint4();
    }
    if(stat >= 5){
        paint5();
    }
};

function paint0() {
    var div0 = document.getElementById("div0");
    var img0 = document.getElementById("img0");
    var text0 = document.getElementById("text0");
    div0.style.background = "#13A7DF";
    img0.src = getorder_y;
    text0.style.color = "#13A7DF";
}
function paint1() {
    var div1 = document.getElementById("div1");
    var img1 = document.getElementById("img1");
    var text1 = document.getElementById("text1");
    div1.style.background = "#13A7DF";
    img1.src = orderout_y;
    text1.style.color = "#13A7DF";
}
function paint2() {
    var div2 = document.getElementById("div2");
    var img2 = document.getElementById("img2");
    var text2 = document.getElementById("text2");
    div2.style.background = "#13A7DF";
    img2.src = fly_y;
    text2.style.color = "#13A7DF";
}
function paint3() {
    var div3 = document.getElementById("div3");
    var img3 = document.getElementById("img3");
    var text3 = document.getElementById("text3");
    div3.style.background = "#13A7DF";
    img3.src = clear_y;
    text3.style.color = "#13A7DF";
}
function paint4() {
    var div4 = document.getElementById("div4");
    var img4 = document.getElementById("img4");
    var text4 = document.getElementById("text4");
    div4.style.background = "#13A7DF";
    img4.src = transportation_y;
    text4.style.color = "#13A7DF";
}
function paint5() {
    var div5 = document.getElementById("div5");
    var img5 = document.getElementById("img5");
    var text5 = document.getElementById("text5");
    div5.style.background = "#13A7DF";
    img5.src = sign_y;
    text5.style.color = "#13A7DF";
}

var Logistics = React.createClass({
    
    componentDidMount:function() {
        $('#Status_name').html(this.props.location.state.Status_name);
        $('#receiver_mobile').html(this.props.location.state.Receiver_mobile)
        this.init();
    },
    
    init:function() {
        var param = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
			order_code: this.props.location.state.order_code
		};
		console.log(param)
		$.ajax({
            data: param,
            url: gVar.getBASE_URL() + 'Order/getTracking',
            dataType: 'json',
            cache: false,
			// beforeSend: function(xhr){xhr.setRequestHeader('DEVICE-TOKEN','DEVICE-TOKEN');},//这里设置header
			// xhrFields: {
			// 	withCredentials: true
			// },
            success: function (data) {
                // this.setState({ data: data });
				// alert("success");
				this.initSuccess(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
				alert(err);
            }.bind(this)
        });

		return;
    },
    
    initSuccess:function (data) {
        console.log(data);
        if(0==data.error){
            $('#order_oms_no').html(data.data.order_oms_no);
            $('#order_no').html(data.data.order_no);
            $('#receiver_name').html(data.data.receiver_name);
            $('#tracking_length').html(data.data.tracking_length);
            $('#checkout_time').html(data.data.checkout_time);
            
            changeStat(data.data.status);
            
            trackings = data.data.trackings;
            
            this.setState({});
        }
    },
    
    renderItem:function(index, key){
        var tar = trackings[index];
        return <div key={key} style={{width:"90%",height:"55px",margin:"0 auto"}}>
                    <img src={point} style={{width:"8px",height:"8px",verticalAlign:"center",marginTop:"-5px"}}></img> <span style={{display:"inline-block",marginTop:"5px",width:"90%"}}>{tar.context}</span>
                    <div></div>
                    <span style={{width:"1px",height:"30px",display:"inline-block",background:"#D7D7D7",marginLeft:'3px'}}></span>
                    <span style={{marginLeft:"8px",width:"80%",verticalAlign:"top"}}>{tar.time}</span>
               </div>;
    },
    
    refreshFunc(){
        this.init();
    },
    
    render:function() {
        return (
            <div className="logistics-maindiv titlebar_extend_head">
                <TitleBar  save="物流跟踪" bgColor={gVar.Color_blue_head} refreshFunc={this.refreshFunc}/>
                <div className="titlebar_head_down">
                <div className="logistics-row">
                    <span className="logistics-span">
                        订单号：
                    </span>
                    <span id="order_oms_no" className="logistics-span">
                        
                    </span>
                    <span id="Status_name" className="logistics-span-float"></span>
                </div>
                
                <div className="logistics-row">
                    <span className="logistics-span">
                        客户单号：
                    </span>
                    <span id="order_no" className="logistics-span">
                        
                    </span>
                </div>
                
                <div className="logistics-row">
                    <span className="logistics-span">
                        收件人：
                    </span>
                    <span id="receiver_name" className="logistics-span">
                        
                    </span>
                    <span id="receiver_mobile" className="logistics-phone">
                        
                    </span>
                    
                    <button className="btn btn-primary btn-xs logistics-button">复制物流信息</button>
                </div>
                
                <div className="logistics-trackdiv">
                    <span>
                        <div id="div0" className="logistics-trackdiv-child">
                            <img id="img0" src={getorder_n} style={{height:"30px",marginTop:"-20"}}></img>
                            <div id="text0" style={{fontSize:12,color:"#9B9B9B"}}>仓库接单</div>
                        </div>
                    </span>
                    <span>
                        <div id="div1" className="logistics-trackdiv-child">
                            <img id="img1" src={orderout_n} style={{height:"30px",marginTop:"-20"}}></img>
                            <div id="text1" style={{fontSize:12,color:"#9B9B9B"}}>订单出库</div>
                        </div>
                    </span>
                    <span>
                        <div id="div2" className="logistics-trackdiv-child">
                            <img id="img2" src={fly_n} style={{height:"30px",marginTop:"-20"}}></img>
                            <div id="text2" style={{fontSize:12,color:"#9B9B9B"}}>航空运输</div>
                        </div>
                    </span>
                    <span>
                        <div id="div3" className="logistics-trackdiv-child">
                            <img id="img3" src={clear_n} style={{height:"30px",marginTop:"-20"}}></img>
                            <div id="text3" style={{fontSize:12,color:"#9B9B9B"}}>清关</div>
                        </div>
                    </span>
                    <span>
                        <div id="div4" className="logistics-trackdiv-child">
                            <img id="img4" src={transportation_n} style={{height:"30px",marginTop:"-20"}}></img>
                            <div id="text4" style={{fontSize:12,color:"#9B9B9B"}}>国内运输</div>
                        </div>
                    </span>
                    <span>
                        <div id="div5" className="logistics-trackdiv-child">
                            <img id="img5" src={sign_n} style={{height:"30px",marginTop:"-20"}}></img>
                            <div id="text5" style={{fontSize:12,color:"#9B9B9B"}}>签收</div>
                        </div>
                    </span>
                </div>
                
                <div className="logistics-row" style={{marginTop:"100",fontSize:16,color:"#666666"}}>
                    当前轨迹
                </div>
                <div className="logistics-row">
                    <span style={{fontSize:13,color:"#8E8E93"}}>已运送：</span>
                    <span id="tracking_length" style={{fontSize:13,color:"#8E8E93",display:"inline-block",width:"25%"}}></span>
                    <span style={{fontSize:13,color:"#8E8E93"}}>出库时间：</span>
                    <span id="checkout_time" style={{fontSize:13,color:"#8E8E93"}}></span>
                </div>
                
                <div style={{width:"100%",height:"1px",background:"#D7D7D7",marginTop:"15px",marginBottom:"5px"}}></div>
                
                <ReactList itemRenderer={this.renderItem} length={trackings.length}/>
                </div>
            </div>
        );
    }
});


module.exports = Logistics;