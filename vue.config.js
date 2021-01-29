module.exports = {
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // 移除 preload 插件
        config.plugins.delete('preload');
    },
    // qxj add by 2021-1-12
    devServer: {
        open: true,
        port: "8080", // 代理端口
        proxy: {
            "/api": {
                target: "https://admin.xqshopify.com/admin", // 开发接口--吕外冬
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端 
            }
        }
    },
    configureWebpack: config => {
        // 生产环境下生效
        if (process.env.NODE_ENV === 'production') {
            // 配置删除 console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
        config.externals = {
            vue: "Vue",
            "element-ui": "ELEMENT",
            "vue-router": "VueRouter",
            vuex: "Vuex",
            axios: 'axios',
        }
    }
}