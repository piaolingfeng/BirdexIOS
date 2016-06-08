
var CallIOS = {
    //调用系统相机
    openCamera() {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://camera");
        //发送请求，原生截获请求
        iFrame.setAttribute("style", "display:none;");
        iFrame.setAttribute("height", "0px");
        iFrame.setAttribute("width", "0px");
        iFrame.setAttribute("frameborder", "0");
        document.body.appendChild(iFrame);
        // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉  
        iFrame.parentNode.removeChild(iFrame);
        iFrame = null;
    },

    //调用系统相册
    openPhoto() {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://photo");
        //发送请求，原生截获请求
        iFrame.setAttribute("style", "display:none;");
        iFrame.setAttribute("height", "0px");
        iFrame.setAttribute("width", "0px");
        iFrame.setAttribute("frameborder", "0");
        document.body.appendChild(iFrame);
        // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉  
        iFrame.parentNode.removeChild(iFrame);
        iFrame = null;
    },

    //调用系统电话
    phoneCall(text) {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://phoneCall?phone=" + text);
        //发送请求，原生截获请求
        iFrame.setAttribute("style", "display:none;");
        iFrame.setAttribute("height", "0px");
        iFrame.setAttribute("width", "0px");
        iFrame.setAttribute("frameborder", "0");
        document.body.appendChild(iFrame);
        // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉  
        iFrame.parentNode.removeChild(iFrame);
        iFrame = null;
    },

    //复制文本
    copyUtil(text) {
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
    },

     //扫描二维码
    open_scann() {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://scann?url=http://www.wed114.cn/jiehun/uploads/allimg/160426/39_160426110638_1.jpg");
        //发送请求，原生截获请求
        iFrame.setAttribute("style", "display:none;");
        iFrame.setAttribute("height", "0px");
        iFrame.setAttribute("width", "0px");
        iFrame.setAttribute("frameborder", "0");
        document.body.appendChild(iFrame);
        // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉  
        iFrame.parentNode.removeChild(iFrame);
        iFrame = null;
    },
}
module.exports = CallIOS;