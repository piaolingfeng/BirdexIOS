var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-bootstrap').Modal;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;

var dialogIsShowing = false;

var dlgTitleSaved = null;
var dlgBodySaved = null;
var okCallbackSaved = null;
var cancelCallbackSaved = null;

var inputComp = null;

//显示模态框
//dlgTitle: 标题, string类型
//dlgBody: React.Element类型, 或 等于"input" 此时body是一个输入框
//okCallback: 确定按钮被按下的回调, 为null时不显示此按钮
//            okCallback(inputText)
//cancelCallback: 取消按钮被按下的回调, 为null时不显示此按钮
function showDialog(dlgTitle, dlgBody, okCallback, cancelCallback, showIt) {
    
    if (showIt !== false)
    {
        showIt = true;
    }
        
    console.log("showDialog");
    
    dlgTitleSaved = dlgTitle;
    dlgBodySaved = dlgBody;
    okCallbackSaved = okCallback;
    cancelCallbackSaved = cancelCallback;

    var domNode = document.getElementById("dlgNode8921");
    if (domNode != null)
    {
        //ReactDOM.unmountComponentAtNode(domNode);
    }
    else
    {
        domNode = document.createElement("div");
        domNode.setAttribute("id", "dlgNode8921");
        document.body.appendChild(domNode);
    }
    
    var bodyComp = null;
    
    if (dlgBody == "input")
    {
        bodyComp = <FormControl ref={function (theInput){inputComp = theInput}} componentClass="textarea" placeholder="textarea" />;
    }
    else
    {
        bodyComp = dlgBody;
    }
    
    var footer = null;
    
    if (okCallback != null && cancelCallback != null)
    {
        footer = <Modal.Footer>
                    <Button onClick={cancelClick} >取消</Button>
                    <Button onClick={okClick} bsStyle="primary">确定</Button>
                 </Modal.Footer>;
    }
    else if (okCallback != null)
    {
        footer = <Modal.Footer>
                    <Button onClick={okClick} bsStyle="primary">确定</Button>
                 </Modal.Footer>;
    }
    else if (cancelCallback != null)
    {
        footer = <Modal.Footer>
                    <Button onClick={cancelClick} >关闭</Button>
                 </Modal.Footer>;
    }
    
    ReactDOM.render(
        <Modal show={showIt} onHide={hideDialog} >
            <Modal.Header closeButton>
                <Modal.Title>{dlgTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bodyComp}
            </Modal.Body>
            {footer}
        </Modal>, 
        
        domNode);
}

function hideDialog() {
    showDialog(dlgTitleSaved, dlgBodySaved, okCallbackSaved, cancelCallbackSaved, false);    
}

function okClick() {
    
    hideDialog();
    
    if (dlgBodySaved == "input") {
        var value = ReactDOM.findDOMNode(inputComp).value;
        okCallbackSaved(value);
    }
    else
    {
        okCallbackSaved();
    }
}

function cancelClick() {
     hideDialog();
     okCallbackSaved();
}

module.exports = showDialog;

