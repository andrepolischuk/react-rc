import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'
import {ConfigProvider, withConfig} from './src'

const Demo = ({children = null}) => children

test('single provider', t => {
  const Configured = withConfig(Demo)

  const wrapper = mount(
    <ConfigProvider config={{title: 'Foo'}}>
      <Configured id='foo' />
    </ConfigProvider>
  )

  t.deepEqual(wrapper.find(Demo).props(), {
    id: 'foo',
    title: 'Foo'
  })
})

test('nested provider', t => {
  const Configured = withConfig(Demo)

  const wrapper = mount(
    <ConfigProvider config={{title: 'Foo'}}>
      <div>
        <ConfigProvider config={{subtitle: 'Bar'}}>
          <Configured />
        </ConfigProvider>
        <Configured />
      </div>
    </ConfigProvider>
  )

  t.deepEqual(wrapper.find(Demo).at(0).props(), {
    title: 'Foo',
    subtitle: 'Bar'
  })

  t.deepEqual(wrapper.find(Demo).at(1).props(), {title: 'Foo'})
})

test('update config after mount', t => {
  const Configured = withConfig(Demo)

  const wrapper = mount(
    <ConfigProvider config={{title: 'Foo'}}>
      <div>
        <ConfigProvider config={{title: 'Bar'}}>
          <Configured />
        </ConfigProvider>
        <Configured />
      </div>
    </ConfigProvider>
  )

  t.deepEqual(wrapper.find(Demo).at(0).props(), {title: 'Bar'})
  t.deepEqual(wrapper.find(Demo).at(1).props(), {title: 'Foo'})

  wrapper.setProps({
    config: {
      title: 'Baz'
    }
  })

  t.deepEqual(wrapper.find(Demo).at(0).props(), {title: 'Bar'})
  t.deepEqual(wrapper.find(Demo).at(1).props(), {title: 'Baz'})
})
