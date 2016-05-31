var React = require('react');
var ReactDOM = require('react-dom');

function showModalPage(modalPage) {
    
    var domNode = document.getElementById("modalPage2198");
    if (domNode != null)
    {
        //ReactDOM.unmountComponentAtNode(domNode);
    }
    else
    {
        domNode = document.createElement("div");
        domNode.setAttribute("id", "modalPage2198");
        domNode.setAttribute("style", "z-index:99999;position:absolute;left:0;right:0;width:100%;height:100%;background-color:#FFFFFF;");
        domNode.setAttribute("class", "page-fadein");
        document.body.appendChild(domNode);
    }
    
    ReactDOM.render(modalPage, domNode);
}

function hideModalPage() {
    var domNode = document.getElementById("modalPage2198");
    if (domNode != null)
    {
        domNode.setAttribute("class", "page-fadeout");
        //ReactDOM.unmountComponentAtNode(domNode);
        //document.body.removeChild(domNode);
        domNode.addEventListener('webkitAnimationEnd', function (){
            console.log("webkitAnimationEnd");
            ReactDOM.unmountComponentAtNode(this);
            document.body.removeChild(this);
        });
        return true;
    }
    else
    {
        return false;
    }
}

module.exports = {showModalPage, hideModalPage};

