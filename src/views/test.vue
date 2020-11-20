<template>
  <div class="">
    <div v-for="(item,index) in list" :key="item.id">
      <el-select v-model="item.value" placeholder="选择关系" @change="(e)=>{ChangeSelect(e,index)}" @visible-change="(e)=>{BeforeChange(e,index)}" clearable>
        <el-option v-for="(v,i) in option" :key="i" :label="v.label" :value="v.id" v-show="v.show"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option:[{
        id:1,
        label:'父亲',
        show:true,
      },{
        id:2,
        label:'母亲',
        show:true,
      },{
        id:3,
        label:'兄弟',
        show:true,
      },{
        id:4,
        label:'姐妹',
        show:true,
      }],
      list:[{
        id:1,
        value:'',
      },{
        id:2,
        value:'',
      },{
        id:3,
        value:'',
      },{
        id:4,
        value:'',
      }], 
    }
  }, 
  methods:{
    ChangeSelect(e,index){ 
      if(e){
        if(this.list[index].value){
          this.option.map(i=>{
            if(i.id == e){
              i.show = !i.show
            }
          })
        } else {

        }
      } else {
         

      }
    },
    BeforeChange(e,index){
      let arr = [];
      this.list.map(i=>{
        if(i.value){
          arr.push(i.value)
        }
      })
      if(arr.length>0){
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
