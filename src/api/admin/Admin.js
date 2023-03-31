import request from "@/utils/request";
//获取管理员
export const getAdmin=(data)=>{
    return request({
        url:'/getAdmin',
        method:'post',
        data
    })
}
//添加管理员
export const AddAdmin=(data)=>{
    return request({
        url:'/postAddAdmin',
        method:'post',
        data
    })
}
//编辑管理员
export const editAdmin=(data)=>{
    return request({
        url:"/postEditAdmin",
        method:'post',
        data
    })
}
//删除管理员
export const delAdmin=(params)=>{
   return request({
    url:'/getDelAdmin',
    method:'get',
    params
   })
}