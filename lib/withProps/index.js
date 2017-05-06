import React, {Component} from 'react'
import { componentName, canHaveRef, proxyInstanceMethods } from '../utils'

let withDefaultProps = (RenderedComponent, defaultProps) => {
  return class WrapperComponent extends Component {
    static displayName = componentName(RenderedComponent) + 'DefaultPropsWrapper'

    componentDidMount () {
      if (canHaveRef(RenderedComponent)) {
        proxyInstanceMethods(this, this.refs.component)
      }
    }

    render () {
      if (canHaveRef(RenderedComponent)) {
        return <RenderedComponent {...defaultProps} {...this.props} ref="component" />
      } else {
        return <RenderedComponent {...defaultProps} {...this.props} />        
      }
    }
  }
}

export default withDefaultProps
