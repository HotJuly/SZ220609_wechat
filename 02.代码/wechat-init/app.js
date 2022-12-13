// 注册小程序
App({
  onLaunch(){
    // 这个生命周期是APP独有的,相当于是onLoad
    // 当小程序开始加载的时候,会触发这个生命周期
    // 也就是说这个生命周期是最早的一个生命周期

    let updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
    //res中的hasUpdate可以知道是否需要更新
      if (res.hasUpdate) {
        // 如果hasUpdate值为true,说明微信官方服务器有更新的版本
          //弹窗提示用户
      }
    })

    updateManager.onUpdateReady(function () {
      //调用该API实现更新包安装,强制更新
      updateManager.applyUpdate()
     })
  }
})