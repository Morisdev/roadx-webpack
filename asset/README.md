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

## Images
在应用中引入图片文件（如background-image、icons），需要安装``file-loader``，然后配置loader规则。
```
// webpack.config.js
module : {
    rules : [
        {
            test : /\.(png|jpeg|jpg|gif)$/,
            use : ['file-loader']
        }
    ]
}
```
经过上述配置后，便可在应用中引用图片。
```
// index.js
import BadgeImage from './images/bvb.jpeg';

let img = new Image();
img.src = BadgeImage; // Image URL
document.body.appendChild(img);
```

## Fonts
通过``file-loader``，webpack也能处理font文件。配置loader规则如下。
```
module : {
    rules : [
        {
            test : /\.(woff|woff2|eot|ttf|otf)$/,
            use : ['file-loader']
        }
    ]
}
```
配置后，通过``@font-face``声明字体，webpack便可将该字体包含到bundle中。

## Data
在应用中，有时候会需要引入一些数据文件。比如JSON数据、XML文档，或者CSV文件等。在webpack中内置对JSON文件的支持。所以，引入JSON文件很简单。
```
import Data from './data.json';
```
不过，引入XML文档需要``xml-loader``，引入CSV文件需要``csv-loader``。  
引入数据文件对于使用D3等来实现可视化很有帮助，因为不必再通过ajax请求数据后，再渲染图形。而是在bundle过程中就已经获取到了数据。

