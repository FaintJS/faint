import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {mount} from 'enzyme'

import compose from '../../lib/compose'

const BUTTON_TEXT = 'this is a button'
class Factory extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    Button: PropTypes.any.isRequired
  }

  render () {
    let {
      Button,
      color
    } = this.props
    return (
      <div style={{color: color}}>
        render a button
        <Button />
      </div>
    )
  }
}


class Button extends Component {
  render () {
    return (
      <button>{BUTTON_TEXT}</button>
    )
  }
}

class BGButton extends Component {
  static propTypes = {
    BG: PropTypes.string.isRequired
  }

  render () {
    return (
      <button style={{backgroundColor: this.props.BG}}>
        {BUTTON_TEXT}
      </button>
    )
  }
}

const StatelessBGButton = (props) => {
  return (
    <button style={{ backgroundColor: props.BG }}>
      {BUTTON_TEXT}
    </button>
  )
}

class ColorBGButton extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    BG: PropTypes.string.isRequired
  }

  render () {
    return (
      <button style={{
        backgroundColor: this.props.BG,
        color: this.props.color
      }}>
        {BUTTON_TEXT}
      </button>
    )
  } 
}

describe('compose test', () => {
  it('should return factory', () => {
    const ComposedButton = compose(Button)
    expect(ComposedButton).toBe(Button)
  })

  it('should render a button', () => {
    const Parent = compose(Factory, {Button})
    const parent = mount(
      <Parent color="red" />
    )
    const button = parent.find('button')

    expect(button.length).toBe(1)
    expect(button.text()).toBe(BUTTON_TEXT) 
  })

  it('should render a button which has bg prop', () => {
    const Parent = compose(Factory, {
      Button: {
        component: BGButton,
        props: {
          map: {
            'BG': 'buttonBG'
          }
        }
      }
    })
    const parent = mount(
      <Parent color="red" buttonBG="green" />
    )

    const button = parent.find('button')
    expect(button.length).toBe(1)
    expect(button.prop('style').backgroundColor).toBe('green')
  })

  it('should render a button which has bg and color prop', () => {
    const Parent = compose(Factory, {
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
    })
    const parent = mount(
      <Parent color="red" buttonBG="green" />
    )

    const button = parent.find('button')
    expect(button.length).toBe(1)
    expect(button.prop('style').backgroundColor).toBe('green')
    expect(button.prop('style').color).toBe('red')
  })
  
  it('render stateless child component', () => {
    const Parent = compose(Factory, {
      Button: {
        component: StatelessBGButton,
        props: {
          map: {
            'BG': 'buttonBG'
          }
        }
      }
    })
    const parent = mount(
      <Parent color="red" buttonBG="green" />
    )

    const button = parent.find('button')
    expect(button.length).toBe(1)
    expect(button.prop('style').backgroundColor).toBe('green')
  })
})

