<template>
  <div class="container">
    <h1 class="title">
      <span>秒杀</span> 
    </h1>
    <div class="content">
      <div class="tab">
        <div
          v-for="(item,index) in nav"
          :key="item.id"
          :class="acitve == index?'active':''"
          @click="ChangeActive(index)"
        >{{item.label}}</div>
      </div>
      <div class="conditions" v-if="false">
        <!-- 分类 -->
        <el-select
          v-model="requestParams.isSubscribe"
          clearable
          placeholder="订阅状态"
          @change="ChangeSelect"
          style="margin-right: 10px;width:140px"
        >
          <el-option
            v-for="item in subscribeTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- 时间选择 -->
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="ChangeSelect"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd"
          style="width:230px;margin-right: 10px;"
          :picker-options="endOptions"
        ></el-date-picker>
        <!-- 标签 -->
        <!-- <el-select
          v-model="countryType"
          clearable
          placeholder="国家/地区"
          @change="ChangeSelect"
          style="margin-right: 10px;width:164px"
        >
          <el-option
            v-for="item in countryTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select> -->
        <div class="search-box">
          <el-input v-model="searchVal" placeholder="请输入姓名、邮箱、手机">
            <el-button slot="append" @click="Search">搜索</el-button>
          </el-input>
        </div>
        <div style="line-height:36px; align-self: center; margin-left: 20px;">
          <el-dropdown style="cursor:pointer" trigger="click">
            <span class="el-dropdown-link">
              更多筛选
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-box">
                <h4>筛选条件</h4>
                <div class="item">
                  <div class="inp-number">
                    <span class="inp-number-prepend">最小金额</span>
                    <el-input v-model="minMoney" placeholder></el-input>
                  </div>
                  <span style="margin: 0px 10px;">-</span>
                  <div class="inp-number">
                    <span class="inp-number-prepend">最大金额</span>
                    <el-input v-model="maxMoney" placeholder></el-input>
                  </div>
                </div>
                <div class="item">
                  <div class="inp-number">
                    <span class="inp-number-prepend">最小订单</span>
                    <el-input v-model="minOrder" placeholder></el-input>
                  </div>
                  <span style="margin: 0px 10px;">-</span>
                  <div class="inp-number">
                    <span class="inp-number-prepend">最大订单</span>
                    <el-input v-model="maxOrder" placeholder></el-input>
                  </div>
                </div>
                <div class="option-btn">
                  <el-button @click="Screen">筛选</el-button>
                </div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <table-tem 
        :requestUrl="nav[active].url"
        :requestParams="requestParams"
        :optionList="['删除']" 
        :tableHeader="tableHeader"
        :isRefresh="isRefresh"
        @rowClick="toDetail"
        @BatchOption="BatchOption" 
        ></table-tem>
    </div> 
  </div>
