//Babel默认只转换新的JavaScript句法（syntax），而不转换新的API
//比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象
//以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
//举例来说，ES6在Array对象上新增了Array.from方法。
//Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import todoApp from './reducers/index';
import App from './components/App';

let store = createStore(todoApp);
// console.log(store.getState());
//store中保存了所有的数据
//Provider 是一个React组件，它的作用是保存store给子组件中的connect使用
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
