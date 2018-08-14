# Output 基础

## 多入口配置
webpack保持的原则是, 一个html页面对应一个入口。因此SPA页面需要配置单入口，而传统MPA页面则需要多入口的配置。
在配置多入口时，``output.filename``属性可以根据入口名称动态命名。
```
const path = require('path');

module.exports = {
    entry : {
        // set multi entry points
        app : './src/app.js',
        other : './src/other.js'
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].bundle.js'
    }
}
```
## html-webpack-plugin
类似上述代码中动态命名的打包文件，每一次修改入口名称后，虽然打包文件会重命名，可是在html中引用的还是旧文件，需要手动修改。使用``html-webpack-plugin``，可以去除这类麻烦。
``html-webpack-plugin``会自动生成一个index.html文件，并自动引用bundle。

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : {
        // set multi entry points
        app : './src/app.js',
        other : './src/other.js'
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].bundle.js'
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : 'Page Title'
        })
    ]
}
```
## 清理dist目录
随着多次build，dist目录下可能会出现多余的文件。好的实践是，每一次build都应该清理dist目录中的旧文件，使得目录里只有刚刚生成的bundle文件。
使用``clean-webpack-plugin``插件可以帮助我们实现这一点。
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry : {
        app : './src/app.js',
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : 'bundle.js'
    },
    plugins : [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title : 'Page Title'
        })
    ]
}
```