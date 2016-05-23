'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pullToRefreshWptr11 = require('../pull-to-refresh/wptr.1.1');

var _pullToRefreshWptr112 = _interopRequireDefault(_pullToRefreshWptr11);

var ReactPullToRefresh = (function (_Component) {
  _inherits(ReactPullToRefresh, _Component);

  function ReactPullToRefresh(props) {
    _classCallCheck(this, ReactPullToRefresh);

    _get(Object.getPrototypeOf(ReactPullToRefresh.prototype), 'constructor', this).call(this, props);
    this.state = {
      initialized: false
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  _createClass(ReactPullToRefresh, [{
    key: 'handleRefresh',
    value: function handleRefresh() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.props.onRefresh(resolve, reject);
      });
    }
  }, {
    key: 'init',
    value: function init() {
      if (!this.state.initialized) {
        (0, _pullToRefreshWptr112['default'])().init({
          contentEl: this.refs.refresh,
          ptrEl: this.refs.ptr,
          distanceToRefresh: this.props.distanceToRefresh || undefined,
          loadingFunction: this.handleRefresh,
          resistance: this.props.resistance || undefined
        });
        this.setState({
          initialized: true
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.disabled) {
        this.init();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.props.disabled) {
        this.init();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.disabled) {
        return _react2['default'].createElement(
          'div',
          this.props,
          this.props.children
        );
      }
      var icon = this.props.icon || _react2['default'].createElement('span', { className: 'genericon genericon-next' });
      var loading = this.props.loading || _react2['default'].createElement(
        'div',
        { className: 'loading' },
        _react2['default'].createElement('span', { className: 'loading-ptr-1' }),
        _react2['default'].createElement('span', { className: 'loading-ptr-2' }),
        _react2['default'].createElement('span', { className: 'loading-ptr-3' })
      );
      return _react2['default'].createElement(
        'div',
        this.props,
        _react2['default'].createElement(
          'div',
          { ref: 'ptr', className: 'ptr-element' },
          icon,
          loading
        ),
        _react2['default'].createElement(
          'div',
          { ref: 'refresh', className: 'refresh-view' },
          this.props.children
        )
      );
    }
  }]);

  return ReactPullToRefresh;
})(_react.Component);

exports['default'] = ReactPullToRefresh;

ReactPullToRefresh.propTypes = {
  onRefresh: _react.PropTypes.func.isRequired,
  icon: _react.PropTypes.element,
  loading: _react.PropTypes.element,
  disabled: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  distanceToRefresh: _react.PropTypes.number,
  resistance: _react.PropTypes.number
};
module.exports = exports['default'];