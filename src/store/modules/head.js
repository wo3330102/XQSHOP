export default {
    state: {
      param:{
        showNotice:0, //公告
        showMain:0, //显示主页
        title:'',
        link:'',
        linkType: '',
        linkName: '',
        linkTitle: '',
        linkIndex: null, // 链接列表中的id，用于回显
        originalTitle: '',
        backColor:'#000',
        textColor:'#fff',
        logoUrl:'',
        menuBar:0,
        moneyConvert:0
      }
    },
    mutations: {
      setTemplateEdit (state, payload) {
        // 变更状态
        if(typeof payload==='object'){
          state.param = Object.assign(state.param, payload)
        }else{
          state.param[payload] = payload
        }
        
      }
    },
    actions: {
      
    }
  }