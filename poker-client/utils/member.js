const util = require('./util.js')

const domain = util.getDomainUrl;

const login= (roomid,name,url)=>{
  wx.request({
    url: 'https://m.ctrip.com/restapi/soa2/14160/scrumVote',
    data: { 
      roomid,name,url,"point": wx.getStorageSync('cardpoint') || -2
    },
    method: 'POST',
    success: function (res) {
     console.log(res) 
    }
  })
  // wx.connectSocket({
  //   url: 'ws://127.0.0.1:3000/ws',
  //   data: {
  //     roomid, name, url, "point": wx.getStorageSync('cardpoint') || -2
  //   }
  // })
}

const logout = (roomid,name,url)=>{
  wx.request({
    url: `${domain}/api/logout`,
    data: {roomid,name,url},
    method:"POST",
    success: function(res){
      console.log(res);
      wx.navigateBack();
    }
  })
}

module.exports = {
  login,
  logout
}