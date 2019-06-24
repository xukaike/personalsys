//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    elements: [
      { title: '事务管理', name: 'staff', color: 'blue', icon: 'list' },
      { title: '日记管理 ', name: 'diary', color: 'yellow', icon: 'edit' },
      { title: '通讯录', name: 'contact', color: 'cyan', icon: 'friend' },
      { title: '记账本', name: 'account', color: 'red', icon: 'moneybag' },
    ],
  },
})
