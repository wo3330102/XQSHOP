<template>
  <div class="">
    <el-select
        v-model="list[0].value"
        placeholder="选择关系"
        @visible-change="BeforeChange"
        clearable
      >
        <el-option
          v-for="(v, i) in option"
          :key="i"
          :label="v.label"
          :value="v.id"
          v-show="v.show"
        ></el-option>
      </el-select>
      <el-select
        v-model="list[1].value"
        placeholder="选择关系"
        @visible-change="BeforeChange"
        clearable
      >
        <el-option
          v-for="(v, i) in option"
          :key="i"
          :label="v.label"
          :value="v.id"
          v-show="v.show"
        ></el-option>
      </el-select>
      <el-select
        v-model="list[2].value"
        placeholder="选择关系"
        @visible-change="BeforeChange"
        clearable
      >
        <el-option
          v-for="(v, i) in option"
          :key="i"
          :label="v.label"
          :value="v.id"
          v-show="v.show"
        ></el-option>
      </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: [
        {
          id: 1,
          label: "父亲",
          show: true,
        },
        {
          id: 2,
          label: "母亲",
          show: true,
        },
        {
          id: 3,
          label: "兄弟",
          show: true,
        },
        {
          id: 4,
          label: "姐妹",
          show: true,
        },
      ],
      list: [
        {
          id: 1,
          value: "",
        },
        {
          id: 2,
          value: "",
        },
        {
          id: 3,
          value: "",
        },
        {
          id: 4,
          value: "",
        },
      ],
    };
  },
  methods: {
    BeforeChange() {
      let arr = [];
      this.list.map((i) => {
        if (i.value) {
          arr.push(i.value);
        }
      });
      this.option.map((i) => {
        i.show = true;
      });
      if (arr.length > 0) {
        arr.map((j) => {
          this.option.map((i) => {
            if (j == i.id) {
              i.show = false;
            }
          });
        });
      }
      this.Save();
    },
    Save() {
      let par = {};
      let key = "value";
      for (let i in this.list) { 
        if (i == '0') { 
          par[key] = "1";
        } else {
          par[key + i] = "1";
        }
      } 
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
