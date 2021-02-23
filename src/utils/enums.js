export default {
  // 首页:home, 商品列表:goodslist,商品详情:goodsdetails
  // 商品分类:goodsclass,购物车:cart,订单页:order
  // 结果页:results,异常页:error,搜索页:search
  pages() {
    return [
      { label: "首页", value: "home" },
      { label: "商品列表", value: "goodslist" },
      { label: "商品详情", value: "goodsdetails" },
      { label: "商品分类", value: "goodsclass" },
      { label: "购物车", value: "cart" },
      { label: "订单页", value: "order" },
      { label: "结果页", value: "results" },
      { label: "异常页", value: "error" },
      { label: "搜索页", value: "search" },
    ];
  },
  layouts(){
	  return [
		  {label: "三栏", value: 1},
		  {label: "四栏", value: 2}
	  ]
  },
  showButtons() {
    return [
      { label: "显示", value: 1 },
      { label: "不显示", value: 0 }
    ];
  },
  componentNames(){
	  return [
		{label:'PageHeaderComp',value:1},
		{label:'CarouselComp',value:2},
		{label:'ShopClassComp',value:3},
		{label:'SingleImgComp',value:4},
		{label:'TextComponentComp',value:5},
		{label:'SubscriptionComp',value:6},
		{label:'PageFooterComp',value:7}
	  ]
  },
  //全部模块
  templateModuleType() {
    return [
      { label: "页头", value: 0 },
      { label: "轮播图", value: 1 },
      { label: "首页商品分类", value: 2 },
      { label: "精选商品", value: 3 },
      { label: "单个商品", value: 4 },
      { label: "单图", value: 5 },
      { label: "文本", value: 6 },
      { label: "订阅", value: 7 },
      { label: "页脚", value: 8 },
      { label: "商品列表", value: 10 },
      { label: "商品详情", value: 11 },
      { label: "商品分类", value: 12 },
      { label: "购物车", value: 13 },
      { label: "订单页", value: 14 },
      { label: "结果页", value: 16 },
      { label: "异常页", value: 17 },
      { label: "搜索页", value: 18 },
    ];
  },
  addModule() {
    return [
      { label: "轮播图", value: 1 },
      { label: "首页商品分类", value: 2 },
      { label: "精选商品", value: 3 },
      { label: "单个商品", value: 4 },
      { label: "单图", value: 5 },
      { label: "文本", value: 6 },
      { label: "订阅", value: 7 },
    ];
  },
  setList() {
    return [
      {
        value: "color",
        label: "颜色",
      },
      {
        value: "font",
        label: "字体选择",
      },
      {
        value: "icon",
        label: "网站图标",
      },
      {
        value: "exit",
        label: "退出",
      },
    ];
	},
	operateList() {
		return [
			{
				label: "线上店铺",
				value: "onlineStore",
			},
			{
				label: "编辑语言",
				value: "editLanguage",
			},
			{
				label: "重命名",
				value: "rename",
			},
			{
				label: "创建副本",
				value: "createCopy",
			},
		]
	},
	operateList2() {
		return [
			{
				label: "预览",
				value: "preview",
			},
			{
				label: "发布",
				value: "release",
			},
			{
				label: "删除",
				value: "delete",
			},
			{
				label: "重命名",
				value: "rename",
			},
			{
				label: "创建副本",
				value: "createCopy",
			},
		]
	},
	langList() {
		return [
			{
				label: "英语",
				value: "en",
			},
			{
				label: "德语",
				value: "de",
			},
			{
				label: "法语",
				value: "fr",
			},
			{
				label: "葡萄牙语",
				value: "pt",
			},
			{
				label: "西班牙语",
				value: "es",
			},
			{
				label: "意大利语",
				value: "it",
			},
			{
				label: "繁体中文",
				value: "zh-hk",
			},
			{
				label: "日语",
				value: "ja",
			},
		]
	},
	pageList() {
		return [
			{
				label: "首页",
				value: "homePage",
			},
			{
				label: "搜索页",
				value: "searchPage",
			},
			{
				label: "分类页",
				value: "classifyPage",
			},
			{
				label: "商品详情页",
				value: "goodsDetailPage",
			},
			{
				label: "自定义页面",
				value: "customPage",
			},
			{
				label: "自定义链接",
				value: "customLink",
			},
			{
				label: "政策条款",
				value: "policyClause",
			},
		]
	}
};
