const config = require('../config');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const mAlert = content => {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false
  })
}

const getDomainUrl = config.env == 'dev' ? 'http://localhost:3000' : 'https://www.chunlianzhushou.com';


module.exports = {
  formatTime,
  mAlert,
  getDomainUrl
}
