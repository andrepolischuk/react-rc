# react-rc [![Build Status][travis-image]][travis-url]

> React high-order component for configuration

## Install

```sh
npm install --save react-rc
```

## Usage

In component:

```js
import React from 'react'
import {withConfig} from 'react-rc'

function Demo ({title}) {
  return (
    <h1>{title}</h1>
  )
}

export default withConfig((config, props) => ({
  title: config[props.projectId]
}))(Demo)
```

In app:

```js
import React from 'react'
import {render} from 'react-dom'
import {ConfigProvider} from 'react-rc'
import Demo from './Demo'

const config = {
  foo: 'Foo',
  bar: 'Bar'
}

render(
  <ConfigProvider config={config}>
    <Demo projectId='foo' /> {/* {title: 'Foo'} */}
  </ConfigProvider>,
  document.querySelector('#root')
)
```

## API

### ConfigProvider

A high-order component passes config object by context.

#### props

##### props.config

*Required*  
Type: `object`

##### props.children

*Required*  
Type: `element`

### withConfig(mapConfigToProps)

Create a high-order component to connect your component to context config.

#### mapConfigToProps(config, props)

Type: `function`

Function to merge config with props given to your component.

##### config

Type: `object`

##### props

Type: `object`

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/react-rc
[travis-image]: https://travis-ci.org/andrepolischuk/react-rc.svg?branch=master
