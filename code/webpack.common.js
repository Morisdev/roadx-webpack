const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : {
        app : './src/index.js'
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : ['style-loader', 'css-loader']
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : 'Page Title'
        })
    ]
    // optimization :{
    //     splitChunks : {
    //         chunks : 'all'
    //     }
    // }
}