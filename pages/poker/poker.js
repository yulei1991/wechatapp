// pages/poker/poker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: 0,
    cardPoints: [1,2,3,5],
    selectedCard: 0,
    voteSuccess: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  clickCard: function(e){
    let currentPoint = e.currentTarget.dataset.value;
    if(this.data.selectedCard==currentPoint){
      this.setData({
        selectedCard: 0
      })
    }else{
      this.setData({
        point: currentPoint,
        selectedCard: currentPoint
      })
    }
  },
  submit:function(e){
    let finalPoint = this.data.selectedCard;
    if (finalPoint==0){
      wx.showModal({
        title: '提示',
        content: '请选择一张卡片',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }else{
      this.vote(finalPoint);
    }
  },
  vote: function(point){
    let $this = this;
    wx.request({
      url: 'https://m.ctrip.com/restapi/soa2/10934/hotel/customer/getmarquees',
      data: { "alliance": { "ishybrid": 0 }, "head": { "cid": point, "ctok": "", "cver": "1.0", "lang": "01", "sid": "8888", "syscode": "09", "auth": null}, "contentType": "json" },
      method: 'POST',
      success: function (res) {
        $this.data.voteSuccess = true;
      },
      complete: function(res){
        wx.showModal({
          title: '提示',
          content: $this.data.voteSuccess ? '出牌成功，点数为' + point : '出牌失败，请重试',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      }
    })
  }
})