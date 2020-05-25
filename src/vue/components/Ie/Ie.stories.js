import Vue from 'vue'

import { storiesOf } from '@storybook/vue'
import Centered from '@storybook/addon-centered/vue'
import { withKnobs } from '@storybook/addon-knobs'

import Ie from '.'

Vue.component('Ie', Ie)

const stories = storiesOf('Ie', module)
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
        Ie`
  }))
