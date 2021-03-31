<template>
  <div class="container">
    <h1 class="title">
      <span>
        梯度优惠 
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
      <span style="font-size:0;">
        <el-button @click="Close">{{status == 1?'关闭梯度优惠':'开启梯度优惠'}}</el-button>
        <el-button @click="ToAddDiscount" style="color: #f2f3fa; background-color: #2d3259; border-color: #2d3259;" >创建优惠</el-button>
      </span>
    </h1>
    <div class="content">
      <div class="conditions">
        <div class="search-box">
          <el-input v-model="searchVal" placeholder="请输入梯度优惠名称或描述 ">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </div>
      </div> 
      <table-tem 
        :requestUrl="'api/yxStoreGradient'"
        :requestParams="requestParams"
        :optionList="['删除']"
        :tableHeader="tableHeader" 
        :isRefresh="isRefresh"
        @rowClick="rowClick"
        @BatchOption="BatchOption"
      >
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :width="item.width ? item.width : ''"
          :prop="item.prop ? item.prop : ''"
          :label="item.label ? item.label : ''"
          :align="item.align ? item.align : ''"
          :sortable="item.sortable" 
        >
          <template slot-scope="scope">
            <span v-if="item.prop == 'status'">{{
              scope.row.status === 1 ? "开启" : "关闭"
            }}</span>
            <span v-else-if="item.prop == 'discountType'">{{
              scope.row.discountType === 0
                ? "减免"+currency.s + scope.row.discountMoney
                : scope.row.discountType === 1
                ? "减" + scope.row.discountQuota + "%"
                : "免运费"
            }}</span>
            <span v-else>{{ scope.row[item.prop]?scope.row[item.prop]:0 }}</span>
          </template>
        </el-table-column> 
      </table-tem> 
    </div>
  </div>
</template>
<script> 
import {del,changeStatus,getStatus} from '@/api/yxStoreGradient' 
import tableTem from '@/components/tableTem'  
export default {
  components: { 
    tableTem
  },
  data() {
    return {
      status:0,
      searchVal: "",
      tableHeader:[{
        prop:'name',
        label:'优惠名称',
        width:273
      },{
        prop:'title',
        label:'优惠描述',
        width:273
      },{
        prop:'nums',
        label:'使用次数',
        width:140,
        sortable:true
      },{
        prop:'period',
        label:'有效期',
        width:260,
        sortable:true
      },{
        prop:'status',
        label:'状态',
        width:100
      }],
      requestParams:{
        size:30,
        page:0,
      },  
      showVideo:false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo-transcode-cae/50463985_c1fbf4ebadf2ed65ff3b723f5f5ce28f_0_cae.mp4", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      isRefresh:0,
    };
  },
  created(){
    let storeId = localStorage.getItem('storeId')
    getStatus({storeId:Number(storeId)}).then(res=>{
      console.log(res);
      this.status = res.data.isOpen
    })
  },
  methods: { 
    ToAddDiscount:function(){
      this.$router.push('./editDiscount')
    },
    rowClick:function(e){
      this.$router.push({
        name:'EditDiscount',
        query:{
          id:e.id
        }
      })
      localStorage.setItem('discountDetail',JSON.stringify(e))
    },
    BatchOption:function(e,selectItem){
      let par = [];
      selectItem.map(i=>{
        par.push(i.id);
      })
      let that= this;
      this.$DelTip(function(){
        del(par).then(res=>{
        that.$message.success('删除成功');
        that.isRefresh += 1;
      })
      }) 
    },
    Close:function(){
      let par = {
        isOpen:this.status == 1?0:1
      }
      changeStatus(par).then(res=>{
        console.log(res)
        this.$message.success('修改成功')
        this.status = this.status == 1?0:1
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.title {
  height: 41px;
  line-height: 41px;
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
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
      /deep/.el-input-group__append {
        background: #fff;
        color: #000000;
      }
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
