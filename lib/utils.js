export const canHaveRef = (Component) => {
  return Component.prototype &&
        Component.prototype.isReactComponent && 
        !Component.prototype.isPureReactComponent
}

export const componentName = (component) => {
  return component.displayName || component.name || 'Component'
}

const classBaseMethods = (() => {
  class Test {}
  return Object.keys(new Test())
})()

/**
 * @param {ComponentInstance} targetInstance which will have all methods
 * @param {ComponentInstance} sourceInstance where all methods be processed 
 */
export const proxyInstanceMethods = (targetInstance, sourceInstance) => {
  let ignoredMethods = [
    // Mounting
    'constructor',
    'componentWillMount',
    'render',
    'componentDidMount',
    // Updating
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    // Unmounting
    'componentWillUnmount',
    'getChildContext'
  ].concat(classBaseMethods)

  let prototype = Object.getPrototypeOf(sourceInstance)
  Object.getOwnPropertyNames(prototype).forEach(property => {
    if (ignoredMethods.indexOf(property) === -1) {
      if (typeof prototype[property] === 'function') {
        targetInstance[property] = prototype[property].bind(sourceInstance)
      }
    }
  })
}
