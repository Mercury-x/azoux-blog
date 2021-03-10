const themeConfig = require('./themeConfig');

module.exports = {
  title: "azoux's blog",
  description: '前方啊 没有方向',
  dest: './dist',
  theme: 'reco',
  themeConfig,
  logo: './public/img/logo.png',
  port: '7777',
  head: [
    ['link', {rel: 'icon', href: '/logo.jpg'}],
    // 添加百度统计
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?12f8027e8c5d18a93e4ea469c12cec27";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
        `
    ]
  ],
  markdown: {
      lineNumbers: true
  },
}
