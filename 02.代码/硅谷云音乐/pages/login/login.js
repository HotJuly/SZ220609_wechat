// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "17688197777",
    password: ""
  },
  /*
    所谓的双向数据绑定
      1.将data中的数据作为默认值在input框中展示
        只需要给input框添加value属性即可

      2.当用户修改input框的值时候,将输入框的最新值更新到data中
        给input,绑定事件
        事件名:change
          当input失去焦点的时候会触发,频率比较低,性能较高
        通过event.detail.value可以获取到当前最新的数据
  */
  handlePhone(event) {
    // console.log('handlePhone',event)
    const value = event.detail.value;
    this.setData({
      phone: value
    })
  },

  handlePassword(event) {
    // console.log('handlePhone',event)
    const value = event.detail.value;
    this.setData({
      password: value
    })
  },

  handleInput(event) {
    // console.log('handleInput',event)
    // 小程序向事件回调函数内部传参的手段,
    // 是通过自定义事件配合event身上的dataset实现的

    const type = event.target.dataset.type;

    const value = event.detail.value;
    this.setData({
      [type]: value
    })
  },

  handleLogin() {
    /*
      1.收集到数据
      2.处理数据结构
      3.前端表单校验
        目的:减少无用请求的发送
        解决高并发问题
          雪碧图,减少http请求数量

      4.发送请求
      5.根据返回内容,做事情
        成功做什么
        失败做什么
    */

    // 失去焦点和点击元素,失去焦点的优先级更高,会先触发
    // 所以一定能收集到用户输入的数据

    const {
      phone,
      password
    } = this.data;

    if (!phone.trim()) {
      // 能进入这里,就说明没有输入手机号
      wx.showToast({
        title: "手机号不能为空123",
        icon: "error"
      })

      return;
    }

    if (!password.trim()) {
      // 能进入这里,就说明没有输入手机号
      wx.showToast({
        title: "密码不能为空",
        icon: "none"
      })

      return;
    }

    /*
      登录状态码
        200->登陆成功
        400->手机号码格式不对
        401->密码错误
        500->帐号不存在
    */

    const result = {};
    if (phone === "17688197776" && password === "chh112233") {
      // 能进入这里说明登录成功
      result.code = 200;
      result.userInfo = {
        "followed": false,
        "backgroundUrl": "https://p1.music.126.net/5L9yqWa_UnlHtlp7li5PAg==/2002210674180204.jpg",
        "avatarImgIdStr": "109951165120404634",
        "avatarUrl": "https://p1.music.126.net/Ni3aqGjQX85pPr8XU20XDg==/109951165120404634.jpg",
        "vipType": 11,
        "authStatus": 0,
        "djStatus": 0,
        "detailDescription": "",
        "experts": {},
        "expertTags": null,
        "accountStatus": 0,
        "nickname": "七月入栈",
        "birthday": -2209017600000,
        "gender": 0,
        "province": 350000,
        "city": 350500,
        "avatarImgId": 109951165120404634,
        "backgroundImgId": 2002210674180204,
        "userType": 0,
        "defaultAvatar": false,
        "mutual": false,
        "remarkName": null,
        "backgroundImgIdStr": "2002210674180204",
        "userId": 59421805,
        "description": "",
        "signature": "",
        "authority": 0,
        "avatarImgId_str": "109951165120404634",
        "followeds": 2,
        "follows": 6,
        "eventCount": 1,
        "avatarDetail": null,
        "playlistCount": 10,
        "playlistBeSubscribedCount": 0
      }
    }else if(phone.length<11){
      result.code = 400;
    }else if(password !== "chh112233"){
      result.code = 401;
    }else if(phone !== "17688197776"){
      result.code = 500;
    }

    // 真正要写的代码
    // if(result.code===200){
    //   wx.showToast({
    //     title: '登录成功,即将跳转',
    //     icon:'none'
    //   })
    // }else if(result.code===400){
    //   wx.showToast({
    //     title: '手机号码格式不对',
    //     icon:'none'
    //   })
    // }else if(result.code===401){
    //   wx.showToast({
    //     title: '密码错误',
    //     icon:'none'
    //   })
    // }else if(result.code===500){
    //   wx.showToast({
    //     title: '手机账号不存在',
    //     icon:'none'
    //   })
    // }

    /*
      策略模式写法
        策略:兵来将挡水来土掩
          对方出招,我们接招,为对方每种情况,都准备一种应对的方法
    
    */

    const fns = {
      200(){
          wx.showToast({
            title: '登录成功,即将跳转',
            icon:'none'
          });

          // wx.redirectTo({
          // wx.navigateTo({

          // 通过wx.switchTab方法,可以实现跳转tabbar页面的操作
          // 他会关闭到其余所有非tabBar页面,无法返回上个页面
          wx.switchTab({
            url:"/pages/personal/personal"
          });
      },
      400(){
          wx.showToast({
            title: '手机号码格式不对',
            icon:'none'
          })
      },
      401(){
          wx.showToast({
            title: '密码错误',
            icon:'none'
          })
      },
      500(){
          wx.showToast({
            title: '手机账号不存在',
            icon:'none'
          })
      }
    }

    const code = result.code;
    // fns[code]&&fns[code]();
    fns[code]?.();

    // 例如 a&&a.b => a?.b


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