import {Component, Children} from 'react'
import {object, element} from 'prop-types'
import createChannel from 'brcast'
import channelKey from './channel-key'

export default class ConfigProvider extends Component {
  static propTypes = {
    config: object.isRequired,
    children: element.isRequired
  }

  static contextTypes = {
    [channelKey]: object
  }

  static childContextTypes = {
    [channelKey]: object
  }

  channel = createChannel(this.getConfig())

  get updateChannel () {
    return this.context[channelKey]
  }

  getChildContext () {
    return {
      [channelKey]: this.channel
    }
  }

  componentDidMount () {
    if (this.updateChannel) {
      this.unsubscribe = this.updateChannel.subscribe(() => {
        this.channel.setState(this.getConfig())
      })
    }
  }

  componentWillReceiveProps ({config}) {
    if (config !== this.props.config) {
      this.channel.setState(this.getConfig(config))
    }
  }

  componentWillUnmount () {
    if (this.updateChannel) {
      this.unsubscribe()
    }
  }

  getConfig (config) {
    const nextConfig = config || this.props.config

    if (this.updateChannel) {
      return {
        ...this.updateChannel.getState(),
        ...nextConfig
      }
    }

    return nextConfig
  }

  render () {
    return Children.only(this.props.children)
  }
}
