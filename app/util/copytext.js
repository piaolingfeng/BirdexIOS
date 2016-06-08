
//复制文本
function copyUtil(text) {
    var iFrame;
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("src", "ios://copy?copytext=" + text);
    //发送请求，原生截获请求
    iFrame.setAttribute("style", "display:none;");
    iFrame.setAttribute("height", "0px");
    iFrame.setAttribute("width", "0px");
    iFrame.setAttribute("frameborder", "0");
    document.body.appendChild(iFrame);
    // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉  
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
}

module.exports = copyUtil;