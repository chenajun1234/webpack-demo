var webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
//引入提取css文件到单独的目录下面
    ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
//提取scss文件，这里的参数是配置编译后的css路径和文件名,相对于output里的path选项
    extractScss = new ExtractTextWebpackPlugin("comm/css/index.css"),
//动态生成html的npm包
    htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //配置打包后的多个入口文件
    entry: ['webpack/hot/dev-server', './src/comm/script/index.js'],
    output: {
        path: './dist',
        //线上环境采用下面的配置
        //publicPath: "http://i.fastui.cn/assset/",
        filename: 'comm/js/bundle.js'
    },
    //启动调试服务器用的
    devServer: {
        inline: true,
        port: 9999
    },
    //加载一些文件
    module: {
        loaders: [
            {test: /\.scss$/, loader: extractScss.extract(['css', 'sass'])},
            {test: /\.html$/, loader: 'html-loader'},//加载静态html
            {test: /\.ejs/, loader: 'ejs-loader'},//加载ejs模板文件
            {test: /\.json/, loader: 'json-loader'}
        ]
    },
    plugins: [
        //直接定义第三方库
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        //动态从模板生成一张html页面
        new htmlWebpackPlugin({
            //生成的html文件名称
            filename: 'index.html',
            //从哪个模板生成
            template: 'src/comm/html/index.html',
            //脚本放的位置
            inject: 'body',//'head',
            //动态插入模板，支持ejs写法,模块中支持<% js代码 %>
            title: '书博日志'
        }),
        //抽取scss文件到单独的css文件
        extractScss,
        //可以拷贝目录或者是文件
        new CopyWebpackPlugin([
            {from: './src/article', to: 'article/'},
            {from: './src/comm/vendor', to: 'comm/vendor/'}
        ]),
        //热替换需要
        new webpack.HotModuleReplacementPlugin()
    ]
};