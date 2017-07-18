import React, {Component} from 'react'
import {object} from 'prop-types'
import channel from './channel'

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
      [channel]: object
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...mapConfigToProps(this.context[channel], this.props)} />
      )
    }
  }
}
