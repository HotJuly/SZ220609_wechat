// app.js
import myAxios from './utils/myAxios';
App({
  onLaunch() {
    // 当小程序开始加载的时候会触发当前生命周期
    // 他是整个小程序中最早的一个生命周期

    // 整个小程序能够创建页面实例对象的,只有原生的Page函数

    // 此处其实是将Page中存储的地址值，传递了一份给PageFn
    // 目的是为了后续修改Page的时候，还能保留一份最初的Page函数
    const PageFn = Page;

    // 此处在将Page中的值更换成全新的函数
    // 更换成全新函数的目的只有一个，就是为了能够在创建页面实例对象之前，给每个页面的配置对象添加一些大家都需要的东西
    Page = function(config){
      config.$myAxios = myAxios;

      // 此处调用旧的Page,目的是为了创建页面的实例对象,
      // 如果没有这行代码,那么当前小程序就没办法展示页面了
      return PageFn(config);
    }
    // console.log(PageFn === Page);
  }
})
