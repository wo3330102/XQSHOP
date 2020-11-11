<template>
  <div class="post-page">
    <div class="post-page-left">
      <el-form ref="form" :model="form">
        <el-card class="box-card">
          <div class="font14 flex marginbottom10">
            <label>广告组名称</label
            ><a style="color: #1890ff" v-if="target == 2">创建名称模板</a>
          </div>
          <el-input type="text" v-model="form.desc"></el-input>
        </el-card>

        <el-card class="box-card" v-if="target == 2">
          <div class="font14 marginbottom5">公共主页</div>
          <div class="font12">选择希望推广的Facebook 公共主页</div>
          <div style="dis">
            <el-row :gutter="20">
              <el-col :span="21">
                <el-form-item label="Facebook 公共主页">
                  <el-select
                    v-model="form.type"
                    placeholder="选择主页"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <div class="font12 post-page-info">
                  <i class="el-icon-warning"></i>
                  <span
                    >你必须为广告组选择Facebook
                    公共主页。请前往广告组的“主页”版块选择一个。</span
                  >
                </div>
              </el-col>
              <el-col :span="3">
                <el-button
                  icon="el-icon-plus"
                  style="margin-top: 35px"
                ></el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <el-card class="box-card font14" v-if="target == 3">
          <div>Conversion</div>
          <el-form-item label="转换事件位置" style="margin-bottom: 20px">
            <el-radio v-model="radio" label="1">网站</el-radio>
          </el-form-item>

          <div class="marginbottom10">像素</div>
          <div class="font12 marginbottom10">Stephanie Davis的像素</div>
          <div class="font12 marginbottom10">像素编号：24895632148963</div>
          <el-form-item label="转化事件">
            <el-select
              v-model="form.type"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in transoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-card>

        <el-card class="box-card">
          <span class="font14">预算和排程</span>
          <el-form-item label="预算">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input type="text" v-model="form.desc"
              ><template slot="append">BRL</template></el-input
            >
          </el-form-item>

          <div class="time-select">
            <div class="week-box">
              <span
                v-for="(item, index) in weekList"
                class="font12"
                :key="index"
                style="margin-bottom: 18px"
                >{{ item }}</span
              >
            </div>
            <div>
              <div class="time-box marginbottom10">
                <span
                  v-for="(item, index) in timeList"
                  class="font12"
                  :key="index"
                  style="margin-right: 30px"
                  >{{ item }}</span
                >
              </div>
              <table
                class="post-time-table marginbottom10"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr
                  class="post-time-tr"
                  v-for="(item, index) in table"
                  :key="item.week"
                >
                  <td
                    v-for="(jtem, jndex) in item.times"
                    :key="jtem.time"
                    :class="{ 'is-click': jtem.select }"
                    @click="hangdleSelectTime(item, jtem)"
                  ></td>
                </tr>
              </table>
              <div style="display: flex" class="font14">
                广告投放时间段：
                <div class="show"></div>
              </div>
            </div>
          </div>
        </el-card>
      </el-form>
    </div>
    <div class="post-page-right">
      <el-card class="box-right">
        <span>广告受众筛选条件</span>
        <div style="width: 200px; margin-top: 20px" class="percentage">
          <div class="icon-svg" style="left: 100px">
            <svg
              t="1604474709290"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2925"
              width="16"
              height="16"
            >
              <path
                d="M512 93.672727c192.791273 0 349.090909 157.742545 349.090909 352.302546 0 126.650182-110.941091 298.728727-332.8 516.189091a23.272727 23.272727 0 0 1-32.581818 0l-10.472727-10.309819C270.359273 739.258182 162.909091 570.647273 162.909091 445.975273c0-194.56 156.299636-352.302545 349.090909-352.302546zM512 302.545455a116.363636 116.363636 0 1 0 0 232.727272 116.363636 116.363636 0 0 0 0-232.727272z"
                p-id="2926"
              ></path>
            </svg>
          </div>
          <el-progress :percentage="100"></el-progress>
          <div class="font12" style="margin-top: 10px">
            <span>特定</span>
            <span style="padding-left: 100px">广泛</span>
          </div>
          <div class="audience font14">您的目标受众相当广泛</div>
        </div>
        <el-divider></el-divider>
        <span class="font12">潜在触及人数：<span>140,000,000</span>人</span>
        <div class="font12" style="color: #ccc; margin-top: 10px">
          你的条件目前设定为允许详细目标设定扩充。
        </div>
      </el-card>
      <el-card class="box-right">
        <span class="font14 marginbottom5">单日成果估计值</span>
        <div class="font12 marginbottom10">
          依据点击后7天和浏览后1天转换期间
        </div>
        <div class="font14 marginbottom5">触及人数</div>
        <div class="font14 marginbottom5">2.0k-5.7k</div>
        <el-progress :percentage="10" class="marginbottom10"></el-progress>
        <div class="font14 marginbottom5">转换次数</div>
        <div class="font14">10</div>
        <el-progress :percentage="10"></el-progress>
        <el-divider></el-divider>
        <span class="font12"
          >预估数据的准确程度会受到多种因素影响，例如过去的行销活动资料，你输入的预算，以及市场资料等等，这些数据可供你初步了解现有预算的广告成效，但预估结果仅供参考。</span
        >
        <div class="font12" style="color: #1989fa; margin-top: 10px">
          这些预估数据有用吗？
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: [Number, String],
      default: "1",
    },
  },
  data() {
    return {
      form: {},
      options: [],
      radio: 1,
      timeoptions: [{ value: 1, label: "使用广告受众所在时间段" }],
      transoptions: [
        { value: 1, label: "潜在客户" },
        { value: 2, label: "自订产品" },
        { value: 3, label: "开始结账" },
        { value: 4, label: "排程" },
        { value: 5, label: "加到愿望清单" },
        { value: 6, label: "订阅" },
        { value: 7, label: "捐款" },
        { value: 8, label: "加到购物车" },
        { value: 9, label: "浏览内容" },
        { value: 10, label: "新增付款资料" },
        { value: 11, label: "购买" },
      ],
      checked: false,
      activeNames: "",
      table: [],
      weekList: [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日",
        "每天",
      ],
      timeList: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00",
      ],
    };
  },
  created() {
    let arr = [];
    for (let i = 1; i < 9; i++) {
      let time = [];
      for (let j = 1; j < 25; j++) {
        time.push({ time: j, select: false });
      }
      arr.push({ week: i, times: [...time] });
    }
    this.table = arr;
  },
  methods: {
    handleChange() {},
    hangdleSelectTime(item, jtem) {
      if (item.week === 8) { 
        let bool = false;
        if (jtem.select) {
          bool = false;
        } else {
          bool = true;
        } 
        this.table.forEach((ele) => {
          let index = jtem.time - 1; 
          ele.times[index].select = bool;
        }); 
      } else {
        let bool = true;
        this.table.forEach((ele) => {
          if (ele.week === item.week) {
            ele.times.forEach((mlm) => {
              if (mlm.time == jtem.time) {
                mlm.select = !mlm.select;
                this.table[7].times[jtem.time - 1].select = false;
              }
            });
          }
          let index = jtem.time - 1;
          if (ele.times[index].select == false && ele.week != 8) { 
            bool = false;
          }
        });
        if (bool) {
          this.table[7].times[jtem.time - 1].select = true;
        }
      }

      console.log(this.table);
      // let arr=this.tr[index];
      // console.log(arr);
      // arr.times[jndex].select=true
      // this.tr[index] = arr;
      // console.log(index,jndex)
      // console.log(this.tr,'this.tr')
      // console.log('======item th====',item)
      // console.log('=======jtem tr======',jtem)
    },
  },
};
</script>

