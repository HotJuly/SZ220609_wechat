// 只要开发者调用该函数,就可以检查是否已经登录
// 返回值是布尔值类型,true代表已经登录,false代表未登录
export default function(){
  const cookie = wx.getStorageSync('cookie');
  if (!cookie) {
    wx.showModal({
      title: "请先登录",
      content: "该功能需要登陆之后才能使用",
      confirmText: "去登陆",
      cancelText: "回到首页",
      success: ({
        confirm
      }) => {
        // console.log('success',data)
        if (confirm) {
          // 如果能进入这里,说明用户点击了去登陆
          wx.navigateTo({
            url: "/pages/login/login"
          })
        } else {
          // 如果能进入这里,说明用户点击了回到首页
          wx.switchTab({
            url: "/pages/index/index"
          })
        }
      }
    })
    return false;
  }
  return true;
}