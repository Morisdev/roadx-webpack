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
    plugins : [
        new HtmlWebpackPlugin({
            title : 'Page Title'
        })
    ]
}