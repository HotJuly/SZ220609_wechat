// pages/video/video.js
import myAxios from '../../utils/myAxios';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储当前页面的导航列表数据
    navList:[],

    // 用于记录用户点击了哪个选项
    currentIndex:0
  },

  // 用于监视用户点击了哪个导航按钮
  changeCurrent(event){
    const currentIndex = event.target.dataset.index;
    this.setData({
      currentIndex
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
    // tabBar页面具有一个特点,只要显示过一次之后,就不会卸载
    // 所以tabBar页面经常使用onShow生命周期

    const result = await myAxios('/video/group/list');
    const navList = result.data.slice(0,13);

    this.setData({
      navList
    })
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