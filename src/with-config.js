import React, {Component} from 'react'
import {object} from 'prop-types'
import channelKey from './channel-key'

function mapFullConfig (config) {
  return {
    config
  }
}

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withConfig (mapConfigToProps = mapFullConfig) {
  return WrappedComponent => class WithConfig extends Component {
    static displayName = `WithConfig(${getDisplayName(WrappedComponent)})`

    static contextTypes = {
      [channelKey]: object
    }

    get updateChannel () {
      return this.context[channelKey]
    }

    componentDidMount () {
      this.unsubscribe = this.updateChannel.subscribe(() => {
        this.forceUpdate()
      })
    }

    componentWillUnmount () {
      this.unsubscribe()
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...mapConfigToProps(this.updateChannel.getState(), this.props)} />
      )
    }
  }
}
