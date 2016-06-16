import React from 'react'
var gVar = require('../../main/global.js');
var toast = require('../../util/Tips/tips.js');
require('./css/inventory.css');
var InventoryItem = require('./inventoryitem.js');
var WillinItem = require('./willinitem.js');

var ListView = require('../../components/listview/listview.js');

//简单的tab设置
var SimpleTabLayout = require('../../components/tablayout/simpletablayout.js');
//查询限制条件
var LimitView = require('./limitview.js');
//搜索条件
var Search = require('../../components/search/search.js');
// var listitem=[];
// var inventoryIndex=0;
//胡伟，仓库管理内容3项
var Inventory = React.createClass({
  privateVar: {
    params: {
      //商品类型，20表示物料，默认10表示商品
      product_type: 10,
      //40表示发往仓库(待入库)，1表示在库，10表示正常，20表示库存紧张，30表示断货
      stock_status: 1,
      //请求的页数(不能用于记录当前页数，因为当请求失败后再次请求需要重新设置)
      page_no: 1,
      warehouse_code: '',
      keyword: '',
      //available_stock_asc(在库，超预警)升序，available_stock_desc(在库，超预警)降序
      order_by: '',
      // app_debug: 1,
      // company_code: localStorage.getItem("company_code"),
      // user_code: localStorage.getItem('user_code'),
    },
    //数据源的集合(在切换数据源的时候，防止先清空后添加，造成两次的setState)
    dataItems: [],
    //row集合
    listItems: [],
    //列表核心对象
    listCore: null,
    //列表的总条数
    count: 0,
    //列表的总页数
    page_num: 0,
    //记录当前的页数与请求页数需要分开
    pageIndex: 0,
    //记录排序
    sortFlag: false,
    //默认选中的tab索引
    inventoryIndex: 0,
    //设置列表的显示状态:1为正常显示列表，2为暂无数据，3......
    status: 1
  },
  componentWillUnmount: function () {
    //清除privateVAR缓存
    // console.log('--------finish-------');
    this.privateVar.params.stock_status = 1;
    this.privateVar.params.page_no = 1;
    this.privateVar.params.warehouse_code = '';
    this.privateVar.params.order_by = '';
    this.privateVar.dataItems = [];
    this.privateVar.listItems = [];
    this.privateVar.count = 0;
    this.privateVar.page_num = 0;
    this.privateVar.pageIndex = 0;
    //恢复排序的记录
    this.privateVar.sortFlag = false;
    //默认选中的tab索引
    this.privateVar.inventoryIndex = 0;
    //设置列表的显示状态:1为正常显示列表，2为暂无数据，3......
    this.privateVar.status = 1;
    this.privateVar.params.keyword = '';
  },
  setDataSource: function (anim) {
    var component = this;
    // console.log('--------1-------'+this.privateVar.inventoryIndex);
    //flag为false为降序，true为升序
    if (this.privateVar.inventoryIndex == 0) {
      if (this.privateVar.sortFlag) {
        this.privateVar.params.order_by = 'available_stock_asc';
      } else {
        this.privateVar.params.order_by = 'available_stock_desc';
      }
    } else if (this.privateVar.inventoryIndex == 1) {
      if (this.privateVar.sortFlag) {
        this.privateVar.params.order_by = 'ining_stock_asc';
      } else {
        this.privateVar.params.order_by = 'ining_stock_desc';
      }
    } else if (this.privateVar.inventoryIndex == 2) {
      if (this.privateVar.sortFlag) {
        this.privateVar.params.order_by = 'available_stock_asc';
      } else {
        this.privateVar.params.order_by = 'available_stock_desc';
      }
    } else { }
    // console.log(this.privateVar.params);
    var url = gVar.getBASE_URL() + "stock/all";
    gVar.sendRequest(this.privateVar.params,url, this.dealSetDataSource);

    // $.ajax({
      // url: gVar.getBASE_URL() + "stock/all",
      // type: "POST",
      // data: component.privateVar.params,
      // async: true,
      // cache: false,
      // dataType: 'json',
    //   success: function (val) {
    //     if (component == null || component == undefined) {
    //       return;
    //     }
    //     //停止加载动画
    //     if (!anim && typeof (anim) != "undefined" && anim != null) {
    //       anim.refresh();
    //     }
    //     if (val.error == 0) {

    //     } else {
    //       //数据加载失败
    //       // component.setState({status:3});
    //       toast(val.data);
    //     }
    //   }.bind(this),
    //   error: function (xhr, status, err) {
    //     //停止加载动画
    //     if (!anim && typeof (anim) != "undefined" && anim != null) {
    //       anim.refresh();
    //     }
    //     // component.setState({status:3});
    //     toast('获取数据失败!');
    //   }
    // });
  },

  //chuming.dealsetDataSource
  dealSetDataSource(val) {
    //停止加载动画
    var fun = this;
    if (!this.privateVar.listCore && typeof (this.privateVar.listCore) != "undefined" && anim != null) {
      this.privateVar.listCore.refresh();
    }
    if (this.privateVar.params.page_no == 1) {
      //设置列表的显示状态:1为正常显示列表，2为暂无数据，3......
      // 判断数量
      if (val.data.count == 0) {
        this.privateVar.status = 2;
      } else {
        this.privateVar.status = 1;
        //重新加载的首页，清除数据
        this.privateVar.dataItems = [];
        // Array.prototype.push.apply(this.privateVar.dataItems,val.data.records);
        //对map进行遍历
        $.each(val.data.products, function (key, value) {
          fun.privateVar.dataItems.push(value);
        })
      }
      //记录总的页数
      this.privateVar.count = val.data.count;
      //当前页数恢复第一页
      this.privateVar.pageIndex = 1;
      //修改state，达到改变list
      this.setState({});

      // Array.prototype.push.apply(component.privateVar.dataSource,val.data.records);
    } else {
      if (val.data.products.length > 0) {
        //下一页数据
        $.each(val.data.products, function (key, value) {
          fun.privateVar.dataItems.push(value);
        })
        //当前页数增加一页
        this.privateVar.pageIndex++;
        //修改state，达到改变list
        this.setState({});
      } else {
        if (this.privateVar.listCore != null && this.privateVar.listCore != undefined) {
          this.privateVar.listCore.refresh();
        }
        toast('已经是最后一页!');
      }
      // component.privateVar.dataSource.push(val.data.records);
      // this.addItemData(val.data.records);
    }
  },
  //返回listview的iscroll对象
  getListCore: function (obj) {
    //获取构造list的核心对象
    this.privateVar.listCore = obj;
  },
  componentDidMount: function () {
    if (this.props.todayDataName) {
      // inventoryIndex=2;
      this.privateVar.inventoryIndex = 2;
      this.setState({});
    }
    this.setDataSource(this.privateVar.listCore);
  },
  componentDidUpdate: function () {
    //必须执行，否则上拉回弹
    if (this.privateVar.listCore != null && this.privateVar.listCore != undefined) {
      this.privateVar.listCore.refresh();
    }
  },
  getInitialState: function () {
    this.privateVar.listItems = [];
    return {
      // inventoryIndex: 0,
      // //对状态修改进行数据切换
      // flag: true,
    };
  },
  renderItem: function () {
    // var listitem=new Array();
    // console.log("index-----"+this.privateVar.inventoryIndex);
    var component = this;
    //清除原来的数据，重新添加
    this.privateVar.listItems = [];
    if (this.privateVar.inventoryIndex == 0) {
      //根据数据创建row
      $.each(this.privateVar.dataItems, function (index, val) {
        component.privateVar.listItems.push(<InventoryItem itemObj={val} />);
      });
      // this.privateVar.listitem.push(<InventoryItem  />);
    } else if (this.privateVar.inventoryIndex == 1) {
      $.each(this.privateVar.dataItems, function (index, val) {
        component.privateVar.listItems.push(<WillinItem itemObj={val} />);
      });
      // this.privateVar.listItems.push(<WillinItem />);
    } else {
      $.each(this.privateVar.dataItems, function (index, val) {
        component.privateVar.listItems.push(<InventoryItem itemObj={val} />);
      });
    }
    return this.privateVar.listItems;
  },
  pullUpEvent: function () {
    if (this.privateVar.inventoryIndex == 0) {
      //启动在库下一页的网络请求
      this.privateVar.params.page_no = this.privateVar.pageIndex + 1;
      //40表示发往仓库(待入库)，1表示在库，10表示正常，20表示库存紧张，30表示断货
      this.privateVar.params.stock_status = 1;
    } else if (this.privateVar.inventoryIndex == 1) {
      //启动待入库下一页的网络请求
      this.privateVar.params.page_no = this.privateVar.pageIndex + 1;
      //40表示发往仓库(待入库)，1表示在库，10表示正常，20表示库存紧张，30表示断货
      this.privateVar.params.stock_status = 40;
    } else {
      //启动超预警下一页的网络请求
      this.privateVar.params.page_no = this.privateVar.pageIndex + 1;
      //40表示发往仓库(待入库)，1表示在库，10表示正常，20表示库存紧张，30表示断货
      this.privateVar.params.stock_status = 20;
    }
    this.setDataSource(this.privateVar.listCore);
    // this.setState({ flag: !this.state.flag });
  },
  selectTab: function (index) {
    this.privateVar.listItems = [];
    this.privateVar.params.page_no = 1;
    if (index == 0) {
      //在库
      this.privateVar.params.stock_status = 1;
    } else if (index == 1) {
      //待入库
      this.privateVar.params.stock_status = 40;
    } else if (index == 2) {
      //超预警商品
      this.privateVar.params.stock_status = 20;
    } else { }
    this.privateVar.inventoryIndex = index;
    this.setState({});
    //重新加载数据
    this.setDataSource(this.privateVar.listCore);
    return;
  },
  // selectLimitItem: function (index) {
  //   //设置选择条件的
  //   return;
  // },
  sortHandler: function (flag) {
    //改变排序的标志
    this.privateVar.sortFlag = flag;
    this.privateVar.listItems = [];
    this.privateVar.params.page_no = 1;
    //重新加载数据
    this.setDataSource(this.privateVar.listCore);
    // this.setState({ inventoryIndex: index });
  },
  popMenuItemClick: function (index, obj) {
    //获取选中的仓库
    this.privateVar.inventoryObj = obj;
    this.privateVar.params.warehouse_code = obj.warehouse_code;
    this.privateVar.listItems = [];
    this.setDataSource(this.privateVar.listCore);
    // this.setState({});
  },
  SearchFunc(value) {
    //关键字搜索
    this.privateVar.params.keyword = value;
    this.privateVar.listItems = [];
    this.privateVar.params.page_no = 1;
    //重新加载数据
    this.setDataSource(this.privateVar.listCore);
  },
  render: function () {
    var content;
    if (this.privateVar.status == 1) {
      content = (<ListView getCoreObj={this.getListCore} marginTop={205} backGroud="#eeeeee" pullDownHandler={this.pullUpEvent} pullUpHandler={this.pullUpEvent}  getItems={this.renderItem} />);
    } else if (this.privateVar.status == 2) {
      content = (<div style={{ width: "100%", height: "100%", textAlign: "center", fontSize: "22px", marginTop: "100px" }}>暂时没有数据哦！</div>);
    } else {
      content = (<ListView getCoreObj={this.getListCore} marginTop={205} backGroud="#eeeeee" pullDownHandler={this.pullUpEvent} pullUpHandler={this.pullUpEvent}  getItems={this.renderItem} />);
    }
    return (<div >
      <SimpleTabLayout selectTab={this.selectTab} defualtIndex={this.privateVar.inventoryIndex} tabsText={["在库商品", "待入库商品", "超预警商品"]} />
      <Search SearchFunc={this.SearchFunc} defaultText={this.privateVar.params.keyword} placehold="输入商品编码或UPC或商品名"/>
      <LimitView sortClick={this.sortHandler} popMenuItemClick={this.popMenuItemClick}/>
      <div style={{ color: "#039FFF", paddingLeft: "10px", backgroundColor: "#f5f4f4", textAlign: "left", width: "100%" }}>共有{this.privateVar.count}条数据</div>
      <div >
        {content}
      </div>
    </div>);
    // return (<div >
    //     <SimpleTabLayout selectTab={this.selectTab} defualtIndex={this.privateVar.inventoryIndex} tabsText={["在库商品", "待入库商品", "超预警商品"]} />
    //     <Search />
    //     <LimitView sortClick={this.sortHandler} popMenuItemClick={this.popMenuItemClick}/>
    //     <div style={{ color: "#039FFF", paddingLeft: "10px", backgroundColor: "#f5f4f4", textAlign: "left", width: "100%" }}>共有{this.privateVar.count}条数据</div>
    //     <div >
    //       <ListView getCoreObj={this.getListCore} marginTop={199} backGroud="#eeeeee" pullDownHandler={this.pullUpEvent} pullUpHandler={this.pullUpEvent}  getItems={this.renderItem} />
    //     </div>
    //   </div>);
  }
});
// var Inventory = React.createClass({
// renderItem:function(index, key){
//   if(index==9){
//     return <div>12</div>
//   }else{
//     return (<WillinItem />);
//   }
// },
//             render: function() {
//                 return ( <div style={{
//                     backgroundColor:"#f5f4f4",
//                     width:"100%"
//                 }}>

//                 <ReactList itemRenderer={this.renderItem} length="10000"/>
//                 </div>);
//                 }
//             });
module.exports = Inventory;