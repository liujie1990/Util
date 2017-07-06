//添加webpack-dev-middleware通常的方式
var webpack = require('webpack');
var express = require('express');
//webpack使用webpack-dev-middleware进行热重载
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');

var app = express();
var port = 3000;

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,//没有信息显示控制台(只有警告和错误)
	publicPath: webpackConfig.output.publicPath
}));
//添加webpack-hot-middleware附加到相同的编译器实例
app.use(webpackHotMiddleware(compiler));

//处理来自项目根目录的get请求
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
})
