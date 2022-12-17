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
    recommendList: [],

    // 用于存储当前页面的排行榜数据
    topList: []
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

    let result = await this.$myAxios('/banner', {
      type: 2
    });
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


    // 这个数组就是用来存放,等下请求回来的多个榜单的数据的
    const topList = [];
    const ids = [1, 4, 8, 16, 22];
    let index = 0;

    /*
      Promise.all([多个promise对象])
        该方法会返回一个新的promise对象,
          如果内部的所有promise都成功,那么他返回的promise也是成功
          如果内部的promise有一个以上失败,那么他返回的就是失败的promise
        使用场景:
          如果现在有一件事情,必须在多件事情成功之后才做,就可以使用这个
    
      await的使用场景
        await会拦截后续代码的执行
          所以一般只有在后续代码,必须在前面代码成功之后才做,才会使用await
          如果前后代码没有什么必然联系,就不需要使用await
    */
    // while(index<ids.length){
    //   // while循环的条件,如果是false,就不执行内部代码
    //   let res = await myAxios('/top/list',{idx:ids[index++]});
    //   // console.log('res',res)
    //   const {id,name,tracks} = res.playlist;
    //   /*
    //     splice(开始下标,删除几个,新增数据内容)
    //       会修改原数组
    //     slice(开始下标,结束下标)
    //       注意:结束下标的内容是不会被切割进去的
    //       不会修改原数组

    //   */
    //   const obj = {
    //     id,
    //     name,
    //     list:tracks.slice(0,3).map((item)=>{
    //       return {
    //         imgUrl:item.al.picUrl,
    //         name:item.name,
    //         id:item.id
    //       }
    //     })
    //   };
    //   topList.push(obj);

    //   this.setData({
    //     topList
    //   })
    // }


    while (index < ids.length) {
      // while循环的条件,如果是false,就不执行内部代码

      // .then的作用就是监视前面的promise的状态变化
      // 如果前面的promise变为成功状态,就会执行.then中的第一个回调函数
      // 失败则是第二个回调函数
      // 回调函数的第一个形参,可以获取到被监视的promise的结果值
      myAxios('/top/list', {
        idx: ids[index++]
      })
      .then((res) => {
        const {
          id,
          name,
          tracks
        } = res.playlist;

        const obj = {
          id,
          name,
          list: tracks.slice(0, 3).map((item) => {
            return {
              imgUrl: item.al.picUrl,
              name: item.name,
              id: item.id
            }
          })
        };
        topList.push(obj);

        this.setData({
          topList
        })
      })

    }
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