# Code Splitting

## 简介
Code Splitting是webpack提供的一个用于优化的特性。它的作用是将代码切割成多个bundle。有此特性，我们可以按需加载部分bundle，并且可以让加载的过程并行执行。这样，单个bundle文件的容量会变小，加载bundle的次序又可控，从而会显著的优化加载时间。
一共有3种方法可以实现code splitting。
- 多入口配置 (multiple entry)
- 使用SplitChunks，去除重复的代码
- dynamic import

## 方法一：多入口配置
通过多入口配置来实现代码切割，是最简单直观的方法。在/output/basic.md一节中，已经讲过了多入口配置的实现。
```
const path = require('path');
module.exports = {
    entry : {
        app : './src/app.js',
        other : './src/other.js'
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].bundle.js'
    }
}
```
但是这一方法有缺陷。
1.无法去重
假设两个文件中都引入了相同的模块，那么在产生的两个bundle文件中，都会有该模块的代码。
```
// entry_1.js
import _ from 'lodash';

// entry_2.js
import _ from 'lodash';
```
2.不够灵活
通过多入口配置来实现的代码切割，无法和应用的逻辑关联到一起。不能做到根据应用的逻辑，动态的切割。因此，这种方式不够灵活。

## 方法二：使用SplitChunks去重
上述方法一"无法去重"的缺陷，可以由SplitChunks来弥补。SplitChunks会分析多入口文件中的公共依赖模块，将其提取出来。配置的方式如下。
```
// webpack.config.js
module.exports = {
    // ...
    optimization : {
        splitChunks : {
            chunks : 'all'
        }
    }
}
```
## 方法三：dynamic import
使用符合ECMAScript规范的``import()``语法提案，可以动态的引入模块。
**TODO** 这一方法等以后有机会了再研究。
