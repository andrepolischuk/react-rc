import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'
import {ConfigProvider, withConfig} from './src'

const Demo = props => null

test('single provider', t => {
  const Configured = withConfig((config, props) => ({
    title: config[props.id]
  }))(Demo)

  const wrapper = mount(
    <ConfigProvider config={{foo: 'Foo'}}>
      <Configured id='foo' />
    </ConfigProvider>
  )

  t.deepEqual(wrapper.find(Demo).props(), {
    id: 'foo',
    title: 'Foo'
  })
})

test('nested provider', t => {
  const Configured = withConfig(config => ({config}))(Demo)

  const wrapper = mount(
    <ConfigProvider config={{foo: 'Foo'}}>
      <ConfigProvider config={{bar: 'Bar'}}>
        <Configured />
      </ConfigProvider>
    </ConfigProvider>
  )

  t.deepEqual(wrapper.find(Demo).props(), {
    config: {
      foo: 'Foo',
      bar: 'Bar'
    }
  })
})
