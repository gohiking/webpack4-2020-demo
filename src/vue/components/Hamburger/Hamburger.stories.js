import Vue from 'vue'

import { storiesOf } from '@storybook/vue'
// import { action } from '@storybook/addon-actions'
import Centered from '@storybook/addon-centered/vue'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import Hamburger from '.'

Vue.component('Hamburger', Hamburger)

const stories = storiesOf('Hamburger', module)
stories.addDecorator(withKnobs)
stories.addDecorator(Centered)
  .add('basic', () => {
    return {
      props: {
        isOpen: {
          default: boolean('isOpen', false)
        }
      },
      data: () => ({
        // isOpen: boolean('isOpen', false)
      }),
      methods: {
        onClick() {
          this.isOpen = !this.isOpen
        }
      },
      template: pug`
        div
          Hamburger(@toggle="onClick" :is-open="isOpen")`
    }
  })
