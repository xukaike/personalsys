// pages/contact/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      item:JSON.parse(options.item)
    })
    console.log(this.data.item)
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
  confrim(){
    wx.request({
      url: 'http://120.77.249.23/edit_contact',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: '用户1',
        name: this.data.item.name,
        email: this.data.item.email,
        number: this.data.item.number,
        address:this.data.item.address
      },
      success: res => {
        wx.showToast({
          title: '修改成功',
        })
        wx.navigateBack({
          delta: 1
        })
        
      }
    })
  },
  delete(){
    wx.request({
      url: 'http://120.77.249.23/delete_contact',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: '用户1',
        name: this.data.item.name
      },
      success: res => {
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  }
})