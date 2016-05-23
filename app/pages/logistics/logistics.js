var React = require('react');
var EventBus = require('eventbusjs');

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
        changeStat(5);
    },
    
    render:function() {
        return (
            <div className="logistics-maindiv">
                <div className="logistics-row">
                    <span className="logistics-span">
                        订单号：
                    </span>
                    <span className="logistics-span">
                        BH160513728939
                    </span>
                    <span className="logistics-span-float">下架中</span>
                </div>
                
                <div className="logistics-row">
                    <span className="logistics-span">
                        客户单号：
                    </span>
                    <span className="logistics-span">
                        BH160513728939
                    </span>
                </div>
                
                <div className="logistics-row">
                    <span className="logistics-span">
                        收件人：
                    </span>
                    <span className="logistics-span">
                        刘浩
                    </span>
                    <span className="logistics-phone">
                        13751121288
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
                    <span style={{fontSize:13,color:"#8E8E93",display:"inline-block",width:"25%"}}>0天4小时</span>
                    <span style={{fontSize:13,color:"#8E8E93"}}>出库时间：</span>
                    <span style={{fontSize:13,color:"#8E8E93"}}>2016-05-17 10:27:24</span>
                </div>
                
                <div style={{width:"100%",height:"1px",background:"#D7D7D7",marginTop:"15px"}}></div>
            </div>
        );
    }
});


module.exports = Logistics;