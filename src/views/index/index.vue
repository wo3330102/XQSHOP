<template>
  <div class="container">
    <h1>欢迎来到XQShopy,{{ userName }}</h1>
    <template v-if="failInit">
      <em>请按照以下开店引导进行开店。</em>
      <div class="stepList">
        <div v-for="item in stepList" :key="item.id">
          <div class="text">
            <img :src="item.icon" />
            {{ item.title }}
          </div>
          <div class="des">{{ item.tip }}</div>
          <div class="option">
            <el-button @click="toDetail(item.url)">{{ item.btn }}</el-button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 头部仪表盘 -->
      <div class="flex" style="margin-bottom:40px">
        <dl class="overview">
          <dt class="icon">
            <img
              src="data:image/png;base64,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"
            />
          </dt>
          <dd class="value">
            ${{ navData.totalMoney ? navData.totalMoney : "0.00" }}
          </dd>
          <dd class="desc">总销售额</dd>
        </dl>
        <dl class="overview">
          <dt class="icon">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAFMN540AAAAAXNSR0IArs4c6QAACFpJREFUSA2NVglwU9cVPZK+9tWSF3kRDl4wJmyxIQxxIEAwLgUKGAi0CSmkwAA1DUOZaZrSBtoMIUNhCKSFhqTZCsmMcRggiyHFmG1YHRbjBWwgxmALybYkS160/r73xP/IDjB9M+/f/d633HvfB/oNCaWLLvh4CjtddyGlCB0/fv4Rg300XLWXchg3Ka/4IEPoh9rTaR49h/nhavf9CaiXYOCiJei4UAbOkmBG0tzfixYMsRWvKV9ymefpfGHTfj4/P18uaLBlKOK7ipqDXaBT9WIhOkbMDIw9Us9iMIWspVvgqb4sGCHrNyW4t3cvo9m61ebhaRKpPGxSwMMV/tyT+vLL3Jkpg5lMtMqZtdYrEg8QyXOfHM1MNtgaE/keBDOH4+s1rwXsFR8rqVwiHFisFT28kLcT0pDPC6nhaKyM4b66ekjdVy7hVt1ttHx3CDV/I6f0YAQd99+UZCx+m89euVrgMUjd0hVLPdeuhJXp5/oI+xBK49BMs3mMwVLwy4qx5TW8deqyTqogi9VaX8Mr/Hrb5mnzF5fnbfxifa8nNE6uTtF5W2ouxOoJODupgi8v8brMbHgPfwtnYz2Scoej6ewJWLJz4bHfw6BVa3F++UJenZZS4Tx2/MasotxVpaWlYTF17ny1AeYxGdClLmSO+XAI3ut16KyvRVrxfFRv+APSf7dKCMo2zFHKe7MBA4rfEgUUkcg4GIYMY5PSphHPIOh2Q24y4fbWLV2Ux7LDc7kKV3e/DofuG8p75DA+PZIZIhKGvXy3jiqxyK4rP8CQa4Dv/WNIXDQNAVcHGt7fSmA7FHEWZJesgSF7MKuZ29u33xC8sz2bR8w8PfrDPc8JzP7Q39GOq+vWYMCyZbi8tEhMxz5XRY1+tv3IIk6TclLS5t7R3e0M9HcUS4teKPOV8h+Tm86cackOd6CyqqaBU6icNw5sLYg1iMXZnrOXv/ue1ZZZrLKmp+XMTof07GFMmrsymyhmB3Qa3nXuzPeexqNTYg0pLkmasNg9cvMOIzo7EbzZiKb/fgtT7lC0k0MM+nsxZN3bkMrlaL1wrOb2lr/f8TuduwPeuv3M2DxqTnD0zk/ZCvp7jqU7O5pJqOgu69/8Y6Xr4v6JUj4Y8lOlXm8prm1YIer3OuxwHK8gGVbDeH6HU5Sp02xjKMHJFAofgVrn0WrEFwwRFVSJVtApjECbE8qkREYq4xP3UIST6fX3CUyyzforEzzu43c4oE5NA2cy4vaH65ZSPU6u1d0hcHiz5z9o23YSz7z1LzTu3AY/iSRTqTFgwUJobOkIOB3M0FleLvrnZErVdUJN91bUwlAwmAmyVvRtG5TpOn0aKS/Nh7emxsGUyEcqUcqrKTFk9kbY8qLlKAhjIWeKY6Rl3NhlAp/jFPILHRfPQpPTDGdlE2zFa9G46z14G0n+8zz02TnIWv46+FCI9cLada8dEI0bP15fW7TSB2W6BO5zdsanyv2HhNyx0MQFWbSeSaf3N42BdfLDTiEo8KEg2s6dQtrCV8geJScFPoUsZebNmyc7WH49S8qFe7iQtsti0XT1ZKW/Ggnxf7HOnp2qy82F/74Do3LHKT4YJQnGOngivvhEa0LW1JLAr0952Us2t+x6tzZlTPTxfKLlk4V9yllQXVhxv+j8js1fc2oNySE9cmYvQELlXgzJSEV1xnh0ylTwezxQ6A24umd3rWHCxBW65MyqI0VW1hcFP0+CLPDITWW/ai778rOEgvEy7cAsxJkt0Cu1sAx6WCaPchIKB2FvqIU/Lg4KYtO874sgyZB6SSj8b14iOxzwXat7lB3lscDxz84P5//jI3bhgqKvoZ7UDAdNShqkCiV6WlsgIbQqMYmpBEg7lRtN5GXo20DJm4TB77wjuAHv93vbTxyvay3b1xvpdC7obqtrpUIWjGSQ2F5Dvjb4Gi+SlHYh5GlHZx3pIiQt1SmpYlBqSHfYPyjly8nxh320t0SHRKnUxxdOeXbYrg/GGwsm0eplg/W8SJi0MJ5XOU4cQ/e9Ixi0dgYatn8HZZwV1hdLmOKVN1Yj4O6AlOxaaYmHwpIAZUIiwRNgGpkvLkpptYI0V2h07CV7EAaI9PSQooy0CwwWmKyynfRJY+ILk+C5FkHTJ/UkcQbC8PTzgh5GbNom4k9CpFIOdz//DLpBObBMmgRlYrRd3t27B9bCqS/Zv9nJzFlgmVbf0tvakqFKSoYqfQQiKiN4kjh+uxsBexXb0aOChXt70GtvJe+vmd031TEOGwkuPg6J06eLJn67HXwgUHV59S/Enxp2x3KN5mbPg5eh4cC7CD/vQevVg3C1nRGD+m41wt/eJjqjCG3J2qcyxKCUp45PYEdNcWG07ivlc3+7okigKWQ7lqqVdX6y8qdeXQJUh+D79Ba0hkyYY45al5EVa/dYXDNgIHkXHj5nvtpacHrDoaOTc8X7pcZsx1JOUdVrb2HOzAPzEJ+ZB/OAwXAeOkKyIvLYIFRAf3k6b9QhEogWBs32IGkuwmj7/nAgc8nGOQItQLZjdY/jrPO+D+Hublzf8QZ0mUmwTsuDNouIpdHy5sNh8od3A6r4RFZKggN6v3TGDkm0PaDj5EmobWk7KydKQrFyijOvNaX/9AU97i6ZRoO0GQugMGWg45Sb/C5OFvVpzRoG5fYJKgpjkF5nK8iDyTju8+c8t3b9+afPLJGKvVqrHZqEOENl0sTCEGmbwaDXEwi6XOGAxxUJuF36cJcvOdTdpY8EQwqJTCqTqlQku6KnIeFk4DQ6qGw2WCZOgCo5BfavyiDTG1c2bi6J1k/M4igqBu7H/79JY/6sTLnJsBLdgckyvTaNJJIuEgo6EgqLZl4tmfHD4xz9D3rkLboU3q+fAAAAAElFTkSuQmCC"
            />
          </dt>
          <dd class="value">{{ navData.orderNum ? navData.orderNum : "0" }}</dd>
          <dd class="desc">订单数量</dd>
        </dl>
        <dl class="overview">
          <dt class="icon">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAFMN540AAAAAXNSR0IArs4c6QAABWpJREFUSA3NVn1QVFUUP+/xAPlQEBsVNAUUCWsqrU00lXQMohlxJJl0pij/QSdl5EsEswZRaFBkcxGSzI/RSoohyNFpkEZrBBHtY3RMRhHJD1Sk+NxkWXb3ds5b7tu3Cys05Uxn5r577jm/c8+959x77gMYIO3GjX9wXujNK2BEV6rCmIDSjSjYwbUiMjv5wGNTCgFkSuaMbE+DUenJICCRiUyGHVq5F+fszo8ZkNl18eSau6clZCYk7CYEeUlDheL5C30pzJvfI1vPjGoQ5GWQpSxx+KiX6aCyDV1sLCTt2bLlxFyNxny6rq5OkePyq8iFpbuH1iYTKcW+nQXLcBQpI93d5E6bHAmZcVPNksUClbIEPxZRhGsnZ8Jr0STxFJVQcYCtF1rFc7d+v2gT2DiPTcnrxEVFuuctOLeask5+dwPH5WrZsPx2VlLiilsrwWY0/9k+sDHGzldXs9zMzFj1DDzbOYYdBbGMwVNqpXviWhA8PNQi0He2g7evn4jHgEmoScEAbkbDweRmjduZ41+DZ/8H4OllTYjFzGiTguQmSa6DraySvl06mdHI37UOsBQQjSbT9w7SYYcldbWfE4jvOQiXTuEdllKPfVNfXFsTTkBuzI2ExPkLm3JfXxokudgO3A/XG6Go5kz68YbLygHnBo79LBSkTAeo+HTrVn1WQsIVzJdywRzBfByIzHOGfG00pu1GWWyckmNi8hIT9RzIe0oV0UKm1V4yGFkzMw+VM4B0nc4rODTUHLd+vbIfeTnNWVlk2GGdx/l3xbp14uaVEb0cQcYfTvQYM6xhc8NFOHUgBN5a/WAUrk0OtHgna1sNn8lZX5i2AAy3V4H/ZOt5SowO6ias9ISH19D1A5Vln3wEMwMPw5JI+4xOCuj3JONH3GRSD00+76dn4MnMwz0LrUNDnEvRUL79YkldTbVzmFPNKdKISZXlSnVyClUpBmrSzySihDd09P4VHRUaNlmFccqG5GbPQ2UnAeTTcuH2rc9MzBL/yrSQsc6sqMiF63bFtPb01HOMctRqm2/oLra0PBzv7f1qoN84rgeT2QwZJ441Lzu4bxwaXlUUj5tZjg62YFuCTT5eeMGEpb6+ycxsvsqvXU9HB6suLWWFGRm925KSylA+7BW2P3bWbSzA7iVsWnyAVqCfXJxomlVl/R6vr4PYA/tA9PFRixW+v68PDuTk9N9payvevndvkqJQMbwUkCgQ2xsGrbYCjCwBL12+9QEaujQIzus1uLq7w5rsbIrQhqkBAe9dv3kzPm///lIcK8RDQg+QLxauxczImtDVDAXhjJGU8+EMASeOaMHQWe4aOLbqaFrcy+fVQNrxC5Ik6fU5O7/EkIaplY/kxcGOjQYDHP04HQTjKdCEWyB4AkBwFM0yGjzP3tQkLnvxcOG3P8WThBwvRqcTGfwDp2TpYg1W290W+EqXCkFTLkHwdDwcs0k5mDTzRkNTY9sq1CiO6VF+ZzDUuaTXaIQ1i56F8RN6wG8cpZLB1csgN7LCF1+W0f+fABYQREY9u9+iV8IkSaIoCsDGEnSkFLcgAuIgYqRwGYfXh3nvScvkRqLJYjH1mUxyIePCx9GTD/LF56ZEaecWFjx2xwM+rH/c6JQXEOGZif6H6jekxmPk+aL+k54K9Zzduw5fvn/vXZxQyaiS7Ad6fWXRudoaL1e3cM2TU2zV+l+4Lz575lrMof1v3u5oL3Cchu/YTj55zJiQ+dNCStMiFs162j9gSIydgWrw2727LP/H07/WNDWuvNPd3ahS2bEjmVR4e7ZmOT7gqyf5+MzwdHP1dXeR5CLdZzZ1PTT2d7Z0dV3DBB088suFCpxdCaedp//L4G/dxjNl9Ak5kgAAAABJRU5ErkJggg=="
            />
          </dt>
          <dd class="value">{{ navData.pie ? navData.pie : "0.00" }}%</dd>
          <dd class="desc">转换率</dd>
        </dl>
        <dl class="overview">
          <dt class="icon">
            <img
              src="data:image/png;base64,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"
            />
          </dt>
          <dd class="value">{{ navData.people ? navData.people : "0" }}</dd>
          <dd class="desc">访客数量</dd>
        </dl>
        <dl class="overview">
          <dt class="icon">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAFMN540AAAAAXNSR0IArs4c6QAABgFJREFUSA2NVntslEUQn+9K73q9uwLtHX3TUgIC9pFSGjDQFKtYBAI1GAGB8Eg1SERQTBSJ/KFRIhElYkENkQKSqlGhhIcERdGGoMUCbaWWWChgS1/U0tfdld597m/vdu+7611xkv1md+Y3O7O7s7MfkY+eRVfBJy9viWq5VUltOxswJJpOpDr6+9Vp36iqR0KUnjSjSA4gzBcaGvtciUtlJOC6UdMW6aRWdOLHZ6tR4eG9GHO36AgT9EEXn1ZsjHXwAZRawlgYiBlimMCD5iZEVSvMLW5HX7x36GHb8vIGt82cifgT/BSawausHybGYnr4EzLq+LnU3fjxGg8Igdyqr+fxoY8WZrSUY+GblWM7KXniRG65tGIz59aCtXPRCQNSUO6mMm6pjDD0jWBK1+3SV9Rc+sDjf9ZSbqkOOk28g8+Cyelq4rwNqslo8kUmtezgsM7HUlO7hEwsRYwpzGguT1zx3oIxhevlKQ10NlPtxkl2t70nmQHvCrA0hlH2oZ6FXNHTSbqzn5MaN57U6U8JLOdNZVudd75918gGMrx8vj+lnXK/xOrB80ZZ+Q6IPTQmp3diJhEaPy/l6jm5n9yN9/NQTq52SIa4NH46Mmyd0dI/9VA3wiFjsY0WrlpJf9XUUXXmKlK92wudy95Ll1Zasli3WhpDwWhK/OI3qhKXvWPwDH1fGF0pjmt1O/vihDTQGPJp6pYtlQIgeNrevd03urpGijG4TD+t0Ctfxngha+Gs3WRtCAV6trK130rfVWfUxyRKcNvpPe6mL147zkJfJIWsozWeEjt/U23ymg+1Mi0WlxRjqRdHpWCjhKHy2xHSlb9PxJJFS+yceQZqZUxgKRcJgOIjCBcM1UnowFFthDH3rLem5EGA873gK1g8YQ7ve8svAm/O5wPPjaMyCvjdQmIEEm4w8jyAeMpxY2d7oxNKZFQwwgUJoGaMufG9S6f5eSMVnXa7H25+qv/NGrjbBP1X+Ihtz2TX8Qq7lqRUfEmZ1QdoUsZkOnbgENn3tQMnqWplFO51JATCmHSGyJaph/tiJSpIp+On/e7GkrXA8BLLwwbO7eyPq1puasUFCEYoAlpDYKRnYYC3wDVCbxqdNYfU6GRy11dQjv4+Ha+rzWCYWoEDR2n0I5vZPPj3unU+WRavraTU1fJ1+hRBPDNl4iNJSVfnpKREcaBO59px/vw9h8sVozVEf0jYgQAvJoOl8Nvu+wOPR8RPcKIMGcaMiwDW2XbD4Wy57nLcuWbQhRt+cNl73mTiGtZkgQQukIZzbNVFmGpi528cHVe0xYAU+D+Ew2o5ut3ZenxXFzvAAmZzNZhdMMcxOoPpz7HFu23WR9fILAhm/CAZnrf2M5+2sQAeZlj5zsAu0HEmK2AXsj5rNmpXiGSPKN1AqPxIeBCuX/0fleRYvduvqHOl5sPr9fMJuAwzmLhaqLSOw9hL3J1R0hApqiYc2o5spe/qaslg5A+JsJMc1zc/MpLcm8pCBoAXtmb9uH51cABJx0uYdiufGZld6JJOfz/Kr/SJxoaQTuEdAaHkZdUcJBTcYKSPTqCR2XMHmW6J0GsdJxhsqb6nraVBbqsAD8dxBAqzCUXeWyB/urSOL3bXnO0ThmrBWl68bl+7JkQhOTDlpQfJzWxCUXf1j5hbPrtax+cGOm7+ipeQG5tH84q5vHgboewGCwCyGYpCwPDqaokO6hdzYm6mPCcA2uSCTGHZfHTMvJcKh/xR9P5L+M8hsZ34u5rCXioW4HCEYtt28qPTLLuLGE4WlUDHYg4r67SnvrjfbZ29WrsrQv9Afnv/y2rriV2YH3d4SBEJ5VhMHMN2gD2qytzE5dv1o3KLSGS9AAiOV6+rslxtOvz6fbaw79kKceB+RUNgwYe8Elol699lE5Q9mZY266StKdp1fTdV/PIPNff0UHOv5x1LMJspwWKhWUlJFGbTKU/ExvSdaWwshW3AXH7DB60YYL1Jr6/fMXt2yvqcnGHxn1y+7H7h1CkcDaqNA8ahaNiJAozwGi1mbQJrMkm8GMxzg7WvWfP/E/ECAtl/6zKBtZ8sMeoAAAAASUVORK5CYII="
            />
          </dt>
          <dd class="value">{{ navData.monitor ? navData.monitor : "0" }}</dd>
          <dd class="desc">实时访客</dd>
        </dl>
      </div>
      <!-- 内容 -->
      <el-row style="margin-left: -10px; margin-right: -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <!-- 通知板块 -->
          <div
            class="jh-notify-warpper"
            v-for="(item, index) in noticeList"
            :key="item.id"
          >
            <div class="jh-notify-container notify-info">
              <i
                class="jh-notify-close-icon el-icon-circle-close"
                @click="removeNotice(index)"
              ></i>
              <div class="box">
                <div class="title">{{ item.title }}</div>
                <div class="content" v-html="item.desc"></div>
              </div>
              <div class="footer">
                <el-button size="small">查看详情</el-button>
              </div>
            </div>
          </div>
          <!-- 邮件板块 -->
          <div class="box email-box">
            <h3 class="title">
              弃单邮件
              <el-tooltip
                class="item"
                effect="dark"
                content="不包含今天的数据"
                placement="bottom"
              >
                <span class="option">最近30天</span>
              </el-tooltip>
            </h3>
            <p class="info">
              <span
                >最近30天，您的店铺已发送弃单召回邮件32封，邮件打开率34.38%。成功召回了0个订单，召回率0.00%，其它店铺平均激活率为7%。</span
              >
              <span
                >当前激活率较低，建议您<span class="text-info"
                  >调整发送时间</span
                >或邮件营销策略</span
              >
            </p>
            <div class="flex mail-info">
              <dl style="flex: 1">
                <dt>已发送未付款邮件</dt>
                <dd>32</dd>
              </dl>
              <dl style="flex: 1">
                <dt>成功激活订单</dt>
                <dd>0</dd>
              </dl>
              <dl style="flex: 1">
                <dt>订单激活率</dt>
                <dd>0.00%</dd>
              </dl>
              <dl style="flex: 1.2">
                <dt>其他店铺平均订单激活率</dt>
                <dd>7%</dd>
              </dl>
            </div>
          </div>
          <!-- 邮件板块 -->
          <div class="box email-box">
            <h3 class="title">
              未发货订单
              <el-tooltip
                class="item"
                effect="dark"
                content="不包含今天的数据"
                placement="bottom"
              >
                <span class="option">最近30天</span>
              </el-tooltip>
            </h3>
            <p class="info">
              <span
                >当前您有15订单未发货，最近30天平均发货周期为86小时，发货效率会直接影响到买家客诉率。</span
              >
            </p>
            <div class="flex mail-info">
              <dl style="flex: 1">
                <dt>未发货订单</dt>
                <dd>32</dd>
              </dl>
              <dl style="flex: 1">
                <dt>平均发货周期</dt>
                <dd>0</dd>
              </dl> 
            </div>
          </div>
          <!-- 邮件板块 -->
          <div class="box email-box">
            <h3 class="title">
              运费险
              <el-tooltip
                class="item"
                effect="dark"
                content="不包含今天的数据"
                placement="bottom"
              >
                <span class="option">最近30天</span>
              </el-tooltip>
            </h3> 
            <div class="flex mail-info">
              <dl style="flex: 1">
                <dt>运费险订单</dt>
                <dd>32</dd>
              </dl>
              <dl style="flex: 1">
                <dt>顾客购买运费险比例</dt>
                <dd>100%</dd>
              </dl> 
              <dl style="flex: 1">
                <dt>增加利润</dt>
                <dd>$2.76</dd>
              </dl> 
            </div>
          </div>
        </el-col>
        <el-col
          :span="16"
          style="padding-left: 10px; padding-right: 10px"
        ></el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "admin",
      failInit: false,
      stepList: [
        {
          icon:
            "data:image/png;base64,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",
          title: "添加商品",
          tip:
            "您可以手动添加一个商品，或者进入到商品管理页面批量导入shopify的商品。",
          btn: "添加",
          url: "/commodityList",
        },
        {
          icon:
            "data:image/png;base64,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",
          title: "装修店铺",
          tip: "选择适合您的模板，打造个性店铺。",
          btn: "装修",
          url: "/themeShop",
        },
        {
          icon:
            "data:image/png;base64,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",
          title: "设置物流方式",
          tip:
            "设置店铺可支持的物流配送地区，以及在订单结账页中，提供可供客户选择的物流配送方案。",
          btn: "设置",
          url: "/logisticsManagement",
        },
        {
          icon:
            "data:image/png;base64,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",
          title: "绑定域名",
          tip: "绑定合适的域名可以让您的店铺更具品牌效应。",
          btn: "设置",
          url: "/setting",
        },
        {
          icon:
            "data:image/png;base64,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",
          title: "收款方式",
          tip:
            "设置店铺用于收款的账户，可以同时支持PayPal和信用卡收款方式供顾客选择。",
          btn: "设置",
          url: "/setting",
        },
      ],
      navData: {
        totalMoney: "",
        orderNum: 0,
        pie: 0,
        people: 0,
        monitor: 0,
      },
      noticeList: [
        {
          title: "通知1",
          desc:
            "<p>尊敬的用户：</p><p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>",
        },
        {
          title: "通知2",
          desc:
            "<p>尊敬的用户：</p><p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>",
        },
      ],
    };
  },
  methods: {
    toDetail: function (url) {
      this.$store.commit("setUrl", url);
      this.$NavgitorTo(url);
    },
    removeNotice: function (index) {
      console.log(index);
      this.noticeList.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 400;
  line-height: 40px;
  justify-items: center;
  display: flex;
}
em {
  font-size: 12px;
  color: rgb(94, 113, 133);
}
.stepList {
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: 100%;
    padding: 20px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2);
    border-radius: 4px;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      width: 300px;
      img {
        vertical-align: middle;
        margin-right: 8px;
      }
    }
    .des {
      flex: 1;
      color: #5e7185;
    }
    .option {
      width: 80px;
      text-align: center;
    }
  }
}
.flex {
  display: flex;
  align-items: center; 
  justify-content: space-between;
}
.overview {
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.12),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  border-radius: 4px;
  background: #fff;
  text-align: center;
  padding: 30px 0;
  height: 120px;
  flex: 0 0 210px;
  position: relative;
  .icon {
    margin-bottom: 22px;
  }
  .value {
    color: #25313e;
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 14px;
    line-height: 32px;
  }
  .desc {
    color: #6e7e8c;
    height: 16px;
    line-height: 16px;
  }
}
.jh-notify-warpper {
  margin-bottom: 12px;
  padding-left: 3px;
  box-sizing: border-box;
  .jh-notify-container {
    position: relative;
    border-radius: 4px;
    background-color: #fff;
    .box {
      margin-bottom: 20px;
      padding: 12px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
        0 0 0 1px rgba(67, 67, 145, 0.05);
      overflow: hidden;
      .title {
        font-weight: 600;
        color: #212b36;
        font-size: 14px;
        padding-bottom: 12px;
      }
      .content {
        margin-bottom: 12px;
        line-height: 20px;
        width: 600px;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        overflow: hidden;
        max-height: 40px;
      }
    }
    i {
      font-size: 20px;
      color: #999;
      opacity: 1;
      position: absolute;
      background: #fff;
      border-radius: 20px;
      top: -8px;
      right: -6px;
      z-index: 999;
      display: none;
      cursor: pointer;
    }
  }
  .notify-info {
    box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.12),
      0 0 0 1px rgba(67, 67, 145, 0.05), -4px 0 0 0 #273a8a;
    color: #212b36;
  }
  .footer {
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 18px;
    height: 100%;
  }

  &:hover {
    i {
      display: block !important;
    }
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
  .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    .option {
      font-size: 14px;
      float: right;
      font-weight: 400;
      color: rgb(151, 149, 157);
      text-decoration: none;
      cursor: default;
    }
    .tooltip-text {
      position: relative;
    }
  }
}
.flex {
  display: flex;
  align-items: center;
}
.email-box {
  .mail-info {
    margin-top: 16px;
    padding: 20px 0 10px;
    border-top: 1px solid #ebedf6;
    dl {
      text-align: center;
      dt {
        color: #212b36;
        font-size: 12px;
        margin-bottom: 20px;
      }
      dd {
        font-size: 20px;
        color: #4d5384;
      }
      &:last-child{
        border-left: 1px solid #ebedf6;
      }
    }
  }
}
</style>