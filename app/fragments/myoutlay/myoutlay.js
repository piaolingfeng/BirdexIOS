var React = require('react');
// var ReactList=require('react-list');
//
var gVar = require('../../main/global.js');
var ListView = require('../../components/listview/listview.js');

require('./css/pickdate.css');
require('./css/myoutlay.css');
//日历选择器 http://www.lrxin.com/archives-792.html
//必须放在引用该页面之外的前面
// require('./js/mobiscroll.core.js');
// require('./js/mobiscroll_004.js');
require('./css/mobiscroll.core.css');
require('./css/mobiscroll.datetime.css');
// require('./js/mobiscroll.datetime.js');
// require('./js/mobiscroll_003.js');
// require('./js/mobiscroll.android-ics.js');
require('./css/mobiscroll_003.css');
// require('./css/mobiscroll.android-ics.css');
var toast = require('../../util/Tips/tips.js');
var LoadingView = require('../../components/loadingview/loadingview.js');


//tablayout
var TabLayout = require('../../components/tablayout/tablayout.js');

var PickDate = React.createClass({
    privateVar: {
        startStr: "开始日期",
        endStr: "结束日期"
    },
    componentWillUnmount:function(){
        this.privateVar.startStr="开始日期";
        this.privateVar.endStr="结束日期";
    },
    propTypes: {
        getTimeSpan: React.PropTypes.func,
    },
    getDefaultProps: function () {
        return { getTimeSpan: function (start, end) { } };
    },
    getInitialState: function () {
        return { status: 0 };
    },
    componentDidMount: function () {
        $(function () {
            var currYear = (new Date()).getFullYear();
            var opt = {};
            opt.date = { preset: 'date' };
            opt.datetime = { preset: 'datetime' };
            opt.time = { preset: 'time' };
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式 
                mode: 'mix', //日期选择模式
                dateFormat: 'yyyy-mm-dd',
                lang: 'zh',
                showNow: true,
                nowText: "今天",
                startYear: currYear - 10, //开始年份
                endYear: currYear + 10 //结束年份
            };

            $(".pickdate_start").mobiscroll($.extend(opt['date'], opt['default']));
            $(".pickdate_end").mobiscroll($.extend(opt['date'], opt['default']));
        });
    },
    searchByTime: function () {
        var start = $(".pickdate_start").val();
        var end = $(".pickdate_end").val();
        var theDate = new Date();
        var starttimes = 0;
        var endtimes = 0;
        // console.log(theDate.getFullYear()+"  " + (theDate.getMonth() + 1) + "  "+theDate.getDate());
        var nowtime = new Date(theDate.getFullYear(), (theDate.getMonth()), theDate.getDate());
        var nowtimes = theDate.getTime();
        // console.log("    2-   " + nowtime);
        if (start.indexOf('-') > -1) {
            var arr = start.split("-");
            var starttime = new Date(arr[0], (parseInt(arr[1]) - 1), arr[2]);
            starttimes = starttime.getTime();
            if (starttimes > nowtimes) {
                toast('开始时间在今天之前!');
                return;
            }
        }
        if (end.indexOf('-') > -1) {
            var arr = end.split("-");
            var endtime = new Date(arr[0], (parseInt(arr[1]) - 1), arr[2]);
            endtimes = endtime.getTime();
            if (endtimes > nowtimes) {
                toast('结束时间在今天之前!');
                return;
            }
        }
        if (starttimes > 0 && endtimes > 0 && starttimes > endtimes) {
            toast('开始时间必须在结束时间之前!');
            return;
        }
        if (start.indexOf('-') == -1) {
            this.privateVar.startStr = '开始日期';
        } else {
            this.privateVar.startStr = start;
        }
        if (end.indexOf('-') == -1) {
            this.privateVar.endStr = '结束日期';
        } else {
            this.privateVar.endStr = end;
        }
        if (this.props.getTimeSpan) {
            if (start.indexOf('-') == -1) {
                start = '';
            }
            if (end.indexOf('-') == -1) {
                end = '';
            }
            this.props.getTimeSpan(start, end);
        }
    },
    render: function () {
        return (<div className="pickdate content">
            <input value={this.privateVar.startStr} className="pickdate_start" readonly="readonly"  type="button" />
            <input value={this.privateVar.endStr} className="pickdate_end" readonly="readonly"  type="button" />
            <div className="pickdate_sure" onClick={this.searchByTime}>交易时间</div>
        </div>);
    }
});

