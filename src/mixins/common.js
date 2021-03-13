/**
 * add by qxj 2021-1-16
 */
const commonMixin = {
  data() {
    return {};
  },
  components: {
  },
  filters: {
    // 时间戳转换为时间 —— yyyy/MM/dd
    dataFormat(val) {
      if (!val) return "";
      if (typeof val == "string") {
        val = val.replace(/-/g, "/").replace(/T/g, " "); // 浏览器不识别 -
      }

      function fix(num) {
        return num >= 10 ? num : "0" + num;
      }
      let date = new Date(val),
        year = date.getFullYear(),
        month = fix(date.getMonth() + 1),
        day = fix(date.getDate()),
        hour = fix(date.getHours()),
        minute = fix(date.getMinutes()),
        seconds = fix(date.getSeconds());

      return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + seconds;
    },
  }
};
export default commonMixin;
