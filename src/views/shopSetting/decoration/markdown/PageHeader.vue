<template>
  <div>
    <ul class="aside-item">
      <li>
        <h2>公告栏</h2>
        <div class="aside-item-box">
          <p>
            <el-checkbox
              :true-label="1"
              :false-label="0"
              @change="setTemplateDesign({ head: param })"
              v-model="param.showNotice"
              >显示公告</el-checkbox
            >
          </p>
          <p>
            <el-checkbox
              :true-label="1"
              :false-label="0"
              @change="setTemplateDesign({ head: param })"
              :disabled="!param.showNotice"
              v-model="param.showMain"
              >仅在主页显示</el-checkbox
            >
          </p>
        </div>
      </li>
      <li>
        <h2>标题</h2>
        <div class="aside-item-box">
          <div class="aside-item-box-edit">
            <markdown v-model="param.title" />
          </div>
        </div>
      </li>
      <li>
        <h2>链接</h2>
        <div class="aside-item-box">
          <span class="link" @click="selectJumpLink">{{linkTitle}}</span>
        </div>
      </li>

      <li>
        <h2>颜色</h2>
        <div class="aside-item-box">
          <p class="color-select">
            <span class="color-select-item"
              ><el-color-picker
                @change="setTemplateDesign({ head: param })"
                v-model="param.backColor"
                :show-alpha="true"
                size="mini"
              ></el-color-picker
              ><label>背景</label></span
            >
            <span class="color-select-item"
              ><el-color-picker
                @change="setTemplateDesign({ head: param })"
                v-model="param.textColor"
                :show-alpha="true"
                size="mini"
              ></el-color-picker
              ><label>文本</label></span
            >
          </p>
          <p>
            <span
              style="cursor: pointer"
              @click="(param.backColor = '#000'), (param.textColor = '#fff')"
              >恢复默认颜色</span
            >
          </p>
        </div>
      </li>
      <li>
        <h2>LOGO</h2>
        <div class="aside-item-box">
          <uploadImg v-model="param.logoUrl" />
        </div>
      </li>
      <li>
        <h2>菜单栏</h2>
        <div class="aside-item-box">
          <el-select
            v-model="param.menuBar"
            @change="setTemplateDesign({ head: param })"
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </li>
      <li>
        <h2>其他</h2>
        <div class="aside-item-box">
          <p>
            <el-checkbox
              :true-label="1"
              :false-label="0"
              @change="setTemplateDesign({ head: param })"
              v-model="param.moneyConvert"
              >显示货币转换</el-checkbox
            >
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { commonMixin } from "@/mixins";
import {mapState, mapMutations, mapActions} from 'vuex'
import {get} from '@/api/yxStoreMenubar'
import { isJSON, isEmpty } from "@/utils/index";
import Markdown from './Markdown'
import uploadImg from '@/components/uploadImg'
import { EventBus } from "@/utils/event-bus"

export default {
  mixins: [commonMixin],
  props: ["list", "type", "moduleId"],
  inject:['decorationForm'],
  components: { Markdown, uploadImg },
  data() {
    return {
      tableData: [],
      isTitleFirst: true,
      isLogoUrlFirst: true,
      linkTitle: "选择需要跳转的链接",
    };
  },
  watch:{
      'param.title':function(title){
        if(!this.isTitleFirst && isJSON(title)) this.setTemplateDesign({head:this.param})
        if(this.isTitleFirst) this.isTitleFirst=false
      },
      'param.logoUrl':function(val){
        if(!this.isLogoUrlFirst && !isEmpty(val)) this.setTemplateDesign({head:this.param})
        if(this.isLogoUrlFirst) this.isLogoUrlFirst=false
      },
      'param.linkTitle':function(val){
        if(!isEmpty(val)) {
          this.linkTitle = val;
        }
      }
    },
  computed: {
    ...mapState("head", ["param"]),
  },
  methods: {
    ...mapActions(['setTemplateDesign']),
      init: function () {
        let par = {
            page: 0,
            size: 20,
        };
        get(par).then((res) => {
            let {content} = res
            this.tableData = content||[];
        })
      },
      selectJumpLink() {
      EventBus.$emit('selectLink');
    }
  },
  created() {
    this.init();
    if(this.param.linkTitle) {
      this.linkTitle = this.param.linkTitle;
    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>