<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
    onClick() {
      this.$emit('toggle')
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  components: {
  },
}
</script>

<template lang="pug">
.hamburger.hamburger--3dx(@click="onClick", :class="{ 'is-active': isOpen }")
  span.hamburger-box
    span.hamburger-inner
</template>

<style lang="sass" src="./Hamburger.sass"></style>