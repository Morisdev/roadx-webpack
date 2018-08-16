# Tree Shaking

把我们的应用看成是一颗大树，整个应用中实际用到的代码，相当于大树的绿叶，而有一些代码是并没有用到的，所谓"Dead Code"，相当于大树的枯黄的叶子。为了这棵树的健康，你需要用力摇晃它，从而让这些枯黄的叶子从树上脱落。此为"Tree Shaking"。
在JavaScript中，Tree Shaking表示"清除无用代码"(dead-code elimination)。

## 关于dead code
什么是dead code？用一句话来解释，就是 *Unused Export*，使用ES2015标准模块语法的export导出的代码未被使用时，就需要被清除。
参考下面的代码，在index.js中只引入了math模块的cube方法。而没有被用到的square则会被webpack标记为dead code。
```

// index.js
import { cube } from './math';

// math.js
export function square(x) {
    return x * x;
}

export function cube(x) {
    return x * x * x;
}
```

## 如何去除dead code
在``mode : 'development'``开发模式下，dead code仅是被标记而已，在bundle文件中仍然存在这些代码。如果想要减少bundle文件的容量，彻底去除dead code，则需要设置为生成模式``mode : 'production'``，这一行为会启用``UglifyJSPlugin``，在对bundle文件进行压缩的同时去除dead code。

## 如何避免"副作用"
副作用(side effect)，指的是当某个模块被引入的时候，不只是单纯的提供export，有可能会对全局造成其他影响。比如polyfills，再比如引入的css文件（any imported file is subject to tree shaking）。这些模式因为也没有被显式的使用，所以会被当成dead code删除。为了避免这种错误发生，我们可以通过配置package.json中的``sideEffects``属性，告诉webpack是否有side effects，或者告诉它哪些文件有side effects，以便不再对这些文件进行处理。
当设置为false的时候，``sideEffects : false``，指的是没有文件有副作用，任何模块都可被当做dead code。也可以设置该属性为一个数组，表明哪些文件有副作用。
```
// package.json

sideEffects : [
    './src/side-effect-file.js',
    '*.css'
]
```

## 总结
关于tree-shaking，有3点需要记住。
- 使用ES2015模块语法 import/export
- 在package.json中配置sideEffects属性
- 设置``mode : 'production'``，在bundle文件中清除dead code

