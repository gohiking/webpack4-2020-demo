<script>
import Hamburger from '@vue/components/Hamburger'

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    device: {
      type: String
    },
    loginStatus: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isScrolled: false,
    submenu: false,
    isOverReceive: false,
    isSearchOpen: false,
    isSubRouterHover: false,
    id: 1,
    isScrollUp: false
  }),
  computed: {
    subimg() {
      return require("~/assets/images/category__" + this.id + ".jpg")
    },
    isShowHamburger() {
      if (this.device === 'lg' || this.device === 'xl') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    onToggle() {
      this.$emit('toggle')
    },
    onMouseoverSubRouter(id) {
      this.id = id
    },
    onSearch(status) {
      this.isSearchOpen = status
    },
    onMouseoverSub() {
      this.isSubRouterHover = true
    },
    onMouseoutSub() {
      this.isSubRouterHover = false
    },
    onSearchSubmit() {
      window.location.href = 'results.html'
    },
    routerClick() {
      this.isSubRouterHover = false
      this.$emit('toggle', false)
    },
    goReturn() {
      window.history.go(-1)
    }
    // scrollTo(className) {
    //   TweenMax.to(window, 1.3, {
    //     scrollTo: {
    //       y: className
    //     },
    //     ease: Power4.easeOut
    //   });
    //   this.$emit('toggle', false)
    // }
  },
  mounted() {
    const $window = $(window)
    let lastScroll = 0
    window.addEventListener('scroll', () => {
      let scroll = $window.scrollTop()
      
      if (scroll > 60) {
        if (!this.isScrolled) {
          this.$emit('scroll', true)
          this.isScrolled = true
        }
      } else {
        if (this.isScrolled) {
          this.$emit('scroll', false)
          this.isScrolled = false
        }
      }
      if (lastScroll - scroll > 0) {
        this.isScrollUp = true
      } else {
        this.isScrollUp = false
      }
      lastScroll = scroll
    })
  },
  beforeDestroy() {
  },
  components: {
    Hamburger
  },
}
</script>

<template lang="pug">
div(:class="{ 'is-search-open': isSearchOpen, 'is-scrolled': isScrolled, 'is-sub-hover': isSubRouterHover }")
  .app-header
  
</template>

<style lang="sass" src="./AppHeader.sass"></style>