var MyOutlay = React.createClass({
    privateVar: {
        params: {
            page_no: 1,
            start_date: '',
            end_date: '',
            //全部-0，运费支出-1，仓租-2，关税-3，在线充值-4，其它-5
            transaction_type: 0,
            app_debug: 1,
            company_code: localStorage.getItem("company_code"),
            user_code: localStorage.getItem('user_code')
        },
        dataSource: [],
        //列表核心对象
        listCore: null,
        //列表的总条数
        count: 0,
        //列表的总页数
        page_num: 0,
        //当前显示1为列表，2为暂无数据
        status: 1,
        //真正记录当前页，防止与请求的页出现混淆
        pageIndex: 1
    },
    componentWillUnmount: function () {
        this.privateVar.params.page_no = 1;
        this.privateVar.params.start_date = '';
        this.privateVar.params.end_date = '';
        this.privateVar.params.transaction_type = 0;
        this.privateVar.dataSource = [];
        this.privateVar.listCore = null;
        this.privateVar.count = 0;
        this.privateVar.page_num = 0;
        this.privateVar.status = 1;
        this.privateVar.pageIndex = 1;
    },
    pullUpHandler: function (animObj) {
        this.privateVar.params.page_no = this.privateVar.pageIndex + 1;
        //网络加载内容，停止动画
        this.setDataSource(animObj);
        // animObj.refresh();
    },
    pullDownHandler: function (animObj) {
        //网络加载内容，停止动画

        // animObj.refresh();
    },
    showItems: function () {
        // console.log('---------------');
        // console.log(this.privateVar.dataSource);
        //不修改state 不重构列表
        var rowList = [];
        $.each(this.privateVar.dataSource, function (index, obj) {
            var number = obj.transaction_amount_out == "" ? obj.transaction_amount_in : obj.transaction_amount_out;
            var orderNum = obj.order_code == "" ? "缺失订单号" : obj.order_code;
            rowList.push(<div className="myoutlay_list_item"  style={{ borderBottom: "1px solid #cccccc", margin: "0px 10px", padding: "0px 5px", backgroundColor: "#ffffff" }}><div style={{ paddingTop: "5px" }}><span style={{}}>{orderNum}</span><span style={{ float: "right", color: "#03A9F4" }}>{number}</span></div><div style={{ marginTop: "5px", marginBottom: "5px", fontSize: "12px" }}>{obj.remarks}</div></div>);
        });
        return rowList;
    },
    getInitialState: function () {
        return {};
    },
    setDataSource: function (anim) {
        console.log(this.privateVar.params);
        var component = this;
        // if(this.privateVar.page_num>this.privateVar.params.page_no){
        //     //访问的页数大于总页数，不再做网络请求
        //     if (!anim && typeof(anim)!="undefined" && anim!=null){
        //             anim.refresh();
        //         }
        //     return;
        // }
        $.ajax({
            url: gVar.getBASE_URL() + "Wallet/getRecord",
            type: "POST",
            data: component.privateVar.params,
            async: true,
            cache: false,
            dataType: 'json',
            success: function (val) {
                // console.log(val);
                //停止加载动画
                if (!anim && typeof (anim) != "undefined" && anim != null) {
                    anim.refresh();
                }
                if (val.error == 0) {
                    if (component.privateVar.params.page_no == 1) {
                        component.privateVar.pageIndex = 1;
                        //重新加载的首页，清除数据
                        component.privateVar.dataSource = [];
                        component.privateVar.count = val.data.count;
                        component.privateVar.page_num = val.data.page_num;
                        // Array.prototype.push.apply(component.privateVar.dataSource, val.data.records);
                        if (component.privateVar.count == 0) {
                            component.privateVar.status = 2;
                            component.setState({});
                        } else {
                            component.privateVar.status = 1;
                            Array.prototype.push.apply(component.privateVar.dataSource, val.data.records);
                            component.setState({});
                            // this.addItemData(val.data.records);
                        }
                    } else {
                        if (val.data.records.length == 0) {
                            //下一页数据
                            toast('已经到达最后一页!');
                            if (component.privateVar.listCore != null && component.privateVar.listCore != undefined) {
                                component.privateVar.listCore.refresh();
                            }
                        } else {
                            //页数加1
                            component.privateVar.pageIndex++;
                            //下一页数据
                            Array.prototype.push.apply(component.privateVar.dataSource, val.data.records);
                            component.setState({});
                        }
                    }
                } else {
                    component.privateVar.status = 2;
                    //数据加载失败
                    component.setState({});
                    toast(val.data);
                }
            }.bind(this),
            error: function (xhr, status, err) {
                //停止加载动画
                if (!anim && typeof (anim) != "undefined" && anim != null) {
                    anim.refresh();
                }
                if (component.privateVar.pageIndex == 1) {
                    component.privateVar.status = 2;
                    component.setState({});
                }
                toast('获取数据失败!');
            }
        });
    },
    componentDidMount: function () {
        console.log('0---------------');
        this.setDataSource(this.privateVar.listCore);
        if (this.privateVar.listCore != null && this.privateVar.listCore != undefined) {
            this.privateVar.listCore.refresh();
        }
        //加载数据
        // this.setState({status:1});
    },
    componentDidUpdate: function () {
        if (this.privateVar.listCore != null && this.privateVar.listCore != undefined) {
            this.privateVar.listCore.refresh();
        }
    },
    // addItemData: function (data) {
    // //内容发生改变
    //     if(this.privateVar.params.page_no==1){
    //         //当为第一页时，清除里面的所有的row
    //         $('#thelist').empty();
    //     }
    //     data.map(function(item){
    //        var number=item.transaction_amount_out==""?item.transaction_amount_in:item.transaction_amount_out; 
    //        var orderNum=item.order_code==""?"缺失订单号":item.order_code;
    //     $('#thelist').append("<li><div class='myoutlay_list_item' style='border-bottom:1px solid #cccccc;padding-left: 5px;padding-right: 5px;margin: 0px 10px;'><div style='margin-top:5px'><span>"+orderNum+"</span><span style='float:right;color:#03A9F4;'>"+number+"</span></div><div style='margin-top:5px,margin-bottom:5px,font-size:12px'>"+item.remarks+"</div></div></li>");
    // });
    // //数据添加完毕，对页的索引进行修改
    // this.privateVar.params.page_no=this.privateVar.params.page_no+1;
    // if(this.privateVar.listCore){
    //     this.privateVar.listCore.refresh();
    // }
    // },
    getListCore: function (obj) {
        this.privateVar.listCore = obj;
    },
    selectTab: function (index) {
        //获取选中tab索引
        //全部-0，运费支出-1，仓租-2，关税-3，在线充值-4，其它-5
        switch (index) {
            case 0:
                this.privateVar.params.transaction_type = 0;
                break;
            case 1:
                this.privateVar.params.transaction_type = 1;
                break;
            case 2:
                this.privateVar.params.transaction_type = 2;
                break;
            case 3:
                this.privateVar.params.transaction_type = 3;
                break;
            case 4:
                this.privateVar.params.transaction_type = 4;
                break;
            case 5:
                this.privateVar.params.transaction_type = 5;
                break;
        }
        this.privateVar.params.page_no = 1;
        this.privateVar.pageIndex = 1;
        this.setDataSource(this.privateVar.listCore);
    },
    timeSpanHandle: function (start, end) {
        console.log("time  " + start + "  " + end);
        if (start != this.privateVar.params.start_date || end != this.privateVar.params.end_date) {
            this.privateVar.params.page_no = 1;
            this.privateVar.pageIndex = 1;
            this.privateVar.params.start_date = start;
            this.privateVar.params.end_date = end;
            this.setDataSource(this.privateVar.listCore);
        }
    },
    // getItem: function () {
    //     return <div></div>;
    // },
    // renderItem:function(index, key){

    //     // return <div className="myoutlay_list_item" key={key} style={{borderBottom:"1px solid #cccccc"}}><div style={{marginTop:"5px"}}><span style={{}}>ZD5454164565656</span><span style={{float:"right",color:"#03A9F4"}}>-20.3</span></div>
    //     // <div style={{marginTop:"5px",marginBottom:"5px",fontSize:"12px"}}>BH564646消费付款:DFG56465456465564</div></div>;
    // },
    render: function () {
        var innerView;
        if (this.privateVar.status == 0) {
            innerView = (<LoadingView />);
        } else if (this.privateVar.status == 1) {
            innerView = (<ListView getCoreObj={this.getListCore} marginTop={180} backGroud="#f5f4f4" pullDownHandler={this.pullDownHandler} pullUpHandler={this.pullUpHandler}  getItems={this.showItems} showUpload={false} showDownload={true} />);
        } else if (this.privateVar.status == 2) {
            innerView = (<div style={{ textAlign: "center", marginTop: "25px" ,fontSize:"16px"}}>暂无数据!</div>);
        }
        return (<div style={{ backgroundColor: "#f5f4f4" }}>
            <TabLayout selectTab={this.selectTab} tabsText={["所有", "运费支出", "仓租", "关税", "充值记录", "其他"]} tabsWidth={[60, 80, 60, 60, 80, 60]}/>
            <PickDate getTimeSpan={this.timeSpanHandle} />
            <div style={{ margin: "0px 10px" }}>
                <div className="myoutlay_list_head0"><span className="myoutlay_list_head1">订单号</span><span className="myoutlay_list_head2">支出金额</span></div>
                {innerView}
            </div>
        </div>);
    }
});
module.exports = MyOutlay;