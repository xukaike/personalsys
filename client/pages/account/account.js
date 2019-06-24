// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIncome:false,
    isOutcome:false,
    income:'0',
    outcome:'0'
  },
  
  onShow: function (options) {
    this.getaccount();
  },
  getaccount(){
    wx.request({
      url: 'http://120.77.249.23/get_acounnt',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        let income_total = 0;
        let outcome_total = 0;
        let total = 0;
        for(var i = 0;i<res.data.length;i++){
          income_total = Number(res.data[i].income) + Number(income_total)
        }
        for (var i = 0; i < res.data.length; i++) {
          outcome_total = Number(res.data[i].outcome) + Number(outcome_total)
        }
        total = res.data[res.data.length - 1].Total
        console.log(income_total)
        this.setData({
          list:res.data,
          income_total:income_total,
          outcome_total:outcome_total,
          total:total
        })
        console.log(this.data.list,this.data.income_total,this.data.outcome_total,this.data.total)
      }
    });
  },
  setIncome(){
    this.setData({
      isIncome:true
    })
  },
  setOncome() {
    this.setData({
      oucome: true
    })
  },
  confrimIncome(){
    wx.request({
      url: 'http://120.77.249.23/set_acounnt',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        id:'用户1',
        income:this.data.income,
        outcome:this.data.outcome
      },
      success:res=>{
        this.setData({
          income: '',
          outcome:''
        })
        this.getaccount()
      }
    })
  },


  hideModal(e){
    if(e.currentTarget.dataset.id == 'isIncome'){
      this.setData({
        isIncome:false
      })
    }
    else{
      this.setData({
        isOutcome:false
      })
    }
  }
})