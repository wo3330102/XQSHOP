<template>
  <el-container style="height: 100%">
    <!-- 头部 -->
    <el-header v-show="isHeader">
      <div class="header">
        <div class="header-left">
          <div><img class="img-logo" src="@/static/logo.png" alt="" /></div>
          <el-dropdown class="setting-box" trigger="click" @command="toSet">
            <span class="el-dropdown-link">
              设置<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="setItem in $enums.setList()"
                :key="setItem.value"
                :value="setItem.value"
                :command="{ type: setItem.value, paramValues: tempForm }"
                >{{ setItem.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="header-main">
          <!-- 头部三个图标 -->
          <div v-for="(itemIcon, index) in iconList" :key="itemIcon.value" class="icon-block" :class="selected==index?'orange-bottom':''">
            <i :class="[selected==index? 'blue-color': '',itemIcon.label]" @click="changePlatform(index)"></i>
          </div>
        </div>
        <div class="header-right">
          <el-button :disabled="isPublished == 0 ? false : true">{{
            isPublished == 0 ? "发布" : "已发布"
          }}</el-button>
          <el-button type="primary" @click="templateSaveFun">保存</el-button>
        </div>
      </div>
    </el-header>
    <!-- 中心 -->
    <el-container>
      <!-- 左边模块 -->
      <el-aside class="left-bar" v-show="isLeftBar">
        <div class="left">
          <ul class="aside-main">
            <li class="page-title">
              <div class="">
                <span>页面</span>
              </div>
              <div class="right-icon">
                <i
                  class="iconfont iconbianji"
                  id="iconbianji"
                  @click="toPageManage"
                ></i>
              </div>
            </li>
            <li>
              <!-- 设置当前可操作页面 -->
              <el-select
                class="page-select"
                v-model="selePage"
                @change="pageChange"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $enums.pages()"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </li>
            <li class="page-title" v-if="arrType.length > 0">
              <div class="aside-left">
                <span>模块</span>
              </div>
            </li>
            <li v-else class="page-title">
              <div style="text-align: center">没有可编辑模块</div>
            </li>
            <li
              v-for="(item, index) in arrType"
              :key="index"
              :class="{
                'aside-list-show':
                  item.type !== 0 && item.type !== 8 && selePage === 'home',
                active: item.id === moduleId,
              }"
              @click="getCompType(item)"
            >
              <div class="aside-list-left">
                <i class="iconfont icondraggable"></i>
                <span>{{ item.name }}</span>
              </div>
              <div class="aside-list-right">
                <!-- v-if="item.isEdit" -->
                <!-- 判断当前是否可编辑当前模块 -->
                <i
                  class="iconfont iconyincang"
                  v-if="!item.isShow"
                  @click="showModule(item)"
                ></i>
                <el-dropdown @command="handleCommand" trigger="click" v-else>
                  <i class="iconfont iconshezhi"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="'rename-' + item.id"
                      >重命名</el-dropdown-item
                    >
                    <el-dropdown-item :command="'clone-' + item.id"
                      >复制</el-dropdown-item
                    >
                    <el-dropdown-item :command="'hide-' + item.id"
                      >隐藏</el-dropdown-item
                    >
                    <el-dropdown-item :command="'del-' + item.id"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </li>
          </ul>
          <!-- 是否显示“添加模块”（只有首页才能有此选项） -->
          <div
            class="add-page"
            v-show="selePage === 'home'"
            @click="isDrag = !isDrag"
          >
            <i class="el-icon-circle-plus-outline"></i>添加模块
          </div>
          <div class="add-module" v-show="isDrag">
            <!-- 展示当前可添加模块列表 -->
            <div
              class="add-module-list"
              v-for="(item, index) in $enums.addModule()"
              :key="index"
            >
              <h2>{{ item.label }}</h2>
              <div class="add-module-list-box" @click="addMofuleFun(item)">
                <img
                  src="https://tingdng.xshoppy.shop/static/img/decoration/model/banner.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <!-- 中间展示页面 -->
      <el-main :class="selected==0?'main-box-m':''">
        <div class="main" :class="selected==0? 'platform-m': 'platform-pc'">
          <mainComponents />
        </div>
      </el-main>
      <!-- 右边 -->
      <el-aside class="right-bar" v-show="isRightBar">
        <markdownComponents />
      </el-aside>
    </el-container>
    <el-dialog title="重命名提示" :visible.sync="dialogVisible" width="30%">
      <div class="rename">
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置颜色--弹框 -->
    <default-dialog
      :visible.sync="showColorDialog"
      title="颜色"
      @toConfirm="toSetColor"
    >
      <el-form>
        <el-form-item label="文本"> </el-form-item>
      </el-form>
    </default-dialog>
    <!-- 设置链接--弹框 -->
    <default-dialog
      :visible.sync="showLinkDialog"
      title="设置链接"
      setWidth="640px"
      @toConfirm="toSetLink"
    >
      <el-form>
        <el-form-item label="选择页面">
          <el-input v-model="originalTitle" placeholder="选择页面"></el-input>
        </el-form-item>
        <el-tabs
          v-model="activeName"
          tab-position="left"
          class="tab-box"
          @tab-click="changeTab"
        >
          <el-tab-pane
            :label="pageItem.label"
            :name="pageItem.value"
            v-for="pageItem in $enums.pageList()"
            :key="pageItem.value"
          >
            <div
              v-if="
                pageItem.value === 'classifyPage' ||
                pageItem.value === 'goodsDetailPage' ||
                pageItem.value === 'customPage'
              "
            >
              <el-table
                ref="singleTable"
                :data="tableData"
                tooltip-effect="dark"
                :show-header="false"
                id="link-table"
              >
                <el-table-column width="55">
                  <template slot-scope="scope">
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox
                        :label="scope.row.id"
                        @change="
                          checkBoxChange(scope.row.id, scope.row)
                        "
                        >&nbsp;</el-checkbox
                      >
                    </el-checkbox-group>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <img
                      :src="scope.row.imageUrl || defaultPic"
                      class="head_pic"
                    />
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="custom-link" v-if="pageItem.value === 'customLink'">
              <el-input
                placeholder="https://www.xqkj.top"
                v-model="customlink"
              ></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="page-name" for="">
          页面名称<span>(名称给客户展示,建议使用英文)</span>
        </div>
        <el-input
          v-model="linkTitle"
          placeholder="Announce something here"
        ></el-input>
      </el-form>
    </default-dialog>
  </el-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import mainComponents from "./components/index";
import markdownComponents from "./markdown/index";
import DefaultDialog from "@/components/defaultDialog.vue";
import { EventBus } from "@/utils/event-bus";
import {
  getModuleListById,
  addModule,
  delModule,
  copyModule,
  updateModule,
  templateSave,
  jumpLink,
} from "@/api/decoration";
const storeId = Number(localStorage.getItem("storeId"));
export default {
  components: { mainComponents, markdownComponents, DefaultDialog },
  provide() {
    return {
      decorationForm: {},
    };
  },
  computed: {
    ...mapState(["tempId", "type", "moduleId"]),
    ...mapState("head", ["param"]),
  },
  data() {
    return {
      name: "",
      arrType: [],
      dialogVisible: false,
      selePage: "home",
      isDrag: false,
      paramValue: null,
      isPublished: 0, // 是否已发布，默认否
      showColorDialog: false,
      showLinkDialog: false,
      tempForm: {},
      tableData: [
        {
          id: 26,
          image: "",
          storeName: "测试",
        },
      ],
      defaultPic: require("@/static/defaultPic.png"),
      checkList: [],
      originalTitle: "",
      link: "",
      linkTitle: "",
      linkType: null,
      linkName: "",
      customlink: "",
      activeName: "",
      linkIndex: null,
      iconList: [
        {
          value: "0",
          label: "el-icon-mobile-phone",
        },
        {
          value: "1",
          label: "el-icon-s-platform"
        },
        {
          value: "2",
          label: "el-icon-s-operation"
        }
      ],
      selected: "1",
      isHeader: true,
      isLeftBar: true,
      isRightBar: true,
      isPreview: false, // 是否预览状态：是：true，否：false
    };
  },
  methods: {
    ...mapMutations(["setModuleId", "setTempId", "setType"]),
    ...mapMutations("head", ["setTemplateEdit"]),
    ...mapActions(["setTemplateDesign", "getTemplateQuery"]),
    templateSaveFun() {
      let { tempId } = this;
      templateSave({ tempId }).then((res) => {
        console.log(res);
      });
    },
    showModule(item) {
      this.paramValue = item;
      this.paramValue.isShow = 1;
      this.updateModuleFun();
    },
    handleClick() {
      this.paramValue.name = name;
      this.updateModuleFun();
    },
    updateModuleFun() {
      let { id, isShow, name } = this.paramValue;
      let moduleId = "";
      updateModule({ id, isShow, moduleId, name }).then((res) => {
        this.getModuleList();
        this.dialogVisible = false;
      });
    },
    // 操作当前模块（点击右边设置）
    handleCommand(command) {
      let type = command.split("-")[0];
      let moduleId = command.split("-")[1];
      switch (type) {
        case "rename":
          this.dialogVisible = true;
          break;
        case "clone":
          copyModule(moduleId).then((res) => {
            this.getModuleList();
          });
          break;
        case "hide":
          this.paramValue.isShow = 0;
          this.updateModuleFun();
          break;
        case "del":
          delModule(moduleId).then((res) => {
            this.getModuleList();
          });
          break;
      }
    },
    addMofuleFun(item) {
      addModule({ tempId: this.tempId, type: item.value }).then((res) => {
        this.getModuleList();
        this.isDrag = false;
      });
    },
    // 获取当前操作模块可配置数据
    getCompType(item) {  
      this.paramValue = item;
      this.name = item.name;
      let moduleId = item.id;
      let { type } = item;
      this.setModuleId(moduleId);
      this.setType(type);
      this.getTemplateQuery();
    },
    pageChange() {
      this.getModuleList();
    },
    // 根据当前选择页面获取可编辑模块列表
    getModuleList() {
      console.log(this.tempId,this.selePage)
      getModuleListById({ tempId: this.tempId, pageType: this.selePage }).then(
        (res) => { 
          let { data } = res; // data为可操作模块列表
          console.log(data);
          this.arrType = data || [];
          let paramValue = data[0]; // 默认当前可操作模块为返回列表第一条
          console.log(paramValue);
          this.name = paramValue.name;  // name是初始化当前重命名的默认名字
          let moduleId = paramValue.id; 
          let { type } = paramValue;  // paramValue是
          console.log(type);
          this.setModuleId(moduleId); // 在vuex中设置当前模块Id
          this.setType(type); // 设置当前编辑模块类型
          this.getTemplateQuery();  // 调用vuex中的action操作获取当前编辑模块类型数据
        }
      );
    },
    toPageManage() {
      window.open("/pageManage", "_blank");
    },
    // 左上角点击设置
    toSet(e) {
      this.tempForm = e.paramValues;
      console.log(e)
      switch (e.type) {
        case "color":
          // 颜色
          this.showColorDialog = true;
          break;
        case "font":
          // 字体选择
          break;
        case "icon":
          // 网站图标
          break;
        case "exit":
          // 退出
          break;
      }
    },
    // 设置颜色
    toSetColor() {
      this.showColorDialog = false;
    },
    // 设置链接
    toSetLink() {
      this.showLinkDialog = false;
      switch (this.linkName) {
        case "homePage":
          this.link = "##";
          break;
        case "searchPage":
          this.link = "##";
          break;
        case "customLink":
          this.link = this.customlink;
          break;
        case "policyClause":
          break;
      }
      this.setTemplateEdit({
        link: this.link,
        linkType: this.linkType,
        linkName: this.linkName,
        linkTitle: this.linkTitle,
        originalTitle: this.originalTitle,
        linkIndex: this.linkIndex,
      });
      this.setTemplateDesign({
        head: {
          link: this.link,
          linkType: this.linkType,
          linkName: this.linkName,
          linkTitle: this.linkTitle,
          originalTitle: this.originalTitle,
          linkIndex: this.linkIndex,
        },
      });
    },
    // 切换tab触发
    changeTab(tab) {
      this.originalTitle = "";
      this.linkTitle = "";
      this.tableData = [];
      this.linkName = tab.name;
      this.linkType = Number(tab.index) + 1;
      this.checkList = [];
      switch (tab.name) {
        case "homePage":
          this.originalTitle = tab.label;
          this.linkTitle = tab.label;
          break;
        case "searchPage":
          this.originalTitle = tab.label;
          this.linkTitle = tab.label;
          break;
        case "classifyPage":
          jumpLink(storeId).then((res) => {
            this.tableData = res.data.categories;
          });
          break;
        case "goodsDetailPage":
          jumpLink(storeId).then((res) => {
            this.tableData = res.data.products;
          });
          break;
        case "customPage":
          jumpLink(storeId).then((res) => {
            this.tableData = res.data.pageBoards;
          });
          break;
        case "customLink":
          this.originalTitle = tab.label;
          this.linkTitle = tab.label;
          break;
        case "policyClause":
          break;
      }
    },
    checkBoxChange(id, row) {
      if (this.checkList.length > 0) {
        if (this.checkList.indexOf(id) > -1) {
          this.checkList = [];
          this.checkList.push(id);
          this.linkIndex = id;
        }
        const env = process.env.VUE_APP_BASE_API;
        this.link = env + "/" + this.linkName + "/" + row.name;
        this.originalTitle = row.name;
        this.linkTitle = row.name;
      } else {
        this.link = "##";
        this.originalTitle = "";
        this.linkTitle = "";
        this.linkIndex = null;
      }
    },
    changePlatform(v) {
      this.selected = v;
      switch(Number(this.selected)) {
        case 0:
          this.isLeftBar = true;
          this.isRightBar = true;
        break;
        case 1:
          this.isLeftBar = true;
          this.isRightBar = true;
        break;
        case 2:
          this.isLeftBar = false;
          this.isRightBar = false;
        break;
      }
    },
    // 链接回显
    toEcho() {
      EventBus.$on("selectLink", (target) => {
        let _this = this;
        _this.showLinkDialog = true;
        _this.activeName = _this.param.linkName;
        _this.link = _this.param.link;
        _this.linkType = _this.param.linkType;
        _this.linkTitle = _this.param.linkTitle;
        _this.originalTitle = _this.param.originalTitle;
        _this.linkName = _this.param.linkName;
        _this.checkList = [Number(_this.param.linkIndex)];
        switch (_this.linkName) {
          case "classifyPage":
            jumpLink(storeId).then((res) => {
              _this.tableData = res.data.categories;
            });
            break;
          case "goodsDetailPage":
            jumpLink(storeId).then((res) => {
              _this.tableData = res.data.products;
            });
            break;
          case "customPage":
            jumpLink(storeId).then((res) => {
              _this.tableData = res.data.pageBoards;
            });
            break;
        }
      });
    }
  },
  created() {

    let { tempId } = this.$route.query;
    // 获取当前模版的发布状态isPublished：未发布：0，已发布：1
    // isPreview
    this.isPublished = this.$route.query.isPublished;
    this.isPreview = this.$route.query.isPreview;
    this.isHeader = !this.isPreview?false:true;
    this.isLeftBar = !this.isPreview?false:true;
    this.isRightBar = !this.isPreview?false:true;
    this.setTempId(Number(tempId));
    this.getModuleList();
  },
  mounted() {
    // 监听右侧子组件点击“链接”触发的方法，获取弹框数据进行赋值，用于回显
    this.toEcho();
  }
};
</script>
<style lang="scss" scoped>
@import url("./components/index.scss");
:focus {
  outline: none;
} /*for IE*/
::-moz-focus-inner {
  border-color: transparent;
} /*for mozilla*/
::-webkit-scrollbar {
  width: 6px;
  margin-right: 2px;
  background: #f5f5f9;
}
::-webkit-scrollbar-button {
  height: 0;
  width: 0;
  background-color: #eee;
}
::-webkit-scrollbar-track {
  background: #f5f5f9;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: #d5d5e6;
}
.img-logo {
  width: 60px;
  height: 60px;
}

.setting-box {
  width: 100%;
  padding: 0;
  text-align: center;
  cursor: pointer;
  height: 60px;
  line-height: 60px;
  background: #f5f5f9;
  outline: none;
}
.right-icon {
  margin-right: 10px;
}
#iconbianji {
  visibility: visible;
  font-size: 14px;
  cursor: pointer;
}
.rename {
  padding: 20px 50px;
}
.el-header {
  padding: 0;
  .header {
    z-index: 11;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    box-shadow: 0 1px 6px 0px rgba(0, 0, 0, 0.15);
    position: fixed;
    background: #fff;
    .header-left {
      box-sizing: border-box;
      width: 180px;
      height: 100%;
      display: flex;
    }
    .header-main {
      flex: 1;
      display: inline-block;
      line-height: 60px;
      text-align: center;
      cursor: pointer;
      i {
        font-size: 22px;
        margin: 0 8px;
      }
    }
    .header-right {
      width: 200px;
      padding-right: 10px;
      display: inline-block;
      line-height: 60px;
    }
  }
}
.el-main {
  height: 100%;
  padding: 20px;
  color: #333;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #f7f8fd;
}
.el-aside /deep/ .aside-right {
  position: fixed;
  overflow-x: hidden;
  height: auto;
  top: 60px;
  bottom: 0;
}
.el-aside /deep/ .aside-right::-webkit-scrollbar {
  display: none;
}
aside.el-aside.left-bar {
  width: 180px !important;
}
aside.el-aside.right-bar {
  // position: -webkit-sticky;
  // position: sticky;
  width: 240px !important;
}
.el-aside {
  .left {
    width: 180px;
    height: 100%;
    background-color: #f7f7f7;
    position: relative;
    color: #333;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.15);
    position: fixed;
    z-index: 11;
    .aside-main {
      width: 180px;
      li {
        cursor: pointer;
      }
    }
    .page-title {
      padding-top: 12px;
    }
    .page-title span {
      margin-left: 10px;
    }
    .page-select {
      border: 0 none;
      /deep/ .el-input__inner {
        border: 0 none;
      }
    }
    .aside-main li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      height: 40px;
      border-bottom: 1px solid #dcdfe6;
      i {
        visibility: hidden;
      }
    }
    .aside-main li.aside-list-show {
      .iconyincang {
        visibility: visible;
      }
    }
    .aside-main li.active {
      color: #273a8a;
      border-top: 1px solid #273a8a;
      border-bottom: 1px solid #273a8a;
    }
    .aside-main li.aside-list-show:hover {
      .iconshezhi {
        visibility: visible;
      }
    }
    .aside-left {
      display: flex;
      i {
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      span {
        line-height: 40px;
      }
    }
    .aside-list-right {
      margin-right: 10px;
    }
    .add-page {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 180px;
      height: 38px;
      text-align: center;
      line-height: 38px;
      color: #273a8a;
      border-top: 2px solid #dcdfe6;
      cursor: pointer;
      i {
        margin-right: 10px;
      }
    }
    .add-module {
      width: 220px;
      height: 100%;
      background: #fff;
      position: fixed;
      z-index: 11;
      left: 181px;
      top: 60px;
      overflow-y: scroll;
    }
    .add-module-list {
      padding: 20px 10px 0;
      h2 {
        padding-bottom: 8px;
        font-size: 14px;
        color: #2c3e50;
        font-weight: normal;
      }
      .add-module-list-box {
        height: 122px;
        border: 1px solid #dadde4;
      }
      .add-module-list-box:hover {
        border-color: #f49342;
      }
    }
  }
}
aside.el-aside.right-bar .right-bar {
  width: 240px;
  /* position: fixed; */
  float: right;
}

