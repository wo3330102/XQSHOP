<template>
  <div>
    <el-dialog title="添加菜单" width="40%" :visible.sync="showAddMenuCom" @close="CloseDialog" >
      <p class="title">已选取菜单类别</p>
      <el-select v-model="selectMenu" multiple placeholder="请选择" @change="SelectChange">
        <el-option-group v-for="group in pageList" :key="group.label" :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option> 
        </el-option-group>
      </el-select> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="CloseDialog">取 消</el-button>
        <el-button type="submit" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show: function (newVal, oldVal) {
      console.log("newVal", newVal);
      console.log("oldVal", oldVal);
      // this.showAddMenuCom = newVal
    },
  },
  data() {
    return { 
      showAddMenuCom: true,
      selectMenu: [],
      pageList: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海",
            },
            {
              value: "Beijing",
              label: "北京",
            },
          ],
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "Guangzhou",
              label: "广州",
            },
            {
              value: "Dalian",
              label: "大连",
            },
          ],
        },
      ], 
    };
  },
  methods: {
    CloseDialog: function () {
      this.$emit("Close", false);
    },
    ChangeActive: function (index) {
      this.active = index;
    },
    SelectChange:function(e){
      console.log(e)
    },
    submitForm: function (res) {
      console.log(res);
      console.log(this.selectMenu)
      this.$emit("selectData",this.selectMenu)
      this.$emit("Close", false);
    },
  },
  destroyed() {
    console.log("销毁");
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #202b37;
  line-height: 20px;
  margin-bottom: 12px;
}
.content {
}
</style>