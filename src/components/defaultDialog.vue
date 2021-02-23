<template>
  <el-dialog
    :title="title"
    :width="setWidth"
    :visible.sync="dialogVisible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
  > 
    <div slot="title" v-if="title.indexOf('新增限量优惠商品')>-1">
      <slot name="DIYtitle"></slot>
    </div>
    <slot />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button :disabled="disabled" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "DeaultDialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    setWidth: {
      type: String,
      default: "640px",
    },
    disabled:{
      type:Boolean,
      default:false,
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
  },
  computed: {},
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
    confirm() {
      this.$emit("toConfirm");
    },
  },
};
</script>