<template>
  <div class="container">
    <router-link
      to="/coupon"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>优惠券</span>
    </router-link>
    <h1>{{ detail.id ? "编辑" : "新增" }}优惠券</h1>
    <div class="box">
      <el-form :model="detail" label-width="150px" label-position="left" :rules="rules">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="detail.activityName" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="所属会员组"> 
          <el-select v-model="detail.memberGroupIds" placeholder="请选择所属会员组">
            <el-option :label="item.id" :value="item.name" v-for="item in groupIdList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="couponStartTime">
          <el-input v-model="detail.couponStartTime" placeholder="请选择开始时间"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="couponEndTime">
          <el-input v-model="detail.couponEndTime" placeholder="请选择结束时间"></el-input>
        </el-form-item>
        <el-form-item label="折上折">
          <el-checkbox v-model="detail.isCoverDiscount" :true-label="1" :false-label="0" label="允许与活动共同生效"></el-checkbox>
        </el-form-item>
        <el-form-item label="特价叠加">
          <el-checkbox v-model="detail.isCoverBargain" :true-label="1" :false-label="0" label="不与特价叠加使用"></el-checkbox>
        </el-form-item>
        <el-form-item label="优惠券类型"> 
          <el-radio-group v-model="detail.type">
            <el-radio :label="0">通用券（一个券码）</el-radio>
            <el-radio :label="1">私人券（每人单独）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券号码">
          <el-input v-model="detail.couponNo" placeholder="不与特价叠加使用"></el-input>
          <span>(优惠券编码生成后自动加前缀。<span>注意:只能使用英文及数字</span>)</span>
        </el-form-item>
        <el-form-item label="首单限制">
          <el-radio-group v-model="detail.firstOrderType">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">首次下单</el-radio>
            <el-radio :label="2">首次支付</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="条件类型">
          <el-radio-group v-model="detail.conditionType">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">首次下单</el-radio>
            <el-radio :label="2">品牌</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券规则"> 
        </el-form-item>
        <el-form-item label="优惠券状态">
          <el-radio-group v-model="detail.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio> 
          </el-radio-group>
        </el-form-item>
        <el-form-item label="前台列表是否显示" prop="isShow">
          <el-radio-group v-model="detail.isShow">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio> 
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="detail.description" type="textarea" placeholder="请输入活动描述"></el-input>
        </el-form-item> 
      </el-form>
    </div>
    <div class="pageSaveBtn">
      <el-button @click="$NavgitorTo('/share')">取消</el-button>
      <el-button type="primary" @click="Save">保存</el-button>
    </div>
  </div>
</template> 
<script>
import { get, getShare, edit, add } from "@/api/yxStorePromotionsSharing";
export default {
  data() {
    return {
       detail:{}
    };
  }, 
  created() {
    if (this.$route.query.hasOwnProperty("id")) {
      this.id = this.$route.query.id;
    } 
  },
  methods: { 
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
.box {
  margin-bottom: 20px;
  padding: 16px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;      
} 
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
</style>  