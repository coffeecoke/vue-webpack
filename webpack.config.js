const path = require('path')
function assetsPath(_path) {
    return path.join('static',_path)
}

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use: [
                    // 从右往左执行
                    'style-loader',
                    'css-loader'
                ]
            },
        
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                  limit: 8192,
                  name: assetsPath("img/[name].[hash:8].[ext]")//配置静态路径，hash值
                }
              }
        ]
    }
}