<template>
  <div class="container">
    <router-link
      to="/appHome"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>我的应用</span>
    </router-link>
    <h1 class="title">
      <span class="text">
        运费险
        <span
          class="sail-app-status-tag"
          :class="
            status == 1
              ? 'sail-app-status-tag-open'
              : 'sail-app-status-tag-close'
          "
          >{{ status == 1 ? "已开启" : "未开启" }}</span
        >
      </span>
      <span class="options">
        <el-button
          @click="
            status = status === 1 ? 0 : 1;
            Save();
          "
          >{{ status === 1 ? "关闭" : "开启" }}</el-button
        >
      </span>
    </h1>
    <div style="min-height: 200px">
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <h3 class="title">
              <span>
                运费险费率
                <span style="color: #606266; font-weight: normal"
                  >（收取商品总价格的百分比）</span
                >
              </span>
              <span class="option">效果预览</span>
            </h3>
            <el-radio-group v-model="detail.rates">
              <el-radio :label="0">2%</el-radio>
              <el-radio :label="1">3%</el-radio>
            </el-radio-group>
          </div>
          <div class="box">
            <h3 class="title">
              <span>
                默认值设置
                <span style="color: #606266; font-weight: normal"
                  >（勾选后，买家下单时，默认购买运费险）</span
                >
              </span>
            </h3>
            <el-checkbox v-model="detail.type" label=""
              >默认购买运费险</el-checkbox
            >
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
import { get, add, edit } from "@/api/yxStorePlugRate";

export default {
  data() {
    return {
      status: 0,
      detail: {
        rates: 0,
        type: true,
        id: "",
      },
    };
  }, 
  created() {
    this.Init();
  },
  methods: {
    Init: function () {
      get().then((res) => {
        if (res.content.length > 0) {
          this.detail = res.content[0];
          this.detail.type = Boolean(res.content[0].type);
          this.status = res.content[0].status;
        }
      });
    },
    Save: function () {
      let that = this;
      this.detail.status = this.status;
      this.detail.type = Number(this.detail.type);
      if (this.detail.id) {
        edit(this.detail).then(() => {
          Tip();
        });
      } else {
        delete this.detail.id;
        add(this.detail).then(() => {
          Tip();
        });
      }
      function Tip() {
        that.$message.success("修改成功");
        that.Init();
      }
      // this.$router.push('/appHome')
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
h1 {
  height: 40px;
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  line-height: 40px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  flex: 1;
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
  .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    .option {
      font-size: 14px;
      color: #273a8a;
      float: right;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 400;
    }
  }
}
.off-the-shelf {
  color: rgb(202, 203, 214);
  border: 1px solid rgb(202, 203, 214);
  padding: 4px 8px;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  border-radius: 11px;
}
.textBtn {
  padding: 0;
  margin-right: 10px;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
}
.sail-app-status-tag-open {
  border: 2px solid #fff;
  background: #bbe5b3;
  color: #414f3e;
}
.sail-app-status-tag-close {
  background: #dfe3e8;
  border: 2px solid #fff;
  color: #454f5b;
}
.sail-app-status-tag {
  border-radius: 100px;
  width: 60px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 13px;
  text-align: center;
  position: relative;
  top: -4px;
}
</style> 