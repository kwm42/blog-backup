import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    archieves:[],
    articles:[],
    article:{}
  },
  getters:{
    getArticles(state){
      return state.articles
    },
    getArchieves(state){
      return state.archieves
    },
    getArticlesByArchieve:(state)=>(date)=>{
      return state.articles.find(article.date=date)
    },
    getArticle(state){
      return state.article
    }
  },
  mutations: {
    setArticles(state,articles){
      state.articles=articles
    },
    setArchieves(state,archieves){
      state.archieves=archieves
    },
    setArticle(state,article){
      state.article=article
    }
  },
  actions: {

  }
})
