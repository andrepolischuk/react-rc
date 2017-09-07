# react-rc [![Build Status][travis-image]][travis-url]

> React high-order component for configuration

Some applications has a global or local configurations that rarely changed.
These components allows you to have single entry point for configurations
and select some their parts at any level of application.

## Install

```sh
npm install --save react-rc
```

## Usage

In component:

```js
import React from 'react'
import {withConfig} from 'react-rc'

function Demo ({projectId, i18n}) {
  return (
    <h1>{i18n[projectId]}</h1>
  )
}

export default withConfig(Demo)
```

In app:

```js
import React from 'react'
import {render} from 'react-dom'
import {ConfigProvider} from 'react-rc'
import Demo from './Demo'

const config = {
  i18n: {
    foo: 'Foo',
    bar: 'Bar'
  }
}

render(
  <ConfigProvider config={config}>
    <Demo projectId='foo' />
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

### withConfig(component)

Create a high-order component to connect your component to context config.

#### component

Type: `element`

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/react-rc
[travis-image]: https://travis-ci.org/andrepolischuk/react-rc.svg?branch=master
