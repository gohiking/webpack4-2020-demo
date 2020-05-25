// @flow
import Vuex, { MutationTree, ActionTree } from 'vuex'
import modules from './modules'
import Vue from 'vue'
import MobileDetect from 'mobile-detect'
// import { type ChatType } from '@/utils/types'
Vue.use(Vuex)

export type TypeState = {
  loading: boolean,
  device: String,
  isDesktop: boolean,
  hamburger: boolean,
}

const defaultState:TypeState = {
  loaded: false,
  device: '',
  isDesktop: true,
  hamburger: false,
}

const mutations:MutationTree<TypeState> = {
  LOADED_SET(state:TypeState, payload:boolean) {
    state.loaded = payload
  },
  DEVICE_SET(state:TypeState, payload:string) {
    state.device = payload
  },
  HAMBURGER_SET(state:TypeState, payload:boolean) {
    if (payload === undefined) {
      state.hamburger = !state.hamburger
    } else {
      state.hamburger = payload
    }
  },
  DESKTOP_SET(state:TypeState, payload:string) {
    state.isDesktop = payload
  },
  
}

const actions:ActionTree<TypeState> = {
  onResize({ commit }) {
    const md = new MobileDetect(window.navigator.userAgent)
    if (md.tablet() || md.mobile() || md.phone()) {
      commit('DESKTOP_SET', false)
    } else {
      commit('DESKTOP_SET', true)
    }
    if (window.matchMedia('(min-width: 1200px)').matches) {
      commit('DEVICE_SET', 'xl')
    } else if (window.matchMedia('(max-width: 1199.98px) and (min-width: 992px)').matches) {
      commit('DEVICE_SET', 'lg')
    } else if (window.matchMedia('(max-width: 991.98px) and (min-width: 768px)').matches) {
      commit('DEVICE_SET', 'md')
    } else if (window.matchMedia('(max-width: 767.98px) and (min-width: 425px)').matches) {
      commit('DEVICE_SET', 'sm')
    } else if (window.matchMedia('(max-width: 424.98px)').matches) {
      commit('DEVICE_SET', 'xs')
    }
  }
  // fetchChatHistory({ commit }) {
  //   commit('setLoading', true)
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       commit('setLoading', false)
  //       const mockdataResult:ChatType[] = mockData(10)
  //       commit('setChatList', mockdataResult)
  //       resolve(mockdataResult)
  //     }, 1000)
  //   })
  // }
}

const getters = {
}

export default new Vuex.Store<TypeState>({
  modules,
  state: defaultState,
  getters,
  actions,
  mutations
})
