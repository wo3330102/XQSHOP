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
              <el-select v-model="detail.promId" style="width: 100%">
                <el-option
                  v-for="item in codeList" 
                  :key="item.id"
                  :label="item.discountName"
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
            <div>
              <el-select v-model="detail.promId" :disabled="true" style="width:180px">
                <el-option
                  v-for="item in codeList"
                  :key="item.id"
                  :label="item.discountName"
                  :value="item.id"
                ></el-option>
              </el-select>
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
import {get} from '@/api/yxStorePromotions'
import {getShare,edit,add} from '@/api/yxStorePromotionsSharing'
export default {
  data() {
    return { 
      command:0,
      detail: {
        title:'',
        promId:'', 
      },
      id:'',
      codeList: [],
    };
  }, 
  created(){
    if (this.$route.query.hasOwnProperty("id")) {
      this.id = this.$route.query.id;
    }
    let par = {
      status:1
    }
    get(par).then(res=>{
      console.log(res);
      this.codeList = res.content;
    })
    getShare().then(res=>{
      console.log(res);
      if(this.id){
        this.detail = {
          title:res.content[0].title,
          promId:res.content[0].promId,
          id:this.id,
        }
        this.command = res.content[0].status;
      }
    }) 
  },
  methods: {
    CheckSwitch: function (e) {
      console.log(e);
    },
    SekectCommand: function (command) {
      this.command = command;
    }, 
    Save:function(){  
      this.detail.status = this.command
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
    }
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