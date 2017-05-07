'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canHaveRef = exports.canHaveRef = function canHaveRef(Component) {
  return Component.prototype && Component.prototype.isReactComponent && !Component.prototype.isPureReactComponent;
};

var componentName = exports.componentName = function componentName(component) {
  return component.displayName || component.name || 'Component';
};

var classBaseMethods = function () {
  var Test = function Test() {
    _classCallCheck(this, Test);
  };

  return Object.keys(new Test());
}();

/**
 * @param {ComponentInstance} targetInstance which will have all methods
 * @param {ComponentInstance} sourceInstance where all methods be processed 
 */
var proxyInstanceMethods = exports.proxyInstanceMethods = function proxyInstanceMethods(targetInstance, sourceInstance) {
  var ignoredMethods = [
  // Mounting
  'constructor', 'componentWillMount', 'render', 'componentDidMount',
  // Updating
  'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate',
  // Unmounting
  'componentWillUnmount', 'getChildContext'].concat(classBaseMethods);

  var prototype = Object.getPrototypeOf(sourceInstance);
  Object.getOwnPropertyNames(prototype).forEach(function (property) {
    if (ignoredMethods.indexOf(property) === -1) {
      if (typeof prototype[property] === 'function') {
        targetInstance[property] = prototype[property].bind(sourceInstance);
      }
    }
  });
};