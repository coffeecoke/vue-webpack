const path=require("path")
const webpack =require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractStyl = new ExtractTextPlugin('css/[name]-two.css');
const HTMLPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV = "development"
console.log('zq++++++++++++++++++++++++++++++++++++++')
//console.log(process.env); //这是个对象，下面控制台不是打印出来了嗯嗯明白了
const config = {
    entry:path.join(__dirname,'src/index.js'),//path.join 拼接根路径和目标路径
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist'),
    },
    module:{
        rules:[//rules可以配置很多规则
            {
                test:/\.vue$/,  //。。。匹配vue文件
                loader:"vue-loader" //webpack只能处理js文件，但是我们可以通过各种loader去处理非js文件，最后都会转成js
            },
            {
                test:/\.jsx$/,  //。。。匹配vue文件
                loader:"babel-loader" //webpack只能处理js文件，但是我们可以通过各种loader去处理非js文件，最后都会转成js
            },
            {
                test: /\.css$/,
                // use: extractCSS.extract({
                //   fallback: 'style-loader',
                // use: ['css-loader']
                  use: extractCSS.extract(['css-loader'])
                // })
                // test:/\.css$/,
                // use:ExtractTextPlugin.extract('style-loader', 'css-loader','stylus-loader'),
                // use:[
                //     "style-loader",
                //     "css-loader"
                //     //webpack处理loader，从右向左,在这里，webpack会读取css文件（只是把文件读到），
                //     //然后在通过style-loader把读取的内容，通过编译成js，
                //     //js执行的内容是把样式通过style标签的方式加载到页面中！所以翻过来就变成先执行style-loader
                // ]
            },
            {
                // test:/\.styl$/,
                // use:ExtractTextPlugin.extract('style-loader', 'css-loader','stylus-loader'),
                test: /\.styl$/,
                use: extractStyl.extract([ 
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader' 
                ])
            },
            {
                test:/\.(jpg|svg|png|gif)$/,//等，这是正则，在这里我们匹配的是后缀文件名
                use:[
                    {
                        loader:"url-loader",
                        options: {
                            limit:1024,
                            name:'imgs/[name]-aaa.[ext]' //option是配置loader参数的，所以跟上面的cssloader那块写法不一样
                        }

                    }
                    // 'url-loader?limit=1024&name=[name]-aaa.[ext]' //简写方式，但是不够直观，推荐上面的写法，但是可以告诉你options干什么用的
                    //图片如果我要打包到指定目录怎么办，好比说：打包到dist/imgs文件夹下
                ]
            }
        ]
    },
    plugins: [
        extractCSS,
        extractStyl,
        new HTMLPlugin(),
        new webpack.DefinePlugin({
            'process.env':{ //process是node进程，是个对象，process.env也是对象 
                NODE_ENV:isDev ? '"development"':'"production"'
            }
        }),
        new webpack.HotModuleReplacementPlugin()
      ]
   
} 
if(isDev) {
    config.devServer = {
        port:3001,
        host:'0.0.0.0',//0.0.0.0，代指localhost,或者本机ip
        overlay:{
            errors:true
        },
        hot:true//不会刷新网页的情况下改变内容显示，为了单页而生 
    }
}

config.devtool = 'cheap-module-source-map' 

//和输入命令有关吧？我试试哈 呦呦呦好厉害 0.0" 对了，我要是把引入的css提取出来怎么办，现在都是通过js写进style里的?这个怎么做啊自己想，留个作业.
module.exports = config;