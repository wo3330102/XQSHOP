<template>
    <div class="aside-footer">
        <div class="aside-footer-item">
            <h2>添加内动</h2>
            <footerList type="0" />
            <footerList type="1" />
            <footerList type="2" />
        </div>
        <div class="aside-footer-media">
            <h4><span>社交媒体</span><i class="el-icon-caret-bottom"></i></h4>
            <ul class="aside-footer-media-list">
                <!-- <li>
                    <h3>
                        <el-checkbox v-model="checked">Facebook</el-checkbox>
                        <i class="el-icon-warning-outline"></i>
                    </h3>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </li>
                <li>
                    <h3>
                        <el-checkbox v-model="checked">Facebook</el-checkbox>
                        <i class="el-icon-warning-outline"></i>
                    </h3>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </li>
                <li>
                    <h3>
                        <el-checkbox v-model="checked">Facebook</el-checkbox>
                        <i class="el-icon-warning-outline"></i>
                    </h3>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </li>
                <li>
                    <h3>
                        <el-checkbox v-model="checked">Facebook</el-checkbox>
                        <i class="el-icon-warning-outline"></i>
                    </h3>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </li> -->
            </ul>
        </div>
        <div class="aside-footer-other">
            <h2>其他</h2>
            <div class="aside-footer-other-box">
                <!-- <el-checkbox v-model="checked">显示支付渠道图标</el-checkbox> -->
            </div>
        </div>
        <div class="aside-footer-add"><i class="el-icon-circle-plus-outline"></i>添加（3/4）</div>
    </div>
</template>
<script>
import footerList from './FooterList.vue'
export default {
    components:{footerList}
}
</script>
<style lang="scss" scoped>
.aside-footer{
    position: relative;
    overflow-y: scroll;
    h2{
        height: 22px;
        color: #637381;
        line-height: 22px;
        padding: 20px 8px 8px;
        font-size: 14px;
        font-weight: 400;
        border-bottom:1px solid #dcdfe6;
    }
    .aside-footer-media{
        h4{
            display: flex;justify-content: space-between;
            border-top: 1px solid #dcdfe6;
            border-bottom: 1px solid #dcdfe6;
            padding:5px 10px;font-weight:normal;
            background:#fff;
            span{color: #666;
            font-size: 14px;
            cursor: pointer;
            line-height: 30px;
            display: inline-block;}
            i{
            color: #999;
            width: 30px;
            text-align: center;
            font-size: 18px;line-height:30px;
            }
        }
        .aside-footer-media-list{
            background:#fff;
            padding: 0 10px 20px;
            border-bottom: 1px solid #dcdfe6;
            h3{height: 20px;
            color: #637381;
            line-height: 20px;
            padding: 12px 0 8px;
            font-size: 14px;
            font-weight: 400;
                display: flex;justify-content: space-between;
            }
            // li{
            //     span{
                    
            //     }
            // }
        }
    }
    .aside-footer-other{
        .aside-footer-other-box{
            padding: 12px 8px;
            background: #fff;
            border-bottom: 1px solid #dcdfe6;
            color:#34395d;
            /deep/ .el-checkbox{
               color:#34395d; 
            }
        }
    }
    .aside-footer-add{position: fixed;
        bottom: 0;
        width: 240px;
        z-index: 100;
        background: #fff;
        text-align: center;
        height: 40px;
        line-height: 40px;
        color: #273a8a;
        cursor: pointer;
        border-top:1px solid #dcdfe6;
        border-bottom:1px solid #dcdfe6;
        i{font-size:16px;margin-right:4px;}
    }
}
</style>