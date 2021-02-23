<template>
<!-- :action="url + '/api/upload'"
:headers="{Authorization: token}" -->
<!-- url: localStorage.getItem("uploadUrl"),
token: localStorage.getItem("token"), -->
<!-- :on-success="handleSuccess"
:before-upload="beforeUpload" -->
    <div class="">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          :action="url + '/api/upload'"
          :headers="{Authorization: token}"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
            <div class="upload-file" >
              <div class="upload-file-item">
                <div class="upload-img" v-if="imageUrl">
                  <img :src="imageUrl" class="avatar">
                  <span class="upload-img-oper">
                    <i class="iconfont iconshangchuan"></i>
                    <i class="iconfont iconshanchu" @click.stop="handleRemove"></i>
                  </span>
                  <div class="upload-bj"></div>
                </div>
                <div class="upload-file-box" v-else>
                  <i slot="default" class="el-icon-plus avatar-uploader-icon"></i>
                  <p>上传图片</p>
                </div>
              </div>
              <div slot="tip" class="el-upload__tip">建议尺寸 144 x 48px ， ≤8M</div>    
            </div>         
        </el-upload>
    </div>
</template>
<script>
export default {
  props:['value'],
  data() {
    return {
      url: localStorage.getItem("uploadUrl"),
      token: localStorage.getItem("token")
    };
  },
  computed:{
    imageUrl:{
      get(){
        return this.value
      },
      set(val){
        this.$emit('input',val)
      }
    }
  },
  methods: {
    beforeUpload(file) { //上传前设置
      // const isJPG = file.type === 'image/jpeg';
      const isLt8M = file.size / 1024 / 1024 < 8;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt8M) {
        this.$message.error('上传头像图片大小不能超过 8MB!');
      }
      return isLt8M;
    },
    handleSuccess(res, file) {
      this.imageUrl = res.link
    },
    handleRemove(file) {
      this.imageUrl = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader{
  
  .upload-file{
    .upload-file-item{
      width: 216px;
      height: 80px;
      border:1px solid #dcdfe6;
      position: relative;
      .upload-img{
        img{position:absolute;width:100%;height:100%;top:0;left:0;width:100%;height:100%;}
        .upload-img-oper{overflow: hidden;
          position: absolute;left:50%;top:50%;margin:-10px 0 0 -30px;z-index:222;
          i{
            color: #fff;
            margin: 0 3px;
            cursor: pointer;
            font-size: 20px;
            padding: 4px 8px;
            display: inline-block;
          }
        }
        .upload-bj{position:absolute;background: #000;width:100%;height:100%;left:0;top:0;opacity: 0.3;}
        .upload-img-oper,.upload-bj{display: none;}
      }
      .upload-img:hover{.upload-img-oper,.upload-bj{display: block;}}
      .upload-file-box{
        i{font-size:30px;color:#d8d8d8;margin-top:18px;}
        p{color:#606266;
        font-size: 12px;}
      }
    }
    .el-upload__tip{text-align: left;
      color: #999;font-size: 12px;line-height: 16px;
    }
  }
  
}
</style>