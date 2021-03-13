export default {
    state: {
      param:{
        content: "",
		    title: ""
      } 
    },
    mutations: {
      setText(state, payload){
        state.param = payload
      },
      // setContent (state, payload) {
      //   // 变更状态
      //   state.content = payload
        
      // },
      // setTitle (state, payload) {
      //   // 变更状态
      //   state.title = title
        
      // }
    },
    actions: {
      
    }
  }