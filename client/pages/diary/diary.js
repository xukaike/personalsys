// pages/staff/staff.js
Page({

  data: {
    modal:false,
    deleteitem:{}
  },

  onShow: function (options) {
    this.getdiary()
  },
  getdiary(){
    wx.request({
      url: 'http://120.77.249.23/getall_diary',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        this.setData({
          stafflist: res.data
        })
        console.log(this.data.stafflist)
      }
    })
  },
  toadd(){
    wx.navigateTo({
      url: 'add/add',
    })
  },
  toedit(e){
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: 'edit/edit?item='+item,
    })
  },

  delete(e){
    this.setData({
      modal:true,
      deleteitem: e.currentTarget.dataset.item
    })
    console.log(this.data.deleteitem)
  },
  canceldelete(e) {
    this.setData({
      modal: false
    })
  },
  confrimdelete(){
    wx.request({
      url: 'http://120.77.249.23/delete_diary',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        id:this.data.deleteitem.id,
        name:this.data.deleteitem.name
      },
      success:res=>{
        this.getdiary()
        this.setData({
          modal:false
        })
      }
    })
  }

})