<template>
  <div class="container">
    <h1>追踪设置</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- Facebook Pixel -->
          <div class="box">
            <h3 class="title">
              Facebook Pixel
              <span class="subTitle"
                >可通过追踪您的店铺数据，为您找到最精准的客户进行营销</span
              >
              <h6 style="display:inline-block;margin-left:10px">(回车键添加)</h6>
            </h3> 
            <div class="detail">
              <el-tag
                :key="index"
                v-for="(tag, index) in tagList"
                closable
                @close="CloseTag(tag, index)"
                >{{ tag }}</el-tag
              >
              <el-input
                class="input-new-tag"
                v-model="facebookPixel"
                ref="saveTagInput"
                size="medium"
                placeholder="请输入Facebook Pixel ID （按回车键添加）"
                @keyup.enter.native="InputConfirm(index)"
                @blur="facebookPixel = ''"
              ></el-input>
            </div>
          </div>
          <!-- Snap Pixel -->
          <div class="box">
            <h3 class="title">
              Snap Pixel
              <span class="subTitle"
                >可通过追踪您的店铺数据，为您找到最精准的客户进行营销</span
              >
            </h3>
            <div>
              <el-input
                v-model="detail.snapPixel"
                size="medium"
                maxlength="100"
                placeholder="请将您的Snap Pixel ID粘贴至此处"
              ></el-input>
            </div>
          </div>
          <!-- Pinterest Pixel -->
          <div class="box">
            <h3 class="title">
              Pinterest Pixel
              <span class="subTitle"
                >可通过追踪您的店铺数据，为您找到最精准的客户进行营销</span
              >
            </h3>
            <div>
              <el-input
                v-model="detail.pinterestPixel"
                size="medium"
                maxlength="100"
                placeholder="请将您的插件代码粘贴至此处"
              ></el-input>
            </div>
          </div>
          <!-- Bing Ads UET标签 -->
          <div class="box">
            <h3 class="title">
              Bing Ads UET标签
              <span class="subTitle"
                >可通过追踪您的店铺数据，为您找到最精准的客户进行营销</span
              >
            </h3>
            <div>
              <el-input
                v-model="detail.bingAdsUet"
                size="medium"
                maxlength="100"
                placeholder="请将您的插件代码粘贴至此处"
              ></el-input>
            </div>
          </div>
          <!-- Google Analytics -->
          <div class="box">
            <h3 class="title">
              Google Analytics
              <span class="subTitle"
                >可协助您追踪店铺访客的行为，辅助您更好的进行营销</span
              >
            </h3>
            <div>
              <el-input
                v-model="detail.googleAnalytics"
                size="medium"
                maxlength="100"
                placeholder="请将您的谷歌跟踪ID粘贴至此处"
              ></el-input>
            </div>
          </div>
          <!-- Google Ads -->
          <div class="box">
            <h3 class="title">
              Google Ads
              <span class="subTitle"
                >可为您揭示客户在点击您的广告后所进行的操作，并以此作为优化广告投放的依据</span
              >
            </h3>
            <div>
              <el-input
                v-model="detail.googleAds"
                type="textarea"
                size="medium"
                maxlength="100"
                :rows="5"
                placeholder="请将您的跟踪代码粘贴至此处，如“AW-760477085/WHRiCPm7gpYBEJ3rz-oC”"
              ></el-input>
            </div>
          </div>
          <!-- TikTok Ads -->
          <div class="box">
            <h3 class="title">
              TikTok Ads
              <span class="subTitle"
                >可通过追踪您的店铺数据，为您找到最精准的客户进行营销</span
              >
            </h3>
            <div>
              <el-input
                v-model="detail.tiktokAds"
                type="textarea"
                size="medium"
                maxlength="100"
                :rows="5"
                placeholder="请将您的插件代码粘贴至此处"
              ></el-input>
            </div>
          </div>
          <!-- 网站归属认证  -->
          <div class="box">
            <h3 class="title">
              网站归属认证
              <span class="subTitle"
                >可通过追踪您的店铺数据，为您找到最精准的客户进行营销</span
              >
            </h3>
            <div>
              <el-input
                v-model="detail.wac"
                type="textarea"
                size="medium"
                maxlength="100"
                :rows="6"
                placeholder="请输入网站归属认证代码，每段之间建议换行输入。
如<meta name='google-site-verification' content='ABCDEFGH'/>"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">1、放置过多的代码，可能会影响网站加载速</p>
            <p class="infoContent" style="margin-top: 12px">
              2、放置跟踪代码后，建议观察网站浏览是否正常，如有问题，请联系我们。
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
    </div>
  </div>
</template> 
<script>
import { get, edit, add } from "@/api/yxSystemStoreTrack";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isAdd: true,
      tagList: [],
      facebookPixel: "",
      detail: {},
    };
  },
  created() {
    let par = {
      page: 0,
      size: 10,
    };
    get(par).then((res) => { 
      if (res.content.length > 0) {
        this.isAdd = false; 
        if(res.content[0].facebookPixel.split(',')[0] !== ''){
          this.tagList = res.content[0].facebookPixel.split(',')
        }
        this.detail = res.content[0];
      } 
    });
  },
  methods: {
    ...mapMutations(["isRefresh"]),
    CloseTag: function (item, index) { 
      this.tagList.splice(index,1)
    },
    InputConfirm: function (e) { 
      if(this.facebookPixel.trim()){
        this.tagList.push(this.facebookPixel);
      } 
      this.facebookPixel = "";
    },
    Save: function () {
      this.detail.facebookPixel = this.tagList.toString();
      if (this.isAdd) { 
        add(this.detail).then((res) => {
          this.isRefresh(true)
          this.$message.success("新增成功");
        });
      } else {
        edit(this.detail).then((res) => {
          this.isRefresh(true)
          this.$message.success("修改成功");
        });
      }
    },
  },
  updated() {
    console.log("更新");
    this.save = false;
  },
};
</script>
<style lang="scss" scoped>
h1 {
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.box {
  margin-bottom: 20px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
  & > .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    .subTitle {
      font-size: 12px;
      color: #52576c;
      padding-left: 6px;
      font-weight: 400;
    }
  }
  & > .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
  }
}
.detail {
  display: flex;
  flex: 1; 
  flex-wrap: wrap;
  align-items: center;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  font-size: inherit;
  line-height: 36px;
  outline: 0;
  padding: 0 5px; 
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  /deep/.input-new-tag {
    min-width: 200px;
    flex: 1;
  }
  /deep/ .el-input__inner {
    border: 0;
    height: 34px;
  }
  /deep/ .el-tag {
    margin-right: 5px;
    margin-top: 3px;
  }
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
</style>  