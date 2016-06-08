var React=require('react');
require('./css/loadingview.css');
//胡伟
var LoadingView=React.createClass({
    render:function(){
        return (<div className="loadingview_spinner">
  <div className="loadingview_rect1"></div>
  <div className="loadingview_rect2"></div>
  <div className="loadingview_rect3"></div>
  <div className="loadingview_rect4"></div>
  <div className="loadingview_rect5"></div>
</div>);
    }
});
module.exports=LoadingView;