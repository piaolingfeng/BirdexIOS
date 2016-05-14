import React from 'react';
// import ReactDOM from 'react-dom';
require('./css/scrollbar.css'); 
require('./css/scrolllist.css');

var myScroll; var pullDownEl; var pullDownOffset; var pullUpEl; var pullUpOffset; var generatedCount = 0;
var  ListView  = React.createClass({
    statics:{
        stopAnimation:function(){
            if(myScroll){
                myScroll.refresh();
            }
        }
    },
    getInitialState: function() {
        return {listitems: new Array()}
    },
    propTypes:{
        //回调的方法获取item
        getItems: React.PropTypes.func.isRequired,
        //是否含有上拉
        showUpload:React.PropTypes.bool,
        //是否含有下拉
        showDownload:React.PropTypes.bool
    },
    getDefaultProps: function() {
        //设置默认属性
        return {
            showUpload: true,
            showDownload:true
        };
    },
    pullUpAction :function() {
    var lvcompotent=this;
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        lvcompotent.setState({listitems: lvcompotent.state.listitems.concat(lvcompotent.props.getItems(12))});
		myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
        
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
},
    
    pullDownAction:function(){
        var lvcompotent=this;
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        lvcompotent.setState({listitems: lvcompotent.state.listitems.concat(lvcompotent.props.getItems(12))});
		myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
},
componentDidMount: function () {
    //对滑动的初始化
    listview(window, document); 
    pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
    var lvcompotent=this;
    //设置拉伸只能进行一次
    var flag=true;
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar', /* 重要样式 */
		useTransition: true, /* 此属性不知用意，本人从true改为false */
        
        hScroll        : false,
         	vScroll        : true,
         	hScrollbar     : false,
         	vScrollbar     : false,
         	fixedScrollbar : true,
         	fadeScrollbar  : false,
         	hideScrollbar  : true,
         	bounce         : true,
         	momentum       : true,
         	lockDirection  : true,
         	checkDOMChanges: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function () {
			// if (this.y > 5 && !pullDownEl.className.match('flip')) {
			// 	pullDownEl.className = 'flip';
			// 	pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
			// 	this.minScrollY = 0;
			// } else if (this.y < 5 && pullDownEl.className.match('flip')) {
			// 	pullDownEl.className = '';
			// 	pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			// 	this.minScrollY = -pullDownOffset;
			// } else 
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始加载...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			// if (pullDownEl.className.match('flip')) {
			// 	pullDownEl.className = 'loading';
			// 	pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
			// 	// pullDownAction();	// Execute custom function (ajax call?)
            //     lvcompotent.pullDownAction();
			// } else 
            if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				// pullUpAction();	// Execute custom function (ajax call?)
                lvcompotent.pullUpAction();
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
    //初始化绑定iScroll控件 
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
},
    render:function () {
        var datasource=[];
        for(var i=0;i<this.state.listitems.length;i++){
            datasource.push(<li>{this.props.getItems(i)}</li>);
        }
        return (<div id="wrapper"><div id="scroller"   >
        <div id="pullDown" >
			<span className="pullDownIcon"></span><span className="pullDownLabel">下拉刷新...</span>
		</div>
        <ul id="thelist">
        {
            datasource
        }
        </ul>
        <div id="pullUp">
			<span className="pullUpIcon" ></span><span className="pullUpLabel">上拉加载更多...</span>
		</div>
        </div>
        <div style={{
            clear:"both"
        }}></div>
        </div>);
    },
    handleTouchMove:function(e) {
        // alert('12');
        // ReactDOM.findDOMNode(this.refs.listview).preventDefault();
        e.preventDefault();
    }
});
module.exports=ListView;