.tab-box {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  /deep/ .el-tabs__item {
    border-bottom: 1px solid #dcdfe6;
    height: 36px;
  }
  /deep/ .el-tabs__item.is-left {
    text-align: left;
  }
  /deep/ .el-tabs__nav-wrap.is-left::after {
    width: 1px;
  }
  /deep/ .el-tabs__active-bar.is-left {
    height: 0 !important;
  }
  /deep/ .el-tabs__item.is-active {
    background: #eef1ff;
  }
  /deep/ .el-tabs__header.is-left {
    height: 350px;
  }
  /deep/ .el-tabs__content {
    height: 350px;
    overflow: auto;
  }
}
.custom-link {
  padding: 10px 10px 10px 0;
}
.page-name {
  margin-bottom: 12px;
  color: #202b37;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  span {
    color: rgb(193, 194, 204);
    font-size: 12px;
  }
}
.head_pic {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #dadde4;
}
#link-table {
  // 隐藏 id
  /deep/ .el-checkbox-group .el-checkbox__label {
    display: none;
  }
}
.icon-block {
  display: inline-block;
  margin: 0 8px;
}
.blue-color {
  color: #273a8a;
}
.orange-bottom {
  border-bottom: 3px solid #f49342;
}
.main-box-m {
  display: flex;
  justify-content: center;
}
.platform-m {
  width: 400px;
}
.platform-pc {
  width: auto;
}
</style>