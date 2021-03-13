<template>
  <div>
    <ul class="aside-item">
      <li>
        <h2>图片</h2>
        <div class="aside-item-box">
          <uploadImg v-model="param.imageUrl" />
        </div>
      </li>
      <li>
        <h2>标题</h2>
        <div class="aside-item-box">
          <div class="aside-item-box-edit">
            <markdown v-model="param.title"/>
          </div>
        </div>
      </li>
      <li>
        <h2>文本</h2>
        <div class="aside-item-box">
          <div class="aside-item-box-edit">
            <markdown v-model="param.content" />
          </div>
        </div>
      </li>
      <li>
        <h2>按钮</h2>
        <div class="aside-item-box">
          <h4>显示按钮</h4>
          <div class="aside-item-show">
            <p v-for="item in $enums.showButtons()" :key="item.value"><el-radio @change="setTemplateDesign({ imageSingle: param })" v-model="param.showButton" :label="item.value">{{item.label}}</el-radio></p>
          </div>
          <h4>按钮文字</h4>
          <el-input @change="setTemplateDesign({ imageSingle: param })" v-model="param.buttonWord" placeholder="请输入内容"></el-input>
          <h4>按钮链接</h4>
          <span class="link">{{ linkTitle }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import uploadImg from '@/components/uploadImg'
import { isJSON, isEmpty } from "@/utils/index"
import { commonMixin } from "@/mixins"
import Markdown from "./Markdown"
import { EventBus } from "@/utils/event-bus";

export default {
  mixins: [commonMixin],
  inject:['decorationForm'],
  components: { Markdown, uploadImg },
  computed:{
    ...mapState('imageSingle',['param'])
  },
  data() {
    return {
      isTitleFirst: true,
      isLogoUrlFirst: true,
      isContentFirst: true,
      linkTitle: "选择需要跳转的链接",
    }
  },
  watch:{
    'param.title':function(title){
        if(!this.isTitleFirst && isJSON(title)) this.setTemplateDesign({imageSingle:this.param})
        if(this.isTitleFirst) this.isTitleFirst=false
    },
    'param.logoUrl':function(val){
      if(!this.isLogoUrlFirst && !isEmpty(val)) this.setTemplateDesign({imageSingle:this.param})
      if(this.isLogoUrlFirst) this.isLogoUrlFirst=false
    },
    'param.content':function(conetnt){
      if(!this.isTitleFirst && isJSON(conetnt)) this.setTemplateDesign({imageSingle:this.param})
      if(this.isContentFirst) this.isContentFirst=false
    }
  },
  methods: {
    ...mapActions(['setTemplateDesign']),
    selectJumpLink() {
      EventBus.$emit('selectLink');
    }
  },
  created() {
    if(this.param.linkTitle) {
      this.linkTitle = this.param.linkTitle;
    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>