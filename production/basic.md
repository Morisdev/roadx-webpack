# Production

## 更好的方案
开发模式和生产模式的差别极大。在开发模式development下，我们希望拥有功能强大的source map功能，以及一个本地服务器能够让应用实时重载或者使用HMR特性，以便提高开发效率。
然而在生产模式production下，我们关注的是让bundle文件压缩的更小，以及优化各种静态资源的引入以节省加载时间。
因此，webpack推荐两种模式使用各自的配置文件（separate webpack configurations）。基于*DRY*的原则，还应该维护一个公共配置文件。为了让公共配置文件和单独配置文件合并工作，需要使用到``webpack-merge``。

## webpack-merge
在安装好webpack-merge之后，我们将1个配置文件拆分为3个。代码如下。
```
// webpack.common.js
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

// 开发模式 webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode : 'development',
    devtool : 'eval',
    devServer : {
        contentBase : './dist'
    }
});

// 生产模式 webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode : 'production',
    devtool : 'source-map'
});

```
为了让不同模式使用不同的配置文件，需要在npm脚本中稍作修改。
```
// package.json
"scripts": {
    "start": "webpack-dev-server --open --port 5566 --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
},
```

## 识别模式
在很多类库中，都是通过``process.env.NODE_ENV``变量来识别模式的。而在webpack v4中，只要设置了mode属性，即可自动将模式设置成对应的值。当然，也可以在源文件中通过判断``process.env.NODE_ENV``来进行更多自定义的行为。

## 压缩代码
在production模式下，默认会使用``UglifyJSPlugin``来压缩代码，删除dead code，实现tree shaking。也可以使用其他插件来完成这一行为，比如``BabelMinifyWebpackPlugin``。

## 生产模式下的source map
webpack鼓励我们在生产模式下也配置source map功能，对于debug或者进行基准测试(benchmark test)也是有用的。但是，应记得避免使用``inline-*``或``eval-*``等类别的devtool，因为这会使得bundle文件变大，从而导致降低性能。

## 在生成模式下优化css
[TODO](https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production)