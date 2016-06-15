var React = require('react');
var company_img = require('./image/company_img.png');
var gVar = require('../../main/global.js');
var Titlebar = require("../../components/titlebar/titlebar.js"); 
//胡伟
var About = React.createClass({
    render: function() {
            return ( 
                <div className="titlebar_extend_head" style={{backgroundColor:gVar.Color_white}}>
                <Titlebar  title="关于"/>
                <div className="titlebar_head_down" style={{paddingTop:gVar.Padding_titlebar}}>
                <div  style = {{
                        width: "100%",
                        height: "100%",
                        textAlign: "center"
                    }}>
                < img src = {company_img}
                style = {{
                        marginTop: "50px",
                        width: "107px",
                        height: "30px"
                    }}/> <p style={{
                        textAlign:"left",
                marginTop: "50px",
                marginLeft: "30px",
                fontSize: "11px",
                lineHeight:"20px",
                marginRight: "30px",
                color: "#9b9b9b",
                textIndent: "2em"
            }} >
        笨鸟海淘是第三方转运物流服务商,成立于2014年1月,致力于为跨境电商提供优质物流仓储管理以及代理清关等服务.笨鸟海淘目前在全球一共开设6个仓库,分别是美国波特兰仓、美国LA仓、澳洲悉尼仓、香港仓、日本仓、韩国仓，2016年将陆续推出德国仓、英国仓、澳洲墨尔本、美国纽约、意大利等仓库.</p>  <div 
    style = {{
            position: "absolute",
            textAlign: "center",
            width: "100%",
            bottom: "80px",
            color: "#9b9b9b",
            fontSize: "10px"
        }} > <div > 手机访问： www.birdex.cn </div> <div > 当前版本：B1.0.1
    for IOS </div></div> </div > 
    </div>
            </div>);
}});
module.exports = About;