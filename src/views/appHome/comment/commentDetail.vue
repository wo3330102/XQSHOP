<template>
  <div class="container">
    <router-link
      to="/comment"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>商品评论</span>
    </router-link>
    <h1>
      <span class="text"> 商品评论 </span>
      <span class="options">
        <el-dropdown @command="ChangeStatus" style="margin-right: 10px">
          <el-button>
            {{ command === 1 ? "开启" : "关闭" }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="command === 0" :command="1"
              >开启</el-dropdown-item
            >
            <el-dropdown-item v-else :command="0">关闭</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          @click="
            showAdd = true;
            addForm.list = templateList;
          "
          >添加评论</el-button
        >
        <el-button type="primary">速卖通导入</el-button>
      </span>
    </h1>
    <div class="product-review-info">
      <div class="product-info">
        <img :src="detail.image" class="product-img" />
        <div class="product-detail">
          <p class="title">
            <a href="/" target="_blank">{{ detail.storeName }}</a>
          </p>
          <div class="comment">
            <el-rate
              v-model="detail.productScore"
              disabled
              text-color="#ff9900"
              class="el-rate"
            >
            </el-rate>
            <span>{{ detail.num }}条评论</span>
          </div>
        </div>
      </div>
      <div class="product-star">
        <div v-for="(item, index) in startProgress" :key="index">
          <span>{{ 5 - index }}星</span>
          <span class="scale"
            ><el-progress
              :percentage="item.percentage"
              :show-text="false"
            ></el-progress
          ></span>
          <span class="num">({{ item.start }})</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="conditions">
        <span
          ><el-checkbox
            :indeterminate="!isCheckAll"
            v-model="isCheckAll"
            @change="CheckAll"
            >全选</el-checkbox
          ></span
        >
        <el-checkbox-group
          v-model="checkedCities"
          @change="
            (e) => {
              requestParams.productScore = e.toString();
            }
          "
        >
          <el-checkbox
            v-for="start in startList"
            :label="start.value"
            :key="start.value"
            >{{ start.label }}</el-checkbox
          >
        </el-checkbox-group>
        <div class="search-box">
          <el-input
            v-model="searchVal"
            placeholder="搜索评论内容"
            @change="Search"
          >
            <el-button slot="append" @click="Search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <table-tem
        :optionList="['显示', '隐藏', '删除']"
        :requestUrl="'api/getYxStoreProductReplyList'"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        :isReflash="isReflash"
        @GetData="ChangeStartProgress"
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
            <!-- 图片 -->
            <span
              v-if="item.prop == 'image' && scope.row.pics"
              class="small-img"
              :style="{
                backgroundImage:
                  'url(' +
                  (scope.row.pics.indexOf(',') > -1
                    ? scope.row.pics.split(',')[0]
                    : scope.row.pics) +
                  ')',
              }"
            >
            </span>
            <!-- 评分 -->
            <template v-else-if="item.prop == 'productScore'">
              <el-rate
                v-model="scope.row.productScore"
                disabled
                text-color="#ff9900"
                style="display: inline-block"
              >
              </el-rate>
            </template>
            <!-- 状态 -->
            <template v-else-if="item.prop == 'isShow'">
              <el-switch
                v-model="scope.row.isShow"
                @click.native.stop="ChangeItemStatus(scope.row)"
                :active-value="1"
                :inactive-value="0"
                active-color="#34395d"
                inactive-color="#dcdfe6"
              ></el-switch>
            </template>
            <!-- 日期 -->
            <span v-else-if="item.prop == 'createTime'">
              {{
                new Date(Number(scope.row.createTime)).toLocaleDateString()
              }}</span
            >
            <!-- 操作 -->
            <template v-else-if="item.prop == 'option'">
              <span class="textBtn" @click="Option(scope.row, 'edit')"
                >编辑</span
              >
              <span class="textBtn" @click="Option(scope.row, 'delete')"
                >删除</span
              >
              <span class="textBtn" @click="Option(scope.row, 'top')"
                >置顶</span
              >
            </template>
            <!-- 原样返回 -->
            <template v-else>
              <span style="margin-right: 9px">{{ scope.row[item.prop] }}</span>
            </template>
          </template>
        </el-table-column>
      </table-tem>
    </div>
    <!-- 编辑评论 -->
    <el-dialog
      title="编辑评论"
      :visible.sync="showEditComment"
      width="760px"
      @closed="fileList = []"
    >
      <el-form :model="form" label-width="60px">
        <el-form-item label="姓名">
          <el-input
            size="medium"
            v-model="form.nickname"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="评分">
          <el-rate v-model="form.productScore"></el-rate>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.createTime"
            type="datetime"
            placeholder="选择日期"
            :value-format="'timestamp'"
            :format="'yyyy/MM/dd HH:mm:ss'"
            :default-value="form.createTime"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item 
          label="SKU" 
        >
          <el-select v-model="form.fictitiousSku" placeholder="请选择SKU">
            <el-option
              v-for="item in skuList"
              :key="item.id"
              :label="item.sku"
              :value="item.sku"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            v-model="form.comment"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="https://admin2.xqkj.top/api/upload"
            :headers="{
              Authorization: token,
            }"
            list-type="picture-card"
            :multiple="true"
            :on-preview="PictureCardPreview"
            :on-remove="RemoveImg"
            :on-change="ChangeImg"
            :limit="limit"
            :file-list="fileList"
            :class="showUpload ? 'hide' : ''"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="showEditComment = false">取消</el-button>
        <el-button type="primary" @click="SaveChangeItemComment"
          >保存</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增评论 -->
    <el-dialog
      title="新增评论"
      :visible.sync="showAdd"
      width="1266px"
      class="addReviewDialog"
    >
      <el-form
        :model="addForm"
        label-width="50px"
        label-position="left"
        style="max-height: 540px; overflow: auto"
        ref="addForm"
        :hide-required-asterisk="true"
      >
        <div
          v-for="(item, index) in addForm.list"
          :key="index"
          class="message-item"
        >
          <div class="flex" style="flex: 1">
            <span
              style="margin: 0px 0px 22px; display: inline-block; width: 30px"
              >{{ index + 1 }}</span
            >
            <el-form-item
              :prop="'list.' + index + '.nickname'"
              label="名称"
              :rules="{
                required: true,
                message: '请输入名称',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="item.nickname"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="评分">
              <el-rate v-model="item.productScore"></el-rate>
            </el-form-item>
            <el-form-item
              :prop="'list.' + index + '.createTime'"
              label="日期"
              :rules="{
                required: true,
                message: '请输入日期',
                trigger: 'blur',
              }"
            >
              <el-date-picker
                v-model="item.createTime"
                type="datetime"
                default-time="12:00:00"
                value-format="yyyy/MM/dd HH:mm:ss"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="内容"
              :prop="'list.' + index + '.comment'"
              :rules="{
                required: true,
                message: '请输入评论内容',
                trigger: 'blur',
              }"
              style="width: 430px"
            >
              <el-input
                v-model="item.comment"
                placeholder="请输入评论内容"
              ></el-input>
            </el-form-item>
            <div class="option" @click="RemoveAdd(index)">
              <i class="el-icon-delete" style="cursor: pointer"></i>
            </div>
          </div>
          <div class="flex">
            <el-form-item
              :prop="'list.' + index + '.fictitiousSku'"
              label="SKU"
              :rules="{
                required: true,
                message: '请选择SKU',
                trigger: 'blur',
              }"
              style="margin: 0 0 0 30px"
            >
              <el-select v-model="item.fictitiousSku" placeholder="请选择SKU">
                <el-option
                  v-for="item in skuList"
                  :key="item.id"
                  :label="item.sku"
                  :value="item.sku"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图片" style="margin: 0 0 0 30px">
              <el-upload
                action="https://admin2.xqkj.top/api/upload"
                :headers="{
                  Authorization: token,
                }"
                list-type="picture-card"
                :multiple="true"
                :on-preview="PictureCardPreview"
                :on-remove="RemoveImg"
                :on-change="
                  (file, fileList) => {
                    ChangeItemImg(file, fileList, index);
                  }
                "
                :limit="limit"
                :file-list="item.fileList"
                :class="item.showUpload ? 'hide' : ''"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog
                :visible.sync="dialogVisible"
                title="查看大图"
                :modal="false"
              >
                <img style="margin: 0 auto" :src="imageUrl" alt />
              </el-dialog>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer">
        <el-button @click="AddFormList" style="float: left">添加</el-button>
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="SubComment('addForm')"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template> 
<script>
import tableTem from "@/components/tableTem";
import {
  getCommentListById,
  getSKUListById,
  editMainStatus,
  editStatus,
  editComment,
  addComment,
  topping,
  del,
} from "@/api/comment";
export default {
  components: {
    tableTem,
  },
  data() {
    return {
      id: "",
      detail: {},
      command: 0,
      token: "",
      startProgress: [],
      isCheckAll: false,
      checkedCities: [],
      startList: [
        {
          value: 5,
          label: "5星",
        },
        {
          value: 4,
          label: "4星",
        },
        {
          value: 3,
          label: "3星",
        },
        {
          value: 2,
          label: "2星",
        },
        {
          value: 1,
          label: "1星",
        },
      ],
      searchVal: "",
      requestParams: {
        page: 0,
        size: 30,
        comment: "",
        sort: "product_score",
        productId: "",
        productScore: "",
        status: 1,
      },
      tableHeader: [
        {
          prop: "nickname",
          label: "姓名",
          width: "120",
        },
        {
          prop: "productScore",
          label: "评分",
          width: "140",
          sortable: true,
          align: "left",
        },
        {
          prop: "comment",
          label: "内容",
          align: "left",
        },
        {
          prop: "image",
          width: "80",
          label: "图片",
        },
        {
          prop: "createTime",
          label: "日期",
          width: "138",
          align: "left",
        },
        {
          prop: "isShow",
          label: "可见性",
          width: "80",
          align: "left",
        },
        {
          prop: "option",
          label: "操作",
          width: "153",
          align: "left",
        },
      ],
      skuList: [],
      isReflash: 0,
      showEditComment: false,
      form: {},
      limit: 5,
      fileList: [],
      showUpload: false,
      dialogVisible: false,
      imageUrl: "",
      showAdd: false,
      addForm: {
        list: [],
      },
      templateList: [
        {
          comment: "",
          createTime: "",
          fictitiousPics: "",
          nickname: "",
          pics: "",
          fileList: [],
          productScore: 5,
          serviceScore: 5,
        },
        {
          comment: "",
          createTime: "",
          fictitiousPics: "",
          nickname: "",
          pics: "",
          fileList: [],
          productScore: 5,
          serviceScore: 5,
        },
        {
          comment: "",
          createTime: "",
          fictitiousPics: "",
          nickname: "",
          pics: "",
          fileList: [],
          productScore: 5,
          serviceScore: 5,
        },
        {
          comment: "",
          createTime: "",
          fictitiousPics: "",
          nickname: "",
          pics: "",
          fileList: [],
          productScore: 5,
          serviceScore: 5,
        },
        {
          comment: "",
          createTime: "",
          fictitiousPics: "",
          nickname: "",
          pics: "",
          fileList: [],
          productScore: 5,
          serviceScore: 5,
        },
      ],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.requestParams.productId = this.$route.query.id;
    this.token = localStorage.getItem("token");
    // 获取SKU
    getSKUListById(this.$route.query.id).then((res) => {
      this.skuList = res.productValue;
    });
  },
  methods: {
    // 控制当前产品评论开关
    ChangeStatus: function (e) {
      console.log(e);
      let par = {
        productId: this.id,
      };
      switch (e) {
        case 1:
          console.log("开启");
          par.isShowReply = 1;
          this.command = e;
          break;
        case 0:
          console.log("关闭");
          par.isShowReply = 0;
          this.command = e;
          break;
      }
      editMainStatus(par).then((res) => {
        console.log(res);
        this.$router.push("/comment");
      });
    },
    // 更新商品星级统计
    ChangeStartProgress: function (res) {
      let arr = [];
      this.detail = res.productInfo;
      this.command = res.productInfo.isShowReply;
      for (let j = 5; j > 0; j--) {
        let item = {};
        let start = "counted" + j;
        let percentage = "percentage" + j;
        item.start = res.starInfo[start];
        item.percentage = res.starInfo[percentage] * 100;
        arr.push(item);
      }
      this.startProgress = arr;
    },
    // 筛选星级
    CheckAll: function (val) {
      console.log(val);
      this.checkedCities = val ? (this.checkedCities = [5, 4, 3, 2, 1]) : [];
      this.requestParams.productScore = this.checkedCities.toString();
    },
    // 搜索
    Search: function () {
      this.requestParams.comment = this.searchVal;
    },
    // 批量修改评论状态
    BatchOption: function (e, selectItem) {
      let arr = [];
      switch (e) {
        case 0:
          selectItem.map((v) => {
            arr.push(v.id);
          });
          editStatus(1, arr).then((res) => {
            this.$message.success("修改成功");
            this.isReflash += 1;
          });
          break;
        case 1:
          selectItem.map((v) => {
            arr.push(v.id);
          });
          editStatus(0, arr).then((res) => {
            this.$message.success("修改成功");
            this.isReflash += 1;
          });
          break;
        case 2:
          selectItem.map((v) => {
            let obj = {
              productId: this.id,
            };
            obj.replyId = v.id;
            arr.push(obj);
          });
          del(arr).then((res) => {
            this.$message.success("删除成功");
            this.isReflash += 1;
          });
          break;
      }
    },
    // 改变单个评论状态
    ChangeItemStatus: function (item) {
      let that = this;
      let par = [item.id];
      let status = item.isShow === 1 ? 1 : 0;
      editStatus(status, par).then((res) => {
        that.$message.success("修改成功");
        this.isReflash += 1;
      });
    },
    // 对单个评论的操作
    Option: function (item, par) {
      let option = par;
      switch (option) {
        case "edit":
          this.fileList = [];
          this.showEditComment = true;
          // 深拷贝，解决点击编辑时表格内当前项评分会立马变成编辑后评分的BUG
          this.form = { ...item };
          this.form.productScore =
            this.form.productScore === 0 ? 1 : this.form.productScore;
          if (item.pics) {
            if (item.pics.indexOf(",") > -1) {
              let arr = [];
              item.pics.split(",").map((i) => {
                let obj = {};
                obj.url = i;
                arr.push(obj);
              });
              this.fileList = arr;
            } else {
              let arr = { url: item.pics };
              this.fileList.push(arr);
            }
          }
          break;
        case "delete":
          let delpar = {
            productId: this.id,
            replyId: item.id,
          };
          del([delpar]).then((res) => {
            this.$message.success("删除成功");
            this.isReflash += 1;
          });
          break;
        case "top":
          let par = [item.id];
          topping(par).then((res) => {
            this.$message.success("置顶成功");
            this.isReflash += 1;
          });
          break;
      }
    },
    // 图片预览
    PictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    ChangeImg(file, fileList, e) {
      fileList.map((i) => {
        if (i.hasOwnProperty("response")) {
          i.url = i.response.link;
        }
      });
      this.fileList = fileList;
      this.showUpload = fileList.length >= this.limit;
    },
    ChangeItemImg(file, fileList, index) {
      console.log(index);
      fileList.map((i) => {
        if (i.hasOwnProperty("response")) {
          i.url = i.response.link;
        }
      });
      this.addForm.list[index].fileList = fileList;
    },
    RemoveImg: function (e) {
      this.fileList.map((v, i) => {
        if (v.uid == e.uid) {
          this.fileList.splice(i, 1);
        }
      });
      this.showUpload = false;
    },
    // 保存对单个评论的修改
    SaveChangeItemComment: function () {
      let arr = [];
      this.fileList.map((i) => {
        arr.push(i.url);
      });
      console.log(arr);
      this.form.pics = arr.toString();
      editComment(this.form).then((res) => {
        this.$message.success("修改成功"); 
        this.showEditComment = false;
        this.isReflash += 1;
      });
    },
    // 添加商品评论项
    AddFormList: function () {
      if (this.addForm.list.length < 10) {
        this.$nextTick(() => {
          this.addForm.list.push({
            comment: "",
            createTime: "",
            fictitiousPics: "",
            nickname: "",
            pics: "",
            fileList: [],
            productScore: 5,
            serviceScore: 5,
          });
        });
      } else {
        this.$message.warning("一次最多添加10条评论");
      }
    },
    // 移除新增评论项
    RemoveAdd: function (index) {
      if (this.addForm.list.length > 1) {
        this.addForm.list.splice(index, 1);
      } else {
        this.$message.warning("一次最少添加1条评论。");
      }
    },
    // 提交新增
    SubComment(formName) {
      let storeId = localStorage.getItem("storeId");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let par = this.addForm.list;
          par.map((i) => {
            let arr = [];
            if (i.fileList) {
              i.fileList.map((v) => {
                arr.push(v.url);
              });
            }
            i.productId = this.id;
            i.storeId = storeId;
            i.pics = arr.toString();
            delete i.fileList;
          });
          addComment(par).then((res) => { 
            this.$message.success("新增成功");
            this.showAdd = false;
            this.isReflash += 1;
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  height: 40px;
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  line-height: 40px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  flex: 1;
}
.product-review-info {
  width: 100%;
  border: 1px solid #ddd;
  padding: 20px 12px;
  margin: 20px auto;
  box-sizing: border-box;
  background: #fff;
  border-radius: 4px;
  .product-info {
    width: 750px;
    display: inline-block;
    .product-img {
      width: 120px;
      height: 120px;
      display: inline-block;
      border: 1px solid #dadde4;
      border-radius: 4px;
    }
    .product-detail {
      display: inline-block;
      width: 445px;
      padding-left: 20px;
      vertical-align: top;
      .title {
        line-height: 20px;
        margin-bottom: 20px;
        a {
          color: #1a1d2c;
          font-size: 14px;
          text-decoration: none;
          &:hover {
            color: #273a8a;
            text-decoration: underline;
          }
        }
      }
      .comment {
        color: #606266;
        font-size: 12px;
        line-height: 20px;
        display: flex;
        span {
          margin-left: 20px;
        }
        .el-rate {
          display: inline-block;
        }
      }
    }
  }
  .product-star {
    width: 300px;
    display: inline-block;
    vertical-align: top;
    & > div {
      margin: 5px 0;
    }
    .scale {
      width: 200px;
      display: inline-block;
      margin: 0 10px;
      height: 6px;
    }
    .num {
      color: #606266;
      min-width: 30px;
      text-align: right;
      display: inline-block;
    }
  }
}
.content {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  background-color: #fff;
  .conditions {
    padding: 9px 12px;
    display: flex;
    // justify-content: space-around;
    border-bottom: 1px solid #f1f1f6;
    flex-wrap: wrap;
    .search-box {
      display: flex;
      flex: 1;
    }
    & > span {
      background: #fff;
      padding: 8px 12px;
      border: 1px solid #dcdfe6;
      margin-right: -5px;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      position: relative;
      cursor: pointer;
      /deep/.el-checkbox__input {
        display: none;
      }
      /deep/.el-checkbox__label {
        padding-left: 0;
      }
    }
    .el-checkbox-group {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 8px 12px;
      margin-right: 20px;
      color: #697c90;
    }
  }
}
.textBtn {
  padding: 0;
  margin-right: 10px;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
}
.addReviewDialog {
  .message-item {
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    flex-wrap: wrap;
    &:last-child {
      padding-bottom: 0;
      border-bottom: transparent;
    }
    .el-form-item {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 20px;
    }
    .option {
      text-align: center;
      width: 40px;
      position: absolute;
      right: 0px;
      top: 20px;
    }
  }
}
.flex {
  display: flex;
  align-items: center;
}
.el-form {
  /*滚动条样式*/
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    margin-right: 2px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background: #d5d5e6;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 6px;
    background: #f5f5f9;
  }
}
/deep/.el-progress-bar__inner {
  background-color: #edbf53;
}
.el-rate {
  line-height: 15px;
  display: inline-block;
}
/deep/.el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin: 0 8px 8px 0;
  float: left;
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 80px;
  height: 80px;
}
/deep/.el-form--label-left .el-form-item__label {
  text-align: right;
}
</style> 
<style>
.hide .el-upload--picture-card {
  display: none !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
</style>