import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'
import {ConfigProvider, withConfig} from './src'

const config = {
  foo: 'Foo',
  bar: 'Bar'
}

function Title ({title}) {
  return (
    <div>Hello, {title}</div>
  )
}

test(t => {
  const mapConfig = (config, props) => ({
    title: config[props.id]
  })

  const TitleWithConfig = withConfig(mapConfig)(Title)

  const wrapper = mount(
    <ConfigProvider config={config}>
      <div>
        <TitleWithConfig id='foo' />
        <TitleWithConfig id='bar' />
      </div>
    </ConfigProvider>
  )

  t.is(wrapper.childAt(0).text(), 'Hello, Foo')
  t.is(wrapper.childAt(1).text(), 'Hello, Bar')
})
