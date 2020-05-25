import Vue from 'vue'

import { storiesOf } from '@storybook/vue'
import Centered from '@storybook/addon-centered/vue'
import { withKnobs } from '@storybook/addon-knobs'

import Svg from '.'

Vue.component('Svg', Svg)

const stories = storiesOf('Svg', module)
stories.addDecorator(withKnobs)
stories.addDecorator(Centered)
  .add('basic', () => ({
    props: {
    },
    data: () => ({
    }),
    methods: {
    },
    template: pug`
      div
        Svg`
  }))
