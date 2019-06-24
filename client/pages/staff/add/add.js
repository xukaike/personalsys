// pages/diary/add/add.js
Page({

  data: {
    name: '',
    detail: '',
    date: '2019-6-20',
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  nameinput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  detailinput(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  confrim() {
    wx.request({
      url: 'http://120.77.249.23/add_staff',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: '用户1',
        name: this.data.name,
        detail: this.data.detail,
        timestramp: this.data.date
      },
      success: res => {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})