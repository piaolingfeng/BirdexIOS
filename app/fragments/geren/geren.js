var React = require('react');
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
/*img 图片地址
 *name 项的名字
 *type 类型：0表示组的第一个，1表示中间，2表示底部
 */
require('./css/geren.css');
var minePage = [{
    img: require('./image/myaccount.png'),
    name: "我的账号",
    type: 0
}, {
    img: require('./image/message.png'),
    name: "我的消息",
    type: 2
}, {
    img: require("./image/managaccount.png"),
    name: "账号管理",
    type: 0
}, {
    img: require("./image/mydata.png"),
    name: "我的数据",
    type: 2
}, {
    img: require("./image/about.png"),
    name: "关于",
    type: 0
}, {
    img: require("./image/check.png"),
    name: "检查更新",
    type: 2
}];

var GerenItem = React.createClass({
            getInitialState() {
                return {
                    cname: ""
                };
            },
            handleTouchStart: function(ele) {
                if (this.props.info.type == 0) {
                    this.setState({
                        cname: "  item_touch_start"
                    });
                } else if (this.props.info.type == 1) {
                    this.setState({
                        cname: "  item_touch_start"
                    });
                } else {
                    this.setState({
                        cname: "  item_touch_start"
                    });
                }
            },
            handleTouchEnd: function(ele) {
                if (this.props.info.type == 0) {
                    this.setState({
                        cname: "  item_touch_end"
                    });
                } else if (this.props.info.type == 1) {
                    this.setState({
                        cname: "  item_touch_end"
                    });
                } else {
                    this.setState({
                        cname: "  item_touch_end"
                    });
                }

            },
            render: function() {
                var cname;
                if (this.props.info.type == 0) {
                    cname = "gerenitem_top" + this.state.cname;
                } else if (this.props.info.type == 1) {
                    cname = "gerenitem_middle" + this.state.cname;
                } else {
                    cname = "gerenitem_bottom" + this.state.cname;
                }

                var item = ( < div className = {
                        cname
                    }
                    onTouchStart = {
                        this.handleTouchStart
                    }
                    onTouchEnd = {
                        this.handleTouchEnd
                    } >
                    < img className = "img-rounded"
                    style = {
                        {
                            width: "30px",
                            height: "30px"
                        }
                    }
                    src = {
                        this.props.info.img
                    }
                    /> <lable style={{marginLeft:"10px"}}>{this.props.info.name}</lable >
                    </div> );
                    return item;
                }
            });

        var GerenList = React.createClass({
                    render: function() {
                        var items = ( <div > {
                                minePage.map(function(itemInfo) {
                                    return <GerenItem info = {
                                        itemInfo
                                    }
                                    />
                                })
                            } </div>);
                            return items;
                        }
                    });

                var Geren = React.createClass({

                    componentDidMount: function() {},

                    render: function() {
                        return ( <div style = {
                                {
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "#f5f4f4"
                                }
                            } >
                            < GerenList / >
                            < input type = "button"
                            className = "btn  btn-primary geren_exit"
                            style = {
                                {
                                    width: "70%"
                                }
                            }
                            style = {
                                {
                                    marginTop: "15px"
                                }
                            }
                            value = "退出账号" / >
                            </div>
                        );
                    }
                });

                module.exports = Geren;