// pages/index/index.js
import myAxios from '../../utils/myAxios';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于存储当前页面的轮播图数据的
    banners: [],

    // 用于存储当前页面的推荐歌曲数据
    recommendList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    /*
      发送请求的三个问题:
        1.在哪发
          在Vue中,created或者mounted中都可以发送请求
          小程序中的onLoad相当于是created
          所以此处选择使用onLoad

        2.怎么发
          在Vue项目中,会使用axios发送请求
            axios其实就是ajax+promise组成的

            注意:小程序没有遵守W3C的标准,没有BOM和DOM
                所以小程序没办法发送ajax请求,导致没办法使用axios

            小程序的全局对象是wx,没有window

          小程序中使用API:wx.request
            注意:小程序没有proxy代理规则,url路径必须书写完整

        3.往哪发
          看接口文档
            接口文档三要素:
              1.请求路径
              2.请求方式
              3.请求参数
    
    */
    // console.log('window',window)
    // wx.request({
    //   url:"http://localhost:3000/banner",
    //   data:{
    //     type:2
    //   },
    //   success:(res)=>{
    //     // console.log('/banner',res)
    //     this.setData({
    //       banners:res.data.banners
    //     })
    //   }
    // })

    let result = await myAxios('/banner', {type: 2});
    this.setData({
      banners: result.banners
    })

    // wx.request({
    //   url:"http://localhost:3000/personalized",
    //   success:(res)=>{
    //     // console.log('/personalized',res)
    //     this.setData({
    //       recommendList:res.data.result
    //     })
    //   }
    // })

    // await右侧书写promise对象,那么await表达式的结果就是右侧promise对象的结果值
    let data = await myAxios('/personalized');
    this.setData({
      recommendList: data.result
    })
    // console.log(2,data)

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

  }
})