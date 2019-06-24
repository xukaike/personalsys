// pages/diary/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad(options) {
    this.setData({
      item: JSON.parse(options.item)
    })
  },
  nameinput(e) {
    this.setData({
      'item.name': e.detail.value
    })
  },
  detailinput(e) {
    this.setData({
      'item.detail': e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      'item.timestramp': e.detail.value
    })
  },
  confrim() {
    console.log(this.data.item)
    wx.request({
      url: 'http://120.77.249.23/edit_staff',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: '用户1',
        name: this.data.item.name,
        detail: this.data.item.detail,
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