'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _capitalize = require('lodash/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getUncontrolledName = function getUncontrolledName(prop) {
  return prop.prefix || 'default' + (0, _capitalize2.default)(prop.name);
};

exports.default = function (RenderedComponent, uncontrolledProps) {
  // TODO development env check
  var UncontrolledComponent = function (_Component) {
    _inherits(UncontrolledComponent, _Component);

    function UncontrolledComponent(props) {
      _classCallCheck(this, UncontrolledComponent);

      var _this = _possibleConstructorReturn(this, (UncontrolledComponent.__proto__ || Object.getPrototypeOf(UncontrolledComponent)).call(this, props));

      _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
      _this.state = _this.getUncontrolledState({}, props);
      return _this;
    }

    _createClass(UncontrolledComponent, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.setState(this.getUncontrolledState(this.props, nextProps));
      }
    }, {
      key: 'getUncontrolledState',
      value: function getUncontrolledState(prevProps, props) {
        var state = {};
        uncontrolledProps.forEach(function (prop) {
          var controlledName = prop.name;
          var uncontrolledName = getUncontrolledName(prop);

          if (props[uncontrolledName] === null || props[uncontrolledName] === undefined) {
            state[controlledName] = prop.default;
          } else if (prevProps[uncontrolledName] !== props[uncontrolledName]) {
            state[controlledName] = props[uncontrolledName];
          }
        });
        return state;
      }
    }, {
      key: 'onChange',
      value: function onChange(name, value) {
        var _props;

        this.setState(_defineProperty({}, name, value));
        var eventName = 'on' + (0, _capitalize2.default)(name) + 'Change';

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        this.props[eventName] && (_props = this.props)[eventName].apply(_props, [value].concat(args));
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var props = Object.assign({}, this.props);
        uncontrolledProps.forEach(function (prop) {
          var name = getUncontrolledName(prop);
          delete props[name];
        });
        var events = {};
        uncontrolledProps.forEach(function (prop) {
          var name = prop.name;
          var eventName = 'on' + (0, _capitalize2.default)(name) + 'Change';
          events[eventName] = _this2.onChange.bind(_this2, name);
          delete props[eventName];
        });
        return _react2.default.createElement(RenderedComponent, _extends({}, this.state, events, props));
      }
    }]);

    return UncontrolledComponent;
  }(_react.Component);

  return UncontrolledComponent;
};