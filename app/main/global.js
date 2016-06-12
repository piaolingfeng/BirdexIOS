var React = require('react');

var showModalPage = require('../components/BModalpage/bmodalpage.js').showModalPage;
var hideModalPage = require('../components/BModalpage/bmodalpage.js').hideModalPage;
var toast = require('../util/Tips/tips.js');
var waitDailog = require('../components/Spin/BSpin.js');

var gVar = {

    userName: "bird",

    //今日数据描述信息
    todayData: {
        dataTitle: ["今日订单数", "今日已出库", "今日等待出库",
            "今日已取消订单", "审核不通过订单", "今日已签收"
            , "库存异常订单", "今日已入库预报", "待确认预报单"
            , "审核不通过预报", "库存预警", "身份证异常订单"],
        dataJsonName: ["today_create_order_count", "today_checkout_order_count", "today_wait_checkout_order_count",
            "today_cancel_order_count", "no_pass_order_count", "today_sign_order_count", "stock_exception_order_count"
            , "today_confirm_storage_count", "wait_confirm_storage_count", "no_pass_storage_count",
            "warning_stock_count", "id_card_exception_order_count"],
        dataCount: ["?", "?", "?"
            , "?", "?", "?"
            , "?", "?", "?"
            , "?", "?", "?"], //保存每个类别的数值
        dataOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //控制显示的顺序, -1表示对应的项不

        IsDisplay: [false, false, false,
            false, false, false,
            false, false, false,
            false, false, false],

        displayList: [],
    },
    mytool: ["订单管理", "预报管理", "库存管理", "我的支出", "账户充值"],
    //公共颜色
    Color_blue_head: "#13A7DF",
    Color_gray_head: "#666666",
    Color_white: "#ffffff",
    Color_background: "#f5f4f4",
    // Color_touch: "#FAFAFA",
    Color_single_line: "#D7D7D7",
    Color_text: "#9b9b9b",
    Color_title: "#666666",
    Color_touch: '#e4e4e4',
    //公共字体
    FontSize_title_head: "17px",
    FontSize_order_text: "16px",
    //padding
    Padding_head: "16px",
    Padding_text_head: "12px",
    Padding_titlebar: "61px",

    FIRST_ENTRY_APP: "FIRST_ENTRY_APP",
    //切换到新页面
    pushPage: function (pathname, isModal) {

        if (!isModal) {
            gVar.pageTranType = "pagepush";
            // console.log(global.router.history);
            global.router.history.push(pathname);
        }
        else {
            var ModalPage = null;
            var strPathName = (typeof (pathname) == "string" ? pathname : pathname.pathname);

            var paths = global.router.props.children.props.children;
            var length = paths.length;
            for (var i = 1; i < length; i++) {
                // console.log(paths[i].props.path);
                // console.log(pathname);
                if (paths[i].props.path == strPathName) {
                    ModalPage = paths[i].props.component;
                    break;
                }
            }

            if (ModalPage != null) {
                // global.router.history.createLocation();
                var location = global.router.history.createLocation(pathname)
                console.log(location);
                showModalPage(<ModalPage location = {location}/>);
            }
            else {
                console.log("cannot find modal page " + pathname);
            }
        }
    },

    //页面回退
    popPage: function () {

        if (!hideModalPage()) {
            gVar.pageTranType = "pagepop";
            // console.log(global.router.history);
            global.router.history.goBack();
        }
    },

    //当前页面切换动画类型名,程序运行时会动态更改, 以实现前进后退
    pageTranType: "pagepush", //or "pagepop"

    createRequestEntity: function () {//工厂方法产生请求实体
        var requestEntity = new Object();
        requestEntity.page_no = 1;//	N	1	页码
        requestEntity.page_size = "10";//	N	20	每页显示条数
        requestEntity.keyword = "";//	N		订单单号、商品名称、外部编码、UPC的关键字
        requestEntity.warehouse_code = "";//e	N		仓库唯一编码。例如：HKG
        requestEntity.warehouse_name = "全部仓库";
        requestEntity.start_date = "";//	N		商品创建时间，区间结束日期，格式：2015-09-24//	N		商品创建时间，区间开始日期，格式：2015-09-24
        requestEntity.end_date = "";
        requestEntity.sign_start_date = "";//更新时间
        requestEntity.sign_end_date = "";
        requestEntity.checkout_start_date = "";//出库的时间
        requestEntity.checkout_end_date = "";
        requestEntity.time_name = "不限时间";
        requestEntity.status = "";//	N		订单状态10:'待审核'; 11: '已删除'; 2:'等待出库'; 20: '准备出库'; 21: '包裹出库中'; 30: '审核不通过'; 40: '已出库'; 5: '运输中'; 50: '包裹空运中'; 51: '待清关'; 52: '包裹清关中'; 53: '包裹已清关'; 60: '已签收';
        requestEntity.statusName = "全部状态";
        // requestEntity.app_debug = 1;
        // requestEntity.company_code = localStorage.getItem("company_code");
        // requestEntity.user_code = localStorage.getItem('user_code');
        return requestEntity;
    },

    createStatusEntity: function () {
        var statusEntity = new Object();
        statusEntity.status = '';
        statusEntity.status_name = '';
        return statusEntity;
    },

    createWarehouseEntity: function () {
        var warehouseEntity = new Object();
        warehouseEntity.name = '';
        warehouseEntity.warehouse_code = '';
        return warehouseEntity;
    },

    createOrderEntity: function () {
        var orderEntity = new Object();
        orderEntity.order_code = "";//: "订单唯一编码",
        orderEntity.warehouse_code = "";//: "仓库编码",
        orderEntity.created_time = "";//: "订单创建时间",
        orderEntity.order_oms_no = "";//: "订单号",
        orderEntity.service_type = "";//: "服务方式编码",
        orderEntity.verify_fail_detail = '';//": "",
        orderEntity.verify_id_card_result = '';//": "20"
        orderEntity.service_type_name = "";//: "服务方式名称",
        orderEntity.warehouse_name = "";//: "仓库名称",
        orderEntity.receiver_name = "";//: "收件人 ",
        orderEntity.receiver_mobile = "";//: "手机号码",
        orderEntity.receiver_phone;//":
        orderEntity.status = "";//: "状态",
        orderEntity.status_name = "";//: "状态名称",
        orderEntity.weight = "";//: "重量",
        orderEntity.price = "";//: "费用",
        orderEntity.products = new Array(this.createOrderProductEntity());
        return orderEntity;
    },

    createOrderProductEntity: function () {
        var OrderProductEntity = new Object();
        OrderProductEntity.product_code = "";//: "商品唯一编码",
        OrderProductEntity.external_no = "";//: "商品编码",
        OrderProductEntity.name = "";//: "商品名称",
        OrderProductEntity.upc = "";//: "UPC码",
        OrderProductEntity.pic = "";//: "商品图片",
        OrderProductEntity.nums = "";//: "数量"
        OrderProductEntity.error = "";
        return OrderProductEntity;
    },
    SERVER_ADDRESS: "192.168.1.207",
    //   SERVER_ADDRESS = "api.b.birdex.cn",
    PORT: "8089",//8002

    getBASE_URL: function () {
        // var SERVER_ADDRESS = "192.168.1.207";
        // var PORT = "8089";//
        return "http://" + this.SERVER_ADDRESS + ":" + this.PORT + "/";//
    },

    sendRequest: function (params, url, successCallback, showLoad, errorCallback) {
        if (showLoad == null || showLoad)//默认弹出等待框
            waitDailog.showLoading();
        $.ajax({
            data: params,
            url: url,
            dataType: 'json',
            cache: false,
            beforeSend: function (request) {
                request.setRequestHeader('DEVICE-TOKEN', 'Av8Kyg6puzKavIfXWCY1swtTgolSl9pMWcCA2SVLGFfA');
                request.setRequestHeader('APP-VERSION', '1.0');
                request.setRequestHeader('USER-TOKEN', localStorage.getItem("USER-TOKEN"));
                console.log(request,"requestheader");
         },//这里设置header
            // xhrFields: {
            // 	withCredentials: true
            // },
            success: function (data) {
                // this.setState({ data: data });
                // alert("success");
                if (data.error == 0) {
                    if (successCallback)
                        successCallback(data);
                }
                else {
                    console.log(data.data);
                    if (errorCallback)
                        errorCallback(data.data);//如果有错误回调就触发错误回调
                    else
                        toast(data.data);
                    // console.log( data);
                }
            }.bind(this),
            error: function (xhr, status, err) {
                // console.error( err.toString());
                // alert(err);
                console.log(err);
                if (errorCallback)
                    errorCallback();
                else
                    toast("请求失败" + err);
            }.bind(this),
            complete: function (XMLHttpRequest, textStatus) {
                if (showLoad == null || showLoad)//
                    waitDailog.hideLoading();
                    // ;
            }.bind(this),
            timeout: 5000,
        });
    },
    //id是模块名字,模块点击后显示颜色
    handleTouchStart: function (id) {
        // console.log(arguments)
        // var name = (id) ? id : "";
        $("#" + id).css("background-color", gVar.Color_touch);
    },
    //id是模块名字
    handleTouchEnd: function (id) {
        // var name = (id) ? id : "";
        $("#" + id).css("background-color", "#ffffff");
    },

    //按钮
    btnhandleTouchStart(id) {
        $("#" + id).css("background-color", gVar.Color_blue_head);
        $("#" + id).css("color", gVar.Color_white);
    },

    btnhandleTouchEnd(id) {
        $("#" + id).css("background-color", gVar.Color_white);
        $("#" + id).css("color", gVar.Color_blue_head);
    },
};

module.exports = gVar;

