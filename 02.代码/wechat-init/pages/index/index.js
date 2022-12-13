// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  /* 如何实现深拷贝
    乞丐版:JSON.parse(JSON.stringify(data))
    缺点:
      1.无论拷贝的对象是什么数据类型,最终都会丢失原本的原型链
        因为创建出来的对象,一定是Object类型的
      
      2.如果属性值是函数,那么拷贝的结果就是undefined

      3.如果遇到了特殊的数据类型,会出现数据类型转换功能
        Set->数组
        Map->对象
  */
  data: {
    msg: "我是初始化数据",
    userInfo:{}
  },

  handler(data){
    console.log('handler',data)
  },

  getUserProfile() {
    // 小程序中,事件的回调函数或者生命周期钩子函数中,this都是当前页面的实例对象
    // console.log('getUserProfile')

    wx.getUserProfile({
      desc: "用于测试获取个人信息",
      success:(data)=>{
        /*
          一个框架想给开发者传递数据,一般就两种手段:
            1.通过this对象
            2.通过形参传递
        */
      //  该回调函数的形参中,会传入用户的个人信息
        // console.log('data', data)
        this.setData({
          userInfo:data.userInfo
        })
      }
    })

  },
  changeMsg() {
    this.setData({
      msg: "我是修改之后的数据"
    })
  },

  toLog() {
    // console.log('toLog')
    // wx.navigateTo({
    //   // url:"../log/log"
    //   url:"/pages/log/log"
    // })


    wx.redirectTo({
      // url:"../log/log"
      url: "/pages/log/log"
    })
  },

  handleClick() {
    console.log('handleClick')
  },

  handleParent() {
    console.log('handleParent')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('1')
    // console.log(this.data.msg)
    // this.data.msg="我是修改之后的数据"
    // setTimeout(()=>{
    // },2000)


    // console.log(1,this.data.msg)

    // this.setData({
    //   msg:"我是修改之后的数据"
    // })

    // console.log(2,this.data.msg)

    // console.log('----------onLoad-----------')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('----------onReady-----------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('----------onShow-----------')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('----------onHide-----------')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('----------onUnload-----------')
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