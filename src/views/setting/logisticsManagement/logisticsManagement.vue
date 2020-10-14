<template>
  <div class="container">
    <router-link
      to="/setting"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>设置</span>
    </router-link>
    <h1 class="title">
      <span>
        物流管理
        <i
          class="el-icon-video-camera-solid"
          @click="showVideo = true"
          style="margin-left:7px;cursor:pointer;"
        ></i>
      </span>
    </h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 活动名称 -->
          <div class="box">
            <h3 class="title">
              物流配送方案 
            </h3>
            <div class="content" style="text-align: center;">
              <template v-if="logisticsList == 0">
                <h4 class="title" style="    font-weight: normal;">暂未设置物流配送方案</h4>
                <p class="des">没有可选物流配送方案，客户无法完成订单支付</p>
                <el-button type="primary" style="margin-bottom: 80px;" @click="$NavgitorTo('/settingLogistics')">设置物流</el-button>
              </template>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box-right">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">1.设置店铺可支持的物流配送地区，以及在订单结账页中，提供可供客户选择的物流配送方案。</p>
            <p class="infoContent" style="margin-top: 14px;">2.没有设置物流配送的国家或地区，客户下单时将无法选择这些国家或地区。</p>
            <!-- <p class="infoContent">2、完成第一单支付交易后，则不可修改币种。</p>
            <p class="infoContent">1、设置店铺的联系方式，平台和顾客将通过此信息与你联系。</p>-->
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="showVideo" center>
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="showVideo"
        :options="playerOptions"
        v-if="showVideo"
      ></video-player>
    </el-dialog>
  </div>
</template> 
<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
export default {
  components: {
    videoPlayer,
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    var shopName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("店铺名为必填项"));
      }
    };
    return {
      showVideo: false,
      formData: {
        shopName: "",
        userEmail: "",
        KeFuEmail: "",
      },
      rules: {
        shopName: [{ validator: shopName, trigger: "blur" }],
        userEmail: [{ validator: checkEmail, trigger: "blur" }],
        KeFuEmail: [{ validator: checkEmail, trigger: "blur" }],
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src:
              "https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo-transcode-cae/50463985_c1fbf4ebadf2ed65ff3b723f5f5ce28f_0_cae.mp4", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      logisticsList: [],
    };
  },
  methods: {
    ValidateFrom: function (boolean, item) {
      console.log(boolean, item);
    },
  },
  updated() {
    console.log("更新");
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  justify-items: center;
  display: flex;
  .title {
    flex: 1;
    line-height: 40px;
  }
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
  overflow: hidden;
  &>.title { 
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
  }
  .content {
    .title {
      margin-top: 80px;
    line-height: 22px;
    height: 20px;
    font-size: 16px;
    }
    .des {
      color: #5e7185;
      font-size: 12px;
      margin: 12px 0 28px;
    }
  }
}
.box-right {
  margin-bottom: 20px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
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
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
.search-conditions {
  display: flex;
  justify-content: space-between;
}
/deep/.el-input-group__prepend {
  background: #fff;
}
/deep/ .el-icon-delete-solid {
  font-size: 18px;
  line-height: 38px;
  cursor: pointer;
}
/deep/.el-input-group__append {
  background: #fff;
}
</style>  