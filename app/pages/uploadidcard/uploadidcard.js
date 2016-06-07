var React = require('react');

require('./uploadidcard.css');

var camera = require('./image/camera.png');

var TitleBar = require('../../components/titlebar/titlebar.js');

var gVar = require('../../main/global.js');

var toast = require('../../util/Tips/tips.js');

var UploadIdcard = React.createClass({
    
    componentDidMount:function() {
        // 初始化数据
        this.init();
    },
    
    init:function name(params) {
        var param = {
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code'),
            order_code: this.props.location.state.order_code
		};
        console.log(param);
        var url = gVar.getBASE_URL() + 'Order/get';
        gVar.sendRequest(param, url, this.initSuccess);
		
    },
    
    initSuccess:function (data) {
        console.log(data);
        if(0==data.error){
            $('#idcard').val(data.data.receiver_id_card);
        }
    },
    
    render:function name(params) {
        return (
            <div className="titlebar_extend_head">
                <TitleBar  save="上传身份证" bgColor={gVar.Color_blue_head} />
                <div className="titlebar_head_down uploadidcard-main">
            
                    <input id="idcard" type="text" className="uploadidcard-input" placeholder="输入身份证号："></input>
                    
                    <div className="uploadidcard-imgdiv" style={{}}>
                        <img className="img-rounded uploadidcard-img"></img>
                    </div>
                    <div className="uploadidcard-imgdiv"  style={{marginLeft:"7%"}}>
                        <img className="img-rounded uploadidcard-img"></img>
                    </div>
                    <div className="uploadidcard-textdiv" style={{}}>
                        身份证-正面照片
                    </div>
                    <div className="uploadidcard-textdiv" style={{marginLeft:"7%"}}>
                        身份证-背面照片
                    </div>
                    
                    <button type="button" className="btn btn-primary" style={{width:"50%",background:"#13A7DF",display:"block",margin:"0 auto",marginTop:"100px"}}>确认上传</button>
                    <button type="button" className="btn btn-default" style={{width:"50%",background:"white",display:"block",margin:"0 auto",marginTop:"20px",borderColor:"#8D8C8E"}}>取   消</button>
                </div>
            </div>
        );
    }
    
});

module.exports = UploadIdcard;