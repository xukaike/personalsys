// pages/diary/add/add.js
Page({

  data: {
    name:'',
    intro:'',
    date: '2019-6-20',
  },
  DateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
  nameinput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  introinput(e){
    this.setData({
      intro:e.detail.value
    })
  },
  confrim(){
    wx.request({
      url: 'http://120.77.249.23/add_diary',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        id:'用户1',
        name:this.data.name,
        intro:this.data.intro,
        timestramp:this.data.date
      },
      success: res => {
        wx.navigateBack({
          delta:1
        })
      }
    })
  }
})