const fs = require('fs');
var path = process.argv[2];
var viewName = path.split('/')[path.split('/').length - 1];
var realPath = './src/views/' + path;
//创建页面vue文件
fs.readFile('./devTools/viewTemplate/view.vue', function(error, data) {
  let templateStr = data.toString();
  templateStr = templateStr.replace('$(viewName)', viewName);
  fs.writeFile(realPath + '.vue', templateStr, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.log('创建页面Vue成功 页面名称：' + viewName);
    }
  });
});
//创建单独页面访问打包的入口文件
fs.readFile('./devTools/viewTemplate/viewApp.js', function(error, data) {
  let templateStr = data.toString();
  templateStr = templateStr.replace('$(relativeViewPath)', './' + viewName + '.vue');
  fs.writeFile(realPath + 'App.js', templateStr, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.log('创建页面js成功 页面名称：' + viewName);
    }
  });
});
