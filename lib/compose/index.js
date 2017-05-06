import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { componentName, canHaveRef, proxyInstanceMethods}  from '../utils'

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

function withComponents (Factory, children) {
  if (!children || !Object.keys(children).length) {
    return Factory
  }
  
  let components = {}
  let mapProps = []
  let sharedProps = []
  let childContextTypes = {}

  for (let name in children) {
    let option = children[name]
    components[name] = childComponent(option.component, option.props)
    mapProps = mapProps.concat(extractMappedProps(option.props.map))
    sharedProps = sharedProps.concat(option.props.share || [])
  }

  mapProps.forEach(name => {
    childContextTypes[name] = PropTypes.any
  })

  return class WrapperComponent extends Component {
    static displayName = componentName(Factory) + 'Wrapper'
    static childContextTypes = childContextTypes
    $$context = {}

    // pass mapped props to children component by context
    getChildContext () {
      mapProps.forEach(name => {
        this.$$context[name] = this.props[name]
      })
      return this.$$context
    }

    componentDidMount () {
      if (canHaveRef(Factory)) {
        proxyInstanceMethods(this, this.refs.component)
      }
    }
    
    render () {
      let props = this.props
      if (mapProps.length) {
        props = Object.assign({}, this.props)
        mapProps.forEach(name => {
          if (sharedProps.indexOf(name) === -1) {
            delete props[name]
          }
        })
      }
      if (canHaveRef(Factory)) {
        return <Factory {...components} {...props} ref="component"/>
      } else {
        return <Factory {...components} {...props} />
      }
    }
  }
}

/**
 * make a childComponent receive new mapped props
 * @param ChildComponent 
 * @param props 
 */
function childComponent(ChildComponent, props) {
  if (!props || !Object.keys(props).length) {
    return ChildComponent
  }
  
  let mapProps = props.map

  let contextTypes = {}
  for (let name in mapProps) {
    let mappedName = mapProps[name]
    contextTypes[mappedName] = PropTypes.any
  }

  return class Comp extends Component {
    static displayName = 'Child' + componentName(ChildComponent)
    static contextTypes = contextTypes

    componentDidMount () {
      if (canHaveRef(ChildComponent)) {
        proxyInstanceMethods(this, this.refs.component)
      }
    }
    
    render () {
      // map mapped props to component props
      let props = Object.assign({}, this.props)
      let mappedName
      for (let name in mapProps) {
        mappedName = mapProps[name]
        if (!props[name]) {
          props[name] = this.context[mappedName]
        }
      }

      if (canHaveRef(ChildComponent)) {
        return <ChildComponent {...props} ref="component" />
      } else {
        return <ChildComponent {...props} />
      }
    }
  }
}

const emptyArray = []
function extractMappedProps (mapProps) {
  if (!mapProps) {
    return Object.keys(mapProps).map(prop => mapProps[prop])
  } else {
    return emptyArray
  }
}
