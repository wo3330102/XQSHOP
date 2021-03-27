<template>
  <div class="container">
    <h1 class="title">
      <span style="flex: 1">域名</span>
      <span style="font-size: 0">
        <el-button type="primary" @click="showExport = true"
          >添加域名</el-button
        >
      </span>
    </h1>
    <div>
      <!-- 主域名 -->
      <div class="box-big">
        <h3 class="title">
          <span class="text">主域名</span>
          <span class="option" @click="show = true" v-if="detail.linkUrlList"
            >更换主域名</span
          >
        </h3>
        <div>
          <el-table :data="mainDomainForm">
            <el-table-column prop="domain" label="域名">
              <template slot-scope="scope">
                <a :href="'https://' +scope.row.domain">{{ scope.row.domain }}</a> 
                <span class=""></span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="option" label="操作"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 其他域名 -->
      <div class="box-big">
        <h3 class="title">
          <span class="text">其他域名</span>
        </h3>
        <div>
          <el-table :data="domainForm">
            <el-table-column prop="url" label="域名">
              <template slot-scope="scope"> 
                <a :href="'https://' +scope.row.url" target="_blank">{{ scope.row.url }}</a> 
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template>
                <span>已连接</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope"> 
                <span v-if="scope.row.url !== detail.linkUrl" class="textBtn" @click="Remove(scope.$index)">移除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showExport" title="添加域名">
      <el-input v-model="domain" placeholder></el-input>
      <div slot="footer">
        <el-button @click="showExport = false">取消</el-button>
        <el-button type="primary" @click="Save">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="show" title="更换主域名">
      <div class="main-domain">{{ detail.linkUrl }}</div>
      <div style="padding-top: 20px">
        <el-radio-group v-model="mainDomain">
          <el-radio
            v-for="item in detail.linkUrlList"
            :label="item.url"
            :key="item.url"
            style="width: 100%; margin: 10px 0"
          ></el-radio>
        </el-radio-group>
      </div>

      <div slot="footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="ChangeMainDomain">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import { getShopById, edit } from "@/api/yxSystemStore";
export default {
  data() {
    return {
      mainDomainForm: [],
      domainForm: [],
      showExport: false,
      domain: "",
      detail: {},
      show: false,
      mainDomain: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function () {
      let id = localStorage.getItem("storeId");
      getShopById(id).then((res) => {
        console.log(res);
        this.detail = res;
        if (res.linkUrl) {
          this.mainDomainForm = [
            {
              domain: res.linkUrl,
              status: "已连接",
            },
          ];
        }
        if (res.linkUrlList) {
          this.domainForm = res.linkUrlList;
        }
      });
    },
    Remove: function (e) { 
      this.detail.linkUrlList.splice(e, 1);
      this.detail.linkUrls = '';
      edit(this.detail).then((res) => {
        this.$message.success('移除成功')
        this.domainForm.splice(e, 1);
      });
    },
    Save: function () {
      let reg = /^((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
      if (!reg.test(this.domain)) {
        this.$message.error("请输入正确的域名");
        return false;
      }
      if(!this.detail.linkUrl){
        this.detail.linkUrl = this.domain 
      }
      if (this.detail.linkUrlList) { 
        this.detail.linkUrlList.push({ url: this.domain }); 
      } else {
        this.detail.linkUrlList = [{ url: this.domain }];
      } 
      this.detail.linkUrls = JSON.stringify(this.detail.linkUrlList);
      edit(this.detail).then((res) => {
        this.$message.success("新增成功");
        this.showExport = false;
      });
    },
    ChangeMainDomain: function () { 
      this.detail.linkUrl = this.mainDomain;
      edit(this.detail).then(() => {
        this.show = false;
        this.init();
      });

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
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  justify-items: center;
  display: flex;
  .text {
    line-height: 40px;
    flex: 1;
    word-break: break-word;
  }
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.box-big {
  margin-bottom: 20px;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
  .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    height: 54px;
    line-height: 54px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    .text {
      flex: 1;
    }
    .option {
      color: #273a8a;
      font-size: 14px;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 400;
    }
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
.textBtn{
  padding: 10px 0;
    // color: #273a8a;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    font-weight: 400;
    color: rgb(207, 39, 39);
}
.main-domain {
  border-bottom: 1px solid #dcddeb;
  margin: 0 -20px;
  padding: 0 0 20px 20px;
  color: rgb(28, 31, 50);
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-top: 1px solid #ebeef5;
}
/deep/.el-table--enable-row-transition .el-table__body td {
  height: 70px;
}
</style>  