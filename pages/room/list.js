// pages/room/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomid:'',
    hiddenPassword: true,
    password:''
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
  /**
   * 提交房号
   */
  submit: function(e){
    let $this = this;
    let $roomid = e.detail.value;
    if(!$roomid){
      return;
    }
    
    this.data.roomid = $roomid;
    wx.request({
      url: 'https://m.ctrip.com/restapi/soa2/10934/hotel/customer/getmarquees',
      data: { "alliance": { "ishybrid": 0 }, "head": { "cid": "point", "ctok": "", "cver": "1.0", "lang": "01", "sid": "8888", "syscode": "09", "auth": null }, "contentType": "json" },
      method: 'POST',
      success: function(res){
        $this.setData({ hiddenPassword: false})
      }
    })
    console.log(e.detail.value)
  },
  /**
   * 提交房间密码
   */
  confirm: function(e){
    let $roomid = this.data.roomid;
    this.setData({ hiddenPassword: true, roomid: '', password: '' })
    wx.navigateTo({
      url: '../poker/poker?roomid='+$roomid,
    })
  },
  submitPassword: function(e){
    this.data.password = e.detail.value;
  }
})