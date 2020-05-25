<script>
import Loading from '@vue/components/Loading'
import AppHeader from '@vue/components/AppHeader'
import Index from '@vue/pages/Index'
import Vuex from 'vuex'

const DEFAULT_TRANSITION = 'fade'

export default {
  props: {},
  data: () => ({
    transitionName: DEFAULT_TRANSITION,
    isIE: false,
  }),
  computed: {
    ...Vuex.mapState([
        'loaded',
        'device',
        'hamburger',
        'isDesktop',
      ]),
    // ...Vuex.mapGetters(['']),
  },
  methods: {
    ...Vuex.mapMutations(['DEVICE_SET', 'HAMBURGER_SET']),
    ...Vuex.mapActions(['onResize']),
    onLoaded() {
      this.$store.commit('LOADED_SET', true)
    },
    detectIE() {
      var ua = window.navigator.userAgent;

      // Test values; Uncomment to check result …

      // IE 10
      // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

      // IE 11
      // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

      // Edge 12 (Spartan)
      // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

      // Edge 13
      // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      // var trident = ua.indexOf('Trident/');
      // if (trident > 0) {
      //   // IE 11 => return version number
      //   var rv = ua.indexOf('rv:');
      //   return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      // }

      // var edge = ua.indexOf('Edge/');
      // if (edge > 0) {
      //   // Edge (IE 12+) => return version number
      //   return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      // }

      // other browser
      return false;
    }
  },
  created() {
    this.isIE = this.detectIE()
    this.onResize()
    
    // this.$router.beforeEach((to, from, next) => {
    //   let transitionName = to.meta.transitionName || from.meta.transitionName
    //   if(from.name === 'eventDetail') {
    //     this.transitionName = DEFAULT_TRANSITION
    //   } else if(to.name === 'eventDetail' && from.name === 'index') {
    //     if (this.$store.state.isDesktop) {
    //       this.transitionName = transitionName || DEFAULT_TRANSITION
    //     } else {
    //       this.transitionName = DEFAULT_TRANSITION
    //     }
    //   }
    //   else {
    //     this.transitionName = DEFAULT_TRANSITION
    //   }
    //   next()
    // })
  },
  mounted() {
    window.addEventListener('resize', () => this.onResize(), false)
  },
  beforeDestroy() {
  },
  components: {
    Loading,
    AppHeader,
    Index,
    CardCompare
  },
};
</script>

<template lang="pug">

.view(
  :class="{'is-open-drawer': hamburger, ['is-' + device]: true, 'is-mobile': !isDesktop, 'is-page-loaded': loaded }",
)
  .app__content#viewport(v-if="isIE === false")
    loading(@loaded='onLoaded')
    div(v-if="loaded")
      #top
      app-header(
        :device='device',
        :is-open='hamburger',
        @toggle="HAMBURGER_SET"
      )
      transition(:name="transitionName" mode="out-in")
        router-view.router-view
      //- footer
        
</template>
<style lang="sass" src="./App.sass"></style>
