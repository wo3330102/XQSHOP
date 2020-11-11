import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url:'',
    reflash:false,
  },
  mutations: {
    setUrl:function(state,url){ 
      state.url = url;
    },
    isRefresh:function(state,val){
      state.reflash = val;
    }
  },
  actions: {
  },
  modules: {
  }
})
