import React from 'react';
// import ReactDOM from 'react-dom';
require('./css/scrollbar.css');
require('./css/scrolllist.css');

var myScroll; var pullDownEl; var pullDownOffset; var pullUpEl; var pullUpOffset; var generatedCount = 0;
var ListView = React.createClass({
    statics: {
        stopAnimation: function () {
            if (myScroll) {
                myScroll.refresh();
            }
        }
    },
    getInitialState: function () {

        return {}
    },

    handRefresh() {//手动调用刷新,可以解决刚开始时拖不动的情况
        if (myScroll) {
            myScroll.refresh();
        }
    },

    destory() {
        myScroll = null;
    },

    propTypes: {
        //回调的方法获取item
        getItems: React.PropTypes.func.isRequired,
        //下拉加载的方法
        pullDownHandler: React.PropTypes.func.isRequired,
        //上拉加载的方法
        pullUpHandler: React.PropTypes.func.isRequired,
        //是否含有上拉
        showUpload: React.PropTypes.bool,
        //是否含有下拉
        showDownload: React.PropTypes.bool,
        //距离上部高度
        marginTop: React.PropTypes.number,
        //item背景颜色
        backGroud: React.PropTypes.string,
        //距离底部高度
        marginBottom: React.PropTypes.number,
        //下拉条背景颜色
        showUploadBgColor: React.PropTypes.string,
        //滚动到指定位置
        position: React.PropTypes.number,
        //创建完成后回调scroll对象的引用
        getCoreObject:React.PropTypes.func,
    },
    getDefaultProps: function () {
        //设置默认属性

        return {
            showUpload: false,
            showDownload: true,
            marginTop: 0,
            backGroud: "#ffffff"
        };
    },
    pullUpAction: function () {
        var lvcompotent = this;
        // setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        // lvcompotent.setState({listitems: lvcompotent.state.listitems.concat(lvcompotent.props.getItems(12))});
        // if(this.props.pullUpHandler){
        try {
            lvcompotent.props.pullUpHandler(myScroll);
        } catch (error) {
            console.log(error);
        }
        // }else{
        // alert(1);
        // }
        // myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)

        // }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
    },

    pullDownAction: function () {
        var lvcompotent = this;
        // setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        // lvcompotent.setState({listitems: lvcompotent.state.listitems.concat(lvcompotent.props.getItems(12))});
        // if(this.props.pullDownHandler){
        try {
            lvcompotent.props.pullDownHandler(myScroll);
        } catch (error) {
            console.log(error);
        }
        // }
        // myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
        // }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
    },
    componentDidMount: function () {

        //对滑动的初始化
        listview(window, document);
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;
        var lvcompotent = this;
        //设置拉伸只能进行一次
        var flag = true;
        myScroll = new iScroll('wrapper', {
            scrollbarClass: 'myScrollbar', /* 重要样式 */
            useTransition: true, /* 此属性不知用意从true改为false */

            hScroll: false,
            vScroll: true,
            hScrollbar: false,
            vScrollbar: false,
            fixedScrollbar: true,
            fadeScrollbar: false,
            hideScrollbar: true,
            bounce: true,
            momentum: true,
            lockDirection: true,
            // checkDOMChanges: true,
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
                if (this.y > 5 && !pullDownEl.className.match('flip') && lvcompotent.props.showUpload) {
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip') && lvcompotent.props.showUpload) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    this.minScrollY = -pullDownOffset;
                } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip') && this.y < -51 && lvcompotent.props.showDownload) { //修改上拉的时候同时造成刷新 -51为顶部的高度
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始加载...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip') && lvcompotent.props.showDownload) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function () {
                if (pullDownEl.className.match('flip') && lvcompotent.props.showUpload) {
                    pullDownEl.className = 'loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                    // pullDownAction();	// Execute custom function (ajax call?)
                    lvcompotent.pullDownAction();
                } else if (pullUpEl.className.match('flip') && lvcompotent.props.showDownload) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                    // pullUpAction();	// Execute custom function (ajax call?)
                    lvcompotent.pullUpAction();
                }
            }

        });
        if(this.props.getCoreObject){
            this.props.getCoreObject(myScroll);
        }
        // setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
        //初始化绑定iScroll控件 
        // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },

    //滚动到指定位置
    scrollToElement(position) {
        // console.log(document.querySelector('#scroller li:nth-child(' + position + ')'),"myScroll",position);
        myScroll.scrollToElement(document.querySelector('#scroller li:nth-child(' + position + ')'),100);
    },

    render: function () {
        if (myScroll) {
            myScroll.refresh();
        }
        var datasource = [];
        var ListItems = this.props.getItems();
        for (var i = 0; i < ListItems.length; i++) {
            // datasource.push(<li>{this.props.getItems(i)}</li>);
            datasource.push(<li>{ListItems[i]}</li>);
        }
        return (<div id="wrapper" style={{
            top: this.props.marginTop + "px", bottom: this.props.marginBottom + "px"
        }}><div id="scroller"   >
                <div id="pullDown" style={{ visibility: this.props.showUpload ? "visible" : "hidden", margin: "0px" }}>
                    <span className="pullDownIcon"></span><span className="pullDownLabel" style={{ height: 0, marginBottom: "30px", width: "70px" }}>下拉刷新...</span>
                </div>
                <ul id="thelist" style={{ backgroundColor: this.props.backGroud }}>
                    {
                        datasource
                    }
                </ul>
                <div id="pullUp" style={{ display: this.props.showDownload ? "" : "none" }}>
                    <span className="pullUpIcon" ></span><span className="pullUpLabel" >上拉加载更多...</span>
                </div>
            </div>
            <div style={{
                clear: "both"
            }}></div>
        </div>);
    },
    handleTouchMove: function (e) {
        // alert('12');
        // ReactDOM.findDOMNode(this.refs.listview).preventDefault();
        e.preventDefault();
    }
});
module.exports = ListView;