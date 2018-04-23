const path = require('path')

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
                text:/\.css$/,
                use: [
                    // 从右往左执行
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                text:/\.(gif|jpg|png|svg)$/,
                use:[
                    // 区别上面的数组们，这里使用对象，是因为要配置options
                    {
                        loader: 'url-loader',//封装了file-loader
                        options: {
                            limit:1024
                        }

                    }
                ]
            }
        ]
    }
}