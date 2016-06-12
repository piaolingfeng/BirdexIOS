
var CallIOS = {
    //调用系统相机
    openCamera(id) {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://camera?text="+id);
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
    openPhoto(id) {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://photo?text="+id);
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
        iFrame.setAttribute("src", "ios://scann");
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
    
     //上传身份证
    uploadId() {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://uploadId");
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
    
     //上传头像
    uploadHead() {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://uploadHead");
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
    
     //通讯录
    open_Contact() {
        var iFrame;
        iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "ios://contact");
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