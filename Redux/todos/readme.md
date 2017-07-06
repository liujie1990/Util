actions--->用户行为
components--->展示组件
containers--->容器组件
reducer---> store里面负责分发action行为
index.html ---> 模板文件
server.js---> 构建项目相关配置文件
webpack---> 打包配置文件

Redux 的 React 绑定库包含了 容器组件和展示组件相分离的开发思想

### React-redux
其API相当简单，包括一个React Component(Provider)和一个高阶方法connect
#### Provider
其是store的提供者。一般情况下，把原有的组件树根节点包裹在Provider中，这样整个组件树上的节点都可以通过connect获取store。
#### connect
connect是用来"连接"store与组件的方法
