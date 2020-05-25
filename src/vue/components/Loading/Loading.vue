<template lang="pug">
  transition(name="fade")
    .preload(:class="classStatus")
      | loading
</template>
<script>
import imagesLoaded from 'imagesloaded'

export default {
  data: () => ({
    classStatus: '',
  }),
  methods: {
  },
  mounted() {
    this.$nextTick(() => {
      if($('#index').length > 0) {
        this.classStatus = 'is-transition'
        imagesLoaded( 'body', { background: true }, () => {
          setTimeout(() => {
            this.classStatus = 'is-done'
            this.$emit('loaded')
          }, 1500)
        })
      } else {
        this.classStatus = 'is-done'
        this.$emit('loaded')
      }
      
    })
    
  },
  components: { Cube }
}
</script>

<style lang="sass" src='./Loading.sass'></style>
