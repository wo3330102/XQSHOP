<template>
  <div class="footer-list">
    <h2 class="footer-list-title">
      <span><i class="el-icon-s-grid"></i><label>轮播图</label></span>
      <i class="el-icon-arrow-down"></i>
    </h2>
    <div class="footer-list-box">
      <div class="footer-list-menu">
        <div>
          <uploadImg />
          <h3>
            <span>标题</span>
          </h3>
          <Markdown />
          <h3>
            <span>文本</span>
          </h3>
          <Markdown />
          <h3>
            <span>链接</span>
          </h3>
          <span class="link" @click="selectJumpLink">{{ linkTitle }}</span>
        </div>
      </div>
      <div class="footer-list-del">
        <el-button>删除轮播图</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { commonMixin } from "@/mixins";
import uploadImg from "@/components/uploadImg";
import Markdown from "./Markdown";
import { EventBus } from "@/utils/event-bus";
import { mapState } from 'vuex';

export default {
  mixins: [commonMixin],
  inject: ["decorationForm"],
  components: { Markdown, uploadImg },
  data() {
    return {
      linkTitle: "选择需要跳转的链接",
    };
  },
  watch: {
    "param.linkTitle": function (val) {
      if (!isEmpty(val)) {
        this.linkTitle = val;
      }
    },
  }, 
  computed:{
        ...mapState('param')
    },
  methods: {
    selectJumpLink() {
      EventBus.$emit('selectLink');
    }
  },
  created() { 
    if(this.param){
      if(this.param.linkTitle) {
      this.linkTitle = this.param.linkTitle;
    }
    } 
  },
};
</script>
<style lang="scss" scoped>
.footer-list {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  .footer-list-title {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    font-weight: normal;
    span {
      display: flex;
      i {
        color: #44505b;
        width: 20px;
        line-height: 30px;
        display: inline-block;
        vertical-align: top;
        font-size: 20px;
      }
      label {
        font-size: 14px;
        color: #666;
        cursor: pointer;
        line-height: 30px;
        display: inline-block;
        vertical-align: top;
      }
    }
    i {
      color: #999;
      width: 30px;
      text-align: center;
      font-size: 18px;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
  .footer-list-box {
    padding: 0 8px 10px;
    h3 {
      display: flex;
      justify-content: space-between;
      height: 20px;
      color: #637381;
      line-height: 20px;
      padding: 12px 0 8px;
      font-size: 14px;
      font-weight: 400;
    }
    .footer-list-del {
      margin-top: 10px;
    }
  }
}
</style>