</template>
<script> 
import tableTem from "@/components/tableTem";
import {del} from '@/api/yxUser'
export default {
  components: { 
    tableTem,
  }, 
  data() {
    return {
      requestParams:{
        page: 0,
        size: 30,  
        beginTime:'',
        endTime:'',
        keyword:'',
        minOrder:'',
        maxOrder:'',
        minMoney:'',
        maxMoney:'',
        notStoreId:true,
      },
      showExport: false,
      nav: [
        {
          id: 1,
          label: "商品秒杀",
          url:'',
        },
        {
          id: 2,
          label: "过期商品秒杀",
        },
        {
          id: 3,
          label: "秒杀历史",
        },
      ],
      acitve: 0, 
      subscribeTypeList: [
        {
          id: 1,
          label: "已订阅",
        },
        {
          id: 0,
          label: "未订阅",
        },
      ],
      // countryType: "",
      // countryTypeList: [
      //   {
      //     id: 1,
      //     label: "中国",
      //   },
      // ],
      date: "",
      searchVal: "",
      minMoney: "",
      maxMoney: "",
      minOrder: "",
      maxOrder: "",
      tableData: [],
      isRefresh:0,
      tableHeader: [
        {
          width: 263,
          label: "姓名",
          prop:'nickname',
        },
        {
          width: 261,
          label: "地区",
          prop:'addres',
        },
        {
          width: 261,
          label: "已购订单",
          sortable: true,
          prop:'payCount',
        },
        {
          width: 261,
          label: "总金额",
          sortable: true,
          prop:'sumMoney',
        },
      ],
      currentPage: 1, 
      endOptions:{
        disabledDate(time) {
          return time.getTime() > new Date().getTime() ;
        },
      },
    };
  }, 
  methods: {
    ChangeActive: function (index) {
      this.acitve = index;
    },
    ChangeSelect: function (newVal) {
      if(newVal){
        this.requestParams.beginTime = newVal[0];
        this.requestParams.endTime = newVal[1];
      } else {
        this.requestParams.beginTime = ''
        this.requestParams.endTime = ''
      }
    }, 
    toDetail:function(e){ 
      localStorage.setItem('customerDetail',JSON.stringify(e))
      this.$router.push('/customerDetail')
    },
    // 批量操作
    BatchOption:function(e,selectItem){
      let that = this;
      let par = [];
      selectItem.map(i=>{
        par.push(i.uid);
      })
      this.$DelTip(function(){
        del(par).then(()=>{
          that.isRefresh += 1;
          that.$message.success('删除成功')
        })
      })
    },
    Screen:function(){ 
      this.requestParams.minOrder = this.minOrder
      this.requestParams.maxOrder = this.maxOrder
      this.requestParams.minMoney = this.minMoney
      this.requestParams.maxMoney = this.maxMoney
    },
    Search:function(){
      this.requestParams.keyword = this.searchVal
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  height: 40px;
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  line-height: 40px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  flex: 1;
  /deep/.el-button,
  .el-button--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  /deep/.el-button + .el-button {
    margin-left: 20px !important;
  }
}
.content {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  background-color: #fff;
  .tab {
    display: flex;
    padding: 0 10px;
    border-bottom: 1px solid #dcdfe6;
    .active {
      border-bottom: 4px solid #f49342;
      color: #1a1d2c;
    }
    & > div {
      display: inline-block;
      padding: 0 10px;
      height: 36px;
      background: #fcfdff;
      font-size: 14px;
      line-height: 36px;
      border-bottom: 4px solid #fcfdff;
      color: #5e7185;
      cursor: pointer;
    }
  }
  .conditions {
    padding: 9px 12px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f1f1f6;
    flex-wrap: wrap; 
    .search-box {
      display: flex;
      flex: 1;
    }
    /deep/.el-input-group__append {
      background: #fff;
      color: #000000;
    }
    /deep/ .el-button {
      height: 36px;
      padding: 0 15px;
    }
  }
  .pagination {
    padding: 14px 0;
    text-align: center;
  }
}
.filter-box {
  padding: 10px 20px;
  .item {
    margin-top: 20px;
    .inp-number {
      display: inline-table;
      font-size: 13px;
      line-height: normal;
      width: 200px;
      border-collapse: separate;
      border-spacing: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-right: none;
      .inp-number-prepend,
      .inp-number-append {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: none;
        border: 1px solid #dcdfe6;
        padding: 0 15px;
        color: #1a1d2c;
        display: table-cell;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 1px;
        white-space: nowrap;
        background: #fff;
      }
      /deep/ .el-input > input,
      .el-input__inner > input {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-left: 0;
      }
    }
    & > span {
      margin: 0px 10px;
    }
  }
  .option-btn {
    margin: 30px 0 10px;
    text-align: center;
  }
}
.table {
  position: relative;
  .checkOption {
    overflow: hidden;
    width: 82px;
    height: 36px;
    line-height: 36px;
    background: #fff;
    padding: 0 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 8px;
    .checkContent {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      color: #273a8a;
      i {
        float: right;
        line-height: 36px;
        margin-right: 4px;
        cursor: pointer;
        color: #c0c4cc;
      }
    }
  }
}  
/deep/ .el-table--enable-row-transition .el-table__body td{
  height: 70px;
}
</style>

