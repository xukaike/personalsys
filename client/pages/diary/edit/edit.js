// pages/diary/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad(options){
    this.setData({
      item:JSON.parse(options.item)
    })
  },
  nameinput(e) {
    this.setData({
      'item.name': e.detail.value
    })
  },
  introinput(e) {
    this.setData({
      'item.intro': e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      'item.timestramp': e.detail.value
    })
  },
  confrim() {
    wx.request({
      url: 'http://120.77.249.23/edit_diary',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: '用户1',
        name: this.data.item.name,
        intro: this.data.item.intro,
        timestramp: this.data.item.timestramp
      },
      success: res => {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})