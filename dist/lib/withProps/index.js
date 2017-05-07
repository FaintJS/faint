'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withDefaultProps = function withDefaultProps(RenderedComponent, defaultProps) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(WrapperComponent, _Component);

    function WrapperComponent() {
      _classCallCheck(this, WrapperComponent);

      return _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).apply(this, arguments));
    }

    _createClass(WrapperComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if ((0, _utils.canHaveRef)(RenderedComponent)) {
          (0, _utils.proxyInstanceMethods)(this, this.refs.component);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        if ((0, _utils.canHaveRef)(RenderedComponent)) {
          return _react2.default.createElement(RenderedComponent, _extends({}, defaultProps, this.props, { ref: 'component' }));
        } else {
          return _react2.default.createElement(RenderedComponent, _extends({}, defaultProps, this.props));
        }
      }
    }]);

    return WrapperComponent;
  }(_react.Component), _class.displayName = (0, _utils.componentName)(RenderedComponent) + 'DefaultPropsWrapper', _temp;
};

exports.default = withDefaultProps;