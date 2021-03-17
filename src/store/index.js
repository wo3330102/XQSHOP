import Vue from 'vue'
import Vuex from 'vuex'

import {templateQuery, templateDesign} from "@/api/decoration";
const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  value.default.namespaced = true
  modules[moduleName] = value.default
  return modules
}, {})
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    tempId:0,
    type:0,
    moduleId:0,
    url:'',
    reflash:false,  
  },
  mutations: {
    setModuleId:function(state, data){
      state.moduleId=data
    },
    setType:function(state, data){
      state.type=data
    },
    setTempId:function(state, data){
      state.tempId=data
    },
    setUrl:function(state,url){ 
      state.url = url;
    },
    isRefresh:function(state,val){
      state.reflash = val;
    },  
  },
  actions: {
    getTemplateQuery ({ commit, state }) {
      // commit('setTemplateEdit')
      // let { data } = res
      // this.list = data || {}
      let {tempId, type, moduleId} = state
      templateQuery({tempId, type, moduleId}).then((res)=>{
        let list = res.data || {}
        if(type===0){
          commit('head/setTemplateEdit',list)
        }else if(type===1){
          commit('carousel/setImgList',list)
        }else if(type===2){
          commit('category/setProCategory',list)
        }else if(type===3){
          commit('choice/setChoice',list)
        }else if(type===5){
          commit('imageSingle/setImgSingle',list)
        }else if(type===6){
          commit('text/setText',list)
        }else if(type===7){
          commit('sub/setSub',list)
        }else if(type===12){
          
        }
      })
    },
    setTemplateDesign({ commit, state}, payload){
      let {tempId, type, moduleId} = state
      templateDesign({type, tempId, moduleId, ...payload}).then((res)=>{
        console.log(res)
      })
    }
  },
  modules: {
    ...modules
  }
})
