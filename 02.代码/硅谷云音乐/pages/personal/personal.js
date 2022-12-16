// pages/personal/personal.js
import myAxios from '../../utils/myAxios';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于控制页面的上下移动距离
    moveDistance: 0,

    // 用于控制当前页面的过渡效果
    // moveTransition:"transform 1s"
    moveTransition: "",

    // 用于存储当前用户个人数据
    userInfo:{},

    // 用于存储当前账号本周播放歌曲记录
    playList:[]

  },

  // 用于监视用户手指按下效果
  handleTouchStart(event) {
    console.log('handleTouchStart',event)

    /*
      event.touches
        内部会存放当前屏幕上,所有的手指信息

      event.changedTouches
        内部会存放当前屏幕上,正在移动的手指信息

      由于模拟器上,只支持单指操作,所以在使用的时候,这两个数组没有区别
    */

    this.startY = event.touches[0].clientY;

    this.setData({
      moveTransition: ""
    })
  },

  // 用于监视用户手指移动效果
  handleTouchMove(event) {
    // console.log('handleTouchMove',event.touches[0].clientY)
    const moveY = event.touches[0].clientY;
    const moveDistance = moveY - this.startY;
    // console.log('moveDistance',moveDistance)

    // 如果当前用户移动距离大于80或者小于0,就不继续移动
    if(moveDistance>80||moveDistance<0)return;

    this.setData({
      moveDistance
    })
  },

  // 用于监视用户手指抬起操作
  handleTouchEnd() {
    this.setData({
      moveDistance: 0,
      moveTransition: "transform 1s"
    })
  },

  // 用于监视用户点击头像区域,跳转到登录界面
  toLogin(){
    wx.navigateTo({
      url:"/pages/login/login"
    })
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
  onShow:async function () {
    // 因为个人中心只要显示之后,就没有被卸载过
    // 而我们每次进入个人中心页面,都要获取最新的个人信息,所以选择使用onShow

    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })

    if(userInfo){
      const result = await myAxios('/user/record',{uid:userInfo.userId})
      // console.log('result',result)
      const playList = result.weekData.map((item)=>{
        return {
          id:item.song.id,
          picUrl:item.song.al.picUrl
        }
      });

      this.setData({
        playList
      })
    }


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

  }
})