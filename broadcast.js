// 广播就是不同页面可以将其函数注册进来，这样任意页面可以使用函数,有种全局的概念
// 其实广播就是函数册子，此外具有注册和启用函数的功能
// 注册的时候，需要注意函数名称是不是只对应一个函数，函数是不是只执行一次
// fire的时候如果函数只执行一次的话，一旦执行需要将其删除。这样就不再执行。
var broadcast = {
  data: {},
// 注册需要函数名称，函数，是不是唯一，是不是一次性使用
  _on: function(name,fn,isUniq,once){
    // 这里不用this 我觉得是即使on的this不是broadcast也能使用
    var eventData = broadcast.data
    // 是不是一次性放在函数属性里,函数也是对象
    fn.once = once
    if(eventData.hasOwnProperty(name)){
      if(isUniq){
        eventData[name] = [fn]
      }else{
        eventData[name].push(fn)
      }
    }else{
      eventData[name] = [fn]
    }
    return this
  },
  // 默认一个名称对应多个函数和可多次使用，特殊注册用_on
  on: function(name, fn,isUniq) {
    return this._on(name,fn,isUniq,false)
  },
  once:function(name,fn){
    return this._on(name, fn, false, true)
  },
  fire:function(name,data,thisArg){
    console.log('[broadcast fire] '+ name,data)
    if(!broadcast.data.hasOwnProperty(name)){
      console.error(name + '没有注册')
      return
    }
    // 判断有没有函数
    var fnList = broadcast.data[name] || []
    var len = fnList.length
    if(len>0){
      for(var i=0;i<len;i++){
        var fn = fnList[i]
        fn.apply(thisArg||null,[data,name])
        if(fn.once){
          fnList.splice(i,1)
          i--;
          len--;
        }
      }
    }
    return this
  }
}
module.exports = broadcast