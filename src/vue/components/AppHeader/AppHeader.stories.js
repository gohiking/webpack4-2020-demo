import Vue from 'vue'

import { storiesOf } from '@storybook/vue'
import Centered from '@storybook/addon-centered/vue'
import { withKnobs } from '@storybook/addon-knobs'

import AppHeader from '.'

Vue.component('AppHeader', AppHeader)

const stories = storiesOf('AppHeader', module)
stories.addDecorator(withKnobs)
stories.addDecorator(Centered)
  .add('basic', () => ({
    props:{
    },
    data: () => ({
    }),
    methods: {
    },
    template: pug`
      div
        AppHeader`,
  }))
