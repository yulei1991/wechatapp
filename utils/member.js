const login= (roomid,name,url)=>{
  wx.request({
    url: 'https://m.ctrip.com/restapi/soa2/14160/scrumVote',
    data: {
      "roomid": roomid,
      "name": name,
      "url": url,
      "point": wx.getStorageSync('cardpoint') || -2
    },
    method: 'POST',
    success: function (res) {
     console.log(res) 
    }
  })
}

module.exports = {
  login: login
}