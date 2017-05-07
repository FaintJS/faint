'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _enzyme = require('enzyme');

var _compose = require('../../lib/compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_TEXT = 'this is a button';

var Factory = function (_Component) {
  _inherits(Factory, _Component);

  function Factory() {
    _classCallCheck(this, Factory);

    return _possibleConstructorReturn(this, (Factory.__proto__ || Object.getPrototypeOf(Factory)).apply(this, arguments));
  }

  _createClass(Factory, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Button = _props.Button,
          color = _props.color;

      return _react2.default.createElement(
        'div',
        { style: { color: color } },
        'render a button',
        _react2.default.createElement(Button, null)
      );
    }
  }]);

  return Factory;
}(_react.Component);

Factory.propTypes = {
  color: _propTypes2.default.string.isRequired,
  Button: _propTypes2.default.any.isRequired
};

var Button = function (_Component2) {
  _inherits(Button, _Component2);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        null,
        BUTTON_TEXT
      );
    }
  }]);

  return Button;
}(_react.Component);

var BGButton = function (_Component3) {
  _inherits(BGButton, _Component3);

  function BGButton() {
    _classCallCheck(this, BGButton);

    return _possibleConstructorReturn(this, (BGButton.__proto__ || Object.getPrototypeOf(BGButton)).apply(this, arguments));
  }

  _createClass(BGButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        { style: { backgroundColor: this.props.BG } },
        BUTTON_TEXT
      );
    }
  }]);

  return BGButton;
}(_react.Component);

BGButton.propTypes = {
  BG: _propTypes2.default.string.isRequired
};


var StatelessBGButton = function StatelessBGButton(props) {
  return _react2.default.createElement(
    'button',
    { style: { backgroundColor: props.BG } },
    BUTTON_TEXT
  );
};

var ColorBGButton = function (_Component4) {
  _inherits(ColorBGButton, _Component4);

  function ColorBGButton() {
    _classCallCheck(this, ColorBGButton);

    return _possibleConstructorReturn(this, (ColorBGButton.__proto__ || Object.getPrototypeOf(ColorBGButton)).apply(this, arguments));
  }

  _createClass(ColorBGButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        { style: {
            backgroundColor: this.props.BG,
            color: this.props.color
          } },
        BUTTON_TEXT
      );
    }
  }]);

  return ColorBGButton;
}(_react.Component);

ColorBGButton.propTypes = {
  color: _propTypes2.default.string.isRequired,
  BG: _propTypes2.default.string.isRequired
};


describe('compose test', function () {
  it('should return factory', function () {
    var ComposedButton = (0, _compose2.default)(Button);
    expect(ComposedButton).toBe(Button);
  });

  it('should render a button', function () {
    var Parent = (0, _compose2.default)(Factory, { Button: Button });
    var parent = (0, _enzyme.mount)(_react2.default.createElement(Parent, { color: 'red' }));
    var button = parent.find('button');

    expect(button.length).toBe(1);
    expect(button.text()).toBe(BUTTON_TEXT);
  });

  it('should render a button which has bg prop', function () {
    var Parent = (0, _compose2.default)(Factory, {
      Button: {
        component: BGButton,
        props: {
          map: {
            'BG': 'buttonBG'
          }
        }
      }
    });
    var parent = (0, _enzyme.mount)(_react2.default.createElement(Parent, { color: 'red', buttonBG: 'green' }));

    var button = parent.find('button');
    expect(button.length).toBe(1);
    expect(button.prop('style').backgroundColor).toBe('green');
  });

  it('should render a button which has bg and color prop', function () {
    var Parent = (0, _compose2.default)(Factory, {
      Button: {
        component: ColorBGButton,
        props: {
          map: {
            BG: 'buttonBG',
            color: 'color'
          },
          share: ['color']
        }
      }
    });
    var parent = (0, _enzyme.mount)(_react2.default.createElement(Parent, { color: 'red', buttonBG: 'green' }));

    var button = parent.find('button');
    expect(button.length).toBe(1);
    expect(button.prop('style').backgroundColor).toBe('green');
    expect(button.prop('style').color).toBe('red');
  });

  it('render stateless child component', function () {
    var Parent = (0, _compose2.default)(Factory, {
      Button: {
        component: StatelessBGButton,
        props: {
          map: {
            'BG': 'buttonBG'
          }
        }
      }
    });
    var parent = (0, _enzyme.mount)(_react2.default.createElement(Parent, { color: 'red', buttonBG: 'green' }));

    var button = parent.find('button');
    expect(button.length).toBe(1);
    expect(button.prop('style').backgroundColor).toBe('green');
  });
});