<style lang="scss">
.post-page {
  padding: 20px;
  background: #dcdfe6;
  display: flex;
  .el-form-item__label {
    float: none;
  }
  .el-form-item__content {
    margin-left: 0 !important;
    display: flex;
  }
  .el-radio {
    display: flex;
  }
  .el-radio__label {
    white-space: break-spaces;
  }
}
.box-card {
  margin-bottom: 10px;
}
.font12 {
  font-size: 12px;
}
.font14 {
  font-size: 14px;
}
.marginbottom10 {
  margin-bottom: 10px;
}
.marginbottom5 {
  margin-bottom: 5px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.post-page-right {
  margin-left: 20px;
  width: 400px;
  .box-right {
    width: 100%;
    margin-bottom: 10px;
  }
  .percentage {
    position: relative;
    .el-progress-bar__inner {
      background: linear-gradient(
        to left,
        #f56c6c 0%,
        #f56c6c 20%,
        #67c23a 20%,
        #67c23a 80%,
        #e6a23c 80%,
        #e6a23c 100%
      ) !important;
    }
    .icon-svg {
      position: absolute;
      top: -12px;
    }
    .audience {
      position: absolute;
      top: 0;
      right: -134px;
    }
  }
  .el-progress__text {
    display: none;
  }
}
.post-page-info {
  padding: 10px;
  border-radius: 6px;
  background: #eebdbd;
}
.post-time-table {
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;

  td {
    border-right: 1px solid #fff;
    border-bottom: 1px solid #ccc;
    width: 20px;
    height: 30px;
    cursor: pointer;
    background: #f7f8f9;
  }
  .is-click {
    background: #1890ff;
  }
  td:nth-of-type(3n) {
    border-right: 1px solid #cccccc;
  }
  tr:last-child {
    margin-top: 10px;
  }
}
.time-select {
  display: flex;
  .week-box {
    display: flex;
    flex-direction: column;
    margin-top: 35px;
    margin-right: 10px;
  }
}
.show {
  width: 20px;
  height: 20px;
  background: #1890ff;
}
</style>