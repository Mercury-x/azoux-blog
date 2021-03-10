module.exports = {
    // 博客配置
  type: 'blog',
  friendLink: [
    {
      title: 'vuepress-theme-reco',
      desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      link: 'https://vuepress-theme-reco.recoluan.com'
    },
    {
      title: '午后南杂',
      desc: 'Enjoy when you can, and endure when you must.',
      email: 'recoluan@qq.com',
      link: 'https://www.recoluan.com'
    },
    // ...
  ],
  authorAvatar: 'http://img.sd2n.xyz/uploads/big/1c97bed1fcbadc5b9ca537c4615e6eb4.jpg',
  blogConfig: {
    category: {
      // location: 2,     // 在导航栏菜单中所占的位置，默认2
      text: 'Category' // 默认文案 “分类”
    },
    tag: {
      // location: 3,     // 在导航栏菜单中所占的位置，默认3
      text: 'Tag'      // 默认文案 “标签”
    },
    socialLinks: [     // 信息栏展示社交信息
      { icon: 'reco-github', link: 'https://github.com/Mercury-x' },
    ]
  },
  subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
  // 备案
  record: '闽ICP备2021000508号-1',
  recordLink: 'https://www.beian.miit.gov.cn/',
  // cyberSecurityRecord: '公安部备案文案',
  // cyberSecurityLink: '公安部备案指向链接',

  nav: require('./nav'),
  sidebar: require('./sidebar'),
  sidebarDepth: 2,
  lastUpdated: 'Last Updated',
  searchMaxSuggestoins: 10,
  serviceWorker: {
      updatePopup: {
          message: "有新的内容.",
          buttonText: '更新'
      }
  },
  editLinks: true,
  editLinkText: '在 GitHub 上编辑此页 ！'
}