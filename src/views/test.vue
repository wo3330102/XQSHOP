<template>
  <div class="page" > 
    <div>
      <div>
        <el-radio-group v-model="zhicheng">
        <el-radio :label="String(index)" v-for="(item,index) in zhichengList" :key="item.value">
          {{zhichengList[zhicheng].label}}
        </el-radio>
      </el-radio-group>
      </div>
      <div>
        
      <el-radio-group v-model="xuewei">
        <el-radio :label="index" v-for="(item,index) in xueweiList" :key="item.value">
           {{xueweiList[xuewei].label}}
        </el-radio>
      </el-radio-group>
      </div>
    </div>
    你的选择结果是{{zhichengList[zhicheng].value+xueweiList[xuewei].value}}
  </div>
</template> 

<script>
export default {
  data() {
    return {
      zhicheng:0,
      zhichengList:[{
        label:'教授',
        value:10000,
      },{
        label:'副教授',
        value:7000,
      },{
        label:'助理教授',
        value:5000,
      },{
        label:'讲师',
        value:4000,
      },{
        label:'未定级',
        value:4000,
      }],
      xuewei:0  ,
      xueweiList:[{
        label:'博士',
        value:5500,
      },{
        label:'双硕士',
        value:4800,
      },{
        label:'硕士',
        value:4300,
      },{
        label:'双学士',
        value:3800,
      },{
        label:'学士',
        value:3500,
      }]
    };
  },  
  created(){ 
  },
  methods:{ 
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%; 
  position: relative;
  .box { 
    background: #fff;
    width: 100%;
    height: 900%; 
    position: relative;
    .box-item{
      margin-top: 50px; 
      height: 100%;
      width: 100%;  
    }
    .box-item2{
      width: 100%; 
      height: 60px;
      position:sticky;
      top: 0;
      background: chocolate;
    } 
  }
}
</style> 
