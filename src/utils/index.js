
(function(){
   function changeSize(){
    //获取窗口大小
    let winW=window.innerWidth;
    //计算跟标签大小
    let size=winW*10/1700;
    //直接设置html标签的font-size
    document.getElementsByTagName('html')[0].style.fontSize=size+'px';
   }
   console.log()
   window.onresize=changeSize;
   changeSize()
})()