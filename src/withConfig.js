import React, {Component} from 'react'
import {object} from 'prop-types'
import channelKey from './channelKey'

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withConfig (WrappedComponent) {
  return class WithConfig extends Component {
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
          {...this.updateChannel.getState()} />
      )
    }
  }
}
