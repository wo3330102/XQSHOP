<template>
  <div>
    <el-dialog
      :title="title"
      width="40%"
      :visible.sync="visible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="cancel"
      @close="cancel"
    >
    <slot/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
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
    show: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    // 监听show，visible 随着show变化而变化
    show: {
      immediate: true,
      handler(show) {
        this.visible = show;
      }
    }
  },
  computed: {
     
  },
  data() {
    return {
      visible: this.show
    };
  },
  created() {
  },
  methods: {
    cancel() {
      this.$emit('update:show', false);  // 子组件更新弹框隐藏
    },
    confirm() {
      this.$emit('update:show', false);  // 子组件更新弹框隐藏
    }
  },
};
</script>