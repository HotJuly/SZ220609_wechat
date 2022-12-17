// app.js
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
import utilConfig from './utils/config';
App({
  onLaunch() {

    const PageFn = Page;

    Page = function (config) {
      config.$myAxios = myAxios;

      const showFn = config.onShow;

      config.onShow = function () {
        const result = utilConfig.checkPermission[this.route];
        if(result){
          if (!hasPermission()) return;
        }
        
        showFn.call(this);
      }

      return PageFn(config);
    }
  }
})