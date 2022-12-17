export default {
  host:"http://localhost:3000",

  // 这个数组中,会存放当前项目需要做权限检测的页面路径
  // checkPermission:["pages/video/video","pages/index/index"]
  checkPermission:{
    "pages/video/video":true,
    "pages/index/index":false
  }
}