# Asset Management
webpack的一个很酷的特性是，不仅是对js文件，也能在``loader``的帮助下对其他文件进行处理，从而得到最终的bundle文件。

## CSS
为了在JS模块中引入CSS文件，需要安装两个loader：``style-loader``和``css-loader``。  
在配置文件中简单配置。让正则匹配到的文件，使用对应的loader处理。
```
// webpack.config.js
module : {
    rules : [
        {
            test : /\.css$/,
            use : ['style-loader', 'css-loader']
        }
    ]
}
```
通过以上配置，便可以在js中以``import``的语法引入css模块了。被引入的css模块中的代码会被格式化后放进html的style标签里。   
**Note** : 在生产模式下应尽量减少css文件的容量，从而缩短加载时间。可以使用``postcss-loader``等插件来提高性能。



