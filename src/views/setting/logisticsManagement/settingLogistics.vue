<template>
  <div class="container">
    <router-link
      :to="{
        path:'/commonLogistics',
        query:{
          status:status,
          id:tempId, 
        }
      }"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>物流管理</span>
    </router-link>
    <h1>添加物流方案</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 活动名称 -->
          <div class="box p20">
            <h3 class="title">
              物流运输区域名称
              <span class="tip"> （客户看不见这个名称） </span>
              <span class="tip"> {{ logisticsName.length }}/30 字符 </span>
            </h3>
            <div>
              <el-input
                v-model="logisticsName"
                maxlength="30"
                placeholder="最多输入30个字符"
              ></el-input>
            </div>
          </div>
          <!-- 配送国家/地区 -->
          <div class="box country p0">
            <h3 class="title express-title">
              配送国家/地区<template v-if="selectContryList.length > 0"
                >({{ selectContryList.length }})</template
              >
              <span class="option" @click="showCountry = true"
                >添加国家/地区</span
              >
            </h3>
            <div class="detail">
              <p class="desc p20" v-if="selectContryList.length == 0">
                添加适合这个物流方案的目的国
              </p>
              <ul class="countryList" :class="isShowAll ? '' : 'showPart'">
                <li v-for="(item, index) in selectContryList" :key="index">
                  <span class="img">
                    <img
                      :src="item.logo"
                      style="border: 1px solid rgb(244, 244, 244)"
                    />
                  </span>
                  <span class="name">
                    {{ item.mergerName }}
                    <span style="margin-left: 4px; color: rgb(193, 194, 204)"
                      >( {{ item.name }} )</span
                    >
                  </span>
                  <span class="option" @click="DelCountry(item, index)">
                    <i class="el-icon-delete-solid"></i>
                  </span>
                </li>
              </ul>
              <div
                class="loadMore"
                v-show="selectContryList.length > 5"
                @click="isShowAll = !isShowAll"
              >
                <span class="l-more">{{ isShowAll ? "收起" : "展开" }}</span>
                <span
                  :class="
                    isShowAll ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                  "
                ></span>
              </div>
            </div>
          </div>
          <!-- 基于订单金额设置物流 -->
          <div class="box p0">
            <h3 class="title express-title">
              基于订单金额设置物流
              <span
                class="option"
                @click="
                  () => {
                    form.type = 1;
                    showLogisticsPlan = true;
                  }
                "
                >添加条件</span
              >
            </h3>
            <div class="desc">
              <p class="desc p20" v-if="moneyOflogisticsList.length == 0">
                基于客户的订单金额来设置物流选项
              </p>
              <div v-else class="detail showMore">
                <table>
                  <thead>
                    <tr>
                      <th>物流选项名称</th>
                      <th>订单金额范围</th>
                      <th>物流费用</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in moneyOflogisticsList"
                      :key="index"
                    >
                      <td>{{ item.name }}</td>
                      <td>
                        ${{ item.minUnit }}
                        {{
                          item.maxUnitl == "" ? "and up" : "- " + item.maxUnitl
                        }}
                      </td>
                      <td>
                        {{ item.price == 0 ? "免运费" : "$" + item.price }}
                      </td>
                      <td>
                        <span
                          class="el-icon-edit-outline"
                          style="margin-right: 14px"
                        ></span>
                        <span class="el-icon-delete"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- 基于商品重量设置物流 -->
          <div class="box p0">
            <h3 class="title express-title">
              基于商品重量设置物流
              <span
                class="option"
                @click="
                  () => {
                    logisticsPlanType = 2;
                    showLogisticsPlan = true;
                  }
                "
                >添加条件</span
              >
            </h3>
            <div class="desc">
              <p class="desc p20" v-if="weightOflogisticsList.length == 0">
                基于客户的订单商品重量来设置物流选项
              </p>
              <div v-else class="detail showMore">
                <table>
                  <thead>
                    <tr>
                      <th>物流选项名称</th>
                      <th>订单金额范围</th>
                      <th>物流费用</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in weightOflogisticsList"
                      :key="index"
                    >
                      <td>{{ item.name }}</td>
                      <td>
                        ${{ item.minUnit }}
                        {{
                          Number(item.maxUnitl) === 0
                            ? "and up"
                            : "- " + item.maxUnitl
                        }}
                      </td>
                      <td>
                        {{ item.price == 0 ? "免运费" : "$" + item.price }}
                      </td>
                      <td>
                        <span
                          class="el-icon-edit-outline"
                          style="margin-right: 14px"
                        ></span>
                        <span class="el-icon-delete"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">
              1.设置店铺可支持的物流配送地区，以及在订单结账页中，提供可供客户选择的物流配送方案。
            </p>
            <p class="infoContent" style="margin-top: 14px">
              2.没有设置物流配送的国家，客户下单时将无法选择这些国家地区。
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button>取消</el-button>
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
      <el-dialog
        title="添加国家/地区"
        :visible.sync="showCountry"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-input
          v-model="searchCountry"
          placeholder="搜索国家/地区"
          @change="SearchCountry"
        ></el-input>
        <div class="countryList search-country" v-show="searchCountry == ''">
          <el-collapse>
            <el-collapse-item
              :name="index"
              :title="item.mergerName"
              v-for="(item, index) in countryList"
              :key="index"
            >
              <p
                style="
                  padding: 8px 0px;
                  border-bottom: 1px solid rgb(244, 244, 244);
                "
              >
                <el-checkbox
                  :indeterminate="
                    item.childrenList.length > 0 &&
                    item.childrenList.length < item.contries.length
                  "
                  v-model="item.isCheck"
                  @change="
                    (e) => {
                      CheckAll(e, index);
                    }
                  "
                  >All Countries of {{ item.mergerName }} （{{
                    item.name
                  }}所有国家）</el-checkbox
                >
              </p>
              <el-collapse style="padding-left: 18px">
                <el-collapse-item
                  v-for="(v, i) in item.contries"
                  :key="i"
                  :class="v.children ? '' : 'no-provinces-item'"
                  :disabled="!v.children"
                >
                  <template slot="title">
                    <el-checkbox
                      v-model="v.isCheck"
                      :indeterminate="
                        v.childrenList.length > 0 &&
                        v.childrenList.length < v.children.length
                      "
                      @change="
                        (e) => {
                          CheckCity(e, index, i);
                        }
                      "
                      :label="v.id"
                    >
                      <span style="padding: 0px 4px 0px 2px"
                        ><img
                          src="https://static-theme.xshoppy.shop/country_image/CHN.jpg"
                          style="border: 1px solid rgb(244, 244, 244)"
                      /></span>
                      {{ v.mergerName + "(" + v.name + ")" }}
                    </el-checkbox>
                  </template>
                  <template v-if="v.children">
                    <el-checkbox-group
                      v-model="v.childrenList"
                      @change="
                        (e) => {
                          handleCheckedCitiesChange(e, index, i);
                        }
                      "
                      style="margin-left: 10px !important"
                    >
                      <el-checkbox
                        v-for="city in v.children"
                        :label="city.city_id"
                        :key="city.id"
                        style="
                          padding: 8px 0px;
                          margin-left: 26px;
                          border-bottom: 1px solid rgb(244, 244, 244);
                          width: 100%;
                        "
                        >{{
                          city.mergerName + "(" + city.name + ")"
                        }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </template>
                </el-collapse-item>
              </el-collapse>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="countryList search-country" v-show="searchCountry">
          <div>
            <el-checkbox
              v-model="searchAllCheck"
              @change="SearchAllCheck"
              label="全选"
            ></el-checkbox>
          </div>
          <el-checkbox-group v-model="searchCheckList">
            <el-checkbox
              :label="item.mergerName"
              v-for="(item, index) in selectContryList"
              :key="index"
            >
              <span style="padding: 0px 4px 0px 2px"
                ><img
                  src="https://static-theme.xshoppy.shop/country_image/CHN.jpg"
                  style="border: 1px solid rgb(244, 244, 244)"
              /></span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div slot="footer">
          <el-button @click="showCountry = false">取消</el-button>
          <el-button type="primary" @click="CheckSelectItem">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="showLogisticsPlan"
        :title="
          logisticsPlanType == 1 ? '添加订单金额条件' : '添加订单商品重量条件'
        "
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form :model="form" class="form">
          <el-form-item>
            <h4>
              物流选项名称
              <span
                >({{
                  logisticsPlanType == 1
                    ? "客户在结账时将会看到这个名称"
                    : "客户在结账选择物流方式时，将会看到这个名称"
                }})</span
              >
              <span style="float: right">{{ form.name.length }}/100</span>
            </h4>
            <el-autocomplete
              v-model="form.name"
              :fetch-suggestions="QuerySearch"
              placeholder="Standard shipping"
              maxlength="100"
              style="width: 100%"
            ></el-autocomplete>
          </el-form-item>
          <div style="margin-top: -10px">
            <h4>订单金额范围</h4>
            <div style="display: flex; justify-content: space-between">
              <el-form-item>
                <el-input
                  style="flex: 1"
                  placeholder="0.00"
                  v-model="form.minUnit"
                  @blur="form.minUnit = $IsNaN(form.minUnit)"
                >
                  <template slot="prepend"
                    >最低{{
                      logisticsPlanType == 1 ? "金额" : "重量"
                    }}</template
                  >
                  <template v-if="logisticsPlanType === 1" slot="prefix"
                    >$</template
                  >
                  <template v-else slot="suffix">g</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  style="flex: 1"
                  placeholder="不限制"
                  v-model="form.maxUnitl"
                  @blur="form.maxUnitl = $IsNaN(form.maxUnitl)"
                >
                  <template slot="prepend"
                    >最高{{
                      logisticsPlanType == 1 ? "金额" : "重量"
                    }}</template
                  >
                  <template v-if="logisticsPlanType === 1" slot="prefix"
                    >$</template
                  >
                  <template v-else slot="suffix">g</template>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item
            prop="price"
            :rules="{
              required: true,
              message: '请输入物流费用,为0免运费',
              trigger: 'blur',
            }"
          >
            <h4>物流费用</h4>
            <el-input
              v-model="form.price"
              placeholder="请输入物流费用"
              maxlength="100"
              @blur="form.price = $IsNaN(form.price)"
            >
              <template slot="prefix">$</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="CloseLogisticsPlan">取消</el-button>
          <el-button type="primary" @click="CloseLogisticsPlan('pass')"
            >确定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template> 
