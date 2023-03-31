import request from '@/utils/request'

//查询管理员
export function getUser(data){
    return request({
      url: '/getAdmin',
      method: 'post',
      data
    })
  }

  //查询管理员个人信息
  export function getAdmin(params){
    return request({
      url:'/getAdminInfo',
      method:'get',
      params
    })
  }
