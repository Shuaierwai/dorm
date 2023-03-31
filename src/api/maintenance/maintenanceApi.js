import request from "@/utils/request";

//获取维修数据
export const getMaintenance=(params)=>{
    return request({
        url:"/getMaintenance",
        method:'get',
        params
    })
}
//编辑维修管理
export const editMain=(data)=>{
   return request({
    url:"/postEditMain",
    method:'post',
    data
   })
}

//删除维修
export const delMain=(params)=>{
  return request({
    url:'/getDelMain',
    method:'get',
    params
  })
}