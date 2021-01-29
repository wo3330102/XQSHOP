<template>
  <div class="container">
    <h1>应用中心</h1>
    <div class="app-list">
      <div class="app-list-item" v-for="item in list" :key="item.id">
        <div class="app-list-item-content" @click="$NavgitorTo(item.url)">
          <img class="app-pic" :src="item.image" />
          <div class="app-detail">
            <div class="app-detail-name">{{ item.title }}</div>
            <div class="app-detail-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let url = "http://ddd.xshoppy.shop";
export default { 
  data() {
    return {
      list: [
        {
          id: 0,
          image: url+"/static/img/applications/productReview.png",
          title: "商品评论",
          desc:
            "可以为商品添加评论，为买家提供购买后的反馈，以提高商品的加购率。",
          url: "/comment",
        },
        {
          id: 1,
          image: url+"/static/img/applications/shippingInsurance.png",
          title: "运费险",
          desc:
            "帮助卖家收取额外费用，同时可以增加买家的信任。此功能在各大平台都有很好的表现",
          url: "/shippingInsurance",
        },
        {
          id: 2,
          image: url+"/static/img/applications/recommendProducts.png",
          title: "推荐商品",
          desc:
            "随机推荐建议的商品，使其展示在其他商品的详情页中，以提高客单价和转化。",
          url: "/recommend",
        }, 
      ],
    };
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
}
.app-list {
  display: inline-block;
  vertical-align: top;
  .app-list-item {
    display: inline-block;
    align-items: center;
    width: 350px;
    height: 120px;
    border-radius: 4px;
    margin-right: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    cursor: pointer;
    background: #fff;
    transition: all 0.3s;
    box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
      0 0 0 1px rgba(67, 67, 145, 0.05);
    &:hover {
      box-shadow: 0 2px 6px 3px #cfcfe3, 0 1px 3px 0 rgba(35, 35, 112, 0.2),
        0 0 0 1px rgba(67, 67, 145, 0.05);
      .app-detail-name {
        color: #2c4295 !important;
      }
    }
    .app-list-item-content {
      display: flex;
      padding: 20px;
      position: relative;
      img {
        width: 72px;
        height: 72px;
      }
      .app-detail {
        flex: 1;
        margin-left: 20px;
        .app-detail-name {
          color: #1a1d2c;
          font-weight: 500;
          font-size: 14px;
        }
        .app-detail-desc {
          color: #8b9dae;
          font-weight: 400;
          font-size: 12px;
          margin-top: 3px;
        }
      }
    }
  }
}
</style>