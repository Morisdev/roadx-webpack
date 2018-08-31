# 基础

## 使用source maps
webpack把源代码打包成bundle文件，如果源文件中存在错误，实际上，我们能获取到的报错信息也指向了bundle文件。堆栈跟踪不会追寻到它的源文件，因此，定位问题非常棘手。
通过配置devtool属性，可以使用source maps，以便更清晰的找到错误的源头。
比如，使用``inline-source-map``，配置如下。
```
module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : 'bundle.js'
    },
    devtool : 'inline-source-map', // Add +
    plugins : [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title : 'HWP Title'
        })
    ]
}
```
实际上，``inline-source-map``是多种sourcemap的其中一种。它将源文件的sourcemap以DataUrl的形式(base64编译的字符串)嵌进bundle文件中。

## 开发环境搭建
在开发过程中，做出改动后每次都手动``npm run build``非常麻烦。我们需要的是一个工具，每次我们的代码发生变动时，都会自动编译打包。在webpack中有3种方式可以实现这种需求。
- Watch Mode
- webpack-dev-server
- webpack-dev-middleware

### Watch Mode
watch模式，可以监测依赖图表(Dependency Graph)源文件的变动，一旦发生过改变，webpack会自动重新编译。可以在命令行中增加``--watch``参数来进入watch模式。


```
 // package.json

 "scripts": {
    "watch": "webpack --watch"
  },
```
执行``npm run watch``，可以看见输出了``webpack is watching the files ...``，并且命令行没有退出。说明webpack已进入监测模式。
watch模式的不足之处是，重新编译后浏览器并不会自动刷新。这也是为什么webpack-dev-server脱颖而出，成为大家的首选。

### webpack-dev-server
webpack-dev-server提供了一个简洁的web服务器，能够在开发过程中保证"实时重载"(live reloading)。
在安装好之后，简单配置如下。修改内容为: npm脚本里，--open会自动打开浏览器窗口，--port指明端口。而在webpack.config.js文件中配置devServer属性，设置web根目录。
```

// package.json
 "scripts": {
    "dev": "webpack-dev-server --open --port 5566"
  }

 // webpack.config.js
 module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : 'bundle.js'
    },
    devtool : 'inline-source-map',
    devServer : {
        contentBase : './dist' // Add +
    },
    plugins : [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title : 'HWP Title'
        })
    ]
} 
```
执行``npm run dev``，浏览器会自动弹出，并访问localhost:5566。每次修改源文件，webpack都会重新编译，浏览器也会自动刷新。

#### 补充
1. webpack-dev-server是跑在内存中的，即生成的bundle内容不会输出到文件，而只会存储在内存中。
如果因为某些原因，想要生成文件，可以通过[write-file-webpack-plugin](https://github.com/gajus/write-file-webpack-plugin)来实现。
2. 如果默认端口被占用，WDS会尝试使用其他端口。执行``netstat -an | grep 8080``查看端口是否被占用。
3. SPA应用，如果想要通过HTML5 History API实现前端路由，需要设置``devServer.historyApiFallback``为``true``。否则会出现404错误，因为如果不支持History Api，在访问某个路由/xx/xx时，webpack会把它当做后端路由去请求服务器。
4. 修改应用文件时，WDS能做到实时重载。但是，在修改webpack的配置文件webpack.config.js后，还需要重启服务才能看到效果。这是因为WDS是一个Node.js的服务器。如果频繁修改webpack.config.js，会觉得重启服务太麻烦。可以使用[nodemon](https://github.com/remy/nodemon)来优化。
``nodemon``能够监测node.js文件的变动，自动重启服务。对于开发node应用很方便。使用``nodemon``来监测webpack.config.js的改动，可以在npm脚本中配置如下。
```
"scripts" : {
    "start" : "nodemon --watch webpack.config.js --exec \"webpack-dev-server\""
}
```

#### 了解
1. 在某些老旧的系统上，可能webpack无法做到监测文件的变动。可以通过设置``devServer.polling``，设置轮询的时间间隔，作为替代方案。

### webpack-dev-middleware
webpack-dev-middleware是内置在webpack-dev-server中的，用于和服务器交互的中间件。可以单独拎出来，与自己搭建的服务器配合，进行更多灵活的自定义的配置。



