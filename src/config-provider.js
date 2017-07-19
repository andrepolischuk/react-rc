import {Component, Children} from 'react'
import {object, element} from 'prop-types'
import channel from './channel'

export default class ConfigProvider extends Component {
  static propTypes = {
    config: object.isRequired,
    children: element.isRequired
  }

  static contextTypes = {
    [channel]: object
  }

  static childContextTypes = {
    [channel]: object
  }

  getChildContext () {
    return {
      [channel]: this.getConfig()
    }
  }

  getConfig () {
    return {
      ...this.context[channel],
      ...this.props.config
    }
  }

  render () {
    return Children.only(this.props.children)
  }
}
