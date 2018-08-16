const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const customTheme = require('../src/common/theme');

require('whatwg-fetch');

module.exports = {
    mode : "development",
    entry : [
        'whatwg-fetch', 
        path.resolve(__dirname, "../src/main.js")
    ],
    output : {
        path :  path.resolve(__dirname, "../build"),
        filename : 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["react","env","stage-0","mobx"],
                    plugins: ["syntax-async-functions","transform-runtime"]
                }
            },
            {
                test : /\.less?$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: customTheme
                        }
                    }],
            },
            {
                test: /\.(woff2|woff|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '../static/fonts/[name].[ext].[hash:7]',
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)?$/,
                loader:'url-loader',
                options: {
                    limit: 10000,
                    name: '../static/images/[name].[ext].[hash:7]',
                }
            }
        ]
    },
    devServer : {
        contentBase : path.resolve(__dirname, "../"),
        inline:true,
        hot: true,
        port: 9000,
        open: true,
        publicPath : "/",
        proxy: {
            '/mock': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/mock' : ''},
                changeOrigin: true,
                secure: false
            }
        }
           
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename : path.resolve(__dirname, "../build/index.html"),
            template: path.resolve(__dirname, "../public/index.html"),
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
    
}