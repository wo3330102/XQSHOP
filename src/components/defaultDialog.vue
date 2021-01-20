<template>
  <div>
    <el-dialog
      :title="title"
      width="40%"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
    <slot/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      default: "提示",
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
  },
  computed: {
     
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  created() {
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },
    confirm() {
      this.$emit("toConfirm");
    }
  },
};
</script>