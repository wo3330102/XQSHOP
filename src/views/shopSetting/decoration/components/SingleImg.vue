<template>
    <div class="single-image">
      <div class="single-image-text">
        <div class="single-img-box">
          <p class="single-img-title" :style="{'color':title.color,'font-style':title.fontStyle?title.fontStyle:'normal','font-weight':title.fontWeight?title.fontWeight:'normal'}">{{title.content}}</p>
          <p class="single-img-describe" :style="{'color':content.color,'font-style':content.fontStyle?content.fontStyle:'normal','font-weight':content.fontWeight?content.fontWeight:'normal'}">
            {{content.content}}
          </p>
        </div>
      </div>
      <div class="single-img-img">
        <img :src="param.imageUrl">
      </div>
    </div>
</template>
<script>
import { isJSON } from "@/utils/index";
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState('imageSingle',['param'])
    },
    data() {
      return {
        title:{
          fontWeight:'normal',
          fontStyle:'normal',
          content:'',
          color:'#fff' 
        },
        content:{
          fontWeight:'normal',
          fontStyle:'normal',
          content:'',
          color:'#fff' 
        }
      }
    },
    watch:{
      'param.imageUrl':function(){
          this.getTitleObj(this.param)
      },
      'param.title':function(){
          this.getTitleObj(this.param)
      },
      'param.content':function(){
          this.getTitleObj(this.param)
      }
    },
    created(){
      this.getTitleObj(this.param)
    },
    methods:{
      getTitleObj(){
          let {title, content} = this.param
          this.title = isJSON(title)?JSON.parse(title):{}
          this.content = isJSON(content)?JSON.parse(content):{}
      }
    }
}
</script>
<style lang="scss" scoped>
.single-image{
  overflow: auto;margin:0 auto;position: relative;
  .single-image-text,.single-img-img{
    box-sizing: border-box;
    overflow: hidden;
    padding-top: 80px;
  }
  .single-image-text{
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    position: absolute;
    width: 48%;
    height: 100%;
    .single-img-box{
      .single-img-title{
        font-size: 20px;
        padding-bottom: 20px;
      }
      .single-img-describe{
        line-height: 20px;
      }
    }
  }
  .single-img-img{
    float: right;
    transition: all .5s;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-left: 50%;
    img{
      max-width: 100%;
      height: auto;
    }
  }
}
</style>