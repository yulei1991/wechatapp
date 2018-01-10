// pages/poker/poker.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: 0,
    cardPoints: [1,2,3,5,8,13,20,50,100],
    selectedCard: 0,
    voteSuccess: false,
    roomid: '123'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      util.mAlert(app.globalData.userInfo.nickName)
    }else{
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          util.mAlert(app.globalData.userInfo.nickName)
        },
        fail:res=>{
          wx.navigateTo({
            url: '../logs/logs',
          })
        }
      })
    }
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
        selectedCard: 0,
        point: 0
      })
    }else{
      this.setData({
        point: currentPoint < 0?0: currentPoint,
        selectedCard: currentPoint
      })
    }
  },
  submit:function(e){
    let finalPoint = this.data.selectedCard;
    if (finalPoint==0){
      util.mAlert('请选择一张卡片')
    }else{
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.vote(finalPoint);
    }
  },
  logout: function(){
    let $this = this;
    let name = app.globalData.userInfo.nickName;
    let url = app.globalData.userInfo.avatarUrl;
    wx.request({
      url: 'https://m.ctrip.com/restapi/soa2/14160/scrumVote',
      data: {
        "roomid": $this.data.roomid,
        "name": name,
        "url": url,
        "leave": true
      },
      method: 'POST',
      success: function (res) {
        wx.navigateBack()
      }
    })
  },
  vote: function(point){
    let $this = this;
    let name = app.globalData.userInfo.nickName;
    let url = app.globalData.userInfo.avatarUrl;
    wx.request({
      url: 'https://m.ctrip.com/restapi/soa2/14160/scrumVote',
      data: {
        "roomid": $this.data.roomid,
        "name": name,
        "url": url,
        "point": point
      },
      method: 'POST',
      success: function (res) {
        $this.data.voteSuccess = true;
      },
      complete: function(res){
        wx.hideLoading();
        util.mAlert($this.data.voteSuccess ? '出牌成功' : '出牌失败，请重试')
      }
    })
  }
})