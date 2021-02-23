<template>
  <div class="container">
    <h1>店铺装修</h1>
    <!-- 店铺装修模块 -->
    <div class="overview padding-20">
      <div class="left-box">
        <div>
          <img
            class="img-size0"
            src="@/static/Cards _ Desktop _ 01 Card header@2x.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div class="center-box">
        <p class="title">挑选合适你的模版</p>
        <p class="desc">无需代码，轻松上手。</p>
      </div>
      <div class="right-box">
        <el-button @click="$NavgitorTo('/themeShop')">前往商城列表</el-button>
      </div>
    </div>
    
    <!-- 已发布模板 -->
    <div>
      <h1 class="margin-bottom-12">已发布模版</h1>
      <div class="overview padding-bottom-0">
        <div class="flex-1">
          <h3 class="sub-title">{{ publishedForm.name }}</h3>
          <p class="sub-info">
            {{ publishedForm.updateTime | dataFormat }}
            <span>模版ID：{{ publishedForm.id }}</span>
          </p>
          <div class="img1-box">
            <img class="img-size1" :src="publishedForm.pcImage" alt="" />
            <img class="mob" :src="publishedForm.mobileImage" alt="" />
            <img class="phone" src="@/static/phone.png" alt="" />
          </div>
        </div>
        <div class="operate-box">
          <div class="one-row">
            <div class="vertical-center margin-right-20">
              <img
                @mouseover="isHover = true"
                @mouseleave="isHover = false"
                class="qr-icon"
                src="../../static/icon-code.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="qrcode-img" v-show="isHover">
              <vue-qr
                :logo-src="logoSrc"
                :size="150"
                :margin="0"
                :auto-color="true"
                :dot-scale="1"
                :text="publishedForm.mobileLink || defaultUrl"
              />
              <p class="desc">扫描二维码查看移动端效果</p>
            </div>
            <div class="vertical-center">
              <el-dropdown @command="toOperate">
                <el-button>
                  操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button> 
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in $enums.operateList()"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :command="{ type: item.value, params: publishedForm }"
                    >{{ item.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="vertical-center margin-left-20">
              <el-button type="primary" @click="editTemplate(publishedForm)">编辑</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模版列表 -->
    <div class="infinite-list-wrapper">
      <div>
        <div class="inline-block"><h1>模版列表</h1></div>
        <el-select
          class="float-right"
          v-model="typeValue"
          placeholder="请选择"
          @change="filterTemplate"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <ul
        class="temlist"
        v-infinite-scroll="load"
        infinite-scroll-disabled="isDisabled"
      >
        <li class="item" v-for="item in templateList" :key="item.id">
          <div class="header">
            <div class="left">
              <h3 class="sub-title2">{{ item.name }}</h3>
              <p class="sub-info">
                {{ item.updateTime | dataFormat
                }}<span>模版ID：{{ item.id }}</span>
              </p>
            </div>
            <div class="right">
              <el-dropdown
                split-button
                trigger="click"
                @click="editTemplate(item)"
                @command="changeOperateType"
              >
                编辑
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item2 in $enums.operateList2()"
                    :key="item2.value"
                    :label="item2.label"
                    :value="item2.value"
                    :command="{ type: item2.value, params: item }"
                    >{{ item2.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="content">
            <!-- <img :src="item.pcImage" alt="" /> -->
            <img class="img-1" :src="item.pcImage || defaultPCImg" alt="" />
            <img class="img-2" :src="item.mobileImage || defaultMImg" alt="" />
            <img class="img-3" src="@/static/phone.png" alt="" />
          </div>
        </li>
      </ul>
      <p v-if="loading" class="loading">加载中...</p>
      <p v-if="noMore" class="no-more">--没有更多了--</p>
    </div>

    <!-- 创建副本--弹框 -->
    <default-dialog :visible.sync="showDialog0" @toConfirm="createCopy">
      <div class="dialog-content">
        <span><img src="@/static/i.png" alt="" /></span
        >此操作将创建一个副本，是否继续？
      </div>
    </default-dialog>
    <!-- 发布--弹框 -->
    <default-dialog :visible.sync="showDialog1" @toConfirm="toPublish">
      <div class="dialog-content">
        <span><img src="@/static/yellow-i.png" alt="" /></span
        >此操作将设置该模板为默认项，是否继续？
      </div>
    </default-dialog>
    <!-- 删除--弹框 -->
    <default-dialog :visible.sync="showDialog2" @toConfirm="toDelete">
      <div class="dialog-content">
        <span><img src="@/static/yellow-i.png" alt="" /></span
        >此操作将永久删除该模版, 是否继续?
      </div>
    </default-dialog>
    <!-- 重命名--弹框 -->
    <default-dialog
      :visible.sync="showDialog3"
      title="提示"
      @toConfirm="toRename"
    >
      <el-form>
        <el-form-item label="请输入新名称">
          <el-input v-model="rename"></el-input>
        </el-form-item>
      </el-form>
    </default-dialog>
    <!-- 更换语言--弹框 -->
    <default-dialog
      :visible.sync="showDialog4"
      title="更换店铺语言"
      @toConfirm="toChangeLang"
    >
      <el-row>
        <el-col :span="24">
          <el-select v-model="langValue" @change="filterLanguage">
            <el-option
              v-for="langItem in $enums.langList()"
              :key="langItem.value"
              :label="langItem.label"
              :value="langItem.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </default-dialog>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import {
  getPublished,
  queryPage,
  deleteAll,
  yxStoreTemplate,
  rename,
  publish,
} from "@/api/yxStoreDecoration.js";
import defaultDialog from "@/components/defaultDialog.vue";

//在需要生成二维码的文件中引入比如qrCode.vue
import VueQr from "vue-qr";
const storeId = localStorage.getItem("storeId");
export default {
  name: "DecorationManage",
  mixins: [commonMixin],
  inject: ["reload"],
  components: {
    VueQr,
    defaultDialog,
  },
  data() {
    return {
      operateValue: "操作",
      typeValue: null,
      typeList: [
        {
          label: "显示全部模版",
          value: null,
        },
        {
          label: "只显示通用模版",
          value: 1,
        },
        {
          label: "只显示专属模版",
          value: 2,
        },
      ],
      logoSrc: require("@/static/icon-code.png"),
      isHover: false,
      templateList: [
        /* {
          id: 141974205,
          name: "多品综合站-默认",
          updateTime: "2021/01/07 15:52:14",
          pcImage: require("@/static/pc-img.png"),
          isCopy: 0,
        },
        {
          id: 141900339,
          name: "多品综合站-暗红",
          updateTime: "2021/01/07 15:52:14",
          pcImage: "../../static/2-2.png",
          isCopy: 0,
        },
        {
          id: 141878948,
          name: "多品综合站-暗红",
          updateTime: "2021/01/07 15:52:14",
          pcImage: "../../static/2-2.png",
          isCopy: 1,
        },
        {
          id: 77759953,
          name: "多品综合站-暗红",
          updateTime: "2021/01/07 15:52:14",
          pcImage: "../../static/2-2.png",
          isCopy: 1,
        }, */
      ],
      count: 0, //起始页数值为0
      loading: false,
      totalPages: 0, //取后端返回内容的总页数
      size: 3, // 每页条数
      type: 0, // 模板类型
      /* list: [] //后端返回的数组 */
      showDialog0: false, // 是否显示创建副本提示框
      showDialog1: false, // 是否显示发布提示框
      showDialog2: false, // 是否显示删除提示框
      showDialog3: false, // 是否显示重命名提示框
      showDialog4: false, // 是否显示编辑语言提示框
      myForm: {},
      rename: "",
      defaultUrl: "https://www.xqkj.top/",
      publishedForm: {
        id: 71,
        name: "多品综合站-默认",
        updateTime: "2020-12-18 18:39:24",
        mobileLink: "https://www.xqkj.top/",
      }, // 已发布模板的信息
      langValue: "en",
      defaultPCImg: require("@/static/pc-default.png"),
      defaultMImg: require("@/static/m-default.png"),
    };
  },
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.count >= this.totalPages - 1;
    },
    isDisabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    handleRemove(file) {
      this.$refs.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    /* handleChange(file, fileList) {
      this.$refs.upload.clearFiles();
    }, */
    load() {
      this.loading = true;
      this.count += 1; //页数+1
      this.getTemplateList();
    },
    getTemplateList() {
      let that = this;
      let param = {
        page: that.count,
        size: that.size,
        type: that.typeValue,
        storeId: storeId,
      };
      queryPage(param)
        .then((res) => {
          if (res.data.content.length) {
            that.templateList = that.templateList.concat(res.data.content);
            that.totalPages =
              res.data.totalElements % that.size === 0
                ? res.data.totalElements / that.size
                : Math.ceil(res.data.totalElements / that.size);
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    toOperate(e) {
      this.myForm = {};
      this.myForm = e.params;
      switch (e.type) {
        case "onlineStore":
          // 线上店铺
          break;
        case "editLanguage":
          // 编辑语言
          this.showDialog4 = true;
          break;
        case "rename":
          // 重命名
          this.showDialog3 = true;
          break;
        case "createCopy":
          // 创建副本
          this.showDialog0 = true;
          break;
      }
    },
    // 选择模版筛选
    filterTemplate(e) {
      let that = this;
      that.typeValue = e;
      that.count = 0;
      that.totalPages = 0;
      setTimeout(() => {
        that.templateList = [];
        that.getTemplateList();
      }, 1000);
    },
    // 选择语言
    filterLanguage(e) {
      this.langValue = e;
    },
    // 提交选择语言
    toChangeLang(e) {
      let that = this;
    },
    // 编辑模版
    editTemplate(item) {
      this.$router.push({path: '/decoration', query: {tempId: item.id, isPublished: item.status, isPreview: false}});
    },
    // 其他操作，比如预览，发布，删除，重命名，创建副本
    changeOperateType(item) {
      this.myForm = {};
      this.myForm = item.params;
      switch (item.type) {
        case "preview":
          // 预览
          this.$router.push({path: '/decoration', query:{tempId: item.params.id, isPublished: item.status, isPreview: true}});
          break;
        case "release":
          // 发布
          this.showDialog1 = true;
          break;
        case "delete":
          // 删除
          this.showDialog2 = true;
          break;
        case "rename":
          // 重命名
          this.showDialog3 = true;
          break;
        case "createCopy":
          // 创建副本
          this.showDialog0 = true;
          break;
      }
    },
    // 获取已发布模版
    getPublishedTemplate() {
      let that = this;
      let params = {
        storeId: parseInt(storeId),
      };
      getPublished(params)
        .then((res) => {
          this.publishedForm = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 创建副本
    createCopy() {
      let that = this;
      that.showDialog0 = false;
      let params = that.myForm;
      yxStoreTemplate(params)
        .then((res) => {
          if (res) {
            that.$message.success("检测到当前域名为");
            that.reload(); // 调用注入的刷新方法
          }
        })
        .catch((error) => {});
    },
    // 发布
    toPublish() {
      let that = this;
      that.showDialog1 = false;
      let params = {
        storeId: storeId,
        templateId: that.myForm.id,
      };
      publish(params)
        .then((res) => {
          if (res.data.status === 200) {
            that.$message.success(res.data.msg);
            that.reload();
          }
        })
        .catch((error) => {});
    },
    // 删除
    toDelete() {
      let that = this;
      that.showDialog2 = false;
      deleteAll([that.myForm.id])
        .then((res) => {
          that.$message.success("删除成功！");
          that.reload(); // 调用注入的刷新方法
        })
        .catch((error) => {
          that.$message.success(error);
        });
    },
    // 重命名
    toRename() {
      let that = this;
      let param = {
        storeId: storeId,
        id: that.myForm.id,
        name: that.rename,
      };
      rename(param)
        .then((res) => {
          if (res.data.status == 200) {
            that.$message.success(res.data.msg);
            that.showDialog3 = false;
            that.reload(); // 调用注入的刷新方法
          }
        })
        .catch((error) => {
          that.$message.error(error);
        });
    },
  },
  created() {
    this.getPublishedTemplate();
    this.getTemplateList();
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  flex: 1;
}
.sub-title {
  color: #1a1d2c;
  margin-bottom: 8px;
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
}
.sub-info {
  font-size: 14px;
  color: #5e7185;
  margin-bottom: 20px;
  span {
    margin-left: 20px;
  }
}
.img-size0 {
  width: 150px;
  height: 108px;
}
.margin-right-20 {
  margin-right: 20px;
}
.margin-left-20 {
  margin-left: 20px;
}
.flex-1 {
  flex: 1;
  padding-right: 30px;
}
.operate-box {
  margin-left: 10px;
}
.qr-icon {
  cursor: pointer;
}
.qrcode-img {
  position: absolute;
  left: 0;
  top: 50px;
  padding: 12px;
  background: #fff;
  -webkit-box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  border-radius: 4px;
  z-index: 999;

  .desc {
    padding: 10px 0 0;
    font-size: 12px;
    font-weight: 400;
    color: #6b6d71;
    line-height: 14px;
    text-align: center;
  }
}

.img-size1 {
  width: 700px;
  border: 1px solid #ebecf3;
  border-bottom: none;
  -webkit-box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  top: 0;
}
.img1-box {
  position: relative;
  font-size: 0;
  overflow: hidden;
  height: 394px;
}
.img-1 {
  border: 1px solid #ebecf3;
  border-bottom: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 300px;
  height: 200px;
  -webkit-box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.img-2 {
  border: 1px solid #ebecf3;
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  width: 89px;
  position: absolute;
  right: 2.8%;
  top: 46%;
  z-index: 2;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.img-3 {
  width: 31%;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.padding-20 {
  padding: 20px;
}
.padding-bottom-0 {
  padding: 20px 20px 0;
}
.overview {
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.12),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  border-radius: 4px;
  background: #fff;
  // padding: 20px;
  flex: 0 0 210px;
  position: relative;
  display: flex;
  margin-bottom: 20px;
}
.margin-bottom-12 {
  margin-bottom: 12px;
}
.center-box {
  flex: 1;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  padding-left: 7px;
  .title {
    margin: 10px 0 12px;
    color: #1a1d2c;
    font-size: 16px;
  }
  .desc {
    color: #5e7185;
    font-size: 14px;
  }
}
.one-row {
  display: flex;
  position: relative;
}
.vertical-center {
  display: flex;
  align-items: center;
}
.mob {
  border: 1px solid #ebecf3;
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  width: 202px;
  position: absolute;
  right: 2.2%;
  top: 140px;
  z-index: 2;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.phone {
  width: 235px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.inline-block {
  display: inline-block;
}
.float-right {
  float: right;
}
.temlist {
  padding: 0;
  word-break: break-word;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
  .item {
    // border-bottom: none;
    padding: 10px 10px 20px 10px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 33.33333333%;
    flex: 0 0 33.33333333%;
    border-right: 1px solid #f3f3f3;
    background: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    &:nth-child(n) {
      border-bottom: 1px solid #f3f3f3;
    }
    &:nth-child(3n) {
      border-right: none;
    }
  }
}
.item .header {
  margin: 10px 0 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  .left {
    flex: 1;
  }
  .sub-title2 {
    font-size: 14px;
    font-weight: 400;
    width: 240px;
    width: 100%;
    color: #1a1d2c;
    margin-bottom: 4px;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p {
    font-size: 12px;
    color: #5e7185;
  }
}
.content {
  margin-bottom: 20px;
  position: relative;
  padding-right: 5%;
  font-size: 0;
  overflow: hidden;
}
#decoration_qrcode {
  display: inline-block;
  img {
    width: 150px;
    height: 150px;
    background-color: #fff; //设置白色背景色
    padding: 6px; // 利用padding的特性，挤出白边
  }
}
.loading {
  color: #7dbcfc;
  text-align: center;
}
.no-more {
  color: #999999;
  text-align: center;
}
.dialog-content {
  span {
    vertical-align: middle;
    margin-right: 8px;
  }
}
</style>
