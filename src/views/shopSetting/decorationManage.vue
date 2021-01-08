<template>
  <div class="container">
    <h1>店铺装修</h1>
    <!-- 店铺装修模块 -->
    <div class="overview padding-20">
      <div class="left-box">
        <div>
          <img
            class="img-size0"
            src="../../static/Cards _ Desktop _ 01 Card header@2x.png"
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
          <h3 class="sub-title">多品综合站-默认</h3>
          <p class="sub-info">
            2020/12/18 18:39:24 <span>模版ID：77759953</span>
          </p>
          <div class="img1-box">
            <img
              class="img-size1"
              src="https://cdn.xshoppy.shop/uploader/bc17651a9f509036d3ebda2cf5abddd21f0d9975.jpg?x-oss-process=image/format,webp"
              alt=""
            />
            <img
              class="mob"
              src="https://cdn.xshoppy.shop/uploader/0848ee394c1be8b8ed9eadb8de16ea994465e5b8.jpg?x-oss-process=image/format,webp"
              alt=""
            />
            <img class="phone" src="../../static/phone_2x.png" alt="" />
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
                :text="appSrc"
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
                    v-for="item in operateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :command="item.value"
                    >{{ item.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="vertical-center margin-left-20">
              <el-button type="primary">编辑</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模版列表 -->
    <!-- <div>
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
      <div class="temlist">
        <div class="item" v-for="item in templateList" :key="item.id">
          <div class="header">
            <div class="left">
              <h3 class="sub-title2">{{ item.title }}</h3>
              <p class="sub-info">
                {{ item.updateTime }}<span>模版ID：{{ item.id }}</span>
              </p>
            </div>
            <div class="right">
              <el-dropdown
                split-button
                trigger="click"
                @click="editTemplate(item.id)"
                @command="changeOperateType"
              >
                编辑
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in operateList2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :command="item.value"
                    >{{ item.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="content">
            <img src="../../static/2-2.png" alt="" />
            <img
              class="img-1"
              src="https://cdn.xshoppy.shop/uploader/b42ddc9265a67f66e9bfd539e941b18d8b0c5381.jpg?x-oss-process=image/format,webp"
              alt=""
            />
            <img
              class="img-2"
              src="https://cdn.xshoppy.shop/uploader/3f1e1e57a367b70ba98cbf692bed1d3c662414c8.jpg?x-oss-process=image/format,webp"
              alt=""
            />
            <img class="img-3" src="../../static/phone.png" alt="" />
          </div>
        </div>
      </div>
    </div> -->

    <!-- test -->
    <div class="infinite-list-wrapper">
      <ul
        class="temlist"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
      >
        <li class="item" v-for="item in templateList" :key="item.id">
          <div class="header">
            <div class="left">
              <h3 class="sub-title2">{{ item.name }}</h3>
              <p class="sub-info">
                {{ item.updateTime }}<span>模版ID：{{ item.id }}</span>
              </p>
            </div>
            <div class="right">
              <el-dropdown
                split-button
                trigger="click"
                @click="editTemplate(item.id)"
                @command="changeOperateType"
              >
                编辑
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in operateList2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :command="item.value"
                    >{{ item.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="content">
            <img :src="item.pcImage" alt="" />
          </div>
        </li>
      </ul>
      <p v-if="loading" class="loading">加载中...</p>
      <p v-if="noMore" class="no-more">--没有更多了--</p>
    </div>

    <default-dialog :show.sync="showDialog">
      <div class="dialog-content"><span><img src="../../static/i.png" alt=""></span>此操作将创建一个副本，是否继续？</div>
    </default-dialog>
  </div>
</template>
<script>

import { getCodeURL, queryPage } from "@/api/yxStoreDecoration.js";
import defaultDialog from "@/components/defaultDialog.vue"

//在需要生成二维码的文件中引入比如qrCode.vue
import VueQr from "vue-qr";
export default {
  name: "DecorationManage",
  components: {
    VueQr,
    defaultDialog
  },
  data() {
    return {
      operateValue: "操作",
      operateList: [
        {
          label: "线上店铺",
          value: "onlineStore",
        },
        {
          label: "编辑语言",
          value: "editLanguage",
        },
        {
          label: "重命名",
          value: "rename",
        },
        {
          label: "创建副本",
          value: "createCopy",
        },
      ],
      operateList2: [
        {
          label: "预览",
          value: "preview",
        },
        {
          label: "发布",
          value: "release",
        },
        {
          label: "删除",
          value: "delete",
        },
        {
          label: "重命名",
          value: "rename",
        },
        {
          label: "创建副本",
          value: "createCopy",
        },
      ],
      typeValue: "0",
      typeList: [
        {
          label: "显示全部模版",
          value: "0",
        },
        {
          label: "只显示通用模版",
          value: "1",
        },
        {
          label: "只显示专属模版",
          value: "2",
        },
      ],
      logoSrc: require("@/static/icon-code.png"),
      appSrc: "http://www.baidu.com",
      isHover: false,
      templateList: [
        /* {
          id: 141974205,
          name: "多品综合站-默认",
          updateTime: "2021/01/07 15:52:14",
          pcImage: "../../static/2-2.png",
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
      count: 0,//起始页数值为0
      loading: false,
      totalPages: 0,//取后端返回内容的总页数
      size: 3,// 每页条数
      type: null, // 模板类型
      /* list: [] //后端返回的数组 */
      showDialog: false,
    };
  },
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.count >= this.totalPages-1;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    load() {
      this.loading = true;
      this.count += 1; //页数+1
      this.getTemplateList();
    },
    getTemplateList() {
      let that = this;
      const storeId = localStorage.getItem('storeId');
      let param = {
        page: that.totalPages,
        size: that.size,
        type: that.type,
        storeId: storeId,
      }
      /* this.templateList = this.templateList.concat(this.templateList); */
      
      queryPage(param).then(res => {
        that.templateList = that.templateList.concat(res.content);
        that.totalPages = Math.ceil(res.totalElements/that.size);
      }).catch(error => {

      })
      /* this.templateList = this.templateList.concat(this.templateList); */
      this.loading = false;
    },
    toOperate(e) {
      switch (e) {
        case "onlineStore":
          // 线上店铺
          break;
        case "editLanguage":
          // 编辑语言
          break;
        case "rename":
          // 重命名
          break;
        case "createCopy":
          // 创建副本
          break;
      }
    },
    // 选择模版筛选
    filterTemplate(e) {},
    // 编辑模版
    editTemplate(id) {
      console.log("当前操作模块的内容：", id);
    },
    // 其他操作，比如预览，发布，删除，重命名，创建副本
    changeOperateType(operate) {
      console.log("操作类型：：：：", operate);
      switch (operate) {
        case "preview":
          // 预览
          break;
        case "release":
          // 发布
          break;
        case "delete":
          // 删除
          break;
        case "rename":
          // 重命名
          break;
        case "createCopy":
          // 创建副本
          this.showDialog = true;
          console.log(this.showDialog);
          break;
      }
    },
    // 获取二维码地址
    getQRCodeURL() {
      /* let param = {};
      getCodeURL(param)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        }); */
    },
    /* async getQRCodeURL(text) {
      return QRCode.toDataURL(text);
    }, */
  },
  created() {
    this.getQRCodeURL();
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
/* .img-1 {
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
} */
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
  img {
    width: 354px;
  }
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
