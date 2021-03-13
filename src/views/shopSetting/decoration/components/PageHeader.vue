<template>
  <h1
    class="page-header"
    v-show="param.showNotice"
    :style="{
      background: param.backColor,
      'font-style': fontStyle ? fontStyle : 'normal',
      'font-weight': fontWeight ? fontWeight : 'normal',
    }"
  >
    <a :style="{ color: param.textColor }" :href="param.link">
      <span>{{ content }}</span>
    </a>
  </h1>
</template>
<script>
import { isEmpty, isJSON } from "@/utils/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      fontWeight: "",
      fontStyle: "",
      content: "",
    };
  },
  computed: {
    ...mapState("head", ["param"]),
  },
  watch: {
    "param.title": function (val) { 
      this.getTitleObj(val);
    },
  },
  created() {
      console.log(...mapState())
    this.getTitleObj(this.param);
  },
  methods: {
    getTitleObj(val) {
      let { fontWeight, fontStyle, content } = isJSON(val)
        ? JSON.parse(val)
        : {};
      this.fontWeight = fontWeight;
      this.fontStyle = fontStyle;
      this.content = content;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-header {
  width: 100%;
  text-align: center;
  font-size: 20px;
  a {
    display: block;
    line-height: normal;
    color: #fff;
    font-size: 24px;
    padding: 10px 30px;
    width: 100%;
  }
}
</style>