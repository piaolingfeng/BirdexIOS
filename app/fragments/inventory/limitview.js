var React = require('react');
var gVar = require('../../main/global.js');
var toast = require('../../util/Tips/tips.js');
var triangle_down = require('../../main/image/triangle_down.png');
var triangle_up = require('../../main/image/triangle_up.png');
var laydown = require('../../main/image/laydown.png');
var BPopover = require('../../components/BPopover/bpopover.js');
var LimitView = React.createClass({
    privateVar: {
        params: {
            // app_debug: 1,
            // company_code: localStorage.getItem("company_code"),
            // user_code: localStorage.getItem('user_code')
        },
        menuArray: ["全部"],
        dataItem: [{ name: "全部", warehouse_code: "" }],
        //仓库对象
        inventoryObj: { name: "全部", warehouse_code: "" },
        sortFlag: false
    },
    componentWillUnmount: function () {
        //清除privateVAR缓存
        // console.log('--------finish-------');
        this.privateVar.inventoryObj = { name: "全部", warehouse_code: "" };
    },
    getInitialState: function () {
        return {
            item1select: false
        };
    },
    propTypes: {
        //设置左侧点击 参数flag表示点击元素
        sortClick: React.PropTypes.func,
        popMenuItemClick: React.PropTypes.func
    },
    clickHandle: function (ele) {
        this.privateVar.sortFlag = !this.privateVar.sortFlag;
        if (this.props.sortClick) {
            this.props.sortClick(this.privateVar.sortFlag);
        }
        this.setState({});
        // if (index == 0) {
        // this.setState({ item1select: !this.state.item1select });
        // }

    },
    menuItemClick: function (index) {
        //防止相同选中再次执行
        if (this.privateVar.dataItem[index].warehouse_code != this.privateVar.inventoryObj.warehouse_code) {
            this.privateVar.inventoryObj = this.privateVar.dataItem[index]
            //选中的仓库对象
            this.props.popMenuItemClick(index, this.privateVar.inventoryObj);
        }
    },
    componentDidMount: function () {
        var component = this;
        if (this.privateVar.menuArray.length == 1) {
            //设置数据源
            var url = gVar.getBASE_URL() + "Warehouse/companyAll";
            gVar.sendRequest(component.privateVar.params, url, this.dealDataSource, true, this.errorCallback)
            // $.ajax({
            //     url: gVar.getBASE_URL() + "Warehouse/companyAll",
            //     type: "POST",
            //     data: component.privateVar.params,
            //     async: true,
            //     cache: false,
            //     dataType: 'json',
            //     success: function (val) {
            //         if (val.error == 0) {
            //             // Array.prototype.push(component.privateVar.menuArray,val.data);
            //             $.each(val.data, function (index, obj) {
            //                 component.privateVar.menuArray.push(obj.name);
            //                 component.privateVar.dataItem.push(obj);
            //             });
            //             // component.setState({ flag: !component.state.flag });
            //             component.setState({});
            //         } else {
            //             toast(val.data);
            //         }
            //     }, error: function (xhr, status, err) {
            //         toast('获取仓库列表失败!');
            //     }
            // });
        }
    },

    dealDataSource(val) {
        // Array.prototype.push(component.privateVar.menuArray,val.data);
        var component = this;
        $.each(val.data, function (index, obj) {
            component.privateVar.menuArray.push(obj.name);
            component.privateVar.dataItem.push(obj);
        });
        // component.setState({ flag: !component.state.flag });
        component.setState({});

    },

    errorCallback(data) {
        if (data)//非空，即success后的error!=0的情况
            toast(data);
        else
            toast('获取仓库列表失败!');
    },

    render: function () {
        var mytrigger = (
            <div style={{ float: "left" }} >
                <span>{this.privateVar.inventoryObj.name}</span>
                <img src={laydown} style={{ height: "8px", marginLeft: "7px" }}/>
            </div>);
        // var menuArray = ["美国仓", "日本仓", "澳洲仓", "意大利仓", "南非仓", "英国仓"];
        return (
            <div style={{ padding: "0px 10px", width: '100%', display: "inline-block", backgroundColor: gVar.Color_background }}>
                <BPopover menuItem={this.privateVar.menuArray}
                    menuItemClick={this.menuItemClick}
                    triggerComp={mytrigger}
                    placement="bottom" />
                <div style={{ float: "right" }} onClick={this.clickHandle}>
                    <span>可用数量</span>
                    <img src={this.privateVar.sortFlag ? triangle_up : triangle_down} style={{ height: "10px", marginLeft: "7px" }}/>
                </div>
            </div>
        );
    }
});
module.exports = LimitView;