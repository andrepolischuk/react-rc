import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'
import {ConfigProvider, withConfig} from './src'

const Demo = ({children = null}) => children

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
      <div>
        <ConfigProvider config={{bar: 'Bar'}}>
          <Configured />
        </ConfigProvider>
        <Configured />
      </div>
    </ConfigProvider>
  )

  t.deepEqual(wrapper.find(Demo).at(0).props().config, {
    foo: 'Foo',
    bar: 'Bar'
  })

  t.deepEqual(wrapper.find(Demo).at(1).props().config, {foo: 'Foo'})
})

test('update config after mount', t => {
  const Configured = withConfig(config => ({config}))(Demo)

  const wrapper = mount(
    <ConfigProvider config={{foo: 'Foo'}}>
      <div>
        <ConfigProvider config={{foo: 'Bar'}}>
          <Configured />
        </ConfigProvider>
        <Configured />
      </div>
    </ConfigProvider>
  )

  t.deepEqual(wrapper.find(Demo).at(0).props().config, {foo: 'Bar'})
  t.deepEqual(wrapper.find(Demo).at(1).props().config, {foo: 'Foo'})

  wrapper.setProps({
    config: {
      foo: 'Baz'
    }
  })

  t.deepEqual(wrapper.find(Demo).at(0).props().config, {foo: 'Bar'})
  t.deepEqual(wrapper.find(Demo).at(1).props().config, {foo: 'Baz'})
})