<script>
import { getCitys, save, createShipping } from "@/api/logistics";
export default {
  data() {
    return {
      id: "", // 物流方案的Id (可以为空)
      tempId: 0, // 物流模板Id  （最外层的Id）
      logisticsName: "",
      selectContryList: [], // 选中的国家/地区
      moneyOflogisticsList: [], // 物流根据金额设置运费列表
      weightOflogisticsList: [], // 物流根据重量设置运费列表
      showAllSelectContryList: false, // 是否全部显示已选中的国家列表
      searchCountry: "", //搜索地区
      countryList: [], // 配送国家/地区
      searchCountryList: [], // 搜索结果列表
      searchCheckList: [], // 选中的搜索列表的值
      showCountry: false, // 是否显示国家/地区选择对话框
      isNotSearch: true, // 对话框界面是否为搜索界面
      showLogisticsPlan: false, // 是否显示物流方案对话框
      logisticsPlanType: 1, // 物流方案类型  1为订单金额  2为商品重量
      form: {
        name: "",
        minUnit: "",
        maxUnitl: "",
        price: "",
        isFree: "",
        type: 1,
        name: "",
      },
      isShowAll: false,
    };
  },
  created() {
    // 判断是否为新增
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    this.tempId = this.$route.query.tempId;
    getCitys().then((res) => {
      res.map((item) => {
        item.childrenList = [];
        item.isCheck = false;
        item.contries.map((v) => {
          v.childrenList = [];
          v.isCheck = false;
        });
      });
      this.countryList = res;
    });
  },
  methods: {
    // 区域全选（全选亚洲，非洲等国家）
    CheckAll: function (e, index) {
      let plate = this.countryList[index]; // 确认全选的洲
      plate.isCheck = e;
      if (e) {
        // 遍历洲下的国家
        plate.contries.map((item) => {
          item.isCheck = e;
          // 判断是否存在城市
          if (item.children && item.children.length > 0) {
            item.children.map((v) => {
              item.childrenList.push(v.city_id);
            });
          }
        });
        plate.childrenList = [...plate.contries];
      } else {
        plate.contries.map((item) => {
          item.isCheck = e;
          // 判断是否存在城市
          item.childrenList = [];
        });
        plate.childrenList = [];
      }
    },
    // 国家全选(点击国家前面的多选框)
    CheckCity: function (e, index, i) {
      let country = this.countryList[index].contries[i]; //确认选中的国家
      let plate = this.countryList[index]; //确认选中的洲
      if (e) {
        // 判断当前国家是否在外层列表中，无则添加（用于判断当前地区是否全选）
        if (plate.childrenList.indexOf(country) == -1) {
          plate.childrenList.push(country);
        }
        // 判断当前地区下的国家是否全选
        plate.childrenList.length == plate.contries.length
          ? (plate.isCheck = true)
          : (plate.isCheck = false);
        if (country.children) {
          country.children.map((v) => {
            country.childrenList.push(v.city_id);
          });
        }
        country.isCheck = true;
      } else {
        console.log(plate);
        plate.childrenList.splice(plate.childrenList.indexOf(country), 1);
        plate.isCheck = false;
        country.childrenList = [];
      }
    },
    // 单个城市选择
    handleCheckedCitiesChange: function (e, index, i) {
      let country = this.countryList[index].contries[i]; // 选中的国家
      let plate = this.countryList[index]; // 选中的大洲
      // 判断是否存在选择的城市
      if (e.length > 0) {
        // 判断当前国家是否被大洲选中（未选中则添加，已有则更新）
        if (plate.childrenList.indexOf(country) == -1) {
          plate.childrenList.push(country);
        } else {
          plate.childrenList[plate.childrenList.indexOf(country)] = country;
        }

        // 判断所选国家下的城市是否全选
        e.length == country.children.length
          ? (country.isCheck = true)
          : (country.isCheck = false);
      } else {
        // 未选择城市
        plate.childrenList.splice(plate.childrenList.indexOf(country), 1);
        if (plate.childrenList.length == 0) {
          plate.isCheck = false;
        } else {
          plate.isCheck = true;
        }
      }
      plate.childrenList.length == plate.contries.length
        ? (plate.isCheck = true)
        : (plate.isCheck = false);
    },
    // 全选搜索后的国家
    SearchAllCheck: function () {},
    // 确认选中国家
    CheckSelectItem: function () {
      this.selectContryList = [];
      this.countryList.map((item) => {
        if (item.isCheck) {
          this.selectContryList = this.selectContryList.concat(item.contries);
        } else if (item.childrenList.length > 0) {
          this.selectContryList = this.selectContryList.concat(
            item.childrenList
          );
        }
      });
      this.showCountry = false;
    },
    // 删除配送国家
    DelCountry: function (item, index) {
      this.countryList.map((v) => {
        if (v.isCheck) {
          if (v.id == item.id) {
            v.isCheck = false;
          } else {
            v.childrenList.map((val, inx) => {
              if (val.id == item.id) {
                v.childrenList.splice(v.childrenList.indexOf(val), 1);
              }
            });
          }
        } else if (v.childrenList.length > 0) {
          console.log(v);
          console.log(item);
          v.childrenList.map((val, inx) => {
            if (val.city_id == item.city_id) {
              val.isCheck = false;
              val.childrenList = [];
              v.childrenList.splice(v.childrenList.indexOf(val), 1);
            }
          });
        }
      });
      this.selectContryList.splice(index, 1);
    },
    // 关闭物流方案对话框
    CloseLogisticsPlan: function (e) {
      if (e == "pass") {
        this.form.isFree = this.form.price == 0 ? 1 : 0;
        if (this.logisticsPlanType == 1) {
          this.form.type = 1;
          this.moneyOflogisticsList.push({ ...this.form });
        } else {
          this.form.type = 2;
          this.weightOflogisticsList.push({ ...this.form });
          console.log(this.weightOflogisticsList);
        }
      }
      this.form = {
        name: "",
        minUnit: "",
        maxUnitl: "",
        price: "",
        isFree: 0,
        type: 1,
      };
      this.showLogisticsPlan = false;
    },
    // 保存物流方案
    Save: function () {
      if (this.logisticsName == "") {
        this.$message.warning("请输入物流运输区域名称！");
        return false;
      }
      let freeInfo = this.moneyOflogisticsList.concat(
        this.weightOflogisticsList
      );
      if (this.selectContryList == 0) {
        this.$message.warning("配送国家/地区至少有一项！");
        return false;
      }
      if (freeInfo.length == 0) {
        this.$message.warning("至少设置一项物流方案选择条件!");
        return false;
      }
      let arr = [];
      this.countryList.map((item) => {
        // item为各大洲   判断当前大洲下是否有选择数据
        if (item.childrenList.length > 0) {
          let arr1 = [];
          item.childrenList.map((country) => {
            let arr2 = [],
              obj = {};
            // country为各个国家  判断当前国家下是否有城市选择
            if (country.childrenList.length > 0) {
              country.childrenList.map((city) => {
                // city为选中的城市的city_id;
                country.children.map((val) => {
                  if (val.city_id == city) {
                    arr2.push({
                      city_id: val.city_id,
                      provincesName: val.name,
                    });
                  }
                });
              });
              obj = {
                provincess: arr2,
                city_id: country.city_id,
                name: country.name,
              };
            } else if (country.isCheck) {
              obj = {
                provincess: [],
                city_id: country.city_id,
                name: country.name,
              };
            }
            arr1.push(obj);
          });
          arr.push({
            city_id: item.cityId,
            countriess: arr1,
            regionPlate: item.name,
          });
        }
      });

      let data = {
        freeInfo: freeInfo,
        shippingName: this.logisticsName,
        regionInfo: arr,
        tempId: this.tempId,
      };
      // 判断是否为第一次创建通用物流
      if (this.$route.query.init) {
        createShipping({ name: "通用", type: 0 }).then((res) => {
          console.log(res);
        });
      } else {
        if (this.id) {
          data.id = this.id;
        }
        save(data).then((res) => {
          console.log(res);
        });
      }
    },
    // 设置辅助输入列表(用法参照elementUI)
    QuerySearch: function (queryString, cb) {
      var restaurants = [];
      if (this.logisticsPlanType == 1) {
        restaurants = this.moneyOflogisticsList;
      } else {
        restaurants = this.weightOflogisticsList;
      }
      var results = queryString
        ? restaurants.filter(CreateFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
      function CreateFilter(queryString) {
        return (restaurant) => {
          return (
            restaurant.value
              .toLowerCase()
              .indexOf(queryString.toLowerCase()) === 0
          );
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 0;
}
h1 {
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.box {
  margin-bottom: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
  .express-title {
    line-height: 60px;
    height: 60px;
    padding: 0 20px !important;
    border-bottom: 1px solid #dcdfe6;
  }
  & > .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    .option {
      font-size: 14px;
      color: #273a8a;
      float: right;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 400;
    }
    .title-des {
      color: #808598;
      font-size: 12px;
    }
    .tip {
      color: #c1c2cc;
      font-size: 14px;
      font-weight: 400;
      &:last-child {
        float: right;
      }
    }
  }
  .desc {
    color: #c1c2cc;
  }
  .columns {
    display: flex;
    margin-bottom: 12px;
  }
  & > .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
  }
  .dec {
    font-size: 12px;
    color: #5e7185;
    line-height: 20px;
    margin: 8px 0 20px 24px;
  }
  .time-group {
    line-height: normal;
    display: inline-table;
    width: 294px;
    margin-right: 20px;
    border-collapse: separate;
    border-spacing: 0;
    .time-desc {
      color: #909399;
      vertical-align: middle;
      display: table-cell;
      border: 1px solid #dcdfe6;
      border-right: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding: 0 8px;
      white-space: nowrap;
      width: 1px;
    }
    /deep/ .el-input__inner {
      padding-left: 26px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    /deep/ .el-input__prefix {
      left: 0;
    }
  }
  .content {
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    padding: 10px;
    & > .title {
      color: #1a1d2c;
      text-align: center;
      font-size: 16px;
      line-height: 22px;
      margin: 10px 0 20px;
    }
    .info {
      color: #212741;
      p {
        display: flex;
        .title {
          width: 56px;
          margin-right: 14px;
        }
        .text {
          flex: 1;
        }
        .en {
          color: #5e7185;
        }
      }
    }
  }
}
.detail {
  transition: all 1s ease;
  height: auto;
  table {
    box-sizing: border-box;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    color: #1a1d2c;
    thead {
      th {
        text-align: left;
        border-bottom: 1px solid #dcdfe6;
      }
    }
    tbody {
      tr {
        padding: 0 10px;
        color: #697c90;
        border-bottom: 1px solid #f4f4f4;
        td {
          &:last-child {
            border-bottom: none;
            padding-right: 21px;
            text-align: right;
            span {
              font-size: 16px;
              cursor: pointer;
            }
          }
        }
      }
    }
    td,
    th {
      padding: 12px 12px 12px 20px;
      &:nth-child(3) {
        text-align: right;
      }
    }
  }
  .loadMore {
    padding: 0 20px;
    text-align: center;
    height: 44px;
    line-height: 44px;
    border-top: 1px solid #dcdfe6;
    background: #ffffff;
    .l-more {
      line-height: 44px;
      color: #909399;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
.search-country {
  width: 100%;
  height: 500px;
  overflow: hidden auto;
  margin-top: 20px;
}
.country {
  .countryList {
    list-style: none;
    transition: all 1s ease;
    height: auto;
    padding-left: 20px;
    li {
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #f4f4f4;
      display: flex;
      padding-right: 20px;
      .img {
        padding-right: 8px;
      }
      .name {
        flex: 1;
      }
      .option > i {
        cursor: pointer;
        color: #5e7185;
      }
      &:last-child {
        border: none;
      }
    }
  }
  .showPart {
    max-height: 200px;
  }
}
.p20 {
  padding: 20px !important;
}
.p0 {
  padding: 0 !important;
}
.form {
  h4 {
    color: #1a1d2c;
    width: 100%;
    line-height: 36px;
    span {
      color: #c8c9d2;
      font-weight: 400;
    }
  }
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
</style>  
<style>
.el-tree-node__content {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid rgb(244, 244, 244);
}
.no-provinces-item .el-collapse-item__arrow {
  display: none;
}
.el-input__prefix {
  line-height: 36px;
  left: 13px;
}
.el-input__suffix {
  line-height: 36px;
  right: 13px;
}
</style>