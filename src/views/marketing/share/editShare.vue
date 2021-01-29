<template>
  <div class="container">
    <router-link
      to="/share"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>激励分享</span>
    </router-link>
    <h1>
      激励分享
      <el-dropdown @command="(e) => (command = e)">
        <el-button>
          {{ command === 1 ? "开启" : "关闭" }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="command === 0" :command="1"
            >开启</el-dropdown-item
          >
          <el-dropdown-item v-else :command="0">关闭</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 优惠描述 -->
          <div class="box">
            <h3 class="title">
              <el-tooltip
                class="item"
                effect="dark"
                content="请输入英文优惠描述，此信息将在店铺中展示给用户，并且用户分享时也将使用该描述。"
                placement="bottom-start"
              >
                <span>优惠描述</span>
              </el-tooltip>
              <span class="subTitle">{{ detail.title.length }}/40字符</span>
            </h3>
            <div>
              <el-input
                v-model="detail.title"
                size="medium"
                maxlength="40"
                placeholder="请输入分享英文描述"
              ></el-input>
            </div>
          </div>
          <!-- 选择优惠码 -->
          <div class="box">
            <h3 class="title">
              <el-tooltip
                class="item"
                effect="dark"
                content="只能选择在有效期内并且已开启的优惠码，建议选择无门槛的优惠。"
                placement="bottom-start"
              >
                <span>选择优惠码</span>
              </el-tooltip>
              <a class="option" target="_blank" href="/discount">编辑优惠码</a>
            </h3>
            <div>
              <el-select
                v-model="detail.promId"
                @change="ChangeCode"
                style="width: 100%"
              >
                <el-option
                  v-for="item in codeList"
                  :key="item.id"
                  :label="item.promoCode"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 适用对象 -->
          <div class="box">
            <h3 class="title">
              <el-tooltip
                class="item"
                effect="dark"
                content="自动使用与手动优惠码相同的适用对象，以方便用户下单。"
                placement="bottom-start"
              >
                <span>适用对象</span>
              </el-tooltip>
            </h3>
            <div style="display: flex">
              <el-select
                v-model="applyObjectDetail.applyObject"
                :disabled="true"
                style="width: 180px; margin-right: 20px"
              >
                <el-option
                  v-for="item in appliedObjectList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
              <div v-if="applyObjectDetail.applyObject !== 0" style="flex: 1">
                <el-select
                  v-model="select"
                  :disabled="true"
                  :placeholder="
                    applyObjectDetail.applyObject === 2
                      ? '选择一个或者多个商品'
                      : '选择一个或者多个商品分类'
                  "
                  style="width: 100%"
                >
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
                <div class="productListTarget">
                  <table class="discountTargetList">
                    <tbody>
                      <tr v-for="item in table" :key="item.id">
                        <td class="img">
                          <span
                            class="small-img"
                            :style="{
                              backgroundImage: 'url(' + item.image + ')',
                            }"
                          ></span>
                        </td>
                        <td class="text">{{ item.title }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              激励分享与手动优惠码互相绑定，若需要使用激励分享，请确保绑定的手动优惠码长时间有效。
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/share')">取消</el-button>
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
    </div>
  </div>
</template> 
<script>
import { get, getShare, edit, add } from "@/api/yxStorePromotionsSharing";
export default {
  data() {
    return {
      command: 0,
      detail: {
        title: "",
        yxStorePromotions: {},
      }, 
      id: "",
      select: "",
      codeList: [],
      applyObjectDetail: {
        applyObject: 0,
      },
      appliedObjectList: [
        // 商品属性列表
        {
          id: 0,
          label: "整个订单",
        },
        {
          id: 1,
          label: "指定商品分类",
        },
        {
          id: 2,
          label: "指定商品",
        },
      ],
      table: [],
    };
  },

  created() {
    if (this.$route.query.hasOwnProperty("id")) {
      this.id = this.$route.query.id;
    }
    get().then((data) => {
      this.codeList = data;
      getShare().then((res) => {
      console.log(res);
      if (this.id) {
        let bool = false;
        this.codeList.map(i=>{
          if(i.id == res.content[0].promId){
            bool = true;
          }
        })
        if(!bool){
          console.log(1);
          res.content[0].promId = '';
        } else {
          if (res.content[0].yxStorePromotions) {
          this.applyObjectDetail = res.content[0].yxStorePromotions;
          this.InitTable(res.content[0].yxStorePromotions);
        }
        }
        console.log(res);
        this.detail = res.content[0]; 
        this.$nextTick(() => {
          this.command = res.content[0].status;
        }); 
        
      }
    });
    }); 
  },
  methods: {
    CheckSwitch: function (e) {
      console.log(e);
    },
    ChangeCode: function (e) {
      this.codeList.map((i) => {
        if (i.id === e) {
          this.applyObjectDetail = i;
          this.InitTable(i);
        }
      });
    },
    InitTable: function (e) {
      let obj = e;
      let arr = [];
      if (e) {
        console.log("1");
        switch (e.applyObject) {
          case 0:
            break;
          case 1:
            // 指定商品分类
            arr = JSON.parse(obj.tagIds);
            this.table = arr;
            break;
          case 2:
            // 指定商品
            arr = JSON.parse(obj.prodIds);
            this.table = arr;
            break;
        }
      }
    },
    Save: function () {
      this.detail.status = this.command;
      this.detail.type = 0;
      if(this.detail.promId == '' || this.detail.promId == null || this.detail.promId == undefined){
        this.$message.error('请选择优惠码');
        return false;
      }
      if (this.id) {
        // 修改
        edit(this.detail).then((res) => {
          this.$message.success("修改成功");
          this.$router.push("/share");
        });
      } else {
        // 新增
        add(this.detail).then((res) => {
          this.$message.success("新增成功");
          this.$router.push("/share");
        });
      }
    },
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
  display: flex;
  justify-content: space-between;
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
      float: right;
      font-weight: 400;
      color: #c1c2cc;
    }
    .option {
      color: #273a8a;
      cursor: pointer;
      text-decoration: underline;
      font-size: 12px;
      float: right;
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
  .time-group {
    line-height: normal;
    display: inline-table;
    width: 294px;
    margin-right: 20px;
    border-collapse: separate;
    border-spacing: 0;
    .time-desc {
      color: #909399;
      vertical-align: middle;
      display: table-cell;
      border: 1px solid #dcdfe6;
      border-right: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding: 0 8px;
      white-space: nowrap;
      width: 1px;
    }
    /deep/ .el-input__inner {
      padding-left: 26px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    /deep/ .el-input__prefix {
      left: 0;
    }
  }
  .detail-list {
    margin-bottom: 12px;
    border-bottom: 1px solid #dcdfe6;
    .item {
      width: 100%;
      padding: 12px 0;
      border-top: 1px solid #dcddeb;
      display: flex;
      align-items: center;
      flex: 1;
      height: 36px;
      & > span {
        margin-right: 8px;
      }
      /deep/.el-icon-delete-solid {
        margin-left: 20px;
        color: #c1c2cc;
      }
      /deep/ .el-input__prefix {
        line-height: 36px !important;
      }
      /deep/ .el-input__suffix {
        line-height: 36px !important;
      }
    }
  }
  .ext-btn-link-tetx {
    height: 85px;
    padding-top: 20px;
  }
  .ext-select-container {
    .ext-select-text {
      position: absolute;
      left: 8px;
      top: 5px;
      font-size: 12px;
      font-weight: 400;
      color: #808598;
    }
    /deep/.el-select {
      margin-bottom: 12px;
    }
    /deep/.el-input__prefix {
      width: 100%;
      left: 0;
    }
    /deep/.el-input__inner {
      height: 48px;
      padding-top: 15px;
      padding-left: 10px;
    }
    .sub-title {
      font-size: 12px;
      font-weight: 400;
      color: #c2c3cd;
      line-height: 20px;
    }
    .title {
      font-size: 12px;
      font-weight: 400;
      color: #1a1d2c;
      line-height: 20px;
      margin-bottom: 8px;
    }
  }
}
.discountTargetList {
  margin: 2px 0;
  width: 100%;
  line-height: 23px;
  .img {
    width: 60px;
    .small-img {
      display: inline-block;
      vertical-align: middle;
      width: 50px;
      height: 50px;
      border-radius: 4px;
      border: 1px solid #dadde4;
      background-color: #f7f8fd;
      background-origin: content-box;
      background-position: 50% 50%;
      background-size: contain;
      background-repeat: no-repeat;
      overflow: hidden;
    }
  }
  .text {
    padding-left: 12px;
  }
  tr {
    display: flex;
    align-items: center;
    td {
      padding: 10px 0;
    }
  }
}
.overview > p {
  padding: 10px 0;
  color: #293154;
  display: flex;
  align-items: flex-start;
  line-height: 20px;
  .title {
    width: 70px;
  }
  .text {
    flex: 1;
  }
}
.detail {
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #dcddeb;
  .title {
    margin-bottom: 10px;
  }
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
.search-conditions {
  display: flex;
  justify-content: space-between;
}
.dialog-preview-top-desc {
  font-size: 14px;
  font-weight: 400;
  color: #1b1d2c;
  line-height: 20px;
  text-align: center;
  margin-bottom: 18px;
  width: 100%;
  display: inline-block;
}
.dialog-preview-bottom-desc {
  font-size: 12px;
  font-weight: 400;
  color: #808598;
  line-height: 20px;
  text-align: center;
  margin-top: 20px;
  width: 100%;
  display: inline-block;
}
/deep/.el-input-group__prepend {
  background: #fff;
}
/deep/ .el-icon-delete-solid {
  font-size: 18px;
  line-height: 38px;
  cursor: pointer;
}
/deep/.el-input-group__append {
  background: #fff;
}
</style>  