// const glob = require('glob');
let pages = {
  index: {
    entry: 'src/main.js',
    template: 'public/index.html',
  },
};
//注释掉多页打包，方便调试时刷新，需要时打开注释即可
// glob.sync('./src/views/**/*App.js').forEach((path) => {
//   let chunk = path.split('./src/views/')[1].split('.js')[0];
//   chunk = chunk.replace('App', '');
//   pages[chunk] = {
//     entry: path,
//     template: 'public/index.html',
//     chunks: ['chunk-vendors', 'chunk-common', chunk],
//   };
// });
module.exports = {
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pages: pages,
};
