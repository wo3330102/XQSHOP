<template>
  <div class="container">
    <router-link
      to="/homeSwiper"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>首页轮播图</span>
    </router-link>
    <h1>添加轮播图</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <div class="box info">
            <h3 class="title">轮播图名称</h3>
            <div>
              <el-input v-model="detail.name"></el-input>
            </div>
            <h3 class="otherTitle">轮播图跳转地址</h3>
            <div>
              <el-input v-model="detail.url"></el-input>
            </div>
          </div>
          <div class="box image">
            <h3 class="title">轮播图图片</h3>
            <div class="content">
              <el-upload
                :action="url+'/api/upload'"
                :headers="{
                  Authorization: token,
                }"
                list-type="picture-card"
                :on-preview="PictureCardPreview"
                :on-remove="RemoveImg"
                :on-change="ChangeImg"
                :on-success="UploadSuccess"
                :limit="limit"
                :file-list="imageUrl"
                :class="showUpload ? 'hide' : ''"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="imageUrl" alt />
              </el-dialog>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              1.
              轮播图是展示给顾客看的，挑选一张高质量图片，可以提高顾客的点击率。编辑完成后店铺装修中批量选取轮播图及商品即可展现给客户。
            </p>
          </div>
          <div class="box">
            <p class="infoTip">是否显示</p>
            <el-select v-model="detail.status" placeholder="是否显示轮播图">
              <el-option :label="'是'" :value="1"></el-option>
              <el-option :label="'否'" :value="0"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/commodityList')">取消</el-button>
        <el-button @click="Save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template> 
<script> 
import { add,edit } from "@/api/yxSystemGroupData";
export default {
  data() {
    return {
      url:localStorage.getItem('uploadUrl'),
      token: "",
      categotyList: [], // 轮播图列表
      upLoadHeaders: {}, // 上传头部字段
      dialogVisible: false, // 上传图片是否显示
      imageUrl: [], // 图片路径
      showUpload: false, // 是否显示上传按钮
      limit: 1, // 最大上传数
      detail: {
				status:1
			},
      id: "",
    };
  },
  created() {
    let that = this;
    if (this.$route.query.hasOwnProperty("id")) {
      this.id = this.$route.query.id;
      let detail = JSON.parse(localStorage.getItem("swiperDetail"));
      if (detail.map.pic) {
        this.imageUrl = [{ url: detail.map.pic }];
        this.showUpload = true;
      }
			this.detail = detail.map;
			this.detail.groupName = detail.groupName;
			this.detail.id = detail.id
    }
    this.token = localStorage.getItem("token");
  },
  methods: {
    PictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    ChangeImg(file, fileList) {
      this.showUpload = fileList.length >= this.limit;
    },
    UploadSuccess: function (res, file) {
      this.imageUrl = [{ url: res.link }];
    },
    RemoveImg: function (e) {
      this.showUpload = false;
    },
    // 保存
    Save: function () {
      let imageUrl = "";
      let that = this; 
			if(this.detail.name == ''){
				this.$message.error('请填写轮播图名称');
				return false
			} 
			if (this.imageUrl.length > 0) {
        imageUrl = this.imageUrl[0].url;
      } else {
        this.$message.error('请上传轮播图');
				return false
			} 
      if (this.id) {
        edit(this.detail).then((res) => {
          this.$message.success("修改成功");
          setTimeout(function () {
            that.$router.push("/homeSwiper");
          }, 200);
        });
      } else {
				let par = {
        groupName: "xqshop_home_banner",
        imageArr: [ imageUrl ],
        name: that.detail.name,
        pic: imageUrl,
        sort: 0,
        status: that.detail.status, 
        uniapp_url: "",
        url: that.detail.url,
        wxapp_url: "",
      };
        add(par).then((res) => {
          this.$message.success("新增成功");
          setTimeout(function () {
            that.$router.push("/homeSwiper");
          }, 200);
        });
      }
    },
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
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.box {
  margin-bottom: 20px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  & > .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
  }
  & > .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  & > .otherTitle {
    margin: 20px 0 12px;
    font-size: 14px;
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
  }
}
/deep/ .el-icon-delete-solid {
  font-size: 18px;
  line-height: 38px;
  cursor: pointer;
}
/deep/.inputSelect {
  width: 50px;
  padding: 0 -10px;
  /deep/.el-input--suffix {
    width: 55px !important;
  } 
}
/deep/.el-input-group__append {
  background: #fff;
}
.search-conditions {
  display: flex;
  justify-content: space-between;
}
/deep/.el-dialog {
  width: 640px;
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