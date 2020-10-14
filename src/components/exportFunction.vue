<template>
  <div>
    <el-dialog
      title="导出订单"
      width="40%"
      :visible="showExport"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="CloseDialog"
    >
      <el-radio-group
        v-model="checkOrder"
        text-color="#34395d"
        fill="#34395d"
        @change="ChangeExportOrderSelect"
      >
        <el-radio
          :label="item.id"
          v-for="(item, index) in exportList"
          :key="item.id"
          style="width: 100%; margin: 10px 0"
        >
          {{ item.label }}
          <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-form-item
              label="导出到邮箱"
              v-if="index == showExportSelect"
              label-width="100px"
              style="margin:10px;"
              prop="email"
            >
              <el-input style="width:300px;" v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-form> -->
        </el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CloseDialog">取 消</el-button>
        <el-button type="submit" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import qs from "qs";
import { downloadFile } from "@/utils/index";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    requestUrl: {
      type: String,
      default: "",
    },
    exportParams: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    show: function (newVal, oldVal) {
      this.showExport = newVal;
    },
    exportParams: {
      handler: function (val) {
        this.params = val;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    // 校验规则
    var email = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (
        !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
          value
        )
      ) {
        callback(new Error("邮箱格式错误请重新输入"));
      } else {
        this.emailSuccess = true;
        callback();
      }
    };
    return {
      showExportSelect: 99,
      checkOrder: 1,
      rules: {
        // 校验规则
        email: [{ validator: email, trigger: "blur" }],
      },
      ruleForm: { email: "" },
      showExport: this.show,
      exportList: "",
      url: this.requestUrl,
      params: this.exportParams,
    };
  },
  created() {
    this.exportList = [
      {
        id: 1,
        label: "导出选中",
      },
      {
        id: 2,
        label: "导出所有",
      }, 
    ];
  },
  methods: { 
    // 关闭dialog框
    CloseDialog: function (e) { 
      this.showExport = false;
      this.$emit("CloseDialog", false);
    },
    // 导出
    submitForm: function () {
      // 判断导出类型  1为导出选中   2为导出全部
      if (this.checkOrder == 1) { 
        // 检测是否选中导出订单
        if (this.params.hasOwnProperty("listContent")) {  
          this.params.listContent = JSON.stringify(this.params.listContent)   // 特殊处理（后台需要）
          request({
            url: this.url + "?" + qs.stringify(this.params, { indices: false }), // { indices: false }
            method: "get",
            responseType: "blob",
          }).then((result) => {
            this.downloadFile(
              result,
              "数据",
              "xlsx"
            );
          });
        } else {
          this.$message({
            message: "请选择需要导出的数据",
            type: "warning",
          });
        }
      } else {
        delete this.params['listContent']
        let params = {
          listContent: "",
          ...this.params,
        }; 
        request({
          url: this.url + "?" + qs.stringify(params, { indices: false }), //
          method: "get",
          responseType: "blob",
        }).then((result) => {
          this.downloadFile(
            result,
            "数据",
            "xlsx"
          );
        });
      } 
    },
    downloadFile, // 组件方法
    // 改变导出类型（暂时无用）
    ChangeExportOrderSelect: function (e) { 
      // if (!this.tableSelect) {
      //   this.btnDisabled = false;
      // }
      // if (e == 2 || e == 4) {
      //   this.showExportSelect = e - 1;
      // } else {
      //   this.showExportSelect = 99;
      // }
    },
  },
};
</script>