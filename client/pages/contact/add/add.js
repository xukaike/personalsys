// pages/contact/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  nameinput(e) {
    this.setData({
      'item.name': e.detail.value
    })
  },
  emailinput(e) {
    this.setData({
      'item.email': e.detail.value
    })
  },
  numberinput(e) {
    this.setData({
      'item.number': e.detail.value
    })
  },
  addressinput(e) {
    this.setData({
      'item.address': e.detail.value
    })
  },
  confrim() {
    wx.request({
      url: 'http://120.77.249.23/add_contact',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: '用户1',
        name: this.data.item.name,
        email: this.data.item.email,
        number: this.data.item.number,
        address: this.data.item.address
      },
      success: res => {
        wx.showToast({
          title: '成功',
        })
        wx.navigateBack({
          delta: 1
        })

      }
    })
  }
})