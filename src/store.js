import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    archieves:[],
    articles:[]
  },
  getters:{
    getArticles(state){
      return state.articles
    },
    getArchieves(state){
      return state.archieves
    }
  },
  mutations: {
    setArticles(state,articles){
      state.articles=articles
    },
    setArchieves(state,archieves){
      state.archieves=archieves
    }
  },
  actions: {

  }
})
