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
    /*
      target是用于找到当前事件的触发者用的
        也就是当前事件最内层的子节点

      currentTarget是用于找到当前事件的事件源的
        也就是绑定了事件的那个元素

      而当前我们的数据是存放在事件源对象身上,所以需要使用event.currentTarget才行
    
    */
    // const currentIndex = event.target.dataset.index;
    const currentIndex = event.currentTarget.dataset.index;
    console.log('currentIndex',currentIndex)
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