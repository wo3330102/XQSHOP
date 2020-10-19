module.exports = {
    // outputDir: `${srcFile}`, // 在npm run build时 生成文件的目录 type:string, default:'dist'
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    chainWebpack: config => {
        // config.plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        // config.plugin('html').tap(args => {
        //     if (process.env.NODE_ENV === 'production') {
        //         args[0].cdn = cdn
        //     }
        //     return args
        // })
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // 移除 preload 插件
        config.plugins.delete('preload');
    },
    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         return {
    //             externals: externals,
    //         };
    //     }
    // },


}