# Hot Module Replacement

模块热替换(HMR)，可以让模块在运行时(runtime)得到更新，而不必重新刷新(full reload)页面。用于在 **开发模式** 下提高开发效率。
HMR可以作为实时重载(live reload)的替代方案。

## 为什么能提高开发效率
- 保留应用状态。不再因为刷新页面，而丢掉之前的应用状态。
- 只对变更的模块进行更新，节省了bundle的时间。
- 调整样式更快，速度堪比在浏览器中调试。避免因为改个样式就要重新bundle。

## 使用HMR
使用HMR很简单。只需要在webpack-dev-server中配置支持HMR，并且使用webpack内置的HMR插件。
```
// webpack.dev.js

const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
    mode : 'development',
    // devtool : 'eval',
    devServer : {
        contentBase : './dist',
        hot : true
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ]
});
```
通过上述配置即可启用HMR，此外，再在源文件中接受(accept)模块的变动，使其作为热更新作用于当前的应用。这样就可以达到想要的效果。
```
// index.js

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('updated from HMR');
        print();
    });
}
```




