### devDependencies和dependencies的区别
--save-dev会把安装的包和版本号记录到package.json中的devDependencies对象中, 还有一个--save, 会记录到dependencies对象中, 它们的区别, 我们可以先简单的理解为打包工具和测试工具用到的包使用--save-dev存到devDependencies, 比如eslint, webpack. 浏览器中执行的js用到的包存到dependencies, 比如jQuery等

### 代码引用
```javascript
console.log('hello js');
```
