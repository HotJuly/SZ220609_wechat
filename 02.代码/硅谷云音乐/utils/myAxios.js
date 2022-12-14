import config from './config';

/*
  封装代码
    封装函数
      1.将重复出现的部分留下来
      2.每次都不同的内容提取成形参传入
      3.谁调用函数,谁传入参数


*/

export default function(url,data={},method="GET"){
  // let result;
  // Promise接收到的回调函数,会被立即执行

  return new Promise((resolve,reject)=>{
    // console.log(1)
    wx.request({
      url:config.host + url,
      // data:data,
      data,
      method,
      success:(res)=>{
        // console.log('success',res)
        // result = res;

        // resolve方法可以将当前的promise对象变为成功状态
        // 同时给resolve传入的参数,会变成promise对象的结果值

        // 此处将res中的响应体data数据返回出去,以后书写代码就不需要在.data了
        resolve(res.data)
      }
    })
  })
  
  // return result;
}