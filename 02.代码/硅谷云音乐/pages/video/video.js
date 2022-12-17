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
    // currentIndex:0
    currentId:null,

    // 用于存储当前页面的视频列表数据
    videoList:[],

    // 用于控制当前scroll-view区域刷新效果开启和关闭
    isTrigger:false,

    // 用于记录当前用户点击的图片id
    videoId:null
  },

  // 给当前页面对象身上,添加一个属性myAxios,属性的值是用于发送请求的函数
  // $myAxios:myAxios,

  // 该方法用于练习视频的播放暂停方法,不是当前项目中的功能
  testApi(){
    // 1.获取到对应video组件的上下文对象
    const videoContext = wx.createVideoContext('37E7DDED8398443598CA8F2519042152');

    // 2.使用上下文对象的方法,可以暂停某个视频的播放
    videoContext.pause();
  },

  // 用于监视用户点击图片功能,实现切换对应video组件效果
  changeVideo(event){
    // console.log('changeVideo');
    // 获取到用户点击图片的id,其实也是video组件的id
    const videoId = event.currentTarget.id;

    this.setData({
      videoId
    },()=>{
      // 此处就相当于Vue中的nextTick
      // 这个回调函数,会在视图更新之后执行
      // 1.创建上下文对象
      // const videoContext = wx.createVideoContext(videoId);
      // videoContext.play();
    });

  },

  // 用于监视用户下拉scroll-view区域操作
  async handlePullDown(){
    // console.log('handlePullDown')
    await this.getVideoList();

    this.setData({
      isTrigger:false
    })
  },

  // 专门用于请求当前导航列表的数据
  async getNavList(){
    const result = await myAxios('/video/group/list');
    const navList = result.data.slice(0,13);

    this.setData({
      navList,
      // 错误示范:currentId:this.data.navList[0].id
      currentId:navList[0].id
    })
  },

  // 专门用于请求对应的视频列表数据
  async getVideoList(){
    this.setData({
      videoList:[]
    });

    // 只要这个函数中的代码,全部执行结束,那么当前返回的promise对象就会变为成功状态
    // 如果promise对象变成成功状态,说明当前请求的最新数据已经回来了
    const result2 = await this.$myAxios('/video/group',{id:this.data.currentId});

    this.setData({
      videoList:result2.datas.map((item)=>{
        return item.data;
      })
    })

    // console.log(2)
  },

  // 用于监视页面上视频的播放事件
  handlePlay(event){
    // console.log('handlePlay',event.currentTarget)

    // 获取到触发当前事件的video组件的id属性
    const vid = event.currentTarget.id;
    
    if(this.oldVid&&this.oldVid!==vid){

      // 1.获取到对应video组件的上下文对象
      const videoContext = wx.createVideoContext(this.oldVid);

      // 2.使用上下文对象的方法,可以暂停某个视频的播放
      videoContext.pause();
    }

    this.oldVid = vid;
  },

  // 用于监视用户点击了哪个导航按钮
  async changeCurrent(event){
    /*
      target是用于找到当前事件的触发者用的
        也就是当前事件最内层的子节点

      currentTarget是用于找到当前事件的事件源的
        也就是绑定了事件的那个元素

      而当前我们的数据是存放在事件源对象身上,所以需要使用event.currentTarget才行
    
    */
    // const currentIndex = event.target.dataset.index;
    // const currentIndex = event.currentTarget.dataset.index;

    const currentId = event.currentTarget.dataset.id;
    this.setData({
      currentId
    });

    wx.showLoading({
      title:"加载中..."
    });
    // console.log(1)

    await this.getVideoList();

    // console.log(3)
    wx.hideLoading();
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

    await this.getNavList();

    this.getVideoList();
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
  onPullDownRefresh:async function () {
    // console.log('onPullDownRefresh')
    
    await this.getNavList();

    this.getVideoList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from,target}) {
    /**
     * target是用于存放当前用户点击的button组件实例的
     *    如果是右上角转发,就没有这个属性
     * 
     * from是告知开发者,用户是通过哪个渠道转发的
     * 
     * 注意:自定义属性传参,名称必须是全小写,大写他不认得
     */
    // console.log('onShareAppMessage',target)

    const {title,imageurl} = target.dataset;
    if(from==="button"){
      // 能进入这里,说明用户是点击了button组件
      return {
        title,
        imageUrl:imageurl,
        path:"/pages/video/video"
      }
    }else{
      // 能进入这里,说明用户是点击右上角转发按钮实现的
      return{
        title:"硅谷云音乐",
        imageUrl:"/static/images/dazuo.jpeg",
        path:"/pages/index/index"
      }
    }
  }
})