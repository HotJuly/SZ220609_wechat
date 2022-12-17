// app.js
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
import utilConfig from './utils/config';
App({
  onLaunch() {

    const PageFn = Page;

    Page = function (config) {
      config.$myAxios = myAxios;

      // 此时config.onShow中存储的是开发者A写的生命周期函数
      // 我们作为开发者B,将A写的onShow存在showFn变量中
      const showFn = config.onShow;

      // 我们B程序员,将每个页面的config对象中的onShow属性替换成全新的函数
      config.onShow = function () {
        // console.log(1,this)
        // 此处就可以做所有页面都需要做的事情,例如权限检测效果


        // 判断当前页面是否需要权限检测
        // 其实就是将当前的页面路径在checkPermission数组中查找一下
        // 如果找到了,就是要权限检测,没找到就不权限检测
        // const result = utilConfig.checkPermission.includes(this.route);
        const result = utilConfig.checkPermission[this.route];
        if(result){
          if (!hasPermission()) return;
        }

        // 如果直接调用showFn函数,内部的this就会从页面实例对象变成window
        // this指向错了,会导致内部代码无法正常执行
        // 我们希望他的this指向变成当前页面实例对象
        // 所以此处使用call方法,强行将showFn函数的this改成了页面的实例对象
        showFn.call(this);
      }

      return PageFn(config);
    }
  }
})