<template>
  <div class="container">
    <h1 class="title">
      <span>优惠券列表</span>
      <span style="font-size: 0"> 
        <el-button type="primary" @click="ToAddShop">添加优惠券</el-button>
      </span>
    </h1>
    <div class="content">
      <div class="tab">
        <div
          v-for="(item, index) in nav"
          :key="item.id"
          :class="active == index ? 'active' : ''"
          @click="ChangeActive(index)"
        >
          {{ item.label }}
        </div>
      </div> 
      <table-tem
        :selection="false"
        :requestUrl="''"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        :isRefresh="isRefresh"
        @rowClick="toDetail" 
      >
        
      </table-tem>
    </div> 
  </div>
</template>
<script>  
import tableTem from "@/components/tableTem"; 
import { getCates } from "@/api/yxStoreCategory";
export default {
  components: { 
    tableTem,
  },
  data() {
    return {
      requestParams: {
        page: 0,
        size: 30,
        queryName:'', 
      },
      isRefresh: 0,
      nav: [
        {
          id: 0,
          label:"优惠券活动",
          url:'api/coupon'
        },
        {
          id: 1,
          label: "优惠券事件",
          url:''
        },
        {
          id: 2,
          label: "优惠券号码",
        },
      ],
      active: 0,
      categoryList: [],
      date: "",
      searchType: "",
      searchTypeList: [
        {
          id: 1,
          label: "PayPal",
        },
      ],
      searchVal: "",
      tableHeader: [
        {
          prop: "image",
          label: "",
        },
        {
          prop: "storeName",
          label: "商品名",
          width: "443",
          sortable: true,
        },
        {
          prop: "tagName",
          label: "分类",
          width: "443",
        },
        {
          prop: "option",
          label: "操作",
          width: "80",
        },
      ],
      currentPage: 1,
      showExport: false,
      showImport: false,
      checkImport: true,
      upUrl:process.env.VUE_APP_BASE_API+'/api/yxStoreProduct/importProduct/'+localStorage.getItem('storeId')
    };
  },
  created() {
    // 获取分类信息
    let par = {
      size: 99,
      page: 0,
    };
    getCates(par).then((res) => {
      this.categoryList = res.content;
    });
  },
  methods: {
    // 改变搜索条件
    ChangeActive: function (index) {
      this.active = index;
      this.requestParams.isShow = this.nav[index].id;
    },
    // 搜索
    Search: function () {
      let searchVal = this.searchVal;
      let par = {
        storeName: searchVal,
        ...this.requestParams,
      };
      this.requestParams = par;
    },
    // 批量操作
    // BatchOption: function (e, selectItem) {
    //   console.log(e);
    //   let that = this;
    //   // 0为上下架  1为删除
    //   if (e === 0) {
    //     // 0为下架  1为上架
    //     let arr = [];
    //     let par = {};
    //     selectItem.map((i) => {
    //       arr.push(i.id);
    //     });
    //     if (this.active == 0) {
    //       par = {
    //         ids: arr,
    //         status: 0,
    //       };
    //     } else {
    //       par = {
    //         ids: arr,
    //         status: 1,
    //       };
    //     }
    //     onsaleAll(par).then(() => {
    //       that.$message.success("操作成功");
    //       that.isRefresh += 1;
    //     });
    //   } else {
    //     let arr = [];
    //     selectItem.map((i) => {
    //       arr.push(i.id);
    //     });
    //     this.$DelTip(function () {
    //       delMany(arr).then(() => {
    //         that.$message.success("操作成功");
    //         that.isRefresh += 1;
    //       });
    //     });
    //   }
    // },
    ToAddShop: function () {
      this.$router.push("/commodity/edit");
    },
    toDetail: function (e) {
      this.$router.push({ path: "/commodity/edit", query: { id: e.id } });
    },
    Preview:function(params){
      let url = 'https://' + localStorage.getItem('storeUrl') + '/product-details.html?id=' +  params.params.id
      window.open(url, '_blank') 
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
  }
}
.download-tpl-link-new {
  color: #242b4a;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  float: right;
}
.textBtn {
  padding: 10px 0;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  margin-left: 10px;
  text-decoration: underline;
}
</style>

