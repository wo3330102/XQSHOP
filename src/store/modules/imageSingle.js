export default {
    state: {
      param:{
        imageUrl:"",
        content: "",
        title: "",
        showButton:1,
        buttonWord:"",
        buttonLink:""
      } 
    },
    mutations: {
      setImgSingle(state, payload){
        state.param = payload
      }
    },
    actions: {
      
    }
  }