'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * type ChildOptionProps = {
 *   map: {
 *     [propsName: string]: string
 *    },
 *    share: Array<string>
 * }
 * type ChildOption = {
 *   component: Component<any, any>,
 *   props: ChildOptionProps
 * }
 * type ChildOptions = {
 *   [componentName: string]: ChildOption
 * }
 */

function withComponents(Factory, children) {
  var _class, _temp2;

  if (!children || !Object.keys(children).length) {
    return Factory;
  }
  children = normalize(children);

  var components = {};
  var mapProps = [];
  var sharedProps = [];
  var childContextTypes = {};

  for (var name in children) {
    var child = children[name];
    components[name] = childComponent(child.component, child.props);
    mapProps = mapProps.concat(extractMappedProps(child.props.map));
    sharedProps = sharedProps.concat(child.props.share || []);
  }
  mapProps.forEach(function (name) {
    childContextTypes[name] = _propTypes2.default.any;
  });

  return _temp2 = _class = function (_Component) {
    _inherits(WrapperComponent, _Component);

    function WrapperComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, WrapperComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).call.apply(_ref, [this].concat(args))), _this), _this.$$context = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WrapperComponent, [{
      key: 'getChildContext',


      // pass mapped props to children component by context
      value: function getChildContext() {
        var _this2 = this;

        mapProps.forEach(function (name) {
          _this2.$$context[name] = _this2.props[name];
        });
        return this.$$context;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if ((0, _utils.canHaveRef)(Factory)) {
          (0, _utils.proxyInstanceMethods)(this, this.refs.component);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var props = this.props;
        if (mapProps.length) {
          props = Object.assign({}, props);
          mapProps.forEach(function (name) {
            if (sharedProps.indexOf(name) === -1) {
              delete props[name];
            }
          });
        }
        if ((0, _utils.canHaveRef)(Factory)) {
          return _react2.default.createElement(Factory, _extends({}, components, props, { ref: 'component' }));
        } else {
          return _react2.default.createElement(Factory, _extends({}, components, props));
        }
      }
    }]);

    return WrapperComponent;
  }(_react.Component), _class.displayName = (0, _utils.componentName)(Factory) + 'Wrapper', _class.childContextTypes = childContextTypes, _temp2;
}

function normalize(children) {
  var normalizedChidlren = {};
  for (var name in children) {
    var child = children[name];
    var props = child.props || {};
    props.map = props.map || {};
    props.share = props.share || [];
    normalizedChidlren[name] = {
      component: child.component || child,
      props: props
    };
  }
  return normalizedChidlren;
}

/**
 * make a childComponent receive new mapped props
 * @param ChildComponent 
 * @param props 
 */
function childComponent(ChildComponent, props) {
  var _class2, _temp3;

  if (!props || !Object.keys(props).length) {
    return ChildComponent;
  }

  var mapProps = props.map;

  var contextTypes = {};
  for (var name in mapProps) {
    var mappedName = mapProps[name];
    contextTypes[mappedName] = _propTypes2.default.any;
  }

  return _temp3 = _class2 = function (_Component2) {
    _inherits(Comp, _Component2);

    function Comp() {
      _classCallCheck(this, Comp);

      return _possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
    }

    _createClass(Comp, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if ((0, _utils.canHaveRef)(ChildComponent)) {
          (0, _utils.proxyInstanceMethods)(this, this.refs.component);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        // map mapped props to component props
        var props = Object.assign({}, this.props);
        var mappedName = void 0;
        for (var _name in mapProps) {
          mappedName = mapProps[_name];
          if (!(_name in props)) {
            props[_name] = this.context[mappedName];
          }
        }
        if ((0, _utils.canHaveRef)(ChildComponent)) {
          return _react2.default.createElement(ChildComponent, _extends({}, props, { ref: 'component' }));
        } else {
          return _react2.default.createElement(ChildComponent, props);
        }
      }
    }]);

    return Comp;
  }(_react.Component), _class2.displayName = 'Child' + (0, _utils.componentName)(ChildComponent), _class2.contextTypes = contextTypes, _temp3;
}

var emptyArray = [];
function extractMappedProps(mapProps) {
  if (mapProps) {
    return Object.keys(mapProps).map(function (prop) {
      return mapProps[prop];
    });
  } else {
    return emptyArray;
  }
}

exports.default = withComponents;