import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import capitalize from 'lodash/capitalize'

const getUncontrolledName = (prop) => {
  return prop.prefix || 'default' + capitalize(prop.name)
}

export default (RenderedComponent, uncontrolledProps) => {
  // TODO development env check
  class UncontrolledComponent extends Component {
    constructor (props) {
      super(props)
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)   
      this.state = this.getUncontrolledState({}, props)
    }

    componentWillReceiveProps (nextProps) {
      this.setState(this.getUncontrolledState(this.props, nextProps))
    }
    
    getUncontrolledState (prevProps, props) {
      let state = {}
      uncontrolledProps.forEach(prop => {
        let controlledName = prop.name
        let uncontrolledName = getUncontrolledName(prop)

        if (props[uncontrolledName] === null || props[uncontrolledName] === undefined) {
          state[controlledName] = prop.default
        } else if (prevProps[uncontrolledName] !== props[uncontrolledName]) {
          state[controlledName] = props[uncontrolledName]
        }
      })
      return state
    }

    onChange (name, value, ...args) {
      this.setState({
        [name]: value
      })
      let eventName = 'on' + capitalize(name) + 'Change'
      this.props[eventName] && this.props[eventName](value, ...args)
    }

    render () {
      let props = Object.assign({}, this.props)
      uncontrolledProps.forEach(prop => {
        let name = getUncontrolledName(prop)
        delete props[name]
      })
      let events = {}
      uncontrolledProps.forEach(prop => {
        let name = prop.name
        let eventName = 'on' + capitalize(name) + 'Change'
        events[eventName] = this.onChange.bind(this, name)
        delete props[eventName]
      })
      return <RenderedComponent {...this.state} {...events} {...props} />
    }
  }
  return UncontrolledComponent
}
